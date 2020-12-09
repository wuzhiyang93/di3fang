<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" size="medium" type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">
        创建模板
      </el-button>
    </div>

    <el-table
      :data="datas"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="模板名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="创建时间" min-width="160">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="状态" min-width="60">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isUse == '1'" type="success">已启用</el-tag>
          <el-tag v-if="scope.row.isUse == '0'" type="info">未启用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link
            :to="{path:'/applet/appletindex/updateappletindex',query:{initId:scope.row.id}}">
            <el-button type="primary" size="mini" style="margin: 0 5px 0 0">编辑</el-button>
          </router-link>
          <el-button v-if="scope.row.isUse == '0'" type="success" size="mini" style="margin: 0 5px 0 0"
                     @click="handleUse(scope.row.id)">启用
          </el-button>
          <el-button v-if="scope.row.isUse == '0'" size="mini" type="danger" style="margin: 0"
                     @click="handleDelete(scope.row.id)">删除
          </el-button>
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
      <div v-for="i in templateList" class="template_box clearfix" style="width: 218px; box-sizing: initial; display: inline-block!important;">
        <img v-if="i.imgUrl !== ''" :src="i.imgUrl" width="218" height="290">
        <div v-if="i.imgUrl === ''"
             style="width: 218px; height: 290px; text-align: center; line-height: 256px; font-size: 18px; background: #ececec">
          空白模板
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 10px">
          <p style="line-height: 0.5; color: #666; margin: 14px 0">{{i.name}}</p>
          <router-link
            :to="{path:'/applet/appletindex/addappletindex',query:{initId:i.value}}">
            <el-button type="primary" size="mini" icon="el-icon-finished" style="height: 35px">使用此模板</el-button>
          </router-link>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    queryAppletIndex,
    deleteAppletIndex,
    setappletuse
  } from '@/api/appletindex';

  export default {
    data() {
      return {
        isProcess:false,// 处理中标记
        listLoading: true, // 列表加载标识
        datas: null, // 列表数据集合
        total: null, // 总记录数
        listQuery: {
          pageNum: 0, // 当前页码
          pageSize: 10, // 每页显示记录数
        },
        dialogFormVisible: false,
        templateList: [
          {
            value: '0',
            name: '空白模板',
            imgUrl: ''
          },
          {
            value: '9',
            name: '综合商城',
            imgUrl: require('@/assets/img/weixinTemplate1.jpg')
          },
          {
            value: '11',
            name: '潮流服饰',
            imgUrl: require('@/assets/img/weixinTemplate2.jpg')
          }
        ]
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true;
        queryAppletIndex(this.listQuery).then((response) => {
          this.datas = response.data;
          this.total = response.recordsTotal;
          this.listLoading = false
        })
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
      // 删除模版二次确认
      handleDelete(id) {
        this.$confirm('是否确认删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delTemplate(id);
        })
      },
      // 删除模版
      delTemplate(id) {
        if (this.isProcess) {
          return;
        }
        this.isProcess = true;
        deleteAppletIndex(id).then(() => {
          this.isProcess = false;
          this.getList();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        });
      },
      // 启用模版二次确认
      handleUse(id) {
        this.$confirm('您确定要启用该模板吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.setUse(id);
        })
      }
      ,
      // 设置模版启用
      setUse(id) {
        if (this.isProcess) {
          return;
        }
        this.isProcess = true;
        setappletuse(id).then(() => {
          this.isProcess = false;
          this.getList();
          this.$message({
            type: 'success',
            message: '启用模版成功!'
          });
        });
      }

    }
  }
</script>
