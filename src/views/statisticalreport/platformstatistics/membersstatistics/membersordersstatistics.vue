<template>
  <div class="app-container">
    <div class="el-tabs el-tabs--card el-tabs--top">
      <div class="el-tabs__header is-top">
        <div class="el-tabs__nav-wrap is-top">
          <div class="el-tabs__nav-scroll">
            <div class="el-tabs__nav is-top">
              <div style="display: block; float: left" class="el-tabs__item is-top is-active">会员下单量</div>
              <router-link style="display: block; float: left" class="el-tabs__item is-top"
                           :to="{path:'/statisticalreport/platformstatistics/membersexpenditurestatistics'}">
                会员消费量
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="filter-container">
      <el-date-picker
        style="width: 355px"
        class="search-datepicker"
        size="medium"
        :clearable="false"
        v-model="searchTimeValue"
        type="datetimerange"
        :picker-options="pickerOptions"
        format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right">
      </el-date-picker>
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
      <el-table-column label="会员名">
        <template slot-scope="scope">{{ scope.row.customerName }}</template>
      </el-table-column>
      <el-table-column label="下单量">
        <template slot-scope="scope">{{ scope.row.orderAmount }}</template>
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
    queryCustomerOrderAmount  //分页查询新增会员统计（按日期分组）
  } from '@/api/membersordersstatistics';

  import {
    formatDate  //时间格式化
  } from '@/utils/index';

  import {
    lastMonth,
    thisMonth,
    thisWeek,
    lastWeek,
  } from '@/utils/datecalculate';

  export default {
    data() {
      return {
        searchTimeValue: [new Date(new Date().getTime() - 3600 * 1000 * 24 * 6), new Date()], //初始化时间
        listLoading: true, //数据加载中
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          startTime: '',
          endTime: ''
        }, // 查询参数
        list: null, // 页面数据,
        total: null, // 数据总数,
        pickerOptions: {
          shortcuts: [{
            text: '本周',
            onClick(picker) {
              let dateArray = thisWeek();
              const end = dateArray[1];
              const start = dateArray[0];
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '上周',
            onClick(picker) {
              let dateArray = lastWeek();
              const end = dateArray[1];
              const start = dateArray[0];
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '本月',
            onClick(picker) {
              let dateArray = thisMonth();
              const end = dateArray[1];
              const start = dateArray[0];
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '上月',
            onClick(picker) {
              let dateArray = lastMonth();
              const end = dateArray[1];
              const start = dateArray[0];
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true;
        this.listQuery.startTime = formatDate(this.searchTimeValue[0], 'yyyy-MM-dd');
        this.listQuery.endTime = formatDate(this.searchTimeValue[1], 'yyyy-MM-dd');
        queryCustomerOrderAmount(this.listQuery).then(response => {
          this.list = response.data;
          this.total = response.recordsTotal;
          this.listLoading = false
        });
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
      handleFilter() {
        this.getList();
      }
    }
  }
</script>
