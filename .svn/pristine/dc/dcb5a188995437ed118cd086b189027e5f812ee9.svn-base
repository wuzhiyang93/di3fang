<template>
  <div class="app-container">
    <div class="filter-container" style="display: flex; justify-content: space-between">
      <el-button class="filter-item" size="medium" type="primary" icon="el-icon-plus" @click="toAddCustomerLevel">
        添加会员等级
      </el-button>
      <el-switch
        style="margin-top: 15px"
        v-model="memberPriceStatus"
        active-color="#13ce66"
        inactive-color="#ff4949"
        inactive-text="是否启用"
        active-value="0"
        inactive-value="1"
        @change="setMemberPriceStatus($event)">
      </el-switch>
    </div>

    <el-table
      :data="customerLevelList"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="等级名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="需消费金额(元)">
        <template slot-scope="scope">{{ scope.row.minMoney }}~{{ scope.row.maxMoney }}</template>
      </el-table-column>
      <el-table-column label="会员折扣">
        <template slot-scope="scope">{{ scope.row.discount*100 }}%</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="toUpdateCustomerLevel(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="toDeleteCustomerLevel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="DiaType==1?'添加会员等级':'修改会员等级'" :visible.sync="showDia">
      <el-form label-position="right" :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item prop="name">
          <span slot="label">等级名称</span>
          <el-input v-model="form.name" maxlength="10"/>
        </el-form-item>
        <el-form-item>
          <span slot="label"><span class="labelImportant">*</span>需消费金额</span>
          <el-tooltip class="item" effect="dark" content="会员消费金额达到此标准最低分值后会自动升级为当前等级" placement="right">
            <div style="display: inline-block">
              <el-col :span="11">
                <el-form-item prop="minMoney">
                  <el-input type="number" v-model="form.minMoney" maxlength="11">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" style="text-align: center">~</el-col>
              <el-col :span="11">
                <el-form-item prop="maxMoney">
                  <el-input type="number" v-model="form.maxMoney" maxlength="11">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </div>
          </el-tooltip>
        </el-form-item>
        <el-form-item prop="showDiscount">
          <span slot="label">会员折扣</span>
          <el-input type="number" v-model="form.showDiscount" maxlength="2" style="width: 200px">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDia = false">取消</el-button>
        <el-button type="primary" @click="DiaType==1?addCustomerLevel():updateCustomerLevel()">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {getBaseInfoSet} from '@/api/infoset';
  import {specstrValidator, digitsValidator, oneToHundredDigitsValidator} from '@/utils/validate';
  import {
    queryCustomerLevelList,
    setMemberPriceStatus,
    addCustomerLevel,
    queryCustomerLevelById,
    updateCustomerLevel,
    deleteCustomerLevel
  } from '@/api/customerlevel';

  export default {
    data() {
      // 校验最低金额
      const checkMinMoney = (rule, value, callback) => {
        if (value === 0) {
          callback();
        } else {
          if (!value) {
            return callback(new Error('请输入非负整数'));
          }
          if (!/^\d+$/.test(value)) {
            callback(new Error('请输入非负整数'));
          } else {
            callback();
          }
        }
      };
      return {
        isProcess: false, // 接口是否处理中
        memberPriceStatus: '', // 会员价是否启用标识 0 启用 1 不启用
        showDia: false, // 是否显示新增修改弹窗标识
        DiaType: 1, // 判断新增还是修改标识，1新增，2修改
        listLoading: true, // 列表加载标识
        customerLevelList: null, // 列表数据集合
        total: null, // 总记录数
        form: { // 提交form表单
          id: '', // 会员等级id
          name: '', // 会员等级名称
          minMoney: '', // 最低的消费金额
          maxMoney: '', // 最高的消费金额
          discount: '', // 会员折扣
          showDiscount: '',// 页面显示会员折扣
        },
        rules: { // 校验规则
          name: [
            {
              required: true,
              trigger: 'blur',
              validator: specstrValidator,
            }
          ],
          minMoney: [
            {
              required: true,
              trigger: 'blur',
              validator: checkMinMoney,
            }
          ],
          maxMoney: [
            {
              required: true,
              trigger: 'blur',
              validator: digitsValidator,
            }
          ],
          showDiscount: [
            {
              required: true,
              trigger: 'blur',
              validator: oneToHundredDigitsValidator,
            }
          ]
        },
      }
    },
    // 初始化方法
    created() {
      this.queryBaseInfoSet();
      this.getList();
    },
    methods: {
      // 查询会员价启用状态
      queryBaseInfoSet() {
        getBaseInfoSet().then(res => {
          this.memberPriceStatus = res.memberPriceStatus;
        });
      },
      // 查询会员等级列表
      getList() {
        this.listLoading = true;
        queryCustomerLevelList().then((response) => {
          this.customerLevelList = response;
          this.listLoading = false
        })
      },
      // 设置会员价启用状态
      setMemberPriceStatus($event) {
        if (!this.isProcess) {
          this.isProcess = true;
          setMemberPriceStatus($event).then(res => {
            this.isProcess = false;
            if (res == 1) {
              this.$message({
                type: 'success',
                message: '设置成功!'
              });
            } else {
              this.$message({
                type: 'error',
                message: '设置失败!'
              })
            }
          });
        }
      },
      // 准备新增会员等级
      toAddCustomerLevel() {
        this.showDia = true;
        this.DiaType = 1;
        this.resetForm();
        if (this.$refs["form"]) {
          this.$refs["form"].resetFields();
        }
      },
      // 新增会员等级
      addCustomerLevel() {
        this.$refs['form'].validate(valid => {
          if (!this.isProcess && valid) {
            this.isProcess = true;
            this.form.discount = parseInt(this.form.showDiscount) / 100;
            addCustomerLevel(this.form).then(res => {
              this.isProcess = false;
              if (res == 1) {
                this.showDia = false;
                this.getList();
                this.$message({
                  type: 'success',
                  message: '创建成功!'
                });
              } else if (res == -1) {
                this.$message({
                  type: 'error',
                  message: '消费金额段已经存在,请重新输入!'
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
      // 准备更新会员等级
      toUpdateCustomerLevel(id) {
        queryCustomerLevelById(id).then(res => {
          if (this.$refs["form"]) {
            this.$refs["form"].resetFields();
          }
          this.form = { // 提交form表单
            id: res.id, // 会员等级id
            name: res.name, // 会员等级名称
            minMoney: res.minMoney, // 最低的消费金额
            maxMoney: res.maxMoney, // 最高的消费金额
            discount: res.discount, // 会员折扣
            showDiscount: res.discount * 100,// 页面显示会员折扣
          };
          this.DiaType = 2;
          this.showDia = true;
        })
      },
      // 更新会员等级
      updateCustomerLevel() {
        this.$refs['form'].validate(valid => {
          if (valid && !this.isProcess) {
            this.form.discount = parseInt(this.form.showDiscount) / 100;
            this.isProcess = true;
            updateCustomerLevel(this.form).then(res => {
              this.isProcess = false;
              if (res == 1) {
                this.showDia = false;
                this.getList();
                this.$message({
                  type: 'success',
                  message: '更新成功!'
                });
              } else if (res == -1) {
                this.$message({
                  type: 'error',
                  message: '消费金额段已经存在,请重新输入!'
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
      // 删除会员等级二次确认
      toDeleteCustomerLevel(id) {
        this.$confirm('是否确认删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteCustomerLevel(id);
        })
      },
      // 删除会员等级
      deleteCustomerLevel(id) {
        if (!this.isProcess) {
          this.isProcess = true;
          deleteCustomerLevel(id).then(res => {
            this.isProcess = false;
            if (res == 1) {
              this.getList();
              this.delIds = [];
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            } else {
              this.$message({
                type: 'error',
                message: '删除失败!'
              })
            }
          });
        }
      },
      // 重置form表单
      resetForm() {
        this.form = {id: '', name: '', minMoney: '', maxMoney: '', discount: '', showDiscount: ''};
      },
    }
  }
</script>
