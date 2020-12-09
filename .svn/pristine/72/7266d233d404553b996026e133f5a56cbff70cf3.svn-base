<template>
  <div class="app-container">

    <el-radio-group v-model="listQuery.status" style="margin-bottom: 20px" @change="handleFilter">
      <el-radio-button :label="1">未开始</el-radio-button>
      <el-radio-button :label="2">进行中</el-radio-button>
      <el-radio-button :label="3">已结束</el-radio-button>
    </el-radio-group>

    <el-alert title="操作说明：" type="warning" :closable="false">
      <p>1. 未开始的秒杀活动可以修改和删除。</p>
      <p>2. 已开始的秒杀活动可以删除，不可以修改。</p>
      <p>3. 已结束的秒杀活动，不可以修改。</p>
    </el-alert>

    <div class="filter-container" style="margin-top: 20px">
      <el-input placeholder="促销名称" maxlength="32" v-model="listQuery.name" size="medium" style="width: 200px;"
                class="filter-item"/>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
      <br/>
      <router-link style="margin-left: 10px" to="/marketingmanager/goodsmarketing/addpanicbuy">
        <el-button class="filter-item" size="medium" type="primary" icon="el-icon-plus">添加秒杀活动</el-button>
      </router-link>
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
      <el-table-column label="促销名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="描述">
        <template slot-scope="scope">{{ scope.row.desc }}</template>
      </el-table-column>
      <el-table-column label="状态" width="82">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == '1'" type="warning">未开始</el-tag>
          <el-tag v-if="scope.row.status == '2'" type="success">进行中</el-tag>
          <el-tag v-if="scope.row.status == '3'" type="info">已结束</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="开始时间">
        <template slot-scope="scope">{{ scope.row.startTime }}</template>
      </el-table-column>
      <el-table-column label="结束时间">
        <template slot-scope="scope">{{ scope.row.endTime }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link v-if="scope.row.status == '1'"
                       :to="{path:'/marketingmanager/goodsmarketing/updatepanicbuy',query:{id:scope.row.id}}">
            <el-button type="primary" style="margin: 0" size="mini">修改</el-button>
          </router-link>
          <router-link v-if="scope.row.status != '1'"
                       :to="{path:'/marketingmanager/goodsmarketing/panicbuydetail',query:{id:scope.row.id}}">
            <el-button type="success" style="margin: 0" size="mini">查看</el-button>
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
  import {queryPanicBuyMarketing, deletePanicBuyByIds} from '@/api/panicbuy';

  export default {
    data() {
      return {
        selectIds: [],
        isProcess: false, // 接口是否处理中
        listLoading: true, // 加载中
        list: null, // 促销数据
        total: null, // 数据总数
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          name: '',
          type: '3',
          status: '1', // 活动状态 1 未开始 2 进行中 3 已结束
        }, // 查询参数
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        queryPanicBuyMarketing(this.listQuery).then((response) => {
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
          this.selectIds = val.map(row => row.id);
        } else {
          this.selectIds = [];
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
      // 删除限时折扣二次确认
      handleDelete(id) {
        this.$confirm('是否确认删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deletePanicBuys(id);
        })
      },
      // 批量删除限时折扣二次确认
      batchDelete() {
        if (this.selectIds && this.selectIds.length > 0) {
          this.$confirm('是否确认删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deletePanicBuys(this.selectIds);
          })
        } else {
          this.$message({
            message: '请至少选择一条数据',
            type: 'warning'
          })
        }
      },
      // 删除限时抢购
      deletePanicBuys(ids) {
        if (this.isProcess) {
          return;
        }
        this.isProcess = true;
        deletePanicBuyByIds({"marketingIds": ids.toString()}).then(() => {
          this.isProcess = false;
          this.getList();
          this.selectIds = [];
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        });
      },
    }
  }
</script>
