<template>
  <div class="app-container">
    <el-form label-position="right" label-width="150px" style="margin-top: 20px">
      <el-form-item label="是否允许退单">
        <el-switch
          style="vertical-align: sub"
          v-model="orderSetting.allowBack"
          active-value="0"
          inactive-value="1"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <span slot="label"><span class="labelImportant">*</span>订单自动收货时间</span>
        <el-input type="number" maxlength="5" v-model="orderSetting.aotuConfirm" style="width: 200px">
          <template slot="append">天</template>
        </el-input>
      </el-form-item>
      <el-form-item label="货到付款">
        <el-switch
          style="vertical-align: sub"
          v-model="orderSetting.cashonDelivery"
          active-value="0"
          inactive-value="1"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item label="退货说明">
        <tinymce v-model="orderSetting.returnDesc" :height="300"/>
      </el-form-item>
      <el-form-item label="退款说明">
        <tinymce v-model="orderSetting.refundsDesc" :height="300"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="update()">保存设置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce';
  import {queryOrderSetting, updateOrderSetting} from '@/api/ordersetting';

  export default {
    components: {Tinymce},
    data() {
      return {
        orderSetting: {},
        isProcess: false, // 接口是否处理中
      }
    },
    created() {
      this.querySetting()
    },
    methods: {
      querySetting() {
        queryOrderSetting().then(res => {
          this.orderSetting = res;
        })
      },
      update() {
        if (this.isProcess) {
          return;
        }
        this.isProcess = true;
        updateOrderSetting(this.orderSetting).then(() => {
          this.isProcess = false;
          this.$message({
            type: 'success',
            message: '更新成功'
          });
          this.querySetting()
        })
      }
    }
  }
</script>
