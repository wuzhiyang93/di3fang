<template>
  <div class="app-container">
    <el-radio-group @change="changeStatus()" v-model="status" style="margin-bottom: 20px">
      <el-radio-button :label="-1">全部</el-radio-button>
      <el-radio-button :label="1">筹备中</el-radio-button>
      <el-radio-button :label="2">众筹中</el-radio-button>
      <el-radio-button :label="3">众筹成功</el-radio-button>
      <el-radio-button :label="4">众筹失败</el-radio-button>
    </el-radio-group>
    <div class="filter-container">
      <el-input v-model="listQuery.name" maxlength="32" placeholder="项目名称" size="medium" style="width: 200px;"
                class="filter-item"/>
      <el-date-picker
        style="width: 355px"
        class="search-datepicker"
        size="medium"
        :clearable="false"
        v-model="searchTimeValue"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="yyyy-MM-dd HH:mm:ss"
        value-format="yyyy-MM-dd HH:mm:ss"
        align="right">
      </el-date-picker>
      <el-input v-model="listQuery.storeName" maxlength="32" placeholder="店铺名称" size="medium" style="width: 200px;"
                class="filter-item"/>
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
      <el-table-column label="店铺名称" min-width="162">
        <template slot-scope="scope">{{ scope.row.storeName }}</template>
      </el-table-column>
      <el-table-column label="项目名称" min-width="162">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="开始时间" width="160">
        <template slot-scope="scope">{{ scope.row.startTime.split(' ')[0] }}</template>
      </el-table-column>
      <el-table-column label="结束时间" width="160">
        <template slot-scope="scope">{{ scope.row.endTime.split(' ')[0] }}</template>
      </el-table-column>
      <el-table-column label="众筹状态" width="92">
        <template slot-scope="scope">
          <el-tag v-if="getStatus(scope.row)=='1'" type="warning">筹备中</el-tag>
          <el-tag v-if="getStatus(scope.row)=='2'" type="warning">众筹中</el-tag>
          <el-tag v-if="getStatus(scope.row)=='3'" type="success">众筹成功</el-tag>
          <el-tag v-if="getStatus(scope.row)=='4'" type="info">众筹失败</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="筹到金额">
        <template slot-scope="scope">{{ scope.row.crowdFunding.alreadyMoney.toFixed(2) }}</template>
      </el-table-column>
      <el-table-column label="支持数量">
        <template slot-scope="scope">{{ scope.row.crowdFunding.supportNum }}</template>
      </el-table-column>
      <el-table-column label="操作" align="left" width="190">
        <template slot-scope="scope">
          <router-link :to="{path:'/storemanager/storecrowdfunding/storecrowdfundingorders',query:{id:scope.row.id}}">
            <el-button type="success" style="margin: 0 5px 0 0" size="mini">查看订单</el-button>
          </router-link>
          <router-link :to="{path:'/storemanager/storecrowdfunding/storecrowdfundingdetail',query:{id:scope.row.id}}">
            <el-button type="success" style="margin: 0" size="mini">查看详情</el-button>
          </router-link>
          <router-link
            :to="{path:'/storemanager/storecrowdfunding/storecrowdfundingschedule',query:{id:scope.row.id}}">
            <el-button type="primary" style="margin: 5px 0 0 0" size="mini">项目进展管理</el-button>
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

  import {queryStoreCrowdFundingMarketList} from '@/api/storecrowdfunding';

  export default {
    data() {
      return {
        searchTimeValue: null,// 搜索时间
        status: '-1',
        isProcess: false, // 接口是否处理中
        listLoading: true, // 加载中
        list: null, // 促销数据
        total: null, // 数据总数
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          status: '-1',
          name: '',
          startTime: '',
          endTime: '',
          storeName: '',
        }, // 查询参数
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        queryStoreCrowdFundingMarketList(this.listQuery).then((response) => {
          this.list = response.data;
          this.total = response.recordsTotal;
          this.listLoading = false
        })
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val - 1;
        this.getList();
      },
      // 过滤查询
      handleFilter() {
        this.listQuery.status = this.status;
        if (this.searchTimeValue) {
          this.listQuery.startTime = this.searchTimeValue[0];
          this.listQuery.endTime = this.searchTimeValue[1];
        } else {
          this.listQuery.startTime = '';
          this.listQuery.endTime = '';
        }

        this.listQuery.pageNum = 0;
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 0;
        this.listQuery.pageSize = val;
        this.getList();
      },
      // 改变状态
      changeStatus() {
        this.handleFilter();
      },
      // 获得状态
      getStatus(marketing) {
        let now = new Date();
        // 筹备中
        if (new Date(marketing.startTime) > now) {
          return "1";
        }
        // 众筹中
        if (new Date(marketing.startTime) < now && new Date(marketing.endTime) > now) {
          return "2";
        }
        if (new Date(marketing.endTime) < now) {
          if (marketing.crowdFunding.money <= marketing.crowdFunding.alreadyMoney) {
            // 众筹成功
            return "3";
          } else {
            // 众筹失败
            return "4";
          }
        }
      },
    }
  }
</script>
