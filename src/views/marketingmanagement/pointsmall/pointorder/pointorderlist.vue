<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filterBox">
        <p>订单号</p>
        <el-input placeholder="订单号" v-model="listQuery.code" size="medium" style="width: 150px;" class="filter-item"/>
      </div>
      <div class="filterBox">
        <p>收货人</p>
        <el-input placeholder="收货人" v-model="listQuery.receiver" size="medium" style="width: 150px;"
                  class="filter-item"/>
      </div>
      <div class="filterBox">
        <p>手机号码</p>
        <el-input placeholder="手机号码" v-model="listQuery.mobile" size="medium" style="width: 150px;"
                  class="filter-item"/>
      </div>
      <div class="filterBox">
        <p>订单状态</p>
        <el-select class="filter-item" v-model="listQuery.status" size="medium" style="width: 150px"
                   placeholder="请选择订单状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="待发货" value="0"></el-option>
          <el-option label="待收货" value="1"></el-option>
          <el-option label="已完成" value="2"></el-option>
        </el-select>
      </div>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
    </div>

    <el-table
      :data="pointOrderList"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="订单号" min-width="162">
        <template slot-scope="scope">{{ scope.row.code }}</template>
      </el-table-column>
      <el-table-column label="收货人">
        <template slot-scope="scope">{{ scope.row.receiver }}</template>
      </el-table-column>
      <el-table-column label="手机号码">
        <template slot-scope="scope">{{ scope.row.mobile }}</template>
      </el-table-column>
      <el-table-column label="兑换积分">
        <template slot-scope="scope">{{ scope.row.point }}</template>
      </el-table-column>
      <el-table-column label="订单状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == '0'" type="warning">待发货</el-tag>
          <el-tag v-if="scope.row.status == '1'" type="warning">待收货</el-tag>
          <el-tag v-if="scope.row.status == '2'" type="success">已完成</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="下单时间" min-width="160">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="操作" min-width="100">
        <template slot-scope="scope">
          <router-link :to="{path:'/marketingmanager/pointsmall/pointorderdetail',query:{id:scope.row.id}}">
            <el-button type="success" style="margin: 0 5px 0 0" size="mini">详情</el-button>
          </router-link>
          <el-button v-if="scope.row.status == '0'" type="primary" style="margin: 0" size="mini"
                     @click="toDeliverPointOrder(scope.row.id)">发货
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

    <el-dialog title="发货" :visible.sync="showDia">
      <el-form label-position="right" :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item prop="logisticsId">
          <span slot="label">物流公司</span>
          <el-select v-model="form.logisticsId" placeholder="请选择物流公司">
            <el-option
              v-for="item in logisticsCompanys"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="logisticsCode">
          <span slot="label">运单号</span>
          <el-input type="number" maxlength="20" v-model="form.logisticsCode"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDia = false">取消</el-button>
        <el-button type="primary" @click="deliverPointOrder">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {queryPointOrderList, queryAllLogisticsCompanys, deliverPointOrder} from '@/api/pointorderlist';
  import {chineseValidator} from '@/utils/validate';

  export default {
    data() {
      return {
        isProcess: false, // 接口是否处理中
        showDia: false, // 是否显示发货弹窗
        logisticsCompanys: [], // 所有物流公司集合
        listLoading: true, // 列表加载标识
        pointOrderList: [], // 积分商城订单集合
        total: null, // 总记录数
        listQuery: {
          pageNum: 0, // 当前页码
          pageSize: 10, // 每页显示记录数
          code: '', // 订单号
          receiver: '', // 收货人
          mobile: '', // 手机号码
          status: '', // 订单状态
        },
        form: { // 提交form表单
          id: '', // 积分商城订单id
          logisticsId: '', // 物流公司id
          logisticsCode: '', // 运单号
        },
        rules: { // 校验规则
          logisticsId: [
            {
              required: true,
              message: '请选择物流公司',
              trigger: 'blur'
            }
          ],
          logisticsCode: [
            {
              required: true,
              trigger: 'blur',
              validator: chineseValidator
            }
          ],
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 查询积分商城订单列表
      getList() {
        this.listLoading = true;
        queryPointOrderList(this.listQuery).then((response) => {
          this.pointOrderList = response.data;
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
      // 准备发货
      toDeliverPointOrder(id) {
        this.resetForm();
        if (this.$refs["form"]) {
          this.$refs["form"].resetFields();
        }
        this.form.id = id;
        queryAllLogisticsCompanys().then(res => {
          this.logisticsCompanys = res;
          this.showDia = true;
        })
      },
      // 发货
      deliverPointOrder() {
        this.$refs['form'].validate(valid => {
          if (valid && !this.isProcess) {
            this.isProcess = true;
            deliverPointOrder(this.form).then(res => {
              this.isProcess = false;
              if (res == 1) {
                this.showDia = false;
                this.getList();
                this.$message({
                  message: '发货成功',
                  type: 'success'
                })
              } else if (res == -1) {
                this.$message({
                  type: 'error',
                  message: '请填写运单号'
                })
              } else if (res == -2) {
                this.$message({
                  type: 'error',
                  message: '运单号不能含有中文'
                })
              } else if (res == -6) {
                this.$message({
                  type: 'error',
                  message: '物流公司不存在'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '未知错误!'
                })
              }
            })
          }
        });
      },
      // 重置form表单
      resetForm() {
        this.form = {id: '', logisticsId: '', logisticsCode: ''};
      },
    }
  }
</script>
