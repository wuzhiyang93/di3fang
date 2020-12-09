<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card">
      <!--<el-tab-pane label="腾讯QQ" name="2">-->
        <!--<el-form label-position="right" :model="qqForm" :rules="qqRules" ref="qqForm" label-width="150px"-->
                 <!--style="margin-top: 20px">-->
          <!--<el-form-item prop="key">-->
            <!--<span slot="label">AppID</span>-->
            <!--<el-input v-model="qqForm.key" maxlength="128"/>-->
          <!--</el-form-item>-->
          <!--<el-form-item prop="value">-->
            <!--<span slot="label">AppKEy</span>-->
            <!--<el-input v-model="qqForm.value" maxlength="128"/>-->
          <!--</el-form-item>-->
          <!--<el-form-item prop="url">-->
            <!--<span slot="label">回调地址</span>-->
            <!--<el-input v-model="qqForm.url" maxlength="128"/>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="是否启用">-->
            <!--<el-select v-model="qqForm.isUse" style="width: 100px">-->
              <!--<el-option label="是" value="1"></el-option>-->
              <!--<el-option label="否" value="0"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
          <!--<el-form-item>-->
            <!--<el-button type="primary" @click="updateQQLoginSet()">保存设置</el-button>-->
          <!--</el-form-item>-->
        <!--</el-form>-->
      <!--</el-tab-pane>-->
      <el-tab-pane label="微信" name="3">
        <el-form label-position="right" :model="wechatForm" :rules="wechatRules" ref="wechatForm" label-width="150px"
                 style="margin-top: 20px">
          <el-form-item prop="key">
            <span slot="label">AppID</span>
            <el-input v-model="wechatForm.key" maxlength="128"/>
          </el-form-item>
          <el-form-item prop="value">
            <span slot="label">AppSecret</span>
            <el-input v-model="wechatForm.value" maxlength="128"/>
          </el-form-item>
          <el-form-item prop="url">
            <span slot="label">回调地址</span>
            <el-input v-model="wechatForm.url" maxlength="128"/>
          </el-form-item>
          <!--<el-form-item label="是否启用">-->
            <!--<el-select v-model="wechatForm.isUse" style="width: 100px">-->
              <!--<el-option label="是" value="1"></el-option>-->
              <!--<el-option label="否" value="0"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
          <el-form-item>
            <el-button type="primary" @click="updateWeChatLoginSet()">保存设置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {queryLoginSet, updateLoginSet,} from '@/api/loginset'

  export default {
    data() {
      return {
        isProcess: false, // 接口是否处理中
        activeName: '3', // 选中的登录设置类别，2 QQ 3 微信
        qqForm: { // 提交QQ form表单
          key: '', // AppID
          value: '', // AppKEy
          url: '', // 回调地址
          isUse: '', // 是否启用
        },
        qqRules: { // QQ校验规则
          key: [
            {
              required: true,
              message: '请输入AppID',
              trigger: 'blur'
            }
          ],
          value: [
            {
              required: true,
              message: '请输入AppKEy',
              trigger: 'blur'
            }
          ],
          url: [
            {
              required: true,
              message: '请输入回调地址',
              trigger: 'blur'
            }
          ],
        },
        wechatForm: { // 提交微信form表单
          key: '', // AppID
          value: '', // AppSecret
          url: '', // 回调地址
          isUse: '1', // 是否启用
        },
        wechatRules: { // 微信校验规则
          key: [
            {
              required: true,
              message: '请输入AppID',
              trigger: 'blur'
            }
          ],
          value: [
            {
              required: true,
              message: '请输入AppSecret',
              trigger: 'blur'
            }
          ],
          url: [
            {
              required: true,
              message: '请输入回调地址',
              trigger: 'blur'
            }
          ],
        },
      }
    },
    created() {
      this.queryLoginSet()
    },
    methods: {
      // 查询登录设置
      queryLoginSet() {
        queryLoginSet().then(res => {
          this.qqForm = res.qqLogin;
          this.wechatForm = res.wechatLogin;
          if (this.$refs["qqForm"]) {
            this.$refs["qqForm"].resetFields();
          }
          if (this.$refs["wechatForm"]) {
            this.$refs["wechatForm"].resetFields();
          }
        })
      },
      // 修改QQ登录设置
      updateQQLoginSet() {
        this.$refs['qqForm'].validate(valid => {
          if (valid) {
            this.updateLoginSet(this.qqForm);
          }
        });
      },
      // 修改微信登录设置
      updateWeChatLoginSet() {
        this.$refs['wechatForm'].validate(valid => {
          if (valid) {
            this.updateLoginSet(this.wechatForm);
          }
        });
      },
      // 修改登录设置
      updateLoginSet(params) {
        if (!this.isProcess) {
          params.codeType = this.activeName;
          this.isProcess = true;
          updateLoginSet(params).then(res => {
            this.isProcess = false;
            if (res == -1) {
              this.$message({
                message: '设置类别不是QQ也不是微信',
                type: 'error'
              })
            } else if (res >= 1) {
              this.queryLoginSet();
              this.$message({
                type: 'success',
                message: '更新成功'
              });
            } else {
              this.$message({
                message: '修改失败',
                type: 'error'
              })
            }
          })
        }
      },
    }
  }
</script>
