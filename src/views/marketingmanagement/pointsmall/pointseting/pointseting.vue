<template>
  <div class="app-container">
    <el-alert title="注意！ 积分设置，若修改不当，会造成用户对积分的获得和使用的混乱。" type="warning" :closable="false" show-icon></el-alert>
    <el-form label-position="right" :model="form" :rules="rules" ref="form" label-width="150px"
             style="margin-top: 20px">
      <el-form-item prop="emailPoint">
        <span slot="label">邮箱验证积分</span>
        <el-input style="width: 195px" v-model="form.emailPoint"/>
      </el-form-item>
      <el-form-item prop="commentPoint">
        <span slot="label">发表评论积分</span>
        <el-input style="width: 195px" v-model="form.commentPoint"/>
      </el-form-item>
      <el-form-item label="积分使用规则">
        <el-select class="filter-item" v-model="form.usePoint">
          <el-option label="1积分=1元" :value=1></el-option>
          <el-option label="10积分=1元" :value=10></el-option>
          <el-option label="100积分=1元" :value=100></el-option>
          <el-option label="1000积分=1元" :value=1000></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="启用状态">
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
        <el-button type="primary" @click="updatePointSeting">保存设置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {queryPointSeting, updatePointSeting} from '@/api/pointseting';
  import {digitsValidator} from '@/utils/validate';

  export default {
    data() {
      return {
        isProcess: false, // 接口是否处理中
        form: { // 提交form表单
          id: '', // 积分设置id
          emailPoint: '', // 邮箱验证积分
          commentPoint: '', // 发表评论积分
          usePoint: '', // 积分使用规则
          isOpen: '', // 启用状态
        },
        rules: { // 校验规则
          emailPoint: [
            {
              required: true,
              trigger: 'blur',
              validator: digitsValidator,
            }
          ],
          commentPoint: [
            {
              required: true,
              trigger: 'blur',
              validator: digitsValidator,
            }
          ],
        },
      }
    },
    created() {
      this.queryPointSeting()
    },
    methods: {
      // 查询积分设置
      queryPointSeting() {
        queryPointSeting().then(res => {
          this.form = res;
          if (this.$refs["form"]) {
            this.$refs["form"].resetFields();
          }
        })
      },
      // 修改积分设置
      updatePointSeting() {
        this.$refs['form'].validate(valid => {
          if (valid && !this.isProcess) {
            this.isProcess = true;
            updatePointSeting(this.form).then(() => {
              this.isProcess = false;
              this.queryPointSeting();
              this.$message({
                message: '更新成功',
                type: 'success'
              })
            })
          }
        });
      },
    }
  }
</script>
