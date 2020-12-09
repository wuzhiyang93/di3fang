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

    <el-form label-position="right" :model="form" :rules="rules" ref="form" label-width="150px"
             style="margin-top: 20px">
      <el-form-item label="会员等级">{{customer.customerLevel.name}}</el-form-item>
      <el-form-item label="消费总金额">{{getPrice(customer.consumptionAmount)}}</el-form-item>
      <el-form-item prop="money">
        <span slot="label">调整余额</span>
        <el-tooltip class="item" effect="dark" content="可填写正负数，正数增加积分，负数减少积分。" placement="right">
          <el-input style="width: 200px" maxlength="7" v-model="form.money"/>
        </el-tooltip>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateCustomMoney">保存设置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import {
    queryCustomerByIdWithLevel,
    updateCustomMoney
  } from '@/api/customerlevelfordetail';
  import {allMoneyValidator} from '@/utils/validate';

  export default {
    data() {
      return {
        listStatus: '6', // 列表状态 会员等级
        customer: {
          customerLevel: ''
        }, // 会员信息
        isProcess: false, // 接口是否处理中
        form: { // 提交form表单
          customerId: null, // 会员id
          money: null, // 消费金额
        },
        rules: { // 校验规则
          money: [
            {
              required: true,
              trigger: 'blur',
              validator: allMoneyValidator
            }
          ],
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 查询会员信息详情（包含会员等级）
      getList() {
        this.resetForm();
        if (this.$refs["form"]) {
          this.$refs["form"].resetFields();
        }
        queryCustomerByIdWithLevel(this.$route.query.id).then((response) => {
          this.customer = response;
        })
      },
      // 获取消费金额
      getPrice(consumptionAmount) {
        if (consumptionAmount) {
          return consumptionAmount.toFixed(2);
        } else {
          return '0.00';
        }
      },
      // 更新会员消费金额
      updateCustomMoney() {
        this.form.customerId = this.$route.query.id;
        this.$refs['form'].validate(valid => {
          if (!this.isProcess && valid) {
            this.isProcess = true;
            updateCustomMoney(this.form).then(res => {
              this.isProcess = false;
              if (res == 1) {
                this.getList();
                this.$message({
                  type: 'success',
                  message: '调整消费金额成功!'
                })
              } else if (res == -1) {
                this.$message({
                  type: 'error',
                  message: '更改之后消费金额不能小于零!'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '调整消费金额成功!'
                })
              }
            })
          }
        });
      },
      // 重置form表单
      resetForm() {
        this.form = {customerId: null, money: null};
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
