<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filterBox">
        <p>分类名称</p>
        <el-input placeholder="分类名称" v-model="listQuery.name" size="medium" style="width: 200px;" class="filter-item"/>
      </div>
      <div class="filterBox">
        <p>分类类型</p>
        <el-select class="filter-item" v-model="listQuery.type" size="medium" placeholder="请选择分类类型">
          <el-option label="全部" value="0"></el-option>
          <el-option label="预售" value="1"></el-option>
          <el-option label="拼团" value="2"></el-option>
          <el-option label="试用" value="3"></el-option>
          <el-option label="限时折扣" value="4"></el-option>
          <el-option label="众筹" value="5"></el-option>
        </el-select>
      </div>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
      <br/>
      <el-button class="filter-item" size="medium" style="margin-left: 5px;" type="primary" icon="el-icon-plus"
                 @click="toAddMarketingCate">添加分类
      </el-button>
      <el-button class="filter-item" size="medium" style="margin-left: 5px;" type="danger" icon="el-icon-delete"
                 @click="toBatchDeleteMarketingCate()">批量删除
      </el-button>
    </div>

    <el-table
      :data="marketingCateList"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="80"/>
      <el-table-column label="分类名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="分类类型">
        <template slot-scope="scope">{{ marketingcateTypeName[scope.row.type] }}</template>
      </el-table-column>
      <el-table-column label="排序">
        <template slot-scope="scope">{{ scope.row.sort }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="toUpdateMarketingCate(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="toDeleteMarketingCate(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.pageNum+1" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="DiaMarketingCate==1?'添加促销分类':'修改促销分类'" :visible.sync="showDia">
      <el-form label-position="right" :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item prop="name">
          <span slot="label">分类名称</span>
          <el-input v-model="form.name" maxlength="25"/>
        </el-form-item>
        <el-form-item prop="type">
          <span slot="label">分类类型</span>
          <el-select class="filter-item" v-model="form.type" placeholder="请选择分类类型" :disabled="DiaMarketingCate!=1">
            <el-option label="预售" value="1"></el-option>
            <el-option label="拼团" value="2"></el-option>
            <el-option label="试用" value="3"></el-option>
            <el-option label="限时折扣" value="4"></el-option>
            <el-option label="众筹" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="sort">
          <span slot="label">排序</span>
          <el-input-number v-model="form.sort" controls-position="right" :min="1" :max="99"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDia = false">取消</el-button>
        <el-button type="primary" @click="DiaMarketingCate==1?addMarketingCate():updateMarketingCate()">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    queryMarketingCates,
    addMarketingCate,
    queryMarketingCateById,
    updateMarketingCate,
    deleteMarketingCate,
  } from '@/api/marketingcates';

  export default {
    data() {
      return {
        isProcess: false, // 接口是否处理中
        showDia: false, // 是否显示新增修改弹窗标识
        DiaMarketingCate: 1, // 判断新增还是修改标识，1新增，2修改
        delIds: [],// 批量删除选中id数组
        listLoading: true, // 列表加载标识
        marketingCateList: null, // 列表数据集合
        total: null, // 总记录数
        listQuery: {
          pageNum: 0, // 当前页码
          pageSize: 10, // 每页显示记录数
          name: '', // 促销分类名称
          type: '0'
        },
        form: { // 提交form表单
          id: '', // 促销分类id
          name: '', // 促销分类名称
          type: '', // 促销分类类型
          sort: '' // 促销分类排序
        },
        rules: { // 校验规则
          name: [
            {
              required: true,
              message: '请输入促销分类名称',
              trigger: 'blur'
            }
          ],
          type: [
            {
              required: true,
              message: '请选择促销分类类型',
              trigger: 'blur'
            }
          ],
          sort: [
            {
              required: true,
              message: '请输入促销分类排序',
              trigger: 'blur'
            }
          ]
        },
        marketingcateTypeName: {
          "1": '预售',
          '2': '拼团',
          "3": '试用',
          "4": '限时折扣',
          "5": '众筹'
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 查询促销分类列表
      getList() {
        this.listLoading = true;
        queryMarketingCates(this.listQuery).then((response) => {
          this.marketingCateList = response.data;
          this.total = response.recordsTotal;
          this.listLoading = false
        })
      },
      // 过滤查询
      handleFilter() {
        this.listQuery.pageNum = 0;
        this.getList();
      },
      // 改变当前页码
      handleCurrentChange(val) {
        this.listQuery.pageNum = val - 1;
        this.getList();
      },
      // 改变每页显示记录数
      handleSizeChange(val) {
        this.listQuery.pageNum = 0;
        this.listQuery.pageSize = val;
        this.getList();
      },
      // 准备新增促销分类
      toAddMarketingCate() {
        this.showDia = true;
        this.DiaMarketingCate = 1;
        this.resetForm();
        if (this.$refs["form"]) {
          this.$refs["form"].resetFields();
        }
      },
      // 新增促销分类
      addMarketingCate() {
        this.$refs['form'].validate(valid => {
          if (!this.isProcess && valid) {
            this.isProcess = true;
            addMarketingCate(this.form).then(() => {
              this.isProcess = false;
              this.showDia = false;
              this.getList();
              this.$message({
                type: 'success',
                message: '创建成功'
              });
            })
          }
        });
      },
      // 准备更新促销分类
      toUpdateMarketingCate(id) {
        queryMarketingCateById(id).then(res => {
          this.resetForm();
          this.form = res;
          this.DiaMarketingCate = 2;
          this.showDia = true;
          if (this.$refs["form"]) {
            this.$refs["form"].resetFields();
          }
        })
      },
      // 更新促销分类
      updateMarketingCate() {
        this.$refs['form'].validate(valid => {
          if (valid && !this.isProcess) {
            this.isProcess = true;
            updateMarketingCate(this.form).then(() => {
              this.isProcess = false;
              this.showDia = false;
              this.getList();
              this.$message({
                type: 'success',
                message: '更新成功'
              });
            })
          }
        });
      },
      // 删除促销分类二次确认
      toDeleteMarketingCate(id) {
        this.$confirm('是否确认删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteMarketingCate(id);
        })
      },
      // 多选选中促销分类
      handleSelectionChange(val) {
        if (val && val.length > 0) {
          this.delIds = val.map(row => row.id);
        } else {
          this.delIds = [];
        }
      },
      // 批量删除促销分类二次确认
      toBatchDeleteMarketingCate() {
        if (this.delIds && this.delIds.length > 0) {
          this.$confirm('是否确认删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteMarketingCate(this.delIds);
          })
        } else {
          this.$message({
            message: '请至少选择一个促销分类',
            type: 'warning'
          })
        }
      },
      // 删除促销分类
      deleteMarketingCate(ids) {
        if (!this.isProcess) {
          this.isProcess = true;
          deleteMarketingCate({"ids": ids.toString()}).then(res => {
            this.isProcess = false;
            this.getList();
            this.delIds = [];
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
        }
      },
      // 重置form表单
      resetForm() {
        this.form = {id: '', name: '', type: '', sort: ''};
      },
    }
  }
</script>
