<template>
  <div class="app-container">
    <div class="filter-container">
      <router-link to="/storemanager/storecrowdfunding/storecrowdfunding">
        <el-button class="filter-item" size="medium" icon="el-icon-back">返回众筹项目列表</el-button>
      </router-link>
    </div>

    <el-table
      :data="schedules"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="开始时间">
        <template slot-scope="scope">{{ scope.row.time.split(' ')[0] }}</template>
      </el-table-column>
      <el-table-column label="进度描述">
        <template slot-scope="scope">{{ scope.row.desc }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

  import {
    queryStoreCrowdfundingProgressByMarketingId,
  } from '@/api/storecrowdfundingschedule';

  export default {
    data() {
      return {
        listLoading: true,
        schedules: [], // 进度
      }
    },
    created() {
      this.querySchedule();
    },
    methods: {
      // 查询众筹进度
      querySchedule() {
        this.listLoading = true;
        queryStoreCrowdfundingProgressByMarketingId(this.$route.query.id).then(res => {
          this.schedules = res;
          this.listLoading = false;
        })
      },
    }
  }
</script>
