<template>
  <div class="app-container">
    <el-steps :active="0" align-center finish-status="success">
      <el-step title="创建/选择账号" description=""></el-step>
      <el-step title="填写商家信息" description=""></el-step>
    </el-steps>
    <el-form label-position="right" :model="customerForm" :rules="Rules" ref="customerForm" label-width="100px"
             style="margin: 20px auto; width: 350px">
      <el-form-item>
        <span slot="label"><span class="labelImportant">*</span>生成方式</span>
        <el-select v-model="typeValue" style="width: 250px" @change="typeChange">
          <el-option label="创建账号" value="0"></el-option>
          <el-option label="选择账号" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="typeValue == '0'" prop="userName">
        <span slot="label">用户手机号</span>
        <el-input maxlength="11" v-model="customerForm.userName"/>
      </el-form-item>
      <el-form-item v-if="typeValue == '0'" prop="password">
        <span slot="label">密码</span>
        <el-input type="password" minlength="6" v-model="customerForm.password" maxlength="20"/>
      </el-form-item>
    </el-form>

    <el-form label-position="right" label-width="100px" style="margin: 20px auto; width: 350px">
      <el-form-item v-if="typeValue == '1'">
        <span slot="label"><span class="labelImportant">*</span>选择账号</span>
        <el-select v-model="accountValue" style="width: 250px" filterable
                   placeholder="请选择账号">
          <el-option
            v-for="item in noShopMobileArray"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-form label-position="right" label-width="100px" style="margin: 20px auto; width: 350px">
      <el-form-item>
        <el-button type="primary" @click="toFillAllStoreInfo">下一步</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>


  import {
    queryAllCustomerMobileForCreateStore, //查找所有没有开店的用户手机号
    addCustomer, //新增门店时新增会员
    checkMobileExist, //校验手机号码是否存在
  } from '@/api/addshopfirststep';

  import {
    mobilePhoneValidator, //手机号
  } from '@/utils/validate'


  export default {
    data() {
      //校验门店名称
      let checkMobile = (rule, value, callback) => {
        if (value && /^0?(13|15|18|14|17|19)[0-9]{9}$/.test(value)) {
          checkMobileExist(value).then((response) => {
            if (response > 0) {
              callback(new Error("手机号已存在"))
            } else {
              callback();
            }
          })
        } else {
          callback(new Error("请输入正确手机号"))
        }
      }

      return {
        isProcess: false, // 接口是否处理中
        typeValue: '0',//操作类型  0 新增 1 选现有
        accountValue: '',
        queryMobilelag: false,//查询没有开店用户的标记
        noShopMobileArray: [],//没有开店的手机号数组
        customerForm: {
          userName: '',
          password: ''
        },//新增用户表单
        Rules: { //添加支付类型 校验
          userName: [
            {
              required: true,
              trigger: 'blur',
              validator: checkMobile,
            }
          ],
          password: [
            {
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            }
          ]
        },
      }
    },
    created() {
    },

    methods: {
      //选择新增用户时 清楚校验样式
      toFillAllStoreInfo() {
        this.$refs['customerForm'].validate(valid => {
          if (valid) {
            if (this.isProcess) {
              return;
            }
            this.isProcess = true;
            if (this.typeValue == '0') {
              this.customerForm.mobile = this.customerForm.userName;
              addCustomer(this.customerForm).then((response) => {
                this.isProcess = false;
                if (response == 1) {
                  this.toAddPage(this.customerForm.userName);
                }
              });
            } else {
              this.isProcess = false;
              this.toAddPage(this.accountValue);
            }

          }
        })
      },
      //跳转添加页面
      toAddPage(mobile) {
        this.$router.push({
          path: '/shopmanagement/shopslist/addshopsecondstep',
          query: {mobile: mobile}
        });
      },

      //校验手机号是否存在
      checkMobile() {
        return false;
      },
      //选择操作类型
      typeChange() {
        if (this.typeValue == '0') {
          this.customerForm.userName = '';
          this.customerForm.password = '';
        } else {
          if (this.queryMobilelag) {
            return;
          }
          queryAllCustomerMobileForCreateStore().then((response) => {
            this.queryMobilelag = true;
            this.noShopMobileArray = response;
            if (this.noShopMobileArray.length != 0) {
              this.accountValue = this.noShopMobileArray[0];
            }
          })
        }
        if (this.$refs["customerForm"]) {
          this.$refs["customerForm"].resetFields();
        }
      }
    }


  }
</script>
