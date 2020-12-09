<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filterBox">
        <p>商品编号</p>
        <el-input placeholder="商品编号" size="medium" v-model="listQuery.id" maxlength="20" style="width: 150px;"
                  class="filter-item"/>
      </div>
      <div class="filterBox">
        <p>商品标题</p>
        <el-input placeholder="商品标题" size="medium" v-model="listQuery.name" maxlength="20" style="width: 150px;"
                  class="filter-item"/>
      </div>
      <div class="filterBox">
        <p>店铺名称</p>
        <el-input placeholder="店铺名称" size="medium" v-model="listQuery.storeName" maxlength="20" style="width: 150px;"
                  class="filter-item"/>
      </div>
      <div class="filterBox">
        <p>请选择分类</p>
        <el-cascader
          clearable
          style="margin-bottom: 10px; vertical-align: middle"
          size="medium"
          placeholder="请选择分类"
          expand-trigger="hover"
          :props="props"
          v-model="cateSelectedOptions">
        </el-cascader>
      </div>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
    </div>

    <el-table
      :data="list"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="商品图片" width="80">
        <template slot-scope="scope"><img :src="scope.row.url" width="50" height="50"></template>
      </el-table-column>
      <el-table-column label="商品标题" min-width="200">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="销售价">
        <template slot-scope="scope">{{ scope.row.price |toFixed }}</template>
      </el-table-column>
      <el-table-column label="分类">
        <template slot-scope="scope">{{ scope.row.thirdCategory.name }}</template>
      </el-table-column>
      <el-table-column label="品牌">
        <template slot-scope="scope">{{ scope.row.brand.name }}</template>
      </el-table-column>
      <el-table-column label="店铺名称">
        <template slot-scope="scope">{{ scope.row.storeName }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link :to="{path:'/storemanager/goodsaudit/spuauditdetail',query:{id:scope.row.id}}">
            <el-button type="success" style="margin: 0 5px 0 0" size="mini">审核</el-button>
          </router-link>
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

  import {
    queryAllStoreToBeAuditdSpus, //分页查询所有店铺待审核的商品
    queryCategoryByParentId //根据分类id查询所有子分类信息
  } from '@/api/goodsauditlist';

  export default {
    data() {
      return {
        isProcess: false, //接口是否正在处理中
        listLoading: true, //数据加载中
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          id: '',
          name: '',
          storeName: '',
          secondCateId: 0,
          thirdCateId: 0
        }, // 查询参数
        list: null, // 订单数据,
        total: null, // 数据总数,
        cateOptions: [{
          value: '',
          label: '全部',
        }],//分类数据
        cateSelectedOptions: [],
        multipleSelection: [],
        props: {
          lazy: true,
          lazyLoad(node, resolve) {
            const {level} = node;
            let parentId;
            let categoryList = [];
            if (node.value) {
              parentId = node.value;
            } else {
              parentId = 0;
            }
            queryCategoryByParentId(parentId).then(response => {
              categoryList = categoryList.concat(response);
              const nodes = Array.from(categoryList)
                .map(item => ({
                  value: item.id,
                  label: item.name,
                  leaf: level >= 2
                }));
              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
              resolve(nodes);
            });
          }
        },
      }
    },
    created() {
      this.getList()
    },
    filters: {
      toFixed(value) {
        // 截取当前数据到小数点后两位
        let realVal = Number(value).toFixed(2);
        if (realVal == 0.00) {
          return '';
        }
        return realVal;
      },
    },
    methods: {
      getList() {
        this.listLoading = true
        queryAllStoreToBeAuditdSpus(this.listQuery).then(response => {
          this.list = response.data;
          this.total = response.recordsTotal;
          this.listLoading = false
        });
      },
      // 过滤查询
      handleFilter() {
        if (this.cateSelectedOptions.length == 3) {
          this.listQuery.firstCateId = this.cateSelectedOptions[0];
          this.listQuery.secondCateId = this.cateSelectedOptions[1];
          this.listQuery.thirdCateId = this.cateSelectedOptions[2];
        } else {
          this.listQuery.firstCateId = 0;
          this.listQuery.secondCateId = 0;
          this.listQuery.thirdCateId = 0;
        }
        this.listQuery.pageNum = 0;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val - 1;
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 0;
        this.listQuery.pageSize = val;
        this.getList();
      },
    }
  }
</script>
