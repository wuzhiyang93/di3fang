<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="规格名称" v-model="listQuery.name" size="medium" style="width: 200px;" class="filter-item"/>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
      <br/>
      <el-button class="filter-item" size="medium" style="margin-left: 5px;" type="primary" icon="el-icon-plus"
                 @click="toAddSpec">添加规格
      </el-button>
      <el-button class="filter-item" size="medium" style="margin-left: 5px;" type="danger" icon="el-icon-delete"
                 @click="toBatchDeleteSpec">批量删除
      </el-button>
    </div>

    <el-table
      :data="specList"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="80"/>
      <el-table-column label="规格名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="规格别名">
        <template slot-scope="scope">{{ scope.row.nickName }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="toUpdateSpec(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="toDeleteSpec(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.pageNum+1" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="DiaSpec==1?'添加规格':'修改规格'" :visible.sync="showDia">
      <el-form label-position="right" :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item prop="name">
          <span slot="label">规格名称</span>
          <el-input v-model="form.name" maxlength="4"/>
        </el-form-item>
        <el-form-item prop="nickName">
          <span slot="label">规格别名</span>
          <el-input v-model="form.nickName" maxlength="20"/>
        </el-form-item>
        <el-form-item>
          <span slot="label"><span class="labelImportant">*</span>规格值</span>
          <el-button class="filter-item" size="medium" type="primary" icon="el-icon-plus"
                     @click="addSpecValue(form.id)">
            添加规格值
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-table
            :data="form.specValues"
            border
            fit
            highlight-current-row
            style="line-height: 20px"
          >
            <el-table-column label="规格值名称">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" size="medium" class="filter-item"/>
              </template>
            </el-table-column>
            <el-table-column label="排序">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.sort" size="small" controls-position="right" :min="1"
                                 :max="99"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click.native.prevent="deleteSpecValue(scope.$index,scope.row.id)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDia = false">取消</el-button>
        <el-button type="primary" @click="DiaSpec==1?createSpec():updateSpec()">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    querySpecList,
    addSpec,
    querySpecById,
    updateSpec,
    deleteSpec,
    isSpecValueCanDelete
  } from '@/api/specs';

  export default {
    data() {
      return {
        isProcess: false, // 接口是否处理中
        showDia: false, // 是否显示新增修改弹窗标识
        DiaSpec: 1, // 判断新增还是修改标识，1新增，2修改
        delIds: [],// 批量删除选中id数组
        listLoading: true, // 列表加载标识
        specList: null, // 列表数据集合
        total: null, // 总记录数
        listQuery: {
          pageNum: 0, // 当前页码
          pageSize: 10, // 每页显示记录数
          name: '' // 规格名称
        },
        form: { // 提交form表单
          id: '', // 规格id
          name: '', // 规格名称
          nickName: '', // 规格别名
          specValues: [{name: '', sort: ''}] // 规格值数组
        },
        rules: { // 校验规则
          name: [
            {
              required: true,
              message: '请输入规格名称',
              trigger: 'blur'
            }
          ],
          nickName: [
            {
              required: true,
              message: '请输入规格别名',
              trigger: 'blur'
            }
          ]
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 查询规格列表
      getList() {
        this.listLoading = true;
        querySpecList(this.listQuery).then((response) => {
          this.specList = response.data;
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
      // 准备新增规格
      toAddSpec() {
        this.showDia = true;
        this.DiaSpec = 1;
        this.resetForm();
        if (this.$refs["form"]) {
          this.$refs["form"].resetFields();
        }
      },
      // 新增规格
      createSpec() {
        this.$refs['form'].validate(valid => {
          if (!this.isProcess && valid && this.validateSpecValue()) {
            this.isProcess = true;
            addSpec(this.form).then(() => {
              this.isProcess = false;
              this.showDia = false;
              this.getList();
              this.$message({
                type: 'success',
                message: '创建成功!'
              });
            })
          }
        });
      },
      // 准备更新规格
      toUpdateSpec(id) {
        querySpecById(id).then(res => {
          this.resetForm();
          this.form = res;
          this.DiaSpec = 2;
          this.showDia = true;
          if (this.$refs["form"]) {
            this.$refs["form"].resetFields();
          }
        })
      },
      // 更新规格
      updateSpec() {
        this.$refs['form'].validate(valid => {
          if (valid && this.validateSpecValue() && !this.isProcess) {
            this.isProcess = true;
            updateSpec(this.form).then(res => {
              this.isProcess = false;
              if (res == -1) {
                this.$message({
                  message: '商品已经使用规格不能修改!',
                  type: 'error'
                })
              } else {
                this.showDia = false;
                this.getList();
                this.$message({
                  type: 'success',
                  message: '更新成功!'
                });
              }
            })
          }
        });
      },
      // 删除规格二次确认
      toDeleteSpec(id) {
        this.$confirm('是否确认删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteSpec(id);
        })
      },
      // 多选选中规格
      handleSelectionChange(val) {
        if (val && val.length > 0) {
          this.delIds = val.map(row => row.id);
        } else {
          this.delIds = [];
        }
      },
      // 批量删除规格二次确认
      toBatchDeleteSpec() {
        if (this.delIds && this.delIds.length > 0) {
          this.$confirm('是否确认删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteSpec(this.delIds);
          })
        } else {
          this.$message({
            message: '请至少选择一个规格',
            type: 'warning'
          })
        }
      },
      // 删除规格
      deleteSpec(ids) {
        if (!this.isProcess) {
          this.isProcess = true;
          deleteSpec({"ids": ids.toString()}).then(res => {
            this.isProcess = false;
            if (res == -1) {
              this.$message({
                message: '商品已经使用规格不能删除!',
                type: 'error'
              })
            } else {
              this.getList();
              this.delIds = [];
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          });
        }
      },
      // 新增规格值
      addSpecValue(specId) {
        // 修改规格时并且specId不为空时，给规格值赋值specId
        if (this.DiaSpec != 1 && specId) {
          this.form.specValues.push({name: '', sort: '', specId: specId})
        } else {
          this.form.specValues.push({name: '', sort: ''})
        }
      },
      // 删除规格值
      deleteSpecValue(index, specValueId) {
        // 修改规格时并且specValueId不为空时（意思不是修改时新添加的规格值）才需要判断是否被商品使用
        if (this.DiaSpec != 1 && specValueId) {
          // 修改规格时删除规格值需要判断该规格值是否被商品使用
          isSpecValueCanDelete(specValueId).then(res => {
            if (res) {
              this.form.specValues.splice(index, 1)
            } else {
              this.$message({
                message: '商品已经使用规格值不能删除!',
                type: 'error'
              })
            }
          })
        } else {
          this.form.specValues.splice(index, 1)
        }
      },
      // 重置form表单
      resetForm() {
        this.form = {id: '', name: '', nickName: '', specValues: [{name: '', sort: ''}]};
      },
      // 校验商品规格值
      validateSpecValue() {
        let validateResult = true;
        let errorMsg = '';
        if (this.form.specValues.length == 0) {
          validateResult = false;
          errorMsg = '至少添加一个规格值';
        } else {
          for (var i = 0; i < this.form.specValues.length; i++) {

            // 没有规格值名称
            if (!this.form.specValues[i].name) {
              validateResult = false;
              errorMsg = '请填写规格值名称';
              break;
            }

            //  校验规格值排序是否为数字
            if (!(/^\d+$/.test(this.form.specValues[i].sort))) {
              validateResult = false;
              errorMsg = '规格值排序请输入数字';
              break;
            }
          }
        }

        if (!validateResult) {
          this.$message({
            message: errorMsg,
            type: 'error'
          })
        }
        return validateResult;
      },
    }
  }
</script>
