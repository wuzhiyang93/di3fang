<template>
  <div class="app-container">
    <div style="line-height: 50px">退款概况</div>
    <div class="detailsTable">
      <el-row>
        <el-col :span="12">退款原因：{{reasonMap[backOrder.reason]}}</el-col>
        <el-col :span="12">退款金额：{{backOrder.backPrice.toFixed(2)}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">问题说明：{{backOrder.desc}}</el-col>
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
      <el-alert v-if="backOrder.predepositPay == '1'"
                style="line-height: initial; margin-bottom: 20px"
                title="退款金额退至用户预存款中!"
                type="warning"
                show-icon
                :closable="false">
      </el-alert>
      <el-form label-position="right" label-width="100px">
        <el-form-item label="审核">
          <el-select class="filter-item" v-model="reviewValue" placeholder="请选择审核结果">
            <el-option label="同意退款" value="0"></el-option>
            <el-option label="拒绝退款" value="1"></el-option>
          </el-select>
          <div></div>
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
  import {queryBackOrderById, agreeToRefund, refuseRefund} from '@/api/refundreview';

  export default {
    data() {
      return {
        msg: '',// 留言
        reviewValue: '0',//同意拒绝退款标记
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
        }, // 退款原因映射
        listLoading: true,
        backOrder: {
          backPrice: 0,
        },// 退单详情
        isProcess: false, // 接口是否处理中
      }
    },
    created() {
      this.query()
    },
    methods: {
      query() {
        queryBackOrderById(this.$route.query.id).then(res => {
          this.backOrder = res;
          this.listLoading = false;
        })
      },
      // 是否显示操作
      showOper() {
        return this.backOrder.status == '1';
      },
      reviewDialog() {
        this.$confirm(this.reviewValue == '0' ? '你确定要退款吗？' : '你确定要拒绝退款吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.isProcess) {
            return;
          }
          this.isProcess = true;

          // 同意退款
          if (this.reviewValue == '0') {
            agreeToRefund(this.backOrder.id, this.msg).then((res) => {
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
            // 拒绝退款
            refuseRefund(this.backOrder.id, this.msg).then((res) => {
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
      logContent() {
        return function (log) {
          if (log.status == '1') {
            return '提交退款申请(操作：顾客)';
          } else if (log.status == '2') {
            return '退款' + this.backOrder.backPrice + '元成功 (操作：平台)留言：' + log.message + '';
          } else if (log.status == '3') {
            return '拒绝退款 (操作：平台)留言：' + log.message + '';
          }
          return '';
        }
      }
    }
  }
</script>
