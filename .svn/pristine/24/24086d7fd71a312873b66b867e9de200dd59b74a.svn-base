<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="门店名称" v-model="listQuery.storeName" size="medium" style="width: 150px;"
                class="filter-item"/>
      <el-button class="filter-item" type="primary" size="medium" @click="handleFilter" icon="el-icon-search">搜索
      </el-button>
    </div>

    <el-table
      :data="tableData"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="门店名称">
        <template slot-scope="scope">{{ scope.row.storeName }}</template>
      </el-table-column>
      <el-table-column label="评价时间">
        <template slot-scope="scope">{{ scope.row.time }}</template>
      </el-table-column>
      <el-table-column label="评分">
        <template slot-scope="scope">
          <el-rate
            v-model=scope.row.rate
            disabled
            show-score
            text-color="#ff9900">
          </el-rate>
        </template>
      </el-table-column>
      <el-table-column label="评价内容" min-width="150">
        <template slot-scope="scope">{{ scope.row.content }}</template>
      </el-table-column>
      <el-table-column label="相关订单编号">
        <template slot-scope="scope">{{ scope.row.number }}</template>
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
    queryStoreEvaluation, //分页查询门店评分
  } from '@/api/shopevaluationlist';

  export default {
    data() {
      return {
        listLoading: true,//加载中
        listQuery: {
          pageNum: 0, // 当前页码
          pageSize: 10, // 每页显示记录数
          storeName: '', // 店铺名称
        },
        total: null, // 总记录数
        tableData: [] //列表数据
      }
    },
    created() {
      this.getList()
    },
    methods: {
      //获取页面数据
      getList() {
        this.listLoading = true;
        this.tableData = [];
        queryStoreEvaluation(this.listQuery).then((response) => {
          this.total = response.recordsTotal;
          let data = response.data;
          for (let i = 0; i < data.length; i++) {
            let iteam = {
              storeName: data[i].storeName,
              time: data[i].createTime,
              rate: data[i].score,
              content: data[i].desc,
              number: data[i].orderCode
            }
            this.tableData.push(iteam);
          }
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
    }
  }
</script>
