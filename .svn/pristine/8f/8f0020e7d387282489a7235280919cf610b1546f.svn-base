<template>
  <div class="app-container">
    <el-steps :active="1" align-center finish-status="success">
      <el-step title="创建/选择账号" description=""></el-step>
      <el-step title="填写商家信息" description=""></el-step>
    </el-steps>
    <el-form label-position="right" :model="storeInfo" :rules="Rules" ref="storeInfo" label-width="180px"
             style="margin-top: 20px">
      <el-form-item prop="storeName">
        <span slot="label"><span class="labelImportant">*</span>门店名称</span>
        <el-input maxlength="50" v-model="storeInfo.storeName"/>
      </el-form-item>
      <el-form-item prop="companyName">
        <span slot="label"><span class="labelImportant">*</span>公司名称</span>
        <el-input maxlength="50" v-model="storeInfo.companyName"/>
      </el-form-item>
      <el-form-item prop="companyAddress">
        <span slot="label">所在地区</span>
        <el-cascader
          style="width: 100%"
          placeholder="请选择地区"
          expand-trigger="hover"
          :props="props"
          v-model="addressArray">
        </el-cascader>
      </el-form-item>
      <el-form-item prop="companyDetailAddress">
        <span slot="label">详细地址</span>
        <el-input maxlength="256" v-model="storeInfo.companyDetailAddress"/>
      </el-form-item>
      <el-form-item label="地图">
        <div class="amap-page-container" style="width: 100%; height: 500px" id="GaoMap">
          <el-button type="primary" @click="onSearchResult"
                     style=" position: absolute;top: 20px;left: 20px;z-index:100;">刷新地图定位
          </el-button>
          <el-amap
            vid="amapDemo"
            resizeEnable="true"
            :center="mapCenter"
            :zoom="zoom"
            class="amap-demo">
            <el-amap-marker v-for="marker in markers" v-bind:key="marker.id" :position="marker.position">
            </el-amap-marker>
          </el-amap>
        </div>
      </el-form-item>
      <el-form-item prop="companyPhone">
        <span slot="label">公司电话</span>
        <el-input maxlength="15" v-model="storeInfo.companyPhone"/>
        <div style="color: #999; line-height: initial; margin-top: 5px">格式为区号-号码（例：000-00000000）</div>
      </el-form-item>
      <el-form-item prop="businessTime">
        <span slot="label">营业时间</span>
        <el-input maxlength="256" v-model="storeInfo.businessTime"/>
      </el-form-item>
      <el-form-item prop="busRoutes">
        <span slot="label">公交线路</span>
        <el-input maxlength="128" v-model="storeInfo.busRoutes"/>
      </el-form-item>
      <el-form-item label="电子邮箱">
        <el-input maxlength="128" v-model="storeInfo.companyEmail"/>
      </el-form-item>
      <el-form-item prop="contactPerson">
        <span slot="label">联系人姓名</span>
        <el-input maxlength="20" v-model="storeInfo.contactPerson"/>
      </el-form-item>
      <el-form-item prop="contactPhone">
        <span slot="label">联系人电话</span>
        <el-input maxlength="11" v-model="storeInfo.contactPhone"/>
      </el-form-item>
      <el-form-item prop="busLicense">
        <span slot="label">工商营业执照号</span>
        <el-input maxlength="64" v-model="storeInfo.busLicense"/>
      </el-form-item>
      <el-form-item prop="businessScope">
        <span slot="label">经营范围</span>
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加经营范围</el-button>
      </el-form-item>
      <el-form-item prop="legalPerson">
        <span slot="label">法人姓名</span>
        <el-input maxlength="8" v-model="storeInfo.legalPerson"/>
      </el-form-item>
      <el-form-item prop="cardNo">
        <span slot="label">法人身份证号码</span>
        <el-input maxlength="24" v-model="storeInfo.cardNo"/>
      </el-form-item>
      <el-form-item prop="carPic">
        <span slot="label">法人身份证电子版</span>
        <el-upload
          class="avatar-uploader"
          :action="uploadApi"
          :headers="headers"
          name="image"
          :show-file-list="false"
          accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO"
          :on-success="upLoaderIdCard"
        >
          <img v-if="storeInfo.carPic" :src="storeInfo.carPic" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item prop="avatarPicture">
        <span slot="label">门店头像</span>
        <el-upload
          class="avatar-uploader"
          :action="uploadApi"
          :headers="headers"
          name="image"
          :show-file-list="false"
          accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO"
          :on-success="upLoaderAvatarPicture"
        >
          <img v-if="storeInfo.avatarPicture" :src="storeInfo.avatarPicture" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="门店类型">
        <el-select v-model="storeInfo.type" style="width: 250px">
          <el-option label="加盟门店" value="1"></el-option>
          <el-option label="连锁门店" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件类型">
        <el-select v-model="storeInfo.isMerge" @change="changeMerge" style="width: 250px">
          <el-option label="三证合一" value="0"></el-option>
          <el-option label="三证不合一" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="CertificateTypeValue == '1'" prop="taxPic">
        <span slot="label">税务登记证</span>
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :on-success="upLoaderTaxPic"

          :action="uploadApi"
          :headers="headers"
          name="image"
          accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO">
          <img v-if="storeInfo.taxPic" :src="storeInfo.taxPic" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item prop="busLicensePic">
        <span slot="label">营业执照</span>
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :on-success="upLoaderBusLicensePic"
          :action="uploadApi"
          :headers="headers"
          name="image"
          accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO"
        >
          <img v-if="storeInfo.busLicensePic" :src="storeInfo.busLicensePic" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item v-if="CertificateTypeValue == '1'" prop="orgPic">
        <span slot="label">组织机构代码证</span>
        <el-upload
          class="avatar-uploader"
          :action="uploadApi"
          :headers="headers"
          name="image"
          :show-file-list="false"
          accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO"
          :on-success="upLoaderOrgPic"
        >
          <img v-if="storeInfo.orgPic" :src="storeInfo.orgPic" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addStore">确认开店</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    queryAllProvinces, //查询所有省份信息
    queryCityByProvinceId,//根据省份id查询市
    queryDistrictByCityId,//查询所有省份信息
    checkStoreNameExist,//校验店铺名是否存在
    checkCompanyNameExist,//校验公司名是否存在
    fillAllStoreInfo,//新增店铺
  } from '@/api/addshopsecondstep';

  import {
    isEmpty, //非空
    telephoneValidator,//座机号码
    mobilePhoneValidator,//手机号码
    checkIdCarNo,//校验身份证
  } from '@/utils/validate'

  import {getToken} from "@/utils/token";


  let placeSearch = new AMap.PlaceSearch();
  export default {
    data() {
      //校验门店名称
      let checkStoreName = (rule, value, callback) => {
        if (value == '') {
          callback(new Error("该栏不能为空"))
        } else {
          checkStoreNameExist(value).then((response) => {
            if (response > 0) {
              callback(new Error("门店名称已存在"))
            } else {
              callback();
            }
          })
        }
      }
      //校验公司名称
      let checkompanyName = (rule, value, callback) => {
        if (value == '') {
          callback(new Error("该栏不能为空"))
        } else {
          checkCompanyNameExist(value).then((response) => {
            if (response > 0) {
              callback(new Error("公司名称已存在"))
            } else {
              callback();
            }
          })
        }
      }
      //校验地区
      let checkAddress = (rule, value, callback) => {
        if (this.addressArray.length == 0) {
          callback(new Error("请选择地区"))
        } else {
          callback();
        }
      }
      //校验经营范围
      let checkBusinessScope = (rule, value, callback) => {
        if (this.dynamicTags.length == 0) {
          callback(new Error("请添加经营范围"))
        } else {
          callback();
        }
      }
      return {
        uploadApi: process.env.UPLOAD_API,// 上传文件路由
        headers: { // 设置上传的请求头部
          Authorization: 'Bearer ' + getToken()
        },
        isProcess: false, // 接口是否处理中
        CertificateTypeValue: '0',  //证件类型
        inputVisible: false, //经营范围展示标记
        inputValue: '', //经营范围
        dynamicTags: [], //经营范围数组
        addressArray: [], //地区数组
        props: {
          lazy: true,
          lazyLoad(node, resolve) {
            const {level} = node;
            let parentId;
            let categoryList = [];
            if (node.value) {
              parentId = node.value.split('-')[0];
            } else {
              parentId = 0;
            }
            if (parentId == 0) {
              queryAllProvinces().then((response) => {
                categoryList = categoryList.concat(response);
                const nodes = Array.from(categoryList)
                  .map(item => ({
                    value: item.id + '-' + item.name,
                    label: item.name,
                    leaf: level >= 2
                  }));
                // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                resolve(nodes);
              })
            } else {
              if (level == 1) {
                queryCityByProvinceId(parentId).then((response) => {
                  categoryList = categoryList.concat(response);
                  const nodes = Array.from(categoryList)
                    .map(item => ({
                      value: item.id + '-' + item.name,
                      label: item.name,
                      leaf: level >= 2
                    }));
                  // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                  resolve(nodes);
                })
              } else {
                queryDistrictByCityId(parentId).then((response) => {
                  categoryList = categoryList.concat(response);
                  const nodes = Array.from(categoryList)
                    .map(item => ({
                      value: item.id + '-' + item.name,
                      label: item.name,
                      leaf: level >= 2
                    }));
                  // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                  resolve(nodes);
                })
              }
            }
          }
        },//地区联动数据源
        zoom: 11, //地图倍数
        markers: [], //地图标记点坐标数组
        mapCenter: [116.397428, 39.90923], //地图初始中心坐标
        storeInfo: {
          storeName: '',  //门店名称
          companyName: '',  //公司名称
          companyAddress: '', //公司地址
          companyDetailAddress: '', //详细地址
          companyPhone: '', //公司电话
          businessTime: '',//营业时间
          busRoutes: '', //公交路线
          companyEmail: '', // 公司邮箱
          contactPerson: '',//公司联系人
          contactPhone: '',//联系人电话
          busLicense: '', //营业执照号
          businessScope: '', //经营范围
          legalPerson: '', //法人代表
          cardNo: '', //法人身份证号码
          carPic: '', //法人身份证照片
          avatarPicture: '',  //店铺头像
          type: '1', //类型 1 加盟  2 连锁
          isMerge: '0', //三证合一   0 是  1 否
          busLicensePic: '', //营业执照图片
          taxPic: '',//税务登记图片
          orgPic: '',//组织机构代码图片
          longitude: '',  //经度
          latitude: '',//纬度
          provinceId: '', //省份 id
          cityId: '', //城市 id
          districtId: '', //地区 id
        },
        addShopForm: {
          mobile: this.$route.query.mobile,
          storeInfo: {},
        },
        Rules: { //添加支付类型 校验
          storeName: [{
            trigger: 'blur',
            validator: checkStoreName
          }],
          companyName: [{
            trigger: 'blur',
            validator: checkompanyName
          }],
          companyAddress: [{
            required: true,
            trigger: 'change',
            validator: checkAddress,
          }],
          companyDetailAddress: [{
            required: true,
            trigger: 'blur',
            validator: isEmpty,
          }],
          companyPhone: [{
            required: true,
            trigger: 'blur',
            validator: telephoneValidator,
          }],
          businessTime: [{
            required: true,
            trigger: 'blur',
            validator: isEmpty,
          }],
          busRoutes: [{
            required: true,
            trigger: 'blur',
            validator: isEmpty,
          }],
          contactPerson: [{
            required: true,
            trigger: 'blur',
            validator: isEmpty,
          }],
          contactPhone: [{
            required: true,
            trigger: 'blur',
            validator: mobilePhoneValidator,
          }],
          busLicense: [{
            required: true,
            trigger: 'blur',
            validator: isEmpty,
          }],
          businessScope: [{
            required: true,
            trigger: 'blur',
            validator: checkBusinessScope,
          }],
          legalPerson: [{
            required: true,
            trigger: 'blur',
            validator: isEmpty,
          }],
          cardNo: [{
            required: true,
            trigger: 'blur',
            validator: checkIdCarNo,
          }],
          carPic: [{
            required: true,
            trigger: 'change',
            validator: isEmpty,
          }],
          avatarPicture: [{
            required: true,
            trigger: 'change',
            validator: isEmpty,
          }],
          taxPic: [{
            required: true,
            trigger: 'change',
            validator: isEmpty,
          }],
          busLicensePic: [{
            required: true,
            trigger: 'change',
            validator: isEmpty,
          }],
          orgPic: [{
            required: true,
            trigger: 'change',
            validator: isEmpty,
          }],
        },
      };
    },
    created() {
    },

    methods: {
      //改变证件类型
      changeMerge() {
        this.CertificateTypeValue = this.storeInfo.isMerge
      },
      //地图搜索事件
      onSearchResult() {
        if (this.addressArray == '') {
          this.$message({
            type: 'error',
            message: '请先选择地区!'
          });
          return;
        }
        if (this.storeInfo.companyDetailAddress == '') {
          this.$message({
            type: 'error',
            message: '请先填写详细地址!'
          });
          return;
        }
        this.storeInfo.provinceId = this.addressArray[0].split('-')[0]
        this.storeInfo.cityId = this.addressArray[1].split('-')[0]
        this.storeInfo.districtId = this.addressArray[2].split('-')[0]
        let address = this.addressArray[0].split('-')[1] + this.addressArray[1].split('-')[1] + this.addressArray[2].split('-')[1] + this.storeInfo.companyDetailAddress;
        this.storeInfo.companyAddress = address;
        let tempThis = this;
        let markers = [];
        placeSearch.search(address, function (status, result) {
          if ('complete' == status && result.info == 'OK') {
            let pois = result.poiList.pois;
            if (pois.length > 0) {
              markers.push({
                id: 1,
                position: [pois[0].location.lng, pois[0].location.lat]
              });
              tempThis.storeInfo.longitude = pois[0].location.lng;
              tempThis.storeInfo.latitude = pois[0].location.lat;
              tempThis.markers = markers;
              tempThis.mapCenter = [pois[0].location.lng, pois[0].location.lat];
              tempThis.zoom = 17;
            }
          } else {
            tempThis.$message({
              type: 'error',
              message: '未搜索到相关地址 请重新输入详细地址!'
            });
          }
        });
      },
      //删除经营范围
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      },
      //展示经营范围
      showInput() {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      //添加经营范围
      handleInputConfirm() {
        const inputValue = this.inputValue
        if (this.dynamicTags.indexOf(inputValue) > -1) {
          this.$message({
            type: 'error',
            message: '请勿重复添加经营范围!'
          });
          return;
        }

        if (inputValue) {
          this.dynamicTags.push(inputValue)
        }
        this.inputVisible = false
        this.inputValue = ''
      },
      //上传身份证
      upLoaderIdCard(res) {
        this.storeInfo.carPic = res
      },
      //上传店铺头像
      upLoaderAvatarPicture(res) {
        this.storeInfo.avatarPicture = res
      },
      //税务登记图片
      upLoaderTaxPic(res) {
        this.storeInfo.taxPic = res
      },
      //营业执照图片
      upLoaderBusLicensePic(res) {
        this.storeInfo.busLicensePic = res;
      },
      //组织机构代码图片
      upLoaderOrgPic(res) {
        this.storeInfo.orgPic = res
      },
      //添加操作
      addStore() {
        this.$refs['storeInfo'].validate(valid => {
          if (valid) {
            if (this.storeInfo.latitude == '' || this.storeInfo.latitude == '') {
              this.$message({
                type: 'error',
                message: '请点击地图左上角的重新定位按钮 获取地理信息!'
              });
              return;
            }
            if (this.dynamicTags.length > 0) {
              this.storeInfo.businessScope = this.dynamicTags.join(" ");
            }

            if (this.isProcess) {
              return;
            }
            this.addShopForm.storeInfo = this.storeInfo;
            this.isProcess = true;
            fillAllStoreInfo(this.addShopForm).then((response) => {
              this.isProcess = false;
              if (response == 1) {
                this.$message({
                  type: 'success',
                  message: '开店成功!'
                });
                this.$router.push({path: '/shopmanagement/shopslist/shopslist'})
              } else if (response == -1) {
                this.$message({
                  type: 'error',
                  message: '用户不存在!'
                });
              } else if (response == -2) {
                this.$message({
                  type: 'error',
                  message: '该用户下已有店铺!'
                });
              }

            })
          }
        })
      }
    }
  }
</script>
