<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="专题名" v-model="listQuery.name" size="medium" style="width: 200px;" class="filter-item"/>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
      <br/>
      <el-dropdown class="filter-item" style="margin-left: 5px;">
        <el-button size="medium" type="primary" icon="el-icon-plus">添加专题<i
          class="el-icon-arrow-down el-icon--right"></i></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="dialogFormVisible = true">可视化编辑</el-dropdown-item>
          <router-link to="/sitesetting/thematic/addthematic">
            <el-dropdown-item>自定义编辑</el-dropdown-item>
          </router-link>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button class="filter-item" size="medium" style="margin-left: 5px;" type="danger" icon="el-icon-delete"
                 @click="toBatchDeleteThematic">批量删除
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="thematicList"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="40"/>
      <el-table-column label="专题标题">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column label="是否启用">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isUse == '0'" type="success">是</el-tag>
          <el-tag v-else type="info">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="更新时间">
        <template slot-scope="scope">{{ scope.row.modifyTime }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="toUpdateThematic(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="toDeleteThematic(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.pageNum+1" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog title="选择模板" :visible.sync="dialogFormVisible" width="820px">
      <div v-for="i in templateList" class="template_box clearfix"
           style="width: 218px; box-sizing: initial; display: inline-block!important;">
        <img v-if="i.imgUrl !== ''" :src="i.imgUrl" width="218" height="256">
        <div v-if="i.imgUrl === ''"
             style="width: 218px; height: 256px; text-align: center; line-height: 256px; font-size: 18px; background: #ececec">
          空白模板
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 10px">
          <p style="line-height: 0.5; color: #666; margin: 14px 0">{{i.name}}</p>
          <el-button @click="toAddThematicVisual(i.value)" type="primary" size="mini" icon="el-icon-finished"
                     style="height: 35px">
            使用此模板
          </el-button>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    queryThematicList, // 分页查询专题列表
    deleteThematic, // 删除专题
  } from '@/api/thematic';

  export default {
    data() {
      return {
        isProcess: false, // 接口是否处理中
        delIds: [],// 批量删除选中id数组
        listLoading: true, // 列表加载标识
        thematicList: null, // 列表数据集合
        total: null, // 总记录数
        listQuery: {
          pageNum: 0, // 当前页码
          pageSize: 10, // 每页显示记录数
          title: '' // 专题标题
        },
        dialogFormVisible: false, // 新增可视化编辑专题弹窗标记
        templateList: [
          {
            value: '15',
            name: '空白模板',
            imgUrl: ''
          },
          {
            value: '3',
            name: 'pc专题模板',
            imgUrl: require('@/assets/Thematic1/thematic1.jpg')
          }
        ],
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 查询专题列表
      getList() {
        this.listLoading = true;
        queryThematicList(this.listQuery).then((response) => {
          this.thematicList = response.data;
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
      // 删除专题二次确认
      toDeleteThematic(id) {
        this.$confirm('是否确认删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteThematic(id);
        })
      },
      // 多选选中专题
      handleSelectionChange(val) {
        if (val && val.length > 0) {
          this.delIds = val.map(row => row.id);
        } else {
          this.delIds = [];
        }
      },
      // 批量删除专题二次确认
      toBatchDeleteThematic() {
        if (this.delIds && this.delIds.length > 0) {
          this.$confirm('是否确认删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteThematic(this.delIds);
          })
        } else {
          this.$message({
            message: '请至少选择一个专题',
            type: 'warning'
          })
        }
      },
      // 删除专题
      deleteThematic(ids) {
        if (!this.isProcess) {
          this.isProcess = true;
          deleteThematic({"ids": ids.toString()}).then(res => {
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
      // 跳转到新增模版（可视化编辑）
      toAddThematicVisual(id) {
        let routeData = this.$router.resolve({
          name: 'addthematicforvisual',
          query: {id: id}
        });
        window.open(routeData.href, '_blank')
      },
      // 跳转到修改模版
      toUpdateThematic(thematic) {
        if (thematic.type == '0') {
          // 富文本编辑
          this.$router.push({path: '/sitesetting/thematic/updatethematic', query: {id: thematic.id}})
        } else if (thematic.type == '1') {
          // 可视化编辑
          let routeData = this.$router.resolve({
            name: 'updatethematicforvisual',
            query: {id: thematic.id}
          });
          window.open(routeData.href, '_blank')
        }
      },
    }
  }
</script>
