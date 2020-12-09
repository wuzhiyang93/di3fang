<template>
  <div class="app-container">
    <el-form label-position="right" :model="form" ref="form" label-width="100px">
      <el-form-item label="客服栏标题">
        <el-input v-model="form.title" maxlength="45"/>
      </el-form-item>
      <el-form-item label="客服列表">
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="toAddCustomerServiceInfo">添加客服</el-button>
        <el-table
          style="margin-top: 10px"
          :data="form.customerServiceInfo"
          v-loading="listLoading"
          border
          fit
          highlight-current-row
        >
          <el-table-column label="客服QQ">
            <template slot-scope="scope">{{ scope.row.qq }}</template>
          </el-table-column>
          <el-table-column label="客服名称">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="toUpdateCustomerServiceInfo(scope.$index)">修改
              </el-button>
              <el-button type="danger" size="mini" @click="deleteCustomerServiceInfo(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="启用">
        <el-switch
          style="vertical-align: sub"
          v-model="form.isUse"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="0"
          inactive-value="1">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateCustomerService">保存设置</el-button>
      </el-form-item>
    </el-form>

    <el-dialog :title="DiaCustomerServiceInfo==1?'添加客服':'修改客服'" :visible.sync="showDia">
      <el-form label-position="right" :model="infoForm" :rules="rules" ref="infoForm" label-width="100px">
        <el-form-item prop="qq">
          <span slot="label">客服QQ</span>
          <el-input type="number" v-model="infoForm.qq" maxlength="45"/>
        </el-form-item>
        <el-form-item prop="name">
          <span slot="label">客服名称</span>
          <el-input v-model="infoForm.name" maxlength="45"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDia = false">取消</el-button>
        <el-button type="primary"
                   @click="DiaCustomerServiceInfo==1?addCustomerServiceInfo():updateCustomerServiceInfo()">确定
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    queryCustomerService,
    updateCustomerService,
  } from '@/api/customerservice';

  export default {
    data() {
      return {
        isProcess: false, // 接口是否处理中
        showDia: false, // 是否显示新增修改弹窗标识
        DiaCustomerServiceInfo: 1, // 判断新增还是修改标识，1新增，2修改
        listLoading: true, // 列表加载标识
        marketingCateList: null, // 列表数据集合
        index: null, // 在线客服联系方式实体类集合索引
        form: { // 提交form表单
          id: null, // 在线客服id
          title: '', // 客服栏标题
          customerServiceInfo: [], // 在线客服联系方式实体类集合
          isUse: '' // 是否启用 0 启用 1 不启用
        },
        infoForm: { // 提交infoForm表单
          id: null, // 客服信息id
          qq: '', // 客服qq
          name: '', // 客服名称
        },
        rules: { // 校验规则
          qq: [
            {
              required: true,
              message: '请输入客服QQ',
              trigger: 'blur'
            }
          ],
          name: [
            {
              required: true,
              message: '请输入客服名称',
              trigger: 'blur'
            }
          ],
        },
      }
    },
    created() {
      this.queryCustomerService()
    },
    methods: {
      // 查询在线客服
      queryCustomerService() {
        this.listLoading = true;
        queryCustomerService().then(res => {
          this.listLoading = false;
          if (res.flag) {
            if (this.$refs["form"]) {
              this.$refs["form"].resetFields();
            }
            this.form = {
              id: res.data.id, // 在线客服id
              title: res.data.title, // 客服栏标题
              customerServiceInfo: res.data.customerServiceInfo ? res.data.customerServiceInfo : [], // 在线客服联系方式实体类集合
              isUse: res.data.isUse // 是否启用 0 启用 1 不启用
            };
          }
        })
      },
      // 准备新增客服
      toAddCustomerServiceInfo() {
        if (this.form.customerServiceInfo && this.form.customerServiceInfo.length >= 20) {
          this.$message({
            message: '最多只能添加20个客服！',
            type: 'warning'
          })
        } else {
          this.showDia = true;
          this.DiaCustomerServiceInfo = 1;
          this.resetInfoForm();
          if (this.$refs["infoForm"]) {
            this.$refs["infoForm"].resetFields();
          }
        }
      },
      // 新增客服
      addCustomerServiceInfo() {
        this.$refs['infoForm'].validate(valid => {
          if (!this.isProcess && valid) {
            this.isProcess = true;
            this.form.customerServiceInfo.push({qq: this.infoForm.qq, name: this.infoForm.name});
            this.isProcess = false;
            this.showDia = false;
          }
        });
      },
      // 准备更新客服
      toUpdateCustomerServiceInfo(index) {
        if (this.$refs["infoForm"]) {
          this.$refs["infoForm"].resetFields();
        }
        this.resetInfoForm();
        this.DiaCustomerServiceInfo = 2;
        this.showDia = true;
        this.index = index;
        this.infoForm = {
          id: this.form.customerServiceInfo[index].id,
          qq: this.form.customerServiceInfo[index].qq,
          name: this.form.customerServiceInfo[index].name,
        }
      },
      // 更新客服
      updateCustomerServiceInfo() {
        this.$refs['infoForm'].validate(valid => {
          if (valid && !this.isProcess) {
            this.isProcess = true;
            this.form.customerServiceInfo.splice(this.index, 1, {
              id: this.infoForm.id,
              qq: this.infoForm.qq,
              name: this.infoForm.name,
            });
            this.showDia = false;
            this.isProcess = false;
          }
        });
      },
      // 删除客服
      deleteCustomerServiceInfo(index) {
        this.$confirm('确定要删除此客服吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.form.customerServiceInfo.splice(index, 1);
        })
      },
      // 修改客服设置
      updateCustomerService() {
        this.$refs['form'].validate(valid => {
          if (valid && !this.isProcess) {
            this.isProcess = true;
            updateCustomerService(this.form).then(() => {
              this.isProcess = false;
              this.queryCustomerService();
              this.$message({
                type: 'success',
                message: '更新成功!'
              });
            })
          }
        });
      },
      // 重置infoForm表单
      resetInfoForm() {
        this.infoForm = {
          id: null, // 客服信息id
          qq: '', // 客服qq
          name: '', // 客服名称
        };
      },
    }
  }
</script>
