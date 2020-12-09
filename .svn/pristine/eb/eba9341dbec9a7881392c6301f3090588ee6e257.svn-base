<template>
  <div class="app-container">
    <router-link to="/statisticalreport/platformstatistics/storesarea">
      <el-button class="filter-item" size="medium" style="margin: 10px 0;" type="primary" icon="el-icon-back">返回店铺地区统计</el-button>
    </router-link>

    <el-table
      :data="list"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="公司名称">
        <template slot-scope="scope">{{ scope.row.companyName }}</template>
      </el-table-column>
      <el-table-column label="店铺名称">
        <template slot-scope="scope">{{ scope.row.storeName }}</template>
      </el-table-column>
      <el-table-column label="到期时间">
        <template slot-scope="scope">{{ scope.row.effectiveTime }}</template>
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
    queryAreaStoreInfo  //查询店铺地区统计
  } from '@/api/storesarealist';


  export default {
  data() {
    return {
      searchTimeValue: [new Date(new Date().getTime() - 3600 * 1000 * 24 * 6), new Date()], //初始化时间
      listLoading: true, //数据加载中
      listQuery: {
        pageNum: 0,
        pageSize: 10,
        provinceId:''
      }, // 查询参数
      list: null, // 页面数据,
      total: null, // 数据总数,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true;
      this.listQuery.provinceId = this.$route.query.provinceId;
      queryAreaStoreInfo(this.listQuery).then(response => {
        this.list = response.data;
        this.total = response.recordsTotal;
        this.listLoading = false
      });
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val - 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 0;
      this.listQuery.pageSize = val;
      this.getList();
    },  }
}
</script>
