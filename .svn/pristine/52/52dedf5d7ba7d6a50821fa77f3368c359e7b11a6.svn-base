<template>
  <div class="app-container">
    <el-form label-position="right" :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item prop="title">
        <span slot="label">SEO标题</span>
        <el-input v-model="form.title" maxlength="128"/>
      </el-form-item>
      <el-form-item prop="keyWord">
        <span slot="label">SEO关键字</span>
        <el-input v-model="form.keyWord" maxlength="128"/>
      </el-form-item>
      <el-form-item prop="seoDesc">
        <span slot="label">SEO描述</span>
        <el-input v-model="form.seoDesc" maxlength="128"/>
      </el-form-item>
      <el-form-item label="启用">
        <el-switch
          style="vertical-align: sub"
          v-model="form.isOpen"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="1"
          inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateSystemSeo">保存设置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    querySystemSeo,
    updateSystemSeo,
  } from '@/api/seosetting';

  export default {
    data() {
      return {
        isProcess: false, // 接口是否处理中
        form: { // 提交form表单
          title: '', // SEO标题
          keyWord: '', // SEO关键字
          seoDesc: '', // SEO描述
          isOpen: '', // 启用状态 1启用 0不启用
        },
        rules: { // 校验规则
          title: [
            {
              required: true,
              message: '请输入SEO标题',
              trigger: 'blur'
            }
          ],
          keyWord: [
            {
              required: true,
              message: '请输入SEO关键字',
              trigger: 'blur'
            }
          ],
          seoDesc: [
            {
              required: true,
              message: '请输入SEO描述',
              trigger: 'blur'
            }
          ],
        },
      }
    },
    created() {
      this.querySystemSeo()
    },
    methods: {
      // 查询seo设置
      querySystemSeo() {
        querySystemSeo().then(res => {
          if (this.$refs["form"]) {
            this.$refs["form"].resetFields();
          }
          this.form = {
            title: res.title, // SEO标题
            keyWord: res.keyWord, // SEO关键字
            seoDesc: res.seoDesc, // SEO描述
            isOpen: res.isOpen, // 启用状态 1启用 0不启用
          };
        })
      },
      // 修改seo设置
      updateSystemSeo() {
        this.$refs['form'].validate(valid => {
          if (valid && !this.isProcess) {
            this.isProcess = true;
            updateSystemSeo(this.form).then(() => {
              this.isProcess = false;
              this.querySystemSeo();
              this.$message({
                type: 'success',
                message: '更新成功!'
              });
            })
          }
        });
      },
    }
  }
</script>
