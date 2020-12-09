<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" size="medium" type="primary" icon="el-icon-plus" @click="toAdd">
        添加支付类型
      </el-button>
    </div>

    <el-table
      :data="tableData"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="支付类型名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="toEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteDialog(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="editType == 1 ? '添加支付类型' : '编辑支付类型'" :visible.sync="dialogFormVisible">
      <el-form label-position="right" :model="payTypeForm" :rules="Rules" ref="payTypeForm" label-width="120px">
        <el-form-item prop="name">
          <span slot="label">支付类型名称</span>
          <el-input maxlength="16" type="text" v-model="payTypeForm.name"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="editType == 1 ? addPayType() : editPayType() ">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

  import {
    queryStorePayType, //查询门店支付类型
    updStorePayType, //修改门店支付类型
    delStorePayType, //删除门店支付类型
    addStorePayType, //添加门店支付类型
  } from '@/api/shoppaytypelist';

  import {
    isEmpty, //非空
  } from '@/utils/validate'


  export default {
    data() {
      return {
        allType: [],//所有支付类型合计
        editType: 1, //操作类型 1 添加  2 修改
        isProcess: false, // 接口是否处理中
        dialogFormVisible: false,//窗口显示标记
        listLoading: true, //页面加载中
        tableData: [],  //支付类型数组
        payTypeForm: {
          name: '',
          id: '',
        },  //支付类型表单
        Rules: { //添加支付类型 校验
          name: [
            {
              required: true,
              message: '请输入名称',
              trigger: 'blur'
            }
          ],
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      //加载列表
      getList() {
        this.listLoading = true;
        this.tableData = [];
        this.allType = [];
        queryStorePayType().then((response) => {
          this.allType = response;
          for (let i = 0; i < response.length; i++) {
            let payType = {
              id: response[i].id,
              name: response[i].name,
            }
            this.tableData.push(payType);
          }
          this.listLoading = false
        })
      },
      //删除支付类型
      deleteDialog(id) {
        this.$confirm('确定要删除此支付类型吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.isProcess) {
            return;
          }
          this.isProcess = true;
          delStorePayType(id).then((response) => {
            this.isProcess = false;
            this.getList();
            if (response > 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
          })
        })
      },
      //准备添加支付类型
      toAdd() {
        this.editType = 1;
        if (this.$refs["payTypeForm"]) {
          this.$refs["payTypeForm"].resetFields();
        }
        this.payTypeForm.name = '';
        this.dialogFormVisible = true;
      },
      //准备编辑支付类型
      toEdit(id) {
        this.editType = 2;
        if (this.$refs["payTypeForm"]) {
          this.$refs["payTypeForm"].resetFields();
        }
        for (let i = 0; i < this.allType.length; i++) {
          if (id == this.allType[i].id) {
            this.payTypeForm.name = this.allType[i].name;
            this.payTypeForm.id = this.allType[i].id;
          }
        }
        this.dialogFormVisible = true;
      },
      //添加支付类型
      addPayType() {
        this.$refs['payTypeForm'].validate(valid => {
          if (valid) {
            if (this.isProcess) {
              return;
            }
            this.isProcess = true;
            addStorePayType(this.payTypeForm.name).then((response) => {
              this.isProcess = false;
              this.dialogFormVisible = false
              this.getList();
              if (response > 0) {
                this.$message({
                  type: 'success',
                  message: '创建成功!'
                });
              }
            })
          }
        })
      },
      //编辑支付类型
      editPayType() {
        this.$refs['payTypeForm'].validate(valid => {
          if (valid) {
            if (this.isProcess) {
              return;
            }
            this.isProcess = true;
            updStorePayType(this.payTypeForm.id, this.payTypeForm.name).then((response) => {
              this.isProcess = false;
              this.dialogFormVisible = false
              this.getList();
              if (response > 0) {
                this.$message({
                  type: 'success',
                  message: '编辑成功!'
                });
              }
            })
          }
        })
      },
    }
  }
</script>
