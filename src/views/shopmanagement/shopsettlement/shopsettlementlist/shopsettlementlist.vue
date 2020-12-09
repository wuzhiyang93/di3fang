<template>
  <div class="app-container">
    <el-alert style="margin-bottom: 20px" title="公式： 到店自提完成后的订单总额（不包含代客下单订单）" type="warning" :closable="false"
              show-icon></el-alert>
    <div class="filter-container">
      <el-input placeholder="手机号码" size="medium" v-model="listQuery.mobile" style="width: 200px;" class="filter-item"/>
      <el-input placeholder="门店名称" size="medium" v-model="listQuery.storeName" style="width: 200px;"
                class="filter-item"/>
      <el-date-picker
        style="width: 355px"
        class="search-datepicker"
        size="medium"
        :clearable="false"
        v-model="searchTimeValue"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right">
      </el-date-picker>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
    </div>

    <el-table
      :data="tableData"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="手机号">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>
      <el-table-column label="门店名称">
        <template slot-scope="scope">{{ scope.row.storeName }}</template>
      </el-table-column>
      <el-table-column label="应付金额">
        <template slot-scope="scope">{{ scope.row.price }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <!--<router-link-->
          <!--:to="{path:'/shopManagement/shopSettlement/shopSettlementRecords',query:{startTime:new Date(searchTimeValue[0]),endTime:new Date(searchTimeValue[1]),storeId:scope.row.id}}">-->
          <el-button type="success" style="margin-bottom: 5px" size="mini" @click="lookInfo(scope.row.id)">查看明细
          </el-button>
          <!--</router-link>-->
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
    queryOutletBillings, //查询门店账单
  } from '@/api/shopsettlementlist';

  import {
    parseTime
  } from '@/utils/index';

  export default {
    data() {
      return {
        searchTimeValue: '',//时间
        listLoading: true, //加载中
        listQuery: {
          pageNum: 0, // 当前页码
          pageSize: 10, // 每页显示记录数
          startTime: '', // 开始时间
          endTime: '', // 结束时间
          storeName: '', // 店铺名称
          mobile: '', // 手机号
        },
        total: null, // 总记录数
        pickerOptions: {
          shortcuts: [{
            text: '最近三天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        tableData: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      lookInfo(id) {
        let startTime = parseTime(new Date(this.searchTimeValue[0]), "yyyy-MM-dd hh:mm:ss")
        let endTime = parseTime(new Date(this.searchTimeValue[1]), "yyyy-MM-dd hh:mm:ss")
        this.$router.push({
          path: '/shopManagement/shopSettlement/shopSettlementRecords',
          query: {startTime: startTime, endTime: endTime, storeId: id}
        })
      },

      getList() {
        this.listLoading = true;
        this.tableData = [];
        queryOutletBillings(this.listQuery).then((response) => {
          this.total = response.recordsTotal;
          let data = response.data;
          for (let i = 0; i < data.length; i++) {
            let iteam = {
              id: data[i].storeId,
              phone: data[i].mobile,
              storeName: data[i].storeName,
              price: data[i].money,
            }
            this.tableData.push(iteam);
          }
          this.listLoading = false
        })
      },
      // 过滤查询
      handleFilter() {
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
      // 改变当前页码
      handleCurrentChange(val) {
        this.listQuery.pageNum = val - 1;
        this.getList();
      },
      // 改变每页显示记录数
      handleSizeChange(val) {
        this.listQuery.pageNum = 0;
        this.listQuery.pageSize = val;
        this.getList();
      },
    }
  }
</script>
