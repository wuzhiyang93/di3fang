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

    <el-table
      :data="customerCouponList"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="优惠券号码">
        <template slot-scope="scope">{{ scope.row.code }}</template>
      </el-table-column>
      <el-table-column label="类别">
        <template slot-scope="scope">
          <span v-if="scope.row.type == '0'">直降</span>
          <span v-if="scope.row.type == '1'">满减</span>
        </template>
      </el-table-column>
      <el-table-column label="优惠金额">
        <template slot-scope="scope">{{ scope.row.type=='1'?scope.row.price:scope.row.fallPrice }}</template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == '1'" type="info">未使用</el-tag>
          <el-tag v-if="scope.row.status == '2'" type="success">已使用</el-tag>
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
    queryCustomerCouponList
  } from '@/api/customercouponlist';

  export default {
    data() {
      return {
        listStatus: '2', // 列表状态 会员优惠券列表
        listLoading: true, // 列表加载标识
        customerCouponList: null, // 列表数据集合
        total: null, // 总记录数
        listQuery: {
          pageNum: 0, // 当前页码
          pageSize: 10, // 每页显示记录数
          customerId: null, // 会员id
          status: '1' // 状态 null:全部 1:可用 2:已使用 3:已过期
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 查询会员优惠券列表
      getList() {
        this.listLoading = true;
        this.listQuery.customerId = this.$route.query.id;
        queryCustomerCouponList(this.listQuery).then((response) => {
          this.customerCouponList = response.data;
          this.total = response.recordsTotal;
          this.listLoading = false
        })
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
