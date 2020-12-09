<template>
  <div class="app-container">
    <div style="line-height: 50px">退货概况</div>
    <div class="detailsTable">
      <el-row>
        <el-col :span="12">退货原因：{{reasonMap[backOrder.reason]}}</el-col>
        <el-col :span="12">商品返回方式：快递</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">退货金额：{{backOrder.backPrice.toFixed(2)}}</el-col>
        <el-col :span="12">实退金额：{{backOrder.realBackPrice?backOrder.realBackPrice.toFixed(2):'0.00'}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">问题说明：{{backOrder.desc}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div>申请凭据：{{credentialStr}}</div>
          <div>
            <a v-for="url in backOrder.picsLists" :href="url" target="_blank"
               style="display:inline-block; margin: 10px 10px 0 0; max-height: 100px"><img :src="url"
                                                                                           style="max-height: 100px"></a>
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="line-height: 50px">商品列表</div>
    <el-table
      :data="backOrder.orderSkus"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="商品图片" width="80">
        <template slot-scope="scope"><img :src="scope.row.skuImage" width="50" height="50"></template>
      </el-table-column>
      <el-table-column label="商品名称">
        <template slot-scope="scope">{{ scope.row.skuName }}</template>
      </el-table-column>
      <el-table-column label="商品货号" width="160">
        <template slot-scope="scope">{{ scope.row.skuId }}</template>
      </el-table-column>
      <el-table-column label="销售单价" width="100">
        <template slot-scope="scope">{{ scope.row.unitPrice.toFixed(2) }}</template>
      </el-table-column>
      <el-table-column label="数量" width="60">
        <template slot-scope="scope">{{ scope.row.returnNum }}</template>
      </el-table-column>
      <el-table-column label="实付金额" width="100">
        <template slot-scope="scope">{{ (scope.row.returnNum * scope.row.unitPrice).toFixed(2)}}</template>
      </el-table-column>
    </el-table>
    <div v-if="backOrder.logisCompanyName" style="line-height: 50px">退单物流信息</div>
    <div v-if="backOrder.logisCompanyName" class="detailsTable">
      <el-row>
        <el-col :span="12">退货物流名称：{{backOrder.logisCompanyName}}</el-col>
        <el-col :span="12">退货物流单号：{{backOrder.waybillCode}}</el-col>
      </el-row>
    </div>
    <div style="line-height: 50px">订单操作日志</div>
    <el-table
      :data="backOrder.backOrderLogs"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="操作内容">
        <template slot-scope="scope">{{logContent(scope.row)}}</template>
      </el-table-column>
      <el-table-column label="操作时间">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
    </el-table>
    <div v-if="showOper()" style="line-height: 50px">操作（重要）</div>
    <div v-if="showOper()" class="detailsTable" style="padding: 20px">
      <el-alert v-if="backOrder.predepositPay == '1' && backOrder.status=='7'"
                style="line-height: initial; margin-bottom: 20px"
                title="退款金额退至用户预存款中!"
                type="warning"
                show-icon
                :closable="false">
      </el-alert>
      <el-form label-position="right" label-width="100px">
        <el-form-item v-if="backOrder.status=='4'" label="审核">
          <el-select class="filter-item" v-model="reviewValue" placeholder="请选择审核结果">
            <el-option label="同意退货" value="0"></el-option>
            <el-option label="拒绝退货" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="backOrder.status=='7'" label="审核">
          <el-select class="filter-item" v-model="reviewValue" placeholder="请选择审核结果">
            <el-option label="确认收货" value="0"></el-option>
            <el-option label="拒绝收货" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="退款金额" v-if="isShow()">
          <el-input v-model="money" maxlength="10" style="width: 200px">
            <template slot="prepend">¥</template>
          </el-input>
        </el-form-item>
        <el-form-item label="给客户留言">
          <el-input maxlength="255" v-model="msg" type="textarea" :rows="3"/>
        </el-form-item>
      </el-form>
    </div>
    <div style="text-align: center; margin-top: 20px">
      <router-link to="/ordermanager/ordermanager/backorders">
        <el-button type="info" icon="el-icon-back">返回退单列表</el-button>
      </router-link>
      <el-button v-if="showOper()" type="primary" @click="reviewDialog">保存</el-button>
    </div>
  </div>
</template>

<script>
  import {queryBackOrderById, agreeToReturn, refuseReturn, confirmReturn, refuseToReceive} from '@/api/returnreview';
  import {isMoney} from '@/utils/validate';

  export default {
    data() {
      return {
        money: '', //退货金额
        msg: '',//留言
        reviewValue: '0',
        reasonMap: {
          '1': '不想买了',
          '2': '收货人信息有误',
          '3': '未按指定时间发货',
          '4': '其他',
          '5': '不想买了',
          '6': '商品质量问题',
          '7': '收到商品与描述不符',
          '8': '其他',
          '9': '系统自动申请'
        },// 退货原因
        listLoading: true,
        backOrder: {
          backPrice: 0
        },// 退货详情
        isProcess: false, // 接口是否处理中
      }
    },
    created() {
      this.query()
    },
    methods: {
      // 是否显示操作
      showOper() {
        return this.backOrder.status == '4' || this.backOrder.status == '7';
      },
      // 是否显示退款金额
      isShow() {
        return this.reviewValue == '0' && this.backOrder.status == '7';
      },
      query() {
        queryBackOrderById(this.$route.query.id).then(res => {
          this.backOrder = res;
          this.listLoading = false;
        })
      },
      reviewDialog() {
        // 退货第一步审核
        if (this.backOrder.status == '4') {
          this.firstAudit();
        } else if (this.backOrder.status == '7') {
          // 退货第二步审核
          this.secondAudit();
        }
      },
      // 退货第一步审核
      firstAudit() {
        this.$confirm(this.reviewValue == '0' ? '你确定同意退货吗？' : '你确定要拒绝退货吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.isProcess) {
            return;
          }

          this.isProcess = true;

          // 同意退货
          if (this.reviewValue == '0') {
            agreeToReturn(this.backOrder.id, this.msg).then((res) => {
              this.isProcess = false;
              if (res > 0) {
                this.$router.push({path: '/ordermanager/ordermanager/backorders'})
                this.$message({
                  type: 'success',
                  message: '同意退货成功'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '同意退货失败'
                })
              }
            });
          } else {
            // 拒绝退货
            refuseReturn(this.backOrder.id, this.msg).then((res) => {
              this.isProcess = false;
              if (res > 0) {
                this.$router.push({path: '/ordermanager/ordermanager/backorders'})
                this.$message({
                  type: 'success',
                  message: '拒绝退货成功'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '拒绝退货失败'
                })
              }
            });
          }
        })
      },
      // 退货第二步审核
      secondAudit() {
        // 如果同意退货则判断输入的金额是否合法
        if (this.reviewValue == '0') {
          if (!isMoney(this.money)) {
            this.$message({
              type: 'error',
              message: '请输入合法的金额'
            })
            return;
          }

          if (parseFloat(this.money) > parseFloat(this.backOrder.backPrice)) {
            this.$message({
              type: 'error',
              message: '退货金额不能超过' + this.backOrder.backPrice.toFixed(2) + '元'
            })
            return;
          }
        }

        this.$confirm(this.reviewValue == '0' ? '你确定要退款吗？' : '你确定要拒绝退款吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.isProcess) {
            return;
          }

          this.isProcess = true;
          // 同意退货
          if (this.reviewValue == '0') {
            confirmReturn(this.backOrder.id, this.msg, this.money).then((res) => {
              this.isProcess = false;
              if (res > 0) {
                this.$router.push({path: '/ordermanager/ordermanager/backorders'})
                this.$message({
                  type: 'success',
                  message: '退款成功'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '退款失败'
                })
              }
            });
          } else {
            // 拒绝退货
            refuseToReceive(this.backOrder.id, this.msg).then((res) => {
              this.isProcess = false;
              if (res > 0) {
                this.$router.push({path: '/ordermanager/ordermanager/backorders'})
                this.$message({
                  type: 'success',
                  message: '拒绝退款成功'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '拒绝退款失败'
                })
              }
            });
          }
        })
      }
    },
    computed: {
      // 凭证
      credentialStr: function () {
        let credentialStr = "没有任何凭据";
        if (this.backOrder.credential == "1") {
          credentialStr = "有发票";
        } else if (this.backOrder.credential == "2") {
          credentialStr = "有质检报告";
        }
        return credentialStr;
      },
      // 日志内容
      logContent() {
        return function (log) {
          if (log.status == '4') {
            return '提交退货申请(操作：顾客)';
          } else if (log.status == '6') {
            return '同意退货(操作：平台)留言：' + log.message + '';
          } else if (log.status == '5') {
            return '拒绝退货(操作：平台)留言：' + log.message + '';
          } else if (log.status == '7') {
            return '填写快递信息(操作：顾客)';
          } else if (log.status == '8') {
            return '退款' + this.backOrder.realBackPrice + '成功 (操作：平台)留言：' + log.message + '';
          } else if (log.status == '9') {
            return '拒绝退货(操作：平台)留言：' + log.message + '';
          }
          return '';
        }
      }
    }
  }
</script>
