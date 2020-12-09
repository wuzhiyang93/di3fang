<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="服务支持名称" v-model="listQuery.name" size="medium" style="width: 200px;" class="filter-item"/>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
      <br/>
      <el-button class="filter-item" size="medium" style="margin-left: 5px;" type="primary" icon="el-icon-plus"
                 @click="toAddServiceSupport">添加服务支持
      </el-button>
      <el-button class="filter-item" size="medium" style="margin-left: 5px;" type="danger" icon="el-icon-delete"
                 @click="toBatchDeleteServiceSupport">批量删除
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
      <el-table-column label="图标">
        <template slot-scope="scope"><img :src="scope.row.url" style="vertical-align: middle; max-height: 18px"></template>
      </el-table-column>
      <el-table-column label="服务支持名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="toUpdateServiceSupport(scope.row.id)">编辑</el-button>
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

    <el-dialog title="添加服务支持" :visible.sync="showAdd">
      <el-form label-position="right" :model="form" :rules="rules" ref="form" label-width="150px">
        <el-form-item prop="name">
          <span slot="label">服务支持名称</span>
          <el-input v-model="form.name" maxlength="45"/>
        </el-form-item>
        <el-form-item label="服务支持图标">
          <el-upload
            class="avatar-uploader"
            :action="uploadApi"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :headers="headers"
            name="image"
            accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO">
            <img v-if="form.url" :src="form.url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAdd = false">取消</el-button>
        <el-button type="primary" @click="createServiceSupport('form')">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改服务支持" :visible.sync="showUpdate">
      <el-form label-position="right" :model="form" :rules="rules" ref="updateform" label-width="150px">
        <el-form-item prop="name">
          <span slot="label">服务支持名称</span>
          <el-input v-model="form.name" maxlength="45"/>
        </el-form-item>
        <el-form-item label="服务支持图标">
          <el-upload
            class="avatar-uploader"
            :action="uploadApi"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :headers="headers"
            name="image"
            accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO">
            <img v-if="form.url" :src="form.url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showUpdate = false">取消</el-button>
        <el-button type="primary" @click="updateServiceSupport('updateform')">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    queryServiceSupportList,
    addServiceSupport,
    queryServiceSupportById,
    updateServiceSupport,
    deleteServiceSupport
  } from '@/api/servicesupportlist';
  import {getToken} from "@/utils/token";

  export default {
    data() {
      return {
        isProcess: false, // 接口是否处理中
        delIds: [],// 批量删除选中id数组
        uploadApi: process.env.UPLOAD_API,// 上传文件路由
        headers: { // 设置上传的请求头部
          Authorization: 'Bearer ' + getToken()
        },
        showAdd: false, // 是否展示新增弹窗标识
        showUpdate: false, // 是否展示修改弹窗标识
        listLoading: true, // 列表加载标识
        list: null, // 列表数据集合
        total: null, // 总记录数
        listQuery: {
          pageNum: 0, // 当前页码
          pageSize: 10, // 每页显示记录数
          name: '' // 服务支持名称
        },
        form: { // 提交form表单
          id: '', // 服务支持id
          name: '', // 服务支持名称
          url: '' // 服务支持图标url
        },
        rules: { // 校验规则
          name: [
            {
              required: true,
              message: '请输入服务支持名称',
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
      // 查询服务支持列表
      getList() {
        this.listLoading = true;
        queryServiceSupportList(this.listQuery).then((response) => {
          this.list = response.data;
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
      // 准备新增服务支持
      toAddServiceSupport() {
        this.showAdd = true;
        this.resetForm();
        if (this.$refs["form"]) {
          this.$refs["form"].resetFields();
        }
      },
      // 新增服务支持
      createServiceSupport(formName) {
        this.$refs[formName].validate(valid => {
          if (!this.isProcess && valid) {
            this.isProcess = true;
            addServiceSupport(this.form).then(() => {
              this.isProcess = false;
              this.showAdd = false;
              this.getList();
              this.$message({
                type: 'success',
                message: '创建成功'
              });
            })
          }
        });
      },
      // 准备更新服务支持
      toUpdateServiceSupport(id) {
        queryServiceSupportById(id).then(res => {
          this.form = {id: res.id, name: res.name, url: res.url};
          this.showUpdate = true;
          if (this.$refs["updateform"]) {
            this.$refs["updateform"].resetFields();
          }
        })
      },
      // 更新服务支持
      updateServiceSupport(formName) {
        this.$refs[formName].validate(valid => {
          if (valid && !this.isProcess) {
            this.isProcess = true;
            updateServiceSupport(this.form).then(() => {
              this.isProcess = false;
              this.showUpdate = false;
              this.getList();
              this.$message({
                type: 'success',
                message: '更新成功'
              });
            })
          }
        });
      },
      // 上传图片回调
      uploadSuccess(res) {
        this.form.url = res;
      },
      // 重置form表单
      resetForm() {
        this.form = {id: '', name: '', url: ''};
      },
      // 删除服务支持二次确认
      handleDelete(id) {
        this.$confirm('是否确认删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteServiceSupport(id);
        })
      },
      // 多选选中服务支持
      handleSelectionChange(val) {
        if (val && val.length > 0) {
          this.delIds = val.map(row => row.id);
        } else {
          this.delIds = [];
        }
      },
      // 批量删除服务支持二次确认
      toBatchDeleteServiceSupport() {
        if (this.delIds && this.delIds.length > 0) {
          this.$confirm('是否确认删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteServiceSupport(this.delIds);
          })
        } else {
          this.$message({
            message: '请至少选择一个服务支持',
            type: 'warning'
          })
        }
      },
      // 删除服务支持
      deleteServiceSupport(ids) {
        if (!this.isProcess) {
          this.isProcess = true;
          deleteServiceSupport({"ids": ids.toString()}).then(() => {
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
