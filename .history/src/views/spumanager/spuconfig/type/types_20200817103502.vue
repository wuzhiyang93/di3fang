<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="属性名称" v-model="listQuery.name" size="medium" style="width: 200px;" class="filter-item"/>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
      <br/>
      <el-button class="filter-item" size="medium" style="margin-left: 5px;" type="primary" icon="el-icon-plus"
                 @click="toAddAttribute">添加属性
      </el-button>
      <el-button class="filter-item" size="medium" style="margin-left: 5px;" type="danger" icon="el-icon-delete"
                 @click="batchDelete">批量删除
      </el-button>
    </div>


    <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
              style="width: 100%;" @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" width="80"/>
      <el-table-column label="属性名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="toUpdate(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.pageNum+1" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="DiaType==1?'添加商品属性':'修改商品属性'" :visible.sync="showDia">
      <el-form label-position="right" :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item prop="name">
          <span slot="label">属性名称</span>
          <el-input v-model="form.name" maxlength="20"/>
        </el-form-item>
        <el-form-item>
          <span slot="label"><span class="labelImportant">*</span>属性值</span>
          <el-button class="filter-item" size="medium" type="primary" icon="el-icon-plus" @click="addAttribute">
            添加属性
          </el-button>
        </el-form-item>

        <el-form-item>
          <el-table
            :data="form.attributes"
            border
            fit
            style="line-height: 20px"
          >
            <el-table-column label="属性名" width="150">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" size="medium" class="filter-item"/>
              </template>
            </el-table-column>
            <el-table-column label="属性值">
              <template slot-scope="scope">
                <el-tag
                  :key="tag.index"
                  v-for="tag in scope.row.attributeValues"
                  :closable="!isLinkedSpu || (isLinkedSpu && !tag.id)"
                  :disable-transitions="false"
                  @close="deleteAttrValue(tag,scope.row)">
                  {{tag.value}}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.addAttrValueShow"
                  v-model="scope.row.inputAttrValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="addAttrValue(scope.row)"
                  @blur="addAttrValue(scope.row)"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="toAddAttrValue(scope.row)">+ 添加属性值
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="排序" width="100">
              <template slot-scope="scope">
                <el-input-number style="width: 80px" v-model="scope.row.sort" size="small" controls-position="right"
                                 :min="1" :max="99"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100" align="center" class-name="small-padding fixed-width">
              <!-- 类型没有商品使用的情况下只要不是第一个都可以删除，如果类型被商品使用的情况下则新增的属性可以删除（id为空就表示新增的）-->
              <template slot-scope="scope" v-if="(scope.$index !=0 && !isLinkedSpu) || (isLinkedSpu && !scope.row.id)">
                <el-button size="mini" type="danger" @click.native.prevent="deleteAttribute(scope.$index)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDia = false">取消</el-button>
        <el-button type="primary" @click="DiaType==1?createType():updateType()">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

  import {
    typelist,
    addType,
    queryThirdCategory,
    delType,
    queryById,
    updateType,
    checkTypeAssociated
  } from '@/api/types';

  export default {
    data() {
      return {
        rules: {
          name: [
            {
              required: true,
              message: '请输入属性名称',
              trigger: 'blur'
            }
          ]
        },  // 验证规则
        isLinkedSpu: false, // 是否关联商品判断
        isProcess: false, // 接口是否处理中
        delIds: [], // 删除的类型id
        showDia: false, // 是否显示新增或修改框
        DiaType: 1, // 弹出框类型 1 新增 2 修改
        listLoading: true, // 加载中
        list: null, // 类型数据
        total: null, // 总记录数
        form: {name: '', attributes: [{name: '', attributeValues: [], sort: '', addAttrValueShow: false}], id: ''}, // 类型表单
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          name: ''
        }, // 查询条件
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 查询类型列表
      getList() {
        this.listLoading = true
        typelist(this.listQuery).then((response) => {
          this.list = response.data;
          this.total = response.recordsTotal;
          this.listLoading = false
        })
      },
      // 新增属性
      addAttribute() {
        this.form.attributes.push({name: '', attributeValues: [], sort: '', addAttrValueShow: false})
      },
      // 删除属性
      deleteAttribute(index) {
        this.form.attributes.splice(index, 1)
      },
      // 修改商品类型
      updateType() {
        this.$refs['form'].validate(valid => {
          if (!this.isProcess && valid && this.validateType()) {
            this.isProcess = true;
            updateType(this.form).then(res => {
              this.isProcess = false;
              if (res == 0) {
                this.$message({
                  message: '属性名称已经存在!',
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
        })
      },
      // 创建商品类型
      createType() {
        this.$refs['form'].validate(valid => {
          if (!this.isProcess && valid && this.validateType()) {
            this.isProcess = true;
            addType(this.form).then(res => {
              if (res == 0) {
                this.$message({
                  message: '属性名称已经存在!',
                  type: 'error'
                })
              } else {
                this.showDia = false;
                this.getList();
                this.$message({
                  type: 'success',
                  message: '创建成功!'
                });
              }
              this.isProcess = false;
            })
          }
        })
      },
      // 删除属性值
      deleteAttrValue(tag, attribute) {
        attribute.attributeValues.splice(attribute.attributeValues.findIndex(item => item.index === tag.index), 1)
      },
      // 准备添加属性值
      toAddAttrValue(attribute) {
        attribute.addAttrValueShow = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      // 添加属性值
      addAttrValue(attribute) {
        let inputValue = attribute.inputAttrValue
        if (inputValue) {
          attribute.attributeValues.push({value: inputValue, index: Date.parse(new Date())})
        }
        attribute.addAttrValueShow = false;
        attribute.inputAttrValue = ''
      },
      // 过滤查询
      handleFilter() {
        this.listQuery.pageNum = 0;
        this.getList();
      },
      // 删除类型二次确认
      handleDelete(id) {
        this.isTypeCanDelete([id]).then(res => {
          if (res) {
            this.$confirm('是否确认删除, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.delType(id);
            })
          } else {
            this.$message({
              message: '所选属性含有关联三级分类不可删除!',
              type: 'error'
            })
          }
        })
      },
      // 删除类型
      delType(ids) {
        if (this.isProcess) {
          return;
        }
        this.isProcess = true;
        delType({"ids": ids.toString()}).then(() => {
          this.isProcess = false;
          this.getList();
          this.delIds = [];
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        });
      },
      // 判断类型是否可以删除，如果类型被三级分类关联 则不能删除
      isTypeCanDelete(ids) {
        return queryThirdCategory().then((res) => {
          // 所有被三级分类关联的类型id
          let linkedTypeIds = res.map(item => item.typeId);
          // 被三级分类关联的类型id
          let sameTypeIds = ids.filter(item => linkedTypeIds.indexOf(item) > -1);
          return sameTypeIds.length == 0;
        })
      },
      // 批量删除
      batchDelete() {
        if (this.delIds && this.delIds.length > 0) {
          // 判断是否可以删除
          this.isTypeCanDelete(this.delIds).then(res => {
            if (res) {
              this.$confirm('是否确认删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.delType(this.delIds);
              })
            } else {
              this.$message({
                message: '所选属性含有关联三级分类不可删除!',
                type: 'error'
              })
            }
          })
        } else {
          this.$message({
            message: '请至少选择一个属性',
            type: 'warning'
          })
        }
      },
      handleSelectionChange(val) {
        if (val && val.length > 0) {
          this.delIds = val.map(row => row.id);
        } else {
          this.delIds = [];
        }
      },
      // 重置
      resetForm() {
        this.form = {
          name: '',
          attributes: [{name: '', attributeValues: [], sort: '', addAttrValueShow: false}],
          id: ''
        };
        if (this.$refs["form"]) {
          this.$refs["form"].resetFields();
        }
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val - 1;
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.pageSize = val;
        this.getList()
      },
      // 准备添加属性
      toAddAttribute() {
        this.showDia = true;
        this.DiaType = 1;
        this.resetForm();
      },
      // 校验商品类型
      validateType() {
        let validateResult = true;
        let errorMsg = '';
        for (var i = 0; i < this.form.attributes.length; i++) {
          if (!this.form.attributes[i].name) {
            validateResult = false;
            errorMsg = '请填写属性名';
            break;
          }

          //  没有属性值
          if (this.form.attributes[i].attributeValues.length == 0) {
            validateResult = false;
            errorMsg = '请填写属性值';
            break;
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
      // 查询类型信息
      toUpdate(id) {
        checkTypeAssociated(id).then(res => {
          this.isLinkedSpu = res != 0;
          queryById(id).then(res => {
            this.resetForm();
            res.attributes.forEach(attr => {
              attr.addAttrValueShow = false;
              attr.attributeValues.forEach(attrValue => attrValue.index = attrValue.id);
            });
            this.form = res;
            this.DiaType = 2;
            this.showDia = true;
          })
        })
      }
    },
  }
</script>
