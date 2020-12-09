<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" size="medium" icon="el-icon-back" @click="back()">返回商品组合列表</el-button>
      <el-button class="filter-item" size="medium" style="margin-left: 5px;" type="primary" icon="el-icon-plus"
                 @click="toQuerySkus()">添加商品
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
      <el-table-column label="货品图片" width="80">
        <template slot-scope="scope"><img :src="scope.row.sku.url" width="50" height="50"></template>
      </el-table-column>
      <el-table-column label="货品标题" min-width="250">
        <template slot-scope="scope">{{ scope.row.sku.name }}</template>
      </el-table-column>
      <el-table-column label="销售价">
        <template slot-scope="scope">{{ scope.row.sku.price.toFixed(2) }}</template>
      </el-table-column>
      <el-table-column label="规格">
        <template slot-scope="scope">
          <span v-html="getSpecValues(scope.row.sku.skuSpecValues)"></span>
        </template>
      </el-table-column>
      <el-table-column label="商品编号">
        <template slot-scope="scope">{{ scope.row.skuId }}</template>
      </el-table-column>
      <el-table-column label="操作" align="left" width="145">
        <template slot-scope="scope">
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

    <el-dialog title="选择商品" :visible.sync="showSkus" width="75%">
      <div class="filter-container">
        <el-input placeholder="商品名称" v-model="skuListQuery.name" size="medium" style="width: 200px;"
                  class="filter-item"/>
        <el-input placeholder="商品编号" v-model="skuListQuery.skuNo" size="medium" style="width: 200px;"
                  class="filter-item"/>
        <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleSkuFilter()">
          搜索
        </el-button>
      </div>
      <el-table
        :data="skuLists"
        v-loading="skuListLoading"
        border
        fit
        highlight-current-row
        @selection-change="handleSkusSelectionChange"
      >
        <el-table-column type="selection" align="center" width="40"/>
        <el-table-column label="商品图片" width="80">
          <template slot-scope="scope"><img :src="scope.row.url" width="50" height="50"></template>
        </el-table-column>
        <el-table-column label="商品编号" width="140">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="商品名称" min-width="250">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="规格" min-width="150">
          <template slot-scope="scope">
            <span v-html="getSpecValues(scope.row.skuSpecValues)"></span>
          </template>
        </el-table-column>
        <el-table-column label="销售价">
          <template slot-scope="scope">{{ scope.row.price.toFixed(2)}}</template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination background @size-change="handleSkusSizeChange" @current-change="handleSkusCurrentChange"
                       :current-page="skuListQuery.pageNum+1" :page-sizes="[10,20,30,50]"
                       :page-size="skuListQuery.pageSize"
                       layout="total, sizes, prev, pager, next, jumper" :total="skuTotal">
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showSkus = false">取消</el-button>
        <el-button type="primary" @click="saveSkus()">保存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    queryGoodsOfGoodsCombination,
    deletecombinationsku,
    querySkusForGoodsCombination,
    queryExclusionMarketingCountBySkuId,
    addCombinationSku
  } from '@/api/combinedskus';

  export default {
    data() {
      return {
        selectedSkuIds: [],// 选中的单品id集合
        showSkus: false,// 是否显示sku列表
        selectedIds: [],// 选中的id
        isProcess: false,// 接口处理中
        listLoading: true, // 加载中
        list: null, // 组合下的单品数据
        total: null, // 数据总数
        listQuery: {
          pageNum: 0,
          pageSize: 10,
        }, // 查询参数
        skuListLoading: true,// 单品列表加载中
        skuTotal: null,// 单品的总数量
        skuLists: null,// 单品信息
        skuListQuery: {
          pageNum: 0,
          pageSize: 10,
          name: '',
          skuNo: ''
        }, // 单品查询参数
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        queryGoodsOfGoodsCombination(this.listQuery, this.$route.query.id).then((response) => {
          this.list = response.data;
          this.total = response.recordsTotal;
          this.listLoading = false
        })
      },
      getSkuList() {
        this.skuListLoading = true
        querySkusForGoodsCombination(this.skuListQuery).then((response) => {
          this.skuLists = response.data;
          this.skuTotal = response.recordsTotal;
          this.skuListLoading = false
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

      handleSkusCurrentChange(val) {
        this.skuListQuery.pageNum = val - 1;
        this.getSkuList();
      },
      handleSkusSelectionChange(val) {
        if (val && val.length > 0) {
          this.selectedSkuIds = val.map(row => row.id);
        } else {
          this.selectedSkuIds = [];
        }
      },
      // 过滤查询
      handleSkuFilter() {
        this.skuListQuery.pageNum = 0;
        this.getSkuList();
      },
      handleSkusSizeChange(val) {
        this.skuListQuery.pageNum = 0;
        this.skuListQuery.pageSize = val;
        this.getSkuList();
      },

      back() {
        this.$router.back(-1);
      },
      // 删除商品组合商品二次确认
      handleDelete(id) {
        this.$confirm('是否确认删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delCombinedSkus(id);
        })
      },
      // 批量删除商品组合商品二次确认
      batchDelete() {
        if (this.selectedIds && this.selectedIds.length > 0) {
          this.$confirm('是否确认删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.delCombinedSkus(this.selectedIds);
          })
        } else {
          this.$message({
            message: '请至少选择一条数据',
            type: 'warning'
          })
        }
      },
      // 删除商品组合
      delCombinedSkus(ids) {
        if (this.isProcess) {
          return;
        }
        this.isProcess = true;
        deletecombinationsku({"ids": ids.toString()}).then(() => {
          this.isProcess = false;
          this.getList();
          this.selectedIds = [];
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        });
      },
      // 查询单品信息
      toQuerySkus() {
        this.showSkus = true;
        this.selectedSkuIds = [];
        this.skuListQuery = {
          pageNum: 0,
          pageSize: 10,
          name: '',
          skuNo: ''
        };
        this.getSkuList();
      },
      // 保存选中的单品
      saveSkus() {
        if (this.selectedSkuIds && this.selectedSkuIds.length > 0) {
          if (this.isProcess) {
            return false;
          }
          this.isProcess = true;
          const combinationId = this.$route.query.id;
          this.isSkusexclusive(this.selectedSkuIds.toString()).then(res => {
            if (res) {
              this.isProcess = false;
              this.$message({
                message: '商品存在互斥促销',
                type: 'error'
              })
            } else {
              addCombinationSku(this.selectedSkuIds.map(function (skuId) {
                return {combinationId: combinationId, skuId: skuId};
              })).then(() => {
                this.isProcess = false;
                this.$message({
                  type: 'success',
                  message: '添加商品成功!'
                });
                this.getList();
                this.showSkus = false;
              })
            }
          });
        } else {
          this.$message({
            message: '请至少选择一条数据',
            type: 'warning'
          })
        }
      },
      // 判断选中的单品是否存在促销的互斥
      isSkusexclusive(skuIds) {
        return queryExclusionMarketingCountBySkuId({"skuIds": skuIds}).then(res => {
          return res > 0;
        })
      }
    },
    computed: {
      getSpecValues() {
        return function (skuSpecValues) {
          let content = '';

          for (let i = 0; i < skuSpecValues.length; i++) {
            content += skuSpecValues[i].spec.name + ":" + skuSpecValues[i].valueRemark + "<br>";
          }
          return content;
        }
      }
    }
  }
</script>
