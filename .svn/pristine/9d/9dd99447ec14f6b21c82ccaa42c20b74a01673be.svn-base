<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filterBox">
        <p>SPU编号</p>
        <el-input placeholder="SPU编号" size="medium" v-model="listQuery.id" maxlength="20" style="width: 150px;"
                  class="filter-item"/>
      </div>
      <div class="filterBox">
        <p>SPU标题</p>
        <el-input placeholder="SPU标题" size="medium" v-model="listQuery.name" maxlength="20" style="width: 150px;"
                  class="filter-item"/>
      </div>

      <div class="filterBox">
        <p>店铺名称</p>
        <el-input placeholder="店铺名称" size="medium" v-model="listQuery.storeName" maxlength="20" style="width: 150px;"
                  class="filter-item"/>
      </div>
      <div class="filterBox">
        <p>上架状态</p>
        <el-select class="filter-item" v-model="shelvesStatus" size="medium" style="width: 150px"
                   placeholder="请选择上架状态">
          <el-option label="全部" value="-1" selected></el-option>
          <el-option label="上架" value="1"></el-option>
          <el-option label="下架" value="0"></el-option>
        </el-select>
      </div>
      <div class="filterBox">
        <p>是否虚拟商品</p>
        <el-select class="filter-item" v-model="isVirtual" size="medium" style="width: 180px"
                   placeholder="请选择是否虚拟商品">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="否" value="0"></el-option>
          <el-option label="是" value="1"></el-option>
        </el-select>
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
      <br/>
      <el-button class="filter-item" size="medium" style="margin-left: 10px;" type="danger" icon="el-icon-bottom"
                 @click="tobatchdown">违规下架
      </el-button>
      <el-dropdown class="filter-item" style="margin-left: 5px;">
        <el-button size="medium" type="primary">导出商品<i
          class="el-icon-arrow-down el-icon--right"></i></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="exportStoreAllSpu()">导出所有</el-dropdown-item>
          <el-dropdown-item @click.native="exportStoreCheckedSpu()">导出选中</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
      <el-table-column label="SPU图片" width="80">
        <template slot-scope="scope"><img :src="scope.row.url" width="50" height="50"></template>
      </el-table-column>
      <el-table-column label="SPU标题" min-width="230">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="虚拟商品" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isVirtual == '0'" type="info">否</el-tag>
          <el-tag v-if="scope.row.isVirtual == '1'" type="success">是</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="120">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.shelvesStatus == '1'" type="success">上架</el-tag>
          <el-tag v-if="scope.row.shelvesStatus == '0'" type="info">下架</el-tag>
          <el-tag v-if="scope.row.shelvesStatus == '2'" type="info">违规下架</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="销售价">
        <template slot-scope="scope">{{ scope.row.price |toFixed}}</template>
      </el-table-column>
      <el-table-column label="分类">
        <template slot-scope="scope">{{ scope.row.thirdCategory?scope.row.thirdCategory.name :''}}</template>
      </el-table-column>
      <el-table-column label="品牌">
        <template slot-scope="scope">{{ scope.row.brand?scope.row.brand.name:''}}</template>
      </el-table-column>
      <el-table-column label="店铺名称">
        <template slot-scope="scope">{{ scope.row.storeName }}</template>
      </el-table-column>
      <el-table-column label="操作" align="left" width="80">
        <template slot-scope="scope">
          <router-link :to="{path:'/storemanager/storespus/storespudetail',query:{id:scope.row.id}}">
            <el-button type="success" style="margin:0" size="mini">详情</el-button>
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
    queryAllStoreSpus,  //分页查询所有店铺的商品信息
    queryCategoryByParentId,  //根据分类id查询所有子分类信息
    updateShelvesStatusIllegal, //违规下架
    exportStoreAllSpu, //导出所有店铺商品信息
    exportStoreCheckedSpu, //导出选中的店铺商品信息
  } from '@/api/storespuslist';


  export default {
    data() {
      return {
        goodsStateValue: '0',
        goodsVirtualValue: '0',
        brandsValue: '0',
        isProcess: false, //接口是否正在处理中
        listLoading: true, //加载中
        isVirtual: '', //虚拟物品
        shelvesStatus: '', //是否上架
        selectedIds: [],// 选中的id
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          id: '',
          name: '',
          shelvesStatus: -1,
          isVirtual: -1,
          storeName: '',
          secondCateId: 0,
          thirdCateId: 0
        }, // 查询参数
        list: null, // 订单数据,
        total: null, // 数据总数,
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
        cateSelectedOptions: [],
        multipleSelection: [],
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
      //导出所有商品
      exportStoreAllSpu() {
        exportStoreAllSpu().then(response => {
          let blob = new Blob([response], {type: "application/vnd.ms-xls"});
          let objectUrl = URL.createObjectURL(blob);
          window.location.href = objectUrl;
        });
      },

      //导出选中商品
      exportStoreCheckedSpu() {
        if (!this.selectedIds.length > 0) {
          this.$message({
            message: '请至少选择一条记录！',
            type: 'warning'
          })
          return;
        }
        exportStoreCheckedSpu(this.selectedIds.toString()).then(response => {
          let blob = new Blob([response], {type: "application/vnd.ms-xls"});
          let objectUrl = URL.createObjectURL(blob);
          window.location.href = objectUrl;
        });
      },

      //加载列表
      getList() {
        if (this.shelvesStatus) {
          this.listQuery.shelvesStatus = this.shelvesStatus;
        }
        if (this.isVirtual) {
          this.listQuery.isVirtual = this.isVirtual;
        }
        this.listLoading = true
        queryAllStoreSpus(this.listQuery).then(response => {
          this.list = response.data;
          this.total = response.recordsTotal;
          this.listLoading = false
        });
      },

      //获取选中 id
      handleSelectionChange(val) {
        if (val && val.length > 0) {
          this.selectedIds = val.map(row => row.id);
        } else {
          this.selectedIds = [];
        }
      },

      //翻页
      handleCurrentChange(val) {
        this.listQuery.pageNum = val - 1;
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 0;
        this.listQuery.pageSize = val;
        this.getList();
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


      //违规下架
      tobatchdown() {
        if (!this.selectedIds.length > 0) {
          this.$message({
            message: '请至少选择一条记录！',
            type: 'warning'
          })
          return;
        }
        this.$confirm('确定要下架选中的商品吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.isProcess) {
            return;
          }
          this.isProcess = true;
          let param = {
            ids: this.selectedIds.toString(),
          };
          updateShelvesStatusIllegal(param).then(response => {
            this.isProcess = false;
            if (response > 0) {
              this.$message({
                type: 'success',
                message: '批量下架成功!'
              });
              this.getList();
            } else {
              this.$message({
                type: 'error',
                message: '批量下架失败!'
              })
            }
          });
        })
      }
    }
  }
</script>
