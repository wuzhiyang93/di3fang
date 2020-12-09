<template>
  <div class="app-container">
    <el-alert title="注意！ app版本配置，若修改不当，会影响app使用。" type="warning" :closable="false" show-icon></el-alert>
    <el-form label-position="right" label-width="180px" :model="form" :rules="rules" ref="form"
             style="margin-top: 20px">
      <el-form-item prop="siteAndroidVersion">
        <span slot="label">c端安卓版本</span>
        <el-input maxlength="10" v-model="form.siteAndroidVersion"/>
      </el-form-item>
      <el-form-item prop="siteIosVersion">
        <span slot="label">c端ios版本</span>
        <el-input maxlength="10" v-model="form.siteIosVersion"/>
      </el-form-item>
      <el-form-item prop="siteAndroidUrl">
        <span slot="label">c端安卓下载地址</span>
        <el-input maxlength="256" v-model="form.siteAndroidUrl"/>
      </el-form-item>
      <el-form-item prop="siteIosUrl">
        <span slot="label">c端ios下载地址</span>
        <el-input maxlength="256" v-model="form.siteIosUrl"/>
      </el-form-item>
      <el-form-item prop="storeAndroidVersion">
        <span slot="label">商家端安卓版本</span>
        <el-input maxlength="10" v-model="form.storeAndroidVersion"/>
      </el-form-item>
      <el-form-item prop="storeIosVersion">
        <span slot="label">商家端ios版本</span>
        <el-input maxlength="10" v-model="form.storeIosVersion"/>
      </el-form-item>
      <el-form-item prop="storeAndroidUrl">
        <span slot="label">商家端安卓版本下载地址</span>
        <el-input maxlength="256" v-model="form.storeAndroidUrl"/>
      </el-form-item>
      <el-form-item prop="storeIosUrl">
        <span slot="label">商家端ios下载地址</span>
        <el-input maxlength="256" v-model="form.storeIosUrl"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateData">保存设置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import {
    queryAppVersion,  //查询版本信息
    updateAppVersion //修改版本信息
  } from '@/api/versionconfig';

  import {
    isEmpty //校验输入框
  } from '@/utils/validate'

  export default {
    data() {
      return {
        isProcess: false,  //接口正在处理中
        form: {
          id: "1",
          siteAndroidVersion: '', //C端安卓版本
          siteIosVersion: '',  //C端 IOS版本
          siteAndroidUrl: '',//C端安卓下载地址
          siteIosUrl: '', //C端 IOS下载地址
          storeAndroidVersion: '', //商家端安卓版本
          storeIosVersion: '',//商家端 IOS 版本
          storeAndroidUrl: '',//商家端安卓下载地址
          storeIosUrl: '',//商家端 IOS 下载地址
        }, //审核表单
        rules: { //校验规则
          siteAndroidVersion: [
            {
              required: true,
              trigger: 'blur',
              validator: isEmpty,
            }
          ],
          siteIosVersion: [
            {
              required: true,
              trigger: 'blur',
              validator: isEmpty,
            }
          ],
          siteAndroidUrl: [
            {
              required: true,
              trigger: 'blur',
              validator: isEmpty,
            }
          ], siteIosUrl: [
            {
              required: true,
              trigger: 'blur',
              validator: isEmpty,
            }
          ], storeAndroidVersion: [
            {
              required: true,
              trigger: 'blur',
              validator: isEmpty,
            }
          ], storeIosVersion: [
            {
              required: true,
              trigger: 'blur',
              validator: isEmpty,
            }
          ],
          storeAndroidUrl: [
            {
              required: true,
              trigger: 'blur',
              validator: isEmpty,
            }
          ],
          storeIosUrl: [
            {
              required: true,
              trigger: 'blur',
              validator: isEmpty,
            }
          ],
        },
      }
    },
    created() {
      this.queryAppVersion()
    },
    methods: {

      //修改版本信息
      updateData() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            if (this.isProcess) {
              return;
            }
            this.isProcess = true;
            updateAppVersion(this.form).then((response) => {
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
      //查询版本信息
      queryAppVersion() {
        queryAppVersion().then((response) => {
          this.form.siteAndroidVersion = response.siteAndroidVersion;
          this.form.siteIosVersion = response.siteIosVersion;
          this.form.siteAndroidUrl = response.siteAndroidUrl;
          this.form.siteIosUrl = response.siteIosUrl;
          this.form.storeAndroidVersion = response.storeAndroidVersion;
          this.form.storeIosVersion = response.storeIosVersion;
          this.form.storeAndroidUrl = response.storeAndroidUrl;
          this.form.storeIosUrl = response.storeIosUrl;
        })
      }
    }
  }
</script>
