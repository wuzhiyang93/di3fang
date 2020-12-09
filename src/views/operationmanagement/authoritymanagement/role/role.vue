<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="角色名称" v-model="listQuery.roleName" size="medium" style="width: 200px;"
                class="filter-item"/>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
      <br/>
      <el-button class="filter-item" size="medium" style="margin-left: 5px;" type="primary" icon="el-icon-plus"
                 @click="toAddRole()">添加角色
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
      <el-table-column type="selection" align="center" width="80"/>
      <el-table-column label="角色名称">
        <template slot-scope="scope">{{ scope.row.roleName }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="toUpdate(scope.row.id,scope.row.roleName)">编辑</el-button>
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

    <el-dialog :title="DiaType==1?'添加角色':'编辑角色'" :visible.sync="showDialog">
      <el-form :model="form" :rules="rules" ref="form" label-position="right" label-width="100px">
        <el-form-item prop="roleName">
          <span slot="label">角色名称</span>
          <el-input maxlength="10" v-model="form.roleName"/>
        </el-form-item>
        <el-form-item>
          <span slot="label"><span class="labelImportant">*</span>所选菜单</span>
          <el-tree
            style="max-height: 300px; overflow: auto; padding: 10px 0"
            ref="tree"
            :data="menus"
            show-checkbox
            node-key="authorityId"
            :props="defaultProps">
          </el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="DiaType==1?addRole():updateRole()">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {rolelist, roleAuthMenu, addRole, queryAuthIdByRoleId, updateRole, deleteRole} from '@/api/role';
  export default {
    data() {
      return {
        delIds: [],  //删除的角色id
        DiaType: 1, // 弹出框类型 1 新增 2 修改
        isAdding: false, // 是否在新增中
        showDialog: false, //新增修改框弹出标记
        listLoading: true, // 加载中
        list: null, // 角色数据
        total: null, // 数据总数
        form: {roleName: '', id: '', authIds: null}, // 角色表单
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          roleName: '',
        }, // 查询参数
        defaultProps: {
          children: 'childMenu',
          label: 'name'
        },
        menus: null, // 菜单权限
        rules: {
          roleName: [
            {
              required: true,
              message: '请输入角色名称',
              trigger: 'blur'
            }
          ]
        }, // 验证规则
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        rolelist(this.listQuery).then((response) => {
          this.list = response.data;
          this.total = response.recordsTotal;
          this.listLoading = false
        })
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val - 1;
        this.getList();
      },
      handleSelectionChange(val){
        if (val && val.length > 0) {
          this.delIds = val.map(row => row.id);
        } else {
          this.delIds = [];
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
      // 准备添加角色
      toAddRole()
      {
        // 查询菜单权限
        roleAuthMenu().then(res => this.menus = res);
        this.showDialog = true;
        this.DiaType = '1';
        this.form = {roleName: '', id: '', authIds: null};
        if (this.$refs.tree) {
          this.$refs.tree.setCheckedKeys(new Array());
        }
        if (this.$refs["form"]) {
          this.$refs["form"].resetFields();
        }
      },
      // 添加角色
      addRole()
      {
        this.$refs['form'].validate(valid => {
          if (!this.isAdding && valid) {
            if (!this.$refs.tree.getCheckedKeys() || this.$refs.tree.getCheckedKeys().length == 0) {
              this.$message({
                type: 'error',
                message: '请选择权限!'
              });
              return false;
            }
            this.form.authIds = this.selectedIds();
            this.isAdding = true;
            addRole(this.form).then((res) => {
              if (res == -1) {
                this.$message({
                  type: 'error',
                  message: '角色名称已经存在!'
                });
              } else if (res > 0) {
                this.showDialog = false;
                this.getList();
                this.$message({
                  type: 'success',
                  message: '创建成功'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: '创建失败!'
                });
              }

              this.isAdding = false;
            })
          }
        });
      },
      // 查询角色信息
      toUpdate(id, roleName)
      {
        this.DiaType = '2';
        if (this.$refs["form"]) {
          this.$refs["form"].resetFields();
        }
        if (this.$refs.tree) {
          this.$refs.tree.setCheckedKeys(new Array());
        }
        roleAuthMenu().then(menus => {
          this.menus = menus;
          this.showDialog = true;
          queryAuthIdByRoleId(id).then(res => {
            this.form = {roleName: roleName, id: id, authIds: res};
            res.forEach(item => {
              this.$refs.tree.setChecked(item, true);
            })
          })
        })
      },
      // 更新角色
      updateRole()
      {
        this.$refs['form'].validate(valid => {
          if (valid) {
            if (!this.$refs.tree.getCheckedKeys() || this.$refs.tree.getCheckedKeys().length == 0) {
              this.$message({
                type: 'error',
                message: '请选择权限!'
              });
              return false;
            }
            this.form.authIds = this.selectedIds();
            updateRole(this.form).then((res) => {
              if (res == -1) {
                this.$message({
                  type: 'error',
                  message: '角色名称已经存在!'
                });
              } else if (res > 0) {
                this.showDialog = false;
                this.getList();
                this.$message({
                  type: 'success',
                  message: '更新成功'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: '更新失败!'
                });
              }
            })
          }
        });
      },
      // 删除角色二次确认
      handleDelete(id){
        this.$confirm('是否确认删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delRole(id);
        })
      },
      // 删除角色
      delRole(ids)
      {
        deleteRole({"roleIds": ids.toString()}).then(() => {
          this.getList();
          this.delIds = [];
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        });
      },
      // 批量删除角色二次确认
      batchDelete()
      {
        if (this.delIds && this.delIds.length > 0) {
          this.$confirm('是否确认删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.delRole(this.delIds);
          })
        } else {
          this.$message({
            message: '请至少选择一个角色',
            type: 'warning'
          })
        }
      },
      // 选择的权限
      selectedIds(){
        let checkedKeys = this.$refs.tree.getCheckedKeys();
        let halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys();
        halfCheckedKeys.forEach(value => checkedKeys.push(value));
        return checkedKeys.filter(id => id != 0);
      },
    }
  }
</script>
