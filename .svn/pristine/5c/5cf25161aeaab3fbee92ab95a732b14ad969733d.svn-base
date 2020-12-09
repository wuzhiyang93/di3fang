<template>
  <div class="app-container">
    <div>
      <router-link to="/customer/customer/customerlist">
        <el-button icon="el-icon-back">返回会员列表</el-button>
      </router-link>
    </div>
    <el-radio-group v-model="listStatus" @change="toCustomerInfoList" style="margin: 20px 0">
      <el-radio-button :label="0">基本信息</el-radio-button>
      <el-radio-button :label="1">订单信息</el-radio-button>
      <el-radio-button :label="2">优惠券</el-radio-button>
      <el-radio-button :label="3">商品关注</el-radio-button>
      <el-radio-button :label="4">用户积分</el-radio-button>
      <el-radio-button :label="5">用户预存款</el-radio-button>
      <el-radio-button :label="6">会员等级</el-radio-button>
    </el-radio-group>
    <div class="filter-container">
      <el-date-picker
        style="width: 355px"
        class="search-datepicker"
        size="medium"
        :clearable="false"
        v-model="searchTimeValue"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss"
        align="right">
      </el-date-picker>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
    </div>

    <el-table
      :data="customerOrderList"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="订单号" min-width="162">
        <template slot-scope="scope">{{ scope.row.orderCode }}</template>
      </el-table-column>
      <el-table-column label="下单时间" min-width="160">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="订单总额" min-width="80">
        <template slot-scope="scope">{{ scope.row.price.toFixed(2) }}</template>
      </el-table-column>
      <el-table-column label="订单状态" min-width="82">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == '1'" type="warning">待付款</el-tag>
          <el-tag v-if="scope.row.status == '2'" type="warning">待发货</el-tag>
          <el-tag v-if="scope.row.status == '3'" type="warning">待收货</el-tag>
          <el-tag v-if="scope.row.status == '4'" type="success">已完成</el-tag>
          <el-tag v-if="scope.row.status == '5' || scope.row.status == '6' || scope.row.status == '7'"
                  type="info">已关闭
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="支付方式" min-width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.payType == '0'">在线支付</span>
          <span v-if="scope.row.payType == '1'">货到付款</span>
        </template>
      </el-table-column>
      <el-table-column label="来源" min-width="50">
        <template slot-scope="scope">
          <span v-if="scope.row.source == '1'">PC</span>
          <span v-if="scope.row.source == '2'">H5</span>
          <span v-if="scope.row.source == '3'">APP</span>
          <span v-if="scope.row.source == '4'">小程序</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
        <router-link :to="{path:'/customer/customer/customerorderdetail',query:{id:scope.row.id}}">
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
  import {
    queryCustomerOrderList
  } from '@/api/customerorderlist';

  export default {
    data() {
      return {
        listStatus: '1', // 列表状态 会员订单列表
        listLoading: true, // 列表加载标识
        customerOrderList: null, // 列表数据集合
        total: null, // 总记录数
        searchTimeValue: null, // 查询条件时间范围，数组格式，数组第一项为开始时间，第二项结束时间
        listQuery: {
          pageNum: 0, // 当前页码
          pageSize: 10, // 每页显示记录数
          customerId: null, // 会员id
          startTime: '', // 开始时间
          endTime: '', // 结束时间
        },
        pickerOptions: {
          shortcuts: [{
            text: '最近三天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 查询会员预存款列表和预存款余额
      getList() {
        this.listLoading = true;
        this.listQuery.customerId = this.$route.query.id;
        if (this.searchTimeValue) {
          this.listQuery.startTime = this.searchTimeValue[0];
          this.listQuery.endTime = this.searchTimeValue[1];
        } else {
          this.listQuery.startTime = '';
          this.listQuery.endTime = '';
        }
        queryCustomerOrderList(this.listQuery).then((response) => {
          this.customerOrderList = response.data;
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
      // 跳转会员信息地址
      toCustomerInfoList() {
        if (this.listStatus === 0) {
          this.$router.push({path: '/customer/customer/customerdetail', query: {id: this.$route.query.id}})
        }
        if (this.listStatus === 1) {
          this.$router.push({path: '/customer/customer/customerorderlist', query: {id: this.$route.query.id}})
        }
        if (this.listStatus === 2) {
          this.$router.push({path: '/customer/customer/customercouponlist', query: {id: this.$route.query.id}})
        }
        if (this.listStatus === 3) {
          this.$router.push({path: '/customer/customer/customerattentionlist', query: {id: this.$route.query.id}})
        }
        if (this.listStatus === 4) {
          this.$router.push({path: '/customer/customer/customerpoint', query: {id: this.$route.query.id}})
        }
        if (this.listStatus === 5) {
          this.$router.push({path: '/customer/customer/customerpredeposit', query: {id: this.$route.query.id}})
        }
        if (this.listStatus === 6) {
          this.$router.push({path: '/customer/customer/customerlevelfordetail', query: {id: this.$route.query.id}})
        }
      }
    }
  }
</script>
