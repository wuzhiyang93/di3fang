<template>
  <div class="app-container">
    <el-form label-position="right" :model="form" :rules="rules" ref="form" label-width="100px"
             style="margin-top: 20px">
      <el-form-item prop="title">
        <span slot="label">专题标题</span>
        <el-input v-model="form.title" maxlength="128"/>
      </el-form-item>
      <el-form-item>
        <span slot="label">是否启用</span>
        <el-switch
          style="vertical-align: sub"
          v-model="form.isUse"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="0"
          inactive-value="1">
        </el-switch>
      </el-form-item>
      <el-form-item label="专题内容">
        <tinymce v-model="content" :height="500"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveThematic">保存</el-button>
        <router-link to="/sitesetting/thematic/thematicsetting">
          <el-button type="info">取消</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'
  import {
    addThematic, // 新增专题
    queryThematicById, // 根据id查询专题
    updateThematic, // 修改专题
  } from '@/api/thematic';

  export default {
    components: {Tinymce},
    props: ['addOrUpdate', 'id'], // 父组件传过来的参数 addOrUpdate 新增或修改标记 1 新增 2 修改  id 专题id
    data() {
      return {
        isProcess: false, // 接口是否处理中
        form: { // 新增或修改form表单
          id: '', // 专题id
          title: '', // 专题标题
          isUse: '0', // 是否启用 0 是 1 否
          desc: '', // 专题内容
          type: '0', // 类型 1:可视化模板 0:富文本  默认0
        },
        rules: {
          title: [
            {
              required: true,
              message: '请输入专题标题',
              trigger: 'blur'
            }
          ],
        }, // 校验规则
        content: '', // 专题内容
      }
    },
    created() {
      // 如果是更新查询专题详情
      if (this.isUpdate()) {
        this.queryThematicById();
      }
    },
    methods: {
      // 根据id查询专题详情
      queryThematicById() {
        queryThematicById(this.id).then(res => {
          if (res.flag && !!res.data) {
            this.form.id = res.data.id;
            this.form.title = res.data.title;
            this.form.isUse = res.data.isUse;
            if (!!res.data.desc) {
              this.content = JSON.parse(res.data.desc);
            }
          }
        })
      },
      // 保存专题
      saveThematic() {
        if (!!this.content) {
          this.form.desc = JSON.stringify(this.content);
        }
        this.$refs['form'].validate(valid => {
          if (!this.isProcess && valid && this.validateLength()) {
            this.isProcess = true;
            // 更新
            if (this.isUpdate()) {
              updateThematic(this.form).then(res => {
                this.isProcess = false;
                if (res == 1) {
                  this.$message({
                    type: 'success',
                    message: '更新专题成功!'
                  });
                  this.$router.push({path: '/sitesetting/thematic/thematicsetting'})
                } else {
                  this.$message({
                    message: '更新专题失败',
                    type: 'error'
                  })
                }
              })
            } else if (this.isAdd()) {
              // 新增
              addThematic(this.form).then(response => {
                this.isProcess = false;
                if (response == 1) {
                  this.$message({
                    type: 'success',
                    message: '新增专题成功!'
                  });
                  this.$router.push({path: '/sitesetting/thematic/thematicsetting'})
                } else {
                  this.$message({
                    message: '新增专题失败',
                    type: 'error'
                  })
                }
              })
            }
          }
        });
      },
      // 判断是否是新增 如果是新增返回true
      isAdd() {
        return this.addOrUpdate == 1;
      },
      // 判断是否是修改 如果是修改返回true
      isUpdate() {
        return this.addOrUpdate == 2;
      },
      // 验证专题内容长度
      validateLength() {
        if (this.form.desc.length > 65535) {
          this.$message({
            message: '专题内容长度不能超过65535',
            type: 'warning'
          });
          return false;
        }
        return true;
      },
    }
  }
</script>
