<template>
  <div class="app-container">
    <div class="filter-container">
      <router-link to="/marketingmanager/goodsmarketing/crowdfunding">
        <el-button class="filter-item" size="medium" icon="el-icon-back">返回众筹项目列表</el-button>
      </router-link>
      <el-button class="filter-item" size="medium" type="primary" icon="el-icon-plus" @click="toAddSchedule">
        添加众筹进度
      </el-button>
    </div>

    <el-table
      :data="schedules"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="开始时间">
        <template slot-scope="scope">{{ scope.row.time.split(' ')[0] }}</template>
      </el-table-column>
      <el-table-column label="进度描述">
        <template slot-scope="scope">{{ scope.row.desc }}</template>
      </el-table-column>
      <el-table-column label="操作" align="left" width="255">
        <template slot-scope="scope">
          <el-button type="primary" style="margin: 0 5px 0 0" size="mini" @click="toUpdateSchedule(scope.row.id)">修改
          </el-button>
          <el-button size="mini" style="margin: 0" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="this.isAdd==0?'添加众筹进度':'修改众筹进度'" :visible.sync="dialogShow">
      <el-form :model="form" :rules="rules" ref="form" label-position="right" label-width="120px">
        <el-form-item prop="time">
          <span slot="label">促销时间</span>
          <el-date-picker
            v-model="form.time"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="desc" label="促销描述">
          <el-input v-model="form.desc" type="textarea"/>
        </el-form-item>
        <el-form-item prop="picUrl" label="进度图片">
          <el-upload
            class="avatar-uploader"
            :action="uploadApi"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :headers="headers"
            name="image"
            accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO"
          >
            <img v-if="form.picUrl" :src="form.picUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">取消</el-button>
        <el-button type="primary" @click="isAdd==0?saveSchedule():updateSchedule()">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

  import {
    queryCrowdfundingProgressByMarketingId,
    addCrowdfundingProgress,
    deleteCrowdfundingProgress,
    queryCrowdfundingProgressById,
    updateCrowdfundingProgress
  } from '@/api/crowdfundingschedule';
  import {getToken} from '@/utils/token'

  export default {
    data() {
      return {
        rules: {
          time: [
            {
              required: true,
              message: '请输入时间',
              trigger: 'blur'
            }
          ],
          desc: [
            {
              required: true,
              message: '请输入描述',
              trigger: 'blur'
            }
          ],
          picUrl: [
            {
              required: true,
              message: '请上传图片',
              trigger: 'blur'
            }
          ]
        }, // 验证规则
        uploadApi: process.env.UPLOAD_API,  // 上传图片api
        headers: {
          Authorization: 'Bearer ' + getToken()
        }, // 认证的头部
        dialogShow: false, // 添加修改进度弹出框
        isAdd: 0, // 是否新增 0 新增 1 修改
        listLoading: true,
        schedules: [], // 进度
        form: {
          id: '',
          desc: '',
          picUrl: '',
          marketingId: this.$route.query.id,
          time: ''
        } // 众筹进度
      }
    },
    created() {
      this.querySchedule();
    },
    methods: {
      // 查询众筹进度
      querySchedule() {
        this.listLoading = true;
        queryCrowdfundingProgressByMarketingId(this.$route.query.id).then(res => {
          this.schedules = res;
          this.listLoading = false;
        })
      },
      // 准备添加众筹
      toAddSchedule() {
        this.isAdd = 0;
        this.dialogShow = true;
        this.form = {
          id: '',
          desc: '',
          picUrl: '',
          marketingId: this.$route.query.id,
          time: ''
        }
        if (this.$refs["form"]) {
          this.$refs["form"].resetFields();
        }
      },
      // 准备修改进度
      toUpdateSchedule(id) {
        if (this.$refs["form"]) {
          this.$refs["form"].resetFields();
        }
        this.dialogShow = true;
        queryCrowdfundingProgressById(id, this.$route.query.id).then(res => {
          this.isAdd = 1;
          this.form = {
            id: res.id,
            desc: res.desc,
            picUrl: res.picUrl,
            marketingId: this.$route.query.id,
            time: res.time.split(' ')[0]
          }
        })
      },
      // 上传图片回调
      uploadSuccess(res) {
        this.form.picUrl = res;
      },
      // 保存进度
      saveSchedule() {
        this.$refs['form'].validate(valid => {
          if (!this.isProcess && valid) {
            this.isProcess = true;
            this.form.time = this.form.time + ' 00:00:00';
            addCrowdfundingProgress(this.form).then(() => {
              this.isProcess = false;
              this.dialogShow = false;
              this.querySchedule();
              this.$message({
                message: '创建成功',
                type: 'success'
              })
            })
          }
        });
      },
      // 修改进度
      updateSchedule() {
        this.$refs['form'].validate(valid => {
          if (!this.isProcess && valid) {
            this.isProcess = true;
            this.form.time = this.form.time + ' 00:00:00';
            updateCrowdfundingProgress(this.form).then(() => {
              this.isProcess = false;
              this.dialogShow = false;
              this.querySchedule();
              this.$message({
                message: '更新成功',
                type: 'success'
              })
            })
          }
        });
      },
      // 删除二次确认
      handleDelete(id) {
        this.$confirm('是否确认删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delSchedule(id);
        })
      },
      // 删除
      delSchedule(id) {
        if (this.isProcess) {
          return;
        }
        this.isProcess = true;
        deleteCrowdfundingProgress(id, this.$route.query.id).then(() => {
          this.isProcess = false;
          this.querySchedule();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        });
      },
    }
  }
</script>
