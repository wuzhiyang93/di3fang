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
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right">
      </el-date-picker>
      <el-select class="filter-item" v-model="listQuery.status" size="medium" style="width: 150px"
                 placeholder="请选择结算状态">
        <el-option label="不过滤" value="-1"></el-option>
        <el-option label="已结算" value="1"></el-option>
        <el-option label="未结算" value="0"></el-option>
      </el-select>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
      <router-link to="/shopmanagement/shopsettlement/shopsettlementlist">
        <el-button class="filter-item" size="medium" style="margin-left: 5px;" icon="el-icon-back">返回门店结算列表</el-button>
      </router-link>
      <el-button class="filter-item" size="medium" style="margin-left: 5px;" type="primary" icon="el-icon-coin"
                 @click="batch">批量结算
      </el-button>
    </div>

    <el-table
      :data="tableData"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="40"/>
      <el-table-column label="订单号/退单号" min-width="160">
        <template slot-scope="scope">{{ scope.row.orderNum }}</template>
      </el-table-column>
      <el-table-column label="进出" min-width="50">
        <template slot-scope="scope">
          <span v-if="scope.row.entrance == '0'">进</span>
          <span v-if="scope.row.entrance == '1'">出</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" min-width="95">
        <template slot-scope="scope">
          <span v-if="scope.row.type == '1'">提货完成</span>
          <span v-if="scope.row.type == '2'">代客下单完成</span>
        </template>
      </el-table-column>
      <el-table-column label="实付金额">
        <template slot-scope="scope">{{ scope.row.sfPrice }}</template>
      </el-table-column>
      <el-table-column label="状态" min-width="82">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.state == '0'" type="info">未结算</el-tag>
          <el-tag v-if="scope.row.state == '1'" type="success">已结算</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="115">
        <template slot-scope="scope">
          <el-button v-if="scope.row.state == '0'" type="primary" size="mini" @click="single(scope.row.id)">设置已结算
          </el-button>
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
    queryOutletBillingRecords, //查询门店账单对账记录
    updateStoreBillingRecordStatus, //设置门店账单状态为已结算
  } from '@/api/shopsettlementrecords';

  import {
    parseTime
  } from '@/utils/index';

  export default {
    data() {
      return {
        isProcess: false, //接口是否正在处理中
        searchTimeValue: [new Date(this.$route.query.startTime), new Date(this.$route.query.endTime)],//时间数组
        listLoading: true, //加载中
        listQuery: {
          pageNum: 0, // 当前页码
          pageSize: 10, // 每页显示记录数
          startTime: '', // 开始时间
          endTime: '', // 结束时间
          storeId: this.$route.query.storeId, //店铺 id
          status: '-1',//状态
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
        tableData: [], //列表数据
        multipleSelection: [], //选中的数组集合
        ids: [] //结算数组
      }
    },
    created() {
      this.listQuery.startTime = parseTime(new Date(this.$route.query.startTime), "yyyy-MM-dd hh:mm:ss");
      this.listQuery.endTime = parseTime(new Date(this.$route.query.endTime), "yyyy-MM-dd hh:mm:ss");
      this.listQuery.pageNum = 0;
      this.getList();
    },
    methods: {
      //初始化列表数据
      getList() {
        this.ids = [];
        this.listLoading = true;
        this.tableData = [];
        queryOutletBillingRecords(this.listQuery).then((response) => {
          this.total = response.recordsTotal;
          let data = response.data;
          for (let i = 0; i < data.length; i++) {
            let iteam = {
              id: data[i].id,
              orderNum: data[i].orderCode,
              entrance: data[i].type,
              type: data[i].recordType,
              sfPrice: data[i].orderPrice,
              state: data[i].status,
            }
            this.tableData.push(iteam);
          }
          this.listLoading = false
        })
      },
      handleSelectionChange(val) {
        this.ids = [];
        this.multipleSelection = val;
        val.forEach(val => {
          this.ids.push(val.id);
        })
      },
      //更改为结算状态
      updateStoreBillingRecordStatus(ids) {
        this.$confirm('确定要设置结算状态为已结算吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.isProcess) {
            return;
          }
          this.isProcess = true;
          updateStoreBillingRecordStatus(ids).then((response) => {
            this.isProcess = false;
            this.handleFilter();
            if (response > 0) {
              this.$message({
                type: 'success',
                message: '结算成功!'
              })
            }
          })
        })
      },
      //结算单条数据
      single(id) {
        this.ids = [];
        this.ids.push(id);
        this.updateStoreBillingRecordStatus(this.ids);
      },
      //批量结算
      batch() {
        if (this.ids.length == 0) {
          this.$message({
            type: 'error',
            message: '至少选择一条记录!'
          });
          return;
        }
        this.updateStoreBillingRecordStatus(this.ids);
      },
      // 过滤查询
      handleFilter() {
        if (this.searchTimeValue) {
          this.listQuery.startTime = parseTime(new Date(this.searchTimeValue[0]), "yyyy-MM-dd hh:mm:ss");
          this.listQuery.endTime = parseTime(new Date(this.searchTimeValue[1]), "yyyy-MM-dd hh:mm:ss");
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
