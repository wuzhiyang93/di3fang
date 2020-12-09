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
    <div class="detailsTable">
      <el-row>
        <el-col :span="24" v-if="customer.image">用户头像：<img style="max-width: 50px; height: 50px; vertical-align: middle"
                                                           :src="customer.image"
                                                           alt=""></el-col>
        <el-col :span="24" v-else>用户头像：无</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">用户名：{{customer.userName}}</el-col>
        <el-col :span="8">真实姓名：{{customer.releName}}</el-col>
        <el-col :span="8">
          兴趣爱好：{{customer.interest?(customer.interest.length>20?substring(customer.interest,0,19):customer.interest):''}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">昵称：{{customer.nickName}}</el-col>
        <el-col :span="8">身份证：{{customer.cardId}}</el-col>
        <el-col :span="8">收货地址：</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">性别：{{getGender(customer.gender)}}</el-col>
        <el-col :span="8">手机：{{customer.mobile}}</el-col>
        <el-col :span="8">月收入：{{getMonthlyIncome(customer.monthlyIncome)}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">邮箱：{{customer.email}}</el-col>
        <el-col :span="8">注册时间：{{customer.createTime}}</el-col>
        <el-col :span="8">修改时间：{{customer.modifyTime}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">消费总额：{{getPrice(customer.consumptionAmount)}}</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {
    queryCustomerDetailById
  } from '@/api/customerdetail';

  export default {
    data() {
      return {
        listStatus: '0', // 列表状态 会员详情
        customer: {
          image: ''
        }, // 会员信息
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 查询会员信息详情
      getList() {
        queryCustomerDetailById(this.$route.query.id).then((response) => {
          this.customer = response;
        })
      },
      // 获取性别
      getGender(gender) {
        if (gender == '0') {
          return '保密';
        } else if (gender == '1') {
          return '男';
        } else if (gender == '2') {
          return '女';
        }
      },
      // 获取月收入
      getMonthlyIncome(monthlyIncome) {
        if (monthlyIncome == '0') {
          return '无收入';
        } else if (monthlyIncome == '1') {
          return '2000元以下';
        } else if (monthlyIncome == '2') {
          return '2000-3999元';
        } else if (monthlyIncome == '3') {
          return '4000-5999元';
        } else if (monthlyIncome == '4') {
          return '6000-7999元';
        } else if (monthlyIncome == '5') {
          return '8000元以上';
        }
      },
      // 获取金额
      getPrice(consumptionAmount) {
        if (consumptionAmount) {
          return consumptionAmount.toFixed(2);
        } else {
          return '0.00';
        }
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
