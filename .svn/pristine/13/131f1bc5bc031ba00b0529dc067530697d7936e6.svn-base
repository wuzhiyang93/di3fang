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
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right">
      </el-date-picker>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
    </div>


    <chart :visible.sync="showStatistics" ref="chart1" :options="orgOptions" theme="macarons" :auto-resize="true"
           style="width: 100%"></chart>

    <el-table
      :data="list"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="地区">
        <template slot-scope="scope">{{ scope.row.provinceName }}</template>
      </el-table-column>
      <el-table-column label="店铺数量">
        <template slot-scope="scope">{{ scope.row.storeInfoNum }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link
            :to="{path:'/statisticalReport/platformStatistics/storesAreaList',query:{provinceId:scope.row.provinceId}}">
            <el-button type="success" size="mini">查看</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    queryStoreInfoAreaStatistics  //查询店铺地区统计
  } from '@/api/storesarea';


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
        orgOptions: {},
        searchTimeValue: [new Date(new Date().getTime() - 3600 * 1000 * 24 * 6), new Date()], //初始化时间
        listLoading: true, //数据加载中
        listQuery: {
          startTime: '',
          endTime: ''
        }, // 查询参数
        provincesArray: [], //统计表横轴数组
        storeCountArray: [],//统计表纵轴数组
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
        queryStoreInfoAreaStatistics(this.listQuery).then(response => {
          this.list = response;
          for (let i = 0; i < this.list.length; i++) {
              this.provincesArray.push(this.list[i].provinceName);
              this.storeCountArray.push(this.list[i].storeInfoNum);
          }
          this.listLoading = false
        });
      },
      handleFilter() {
        this.provincesArray.splice(0,this.provincesArray.length);
        this.storeCountArray.splice(0,this.storeCountArray.length);
        this.getList();
      }
    },
    mounted() {
      this.orgOptions = {
        tooltip: {
          trigger: 'axis',
          position: pt => {
            return [pt[0], '10%']
          }
        },
        title: {text: '店铺地区统计', textAlign: 'center', left: '50%'},
        xAxis: {
          type: 'category',
          data: this.provincesArray
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.storeCountArray,
          type: 'bar',
          smooth: true
        }]
      }
    }
  }
</script>
