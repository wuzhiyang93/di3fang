<template>
  <div class="app-container">
    <div>
      <el-button icon="el-icon-back" @click="goBack">返回众筹列表</el-button>
    </div>
    <el-radio-group @change="changeStatus()" v-model="orderStatus" style="margin: 20px 0">
      <el-radio-button :label="0">全部</el-radio-button>
      <el-radio-button :label="1">待付款</el-radio-button>
      <el-radio-button :label="2">待发货</el-radio-button>
      <el-radio-button :label="3">待收货</el-radio-button>
      <el-radio-button :label="4">已完成</el-radio-button>
      <el-radio-button :label="5">已关闭</el-radio-button>
    </el-radio-group>
    <div class="filter-container">
      <div class="filterBox">
        <p>订单号</p>
        <el-input placeholder="订单号" v-model="listQuery.orderCode" maxlength="32" size="medium" style="width: 150px;"
                  class="filter-item"/>
      </div>
      <div class="filterBox">
        <p>用户名</p>
        <el-input placeholder="用户名" v-model="listQuery.customerName" maxlength="32" size="medium" style="width: 150px;"
                  class="filter-item"/>
      </div>
      <div class="filterBox">
        <p>订单类型</p>
        <el-select class="filter-item" v-model="listQuery.orderType" size="medium" style="width: 150px"
                   placeholder="请选择订单类型">
          <el-option label="全部" value=""></el-option>
          <el-option label="全款支持" value="4"></el-option>
          <el-option label="一元支持" value="5"></el-option>
          <el-option label="无回报支持" value="6"></el-option>
        </el-select>
      </div>
      <el-date-picker
        style="width: 355px"
        class="search-datepicker"
        size="medium"
        :clearable="false"
        v-model="searchTimeValue"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="yyyy-MM-dd HH:mm:ss"
        value-format="yyyy-MM-dd HH:mm:ss"
        align="right">
      </el-date-picker>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
      <el-dropdown class="filter-item" style="margin-left: 5px;">
        <el-button size="medium" type="primary">导出订单<i class="el-icon-arrow-down el-icon--right"></i></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="exportAll()">导出所有</el-dropdown-item>
          <el-dropdown-item @click.native="exportSelected()">导出选中</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-table
      :data="list"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="40"/>
      <el-table-column label="订单号" min-width="162">
        <template slot-scope="scope">{{ scope.row.orderCode }}</template>
      </el-table-column>
      <el-table-column label="买家" min-width="110">
        <template slot-scope="scope">{{ scope.row.customerName }}</template>
      </el-table-column>
      <el-table-column label="下单时间" min-width="160">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="订单类型" width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.orderType == '4'">全款支持</span>
          <span v-if="scope.row.orderType == '5'">一元支持</span>
          <span v-if="scope.row.orderType == '6'">无回报支持</span>
        </template>
      </el-table-column>
      <el-table-column label="订单总额" min-width="80">
        <template slot-scope="scope">{{ scope.row.price.toFixed(2) }}</template>
      </el-table-column>
      <el-table-column label="订单状态" width="82">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == '1'" type="warning">待付款</el-tag>
          <el-tag v-if="scope.row.status == '2' && scope.row.orderType != '5'" type="warning">待发货</el-tag>
          <el-tag v-if="scope.row.status == '2'  && scope.row.lotteryStatus == '0' && scope.row.orderType == '5'"
                  type="warning">待抽奖
          </el-tag>
          <el-tag v-if="scope.row.status == '3'" type="warning">待收货</el-tag>
          <el-tag v-if="scope.row.status == '4'" type="success">已完成</el-tag>
          <el-tag v-if="scope.row.status == '5'" type="info">已关闭</el-tag>
          <el-tag v-if="scope.row.status == '6'" type="info">已关闭</el-tag>
          <el-tag v-if="scope.row.status == '7'" type="info">已关闭</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="支付方式" width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.payType == '0'">在线付款</span>
          <span v-if="scope.row.payType == '1'">货到付款</span>
        </template>
      </el-table-column>
      <el-table-column label="来源" width="50">
        <template slot-scope="scope">
          <span v-if="scope.row.source == '1'">PC</span>
          <span v-if="scope.row.source == '2'">H5</span>
          <span v-if="scope.row.source == '3'">APP</span>
          <span v-if="scope.row.source == '4'">小程序</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="left" min-width="185">
        <template slot-scope="scope">
          <router-link
            :to="{path:'/storemanager/storecrowdfunding/storecrowdfundingorderdetail',query:{id:scope.row.id}}">
            <el-button type="success" style="margin: 0 10px 5px 0" size="mini">详情</el-button>
          </router-link>
          <el-button v-if="scope.row.status == '1'" type="primary" style="margin: 0 10px 5px 0" size="mini"
                     @click="toConfirmOrder(scope.row.id,scope.row.storeId)">确认付款
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="确认付款" :visible.sync="confirmShow">
      <el-alert title="注意！ 确认付款后订单状态将修改为待发货，你确定要修改吗？" style="margin-bottom: 20px" type="warning" :closable="false"
                show-icon></el-alert>
      <el-form :model="confirmReason" :rules="confirmRules" ref="confirmForm" label-position="right"
               label-width="100px">
        <el-form-item prop="reason">
          <span slot="label">请填写原因</span>
          <el-input maxlength="200" v-model="confirmReason.reason"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="confirmShow = false">取消</el-button>
        <el-button type="primary" @click="confrimOrder()">确定</el-button>
      </div>
    </el-dialog>

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
    orderList,
    confirmOrder,
    exportAllOrder,
    exportCheckedOrder
  } from '@/api/storecrowdfundingorders';

  export default {
    data() {
      return {
        isProcess: false,// 接口是否处理中
        confirmRules: {
          reason: [
            {
              required: true,
              message: '请填写原因!',
              trigger: 'blur'
            }
          ]
        },  // 验证规则
        confirmReason: {reason: ''},// 确认付款的原因
        storeId: 0,// 店铺id
        confirmOrderId: 0,// 确认付款时候的订单id
        confirmShow: false, // 确认付款二次确认标记
        orderStatus: '0',// 搜索条件订单状态
        listLoading: true, // 加载中
        list: null, // 订单数据
        total: null, // 数据总数,
        searchTimeValue: null,// 搜索时间
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          marketingId: this.$route.query.id,
          status: '',
          orderCode: '',
          customerName: '',
          orderType: '',
          startTime: '',
          endTime: ''
        }, // 查询参数
        selectedIds: []// 选中的订单id
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        orderList(this.listQuery).then(response => {
          this.list = response.data;
          this.total = response.recordsTotal;
          this.listLoading = false
        });
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val - 1;
        this.getList();
      },
      handleSelectionChange(val) {
        if (val && val.length > 0) {
          this.selectedIds = val.map(row => row.id);
        } else {
          this.selectedIds = [];
        }
      },
      // 过滤查询
      handleFilter() {
        this.listQuery.pageNum = 0;
        if (this.searchTimeValue) {
          this.listQuery.startTime = this.searchTimeValue[0];
          this.listQuery.endTime = this.searchTimeValue[1];
        } else {
          this.listQuery.startTime = '';
          this.listQuery.endTime = '';
        }

        this.listQuery.status = this.orderStatus;

        if (this.listQuery.status == 0) {
          this.listQuery.status = '';
        }

        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 0;
        this.listQuery.pageSize = val;
        this.getList();
      },
      // 改变订单状态
      changeStatus() {
        this.handleFilter();
      },
      // 确认付款二次确认
      toConfirmOrder(id, storeId) {
        this.confirmShow = true;
        this.confirmOrderId = id;
        this.storeId = storeId;
        if (this.$refs["confirmForm"]) {
          this.$refs["confirmForm"].resetFields();
        }
        this.confirmReason = {reason: ''};
      },
      // 确认付款
      confrimOrder() {
        this.$refs['confirmForm'].validate(valid => {
          if (valid && !this.isProcess) {
            this.isProcess = true;
            confirmOrder(this.confirmOrderId, this.storeId, this.confirmReason).then(res => {
              this.isProcess = false;
              if (res > 0) {
                this.$message({
                  message: '确认付款成功',
                  type: 'success'
                });
              } else {
                this.$message({
                  message: '确认付款失败',
                  type: 'error'
                });
              }
              this.confirmShow = false;
              this.confirmOrderId = 0;
              this.storeId = 0;
              this.handleFilter();
            })
          }
        })
      },
      // 导出所有订单
      exportAll() {
        let status = this.orderStatus == 0 ? '' : this.orderStatus;
        exportAllOrder(status, this.$route.query.id).then(res => {
          let blob = new Blob([res], {type: "application/vnd.ms-excel"});
          let objectUrl = URL.createObjectURL(blob);
          window.location.href = objectUrl;
        });
      },
      // 导出选中的订单
      exportSelected() {
        if (this.selectedIds && this.selectedIds.length > 0) {
          let status = this.orderStatus == 0 ? '' : this.orderStatus;
          exportCheckedOrder(status, this.selectedIds.toString()).then(res => {
            let blob = new Blob([res], {type: "application/vnd.ms-excel"});
            let objectUrl = URL.createObjectURL(blob);
            window.location.href = objectUrl;
          });
        } else {
          this.$message({
            message: '请至少选择一条订单！',
            type: 'warning'
          })
        }
      },
      // 返回
      goBack() {
        this.$router.back(-1);
      }
    }
  }
</script>
