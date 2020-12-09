<template>
  <div class="app-container">
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
        value-format="yyyy-MM-dd HH:mm:ss"
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
      <el-table-column label="促销名称">
        <template slot-scope="scope">{{ scope.row.marketingName }}</template>
      </el-table-column>
      <el-table-column label="订单量">
        <template slot-scope="scope">{{ scope.row.orderVolume }}</template>
      </el-table-column>
      <el-table-column label="订单额">
        <template slot-scope="scope">{{ scope.row.orderAmount | numFilter | toFixed}}</template>
      </el-table-column>
      <el-table-column label="单品数量">
        <template slot-scope="scope">{{ scope.row.skuSalesVolume }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

  import {
    queryMarketingStatistics //查询促销统计
  } from '@/api/promotionstatistics';

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
        isProcess: false, //接口是否正在处理中
        listLoading: true, //加载中
        listQuery: {
          startTime: '',
          endTime: ''
        }, // 查询参数
        list: null, // 数据结果集,
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
    filters: {
      numFilter(value) {
        if (value == null) {
          return 0;
        } else {
          return value;
        }
      },
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
        this.listLoading = true;
        this.listQuery.startTime = formatDate(this.searchTimeValue[0], 'yyyy-MM-dd');
        this.listQuery.endTime = formatDate(this.searchTimeValue[1], 'yyyy-MM-dd');
        queryMarketingStatistics(this.listQuery).then(response => {
          this.list = [
            {
              marketingName: response.crowdfundingFullStatistics.marketingName,
              orderVolume: response.crowdfundingFullStatistics.orderVolume,
              orderAmount: response.crowdfundingFullStatistics.orderAmount,
              skuSalesVolume: response.crowdfundingFullStatistics.skuSalesVolume,
            },
            {
              marketingName: response.crowdfundingNoReturnSupportStatistic.marketingName,
              orderVolume: response.crowdfundingNoReturnSupportStatistic.orderVolume,
              orderAmount: response.crowdfundingNoReturnSupportStatistic.orderAmount,
              skuSalesVolume: response.crowdfundingNoReturnSupportStatistic.skuSalesVolume,
            },
            {
              marketingName: response.crowdfundingOneLotteryStatistics.marketingName,
              orderVolume: response.crowdfundingOneLotteryStatistics.orderVolume,
              orderAmount: response.crowdfundingOneLotteryStatistics.orderAmount,
              skuSalesVolume: response.crowdfundingOneLotteryStatistics.skuSalesVolume,
            },
            {
              marketingName: response.depositPreSaleStatistics.marketingName,
              orderVolume: response.depositPreSaleStatistics.orderVolume,
              orderAmount: response.depositPreSaleStatistics.orderAmount,
              skuSalesVolume: response.depositPreSaleStatistics.skuSalesVolume,
            },
            {
              marketingName: response.fullPreSaleStatistics.marketingName,
              orderVolume: response.fullPreSaleStatistics.orderVolume,
              orderAmount: response.fullPreSaleStatistics.orderAmount,
              skuSalesVolume: response.fullPreSaleStatistics.skuSalesVolume,
            },
            {
              marketingName: response.groupStatistics.marketingName,
              orderVolume: response.groupStatistics.orderVolume,
              orderAmount: response.groupStatistics.orderAmount,
              skuSalesVolume: response.groupStatistics.skuSalesVolume,
            }
          ];
          this.listLoading = false
        });
      },
      // 过滤查询
      handleFilter() {
        this.getList();
      },

    }
  }
</script>
