<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="品牌名称" v-model="listQuery.name" size="medium" style="width: 200px;" class="filter-item"/>
      <el-input placeholder="品牌别名" v-model="listQuery.nickName" size="medium" style="width: 200px;"
                class="filter-item"/>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
      <br/>
      <el-button class="filter-item" size="medium" style="margin-left: 5px;" type="primary" icon="el-icon-plus"
                 @click="toAddBrand">添加品牌
      </el-button>
      <!-- <el-button class="filter-item" size="medium" style="margin-left: 5px;" type="danger" icon="el-icon-delete"
                 @click="batchDelete">批量删除
      </el-button> -->
    </div>

    <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
              style="width: 100%;">
      <!-- <el-table-column type="selection" align="center" width="80"/> -->
      <el-table-column label="品牌LOGO">
        <template slot-scope="scope"><img :src="scope.row.url" height="36" style="vertical-align: middle"></template>
      </el-table-column>
      <el-table-column label="品牌名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="品牌别名">
        <template slot-scope="scope">{{ scope.row.nickName }}</template>
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

    <el-dialog title="添加品牌" :visible.sync="showAdd">
      <el-form label-position="right" :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item prop="name">
          <span slot="label">品牌名称</span>
          <el-input v-model="form.name" maxlength="64"/>
        </el-form-item>
        <el-form-item label="品牌别名">
          <el-input v-model="form.nickName" maxlength="64"/>
        </el-form-item>
        <el-form-item label="LOGO图片">
          <el-upload
            class="avatar-uploader"
            :action="uploadApi"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :headers="headers"
            name="image"
            accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO"
          >
            <img v-if="form.url" :src="form.url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAdd = false">取消</el-button>
        <el-button type="primary" @click="createBrand('form')">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改品牌" :visible.sync="showUpdate">
      <el-form label-position="right" :model="form" :rules="rules" ref="updateform" label-width="100px">
        <el-form-item prop="name">
          <span slot="label">品牌名称</span>
          <el-input v-model="form.name" maxlength="64"/>
        </el-form-item>
        <el-form-item label="品牌别名">
          <el-input v-model="form.nickName" maxlength="64"/>
        </el-form-item>
        <el-form-item label="LOGO图片">
          <el-upload
            class="avatar-uploader"
            :action="uploadApi"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :headers="headers"
            name="image"
            accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO"
          >
            <img v-if="form.url" :src="form.url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showUpdate = false">取消</el-button>
        <el-button type="primary" @click="updateBrand('updateform')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {brandlist, addBrand, delBrand, queryById, updateBrand, isCanDelBrand} from '@/api/brands';
  import {getToken} from '@/utils/token'

  export default {
    data() {
      return {
        delIds: [],  //删除的品牌id
        uploadApi: process.env.UPLOAD_API,  // 上传图片api
        headers: {
          Authorization: 'Bearer ' + getToken()
        }, // 认证的头部
        showAdd: false, // 是否显示新增框
        isProcess: false, // 接口是否处理中
        showUpdate: false, // 是否显示修改框
        listLoading: true, // 加载中
        list: null, // 品牌数据
        total: null, // 数据总数
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          name: '',
          nickName: ''
        }, // 查询参数
        form: {name: '', id: '', nickName: '', url: ''}, // 品牌表单
        rules: {
          name: [
            {
              required: true,
              message: '请输入品牌名称',
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
      // 查询品牌列表
      getList() {
        this.listLoading = true
        brandlist(this.listQuery).then((response) => {
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
      // 准备添加品牌
      toAddBrand() {
        this.showAdd = true;
        this.resetForm();
        if (this.$refs["form"]) {
          this.$refs["form"].resetFields();
        }
      },
      // 上传图片回调
      uploadSuccess(res) {
        this.form.url = res;
      },
      // 删除品牌二次确认
      handleDelete(id) {
        console.log(id)
        isCanDelBrand({"id": id}).then( res => {
          console.log(res)
          if(res === true){
            this.$message.error('该品牌不能删除')
            return
          }else{
            this.$confirm('是否确认删除, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.delBrand(id);
            })
          }
          
          
        })
        
      },
      // 删除品牌
      delBrand(ids) {
        if (this.isProcess) {
          return;
        }
        this.isProcess = true;
        delBrand({"ids": ids.toString()}).then(() => {
          this.isProcess = false;
          this.getList();
          this.delIds = [];
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        });
      },
      // 批量删除品牌二次确认
      batchDelete() {
        if (this.delIds && this.delIds.length > 0) {
          this.$confirm('是否确认删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.delBrand(this.delIds);
          })
        } else {
          this.$message({
            message: '请至少选择一个品牌',
            type: 'warning'
          })
        }
      },
      // 创建品牌
      createBrand(formName) {
        this.$refs[formName].validate(valid => {
          if (!this.isProcess && valid) {
            this.isProcess = true;
            addBrand(this.form).then(() => {
              this.isProcess = false;
              this.showAdd = false;
              this.getList();
              this.$message({
                type: 'success',
                message: '创建成功!'
              });
            })
          }
        });
      },
      // 重置
      resetForm() {
        this.form = {name: '', id: '', nickName: '', url: ''};
      },
      // 准备更新品牌
      toUpdate(id) {
        queryById(id).then(res => {
          this.form = {name: res.name, id: res.id, nickName: res.nickName, url: res.url};
          this.showUpdate = true;
          if (this.$refs["updateform"]) {
            this.$refs["updateform"].resetFields();
          }
        })
      },
      // 更新品牌
      updateBrand(formName) {
        this.$refs[formName].validate(valid => {
          if (!this.isProcess && valid) {
            this.isProcess = true;
            updateBrand(this.form).then(() => {
              this.isProcess = false;
              this.showUpdate = false;
              this.getList();
              this.$message({
                type: 'success',
                message: '更新成功!'
              });
            })
          }
        });
      },
    }
  }
</script>
