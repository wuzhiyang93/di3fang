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
        <template slot-scope="scope">{{ scope.row.newStoreInfoTime | subDateTime }}</template>
      </el-table-column>
      <el-table-column label="店铺数量">
        <template slot-scope="scope">{{ scope.row.newStoreInfoNum }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link
            :to="{path:'/statisticalReport/platformStatistics/newStoresList',query:{createTime:scope.row.newStoreInfoTime}}">
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
    queryNewStoreInfoStatisticsWithPage,  //分页查询新增店铺统计
    queryNewStoreInfoStatistics //查询新增店铺统计
  } from '@/api/newstores';


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
        listLoading: true,
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
        dataArray: [], //统计表横轴数据
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

      //获取页面数据
      getList() {
        this.listLoading = true;

        //格式化查询参数  起始时间
        this.listQuery.startTime = formatDate(this.searchTimeValue[0], 'yyyy-MM-dd');
        this.listQuery.endTime = formatDate(this.searchTimeValue[1], 'yyyy-MM-dd');

        //查询页面数据
        queryNewStoreInfoStatisticsWithPage(this.listQuery).then(response => {
          this.list = response.data;
          this.total = response.recordsTotal;
          this.listLoading = false
        });

        //封装统计信息查询参数
        let query = {
          startTime: this.listQuery.startTime,
          endTime: this.listQuery.endTime
        };

        //查询统计信息
        queryNewStoreInfoStatistics(query).then(response => {

          //重复添加元素标记
          let has = true;
          this.tempDateArray = intervalDate(this.searchTimeValue[0], this.searchTimeValue[1]);

          //封装图表 横纵轴数据
          for (let i = 0; i < this.tempDateArray.length; i++) {
            this.dataArray.push(this.tempDateArray[i]);
            has = true;
            for (let k = 0; k < response.length; k++) {
              if (this.tempDateArray[i] == formatDate(new Date(response[k].newStoreInfoTime), 'yyyy-MM-dd')) {
                this.numArray.push(response[k].newStoreInfoNum);
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
        title: {text: '新增店铺统计', textAlign: 'center', left: '50%'},
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
