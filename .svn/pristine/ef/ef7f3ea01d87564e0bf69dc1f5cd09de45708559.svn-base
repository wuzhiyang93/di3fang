<template>
  <div class="app-container">
    <el-form :model="freeshipmarketing" :rules="rules" ref="form" label-position="right" label-width="150px"
             style="margin-top: 20px">
      <el-form-item prop="name">
        <span slot="label">促销名称</span>
        <el-input v-model="freeshipmarketing.name" maxlength="40" style="width: 195px"/>
      </el-form-item>
      <el-form-item prop="timeValue">
        <span slot="label">促销时间</span>
        <el-date-picker
          class="search-datepicker"
          size="medium"
          :clearable="false"
          v-model="freeshipmarketing.timeValue"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          align="right">
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="freeShip.fullPrice">
        <span slot="label">包邮金额</span>
        <el-input v-model="freeshipmarketing.freeShip.fullPrice" maxlength="10" style="width: 250px">
          <template slot="prepend">购物满</template>
          <template slot="append">包邮</template>
        </el-input>
      </el-form-item>
      <el-form-item label="促销描述">
        <el-input v-model="freeshipmarketing.desc" maxlength="2048" type="textarea"/>
      </el-form-item>
      <el-form-item label="启用状态">
        <el-switch
          style="vertical-align: sub"
          v-model="freeshipmarketing.freeShip.isUse"
          active-value="1"
          inactive-value="0"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateData">保存设置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {queryFreeShip, addFreeShip} from '@/api/freeshipmarketing';
  import {priceValidator} from '@/utils/validate';

  export default {
    data() {
      return {
        isProcess: false,// 是否正在处理
        rules: { // 校验规则
          name: [
            {
              required: true,
              trigger: 'blur',
              message: '请输入促销名称'
            }
          ],
          timeValue: [
            {
              required: true,
              trigger: 'blur',
              message: '请选择促销时间'
            }
          ],
          'freeShip.fullPrice': [
            {
              required: true,
              trigger: 'blur',
              validator: priceValidator
            }
          ]
        },
        freeshipmarketing: {
          timeValue: [],
          desc: '',
          endTime: '',
          startTime: '',
          id: '',
          name: '',
          freeShip: {
            fullPrice: '',
            isUse: '0'
          }
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        queryFreeShip().then(res => {
          if (res.flag) {
            this.freeshipmarketing.desc = res.data.desc;
            this.freeshipmarketing.id = res.data.id;
            this.freeshipmarketing.name = res.data.name;
            this.freeshipmarketing.endTime = res.data.endTime;
            this.freeshipmarketing.startTime = res.data.startTime;
            this.freeshipmarketing.freeShip.isUse = res.data.freeShip.isUse;
            this.freeshipmarketing.freeShip.fullPrice = res.data.freeShip.fullPrice;
            this.freeshipmarketing.timeValue = [];
            this.freeshipmarketing.timeValue.push(res.data.startTime);
            this.freeshipmarketing.timeValue.push(res.data.endTime);
          }
        })
      },
      updateData() {
        this.$refs['form'].validate(valid => {
          if (!this.isProcess && valid) {
            this.freeshipmarketing.startTime = this.freeshipmarketing.timeValue[0];
            this.freeshipmarketing.endTime = this.freeshipmarketing.timeValue[1];
            this.isProcess = true;
            addFreeShip(this.freeshipmarketing).then(() => {
              this.isProcess = false;
              this.getList();
              this.$message({
                type: 'success',
                message: '成功!'
              });
            })
          }
        });
      }
    }
  }
</script>
