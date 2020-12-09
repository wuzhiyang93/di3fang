<template>
  <div class="app-container">
    <el-alert
      title="公式：确认收货的订单（订单实付金额-订单佣金）+众筹订单确认收货（全款众筹订单实付金额-订单佣金）+众筹订单收货（抽奖+无回报支持 订单实付金额）-退款订单（全款）+订单关闭（预售定金）-退货退换的订单（实退金额）-分销订单提成（佣金）"
      type="warning" :closable="false" show-icon></el-alert>
    <div class="filter-container" style="margin-top: 20px">
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

    <div style="margin-bottom: 20px">
      <el-tag type="success">收入：{{income}}</el-tag>
      <el-divider direction="vertical"></el-divider>
      <el-tag type="danger" style="margin-left: 10px">支出：{{outcome}}</el-tag>
      <el-divider direction="vertical"></el-divider>
      <el-tag style="margin-left: 10px">实际收入：{{actincome}}</el-tag>
    </div>

    <el-table
      :data="list"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="订单号/退单号" min-width="140">
        <template slot-scope="scope">{{ scope.row.orderCode }}</template>
      </el-table-column>
      <el-table-column label="进/出" width="60">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type == '0'" type="success">进</el-tag>
          <el-tag v-if="scope.row.type == '1'" type="danger">出</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">{{ scope.row.recordType | typeFilter }}</template>
      </el-table-column>
      <el-table-column label="实付金额">
        <template slot-scope="scope">{{ scope.row.orderPrice | numFilter }}</template>
      </el-table-column>
      <el-table-column label="实退金额">
        <template slot-scope="scope">{{ scope.row.orderBackPrice | numFilter}}</template>
      </el-table-column>
      <el-table-column label="佣金">
        <template slot-scope="scope">{{ scope.row.orderCommission| numFilter }}</template>
      </el-table-column>
      <el-table-column label="实际金额">
        <template slot-scope="scope">{{ scope.row.orderActualPrice | numFilter}}</template>
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
    queryIncomeAndExpensesRecords,  //分页查询收入支出记录
    queryIncomeAndExpenses  //查询收入和支出
  } from '@/api/incomeexpenditurestatistics';

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
        searchTimeValue: '', //初始化时间
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
        isProcess: false, //接口是否正在处理中
        listLoading: true, //加载中
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          startTime: '',
          endTime: ''
        }, // 查询参数
        list: null, // 订单数据,
        total: null, // 数据总数,
        income: 0,
        outcome: 0,
        actincome: 0
      }
    },
    created() {
      this.getList()
    },
    filters: {
      numFilter(value) {
        // 截取当前数据到小数点后两位
        let realVal = Number(value).toFixed(2);
        if (realVal == 0.00) {
          return '';
        }
        return realVal;
      },
      typeFilter(value) {
        switch (value) {
          case '1':
            return '确认收货';
          case '2':
            return '退款订单';
          case '3':
            return '退货订单佣金';
          case '4':
            return '订单关闭';
          case '5':
            return '分销订单提成';
          case '6':
            return '退货订单';
          default:
            return '';
        }
      },
    },
    methods: {
      getList() {
        this.listLoading = true
        queryIncomeAndExpensesRecords(this.listQuery).then(response => {
          this.list = response.data;
          this.total = response.recordsTotal;
          this.listLoading = false
        });
      },
      getStatistics() {
        let searchonditions = {
          startTime: this.listQuery.startTime,
          endTime: this.listQuery.endTime
        }
        queryIncomeAndExpenses(searchonditions).then(response => {
          this.income = response.inCome.toFixed(2);
          this.outcome = response.expenses.toFixed(2);
          this.actincome = (response.inCome - (Math.abs(response.expenses))).toFixed(2);
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
        if (!this.searchTimeValue) {
          this.$message({
            message: '请选择开始时间和结束时间',
            type: 'error'
          })
          return;
        }
        this.listQuery.startTime = formatDate(this.searchTimeValue[0], 'yyyy-MM-dd');
        this.listQuery.endTime = formatDate(this.searchTimeValue[1], 'yyyy-MM-dd');
        this.getList();
        this.getStatistics();
      }
    }
  }
</script>
