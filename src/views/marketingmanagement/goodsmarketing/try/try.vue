<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="促销名称" v-model="listQuery.name" maxlength="32" size="medium" style="width: 200px;"
                class="filter-item"/>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
      <br/>
      <router-link to="/marketingmanager/goodsmarketing/addtry">
        <el-button class="filter-item" size="medium" type="primary" icon="el-icon-plus">添加试用</el-button>
      </router-link>
    </div>

    <el-table
      :data="list"
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
      <el-table-column label="开始申请时间">
        <template slot-scope="scope">{{ scope.row.startTime }}</template>
      </el-table-column>
      <el-table-column label="结束申请时间">
        <template slot-scope="scope">{{ scope.row.endTime }}</template>
      </el-table-column>
      <el-table-column label="操作" width="235">
        <template slot-scope="scope">
          <router-link :to="{path:'/marketingmanager/goodsmarketing/trydetail',query:{id:scope.row.id}}">
            <el-button type="success" style="margin: 0 5px 0 0" size="mini">查看详情</el-button>
          </router-link>
          <router-link :to="{path:'/marketingmanager/goodsmarketing/trialpromotionapplylist',query:{id:scope.row.id}}">
            <el-button v-if="hasTryBegin(scope.row)" type="success" style="margin: 0" size="mini">查看申请</el-button>
          </router-link>
          <router-link v-if="!hasTryBegin(scope.row)"
                       :to="{path:'/marketingmanager/goodsmarketing/updatetry',query:{id:scope.row.id}}">
            <el-button type="primary" style="margin: 0 5px 0 0" size="mini">修改</el-button>
          </router-link>
          <el-button v-if="!hasTryBegin(scope.row)" size="mini" style="margin: 0" type="danger"
                     @click="handleDelete(scope.row.id)">
            删除
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

  import {queryTryMarketList, deleteTryById} from '@/api/try';

  export default {
    data() {
      return {
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
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        queryTryMarketList(this.listQuery).then((response) => {
          this.list = response.data;
          this.total = response.recordsTotal;
          this.listLoading = false
        })
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val - 1;
        this.getList();
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
      // 判断试用促销是否开始 返回true  开始
      hasTryBegin(tryMarketing) {
        return new Date() >= new Date(tryMarketing.startTime);
      },
      // 删除试用二次确认
      handleDelete(id) {
        this.$confirm('是否确认删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteTry(id);
        })
      },
      // 删除限时抢购
      deleteTry(id) {
        if (this.isProcess) {
          return;
        }
        this.isProcess = true;
        deleteTryById(id).then(() => {
          this.isProcess = false;
          this.getList();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        });
      },
    }
  }
</script>
