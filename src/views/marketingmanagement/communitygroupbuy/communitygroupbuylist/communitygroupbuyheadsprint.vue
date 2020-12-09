<template>
  <div class="app-container">
    <div id="print_box">
      <h3 style="text-align: center">{{communityBuyName}}</h3>
      <table cellspacing="0" cellpadding="0" border="0" class="el-table el-table-print" width="100%">
        <thead>
        <tr>
          <th class="cell" width="100">团长名称</th>
          <th class="cell" width="120">手机号码</th>
          <th class="cell">小区名称</th>
          <th class="cell">收货地址</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="cell">{{info.name}}</td>
          <td class="cell">{{info.mobile}}</td>
          <td class="cell">{{info.detailAddress}}</td>
          <td class="cell">{{info.pickUpAddress}}</td>
        </tr>
        </tbody>
      </table>
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
      <div style="line-height: 50px">客户明细</div>
      <table cellspacing="0" cellpadding="0" border="0" class="el-table el-table-print" width="100%">
        <thead>
        <tr>
          <th class="cell" width="120">手机号码</th>
          <th class="cell">提货方式/门栋号</th>
          <th class="cell">商品名称</th>
          <th class="cell">数量</th>
        </tr>
        </thead>
        <tbody v-for="iteam in customerBuyInfo">
        <tr>
          <td class="cell" :rowspan="iteam.communityInvoiceDetails.length+1">{{iteam.mobile}}</td>
          <td class="cell" :rowspan="iteam.communityInvoiceDetails.length+1">{{iteam.deliveryType |
            deliveryTypeFilter}}
          </td>
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
        :to="{path:'/marketingmanager/communitygroupbuy/communitygroupbuydeliverlist',query:{id:dataQuery.communityBuyId,name:communityBuyName}}">
        <el-button type="info" icon="el-icon-back">返回发货单</el-button>
      </router-link>
      <el-button type="primary" icon="el-icon-printer" v-print="'#print_box'">打印</el-button>
    </div>
  </div>
</template>
<script>

  import {
    printInvoiceOfHead, //查询活动中团长的销售信息
  } from '@/api/communitygroupbuyheadsprint';


  export default {
    data() {
      return {
        communityBuyName: this.$route.query.name,//活动名称
        dataQuery: {
          headId: this.$route.query.headId,
          communityBuyId: this.$route.query.id
        }, // 查询参数
        info: {
          name: '',
          mobile: '',
          detailAddress: '',
          pickUpAddress: '',
        },
        skuData: [],//出库商品汇总
        customerBuyInfo: [],//客户购买明细
      }
    },
    created() {
      this.getData();
    },

    filters: {
      deliveryTypeFilter(value) {
        if (value == '1') {
          return '送货上门';
        }
        return '自提';
      },
    },

    methods: {
      //获取列表数据
      getData() {
        printInvoiceOfHead(this.dataQuery).then(response => {
          this.info.name = response.name;
          this.info.mobile = response.mobile;
          this.info.detailAddress = response.detailAddress;
          this.info.pickUpAddress = response.pickUpAddress;
          this.skuData = response.communityInvoiceDetails;
          this.customerBuyInfo = response.printHeadResponses;
        });
      },
    }
  }
</script>
