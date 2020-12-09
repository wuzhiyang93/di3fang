<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="促销名称" v-model="listQuery.name" size="medium" style="width: 200px;" class="filter-item"/>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
      <br/>
      <router-link style="margin-left: 10px" to="/marketingmanager/mobilemarketing/addgroupmarketing">
        <el-button class="filter-item" size="medium" type="primary" icon="el-icon-plus">添加拼团促销</el-button>
      </router-link>
    </div>

    <el-table
      :data="groupMarketingList"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="促销名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="描述">
        <template slot-scope="scope">{{ scope.row.desc }}</template>
      </el-table-column>
      <el-table-column label="开始时间">
        <template slot-scope="scope">{{ scope.row.startTime }}</template>
      </el-table-column>
      <el-table-column label="结束时间">
        <template slot-scope="scope">{{ scope.row.endTime }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link v-if="!hasGroupBegin(scope.row)"
                       :to="{path:'/marketingmanager/mobilemarketing/updategroupmarketing',query:{id:scope.row.id}}">
            <el-button type="primary" style="margin: 0 5px 0 0" size="mini">修改</el-button>
          </router-link>
          <router-link v-if="hasGroupBegin(scope.row)"
                       :to="{path:'/marketingmanager/mobilemarketing/groupmarketingdetail',query:{id:scope.row.id}}">
            <el-button type="success" style="margin: 0 5px 0 0" size="mini">查看</el-button>
          </router-link>
          <el-button size="mini" style="margin: 0" type="danger" @click="toDeleteGroupMarketing(scope.row.id)">删除
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
  import {queryGroupMarketingList, deleteGroupMarketing} from '@/api/groupmarketinglist';

  export default {
    data() {
      return {
        isProcess: false, // 接口是否处理中
        delIds: [],// 批量删除选中id数组
        listLoading: true, // 列表加载标识
        groupMarketingList: null, // 列表数据集合
        total: null, // 总记录数
        listQuery: {
          pageNum: 0, // 当前页码
          pageSize: 10, // 每页显示记录数
          name: '', // 拼团促销标题
          type: '10' // 促销类别 10 拼团
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 查询拼团促销列表
      getList() {
        this.listLoading = true;
        queryGroupMarketingList(this.listQuery).then((response) => {
          this.groupMarketingList = response.data;
          this.total = response.recordsTotal;
          this.listLoading = false
        })
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
      // 判断拼团促销是否开始 返回true 开始
      hasGroupBegin(groupMarketing) {
        return new Date() >= new Date(groupMarketing.startTime);
      },
      // 删除拼团促销二次确认
      toDeleteGroupMarketing(id) {
        this.$confirm('是否确认删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteGroupMarketing(id);
        })
      },
      // 删除拼团促销
      deleteGroupMarketing(id) {
        if (!this.isProcess) {
          this.isProcess = true;
          deleteGroupMarketing(id).then(res => {
            this.isProcess = false;
            if (res == 1) {
              this.getList();
              this.delIds = [];
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            } else {
              this.$message({
                message: '删除失败!',
                type: 'error'
              })
            }
          });
        }
      },
    }
  }
</script>
