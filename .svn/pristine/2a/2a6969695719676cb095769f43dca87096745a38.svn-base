<template>
  <div class="app-container">
    <el-radio-group v-model="listQuery.status" style="margin-bottom: 20px" @change="changeStatus">
      <el-radio-button :label="0">未处理</el-radio-button>
      <el-radio-button :label="1">已处理</el-radio-button>
    </el-radio-group>

    <el-table
      :data="complaintList"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="投诉内容" min-width="200">
        <template slot-scope="scope">{{ scope.row.complaintsDesc }}</template>
      </el-table-column>
      <el-table-column label="投诉时间">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="投诉人" width="120">
        <template slot-scope="scope">{{ scope.row.username }}</template>
      </el-table-column>
      <el-table-column v-if="listQuery.status == 1" label="回复人" width="100">
        <template slot-scope="scope">{{ scope.row.operator }}</template>
      </el-table-column>
      <el-table-column v-if="listQuery.status == 1" label="回复内容" min-width="200">
        <template slot-scope="scope">{{ scope.row.complaintsReplay }}</template>
      </el-table-column>
      <el-table-column v-if="listQuery.status == 0" label="操作" align="left" width="80">
        <template slot-scope="scope">
          <el-button type="primary" style="margin: 0 10px 5px 0" size="mini" @click="toReplyComplaint(scope.row.id)">回复
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
        <el-form-item prop="complaintsReplay">
          <span slot="label">回复内容</span>
          <el-input type="textarea" v-model="form.complaintsReplay" :rows="3" maxlength="2048"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDia = false">取消</el-button>
        <el-button type="primary" @click="replyComplaint">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {queryComplaintList, replyComplaint} from '@/api/complaint';

  export default {
    data() {
      return {
        isProcess: false, // 接口是否处理中
        showDia: false, // 是否显示回复弹窗标识
        listLoading: true, // 列表加载标识
        complaintList: null, // 列表数据集合
        total: null, // 总记录数
        listQuery: {
          pageNum: 0, // 当前页码
          pageSize: 10, // 每页显示记录数
          status: '0', // 平台投诉状态 0 未处理 1 已处理
        },
        form: {
          id: '', // 平台投诉id
          complaintsReplay: '', // 平台投诉回复内容
        },
        rules: {
          complaintsReplay: [
            {
              required: true,
              message: '请输入回复内容',
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
      // 查询平台投诉列表
      getList() {
        this.listLoading = true;
        queryComplaintList(this.listQuery).then((response) => {
          this.complaintList = response.data;
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
      // 切换当前平台投诉状态
      changeStatus() {
        this.listQuery.pageNum = 0;
        this.getList();
      },
      // 准备回复平台投诉
      toReplyComplaint(id) {
        if (this.$refs["form"]) {
          this.$refs["form"].resetFields();
        }
        this.form.id = id;
        this.showDia = true;
      },
      // 回复平台投诉
      replyComplaint() {
        this.$refs['form'].validate(valid => {
          if (valid && !this.isProcess) {
            this.isProcess = true;
            replyComplaint(this.form).then(res => {
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
