<template>
  <div class="app-container">
    <el-form :model="form" :rules="rules" ref="form" label-width="120px">
      <el-form-item prop="oldPassword" label="原密码">
        <el-input maxlength="32" v-model="form.oldPassword" type="password"/>
      </el-form-item>
      <el-form-item prop="newPassword" label="新密码">
        <el-input maxlength="32" v-model="form.newPassword" type="password"/>
      </el-form-item>
      <el-form-item prop="reNewPassword" label="重新输入">
        <el-input maxlength="32" v-model="form.reNewPassword" type="password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {updatePassowrd} from '@/api/password';
  export default {
    data() {
      return {
        form: {
          oldPassword: '',
          newPassword: '',
          reNewPassword: ''
        },
        rules: {
          oldPassword: [
            {
              required: true,
              message: '请输入原密码',
              trigger: 'blur'
            }
          ],
          newPassword: [
            {
              required: true,
              message: '请输入新密码',
              trigger: 'blur'
            }
          ],
          reNewPassword: [
            {
              required: true,
              message: '请再次输入密码',
              trigger: 'blur'
            }
          ]
        },
      }
    },
    methods: {
      onSubmit() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            updatePassowrd(this.form).then((res) => {
              if (res == 2) {
                this.$message({
                  type: 'error',
                  message: '两次输入密码不一致!'
                });
              } else if (res == 3) {
                this.$message({
                  type: 'error',
                  message: '原始密码不正确!'
                });
              } else if (res == 1) {
                this.$message({
                  type: 'success',
                  message: '更新成功!'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: '密码修改失败!'
                });
              }
            })
          }
        });
      }
    }
  }
</script>

