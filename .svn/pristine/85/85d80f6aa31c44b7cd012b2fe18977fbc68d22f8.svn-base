<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filterBox">
        <p>积分商品标题</p>
        <el-input placeholder="积分商品标题" v-model="listQuery.name" size="medium" style="width: 200px;"
                  class="filter-item"/>
      </div>
      <div class="filterBox">
        <p>积分商品分类</p>
        <el-select size="medium" style="margin-bottom: 10px; vertical-align: middle" v-model="listQuery.cateId"
                   filterable placeholder="请选择分类">
          <el-option label="请选择分类" value=""></el-option>
          <el-option
            v-for="item in pointCates"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
      <br/>
      <router-link style="margin-left: 10px" to="/marketingmanager/pointsmall/addpointsku">
        <el-button class="filter-item" size="medium" type="primary" icon="el-icon-plus">添加积分商品</el-button>
      </router-link>
      <el-button class="filter-item" size="medium" style="margin-left: 5px;" type="danger" icon="el-icon-delete"
                 @click="toBatchDeletePointSku">批量删除
      </el-button>
    </div>

    <el-table
      :data="pointSkuList"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="40"/>
      <el-table-column label="商品图片" width="80">
        <template slot-scope="scope"><img :src="scope.row.pics.split(',')[0]" width="50" height="50"></template>
      </el-table-column>
      <el-table-column label="商品名称" min-width="250">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="商品编号">
        <template slot-scope="scope">{{ scope.row.code }}</template>
      </el-table-column>
      <el-table-column label="商品分类">
        <template slot-scope="scope">{{ scope.row.cateName }}</template>
      </el-table-column>
      <el-table-column label="所需积分">
        <template slot-scope="scope">{{ scope.row.point }}</template>
      </el-table-column>
      <el-table-column label="参考价格">
        <template slot-scope="scope">{{ scope.row.price }}</template>
      </el-table-column>
      <el-table-column label="是否发布" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == '0'" type="info">否</el-tag>
          <el-tag v-if="scope.row.status == '1'" type="success">是</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="库存">
        <template slot-scope="scope">{{ scope.row.stock }}</template>
      </el-table-column>
      <el-table-column label="操作" align="left" width="145">
        <template slot-scope="scope">
          <router-link :to="{path:'/marketingmanager/pointsmall/updatepointsku',query:{id:scope.row.id}}">
            <el-button type="primary" style="margin: 0 5px 0 0" size="mini">修改</el-button>
          </router-link>
          <el-button size="mini" style="margin: 0" type="danger" @click="toDeletePointSku(scope.row.id)">删除</el-button>
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
  import {queryPointSkuList, queryAllPointCates, deletePointSkus} from '@/api/pointskulist';

  export default {
    data() {
      return {
        isProcess: false, // 接口是否处理中
        pointCates: null,// 所有积分商城分类集合
        delIds: [],// 批量删除选中id数组
        listLoading: true, // 列表加载标识
        pointSkuList: null, // 列表数据集合
        total: null, // 总记录数
        listQuery: {
          pageNum: 0, // 当前页码
          pageSize: 10, // 每页显示记录数
          title: '' // 积分商品标题
        },
      }
    },
    created() {
      this.queryAllPointCates();
      this.getList()
    },
    methods: {
      // 查询所有积分商城分类
      queryAllPointCates(){
        queryAllPointCates().then((res) => {
          this.pointCates = res;
        });
      },
      // 查询积分商品列表
      getList() {
        this.listLoading = true;
        queryPointSkuList(this.listQuery).then((response) => {
          this.pointSkuList = response.data;
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
      // 删除积分商品二次确认
      toDeletePointSku(id) {
        this.$confirm('是否确认删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deletePointSku(id);
        })
      },
      // 多选选中积分商品
      handleSelectionChange(val) {
        if (val && val.length > 0) {
          this.delIds = val.map(row => row.id);
        } else {
          this.delIds = [];
        }
      },
      // 批量删除积分商品二次确认
      toBatchDeletePointSku() {
        if (this.delIds && this.delIds.length > 0) {
          this.$confirm('是否确认删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deletePointSku(this.delIds);
          })
        } else {
          this.$message({
            message: '请至少选择一个积分商品',
            type: 'warning'
          })
        }
      },
      // 删除积分商品
      deletePointSku(ids) {
        if (!this.isProcess) {
          this.isProcess = true;
          deletePointSkus({"ids": ids.toString()}).then(res => {
            this.isProcess = false;
            if (res >= 1) {
              this.getList();
              this.delIds = [];
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            } else {
              this.$message({
                message: '删除失败!',
                type: 'error'
              })
            }
          });
        }
      },
    }
  }
</script>
