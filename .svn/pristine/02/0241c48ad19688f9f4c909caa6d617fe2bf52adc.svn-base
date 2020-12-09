<template>
  <div class="app-container">
    <el-form :model="registerMarketing" :rules="rules" ref="form" label-position="right" label-width="150px"
             style="margin-top: 20px">
      <el-form-item prop="timeValue">
        <span slot="label">促销时间</span>
        <el-date-picker
          class="search-datepicker"
          size="medium"
          :clearable="false"
          v-model="registerMarketing.timeValue"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          align="right">
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="pointNum">
        <span slot="label">送积分</span>
        <el-input maxlength="10" v-model="registerMarketing.pointNum" style="width: 195px"/>
      </el-form-item>
      <el-form-item label="送优惠券">
        <el-select v-model="registerMarketing.couponId" filterable placeholder="请选择优惠券">
          <el-option
            v-for="item in couponList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="启用状态">
        <el-switch
          style="vertical-align: sub"
          v-model="registerMarketing.isUse"
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

  import {queryRegisterMarketing, updateRegisterMarketing} from '@/api/registermarketing';
  import {digitsValidator} from '@/utils/validate';

  export default {
    data() {
      return {
        isProcess: false,// 是否正在处理
        couponList: [],
        registerMarketing: {
          couponId: -1,
          endTime: '',
          id: '',
          isUse: '0',
          pointNum: 0,
          startTime: '',
          timeValue: [],
        },//注册促销
        rules: { // 校验规则
          pointNum: [
            {
              required: true,
              trigger: 'blur',
              validator: digitsValidator
            }
          ],
          timeValue: [
            {
              required: true,
              trigger: 'blur',
              message: '请选择促销时间'
            }
          ],
        },
      }
    },
    created() {
      this.getList()
    },

    methods: {
      getList() {
        queryRegisterMarketing().then(res => {
          res.couponList.unshift({id: -1, name: '未选择优惠卷'});
          this.couponList = res.couponList;
          this.registerMarketing.couponId = res.couponId;
          this.registerMarketing.id = res.id;
          this.registerMarketing.startTime = res.startTime;
          this.registerMarketing.endTime = res.endTime;
          this.registerMarketing.pointNum = res.pointNum + '';
          this.registerMarketing.isUse = res.isUse;
          this.registerMarketing.timeValue = [];
          this.registerMarketing.timeValue.push(res.startTime);
          this.registerMarketing.timeValue.push(res.endTime);
        })
      },
      updateData() {
        this.$refs['form'].validate(valid => {
          if (!this.isProcess && valid) {
            this.registerMarketing.startTime = this.registerMarketing.timeValue[0];
            this.registerMarketing.endTime = this.registerMarketing.timeValue[1];
            this.isProcess = true;
            updateRegisterMarketing(this.registerMarketing).then(() => {
              this.isProcess = false;
              this.getList();
              this.$message({
                type: 'success',
                message: '更新成功!'
              });
            })
          }
        });
      }
    }
  }
</script>
