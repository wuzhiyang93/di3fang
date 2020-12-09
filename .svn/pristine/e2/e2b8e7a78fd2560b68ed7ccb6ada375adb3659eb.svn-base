<template>
  <div class="app-container">
    <el-radio-group v-model="storeStatus" style="margin-bottom: 20px">
      <el-radio-button :label="0" @click.native="getList(1)">未审核商家列表</el-radio-button>
      <el-radio-button :label="1" @click.native="getList(2)">已审核商家列表</el-radio-button>
      <el-radio-button :label="2" @click.native="getList(3)">审核不通过商家列表</el-radio-button>
    </el-radio-group>
    <div class="filter-container">
      <el-input placeholder="公司名称" size="medium" v-model="listQuery.companyName" maxlength="20" style="width: 150px;"
                class="filter-item"/>
      <el-input placeholder="店铺名称" size="medium" v-model="listQuery.storeName" maxlength="20" style="width: 150px;"
                class="filter-item"/>
      <el-input placeholder="用户手机号" size="medium" v-model="listQuery.mobile" maxlength="20" style="width: 150px;"
                class="filter-item"/>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
      <br/>
      <el-button v-if="storeStatus == 1" class="filter-item" size="medium" style="margin-left: 5px;" type="danger"
                 icon="el-icon-remove" @click="closeStores">关闭店铺
      </el-button>
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
      <el-table-column label="用户手机号" width="120">
        <template slot-scope="scope">{{ scope.row.customerMobile }}</template>
      </el-table-column>
      <el-table-column label="公司名称">
        <template slot-scope="scope">{{ scope.row.companyName }}</template>
      </el-table-column>
      <el-table-column label="店铺名称">
        <template slot-scope="scope">{{ scope.row.storeName }}</template>
      </el-table-column>
      <el-table-column label="状态" width="105">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == '1'" type="warning">待审核</el-tag>
          <el-tag v-if="scope.row.status == '2'" type="success">营业中</el-tag>
          <el-tag v-if="scope.row.status == '4'" type="info">店铺关闭</el-tag>
          <el-tag v-if="scope.row.status == '3'" type="danger">审核不通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="到期时间" width="160">
        <template slot-scope="scope">{{ scope.row.effectiveTime }}</template>
      </el-table-column>
      <el-table-column label="操作" width="210">
        <template slot-scope="scope">
          <router-link
            :to="{path:'/storemanager/storesaudit/storedetails',query:{storeId:scope.row.id,status:scope.row.status }}">
            <el-button type="success" style="margin: 0 5px 0 0" size="mini">查看</el-button>
          </router-link>
          <el-button v-if="scope.row.status == '1'" type="primary" style="margin: 0 5px 0 0" size="mini"
                     @click="showAuditDialogVisible(scope.row.id)">审核
          </el-button>
          <el-button v-if="scope.row.status == '1'" size="mini" style="margin: 0" type="danger"
                     @click="deleteDialog(scope.row.id)">
            删除
          </el-button>
          <router-link
            :to="{path:'/storemanager/storesaudit/storeinfoset',query:{storeId:scope.row.id}}">
            <el-button v-if="scope.row.status == '2' || scope.row.status == '4' " type="primary" style="margin: 0"
                       size="mini">设置
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.pageNum+1" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>


    <el-dialog title="审核商家" :visible.sync="auditDialogVisible">
      <el-form label-position="right" :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="审核">
          <el-select class="filter-item" v-model="auditStatusValue" size="medium" style="width: 150px">
            <el-option label="通过" value="2"></el-option>
            <el-option label="打回" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="auditStatusValue == 3" prop="reason">
          <span slot="label">拒绝原因</span>
          <el-input type="text" v-model="form.reason"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="auditDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="auditData">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    querySellerAduitList,  //分页查询审核商家列表
    deleteStore, //删除商家
    passStoreAudit, //审核通过
    refuseStoreAudit, //审核拒绝
    closeStores, //批量关店
  } from '@/api/storeslist';


  import {
    isEmpty,
  } from '@/utils/validate';

  export default {
    data() {
      return {
        tempStoreId: '',//当前操作的店铺 id
        storeStatus: 0,
        auditStatusValue: '',  //审核标记 2通过 3打回
        auditDialogVisible: false, //显示标记
        refusereason: '', //拒绝原因
        isProcess: false, //接口是否正在处理中
        listLoading: true, //加载中
        selectedIds: [],// 选中的id
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          id: '',
          status: '',
          companyName: '',
          storeName: '',
          mobile: '',
        }, // 查询参数
        list: null, // 页面数据,
        total: null, // 数据总数,
        multipleSelection: [],
        queryStatus: '', //当前列表状态
        form: {
          id: '',
          status: '',
          reason: ''
        }, //审核表单
        rules: { //校验规则
          reason: [
            {
              required: true,
              trigger: 'blur',
              validator: isEmpty,
            }
          ]
        },

      }
    },
    created() {
      this.getList(1)
    },
    methods: {
      //翻页
      handleCurrentChange(val) {
        this.listQuery.pageNum = val - 1;
        this.getList(this.queryStatus);
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 0;
        this.listQuery.pageSize = val;
        this.getList(this.queryStatus);
      },
      getList(status) {
        this.queryStatus = status;
        this.listQuery.status = status;
        this.listLoading = true;
        querySellerAduitList(this.listQuery).then(response => {
          this.list = response.data;
          this.total = response.recordsTotal;
          this.listLoading = false
        });
      },
      handleSelectionChange(val) {
        if (val && val.length > 0) {
          this.selectedIds = val.map(row => row.id);
        } else {
          this.selectedIds = [];
        }
      },


      //删除商家
      deleteDialog(id) {
        this.$confirm('确定要删除此商家吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.isProcess) {
            return;
          }
          this.isProcess = true;
          deleteStore(id).then(response => {
            this.isProcess = false;
            if (response == 1) {
              this.$message({
                type: 'success',
                message: '删除商家成功!'
              })
            } else {
              this.$message({
                type: 'error',
                message: '删除商家失败!'
              })
            }
            this.getList(this.queryStatus);
          });
        })
      },


      closeStores() {
        if (!this.selectedIds.length > 0) {
          this.$message({
            message: '请至少选择一条记录！',
            type: 'warning'
          });
          return;
        }
        this.$confirm('确定要关闭选中的商家吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.isProcess) {
            return;
          }
          this.isProcess = true;

          let param = {
            ids: this.selectedIds.toString()
          };
          closeStores(param).then(response => {
            this.isProcess = false;
            if (response > 0) {
              this.$message({
                type: 'success',
                message: '关闭店铺成功!'
              })
            } else {
              this.$message({
                type: 'error',
                message: '关闭店铺失败!'
              })
            }
            this.getList(this.queryStatus);
          });
        })
      },
      // 过滤查询
      handleFilter() {
        this.listQuery.pageNum = 0;
        this.getList(this.queryStatus);
      },


      //显示审核窗口
      showAuditDialogVisible(id) {
        this.tempStoreId = id;
        this.auditStatusValue = '2';
        this.form.reason = '';
        this.form.status = '';
        this.auditDialogVisible = true;
      },
      //保存审核
      auditData() {
        if (!this.auditStatusValue) {
          this.$message({
            message: '请选择审核状态！',
            type: 'warning'
          });
          return;
        }
        //审核通过
        if (this.auditStatusValue == 2) {
          this.pass();
        }
        //审核拒绝
        else {
          this.refuse();
        }
      },
      //通过
      pass() {
        if (this.isProcess) {
          return;
        }
        this.isProcess = true;
        let param = {
          id: this.tempStoreId,
          status: 2
        };
        passStoreAudit(param).then(response => {
          this.isProcess = false;
          if (response > 0) {
            this.$message({
              type: 'success',
              message: '审核店铺成功!'
            });
          } else {
            this.$message({
              type: 'error',
              message: '审核店铺失败!'
            });
          }
          this.auditDialogVisible = false;
          this.getList(this.queryStatus);
        });
      },
      //拒绝
      refuse() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            if (this.isProcess) {
              return
            }
            this.isProcess = true;
            this.form.id = this.tempStoreId;
            this.form.status = this.auditStatusValue;
            refuseStoreAudit(this.form).then(response => {
              this.isProcess = false;
              if (response > 0) {
                this.$message({
                  type: 'success',
                  message: '审核拒绝成功!'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: '审核拒绝失败!'
                });
              }
              this.auditDialogVisible = false;
              this.getList(this.queryStatus);
            });
          }
        });
      },


    }
  }
</script>
