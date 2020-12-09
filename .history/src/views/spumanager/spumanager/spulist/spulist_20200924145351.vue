<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filterBox">
        <p>SPU编号</p>
        <el-input v-model="listQuery.id" placeholder="SPU编号" size="medium" style="width: 150px;" class="filter-item"/>
      </div>
      <div class="filterBox">
        <p>SPU标题</p>
        <el-input v-model="listQuery.name" placeholder="SPU标题" size="medium" style="width: 150px;" class="filter-item"/>
      </div>
      <div class="filterBox">
        <p>上架状态</p>
        <el-select class="filter-item" v-model="listQuery.shelvesStatus" size="medium" style="width: 150px"
                   placeholder="请选择上架状态">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="上架" value="1"></el-option>
          <el-option label="下架" value="0"></el-option>
        </el-select>
      </div>
      <div class="filterBox">
        <p>是否虚拟商品</p>
        <el-select class="filter-item" v-model="listQuery.isVirtual" size="medium" style="width: 180px"
                   placeholder="请选择是否虚拟商品">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="否" value="0"></el-option>
          <el-option label="是" value="1"></el-option>
        </el-select>
      </div>
      <div class="filterBox">
        <p>商品品牌</p>
        <el-select size="medium" style="margin-bottom: 10px; vertical-align: middle" v-model="listQuery.brandId"
                   filterable
                   placeholder="请选择品牌">
          <el-option
            v-for="item in brands"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="filterBox">
        <p>商品分类</p>
        <el-cascader
          clearable
          style="margin-bottom: 10px; vertical-align: middle"
          size="medium"
          placeholder="请选择分类"
          :props="props"
          v-model="cateSelectedOptions">
        </el-cascader>
      </div>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
      <br/>
      <router-link style="margin-left: 10px" to="/spumanager/spumanager/addspu">
        <el-button class="filter-item" size="medium" type="primary" icon="el-icon-plus">添加商品</el-button>
      </router-link>
      <el-button class="filter-item" size="medium" style="margin-left: 5px;" type="danger" icon="el-icon-delete"
                 @click="batchDelete()">批量删除
      </el-button>
      <el-button class="filter-item" size="medium" style="margin-left: 5px;" type="success" icon="el-icon-finished"
                 @click="generateIndex">生成索引
      </el-button>
      <el-dropdown class="filter-item" style="margin-left: 5px;">
        <el-button size="medium" type="primary">批量上下架<i class="el-icon-arrow-down el-icon--right"></i></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="tobatchup()">批量上架</el-dropdown-item>
          <el-dropdown-item @click.native="tobatchdown()">批量下架</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown class="filter-item" style="margin-left: 5px;">
        <el-button size="medium" type="primary">导出商品<i class="el-icon-arrow-down el-icon--right"></i></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="exportAll()">导出所有</el-dropdown-item>
          <el-dropdown-item @click.native="exportSelected()">导出选中</el-dropdown-item>
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
        <template slot-scope="scope"><a :href="scope.row.visitUrl" target="_blank"><img :src="scope.row.url" width="50"
                                                                                        height="50"></a></template>
      </el-table-column>
      <el-table-column label="SPU标题" min-width="250">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="虚拟商品" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isVirtual == '0'" type="info">否</el-tag>
          <el-tag v-if="scope.row.isVirtual == '1'" type="success">是</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="70">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.shelvesStatus == '1'" type="success">上架</el-tag>
          <el-tag v-if="scope.row.shelvesStatus == '0'" type="info">下架</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="销售价">
        <template slot-scope="scope">{{ scope.row.price.toFixed(2) }}</template>
      </el-table-column>
      <el-table-column label="分类">
        <template slot-scope="scope">{{ scope.row.thirdCategory.name }}</template>
      </el-table-column>
      <el-table-column label="品牌">
        <template slot-scope="scope">{{ scope.row.brand.name }}</template>
      </el-table-column>
      <el-table-column label="操作" align="left" width="145">
        <template slot-scope="scope">
          <router-link :to="{path:'/spumanager/spumanager/updatespu',query:{id:scope.row.id}}">
            <el-button type="primary" style="margin: 0 5px 0 0" size="mini">修改</el-button>
          </router-link>
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

  </div>
</template>

