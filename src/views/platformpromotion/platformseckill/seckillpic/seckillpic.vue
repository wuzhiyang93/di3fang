<template>
  <div class="app-container">

    <el-tabs v-model="activeName" type="card" @tab-click="toTabPage">
      <el-tab-pane label="秒杀活动设置" name="0"></el-tab-pane>
      <el-tab-pane label="秒杀活动图片" name="1"></el-tab-pane>
      <el-tab-pane label="秒杀活动列表" name="2"></el-tab-pane>
    </el-tabs>

    <el-alert title="操作说明：页面配置的图片展示在店铺首页的秒杀活动列表广告图中。" type="warning" :closable="false"></el-alert>

    <el-form label-position="right" label-width="150px" style="margin-top: 20px">
      <el-form-item label="PC广告图">
        <el-upload
          class="avatar-uploader"
          style="width: auto; height: auto"
          :action="uploadApi"
          :show-file-list="false"
          :on-success="uploadPcPicSuccess"
          :headers="headers"
          name="image"
          accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO">
          <el-tooltip effect="dark" content="建议尺寸：1920px * 440px" placement="right">
            <img v-if="marketingPic.pcPic" :src="marketingPic.pcPic" style="max-height: 100px; display: block">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-tooltip>
        </el-upload>
      </el-form-item>
      <el-form-item label="移动端广告图">
        <el-upload
          class="avatar-uploader"
          style="width: auto; height: auto"
          :action="uploadApi"
          :show-file-list="false"
          :on-success="uploadMobilePicSuccess"
          :headers="headers"
          name="image"
          accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO">
          <el-tooltip effect="dark" content="建议尺寸：1242px * 582px" placement="right">
            <img v-if="marketingPic.mobilePic" :src="marketingPic.mobilePic" style="max-height: 100px; display: block">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-tooltip>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveData">保存设置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import {queryPanicBuyPic, savePanicBuyPic} from '@/api/seckillpic';

  import {getToken} from '@/utils/token'

  export default {
    data() {
      return {
        isProcess: false, // 接口是否处理中
        uploadApi: process.env.UPLOAD_API,  // 上传图片api
        headers: {
          Authorization: 'Bearer ' + getToken()
        }, // 认证的头部
        activeName: '1',
        marketingPic: {
          pcPic: '', // pc端图片
          mobilePic: '', // mobile端图片
        }
      }
    },
    created() {
      this.loadPanicBuyPic();
    },
    methods: {
      // 查询秒杀图片信息
      loadPanicBuyPic() {
        queryPanicBuyPic().then(res => {
          if (res.flag && !!res.data) {
            this.marketingPic = res.data;
          }
        })
      },
      // 上传pc图片回调
      uploadPcPicSuccess(res) {
        this.marketingPic.pcPic = res;
      },
      // 上传mobile图片回调
      uploadMobilePicSuccess(res) {
        this.marketingPic.mobilePic = res;
      },
      saveData() {
        if (this.isProcess) {
          return;
        }
        this.isProcess = true;
        savePanicBuyPic(this.marketingPic).then(res => {
          this.isProcess = false;
          if (res == 1) {
            this.$message({
              type: 'success',
              message: '图片设置成功!'
            });
            this.loadPanicBuyPic();
          } else {
            this.$message({
              message: '图片设置失败！',
              type: 'error'
            });
          }
        })
      },
      toTabPage() {
        if (this.activeName === '0') {
          this.$router.push({path: '/platformpromotion/platformseckill/seckillsetting'})
        }
        if (this.activeName === '2') {
          this.$router.push({path: '/platformpromotion/platformseckill/seckills'})
        }
      },
    }
  }
</script>
