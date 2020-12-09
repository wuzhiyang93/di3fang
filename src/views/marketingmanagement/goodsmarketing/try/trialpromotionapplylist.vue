<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" size="medium" icon="el-icon-back" @click="backPage">返回试用促销列表</el-button>
    </div>

    <el-table
      :data="tableData"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="申请人">
        <template slot-scope="scope">{{ scope.row.customerName }}</template>
      </el-table-column>
      <el-table-column label="申请时间">
        <template slot-scope="scope">{{ scope.row.applyTime }}</template>
      </el-table-column>
      <el-table-column label="申请状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == '0'" type="warning">试用申请中</el-tag>
          <el-tag v-if="scope.row.status == '1'" type="success">申请通过</el-tag>
          <el-tag v-if="scope.row.status == '2'" type="danger">申请拒绝</el-tag>
          <el-tag v-if="scope.row.status == '3'" type="success">下单成功</el-tag>
          <el-tag v-if="scope.row.status == '4'" type="success">已完成报告</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link v-if="scope.row.status == '4'"
                       :to="{path:'/marketingmanager/goodsmarketing/trialpromotionreport',query:{id:scope.row.id}}">
            <el-button type="success" size="mini">查看试用报告</el-button>
          </router-link>
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
    queryTryApplyList,//分页查询试用申请列表
  } from '@/api/trialpromotionapplylist';

  export default {
    data() {
      return {
        listLoading: true, //列表加载中标记
        tableData: [], //列表数组
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          id: this.$route.query.id,
        }, // 查询参数

      }
    },
    created() {
      this.getList()
    },
    methods: {
      //返回
      backPage() {
        this.$router.back(-1);
      },
      //初始化列表
      getList() {
        this.listLoading = true
        queryTryApplyList(this.listQuery).then((response) => {
          this.tableData = response.data;
          this.total = response.recordsTotal;
          this.listLoading = false
        })

      },
      //翻页
      handleCurrentChange(val) {
        this.listQuery.pageNum = val - 1;
        this.getList();
      },
      //跳页
      handleSizeChange(val) {
        this.listQuery.pageNum = 0;
        this.listQuery.pageSize = val;
        this.getList();
      },
    }
  }
</script>
