<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="订单号" v-model="listQuery.orderCode" size="medium" style="width: 150px;"
                class="filter-item"/>
      <el-input placeholder="用户名" v-model="listQuery.customerName" size="medium" style="width: 150px;"
                class="filter-item"/>
      <el-input placeholder="门店名" v-model="listQuery.storeName" size="medium" style="width: 150px;"
                class="filter-item"/>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
    </div>

    <el-table
      :data="orderList"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="门店" min-width="160">
        <template slot-scope="scope">{{ scope.row.storeName }}</template>
      </el-table-column>
      <el-table-column label="订单号" min-width="162">
        <template slot-scope="scope">{{ scope.row.orderCode }}</template>
      </el-table-column>
      <el-table-column label="买家" min-width="110">
        <template slot-scope="scope">{{ scope.row.customerName }}</template>
      </el-table-column>
      <el-table-column label="下单时间" min-width="160">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="订单总额" min-width="80">
        <template slot-scope="scope">{{ scope.row.price.toFixed(2) }}</template>
      </el-table-column>
      <el-table-column label="订单状态" width="82">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == '1'" type="warning">待付款</el-tag>
          <el-tag v-if="scope.row.status == '2'" type="warning">待取货</el-tag>
          <el-tag v-if="scope.row.status == '3'" type="success">已完成</el-tag>
          <el-tag v-if="scope.row.status == '4'" type="info">已取消</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="80">
        <template slot-scope="scope">
          <router-link :to="{path:'/shopmanagement/storesellorder/storesellorderdetail',query:{id:scope.row.id}}">
            <el-button type="success" style="margin: 0" size="mini">详情</el-button>
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
  import {queryStoreSellOrderList} from '@/api/shopsellorderlist';

  export default {
    data() {
      return {
        isProcess: false, // 接口是否处理中
        showDia: false, // 是否显示新增弹窗标识
        listLoading: true, // 列表加载标识
        orderList: null, // 列表数据集合
        total: null, // 总记录数
        listQuery: {
          pageNum: 0, // 当前页码
          pageSize: 10, // 每页显示记录数
          orderCode: '', // 订单号
          customerName: '', // 用户名
          storeName: '', // 门店名
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 查询门店销售列表
      getList() {
        this.listLoading = true;
        queryStoreSellOrderList(this.listQuery).then((response) => {
          this.orderList = response.data;
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
    }
  }
</script>
