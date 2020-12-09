<template>
  <div class="app-container">
    <el-form label-position="right" :model="form" :rules="rules" ref="form" label-width="150px"
             style="margin-top: 20px">
      <el-form-item prop="headName">
        <span slot="label"><span class="labelImportant">*</span>团长名称</span>
        <el-input style="width: 380px" v-model="form.headName"/>
        <div style="color: #999; line-height: initial; margin-top: 5px">可自定义店铺团长的名称，例如社区合伙人，名称不可超6个字</div>
      </el-form-item>
      <el-form-item label="团长审核">
        <el-switch
          style="vertical-align: sub"
          v-model="switchValue"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item label="团长审核">
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="0" style="display: block">审核结果通知<span style="color: #999">（团长审核通过或拒绝时触发）</span>
          </el-checkbox>
          <el-checkbox label="1" style="display: block">佣金结算通知<span style="color: #999">（商家给团长提现打款时触发）</span>
          </el-checkbox>
          <el-checkbox label="2" style="display: block">提现打款通知<span style="color: #999">（团长佣金结算成功时触发）</span>
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateData">保存设置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import {
    queryCommunitySet,  //查询
    saveSetting // 保存
  } from '@/api/communitygroupbuyset';

  import {
    isEmpty //校验输入框
  } from '@/utils/validate'


  export default {
    data() {
      return {
        isProcess: false,  //接口正在处理中
        switchValue: true,  //是否开启审核
        checkList: [], //选中的数组
        name: '', //团长名称
        switchValue: '',  //是否开启审核
        setting: {
          id: "1",    //id
          name: '',  //团长名称
          audit: this.switchValue ? "0" : "1", //开启审核
          smsAuditNotice: "1",  //审核结果通知
          smsPayNotice: "1",  //提现打款通知
          smsCommissionNotice: "1" //佣金结算通知
        },
        form: {
          headName: ''
        }, //审核表单
        rules: { //校验规则
          headName: [
            {
              required: true,
              trigger: 'blur',
              validator: isEmpty,
            }
          ]
        },
      }
    },
    created() {
      this.querySet()
    },
    methods: {
      //保存设置
      updateData() {
        //校验团长名称
        this.$refs['form'].validate(valid => {
          if (valid) {

            if (this.isProcess) {
              return;
            }
            this.isProcess = true;

            this.setting.name = this.form.headName;
            if (this.checkList.indexOf("0") > -1) {
              this.setting.smsAuditNotice = "0"
            }
            if (this.checkList.indexOf("1") > -1) {
              this.setting.smsCommissionNotice = "0"
            }
            if (this.checkList.indexOf("2") > -1) {
              this.setting.smsPayNotice = "0"
            }
            saveSetting(this.setting).then((response) => {
              this.isProcess = false;
              if (response > 0) {
                this.$message({
                  type: 'success',
                  message: '更新成功'
                });
              }
            })
          }
        })
      },
      //查询社区团购设置
      querySet() {
        queryCommunitySet().then((response) => {
          this.form.headName = response.name;
          this.switchValue = response.audit == "0" ? true : false;
          if (response.smsAuditNotice == "0") {
            this.checkList.push("0");
          }
          if (response.smsCommissionNotice == "0") {
            this.checkList.push("1");
          }
          if (response.smsPayNotice == "0") {
            this.checkList.push("2");
          }
        })
      }


    }
  }
</script>