<script>
  import {
    querySpus,
    queryBrands,
    queryCategoryByParentIdForSpu,
    createIndex,
    updateShelvesStatus,
    deleteSpus,
    exportAllSpu,
    exportCheckedSpu
  } from '@/api/spulist';

  export default {
    data() {
      return {
        isProcess: false, // 接口是否处理中
        cateSelectedOptions: [],//选择的分类
        brands: [],//品牌列表
        selectedIds: [],// 选中的id
        listLoading: true, // 加载中
        list: null, // 商品数据
        total: null, // 数据总数
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          id: '',
          name: '',
          shelvesStatus: '-1',
          isVirtual: '-1',
          brandId: 0,
          firstCateId: '0',
          secondCateId: '0',
          thirdCateId: '0'
        }, // 查询参数
        props: {
          lazy: true,
          lazyLoad(node, resolve) {
            const {level} = node;
            let parentId;
            if (node.value) {
              parentId = node.value;
            } else {
              parentId = 0;
            }
            queryCategoryByParentIdForSpu(parentId).then(response => {
              let categoryList = response;
              const nodes = Array.from(categoryList)
                .map(item => ({
                  value: item.id,
                  label: item.name,
                  leaf: (item.id == 0) ? (level >= 0) : (level >= 2)
                }));
              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
              resolve(nodes);
            });
          }
        },
      }
    },
    created() {
      this.getList();
      this.queryBrands();
    },
    methods: {
      queryBrands() {
        this.brands.push({id: 0, name: '全部'});
        queryBrands().then((res) => {
          if (res && res.length > 0) {
            res.forEach(item => {
              this.brands.push(item);
            })
          }
        })
      },
      getList() {
        this.listLoading = true
        querySpus(this.listQuery).then((response) => {
          console.log("--------------")
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
          this.selectedIds = val.map(row => row.id);
        } else {
          this.selectedIds = [];
        }
      },
      // 过滤查询
      handleFilter() {
        this.listQuery.pageNum = 0;
        if (this.cateSelectedOptions && this.cateSelectedOptions.length > 0) {
          this.listQuery.firstCateId = this.cateSelectedOptions[0];
          this.listQuery.secondCateId = this.cateSelectedOptions[1];
          this.listQuery.thirdCateId = this.cateSelectedOptions[2];
        } else {
          this.listQuery.firstCateId = '0';
          this.listQuery.secondCateId = '0';
          this.listQuery.thirdCateId = '0';
        }
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 0;
        this.listQuery.pageSize = val;
        this.getList();
      },
      // 生成索引
      generateIndex() {
        createIndex().then(() => {
          this.$alert('创建生成索引任务完成，索引正在生成中...', '生成索引', {
            confirmButtonText: '确定'
          })
        })
      },
      // 更新上下架状态
      updateShelvesStatus(ids, status) {
        if (this.isProcess) {
          return;
        }
        this.isProcess = true;
        updateShelvesStatus(ids, status).then(() => {
          this.isProcess = false;
          this.selectedIds = [];
          if (status == '0') {
            this.$message({
              type: 'success',
              message: '批量下架成功!'
            })
          } else {
            this.$message({
              type: 'success',
              message: '批量上架成功!'
            })
          }

          this.handleFilter();
        })
      },
      tobatchup() {
        if (!this.selectedIds || this.selectedIds == 0) {
          this.$message({
            type: 'error',
            message: '请至少选择一条记录!'
          })
          return;
        }
        this.$confirm('确定要上架选中的商品吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.updateShelvesStatus(this.selectedIds.toString(), '1');
        })
      },
      tobatchdown() {
        if (!this.selectedIds || this.selectedIds == 0) {
          this.$message({
            type: 'error',
            message: '请至少选择一条记录!'
          })
          return;
        }
        this.$confirm('确定要下架选中的商品吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.updateShelvesStatus(this.selectedIds.toString(), '0');
        })
      },
      // 删除商品
      delSpus(ids) {
        if (this.isProcess) {
          return;
        }
        this.isProcess = true;
        deleteSpus(ids).then(() => {
          this.selectedIds = [];
          this.isProcess = false;
          this.handleFilter();
          this.$message({
            type: 'success',
            message: '删除商品成功!'
          })
        })
      },
      // 批量删除商品二次确认
      batchDelete() {
        if (this.selectedIds && this.selectedIds.length > 0) {
          this.$confirm('是否确认删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.delSpus(this.selectedIds.toString());
          })
        } else {
          this.$message({
            message: '请至少选择一个商品',
            type: 'warning'
          })
        }
      },
      // 删除商品二次确认
      handleDelete(id) {
        this.$confirm('是否确认删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delSpus(id);
        })
      },
      // 导出所有商品
      exportAll() {
        exportAllSpu().then(res => {
          let blob = new Blob([res], {type: "application/vnd.ms-excel"});
          let objectUrl = URL.createObjectURL(blob);
          window.location.href = objectUrl;
        });
      },
      // 导出选中的商品
      exportSelected() {
        if (this.selectedIds && this.selectedIds.length > 0) {
          exportCheckedSpu(this.selectedIds.toString()).then(res => {
            let blob = new Blob([res], {type: "application/vnd.ms-excel"});
            let objectUrl = URL.createObjectURL(blob);
            window.location.href = objectUrl;
          });
        } else {
          this.$message({
            message: '请至少选择一条记录！',
            type: 'warning'
          })
        }
      },
    }
  }
</script>
