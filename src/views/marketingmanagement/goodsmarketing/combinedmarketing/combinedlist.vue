<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="组合名称" v-model="listQuery.name" maxlength="124" size="medium" style="width: 200px;"
                class="filter-item"/>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
      <br/>
      <el-button class="filter-item" size="medium" type="primary" icon="el-icon-plus" @click="toAddCombined()">
        添加商品组合
      </el-button>
      <el-button class="filter-item" size="medium" style="margin-left: 5px;" type="danger" icon="el-icon-delete"
                 @click="batchDelete">批量删除
      </el-button>
    </div>

    <el-table
      :data="list"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="40"/>
      <el-table-column label="组合名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link :to="{path:'/marketingmanager/goodsmarketing/combinedskus',query:{id:scope.row.id}}">
            <el-button type="success" style="margin: 0 5px 0 0" size="mini">管理商品</el-button>
          </router-link>
          <el-button type="primary" style="margin: 0 5px 0 0" size="mini" @click="toUpdateCombined(scope.row.id)">修改
          </el-button>
          <el-button size="mini" style="margin: 0" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.pageNum+1" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="digType==1?'添加商品组合':'修改商品组合'" :visible.sync="showDig">
      <el-form :model="combinedForm" :rules="rules" ref="form" label-position="right" label-width="100px">
        <el-form-item prop="name">
          <span slot="label">组合名称</span>
          <el-input v-model="combinedForm.name" maxlength="32"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDig = false">取消</el-button>
        <el-button type="primary" @click="digType==1?createCombined():updateCombined()">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    queryGoodsCombination,
    deleteGoodsCombination,
    addGoodsCombination,
    updateGoodsCombination,
    queryGoodsCombinationById
  } from '@/api/combinedlist';

  export default {
    data() {
      return {
        rules: {
          name: [
            {
              required: true,
              message: '请输入组合名称',
              trigger: 'blur'
            }
          ]
        }, // 验证规则
        showDig: false,//展示添加修改框
        digType: 1,// 弹出层类型 1 新增2修改
        combinedForm: {
          id: '',
          name: ''
        },// 商品组合表单
        isProcess: false,// 接口处理中
        listLoading: true, // 加载中
        list: null, // 商品组合数据
        total: null, // 数据总数
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          name: '',
        }, // 查询参数
        selectedIds: [],// 选中的id
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        queryGoodsCombination(this.listQuery).then((response) => {
          this.list = response.data;
          this.total = response.recordsTotal;
          this.listLoading = false
        })
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val - 1;
        this.getList();
      },
      handleSelectionChange(val) {
        if (val && val.length > 0) {
          this.selectedIds = val.map(row => row.id);
        } else {
          this.selectedIds = [];
        }
      },
      // 过滤查询
      handleFilter() {
        this.listQuery.pageNum = 0;
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 0;
        this.listQuery.pageSize = val;
        this.getList();
      },
      // 删除商品组合二次确认
      handleDelete(id) {
        this.$confirm('是否确认删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delCombined(id);
        })
      },
      // 批量删除商品组合二次确认
      batchDelete() {
        if (this.selectedIds && this.selectedIds.length > 0) {
          this.$confirm('是否确认删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.delCombined(this.selectedIds);
          })
        } else {
          this.$message({
            message: '请至少选择一条数据',
            type: 'warning'
          })
        }
      },
      // 删除商品组合
      delCombined(ids) {
        if (this.isProcess) {
          return;
        }
        this.isProcess = true;
        deleteGoodsCombination({"ids": ids.toString()}).then(() => {
          this.isProcess = false;
          this.getList();
          this.selectedIds = [];
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        });
      },
      // 准备添加商品组合
      toAddCombined() {
        this.digType = 1;
        this.showDig = true;
        this.combinedForm = {
          id: '',
          name: ''
        }
        if (this.$refs["form"]) {
          this.$refs["form"].resetFields();
        }
      },
      // 准备更新商品组合
      toUpdateCombined(id) {
        this.digType = 2;
        this.showDig = true;
        if (this.$refs["form"]) {
          this.$refs["form"].resetFields();
        }
        queryGoodsCombinationById(id).then(res => {
          this.combinedForm.id = res.id;
          this.combinedForm.name = res.name;
        })
      },
      // 添加商品组合
      createCombined() {
        this.$refs['form'].validate(valid => {
          if (!this.isProcess && valid) {
            this.isProcess = true;
            addGoodsCombination(this.combinedForm).then(() => {
              this.isProcess = false;
              this.showDig = false;
              this.getList();
              this.$message({
                type: 'success',
                message: '创建成功!'
              });
            })
          }
        });
      },
      // 修改商品组合
      updateCombined() {
        this.$refs['form'].validate(valid => {
          if (!this.isProcess && valid) {
            this.isProcess = true;
            updateGoodsCombination(this.combinedForm).then(() => {
              this.isProcess = false;
              this.showDig = false;
              this.getList();
              this.$message({
                type: 'success',
                message: '更新成功!'
              });
            })
          }
        });
      }
    }
  }
</script>
