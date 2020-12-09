<template>
  <div class="app-container">
    <div>
      <router-link to="/customer/customer/customerlist">
        <el-button icon="el-icon-back">返回会员列表</el-button>
      </router-link>
    </div>
    <el-radio-group v-model="listStatus" @change="toCustomerInfoList" style="margin: 20px 0">
      <el-radio-button :label="0">基本信息</el-radio-button>
      <el-radio-button :label="1">订单信息</el-radio-button>
      <el-radio-button :label="2">优惠券</el-radio-button>
      <el-radio-button :label="3">商品关注</el-radio-button>
      <el-radio-button :label="4">用户积分</el-radio-button>
      <el-radio-button :label="5">用户预存款</el-radio-button>
      <el-radio-button :label="6">会员等级</el-radio-button>
    </el-radio-group>

    <div class="filter-container">
      <el-input placeholder="交易单号" v-model="listQuery.transCode" size="medium" style="width: 150px;"
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
      </el-button><br/>
      <el-tag
        style="padding: 2px 10px; margin-bottom: 10px; height: auto; vertical-align: middle; font-size: 14px">
        可用余额：{{getPrice(currentPredeposit)}}
      </el-tag>
      <el-button class="filter-item" size="medium" type="primary" icon="el-icon-edit" @click="toAddCustomerPredeposit">
        调整预存款
      </el-button>
    </div>

    <el-table
      :data="customerPredepositList"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="交易类型">
        <template slot-scope="scope">
          <span>{{getTransType(scope.row.transType)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="支出/收入">
        <template slot-scope="scope">
          <el-tag type="success"
                  v-if="scope.row.transType == '1' || scope.row.transType == '3' || scope.row.transType == '4'">
            {{scope.row.money.toFixed(2) }}
          </el-tag>
          <el-tag type="danger" v-else>{{ scope.row.money.toFixed(2) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="交易时间">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="交易单号">
        <template slot-scope="scope">{{ scope.row.transCode }}</template>
      </el-table-column>
      <el-table-column label="当前预存款">
        <template slot-scope="scope">{{ scope.row.currentMoney.toFixed(2) }}</template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.pageNum+1" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog title="调整预存款" :visible.sync="showDia">
      <el-form label-position="right" :model="form" :rules="rules" ref="form" label-width="80px">
        <el-form-item prop="money">
          <span slot="label">调整余额</span>
          <el-tooltip class="item" effect="dark" content="可填写正负数，正数增加预存款，负数减少预存款。" placement="right">
            <el-input style="width: 200px" v-model="form.money" maxlength="7"/>
          </el-tooltip>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDia = false">取消</el-button>
        <el-button type="primary" @click="addCustomerPredeposit">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    queryPredepositList,
    queryCurrentPredeposit,
    addCustomerPredeposit
  } from '@/api/customerpredeposit';
  import {allMoneyValidator} from '@/utils/validate';

  export default {
    data() {
      return {
        listStatus: '5', // 列表状态 会员预存款列表
        isProcess: false, // 接口是否处理中
        showDia: false, // 是否显示新增弹窗标识
        listLoading: true, // 列表加载标识
        customerPredepositList: null, // 列表数据集合
        total: null, // 总记录数
        listQuery: {
          pageNum: 0, // 当前页码
          pageSize: 10, // 每页显示记录数
          customerId: null, // 会员id
          transCode: '', // 交易单号
          startTime: '', // 开始时间
          endTime: '', // 结束时间
        },
        searchTimeValue: null, // 查询条件时间范围，数组格式，数组第一项为开始时间，第二项结束时间
        currentPredeposit: null, // 预存款余额
        form: { // 提交form表单
          customerId: null, // 会员id
          money: null, // 预存款
        },
        rules: { // 校验规则
          money: [
            {
              required: true,
              trigger: 'blur',
              validator: allMoneyValidator
            }
          ],
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
      // 查询会员预存款列表和预存款余额
      getList() {
        queryCurrentPredeposit(this.$route.query.id).then(res => {
          this.currentPredeposit = res;
        });
        this.listLoading = true;
        this.listQuery.customerId = this.$route.query.id;
        if (this.searchTimeValue) {
          this.listQuery.startTime = this.searchTimeValue[0];
          this.listQuery.endTime = this.searchTimeValue[1];
        } else {
          this.listQuery.startTime = '';
          this.listQuery.endTime = '';
        }
        queryPredepositList(this.listQuery).then((response) => {
          this.customerPredepositList = response.data;
          this.total = response.recordsTotal;
          this.listLoading = false
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
      // 获取消费金额
      getPrice(currentPredeposit) {
        if (currentPredeposit) {
          return currentPredeposit.toFixed(2);
        } else {
          return '0.00';
        }
      },
      // 获取交易类型
      getTransType(transType) {
        if (transType == '1') {
          return '在线充值';
        } else if (transType == '2') {
          return '订单消费';
        } else if (transType == '3') {
          return '订单退款';
        } else if (transType == '4') {
          return '管理员增加';
        } else if (transType == '5') {
          return '管理员减少';
        } else {
          return '未知';
        }
      },
      // 准备新增会员预存款
      toAddCustomerPredeposit() {
        this.showDia = true;
        this.resetForm();
        if (this.$refs["form"]) {
          this.$refs["form"].resetFields();
        }
      },
      // 新增会员预存款
      addCustomerPredeposit() {
        this.form.customerId = this.$route.query.id;
        this.$refs['form'].validate(valid => {
          if (!this.isProcess && valid) {
            this.isProcess = true;
            addCustomerPredeposit(this.form).then(res => {
              this.isProcess = false;
              if (res == 1) {
                this.showDia = false;
                this.getList();
                this.$message({
                  type: 'success',
                  message: '调整余额成功!'
                })
              } else if (res == -1) {
                this.$message({
                  type: 'error',
                  message: '更改之后余额不能小于零!'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '调整余额失败!'
                })
              }
            })
          }
        });
      },
      // 重置form表单
      resetForm() {
        this.form = {customerId: null, money: null};
      },
      // 跳转会员信息地址
      toCustomerInfoList() {
        if (this.listStatus === 0) {
          this.$router.push({path: '/customer/customer/customerdetail', query: {id: this.$route.query.id}})
        }
        if (this.listStatus === 1) {
          this.$router.push({path: '/customer/customer/customerorderlist', query: {id: this.$route.query.id}})
        }
        if (this.listStatus === 2) {
          this.$router.push({path: '/customer/customer/customercouponlist', query: {id: this.$route.query.id}})
        }
        if (this.listStatus === 3) {
          this.$router.push({path: '/customer/customer/customerattentionlist', query: {id: this.$route.query.id}})
        }
        if (this.listStatus === 4) {
          this.$router.push({path: '/customer/customer/customerpoint', query: {id: this.$route.query.id}})
        }
        if (this.listStatus === 5) {
          this.$router.push({path: '/customer/customer/customerpredeposit', query: {id: this.$route.query.id}})
        }
        if (this.listStatus === 6) {
          this.$router.push({path: '/customer/customer/customerlevelfordetail', query: {id: this.$route.query.id}})
        }
      }
    }
  }
</script>
