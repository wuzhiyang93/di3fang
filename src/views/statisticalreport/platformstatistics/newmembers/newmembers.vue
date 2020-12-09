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

    <chart ref="chart1" :options="orgOptions" theme="macarons" :auto-resize="true" style="width: 100%"></chart>

    <el-table
      :data="list"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="时间">
        <template slot-scope="scope">{{ scope.row.newCustomerTime | subDateTime}}</template>
      </el-table-column>
      <el-table-column label="人数">
        <template slot-scope="scope">{{ scope.row.newCustomerNum }}</template>
      </el-table-column>
      <el-table-column label="操作">

        <template slot-scope="scope">
          <router-link
            :to="{path:'/statisticalreport/platformstatistics/newmemberslist',query:{newCustomerTime:scope.row.newCustomerTime}}">
            <el-button type="success" size="mini">查看</el-button>
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

  import {
    queryNewCustomerStatisticsWithPage,  //分页查询新增会员统计（按日期分组）
    queryNewCustomerStatistics    //查询新增会员统计（按日期分组）
  } from '@/api/newmembers';

  import {
    formatDate  //时间格式化
  } from '@/utils/index';


  import {
    lastMonth,
    thisMonth,
    thisWeek,
    lastWeek,
    intervalDate  //计算时间
  } from '@/utils/datecalculate';

  export default {
    data() {
      return {
        orgOptions: {},
        searchTimeValue: [new Date(new Date().getTime() - 3600 * 1000 * 24 * 6), new Date()], //初始化时间
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
        listLoading: true, //加载中
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          startTime: '',
          endTime: ''
        }, // 查询参数
        list: null, // 页面数据,
        total: null, // 数据总数,
        tempDateArray: [], //临时日期数组
        numArray: [], //统计表纵轴数据
        dataArray: [] //统计表横轴数据
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        thisMonth();
        this.listLoading = true
        this.listQuery.startTime = formatDate(this.searchTimeValue[0], 'yyyy-MM-dd');
        this.listQuery.endTime = formatDate(this.searchTimeValue[1], 'yyyy-MM-dd');
        queryNewCustomerStatisticsWithPage(this.listQuery).then(response => {
          this.list = response.data;
          this.total = response.recordsTotal;
        });
        let query = {
          startTime: this.listQuery.startTime,
          endTime: this.listQuery.endTime
        };
        queryNewCustomerStatistics(query).then(response => {
          let has = true;
          this.tempDateArray = intervalDate(this.searchTimeValue[0], this.searchTimeValue[1]);
          for (let i = 0; i < this.tempDateArray.length; i++) {
            this.dataArray.push(this.tempDateArray[i]);
            has = true;
            for (let k = 0; k < response.length; k++) {
              if (this.tempDateArray[i] == formatDate(new Date(response[k].newCustomerTime), 'yyyy-MM-dd')) {
                this.numArray.push(response[k].newCustomerNum);
                has = false;
              }
            }
            if (has) {
              this.numArray.push(0);
            }
          }
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
        this.dataArray.length = 0;
        this.numArray.length = 0;
        this.getList();
      }
    },
    filters: {
      subDateTime(value) {
        return value.split(' ')[0];
      },
    },

    mounted() {
      this.orgOptions = {
        tooltip: {
          trigger: 'axis',
          position: pt => {
            return [pt[0], '10%']
          }
        },
        title: {text: '新增会员统计', textAlign: 'center', left: '50%'},
        xAxis: {
          type: 'category',
          data: this.dataArray
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.numArray,
          type: 'line',
          smooth: true
        }]
      }
    }
  }
</script>
