<template>
  <div class="app-container">
    <el-radio-group v-model="listQuery.status" style="margin-bottom: 20px" @change="changeStatus">
      <el-radio-button :label="-1">全部</el-radio-button>
      <el-radio-button :label="1">待付款</el-radio-button>
      <el-radio-button :label="2">待取货</el-radio-button>
      <el-radio-button :label="3">已完成</el-radio-button>
      <el-radio-button :label="4">已取消</el-radio-button>
    </el-radio-group>
    <div class="filter-container">
      <el-input placeholder="订单号" v-model="listQuery.orderCode" size="medium" style="width: 150px;"
                class="filter-item"/>
      <el-input placeholder="用户名" v-model="listQuery.customerName" size="medium" style="width: 150px;"
                class="filter-item"/>
      <el-input placeholder="门店名" v-model="listQuery.storeName" size="medium" style="width: 150px;"
                class="filter-item"/>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
    </div>

    <el-table
      :data="orderList"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="门店" min-width="160">
        <template slot-scope="scope">{{ scope.row.storeName }}</template>
      </el-table-column>
      <el-table-column label="订单号" min-width="162">
        <template slot-scope="scope">{{ scope.row.orderCode }}</template>
      </el-table-column>
      <el-table-column label="买家" min-width="110">
        <template slot-scope="scope">{{ scope.row.customerName }}</template>
      </el-table-column>
      <el-table-column label="下单时间" min-width="160">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="订单总额" min-width="80">
        <template slot-scope="scope">{{ scope.row.price.toFixed(2) }}</template>
      </el-table-column>
      <el-table-column label="订单状态" width="82">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == '1'" type="warning">待付款</el-tag>
          <el-tag v-if="scope.row.status == '2'" type="warning">待取货</el-tag>
          <el-tag v-if="scope.row.status == '3'" type="success">已完成</el-tag>
          <el-tag v-if="scope.row.status == '4'" type="info">已取消</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="160">
        <template slot-scope="scope">
          <router-link :to="{path:'/shopmanagement/storepickedorder/storepickedorderdetail',query:{id:scope.row.id}}">
            <el-button type="success" style="margin: 0 5px 0 0" size="mini">详情</el-button>
          </router-link>
          <el-button v-if="scope.row.status == '1'" type="primary" style="margin: 0" size="mini"
                     @click="toConfirmStorePickedOrder(scope.row.id)">确认付款
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

    <el-dialog title="确认付款" :visible.sync="showDia">
      <el-alert title="注意！ 确认付款后订单状态将修改为待发货，你确定要修改吗？" style="margin-bottom: 20px" type="warning" :closable="false"
                show-icon></el-alert>
      <el-form label-position="right" :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item prop="remark">
          <span slot="label">请填写原因</span>
          <el-input v-model="form.remark" maxlength="200"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDia = false">取消</el-button>
        <el-button type="primary" @click="confirmStorePickedOrder">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {queryStorePickedOrderList, confirmStorePickedOrder} from '@/api/shoppickedorderlist';

  export default {
    data() {
      return {
        isProcess: false, // 接口是否处理中
        showDia: false, // 是否显示新增弹窗标识
        listLoading: true, // 列表加载标识
        orderList: null, // 列表数据集合
        total: null, // 总记录数
        listQuery: {
          pageNum: 0, // 当前页码
          pageSize: 10, // 每页显示记录数
          status: '-1', // 订单状态
          orderCode: '', // 订单号
          customerName: '', // 用户名
          storeName: '', // 门店名
        },
        form: { // 提交form表单
          orderId: null, // 订单id
          remark: '', // 备注
        },
        rules: { // 校验规则
          remark: [
            {
              required: true,
              message: '请填写原因',
              trigger: 'blur'
            }
          ],
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 查询门店自提列表
      getList() {
        this.listLoading = true;
        queryStorePickedOrderList(this.listQuery).then((response) => {
          this.orderList = response.data;
          this.total = response.recordsTotal;
          this.listLoading = false
        })
      },
      // 切换订单状态
      changeStatus() {
        this.listQuery.pageNum = 0;
        this.getList();
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
      // 准备确认付款
      toConfirmStorePickedOrder(id) {
        this.showDia = true;
        this.resetForm();
        if (this.$refs["form"]) {
          this.$refs["form"].resetFields();
        }
        this.form.orderId = id;
      },
      // 确认付款
      confirmStorePickedOrder() {
        this.$refs['form'].validate(valid => {
          if (!this.isProcess && valid) {
            this.isProcess = true;
            confirmStorePickedOrder(this.form.orderId, this.form.remark).then(res => {
              this.isProcess = false;
              if (res == 1) {
                this.showDia = false;
                this.getList();
                this.$message({
                  type: 'success',
                  message: '确认付款成功!'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: '确认付款失败!'
                })
              }
            })
          }
        });
      },
      // 重置form表单
      resetForm() {
        this.form = {orderId: null, remark: ''};
      },
    }
  }
</script>
