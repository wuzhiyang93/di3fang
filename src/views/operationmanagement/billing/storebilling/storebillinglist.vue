<template>
  <div class="app-container">
    <el-alert style="margin-bottom: 20px"
              title="公式： 确认收货的订单（订单实付金额-订单佣金）+ 众筹订单确认收货（全款众筹订单实付金额-订单佣金）+ 众筹订单收货（抽奖+无回报支持 订单实付金额）+ 退款订单（全款）+ 订单关闭（预售定金-佣金）+ 退货退换的订单（佣金）- 分销提成订单"
              type="warning" :closable="false" show-icon></el-alert>
    <div class="filter-container">
      <el-input placeholder="手机号码" v-model="listQuery.mobile" size="medium" style="width: 200px;" class="filter-item"/>
      <el-input placeholder="店铺名称" v-model="listQuery.storeName" size="medium" style="width: 200px;"
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
        value-format="yyyy-MM-dd HH:mm:ss"
        align="right">
      </el-date-picker>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
    </div>

    <el-table
      :data="storeBillingList"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="手机号">
        <template slot-scope="scope">{{ scope.row.mobile }}</template>
      </el-table-column>
      <el-table-column label="店铺名称">
        <template slot-scope="scope">{{ scope.row.storeName }}</template>
      </el-table-column>
      <el-table-column label="应付金额">
        <template slot-scope="scope">{{ scope.row.money.toFixed(2) }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <router-link
            :to="{path:'/operationmanagement/billing/storebillingrecord',query:{storeId:scope.row.storeId,startTime:listQuery.startTime,endTime:listQuery.endTime}}">
            <el-button type="success" style="margin-bottom: 5px" size="mini">查看明细</el-button>
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
  import {queryStoreBillingList} from '@/api/storebilling';

  export default {
    data() {
      return {
        searchTimeValue: null, // 查询条件时间范围，数组格式，数组第一项为开始时间，第二项结束时间
        listLoading: true, // 列表加载标识
        storeBillingList: null, // 列表数据集合
        total: null, // 总记录数
        listQuery: {
          pageNum: 0, // 当前页码
          pageSize: 10, // 每页显示记录数
          mobile: '', // 手机号码
          storeName: '', // 店铺名称
          startTime: '', // 开始时间
          endTime: '', // 结束时间
        },
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
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 查询店铺账单列表
      getList() {
        this.listLoading = true;
        if (this.searchTimeValue) {
          this.listQuery.startTime = this.searchTimeValue[0];
          this.listQuery.endTime = this.searchTimeValue[1];
        } else {
          this.listQuery.startTime = '';
          this.listQuery.endTime = '';
        }
        queryStoreBillingList(this.listQuery).then((response) => {
          this.storeBillingList = response.data;
          this.total = response.recordsTotal;
          this.listLoading = false;
        })
      },
      // 过滤查询
      handleFilter() {
        if (!this.searchTimeValue) {
          this.$message({
            message: '请选择开始时间和结束时间',
            type: 'error'
          })
          return;
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
