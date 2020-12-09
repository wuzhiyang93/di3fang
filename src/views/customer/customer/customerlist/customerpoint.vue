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
      <el-tag style="padding: 2px 10px; margin-bottom: 10px; height: auto; vertical-align: middle; font-size: 14px">
        可用积分：{{totalpoint}}
      </el-tag>
      <el-button class="filter-item" size="medium" type="primary" icon="el-icon-edit" @click="toAddCustomerPoint">
        调整积分
      </el-button>
    </div>

    <el-table
      :data="customerPointList"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="积分">
        <template slot-scope="scope">{{ scope.row.point }}</template>
      </el-table-column>
      <el-table-column label="说明">
        <template slot-scope="scope">{{ scope.row.detail }}</template>
      </el-table-column>
      <el-table-column label="时间">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.pageNum+1" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog title="调整积分" :visible.sync="showDia">
      <el-form label-position="right" :model="form" :rules="rules" ref="form" label-width="80px">
        <el-form-item prop="point">
          <span slot="label">调整积分</span>
          <el-tooltip class="item" effect="dark" content="可填写正负数，正数增加积分，负数减少积分。" placement="right">
            <el-input style="width: 200px" maxlength="8" v-model="form.point"/>
          </el-tooltip>
        </el-form-item>
        <el-form-item prop="detail">
          <span slot="label">备注说明</span>
          <el-input maxlength="512" v-model="form.detail"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDia = false">取消</el-button>
        <el-button type="primary" @click="addCustomerPoint">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    queryCustomerPointList,
    queryCustomerTotalPoint,
    addCustomerPoint
  } from '@/api/customerpoint';
  import {integerValidator} from '@/utils/validate';

  export default {
    data() {
      return {
        listStatus: '4', // 列表状态 会员积分列表
        isProcess: false, // 接口是否处理中
        showDia: false, // 是否显示新增弹窗标识
        listLoading: true, // 列表加载标识
        customerPointList: null, // 列表数据集合
        total: null, // 总记录数
        listQuery: {
          pageNum: 0, // 当前页码
          pageSize: 10, // 每页显示记录数
          customerId: null, // 会员id
        },
        totalpoint: null, // 总积分
        form: { // 提交form表单
          customerId: null, // 会员id
          point: null, // 积分
          detail: '' // 备注说明
        },
        rules: { // 校验规则
          point: [
            {
              required: true,
              trigger: 'blur',
              validator: integerValidator
            }
          ],
          detail: [
            {
              required: true,
              message: '请输入备注说明',
              trigger: 'blur'
            }
          ]
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 查询会员积分列表和积分总额
      getList() {
        queryCustomerTotalPoint(this.$route.query.id).then(res => {
          this.totalpoint = res;
        });
        this.listLoading = true;
        this.listQuery.customerId = this.$route.query.id;
        queryCustomerPointList(this.listQuery).then((response) => {
          this.customerPointList = response.data;
          this.total = response.recordsTotal;
          this.listLoading = false
        })
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
      // 准备新增会员积分
      toAddCustomerPoint() {
        this.showDia = true;
        this.resetForm();
        if (this.$refs["form"]) {
          this.$refs["form"].resetFields();
        }
      },
      // 新增会员积分
      addCustomerPoint() {
        this.form.customerId = this.$route.query.id;
        this.$refs['form'].validate(valid => {
          if (!this.isProcess && valid) {
            this.isProcess = true;
            addCustomerPoint(this.form).then(res => {
              this.isProcess = false;
              if (res == 1) {
                this.showDia = false;
                this.getList();
                this.$message({
                  message: '调整会员积分成功',
                  type: 'success'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: '调整会员积分失败!'
                })
              }
            })
          }
        });
      },
      // 重置form表单
      resetForm() {
        this.form = {customerId: null, point: null, detail: ''};
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
