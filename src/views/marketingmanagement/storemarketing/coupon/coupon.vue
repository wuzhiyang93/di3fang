<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input maxlength="64" v-model="listQuery.name" placeholder="优惠券名称" size="medium" style="width: 200px;"
                class="filter-item"/>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
      <br/>
      <el-button class="filter-item" size="medium" style="margin-left: 5px;" type="primary" icon="el-icon-plus"
                 @click="toAddCoupon">添加优惠券
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
      <el-table-column label="优惠券名称" min-width="100">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 1">满减</span>
          <span v-if="scope.row.type == 2">直降</span>
        </template>
      </el-table-column>
      <el-table-column label="获得方式">
        <template slot-scope="scope">
          <span v-if="scope.row.useType == 1">领取</span>
          <span v-if="scope.row.useType == 2">发放</span>
        </template>
      </el-table-column>
      <el-table-column label="可领张数">
        <template slot-scope="scope">{{ scope.row.limitNum }}</template>
      </el-table-column>
      <el-table-column label="开始时间" width="160">
        <template slot-scope="scope">{{ scope.row.startTime }}</template>
      </el-table-column>
      <el-table-column label="结束时间" width="160">
        <template slot-scope="scope">{{ scope.row.endTime }}</template>
      </el-table-column>
      <el-table-column label="操作" width="305">
        <template slot-scope="scope">
          <el-button v-if="scope.row.useType != 2" v-clipboard:copy="scope.row.id" v-clipboard:success="onCopy"
                     type="primary" size="mini">复制链接
          </el-button>
          <router-link :to="{path:'/marketingmanager/storemarketing/coupondetail',query:{id:scope.row.id}}">
            <el-button type="success" size="mini">查看</el-button>
          </router-link>
          <el-button v-if="scope.row.useType != 2" type="primary" @click="exportCoupon(scope.row.id)" size="mini">导出券码
          </el-button>
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

    <el-dialog title="添加优惠券" :visible.sync="showAdd">
      <el-form label-position="right" :model="couponForm" :rules="rules" ref="form" label-width="120px">
        <el-form-item prop="name">
          <span slot="label">优惠券名称</span>
          <el-input maxlength="128" v-model="couponForm.name"/>
        </el-form-item>
        <el-form-item prop="num">
          <span slot="label">生成张数</span>
          <el-input v-model="couponForm.num" maxlength="5"/>
        </el-form-item>
        <el-form-item prop="limitNum">
          <span slot="label">每人可领张数</span>
          <el-input v-model="couponForm.limitNum" maxlength="5"/>
        </el-form-item>
        <el-form-item label="选择规则">
          <el-select v-model="couponForm.type" placeholder="请选择规则">
            <el-option label="满减" value="1"/>
            <el-option label="直降" value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <span slot="label"><span class="labelImportant">*</span>优惠金额</span>
          <el-col v-if="couponForm.type=='1'" :span="11">
            <el-form-item prop="fullPrice">
              <el-input v-model="couponForm.fullPrice" maxlength="8">
                <template slot="prepend">满</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="couponForm.type=='1'" :span="1">&nbsp;</el-col>
          <el-col :span="12">
            <el-form-item prop="price">
              <el-input v-model="couponForm.price" maxlength="8">
                <template slot="prepend">减</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="获得方式">
          <el-select v-model="couponForm.useType" placeholder="请选择获得方式">
            <el-option label="领取" value="1"/>
            <el-option label="发放" value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="timeValue">
          <span slot="label">促销时间</span>
          <el-date-picker
            style="width: 355px"
            class="search-datepicker"
            size="medium"
            :clearable="false"
            v-model="couponForm.timeValue"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="促销描述">
          <el-input v-model="couponForm.desc" maxlength="2048" type="textarea"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAdd = false">取消</el-button>
        <el-button type="primary" @click="addCoupon">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {queryCoupon, copyCoupon, exportCoupon, deleteCoupon, addCoupon} from '@/api/coupon';
  import {integer, priceValidator, isMoney} from '@/utils/validate';

  export default {
    data() {

      const fullPriceValidator = (rule, value, callback) => {
        if (!isMoney(value)) {
          callback(new Error('请输入合法金额'));
        } else {
          // 如果是直降则直接返回
          if (this.couponForm.type == 2) {
            callback();
          } else {
            // 如果是满减则判断减的价格不能大于满的价格
            const price = this.couponForm.fullPrice ? this.couponForm.fullPrice : '0';
            if (parseFloat(value) >= parseFloat(price)) {
              callback(new Error('减的金额需小于满的金额'));
            } else {
              callback();
            }
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
        const num = this.couponForm.num ? this.couponForm.num : '0';
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
              message: '请输入优惠卷名称',
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
        showAdd: false,// 是否展示添加优惠卷
        couponForm: {
          name: '',
          num: '',
          limitNum: '',
          type: '1',
          useType: '1',
          startTime: '',
          endTime: '',
          desc: '',
          fullPrice: '',
          price: '',
          timeValue: ''
        },// 添加优惠卷的表单
        isProcess: false,// 接口是否处理中
        listLoading: true, // 加载中
        list: null, // 优惠卷数据
        total: null, // 数据总数
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          name: '',
        }, // 查询参数
        selectedIds: [] // 选择的id
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        queryCoupon(this.listQuery).then((response) => {
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
      // 导出优惠卷
      exportCoupon(id) {
        if (this.isProcess) {
          return;
        }
        this.isProcess = true;
        exportCoupon(id).then(res => {
          this.isProcess = false;
          let blob = new Blob([res], {type: "application/vnd.ms-excel"});
          let objectUrl = URL.createObjectURL(blob);
          window.location.href = objectUrl;
        });
      },
      // 复制链接
      onCopy(e) {
        if (this.isProcess) {
          return;
        }
        this.isProcess = true;
        copyCoupon(e.text).then(res => {
          this.isProcess = false;
          if (res == '0') {
            this.$message({
              message: '优惠券已过期',
              type: 'error'
            })
          } else if (res == '-1') {
            this.$message({
              message: '优惠券不存在',
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
      // 批量删除优惠卷二次确认
      batchDelete() {
        if (this.selectedIds && this.selectedIds.length > 0) {
          this.$confirm('是否确认删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.delCoupon(this.selectedIds);
          })
        } else {
          this.$message({
            message: '请至少选择一个优惠卷',
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
          this.delCoupon(id);
        })
      },
      // 删除优惠卷
      delCoupon(ids) {
        if (this.isProcess) {
          return;
        }
        this.isProcess = true;
        deleteCoupon(ids.toString()).then(() => {
          this.isProcess = false;
          this.getList();
          this.selectedIds = [];
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        });
      },
      // 准备添加优惠卷
      toAddCoupon() {
        this.showAdd = true;
        this.couponForm = {
          name: '',
          num: '',
          limitNum: '',
          type: '1',
          useType: '1',
          startTime: '',
          endTime: '',
          desc: '',
          fullPrice: '',
          price: '',
          timeValue: ''
        }
        if (this.$refs["form"]) {
          this.$refs["form"].resetFields();
        }
      },
      // 添加优惠卷
      addCoupon() {
        this.$refs['form'].validate(valid => {
          if (!this.isProcess && valid) {
            this.isProcess = true;
            this.couponForm.startTime = this.couponForm.timeValue[0];
            this.couponForm.endTime = this.couponForm.timeValue[1];
            // 满减
            if (this.couponForm.type == 1) {
              this.couponForm.couponFull = {
                fullPrice: this.couponForm.fullPrice,
                price: this.couponForm.price
              }
            } else {
              // 直降
              this.couponForm.couponFall = {
                price: this.couponForm.price
              }
            }

            addCoupon(this.couponForm).then((res) => {
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
              }
            })
          }
        });
      }
    }
  }
</script>
