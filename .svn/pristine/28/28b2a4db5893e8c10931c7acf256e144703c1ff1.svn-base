<template>
  <div class="app-container">
    <div id="print_box">
      <div style="line-height: 50px">订单概况</div>
      <div class="detailsTable">
        <el-row>
          <el-col :span="8">订单编号：{{order.orderCode}}</el-col>
          <el-col :span="8">下单时间：{{order.createTime}}</el-col>
          <el-col :span="8">订单状态：{{orderStatus}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">是否使用预存款支付：{{order.predepositPay == "0"?'否':'是'}}</el-col>
          <el-col :span="8">订单原始金额：{{order.originalPrice.toFixed(2)}}</el-col>
          <el-col :span="8">订单总优惠金额：{{order.redEnvelopePrice.toFixed(2)}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            红包金额：{{order.redEnvelopePrice==0?order.redEnvelopePrice.toFixed(2):order.redEnvelopePrice.toFixed(2) + '(' +
            order.redEnvelopeCode +')'}}
          </el-col>
          <el-col :span="8">订单实际金额：{{order.price.toFixed(2)}}</el-col>
          <el-col :span="8" v-if="isPickedOrder()">取货时间：{{order.pickUpTime}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="24">客户留言：{{order.storeOrderAttr.remark}}</el-col>
        </el-row>
      </div>

      <div style="line-height: 50px">发票信息</div>
      <div v-if="order.storeOrderAttr.invoiceType == '0'" class="detailsTable">
        <el-row>
          <el-col :span="24">不需要发票</el-col>
        </el-row>
      </div>
      <div v-if="order.storeOrderAttr.invoiceType == '1'" class="detailsTable">
        <el-row>
          <el-col :span="8">发票类型: 增值税普票</el-col>
          <el-col :span="8">发票抬头：{{order.storeOrderAttr.invoiceTitle}}</el-col>
          <el-col :span="8">抬头类型：{{invoiceTitleType[order.storeOrderAttr.invoiceTitleType]}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">发票内容：{{invoiceContentMap[order.storeOrderAttr.invoiceContent]}}</el-col>
          <el-col :span="8">税号：{{order.storeOrderAttr.invoiceTaxid}}</el-col>
        </el-row>
      </div>
      <div v-if="order.storeOrderAttr.invoiceType == '2'" class="detailsTable">
        <el-row>
          <el-col :span="8">发票类型：增值税专票</el-col>
          <el-col :span="8">单位名称：{{order.storeOrderAttr.invoiceCompanyName}}</el-col>
          <el-col :span="8">税号：{{order.storeOrderAttr.invoiceTaxid}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">注册地址：{{order.storeOrderAttr.invoiceRegisterAddress}}</el-col>
          <el-col :span="8">注册电话：{{order.storeOrderAttr.invoiceRegisterMobile}}</el-col>
          <el-col :span="8">开户银行：{{order.storeOrderAttr.invoiceOpenBank}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">银行账户：{{order.storeOrderAttr.invoiceBankAccount}}</el-col>
          <el-col :span="16">发票内容：{{invoiceContentMap[order.storeOrderAttr.invoiceContent]}}</el-col>
        </el-row>
      </div>

      <div style="line-height: 50px">商品列表</div>
      <table cellspacing="0" cellpadding="0" border="0" class="el-table"
             style="margin-top: 5px; border: 1px solid #EBEEF5;" width="100%">
        <thead>
        <tr>
          <th width="80" class="cell is-leaf">商品图片</th>
          <th class="cell is-leaf">商品名称</th>
          <th width="100" class="cell is-leaf">销售价</th>
          <th width="60" class="cell is-leaf">数量</th>
          <th class="cell is-leaf">商品规格</th>
          <th width="100" class="cell is-leaf">商品总价</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="sku in order.storeOrderSkus">
          <td class="cell"><img :src="sku.skuImage" width="50" height="50" alt="">
          </td>
          <td class="cell">{{sku.skuName}}</td>
          <td class="cell">{{sku.skuPrice.toFixed(2)}}</td>
          <td class="cell">{{sku.num}}</td>
          <td class="cell">{{sku.skuSpecs}}</td>
          <td class="cell">{{sku.price.toFixed(2)}}</td>
        </tr>
        </tbody>
      </table>

      <div style="line-height: 50px" v-if="isPickedOrder()">订单操作日志</div>
      <table v-if="isPickedOrder()" cellspacing="0" cellpadding="0" border="0" class="el-table"
             style="margin-top: 5px; border: 1px solid #EBEEF5;" width="100%">
        <thead>
        <tr>
          <th class="cell is-leaf">操作类型</th>
          <th class="cell is-leaf">操作人</th>
          <th class="cell is-leaf">操作时间</th>
          <th class="cell is-leaf">操作原因</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="oper in order.storeOrderOperationLogs">
          <td class="cell">{{operType[oper.type]}}</td>
          <td class="cell">{{oper.operationName}}</td>
          <td class="cell">{{oper.createTime}}</td>
          <td class="cell">{{oper.remark?oper.remark:''}}</td>
        </tr>
        </tbody>
      </table>

    </div>
    <div style="text-align: center; margin-top: 20px">
      <el-button type="info" icon="el-icon-back" @click="goBack">返回订单列表</el-button>
      <el-button type="primary" icon="el-icon-printer" v-print="'#print_box'">打印</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["orderType", "url"],
    data() {
      return {
        invoiceContentMap: {
          "1": "商品明细",
          "2": "商品类别"
        }, // 发票明细
        operType: {
          '1': '确认付款',
          '2': '核销（提货）',
          '3': '取消订单'
        },// 操作类型
        invoiceTitleType: {'1': '企业', '2': '个人'}, // 发票抬头类型
        order: {
          redEnvelopePrice: 0,
          originalPrice: 0,
          price: 0,
          storeOrderAttr: {},
        }
      }
    },
    created() {
      this.queryDetail()
    },
    methods: {
      queryDetail() {
        this.url(this.$route.query.id).then(res => {
          res.data.redEnvelopePrice = res.data.redEnvelopePrice ? res.data.redEnvelopePrice : 0;
          this.order = res.data;
        })
      },
      // 判断是否是自提订单
      isPickedOrder() {
        return this.orderType == '1';
      },
      // 返回
      goBack() {
        this.$router.back(-1);
      }
    },
    computed: {
      // 订单状态
      orderStatus: function () {
        let msg = "";
        //判断状态
        if (this.order.status == '1') {
          msg = "待付款";
        } else if (this.order.status == '2') {
          msg = "待取货";
        } else if (this.order.status == '3') {
          msg = "已完成";
        } else if (this.order.status == '4') {
          msg = "已取消";
        }
        return msg;
      }
    }
  }
</script>
