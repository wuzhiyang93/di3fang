<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="红包名称" v-model="listQuery.name" maxlength="64" size="medium" style="width: 200px;"
                class="filter-item"/>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
      <br/>
      <el-button class="filter-item" size="medium" style="margin-left: 5px;" type="primary" icon="el-icon-plus"
                 @click="toAddRedenvelope()">添加红包
      </el-button>
      <el-button class="filter-item" size="medium" style="margin-left: 5px;" type="danger" icon="el-icon-delete"
                 @click="batchDelete">批量删除
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
      <el-table-column label="红包名称" min-width="120">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="可领个数">
        <template slot-scope="scope">{{ scope.row.limitNum }}</template>
      </el-table-column>
      <el-table-column label="店铺报名截止时间" min-width="160">
        <template slot-scope="scope">{{ scope.row.signupTime }}</template>
      </el-table-column>
      <el-table-column label="开始时间" min-width="160">
        <template slot-scope="scope">{{ scope.row.startTime }}</template>
      </el-table-column>
      <el-table-column label="结束时间" min-width="160">
        <template slot-scope="scope">{{ scope.row.endTime }}</template>
      </el-table-column>
      <el-table-column label="操作" min-width="221">
        <template slot-scope="scope">
          <el-button v-clipboard:copy="scope.row.id" v-clipboard:success="onCopy" type="primary" size="mini">复制链接
          </el-button>
          <router-link :to="{path:'/marketingmanager/mallmarketing/redenvelopedetail',query:{id:scope.row.id}}">
            <el-button type="success" size="mini">查看</el-button>
          </router-link>
          <el-button size="mini" style="margin: 0" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.pageNum+1" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog title="添加红包" :visible.sync="showAdd">
      <el-alert style="margin-bottom: 10px" title="注意！ 自营商品自动参加，店铺商品需要在各自的红包活动列表中进行参与。" type="warning" :closable="false"
                show-icon></el-alert>
      <el-form :model="redenvelopeForm" :rules="rules" ref="form" label-position="right" label-width="140px">
        <el-form-item prop="name">
          <span slot="label">红包名称</span>
          <el-input maxlength="45" v-model="redenvelopeForm.name"/>
        </el-form-item>
        <el-form-item prop="num">
          <span slot="label">生成个数</span>
          <el-input maxlength="5" v-model="redenvelopeForm.num"/>
        </el-form-item>
        <el-form-item prop="limitNum">
          <span slot="label">每人可领个数</span>
          <el-input maxlength="5" v-model="redenvelopeForm.limitNum"/>
        </el-form-item>
        <el-form-item>
          <span slot="label">优惠金额</span>
          <el-col :span="11">
            <el-form-item prop="fullPrice">
              <el-input maxlength="10" v-model="redenvelopeForm.fullPrice">
                <template slot="prepend">满</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="12">
            <el-form-item prop="price">
              <el-input maxlength="10" v-model="redenvelopeForm.price">
                <template slot="prepend">减</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item prop="signupTime">
          <span slot="label">店铺报名截止时间</span>
          <el-date-picker
            style="width: 100%"
            v-model="redenvelopeForm.signupTime"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择报名截止时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="timeValue">
          <span slot="label">促销时间</span>
          <el-date-picker
            style="width: 100%"
            class="search-datepicker"
            size="medium"
            :clearable="false"
            v-model="redenvelopeForm.timeValue"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="红包描述">
          <el-input maxlength="2048" v-model="redenvelopeForm.desc" type="textarea"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAdd = false">取消</el-button>
        <el-button type="primary" @click="addRedenvelope()">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {redenvelopeList, copyRedEnvelope, deleteRedEnvelope, addRedEnvelope} from '@/api/redenvelopelist';

  import {integer, priceValidator, isMoney} from '@/utils/validate';

  export default {
    data() {

      const fullPriceValidator = (rule, value, callback) => {
        if (!isMoney(value)) {
          callback(new Error('请输入合法金额'));
        } else {
          const price = this.redenvelopeForm.fullPrice ? this.redenvelopeForm.fullPrice : '0';
          if (parseFloat(value) >= parseFloat(price)) {
            callback(new Error('减的金额需小于满的金额'));
          } else {
            callback();
          }
        }
      }

      // 生成张数校验器
      const numValidator = (rule, value, callback) => {
        if (!integer(value)) {
          callback(new Error('请输入大于零的整数'));
        } else {
          callback();
        }
      }

      // 生成张数校验器
      const limitNumValidator = (rule, value, callback) => {
        const num = this.redenvelopeForm.num ? this.redenvelopeForm.num : '0';
        if (!integer(value)) {
          callback(new Error('请输入大于零的整数'));
        } else if (parseInt(value) > parseInt(num)) {
          callback(new Error('限领张数不能大于总张数'));
        } else {
          callback();
        }
      }


      return {
        rules: {
          name: [
            {
              required: true,
              message: '请输入红包名称',
              trigger: 'blur'
            }
          ],
          num: [
            {
              required: true,
              trigger: 'blur',
              validator: numValidator
            }
          ],
          limitNum: [
            {
              required: true,
              trigger: 'blur',
              validator: limitNumValidator
            }
          ],
          timeValue: [
            {
              required: true,
              message: '请输入促销时间',
              trigger: 'blur'
            }
          ],
          signupTime: [
            {
              required: true,
              message: '请输入店铺报名截止时间',
              trigger: 'blur'
            }
          ],
          price: [
            {
              required: true,
              trigger: 'blur',
              validator: fullPriceValidator
            }
          ],
          fullPrice: [
            {
              required: true,
              trigger: 'blur',
              validator: priceValidator
            }
          ],
        }, // 验证规则
        showAdd: false,// 是否展示添加红包
        redenvelopeForm: {
          desc: '',
          endTime: '',
          fullPrice: '',
          limitNum: '',
          name: '',
          num: '',
          price: '',
          signupTime: '',
          startTime: '',
          timeValue: ''
        },// 添加红包实体
        listLoading: true, // 加载中
        list: null, // 红包数据
        total: null, // 数据总数
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          name: '',
        }, // 查询参数
        selectedIds: [],// 选中的id
        isProcess: false// 是否处理中
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        redenvelopeList(this.listQuery).then((response) => {
          this.list = response.data;
          this.total = response.recordsTotal;
          this.listLoading = false
        })
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
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 0;
        this.listQuery.pageSize = val;
        this.getList();
      },
      // 批量删除红包二次确认
      batchDelete() {
        if (this.selectedIds && this.selectedIds.length > 0) {
          this.$confirm('是否确认删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.delRedenvelope(this.selectedIds);
          })
        } else {
          this.$message({
            message: '请至少选择一个红包',
            type: 'warning'
          })
        }
      },
      handleDelete(id) {
        this.$confirm('是否确认删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delRedenvelope(id);
        })
      },
      // 删除红包
      delRedenvelope(ids) {
        if (this.isProcess) {
          return;
        }
        this.isProcess = true;
        deleteRedEnvelope(ids.toString()).then(() => {
          this.isProcess = false;
          this.getList();
          this.selectedIds = [];
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        });
      },
      onCopy(e) {
        if (this.isProcess) {
          return;
        }
        this.isProcess = true;
        copyRedEnvelope(e.text).then(res => {
          this.isProcess = false;
          if (res == '0') {
            this.$message({
              message: '红包已过期',
              type: 'error'
            })
          } else if (res == '-1') {
            this.$message({
              message: '红包不存在',
              type: 'error'
            })
          } else {
            this.$copyText(res).then(() => {
                this.$message({
                  message: '复制成功',
                  type: 'success'
                })
              }, () => {
                this.$message({
                  message: '复制失败',
                  type: 'error'
                })
              }
            )
          }
        })
      },
      // 准备添加红包
      toAddRedenvelope() {
        this.showAdd = true;
        this.redenvelopeForm = {
          desc: '',
          endTime: '',
          fullPrice: '',
          limitNum: '',
          name: '',
          num: '',
          price: '',
          signupTime: '',
          startTime: '',
          timeValue: ''
        }
        if (this.$refs["form"]) {
          this.$refs["form"].resetFields();
        }
      },
      // 添加红包
      addRedenvelope() {
        this.$refs['form'].validate(valid => {
          if (!this.isProcess && valid) {
            this.isProcess = true;
            this.redenvelopeForm.startTime = this.redenvelopeForm.timeValue[0];
            this.redenvelopeForm.endTime = this.redenvelopeForm.timeValue[1];
            addRedEnvelope(this.redenvelopeForm).then((res) => {
              this.isProcess = false;
              if (res > 0) {
                this.showAdd = false;
                this.getList();
                this.$message({
                  type: 'success',
                  message: '创建成功!'
                });
              } else if (res == -1) {
                this.$message({
                  type: 'error',
                  message: '添加失败!'
                });
              } else if (res == -2) {
                this.$message({
                  type: 'error',
                  message: '限领张数不正确!'
                });
              } else if (res == -3) {
                this.$message({
                  type: 'error',
                  message: '限领张数不能大于总张数!'
                });
              } else if (res == -4) {
                this.$message({
                  type: 'error',
                  message: '开始时间不能大于结束时间!'
                });
              } else if (res == -5) {
                this.$message({
                  type: 'error',
                  message: '店铺报名截止时间大于开始时间!'
                });
              }
            })
          }
        });
      }
    }
  }
</script>
