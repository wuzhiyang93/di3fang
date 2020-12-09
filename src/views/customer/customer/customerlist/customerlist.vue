<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filterBox">
        <p>手机号</p>
        <el-input placeholder="手机号" v-model="listQuery.mobile" maxlength="15" size="medium" style="width: 150px;"
                  class="filter-item"/>
      </div>
      <div class="filterBox">
        <p>是否手机验证</p>
        <el-select class="filter-item" v-model="listQuery.isMobileVerification" size="medium" style="width: 160px"
                   placeholder="请选择是否手机验证">
          <el-option label="全部" value=""></el-option>
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </div>
      <div class="filterBox">
        <p>是否邮箱验证</p>
        <el-select class="filter-item" v-model="listQuery.isEmailVerification" size="medium" style="width: 160px"
                   placeholder="请选择是否邮箱验证">
          <el-option label="全部" value=""></el-option>
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </div>
      <div class="filterBox">
        <p>账户状态</p>
        <el-select class="filter-item" v-model="listQuery.status" size="medium" style="width: 160px"
                   placeholder="请选择账户状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="正常" value="1"></el-option>
          <el-option label="冻结" value="2"></el-option>
        </el-select>
      </div>
      <div class="filterBox">
        <p>账户类型</p>
        <el-select class="filter-item" v-model="listQuery.type" size="medium" style="width: 160px"
                   placeholder="请选择账户类型">
          <el-option label="全部" value=""></el-option>
          <el-option label="普通" value="1"></el-option>
          <el-option label="商家" value="2"></el-option>
        </el-select>
      </div>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
      <div>
        <el-button class="filter-item" size="medium" type="primary" icon="el-icon-plus" @click="toAddCustomer()">添加会员
        </el-button>
        <el-button class="filter-item" size="medium" style="margin-left: 5px;" type="danger" icon="el-icon-delete"
                   @click="batchDelete()">批量删除
        </el-button>
        <el-button class="filter-item" size="medium" style="margin-left: 5px;" type="primary"
                   icon="el-icon-chat-dot-round" @click="toSendLetter()">发送通知
        </el-button>
        <el-dropdown class="filter-item" style="margin-left: 5px;">
          <el-button size="medium" type="primary">导出会员<i class="el-icon-arrow-down el-icon--right"></i></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="exportAll()">导出所有</el-dropdown-item>
            <el-dropdown-item @click.native="exportSelected()">导出选中</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
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
      <el-table-column label="手机号" width="120">
        <template slot-scope="scope">{{ scope.row.mobile }}</template>
      </el-table-column>
      <el-table-column label="等级">
        <template slot-scope="scope">{{ scope.row.customerLevel.name }}</template>
      </el-table-column>
      <el-table-column label="手机验证" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isMobileVerification == '1'" type="success">是</el-tag>
          <el-tag v-if="scope.row.isMobileVerification == '0'" type="info">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="邮箱验证" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isEmailVerification == '1'" type="success">是</el-tag>
          <el-tag v-if="scope.row.isEmailVerification == '0'" type="info">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == '1'" type="success">正常</el-tag>
          <el-tag v-if="scope.row.status != '1'" type="danger">冻结</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="类型" width="50">
        <template slot-scope="scope">
          <span v-if="scope.row.type == '1'">普通</span>
          <span v-if="scope.row.type != '1'">商家</span>
        </template>
      </el-table-column>
      <el-table-column label="预存款总额" width="100">
        <template slot-scope="scope">{{ scope.row.allPredeposit.toFixed(2) }}</template>
      </el-table-column>
      <el-table-column label="注册时间" width="165">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="操作" align="left" width="200">
        <template slot-scope="scope">
          <router-link :to="{path:'/customer/customer/customerdetail',query:{id:scope.row.id}}">
            <el-button type="success" size="mini">详情</el-button>
          </router-link>
          <el-button type="primary" size="mini" @click="toUpdate(scope.row.id)">编辑</el-button>
          <el-button size="mini" style="margin-left: 0" type="danger" @click="deleteDialog(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.pageNum+1" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="isAdd==0?'添加会员':'修改会员'" :visible.sync="customerFormFlag">
      <el-form :model="customerForm" :rules="customerRules" ref="customerForm" label-position="right"
               label-width="100px">
        <el-form-item v-if="isAdd==0" prop="mobile">
          <span slot="label">手机号码</span>
          <el-input v-model="customerForm.mobile" maxlength="11"/>
        </el-form-item>
        <el-form-item label="推荐码">
          <el-input v-model="customerForm.recommondCode" maxlength="7"/>
        </el-form-item>
        <el-form-item v-if="isAdd==0" prop="email" label="邮箱">
          <el-input v-model="customerForm.email" maxlength="32"/>
        </el-form-item>
        <el-form-item v-if="isAdd==0" prop="password">
          <span slot="label">密码</span>
          <el-input type="password" v-model="customerForm.password" maxlength="20"/>
        </el-form-item>
        <el-form-item v-if="isAdd==0" prop="againpassword">
          <span slot="label">重复密码</span>
          <el-input v-model="customerForm.againpassword" type="password" maxlength="20"/>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            :action="uploadApi"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :headers="headers"
            name="image"
            accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO"
          >
            <img v-if="customerForm.image" :src="customerForm.image" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="customerForm.gender">
            <el-radio :label='0'>保密</el-radio>
            <el-radio :label='1'>男</el-radio>
            <el-radio :label='2'>女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="customerForm.releName" maxlength="10"/>
        </el-form-item>
        <el-form-item prop="cardId" label="身份证号码">
          <el-input v-model="customerForm.cardId" maxlength="32"/>
        </el-form-item>
        <el-form-item label="所在地区">
          <el-cascader
            clearable
            v-model="areaSelectedOptions"
            size="medium"
            style="width: 100%"
            :props="props">
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="customerForm.detailAddress" maxlength="128"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="customerFormFlag = false">取消</el-button>
        <el-button type="primary" @click="isAdd==0?save():update()">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="发送通知" :visible.sync="messageDialogVisible">
      <el-form :model="letterForm" :rules="letterRules" ref="letterForm" label-position="right" label-width="80px">
        <el-form-item prop="title">
          <span slot="label">标题</span>
          <el-input v-model="letterForm.title" maxlength="1000"/>
        </el-form-item>
        <el-form-item prop="content">
          <span slot="label">内容</span>
          <el-input v-model="letterForm.content" type="textarea" :rows="3" maxlength="2000"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="messageDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="sendLetter()">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

  import {
    queryCustomers,
    deleteCustomers,
    addstationLetters,
    exportAllCustomer,
    exportCheckedCustomer,
    queryAllProvinces,
    queryCityByProvinceId,
    queryDistrictByCityId,
    addCustomer,
    checkMobileExist,
    checkEmailExist,
    queryCustomerById,
    updateCustomer
  } from '@/api/customerlist';

  import {isMobilePhone, isEmail, isIdCardNo} from '@/utils/validate';
  import {getToken} from '@/utils/token';

  export default {
    data() {
      const mobileValidator = (rule, value, callback) => {
        if (!isMobilePhone(value)) {
          callback(new Error('请输入正确的手机号码'));
        } else {
          checkMobileExist(value).then(res => {
            if (res > 0) {
              callback(new Error('手机号码已经存在'));
            } else {
              callback();
            }
          })
        }
      }

      const emailValidator = (rule, value, callback) => {
        if (!value) {
          callback();
        } else {
          // 是否是邮箱
          if (!isEmail(value)) {
            callback(new Error('请输入正确的邮箱'));
          } else {
            checkEmailExist(value).then(res => {
              if (res > 0) {
                callback(new Error('邮箱已经存在'));
              } else {
                callback();
              }
            })
          }
        }
      }


      const cardValidator = (rule, value, callback) => {
        if (!value) {
          callback();
        } else {
          if (!isIdCardNo(value)) {
            callback(new Error('请输入正确的身份证号码'));
          } else {
            callback();
          }
        }
      }

      const passwordValidator = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码至少6个字符'));
        } else {
          callback();
        }
      }

      const againPasswordValidator = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码至少6个字符'));
        } else if (value != this.customerForm.password) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      }

      return {
        isAdd: 0,// 是否是添加 0 添加 1 修改
        uploadApi: process.env.UPLOAD_API,  // 上传图片api
        headers: {
          Authorization: 'Bearer ' + getToken()
        }, // 认证的头部
        customerRules: {
          mobile: [
            {
              required: true,
              trigger: 'blur',
              validator: mobileValidator
            }
          ],
          email: [
            {
              trigger: 'blur',
              validator: emailValidator
            }
          ],
          password: [
            {
              required: true,
              trigger: 'blur',
              validator: passwordValidator
            }
          ],
          againpassword: [
            {
              required: true,
              trigger: 'blur',
              validator: againPasswordValidator
            }
          ],
          cardId: [
            {
              trigger: 'blur',
              validator: cardValidator
            }
          ],
        },
        areaSelectedOptions: [], //地区数组 id
        customerFormFlag: false,// 会员表单弹出标记
        customerForm: {
          id: '',
          cardId: '',
          city: '',
          county: '',
          detailAddress: '',
          email: '',
          gender: 0,
          image: '',
          mobile: '',
          password: '',
          againpassword: '',
          province: '',
          recommondCode: '',
          releName: '',
          userName: ''
        },//会员表单
        letterRules: {
          title: [
            {
              required: true,
              message: '请输入标题',
              trigger: 'blur'
            }
          ],
          content: [
            {
              required: true,
              message: '请输入内容',
              trigger: 'blur'
            }
          ]
        }, // 验证规则
        letterForm: {
          title: '',
          content: ''
        }, // 发送的站内信实体
        messageDialogVisible: false,// 站内信显示标记
        selectedIds: [],// 选择的会员id
        isProcess: false, // 接口是否处理中
        listLoading: true, // 加载中
        list: null, // 会员数据
        total: null, // 数据总数
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          mobile: '',
          email: '',
          isMobileVerification: '',
          isEmailVerification: '',
          status: '',
          type: ''
        }, // 查询参数
        props: {
          lazy: true,
          lazyLoad(node, resolve) {
            const {level} = node;
            // 查询全部的省
            if (level == 0) {
              queryAllProvinces().then((res) => {
                let node = [];
                if (res && res.length > 0) {
                  node = res.map(item => {
                    return {
                      value: item.id,
                      label: item.name,
                      leaf: false
                    };
                  })
                }
                resolve(node);
              })
            } else if (level == 1) {
              // 查询市
              queryCityByProvinceId(node.value).then(res => {
                let node = [];
                if (res && res.length > 0) {
                  node = res.map(item => {
                    return {
                      value: item.id,
                      label: item.name,
                      leaf: false
                    };
                  })
                }
                resolve(node);
              })
            } else if (level == 2) {
              queryDistrictByCityId(node.value).then(res => {
                let node = [];
                if (res && res.length > 0) {
                  node = res.map(item => {
                    return {
                      value: item.id,
                      label: item.name,
                      leaf: true
                    };
                  })
                }
                resolve(node);
              })
            }
          }
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        queryCustomers(this.listQuery).then((response) => {
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
      // 删除会员
      deleteDialog(id) {
        this.$confirm('确定要删除此用户吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delCustomer(id);
        })
      },
      //删除会员
      delCustomer(id) {
        if (this.isProcess) {
          return;
        }
        this.isProcess = true;
        deleteCustomers(id.toString()).then(res => {
          this.isProcess = false;
          this.selectedIds = [];
          this.handleFilter();
          if (res > 0) {
            this.$message({
              type: 'success',
              message: '删除用户成功!'
            })
          } else {
            this.$message({
              type: 'error',
              message: '删除用户失败!'
            })
          }
        })
      },
      // 批量删除会员二次确认
      batchDelete() {
        if (this.selectedIds && this.selectedIds.length > 0) {
          this.$confirm('是否确认删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.delCustomer(this.selectedIds);
          })
        } else {
          this.$message({
            message: '请至少选择一个会员',
            type: 'warning'
          })
        }
      },
      // 准备发送通知
      toSendLetter() {
        if (this.selectedIds && this.selectedIds.length > 0) {
          this.messageDialogVisible = true;
          this.letterForm = {
            title: '',
            content: ''
          }
          if (this.$refs["letterForm"]) {
            this.$refs["letterForm"].resetFields();
          }
        } else {
          this.$message({
            message: '请至少选择一个会员',
            type: 'warning'
          })
        }
      },
      // 发送通知
      sendLetter() {
        this.$refs["letterForm"].validate(valid => {
          if (!this.isProcess && valid) {
            this.isProcess = true;
            addstationLetters(this.selectedIds.map(id => {
              return {customerId: id, content: this.letterForm.content, title: this.letterForm.title}
            })).then(res => {
              this.isProcess = false;
              this.selectedIds = [];
              this.messageDialogVisible = false;
              this.handleFilter();
              if (res > 0) {
                this.$message({
                  type: 'success',
                  message: '发送成功'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: '发送失败'
                });
              }
            })
          }
        })
      },
      // 导出所有会员
      exportAll() {
        exportAllCustomer().then(res => {
          let blob = new Blob([res], {type: "application/vnd.ms-excel"});
          let objectUrl = URL.createObjectURL(blob);
          window.location.href = objectUrl;
        });
      },
      // 导出选中的会员
      exportSelected() {
        if (this.selectedIds && this.selectedIds.length > 0) {
          exportCheckedCustomer(this.selectedIds.toString()).then(res => {
            let blob = new Blob([res], {type: "application/vnd.ms-excel"});
            let objectUrl = URL.createObjectURL(blob);
            window.location.href = objectUrl;
          });
        } else {
          this.$message({
            message: '请至少选择一个会员！',
            type: 'warning'
          })
        }
      },
      // 准备添加会员
      toAddCustomer() {
        this.isAdd = 0;
        if (this.$refs["customerForm"]) {
          this.$refs["customerForm"].resetFields();
        }
        this.areaSelectedOptions = [];
        this.customerFormFlag = true;
        this.customerForm = {
          id: '',
          cardId: '',
          city: '',
          county: '',
          detailAddress: '',
          email: '',
          gender: 0,
          image: '',
          mobile: '',
          againpassword: '',
          password: '',
          province: '',
          recommondCode: '',
          releName: '',
          userName: ''
        }
      },
      // 上传图片回调
      uploadSuccess(res) {
        this.customerForm.image = res;
      },
      // 保存会员
      save() {
        this.$refs["customerForm"].validate(valid => {
          if (!this.isProcess && valid) {
            if (this.areaSelectedOptions && this.areaSelectedOptions.length > 0) {
              this.customerForm.province = this.areaSelectedOptions[0];
              this.customerForm.city = this.areaSelectedOptions[1];
              this.customerForm.county = this.areaSelectedOptions[2];
            }
            this.customerForm.userName = this.customerForm.mobile;
            this.isProcess = true;
            addCustomer(this.customerForm).then((res) => {
              this.isProcess = false;
              if (res == -10) {
                this.$message({
                  type: 'error',
                  message: '推荐人不存在'
                });
              } else if (res == 0) {
                this.$message({
                  type: 'error',
                  message: '添加会员失败'
                });
              } else {
                this.handleFilter();
                this.customerFormFlag = false;
                this.$message({
                  type: 'success',
                  message: '添加会员成功'
                });
              }
            })
          }
        });
      },
      // 准备更新
      toUpdate(id) {
        this.areaSelectedOptions = [];
        this.isAdd = 1;
        queryCustomerById(id).then(res => {
          this.customerForm = {
            id: res.id,
            cardId: res.cardId,
            city: res.city,
            county: res.county,
            detailAddress: res.detailAddress,
            gender: parseInt(res.gender),
            image: res.image,
            province: res.province,
            recommondCode: res.recommondCode,
            releName: res.releName
          }
          if (res.province) {
            this.areaSelectedOptions.push(res.province);
            this.areaSelectedOptions.push(res.city);
            this.areaSelectedOptions.push(res.county);
          }
          this.customerFormFlag = true;
        })
      },
      // 更新会员
      update() {
        this.$refs["customerForm"].validate(valid => {
          if (!this.isProcess && valid) {
            if (this.areaSelectedOptions && this.areaSelectedOptions.length > 0) {
              this.customerForm.province = this.areaSelectedOptions[0];
              this.customerForm.city = this.areaSelectedOptions[1];
              this.customerForm.county = this.areaSelectedOptions[2];
            }
            this.isProcess = true;
            delete this.customerForm.email;
            delete this.customerForm.againpassword;
            delete this.customerForm.password;
            delete this.customerForm.mobile;
            delete this.customerForm.userName;

            updateCustomer(this.customerForm).then((res) => {
              this.isProcess = false;
              if (res == -2) {
                this.$message({
                  type: 'error',
                  message: '已经绑定过推荐码'
                });
              } else if (res == -3) {
                this.$message({
                  type: 'error',
                  message: '推荐人不存在'
                });
              } else if (res == -4) {
                this.$message({
                  type: 'error',
                  message: '推荐人不能是自己'
                });
              } else if (res == 1) {
                this.handleFilter();
                this.customerFormFlag = false;
                this.$message({
                  type: 'success',
                  message: '修改会员成功'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: '修改会员失败'
                });
              }
            })
          }
        });
      }
    }
  }
</script>
