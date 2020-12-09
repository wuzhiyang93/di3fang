<template>
  <div class="app-container">
    <div id="print_box">
      <h3 style="text-align: center">{{communityBuyName}}</h3>
      <div style="line-height: 50px">出库商品汇总</div>
      <table cellspacing="0" cellpadding="0" border="0" class="el-table el-table-print" width="100%">
        <thead>
        <tr>
          <th class="cell">商品名称</th>
          <th class="cell">数量</th>
        </tr>
        </thead>
        <tbody v-for="iteam in skuData">
        <tr>
          <td class="cell">{{iteam.skuName}}</td>
          <td class="cell">{{iteam.num}}</td>
        </tr>
        </tbody>
      </table>
      <div style="line-height: 50px">团长明细</div>
      <table cellspacing="0" cellpadding="0" border="0" class="el-table el-table-print" width="100%">
        <thead>
        <tr>
          <th class="cell" width="100">团长名称</th>
          <th class="cell" width="120">手机号码</th>
          <th class="cell">收货地址</th>
          <th class="cell">商品名称</th>
          <th class="cell">数量</th>
        </tr>
        </thead>

        <tbody v-for="iteam in headInfo">
        <tr>
          <td class="cell" :rowspan="iteam.communityInvoiceDetails.length + 1">{{iteam.name}}</td>
          <td class="cell" :rowspan="iteam.communityInvoiceDetails.length + 1">{{iteam.mobile}}</td>
          <td class="cell" :rowspan="iteam.communityInvoiceDetails.length + 1">{{iteam.pickUpAddress}}</td>
        </tr>
        <tr v-for="temp in iteam.communityInvoiceDetails">
          <td class="cell">{{temp.skuName}}</td>
          <td class="cell">{{temp.num}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div style="text-align: center; margin-top: 20px">
      <router-link
        :to="{path:'/marketingmanager/communitygroupbuy/communitygroupbuydeliverlist',query:{id:communityBuyId,name:communityBuyName}}">
        <el-button type="info" icon="el-icon-back">返回发货单</el-button>
      </router-link>
      <el-button type="primary" icon="el-icon-printer" v-print="'#print_box'">打印</el-button>
    </div>
  </div>
</template>
<script>

  import {
    printInvoice, //查询打印活动发货单信息
  } from '@/api/communitygroupbuyprint';


  export default {
    data() {
      return {
        communityBuyName: this.$route.query.name,//活动名称
        communityBuyId: this.$route.query.id,
        skuData: [],//出库商品汇总
        headInfo: [],//客户购买明细
      }
    },
    created() {
      this.getData();
    },
    methods: {
      //获取列表数据
      getData() {
        printInvoice(this.communityBuyId).then(response => {
          this.skuData = response.communityInvoiceDetails;
          this.headInfo = response.printHeadResponses;
        });
      },
    }
  }

</script>
