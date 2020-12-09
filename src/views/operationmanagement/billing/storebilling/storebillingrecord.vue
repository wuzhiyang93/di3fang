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
        value-format="yyyy-MM-dd HH:mm:ss"
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
      <router-link to="/operationmanagement/billing/storebilling">
        <el-button class="filter-item" size="medium" style="margin-left: 5px;" icon="el-icon-back">返回商城结算列表</el-button>
      </router-link>
      <el-button class="filter-item" size="medium" style="margin-left: 5px;" type="primary" icon="el-icon-coin"
                 @click="toBatchUpdateStoreBillingRecordStatus">批量结算
      </el-button>
    </div>

    <el-table
      :data="storeBillingRecordList"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="40"/>
      <el-table-column label="订单号/退单号" min-width="160">
        <template slot-scope="scope">{{ scope.row.orderCode }}</template>
      </el-table-column>
      <el-table-column label="进出" min-width="50">
        <template slot-scope="scope">
          <span v-if="scope.row.type == '0'">进</span>
          <span v-if="scope.row.type == '1'">出</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" min-width="95">
        <template slot-scope="scope">
          <span>{{ recordType[scope.row.recordType ]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="实付金额">
        <template slot-scope="scope">{{ scope.row.orderPrice?scope.row.orderPrice.toFixed(2):'' }}</template>
      </el-table-column>
      <el-table-column label="实退金额">
        <template slot-scope="scope">{{ scope.row.orderBackPrice?scope.row.orderBackPrice.toFixed(2):'' }}</template>
      </el-table-column>
      <el-table-column label="订单佣金">
        <template slot-scope="scope">{{ scope.row.orderCommission?scope.row.orderCommission.toFixed(2):'' }}</template>
      </el-table-column>
      <el-table-column label="实际金额">
        <template slot-scope="scope">{{ scope.row.orderActualPrice?scope.row.orderActualPrice.toFixed(2):'' }}
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="82">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == '0'" type="info">未结算</el-tag>
          <el-tag v-if="scope.row.status == '1'" type="success">已结算</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="115">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == '0'" type="primary" size="mini"
                     @click="toUpdateStoreBillingRecordStatus(scope.row.id)">设置已结算
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
  import {queryStoreBillingRecords, updateStoreBillingRecordStatus} from '@/api/storebilling';

  export default {
    data() {
      return {
        isProcess: false, // 接口是否处理中
        searchTimeValue: [], // 查询条件时间范围，数组格式，数组第一项为开始时间，第二项结束时间
        listLoading: true, // 列表加载标识
        storeBillingRecordList: null, // 列表数据集合
        total: null, // 总记录数
        listQuery: {
          pageNum: 0, // 当前页码
          pageSize: 10, // 每页显示记录数
          storeId: '', // 店铺id
          startTime: '', // 开始时间
          endTime: '', // 结束时间
          status: '', // 店铺对账记录状态 -1 不过滤 0 未结算 1 已结算
        },
        updateIds: [], // 批量设置已结算选中id数组
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
        recordType: {'1': '确认收货', '2': '退款订单', '3': '退货订单佣金', '4': '订单关闭', '5': '分销订单提成', '6': '退货订单'},
      }
    },
    created() {
      this.listQuery.storeId = this.$route.query.storeId;
      this.searchTimeValue[0] = this.$route.query.startTime;
      this.searchTimeValue[1] = this.$route.query.endTime;
      this.listQuery.status = '-1';
      this.getList()
    },
    methods: {
      // 查询店铺账单记录列表
      getList() {
        this.listLoading = true;
        if (this.searchTimeValue) {
          this.listQuery.startTime = this.searchTimeValue[0];
          this.listQuery.endTime = this.searchTimeValue[1];
        } else {
          this.listQuery.startTime = '';
          this.listQuery.endTime = '';
        }
        queryStoreBillingRecords(this.listQuery).then((response) => {
          this.storeBillingRecordList = response.data;
          this.total = response.recordsTotal;
          this.listLoading = false;
        })
      },
      // 过滤查询
      handleFilter() {
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
      // 设置已结算二次确认
      toUpdateStoreBillingRecordStatus(id) {
        this.$confirm('确定要设置结算状态为已结算吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.updateStoreBillingRecordStatus(id);
        })
      },
      // 多选选中对账记录
      handleSelectionChange(val) {
        if (val && val.length > 0) {
          this.updateIds = val.map(row => row.id);
        } else {
          this.updateIds = [];
        }
      },
      // 批量设置已结算二次确认
      toBatchUpdateStoreBillingRecordStatus() {
        if (this.updateIds && this.updateIds.length > 0) {
          this.$confirm('确定要设置结算状态为已结算吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.updateStoreBillingRecordStatus(this.updateIds);
          })
        } else {
          this.$message({
            message: '请至少选择一条对账记录',
            type: 'warning'
          })
        }
      },
      // 设置已结算
      updateStoreBillingRecordStatus(ids) {
        if (!this.isProcess) {
          this.isProcess = true;
          updateStoreBillingRecordStatus({"ids": ids.toString()}).then(res => {
            this.isProcess = false;
            if (res >= 1) {
              this.getList();
              this.updateIds = [];
              this.$message({
                type: 'success',
                message: '结算成功!'
              });
            } else {
              this.$message({
                message: '结算失败!',
                type: 'error'
              })
            }
          });
        }
      },
    }
  }
</script>
