<template>
  <div class="app-container">
    <el-alert
      style="margin-bottom: 20px"
      title="平台接入的物流公司，最多可设置100个物流公司。"
      type="warning">
    </el-alert>

    <div class="filter-container">
      <el-button class="filter-item" size="medium" type="primary" icon="el-icon-plus" @click="toAddLogisticsCompany">
        添加物流公司
      </el-button>
    </div>

    <el-row :gutter="20">
      <el-col v-for="item in companys" :span="3" style="margin-bottom: 10px">
        <el-tag
          style="font-size: 14px; color: #666"
          :key="item.name"
          closable
          effect="plain"
          @close="deleteDialog(item.id)">
          {{item.name}}
        </el-tag>
      </el-col>
    </el-row>

    <el-dialog title="添加物流公司" :visible.sync="dialogFormVisible">
      <el-form label-position="right" :model="form" :rules="rules" ref="form" label-width="150px">
        <el-form-item prop="name">
          <span slot="label">物流公司名称</span>
          <el-input v-model="form.name" maxlength="30"/>
        </el-form-item>
        <el-form-item prop="code">
          <span slot="label">物流公司代码</span>
          <el-input v-model="form.code" maxlength="20"/>
          <el-link :href="kuaidiTemplateApi" type="primary"
                   :underline="false" icon="el-icon-download">快递100物流公司代码文档
          </el-link>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addLogisticsCompany">确定
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    queryLogisticsCompanys,
    addLogisticsCompany,
    deleteLogisticsCompany
  } from '@/api/logisticscompanys';

  export default {
    data() {
      return {
        isProcess: false, // 接口是否处理中
        form: { // 提交form表单
          name: '', // 物流公司名称
          code: '', // 物流公司代码
        },
        rules: { // 校验规则
          name: [
            {
              required: true,
              message: '请输入物流公司名称',
              trigger: 'blur'
            }
          ],
          code: [
            {
              required: true,
              message: '请选择物流公司代码',
              trigger: 'blur'
            }
          ],
        },
        kuaidiTemplateApi: process.env.BASE_API + "/kuaidi.doc", //快递模版下载的地址
        dialogFormVisible: false, // 添加物流公司标记
        companys: [],// 物流公司
      }
    },
    created() {
      this.queryLogisticsCompanys()
    },
    methods: {
      // 查询物流公司
      queryLogisticsCompanys() {
        queryLogisticsCompanys().then(res => {
          this.companys = res;
        })
      },
      // 新增物流公司
      addLogisticsCompany() {
        this.$refs['form'].validate(valid => {
          if (!this.isProcess && valid) {
            this.isProcess = true;
            addLogisticsCompany(this.form).then(res => {
              this.isProcess = false;
              if (res > 0) {
                this.dialogFormVisible = false;
                this.queryLogisticsCompanys();
                this.$message({
                  type: 'success',
                  message: '创建成功'
                });
              } else if (res == -1) {
                this.$message({
                  type: 'error',
                  message: '不能再添加更多的物流公司!'
                })
              } else if (res == -2) {
                this.$message({
                  type: 'error',
                  message: '物流公司名称已存在!'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '创建失败!'
                })
              }
            })
          }
        });
      },
      // 准备新增物流公司
      toAddLogisticsCompany() {
        if (this.companys && this.companys.length >= 100) {
          this.$message({
            type: 'error',
            message: '不能再添加更多的物流公司'
          });
          return;
        }
        this.dialogFormVisible = true;
        this.form = {name: '', code: ''};
        if (this.$refs["form"]) {
          this.$refs["form"].resetFields();
        }
      },
      // 删除物流公司
      deleteDialog(id) {
        this.$confirm('确定要删除此物流公司吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteLogisticsCompany(id).then(() => {
            this.queryLogisticsCompanys();
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
      },
    }
  }
</script>
