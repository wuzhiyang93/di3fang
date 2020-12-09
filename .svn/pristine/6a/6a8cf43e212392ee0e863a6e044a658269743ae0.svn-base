<template>
  <div class="app-container">
    <div class="el-tabs el-tabs--card el-tabs--top">
      <div class="el-tabs__header is-top">
        <div class="el-tabs__nav-wrap is-top">
          <div class="el-tabs__nav-scroll">
            <div class="el-tabs__nav is-top">
              <router-link style="display: block; float: left" class="el-tabs__item is-top"
                           to="/statisticalreport/platformstatistics/goodsordersstatistics">单品销售量列表
              </router-link>
              <div style="display: block; float: left" class="el-tabs__item is-top is-active">单品销售额列表</div>
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
      <el-table-column label="单品名称" min-width="180">
        <template slot-scope="scope">{{ scope.row.skuName }}</template>
      </el-table-column>
      <el-table-column label="店铺名称">
        <template slot-scope="scope">{{ scope.row.storeName }}</template>
      </el-table-column>
      <el-table-column label="销售额">
        <template slot-scope="scope">{{ scope.row.salesAmount | numFilter}}</template>
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
    querySkuSaleAmout  //分页查询单品销售额
  } from '@/api/goodsexpenditurestatistics';



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
    filters: {
      numFilter(value) {
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
        querySkuSaleAmout(this.listQuery).then(response => {
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
