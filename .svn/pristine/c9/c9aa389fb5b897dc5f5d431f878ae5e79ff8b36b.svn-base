<template>
  <div class="app-container">
    <el-tabs @tab-click="changeTab()" v-model="activeName" type="card">
      <el-tab-pane label="定金预售列表" name="0">
        <div class="filter-container">
          <el-input placeholder="促销名称" v-model="listQuery.name" maxlength="32" size="medium" style="width: 200px;"
                    class="filter-item"/>
          <el-button class="filter-item" type="primary" size="medium" @click="handleFilter" icon="el-icon-search">搜索
          </el-button>
          <br/>
          <router-link style="margin-left: 10px" to="/marketingmanager/goodsmarketing/adddepositpresale">
            <el-button class="filter-item" size="medium" type="primary" icon="el-icon-plus">添加定金预售</el-button>
          </router-link>
          <el-button class="filter-item" size="medium" style="margin-left: 5px;" type="danger" icon="el-icon-delete"
                     @click="batchDelete()">批量删除
          </el-button>
        </div>

        <el-table
          :data="list"
          v-loading="listLoading"
          border
          fit
          highlight-current-row
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" align="center" width="40"/>
          <el-table-column label="促销名称">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column label="描述">
            <template slot-scope="scope">{{ scope.row.desc }}</template>
          </el-table-column>
          <el-table-column label="尾款支付时间">
            <template slot-scope="scope">{{ scope.row.endTime }}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <router-link :to="{path:'/marketingmanager/goodsmarketing/updatedepositpresale',query:{id:scope.row.id}}">
                <el-button type="primary" style="margin: 0 5px 0 0" size="mini">修改</el-button>
              </router-link>
              <el-button size="mini" style="margin: 0" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="全款预售列表" name="1">
        <div class="filter-container">
          <el-input placeholder="促销名称" v-model="listQuery.name" maxlength="32" size="medium" style="width: 200px;"
                    class="filter-item"/>
          <el-button class="filter-item" type="primary" size="medium" @click="handleFilter" icon="el-icon-search">搜索
          </el-button>
          <br/>
          <router-link style="margin-left: 10px" to="/marketingmanager/goodsmarketing/addfullpresale">
            <el-button class="filter-item" size="medium" type="primary" icon="el-icon-plus">添加全款预售</el-button>
          </router-link>
          <el-button class="filter-item" size="medium" style="margin-left: 5px;" type="danger" icon="el-icon-delete"
                     @click="batchDelete()">批量删除
          </el-button>
        </div>

        <el-table
          :data="list"
          v-loading="listLoading"
          border
          fit
          highlight-current-row
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" align="center" width="40"/>
          <el-table-column label="促销名称">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column label="描述">
            <template slot-scope="scope">{{ scope.row.desc }}</template>
          </el-table-column>
          <el-table-column label="发货时间">
            <template slot-scope="scope">{{ scope.row.endTime }}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <router-link :to="{path:'/marketingmanager/goodsmarketing/updatefullpresale',query:{id:scope.row.id}}">
                <el-button type="primary" style="margin: 0 5px 0 0" size="mini">修改</el-button>
              </router-link>
              <el-button size="mini" style="margin: 0" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <div class="pagination-container">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="listQuery.pageNum+1" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-tabs>
  </div>
</template>

<script>
  import {
    queryDepositPresale,
    queryFullPresale,
    deleteDepositPresaleByIds,
    deleteFullPresaleByIds
  } from '@/api/presale';

  export default {
    data() {
      return {
        activeName: '0',
        selectIds: [],
        isProcess: false, // 接口是否处理中
        listLoading: true, // 加载中
        list: null, // 促销数据
        total: null, // 数据总数
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          name: '',
        }, // 查询参数
      }
    },
    created() {
      if (this.$route.query.type) {
        this.activeName = this.$route.query.type;
      }
      this.getList()
    },
    methods: {
      changeTab() {
        this.listQuery = {
          pageNum: 0,
          pageSize: 10,
          name: '',
        };
        this.selectIds = [];
        this.getList();
      },
      getList() {
        this.listLoading = true;
        if (this.activeName == '0') {
          queryDepositPresale(this.listQuery).then((response) => {
            this.list = response.data;
            this.total = response.recordsTotal;
            this.listLoading = false
          })
        } else {
          queryFullPresale(this.listQuery).then((response) => {
            this.list = response.data;
            this.total = response.recordsTotal;
            this.listLoading = false
          })
        }
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val - 1;
        this.getList();
      },
      handleSelectionChange(val) {
        if (val && val.length > 0) {
          this.selectIds = val.map(row => row.id);
        } else {
          this.selectIds = [];
        }
      },
      // 过滤查询
      handleFilter() {
        this.listQuery.pageNum = 0;
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 0;
        this.listQuery.pageSize = val;
        this.getList();
      },
      // 删除二次确认
      handleDelete(id) {
        this.$confirm('是否确认删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delMarketing(id);
        })
      },
      // 批量删除二次确认
      batchDelete() {
        if (this.selectIds && this.selectIds.length > 0) {
          this.$confirm('是否确认删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.delMarketing(this.selectIds);
          })
        } else {
          this.$message({
            message: '请至少选择一条数据',
            type: 'warning'
          })
        }
      },
      // 删除促销
      delMarketing(ids) {
        if (this.isProcess) {
          return;
        }
        this.isProcess = true;
        if (this.activeName == '0') {
          deleteDepositPresaleByIds({"marketingIds": ids.toString()}).then(() => {
            this.isProcess = false;
            this.getList();
            this.selectIds = [];
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
        } else {
          deleteFullPresaleByIds({"marketingIds": ids.toString()}).then(() => {
            this.isProcess = false;
            this.getList();
            this.selectIds = [];
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
        }
      },
    }
  }
</script>
