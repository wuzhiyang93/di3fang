<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="公司名称" size="medium" v-model="listQuery.companyName" style="width: 150px;"
                class="filter-item"/>
      <el-input placeholder="门店名称" size="medium" v-model="listQuery.storeName" style="width: 150px;"
                class="filter-item"/>
      <el-input placeholder="用户手机号" size="medium" v-model="listQuery.mobile" style="width: 150px;" class="filter-item"/>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
      <br/>
      <router-link to="/shopManagement/shopsList/addShopFirstStep">
        <el-button class="filter-item" size="medium" style="margin-left: 5px;" type="primary" icon="el-icon-plus">新增门店
        </el-button>
      </router-link>
      <el-button class="filter-item" size="medium" style="margin-left: 5px;" type="danger" icon="el-icon-remove"
                 @click="closeStores">关闭门店
      </el-button>
    </div>

    <el-table
      :data="tableData"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="40"/>
      <el-table-column label="用户手机号" width="120">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>
      <el-table-column label="公司名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="门店名称">
        <template slot-scope="scope">{{ scope.row.storeName }}</template>
      </el-table-column>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == '2'" type="success">营业中</el-tag>
          <el-tag v-if="scope.row.status == '4'" type="info">关闭</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="到期时间" width="160">
        <template slot-scope="scope">{{ scope.row.time }}</template>
      </el-table-column>
      <el-table-column label="操作" width="170">
        <template slot-scope="scope">
          <router-link :to="{path:'/shopmanagement/shopslist/shopdetails',query:{id:scope.row.id}}">
            <el-button type="success" style="margin: 0 5px 0 0" size="mini">查看</el-button>
          </router-link>
          <el-button v-if="scope.row.status == '4'" type="primary" style="margin: 0" size="mini"
                     @click="openDialog(scope.row.id)">
            开启门店
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.pageNum+1" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>

  import {
    queryStoreList, //分页查询门店列表
    closeStores, //批量关店
    openStoreForOutLetStore, //开启门店
  } from '@/api/shopslist';


  export default {
    data() {
      return {
        listLoading: true, //加载中
        listQuery: {
          pageNum: 0, // 当前页码
          pageSize: 10, // 每页显示记录数
          companyName: '', // 公司名称
          storeName: '', // 店铺名称
          mobile: '', // 手机号
        },
        total: null, // 总记录数
        tableData: [],//列表数据集合
        multipleSelection: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true;
        this.tableData = [];
        queryStoreList(this.listQuery).then((response) => {
          this.total = response.recordsTotal;
          let data = response.data;
          for (let i = 0; i < data.length; i++) {
            let iteam = {
              id: data[i].id,
              phone: data[i].customerMobile,
              name: data[i].companyName,
              storeName: data[i].storeName,
              status: data[i].status,
              time: data[i].effectiveTime,
            }
            this.tableData.push(iteam);
          }
          this.listLoading = false
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = [];
        for (let i = 0; i < val.length; i++) {
          this.multipleSelection.push(val[i].id);
        }
      },
      // 过滤查询
      handleFilter() {
        this.listQuery.pageNum = 0;
        this.getList();
      },
      // 改变当前页码
      handleCurrentChange(val) {
        this.listQuery.pageNum = val - 1;
        this.getList();
      },
      // 改变每页显示记录数
      handleSizeChange(val) {
        this.listQuery.pageNum = 0;
        this.listQuery.pageSize = val;
        this.getList();
      },
      //关闭门店
      closeStores() {
        if (this.multipleSelection.length == 0) {
          this.$message({
            type: 'error',
            message: '至少选择一条记录!'
          });
          return;
        }
        this.$confirm('确定要关闭选中的门店吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.isProcess) {
            return;
          }
          this.isProcess = true;
          closeStores({"ids": this.multipleSelection.toString()}).then((response) => {
            this.isProcess = false;
            this.getList();
            if (response > 0) {
              this.$message({
                type: 'success',
                message: '关闭门店成功!'
              })
            }
          })

        })
      },
      //开启门店
      openDialog(id) {
        this.$confirm('确定要开启此门店吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          if (this.isProcess) {
            return;
          }
          this.isProcess = true;
          openStoreForOutLetStore(id).then((response) => {
            this.isProcess = false;
            this.getList();
            if (response > 0) {
              this.$message({
                type: 'success',
                message: '开启门店成功!'
              })
            }
          })
        })
      }
    }
  }
</script>
