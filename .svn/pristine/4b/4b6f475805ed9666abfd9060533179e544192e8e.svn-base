<template>
  <div class="app-container">
    <el-steps :active="parseInt(pointOrder.status)+1" align-center finish-status="success">
      <el-step title="已付款" :description="pointOrder.createTime"></el-step>
      <el-step title="已发货" :description="pointOrder.deliveryTime"></el-step>
      <el-step title="已完成" :description="pointOrder.receiptTime"></el-step>
    </el-steps>
    <div style="line-height: 50px">订单信息</div>
    <div class="detailsTable">
      <el-row>
        <el-col :span="8">订单编号：{{pointOrder.code}}</el-col>
        <el-col :span="8">下单时间：{{pointOrder.createTime}}</el-col>
        <el-col :span="8">用户名：{{pointOrder.customerName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">购买数量：{{pointOrder.num}}</el-col>
        <el-col :span="8">所需积分：{{pointOrder.point}}</el-col>
        <el-col :span="8">参考价格：{{pointOrder.skuDetail?pointOrder.skuDetail.price:''}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">商品名称：{{pointOrder.skuDetail?pointOrder.skuDetail.name:''}}</el-col>
      </el-row>
    </div>
    <div style="line-height: 50px">物流信息</div>
    <div class="detailsTable">
      <el-row>
        <el-col :span="8">物流公司：{{pointOrder.logisticsCompanyName}}</el-col>
        <el-col :span="8">物流单号：{{pointOrder.logisticsCode}}</el-col>
        <el-col :span="8">收货人：{{pointOrder.receiver}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">手机号：{{pointOrder.mobile}}</el-col>
        <el-col :span="16">收货地址：{{pointOrder.address}}</el-col>
      </el-row>
    </div>
    <div style="text-align: center; margin-top: 20px">
      <router-link to="/marketingmanager/pointsmall/pointorderlist">
        <el-button type="info" icon="el-icon-back">返回订单列表</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
  import {queryPointOrderById} from '@/api/pointorderdetail';

  export default {
    data() {
      return {
        pointOrder: null // 积分商城订单详情
      }
    },
    created() {
      this.getList(this.$route.query.id)
    },
    methods: {
      // 查询积分商城订单列表
      getList(id) {
        queryPointOrderById(id).then((response) => {
          if (response.flag) {
            this.pointOrder = response.data;
          }
        })
      },
    }
  }
</script>
