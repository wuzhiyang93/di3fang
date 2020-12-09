<template>
  <div class="app-container">
    <el-alert title="注意！ 又拍云接口，若修改不当，会影响图片的处理与显示。" type="warning" :closable="false" show-icon></el-alert>
    <el-form label-position="right" :model="form" :rules="rules" ref="form" label-width="150px"
             style="margin-top: 20px">
      <el-form-item prop="nameSpace">
        <span slot="label">服务名称</span>
        <el-input v-model="form.nameSpace" maxlength="32"/>
      </el-form-item>
      <el-form-item prop="userName">
        <span slot="label">操作员用户名</span>
        <el-input v-model="form.userName" maxlength="32"/>
      </el-form-item>
      <el-form-item prop="password">
        <span slot="label">操作员密码</span>
        <el-input v-model="form.password" type="password" maxlength="32"/>
      </el-form-item>
      <el-form-item prop="partaddress">
        <span slot="label">加速域名</span>
        <el-input v-model="form.partaddress" maxlength="126">
          <el-select v-model="httpSelect" slot="prepend" style="width: 100px">
            <el-option label="http://" value="1"></el-option>
            <el-option label="https://" value="2"></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateUpYunSet">保存设置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {queryUpYunSet, updateUpYunSet,} from '@/api/upyunset'

  export default {
    data() {
      return {
        isProcess: false, // 接口是否处理中
        httpSelect: '1', // 空间地址前缀 1 http 2 https
        form: { // 提交form表单
          id: '', // 又拍云设置id
          nameSpace: '', // 服务名称
          userName: '', // 用户名
          password: '', // 密码
          partaddress: '', // 加速域名（没有前缀http和https)
        },
        rules: { // 校验规则
          nameSpace: [
            {
              required: true,
              message: '请输入服务名称',
              trigger: 'blur'
            }
          ],
          userName: [
            {
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            }
          ],
          partaddress: [
            {
              required: true,
              message: '请输入加速域名',
              trigger: 'blur'
            }
          ],
        },
      }
    },
    created() {
      this.queryUpYunSet()
    },
    methods: {
      // 查询又拍云设置
      queryUpYunSet() {
        queryUpYunSet().then(res => {
          this.form = {
            id: res.id,
            nameSpace: res.nameSpace,
            userName: res.userName,
            password: res.password,
            partaddress: res.address.split('://')[1]
          };
          this.httpSelect = res.address.split('://')[0] == 'http' ? '1' : '2';
          if (this.$refs["form"]) {
            this.$refs["form"].resetFields();
          }
        })
      },
      // 修改又拍云设置
      updateUpYunSet() {
        this.$refs['form'].validate(valid => {
          if (valid && !this.isProcess) {
            // 如果空间地址不是以斜杠"/"结尾，自动补全斜杠"/"
            if (!this.form.partaddress.endsWith("/")) {
              this.form.partaddress = this.form.partaddress + '/';
            }
            this.form.address = (this.httpSelect == '1' ? 'http://' : 'https://') + this.form.partaddress;
            this.isProcess = true;
            updateUpYunSet(this.form).then(() => {
              this.isProcess = false;
              this.queryUpYunSet();
              this.$message({
                type: 'success',
                message: '更新成功'
              });
            })
          }
        });
      },
    }
  }
</script>
