<template>
  <div class="app-container">
    <el-radio-group v-model="listQuery.status" style="margin-bottom: 20px" @change="changeStatus">
      <el-radio-button :label="0">未处理</el-radio-button>
      <el-radio-button :label="1">已处理</el-radio-button>
    </el-radio-group>
    <div class="filter-container">
      <div class="filterBox">
        <p>订单编号</p>
        <el-input placeholder="订单编号" v-model="listQuery.orderCode" size="medium" style="width: 150px;"
                  class="filter-item"/>
      </div>
      <div class="filterBox">
        <p>投诉类型</p>
        <el-select class="filter-item" v-model="listQuery.complaintsType" size="medium" style="width: 150px"
                   placeholder="请选择投诉类型">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="产品相关" value="1"></el-option>
          <el-option label="价格相关" value="2"></el-option>
          <el-option label="服务相关" value="3"></el-option>
          <el-option label="物流相关" value="4"></el-option>
          <el-option label="售后相关" value="5"></el-option>
          <el-option label="财务相关" value="6"></el-option>
          <el-option label="活动相关" value="7"></el-option>
          <el-option label="网站相关" value="8"></el-option>
          <el-option label="预约相关" value="9"></el-option>
          <el-option label="其他方面" value="10"></el-option>
        </el-select>
      </div>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
    </div>

    <el-table
      :data="orderComplaintList"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="投诉类型" width="80">
        <template slot-scope="scope">{{ complaintsTypeMap[scope.row.complaintsType] }}</template>
      </el-table-column>
      <el-table-column label="订单编号">
        <template slot-scope="scope">{{ scope.row.orderCode }}</template>
      </el-table-column>
      <el-table-column label="投诉内容" min-width="200">
        <template slot-scope="scope">{{ scope.row.complaintsDesc }}</template>
      </el-table-column>
      <el-table-column label="投诉时间">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column v-if="listQuery.status == 1" label="回复人" width="100">
        <template slot-scope="scope">{{ scope.row.operator }}</template>
      </el-table-column>
      <el-table-column v-if="listQuery.status == 1" label="回复内容" min-width="200">
        <template slot-scope="scope">{{ scope.row.complaintsReply }}</template>
      </el-table-column>
      <el-table-column v-if="listQuery.status == 0" label="操作" align="left" width="80">
        <template slot-scope="scope">
          <el-button type="primary" style="margin: 0 10px 5px 0" size="mini"
                     @click="toReplyOrderComplaint(scope.row.id)">
            回复
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

    <el-dialog title="投诉回复" :visible.sync="showDia">
      <el-form label-position="right" :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item prop="reply">
          <span slot="label">回复内容</span>
          <el-input v-model="form.reply" type="textarea" :rows="3" maxlength="2048"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDia = false">取消</el-button>
        <el-button type="primary" @click="replyOrderComplaint">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {queryOrderComplaintList, replyOrderComplaint} from '@/api/ordercomplaint';

  export default {
    data() {
      return {
        isProcess: false, // 接口是否处理中
        showDia: false, // 是否显示回复弹窗标识
        listLoading: true, // 列表加载标识
        orderComplaintList: null, // 列表数据集合
        total: null, // 总记录数
        listQuery: {
          pageNum: 0, // 当前页码
          pageSize: 10, // 每页显示记录数
          status: '0', // 订单投诉状态 0 未处理 1 已处理
          orderCode: '', // 订单编号
          complaintsType: '-1', // 投诉类型
        },
        form: {
          id: '', // 订单投诉id
          reply: '', // 订单投诉回复内容
        },
        rules: {
          reply: [
            {
              required: true,
              message: '请输入回复内容',
              trigger: 'blur'
            }
          ]
        },
        complaintsTypeMap: {
          '1': '产品相关',
          '2': '价格相关',
          '3': '服务相关',
          '4': '物流相关',
          '5': '售后相关',
          '6': '财务相关',
          '7': '活动相关',
          '8': '网站相关',
          '9': '预约相关',
          '10': '其他方面'
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 查询订单投诉列表
      getList() {
        this.listLoading = true;
        queryOrderComplaintList(this.listQuery).then((response) => {
          this.orderComplaintList = response.data;
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
      // 切换当前订单投诉状态
      changeStatus() {
        this.listQuery.pageNum = 0;
        this.listQuery.orderCode = '';
        this.listQuery.complaintsType = '-1';
        this.getList();
      },
      // 准备回复订单投诉
      toReplyOrderComplaint(id) {
        if (this.$refs["form"]) {
          this.$refs["form"].resetFields();
        }
        this.form.id = id;
        this.showDia = true;
      },
      // 回复订单投诉
      replyOrderComplaint() {
        this.$refs['form'].validate(valid => {
          if (valid && !this.isProcess) {
            this.isProcess = true;
            replyOrderComplaint(this.form).then(res => {
              this.isProcess = false;
              if (res == 1) {
                this.showDia = false;
                this.getList();
                this.$message({
                  type: 'success',
                  message: '回复投诉成功!'
                });
              } else {
                this.$message({
                  message: '回复投诉失败',
                  type: 'error'
                })
              }
            })
          }
        });
      }
    }
  }
</script>
