<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="商品标题" v-model="listQuery.name" size="medium" style="width: 200px;" class="filter-item"/>
      <el-button class="filter-item" type="primary" size="medium" @click="handleFilter" icon="el-icon-search">搜索
      </el-button>
      <br/>
      <el-button class="filter-item" size="medium" style="margin-left: 5px;" type="danger" icon="el-icon-delete"
                 @click="batchDelete">批量删除
      </el-button>
      <el-link class="el-button filter-item el-button--primary el-button--medium" style="color: #fff" :underline="false"
               :href="spuImportTemplateApi" icon="el-icon-download">下载模板
      </el-link>
      <el-upload
        style="display: inline-block; margin: 0 0 10px 5px; vertical-align: middle"
        :action="uploadImportApi"
        :on-success="handleSuccess"
        :show-file-list="false"
        :headers="headers"
        name="spuimport"
        accept=".xls">
        <el-button size="medium" type="primary" icon="el-icon-upload2">导入商品</el-button>
      </el-upload>
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
      <el-table-column label="商品标题">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="销售价(元)" width="120">
        <template slot-scope="scope">{{ scope.row.price }}</template>
      </el-table-column>
      <el-table-column label="发布状态" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isRelease == '0'" type="success">未发布</el-tag>
          <el-tag v-if="scope.row.isRelease == '1'" type="info">已发布</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isRelease == '0'" type="primary" @click="toRelease(scope.row.id)" size="mini">发布
          </el-button>
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
  </div>
</template>

<script>
  import {spuimportLists, delSpuImport} from '@/api/spuimports';
  import {getToken} from '@/utils/token'

  export default {
    data() {
      return {
        headers: {
          Authorization: 'Bearer ' + getToken()
        }, // 请求头
        spuImportTemplateApi: process.env.BASE_API + "/spuimport.xls", //商品导入模版下载的地址
        uploadImportApi: process.env.BASE_API + "/spuimports",
        listLoading: true,  // 加载标记
        list: null, // 商品导入列表
        total: null, //总记录数
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          name: '',
        }, //  查询条件
        delIds: [],// 删除的id
        isProcess: false, // 接口是否处理中
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        spuimportLists(this.listQuery).then((response) => {
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
      // 过滤查询
      handleFilter() {
        this.listQuery.pageNum = 0;
        this.getList();
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
      handleSizeChange(val) {
        this.listQuery.pageNum = 0;
        this.listQuery.pageSize = val;
        this.getList();
      },
      // 导入商品回调
      handleSuccess(res) {
        if (res > 0) {
          this.getList();
          this.$message({
            type: 'success',
            message: '导入成功!'
          });
        } else if (res == -2) {
          this.$message({
            type: 'error',
            message: '请上传正确的xls文件!'
          });
        } else {
          this.$message({
            type: 'error',
            message: '导入失败!'
          });
        }

      },
      // 删除商品导入二次确认
      handleDelete(id) {
        this.$confirm('是否确认删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delSpuImport(id);
        })
      },
      // 删除商品导入
      delSpuImport(ids) {
        if (this.isProcess) {
          return;
        }

        this.isProcess = true;

        delSpuImport({"ids": ids.toString()}).then(() => {
          this.isProcess = false;
          this.getList();
          this.delIds = [];
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        });
      },
      // 批量删除商品导入二次确认
      batchDelete() {
        if (this.delIds && this.delIds.length > 0) {
          this.$confirm('是否确认删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.delSpuImport(this.delIds);
          })
        } else {
          this.$message({
            message: '请至少选择一条记录',
            type: 'warning'
          })
        }
      },
      // 去发布商品
      toRelease(id) {
        this.$router.push({
          path: '/spumanager/spumanager/addspu',
          query: {id: id}
        });
      }
    }
  }
</script>
