<template>
  <div class="app-container">
    <div style="line-height: 50px">门店信息</div>
    <div class="detailsTable">
      <el-row>
        <el-col :span="8">商家编号：{{info.id}}</el-col>
        <el-col :span="8">门店名称：{{info.storeName | isSubmit}}</el-col>
        <el-col :span="8">公司名称：{{info.companyName| isSubmit}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">公司邮箱：{{info.companyEmail| isSubmit}}</el-col>
        <el-col :span="8">公司电话：{{info.companyPhone| isSubmit}}</el-col>
        <el-col :span="8">公司地址： {{info.companyAddress| isSubmit}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">公司联系人：{{info.contactPerson| isSubmit}}</el-col>
        <el-col :span="8">联系人电话：{{info.contactPhone| isSubmit}}</el-col>
        <el-col :span="8">注册号(营业执照号)：{{info.busLicense| isSubmit}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">法人姓名：{{info.legalPerson| isSubmit}}</el-col>
        <el-col :span="8">法人身份证号：{{info.cardNo| isSubmit}}</el-col>
        <el-col :span="8">法人身份证电子版：
          <el-link
            v-show="showCarPic"
            :underline="false"
            type="success"
            :href="carPic"
            target="_blank"
            style="vertical-align: bottom"
          ><i class="el-icon-view el-icon--right"/> 查看
          </el-link>
          {{carPic | noPhoto}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">营业执照副本电子版：
          <el-link
            v-show="showBusLicensePic"
            :underline="false"
            type="success"
            :href="busLicensePic"
            target="_blank"
            style="vertical-align: bottom"
          ><i class="el-icon-view el-icon--right"/> 查看
          </el-link>
          {{busLicensePic | noPhoto}}
        </el-col>
        <el-col :span="8">组织机构代码证电子版：
          <el-link
            v-show="showOrgPic"
            :underline="false"
            type="success"
            :href="orgPic"
            target="_blank"
            style="vertical-align: bottom"
          ><i class="el-icon-view el-icon--right"/> 查看
          </el-link>
          {{orgPic | noPhoto}}
        </el-col>
        <el-col :span="8">税务登记证电子版：
          <el-link
            v-show="showTaxPic"
            :underline="false"
            type="success"
            :href="taxPic"
            target="_blank"
            style="vertical-align: bottom"
          ><i class="el-icon-view el-icon--right"/> 查看
          </el-link>
          {{taxPic | noPhoto}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">银行开户名：{{info.bankUserName| isSubmit}}</el-col>
        <el-col :span="8">公司银行账号：{{info.bankAccount| isSubmit}}</el-col>
        <el-col :span="8">开户行支行名称：{{info.bankName| isSubmit}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">开户行支行银行号：{{info.bankNumber| isSubmit}}</el-col>
        <el-col :span="8">开户行支行所在地：{{info.bankAddress| isSubmit}}</el-col>
        <el-col :span="8">银行开户许可证电子版：
          <el-link
            v-show="showBankPic"
            :underline="false"
            type="success"
            :href="bankPic"
            target="_blank"
            style="vertical-align: bottom"
          ><i class="el-icon-view el-icon--right"/> 查看
          </el-link>
          {{bankPic | noPhoto}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">营业时间：{{info.businessTime| isSubmit}}</el-col>
        <el-col :span="8">公交线路：{{info.busRoutes| isSubmit}}</el-col>
        <el-col :span="8">店铺头像：
          <el-link
            v-show="showAvatarPicture"
            :underline="false"
            type="success"
            :href="avatarPicture"
            target="_blank"
            style="vertical-align: bottom"
          ><i class="el-icon-view el-icon--right"/> 查看
          </el-link>
          {{avatarPicture | noPhoto}}
        </el-col>
      </el-row>
    </div>
    <div style="line-height: 50px">经营范围</div>
    <div class="detailsTable" style="padding: 10px 10px 5px 10px">
      <el-tag
        v-for="iteam in businessScopeags" v-bind:key="iteam"
      >{{iteam}}
      </el-tag>
    </div>
    <div style="text-align: center; margin-top: 20px">
      <router-link to="/shopmanagement/shopslist/shopslist">
        <el-button type="info" icon="el-icon-back">返回门店列表</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>

  import {
    storeDetailInfoByStoreId, //根据店铺id查询店铺详情信息
  } from '@/api/shopdetails';

  export default {
    data() {
      return {
        listLoading: true, //加载中
        info: {}, //店铺详情
        carPic: '', //法人身份证电子版
        busLicensePic: '',//营业执照电子版
        orgPic: '',//组织机构代码电子版
        taxPic: '', //税务登记证电子版
        bankPic: '',//银行开户许可证电子版
        avatarPicture: '',//店铺头像
        showCarPic: true, //法人身份证电子版组件显示标记
        showBusLicensePic: true,//营业执照显示标记
        showOrgPic: true,//组织机构代码电子版显示标记
        showTaxPic: true,//税务登记证电子版显示标记
        showBankPic: true,//银行开户许可证电子版显示标记
        showAvatarPicture: true,//店铺头像
        businessScopeags: [],//经营范围
      }
    },
    created() {
      this.getData()
    },

    filters: {
      isSubmit(value) {
        if (value == null || value == '') {
          return '未提交';
        }
        return value;
      },
      noPhoto(value) {
        if (value == null || value == '') {
          return '未提交';
        }
        return '';
      }
    },

    methods: {
      getData() {
        this.listLoading = true;
        storeDetailInfoByStoreId(this.$route.query.id).then((response) => {
          let resStoreInfo = response.storeInfo;

          //文本详情
          this.info = {
            id: resStoreInfo.id,
            storeName: resStoreInfo.storeName,
            companyName: resStoreInfo.companyName,
            companyEmail: resStoreInfo.companyEmail,
            companyPhone: resStoreInfo.companyPhone,
            companyAddress: resStoreInfo.companyAddress,
            contactPerson: resStoreInfo.contactPerson,
            contactPhone: resStoreInfo.contactPhone,
            busLicense: resStoreInfo.busLicense,
            legalPerson: resStoreInfo.legalPerson,
            cardNo: resStoreInfo.cardNo,
            bankUserName: resStoreInfo.bankUserName,
            bankAccount: resStoreInfo.bankAccount,
            bankName: resStoreInfo.bankName,
            bankNumber: resStoreInfo.bankNumber,
            bankAddress: resStoreInfo.bankAddress,
            businessTime: resStoreInfo.businessTime,
            busRoutes: resStoreInfo.busRoutes,
          }


          //法人身份证电子版
          if (resStoreInfo.carPic) {
            this.carPic = resStoreInfo.carPic;
          } else {
            this.showCarPic = false;
          }
          //营业执照副本电子版
          if (resStoreInfo.busLicensePic) {
            this.busLicensePic = resStoreInfo.busLicensePic;
          } else {
            this.showBusLicensePic = false;
          }
          //组织机构代码电子版
          if (resStoreInfo.orgPic) {
            this.orgPic = resStoreInfo.orgPic;
          } else {
            this.showOrgPic = false;
          }
          //税务登记证电子版
          if (resStoreInfo.taxPic) {
            this.taxPic = resStoreInfo.taxPic;
          } else {
            this.showTaxPic = false;
          }
          //银行开户许可证电子版
          if (resStoreInfo.bankPic) {
            this.bankPic = resStoreInfo.bankPic;
          } else {
            this.showBankPic = false;
          }
          //店铺头像
          if (resStoreInfo.avatarPicture) {
            this.avatarPicture = resStoreInfo.avatarPicture;
          } else {
            this.showAvatarPicture = false;
          }


          //经营范围
          this.businessScopeags = resStoreInfo.businessScope.split(' ');


          this.listLoading = false;
        })
      },
    }
  }

</script>
