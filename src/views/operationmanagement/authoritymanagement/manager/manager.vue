<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="员工用户名" v-model="listQuery.name" size="medium" style="width: 200px;" class="filter-item"/>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
      <br/>
      <el-button class="filter-item" size="medium" style="margin-left: 5px;" type="primary" icon="el-icon-plus"
                 @click="toAddManager">添加员工
      </el-button>
      <el-button class="filter-item" size="medium" style="margin-left: 5px;" type="danger" icon="el-icon-delete"
                 @click="toBatchDeleteManager()">批量删除
      </el-button>
    </div>

    <el-table
      :data="managerList"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="80"/>
      <el-table-column label="员工用户名">
        <template slot-scope="scope">{{ scope.row.username }}</template>
      </el-table-column>
      <el-table-column label="最后登录时间" min-width="160">
        <template slot-scope="scope">{{ scope.row.loginTime ? scope.row.loginTime : '暂无登录信息' }}</template>
      </el-table-column>
      <el-table-column label="启用" min-width="60">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isUse == '0'" type="success">是</el-tag>
          <el-tag v-if="scope.row.isUse == '1'" type="info">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="toUpdateManager(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="toDeleteManager(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.pageNum+1" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog title="添加员工" :visible.sync="showAdd">
      <el-form label-position="right" :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item prop="username">
          <span slot="label">用户名</span>
          <el-input v-model="form.username" maxlength="10"/>
        </el-form-item>
        <el-form-item prop="password">
          <span slot="label"><span class="labelImportant">*</span>密码</span>
          <el-input type="password" v-model="form.password" maxlength="15"/>
        </el-form-item>
        <el-form-item prop="checkPassword">
          <span slot="label"><span class="labelImportant">*</span>重复密码</span>
          <el-input type="password" v-model="form.checkPassword" maxlength="15"/>
        </el-form-item>
        <el-form-item prop="roleId">
          <span slot="label">角色</span>
          <el-select v-model="form.roleId" filterable placeholder="请选择角色">
            <el-option
              v-for="role in rolelist"
              :key="role.id"
              :label="role.roleName"
              :value="role.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <span slot="label"><span class="labelImportant">*</span>启用</span>
          <el-switch
            style="vertical-align: sub"
            v-model="form.isUse"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="0"
            inactive-value="1">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAdd = false">取消</el-button>
        <el-button type="primary" @click="addManager('form')">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改员工" :visible.sync="showUpdate">
      <el-form label-position="right" :model="updateForm" :rules="updateRules" ref="updateForm" label-width="100px">
        <el-form-item prop="userName">
          <span slot="label">用户名</span>
          <el-input v-model="updateForm.userName" maxlength="10"/>
        </el-form-item>
        <el-form-item prop="roleId">
          <span slot="label">角色</span>
          <el-select v-model="updateForm.roleId" filterable placeholder="请选择角色">
            <el-option
              v-for="role in rolelist"
              :key="role.id"
              :label="role.roleName"
              :value="role.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <span slot="label"><span class="labelImportant">*</span>启用</span>
          <el-switch
            style="vertical-align: sub"
            v-model="updateForm.isUse"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="0"
            inactive-value="1">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showUpdate = false">取消</el-button>
        <el-button type="primary" @click="updateManager('updateForm')">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    queryManagerList,
    queryRoleListForManager,
    addManager,
    queryManagerById,
    updateManager,
    deleteManager,
  } from '@/api/managers';
  import {specstrValidator, chineseValidator} from '@/utils/validate';

  export default {
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.checkPassword !== '') {
            this.$refs.form.validateField('checkPassword');
          }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        isProcess: false, // 接口是否处理中
        rolelist: null, // 角色集合
        delIds: [],// 批量删除选中id数组
        showAdd: false, // 是否展示新增弹窗标识
        isAdding: false, // 防止新增重复提交标识
        showUpdate: false, // 是否展示修改弹窗标识
        listLoading: true, // 列表加载标识
        managerList: null, // 列表数据集合
        total: null, // 总记录数
        listQuery: {
          pageNum: 0, // 当前页码
          pageSize: 10, // 每页显示记录数
          name: '' // 管理员名称
        },
        form: { // 新增form表单
          username: '', // 管理员名称
          password: '', // 管理员密码
          checkPassword: '', // 重复密码
          isUse: '', // 管理员是否启用 0 启用 1 禁用
          roleId: null, // 角色id
        },
        rules: { // 校验规则
          username: [
            {
              required: true,
              trigger: 'blur',
              validator: specstrValidator,
            },
            {
              required: true,
              trigger: 'blur',
              validator: chineseValidator
            }
          ],
          password: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPassword: [
            {validator: validatePass2, trigger: 'blur'}
          ],
          roleId: [
            {
              required: true,
              message: '请选择角色',
              trigger: 'blur'
            }
          ],
        },
        updateForm: { // 修改form表单
          managerId: null, // 管理员id
          userName: '', // 管理员名称
          isUse: '', // 管理员是否启用 0 启用 1 禁用
          roleId: null, // 角色id
        },
        updateRules: { // 校验规则
          userName: [
            {
              required: true,
              trigger: 'blur',
              validator: specstrValidator,
            },
            {
              required: true,
              trigger: 'blur',
              validator: chineseValidator
            }
          ],
          roleId: [
            {
              required: true,
              message: '请选择角色',
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
      // 查询管理员列表
      getList() {
        this.listLoading = true;
        queryManagerList(this.listQuery).then((response) => {
          this.managerList = response.data;
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
      // 准备新增管理员
      toAddManager() {
        // 查询所有角色
        queryRoleListForManager().then(res => {
          this.rolelist = res.data;
          this.showAdd = true;
          this.resetForm();
          if (this.$refs["form"]) {
            this.$refs["form"].resetFields();
          }
        });
      },
      // 新增管理员
      addManager(formName) {
        this.$refs[formName].validate(valid => {
            if (!this.isProcess && valid) {
              this.isProcess = true;
              addManager(this.form, this.form.roleId).then(res => {
                  this.isProcess = false;
                  if (res == -1) {
                    this.$message({
                      message: '用户名已存在!',
                      type: 'error'
                    })
                  } else if (res == -2) {
                    this.$message({
                      message: '用户名不能含有中文!',
                      type: 'error'
                    })
                  } else if (res == 1) {
                    this.showAdd = false;
                    this.getList();
                    this.$message({
                      type: 'success',
                      message: '创建成功'
                    });
                  } else {
                    this.$message({
                      message: '未知错误',
                      type: 'error'
                    })
                  }
                }
              )
            }
          }
        )
        ;
      },
      // 准备更新管理员
      toUpdateManager(managerId) {
        // 根据管理员id查询管理员信息
        queryManagerById(managerId).then(data => {
          this.updateForm = data;
          this.showUpdate = true;
          if (this.$refs["updateForm"]) {
            this.$refs["updateForm"].resetFields();
          }
        });
        // 查询所有角色
        queryRoleListForManager().then(res => {
          this.rolelist = res.data;
        });
      },
      // 更新管理员
      updateManager(formName) {
        this.$refs[formName].validate(valid => {
          if (valid && !this.isProcess) {
            this.isProcess = false;
            updateManager(this.updateForm).then(res => {
              this.isProcess = false;
              if (res == -1) {
                this.$message({
                  message: '用户名已存在!',
                  type: 'error'
                })
              } else if (res == -2) {
                this.$message({
                  message: '用户名不能含有中文!',
                  type: 'error'
                })
              } else if (res == 1) {
                this.showUpdate = false;
                this.getList();
                this.$message({
                  type: 'success',
                  message: '更新成功'
                });
              } else {
                this.$message({
                  message: '未知错误',
                  type: 'error'
                })
              }
            })
          }
        });
      },
      // 重置form表单
      resetForm() {
        this.form = {username: '', password: '', checkPassword: '', isUse: '0', roleId: null};
      },
      // 删除管理员二次确认
      toDeleteManager(id) {
        this.$confirm('是否确认删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteManager(id);
        })
      },
      // 多选选中管理员
      handleSelectionChange(val) {
        if (val && val.length > 0) {
          this.delIds = val.map(row => row.id);
        } else {
          this.delIds = [];
        }
      },
      // 批量删除管理员二次确认
      toBatchDeleteManager() {
        if (this.delIds && this.delIds.length > 0) {
          this.$confirm('是否确认删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteManager(this.delIds);
          })
        } else {
          this.$message({
            message: '请至少选择一个管理员',
            type: 'warning'
          })
        }
      },
      // 删除管理员
      deleteManager(ids) {
        if (!this.isProcess) {
          this.isProcess = true;
          deleteManager({"managerIds": ids.toString()}).then(() => {
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
    }
  }
</script>
