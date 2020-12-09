<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="发表人" v-model="listQuery.customerName" size="medium" style="width: 200px;"
                class="filter-item"/>
      <el-input placeholder="商品名称" v-model="listQuery.skuName" size="medium" style="width: 200px;" class="filter-item"/>
      <el-input placeholder="店铺名称" v-model="listQuery.storeName" size="medium" style="width: 200px;"
                class="filter-item"/>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
      <br/>
      <el-button class="filter-item" size="medium" style="margin-left: 5px;" type="danger" icon="el-icon-delete"
                 @click="toBatchDeleteComment">批量删除
      </el-button>
    </div>

    <el-table
      :data="commentList"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="40"/>
      <el-table-column label="商品名称" min-width="300">
        <template slot-scope="scope">{{ scope.row.sku.name }}</template>
      </el-table-column>
      <el-table-column label="发表人" min-width="110">
        <template slot-scope="scope">{{ scope.row.customerName }}</template>
      </el-table-column>
      <el-table-column label="匿名" min-width="60">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isAnonymous == '1'" type="success">是</el-tag>
          <el-tag v-if="scope.row.isAnonymous == '0'" type="info">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="店铺" min-width="150">
        <template slot-scope="scope">{{ !scope.row.storeName || scope.row.storeName==0 ? '自营':scope.row.storeName }}
        </template>
      </el-table-column>
      <el-table-column label="发表时间" min-width="160">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="viewComment(scope.row.id)">查看</el-button>
          <el-button size="mini" type="danger" @click="toDeleteComment(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.pageNum+1" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog title="评论详情" :visible.sync="showDia" width="60%">
      <div style="display: flex; flex-direction: row">
        <img width="70" height="70" :src="comment.sku.url">
        <div style="padding-left: 20px; line-height: 24px">
          <div style="font-size: 16px">{{comment.sku.name}}</div>
          <div style="color: #999">发表人：{{comment.customerName}}</div>
          <div style="color: #999">时间：{{comment.createTime}}</div>
        </div>
      </div>
      <div style="margin-top: 10px">
        <div style="vertical-align: middle; display: inline-block; margin-top: 2px">满意度：</div>
        <el-rate
          v-model="comment.score"
          disabled
          :colors="['#99A9BF', '#F7BA2A', '#F90']"
          score-template="{value}"
          style="display: inline-block"
        />
      </div>
      <div
        style="display: flex; flex-direction: row; justify-content: space-between; margin-top: 10px; border-top: 1px solid #ddd; padding-top: 10px">
        <div>
          <div style="display: flex; flex-direction: row; line-height: 20px">
            <div style="word-break: keep-all">评论内容：</div>
            <div>{{comment.comment}}</div>
          </div>
          <div style="display: flex; flex-direction: row; margin-top: 5px; line-height: 20px">
            <div style="word-break: keep-all">评论图片：</div>
            <div v-for="pic in comment.commentPics" :key="pic.id">
              <el-image style="width: 90px; height: 90px; margin-right: 10px" :src="pic.url" fit="fill"></el-image>
            </div>
          </div>
        </div>
        <div style="display: flex; justify-content: flex-end; width: 200px">
          <el-switch v-model="comment.isShow" active-value="0" inactive-value="1" active-text="显示"
                     @change="updateCommentIsShow($event,comment.id)"></el-switch>
        </div>
      </div>
      <div v-for="reply in comment.commentReplies" :key="reply.id">
        <div
          style="display: flex; flex-direction: row; justify-content: space-between; margin-top: 10px; border-top: 1px solid #ddd; padding-top: 10px">
          <div>
            <div style="display: flex; flex-direction: row; line-height: 20px">
              <div style="word-break: keep-all">{{ !reply.storeId || reply.storeId == 0 ? '平台' : '商家'}}回复：
              </div>
              <div>
                <div>{{reply.reply}}</div>
                <div style="color: #999">{{reply.createTime}}</div>
              </div>
            </div>
          </div>
          <div style="display: flex; justify-content: flex-end; width: 200px">
            <el-switch v-model="reply.isShow" active-value="0" inactive-value="1" active-text="显示"
                       @change="updateReplyIsShow(reply.id,$event)"></el-switch>
          </div>
        </div>
      </div>
      <div
        style="display: flex; flex-direction: row; justify-content: space-between; margin-top: 10px; border-top: 1px solid #ddd; padding-top: 10px">
        <el-form style="width: 100%" :model="form" :rules="rules" ref="form">
          <el-form-item prop="reply">
            <el-input type="textarea" v-model="form.reply" maxlength="2048"></el-input>
          </el-form-item>
          <el-form-item style="text-align: right">
            <el-button type="primary" @click="addCommentReply(comment.id)">回复</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    queryComments,
    queryCommentById,
    updateCommentIsShow,
    updateReplyIsShow,
    addCommentReply,
    deleteComment,
  } from '@/api/comments';

  export default {
    data() {
      return {
        isProcess: false, // 接口是否处理中
        showDia: false, // 是否显示查看详情弹窗标识
        delIds: [],// 批量删除选中id数组
        listLoading: true, // 列表加载标识
        commentList: null, // 列表数据集合
        total: null, // 总记录数
        listQuery: {
          pageNum: 0, // 当前页码
          pageSize: 10, // 每页显示记录数
          customerName: '', // 发表人名称
          skuName: '', // 商品名称
          storeName: '', //店铺名称
        },
        form: { // 提交回复form表单
          commentId: '', // 评论id
          reply: '', // 回复内容
        },
        rules: { // 校验规则
          reply: [
            {
              required: true,
              message: '请输入回复内容',
              trigger: 'blur'
            }
          ],
        },
        comment: {sku: ''}
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 查询评论列表
      getList() {
        this.listLoading = true;
        queryComments(this.listQuery).then((response) => {
          this.commentList = response.data;
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
      // 查看评论详情
      viewComment(id) {
        queryCommentById(id).then(res => {
          this.resetData();
          if (res.flag) {
            this.comment = res.data;
            this.showDia = true;
            if (this.$refs["form"]) {
              this.$refs["form"].resetFields();
            }
          }
        })
      },
      // 更新评论显示状态
      updateCommentIsShow($event, commentId) {
        if (!this.isProcess) {
          this.isProcess = true;
          updateCommentIsShow(commentId, $event).then(() => {
            this.isProcess = false;
            this.$message({
              type: 'success',
              message: '更新评论显示状态成功'
            });
          });
        }
      },
      // 更新回复显示状态
      updateReplyIsShow(replyId, $event) {
        if (!this.isProcess) {
          this.isProcess = true;
          updateReplyIsShow(replyId, $event).then(() => {
            this.isProcess = false;
            this.$message({
              type: 'success',
              message: '更新回复显示状态成功'
            });
          });
        }
      },
      // 新增回复
      addCommentReply(commentId) {
        this.$refs['form'].validate(valid => {
          if (valid && !this.isProcess) {
            this.isProcess = true;
            this.form.commentId = commentId;
            addCommentReply(this.form).then(() => {
              this.isProcess = false;
              this.viewComment(commentId);
              this.$message({
                type: 'success',
                message: '回复成功'
              });
            })
          }
        });
      },
      // 删除评论二次确认
      toDeleteComment(id) {
        this.$confirm('是否确认删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteComment(id);
        })
      },
      // 多选选中评论
      handleSelectionChange(val) {
        if (val && val.length > 0) {
          this.delIds = val.map(row => row.id);
        } else {
          this.delIds = [];
        }
      },
      // 批量删除评论二次确认
      toBatchDeleteComment() {
        if (this.delIds && this.delIds.length > 0) {
          this.$confirm('是否确认删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteComment(this.delIds);
          })
        } else {
          this.$message({
            message: '请至少选择一个评论',
            type: 'warning'
          })
        }
      },
      // 删除评论
      deleteComment(ids) {
        if (!this.isProcess) {
          this.isProcess = true;
          deleteComment({"ids": ids.toString()}).then(() => {
            this.isProcess = false;
            this.getList();
            this.delIds = [];
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
        }
      },
      // 重置数据
      resetData() {
        this.comment = {sku: ''};
        this.form = {commentId: '', reply: ''};
      },
    }
  }
</script>
