<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="订单号" size="medium" style="width: 200px;" v-model="listQuery.lsTransCode"
                class="filter-item"/>
      <el-input placeholder="交易流水号" size="medium" style="width: 200px;" v-model="listQuery.transCode"
                class="filter-item"/>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
    </div>

    <el-table
      :data="list"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="订单号" width="180">
        <template slot-scope="scope">
          <router-link v-if="scope.row.type=='1'"
                       :to="{path:'/ordermanager/ordermanager/transstoreorderdetail',query:{id:scope.row.orderId}}">
            <el-link type="primary">{{ scope.row.lsTransCode }}</el-link>
          </router-link>
          <router-link v-if="scope.row.type=='2'"
                       :to="{path:'/ordermanager/ordermanager/transorderdetail',query:{id:scope.row.orderId}}">
            <el-link type="primary">{{ scope.row.lsTransCode }}</el-link>
          </router-link>
          <span v-if="scope.row.type=='3'"> {{ scope.row.lsTransCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="流水号" width="255">
        <template slot-scope="scope">{{ scope.row.transCode }}</template>
      </el-table-column>
      <el-table-column label="金额">
        <template slot-scope="scope">{{ scope.row.money }}</template>
      </el-table-column>
      <el-table-column label="支付方式">
        <template slot-scope="scope">{{ scope.row.channel }}</template>
      </el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">{{ typeMapping[scope.row.type ]}}</template>
      </el-table-column>
      <el-table-column label="下单时间" width="165">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="支付时间" width="165">
        <template slot-scope="scope">{{ scope.row.payTime }}</template>
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
  import {queryTransRecords} from '@/api/transrecords';

  export default {
    data() {
      return {
        typeMapping: {'1': '门店订单', '2': '普通订单', '3': '预存款充值'},
        listLoading: true, // 加载中
        list: null, // 交流水数据
        total: null, // 数据总数
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          transCode: '',
          lsTransCode: '',
        }, // 查询参数
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        queryTransRecords(this.listQuery).then((response) => {
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
    }
  }
</script>
