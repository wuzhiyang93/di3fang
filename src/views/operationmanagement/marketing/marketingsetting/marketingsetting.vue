<template>
  <div class="app-container">
    <el-form label-position="right" :model="form" ref="form" label-width="155px">
      <el-form-item label="PC抢购广告图">
        <el-upload
          class="avatar-uploader"
          style="width: auto; height: auto"
          :action="uploadApi"
          :show-file-list="false"
          :on-success="uploadPcPanicPicSuccess"
          :headers="headers"
          name="image"
          accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO">
          <img v-if="form.pcPanicPic" :src="form.pcPanicPic" style="max-height: 100px; display: block">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="移动端抢购广告图">
        <el-upload
          class="avatar-uploader"
          style="width: auto; height: auto"
          :action="uploadApi"
          :show-file-list="false"
          :on-success="uploadMobilePanicPicSuccess"
          :headers="headers"
          name="image"
          accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO">
          <img v-if="form.mobilePanicPic" :src="form.mobilePanicPic" style="max-height: 100px; display: block">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="PC预售广告图">
        <el-upload
          class="avatar-uploader"
          style="width: auto; height: auto"
          :action="uploadApi"
          :show-file-list="false"
          :on-success="uploadPcPreSalePicSuccess"
          :headers="headers"
          name="image"
          accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO">
          <img v-if="form.pcPreSalePic" :src="form.pcPreSalePic" style="max-height: 100px; display: block">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="移动端预售广告图">
        <el-upload
          class="avatar-uploader"
          style="width: auto; height: auto"
          :action="uploadApi"
          :show-file-list="false"
          :on-success="uploadMobilePreSalePicSuccess"
          :headers="headers"
          name="image"
          accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO">
          <img v-if="form.mobilePreSalePic" :src="form.mobilePreSalePic" style="max-height: 100px; display: block">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="PC试用广告图">
        <el-upload
          class="avatar-uploader"
          style="width: auto; height: auto"
          :action="uploadApi"
          :show-file-list="false"
          :on-success="uploadPcTryPicSuccess"
          :headers="headers"
          name="image"
          accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO">
          <img v-if="form.pcTryPic" :src="form.pcTryPic" style="max-height: 100px; display: block">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="移动端试用广告图">
        <el-upload
          class="avatar-uploader"
          style="width: auto; height: auto"
          :action="uploadApi"
          :show-file-list="false"
          :on-success="uploadMobileTryPicSuccess"
          :headers="headers"
          name="image"
          accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO">
          <img v-if="form.mobileTryPic" :src="form.mobileTryPic" style="max-height: 100px; display: block">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="PC积分商城广告图">
        <el-upload
          class="avatar-uploader"
          style="width: auto; height: auto"
          :action="uploadApi"
          :show-file-list="false"
          :on-success="uploadPcPointPicSuccess"
          :headers="headers"
          name="image"
          accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO">
          <img v-if="form.pcPointPic" :src="form.pcPointPic" style="max-height: 100px; display: block">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="移动端积分商城广告图">
        <el-upload
          class="avatar-uploader"
          style="width: auto; height: auto"
          :action="uploadApi"
          :show-file-list="false"
          :on-success="uploadMobilePointPicSuccess"
          :headers="headers"
          name="image"
          accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO">
          <img v-if="form.mobilePointPic" :src="form.mobilePointPic" style="max-height: 100px; display: block">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="PC红包页广告图">
        <el-upload
          class="avatar-uploader"
          style="width: auto; height: auto"
          :action="uploadApi"
          :show-file-list="false"
          :on-success="uploadPcRedEnvelopePicSuccess"
          :headers="headers"
          name="image"
          accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO">
          <img v-if="form.pcRedEnvelopePic" :src="form.pcRedEnvelopePic" style="max-height: 100px; display: block">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="移动端拼团广告图">
        <el-upload
          class="avatar-uploader"
          style="width: auto; height: auto"
          :action="uploadApi"
          :show-file-list="false"
          :on-success="uploadMobileGroupPicSuccess"
          :headers="headers"
          name="image"
          accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO">
          <img v-if="form.mobileGroupPic" :src="form.mobileGroupPic" style="max-height: 100px; display: block">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="PC众筹广告图">
        <el-upload
          class="avatar-uploader"
          style="width: auto; height: auto"
          :action="uploadApi"
          :show-file-list="false"
          :on-success="uploadPcCrowdfundingPicSuccess"
          :headers="headers"
          name="image"
          accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO">
          <img v-if="form.pcCrowdfundingPic" :src="form.pcCrowdfundingPic" style="max-height: 100px; display: block">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="试用规则">
        <el-input v-model="form.tryRule" type="textarea" :rows="4" maxlength="800" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="预售规则">
        <el-input v-model="form.preSaleRule" type="textarea" :rows="4" maxlength="800" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="众筹规则">
        <el-input v-model="form.crowdfundingRule" type="textarea" :rows="4" maxlength="800" show-word-limit></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateMarketingSetting">保存设置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    queryMarketingSetting,
    addOrUpdateMarketingSetting,
  } from '@/api/marketingsetting';
  import {getToken} from "@/utils/token";

  export default {
    data() {
      return {
        isProcess: false, // 接口是否处理中
        uploadApi: process.env.UPLOAD_API,// 上传文件路由
        headers: { // 设置上传的请求头部
          Authorization: 'Bearer ' + getToken()
        },
        form: { // 提交form表单
          pcPanicPic: '', // PC抢购广告图
          mobilePanicPic: '', // 移动端抢购广告图
          pcPreSalePic: '', // PC预售广告图
          mobilePreSalePic: '', // 移动端预售广告图
          pcTryPic: '', // PC试用广告图
          mobileTryPic: '', // 移动端试用广告图
          pcPointPic: '', // PC积分商城广告图
          mobilePointPic: '', // 移动端积分商城广告图
          pcRedEnvelopePic: '', // PC红包页广告图
          mobileGroupPic: '', // 移动端拼团广告图
          pcCrowdfundingPic: '', // PC众筹广告图
          tryRule: '', // 试用规则
          preSaleRule: '', // 预售规则
          crowdfundingRule: '', // 众筹规则
        },
      }
    },

    created() {
      this.queryMarketingSetting()
    },
    methods: {
      // 查询促销设置
      queryMarketingSetting() {
        queryMarketingSetting().then(res => {
          if (res.flag) {
            this.form = res.data;
            if (this.$refs["form"]) {
              this.$refs["form"].resetFields();
            }
          }
        })
      },
      // 新增或修改促销设置
      addOrUpdateMarketingSetting() {
        this.$refs['form'].validate(valid => {
          if (valid && !this.isProcess) {
            this.isProcess = true;
            addOrUpdateMarketingSetting(this.form).then(() => {
              this.isProcess = false;
              this.queryMarketingSetting();
              this.$message({
                type: 'success',
                message: '更新成功'
              });
            })
          }
        });
      },
      // 上传PC抢购广告图回调
      uploadPcPanicPicSuccess(res) {
        this.form.pcPanicPic = res;
      },
      // 上传移动端抢购广告图回调
      uploadMobilePanicPicSuccess(res) {
        this.form.mobilePanicPic = res;
      },
      // 上传PC预售广告图回调
      uploadPcPreSalePicSuccess(res) {
        this.form.pcPreSalePic = res;
      },
      // 上传移动端预售广告图回调
      uploadMobilePreSalePicSuccess(res) {
        this.form.mobilePreSalePic = res;
      },
      // 上传PC试用广告图回调
      uploadPcTryPicSuccess(res) {
        this.form.pcTryPic = res;
      },
      // 上传移动端试用广告图回调
      uploadMobileTryPicSuccess(res) {
        this.form.mobileTryPic = res;
      },
      // 上传PC积分商城广告图回调
      uploadPcPointPicSuccess(res) {
        this.form.pcPointPic = res;
      },
      // 上传移动端积分商城广告图回调
      uploadMobilePointPicSuccess(res) {
        this.form.mobilePointPic = res;
      },
      // 上传PC红包页广告图回调
      uploadPcRedEnvelopePicSuccess(res) {
        this.form.pcRedEnvelopePic = res;
      },
      // 上传移动端拼团广告图回调
      uploadMobileGroupPicSuccess(res) {
        this.form.mobileGroupPic = res;
      },
      // 上传PC众筹广告图回调
      uploadPcCrowdfundingPicSuccess(res) {
        this.form.pcCrowdfundingPic = res;
      },
    }
  }
</script>
