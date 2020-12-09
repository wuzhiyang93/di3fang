<template>
  <div class="app-container">
    <div class="filter-container" style="margin-top: 20px">
      <el-tag type="info">链接地址:{{marketUrl}}</el-tag>
      <el-tooltip class="codeTip" placement="right" effect="light">
        <div slot="content" style="text-align: center">
          <img width="120" height="120" :src="codeImg">
          <div style="font-size: 12px; border-bottom: dashed 1px #ccc; line-height: 25px; margin: 0">扫一扫,或者
            <el-link style="font-size: 12px" type="primary" target="_blank" :underline="false" @click="downPng">下载二维码
            </el-link>
          </div>
          <div style="font-size: 12px; margin: 0; padding-top: 5px">
            <el-link style="font-size: 12px" type="primary" :underline="false" href="javascript:;"
                     v-clipboard:copy="marketUrl" v-clipboard:success="onCopy">复制地址
            </el-link>
          </div>
        </div>
        <el-button size="small" type="primary">推广</el-button>
      </el-tooltip>
    </div>

    <div class="phone_main" style="float: left">
      <div class="phone_title"></div>
      <div class="phone_box" style="min-height: 600px; background: #fff">
        <div style="padding: 8px 10px; text-align: center; line-height: 34px; border-bottom: 1px solid #eee">{{title}}
        </div>
        <div class="sortable_box" v-html='content'></div>
      </div>
      <div class="phone_toolbar clearfix">
        <el-button size="medium" type="success" style="width: 100%" @click="save">保存</el-button>
      </div>
    </div>

    <div class="phone_edit_body">
      <el-row>
        <el-col :span="5" style="line-height: 36px; font-size: 14px">页面标题：</el-col>
        <el-col :span="19">
          <el-input v-model="title" size="medium" style="width: 100%"/>
        </el-col>
      </el-row>
      <tinymce ref="phoneTinymce" v-model="content" class="phone-tinymce" style="margin-top: 10px" :height="400"/>
      <div class="phone_toolbar clearfix" style="padding: 10px 0">
        <el-button size="medium" type="primary" style="width: 48.15%" @click="usingTemplate">使用模板</el-button>
        <el-button size="medium" type="success" style="width: 48.15%" @click="save">保存</el-button>
      </div>
    </div>

  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'


  import {
    selectCommunityBuyIndex, //查询社区推广信息
    editCommunityBuyIndex, //修改推广内容
    downPng, //下载推广二维码
    createQeCode, //创建二维码
  } from '@/api/groupbuyheadspage'

  import {
    getBaseInfoSet,//获得基本信息
  } from '@/api/infoset'


  export default {
    isProcess: false,  //接口正在处理中
    components: {Tinymce},
    data() {
      return {
        marketUrl: '',  //活动二维码地址
        codeImg: '', //二维码图片
        title: '', //标题
        content: '' //正文

      }
    },
    created() {
      this.query();
      this.getBaseInfoSet();
    },
    methods: {
      //复制
      onCopy() {
        this.$message({
          type: 'success',
          message: '复制成功!'
        })
      },
      //查询设置
      query() {
        selectCommunityBuyIndex().then(response => {
          if (response != null) {
            this.title = response.title;
            this.content = response.content;
          }
        });
      },
      //保存修改
      save() {

        if (this.isProcess) {
          return
        }
        this.isProcess = true

        let entity = {
          title: this.title,
          content: this.content
        }
        editCommunityBuyIndex(entity).then(response => {
          this.isProcess = false;
          if (response > 0) {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
          }
        });
      },
      //获取基本信息
      getBaseInfoSet() {
        getBaseInfoSet().then(response => {
          if (response != null) {
            this.marketUrl = response.siteUrl + 'mobile/tocommunitybuyheadcenter.htm';
            this.create();
          }
        });
      },
      create() {
        createQeCode(this.marketUrl, 120, 120).then(res => {
          this.isProcess = false;
          let blob = new Blob([res], {type: "application/UTF-8"});
          let objectUrl = URL.createObjectURL(blob);
          this.codeImg = objectUrl;
        });
      },
      //下载二维码
      downPng() {
        if (this.isProcess) {
          return
        }
        this.isProcess = true;
        let url = {
          urlList: this.marketUrl
        }
        downPng(url).then(res => {
          this.isProcess = false;
          let blob = new Blob([res], {type: "application/UTF-8"});
          let objectUrl = URL.createObjectURL(blob);
          window.location.href = objectUrl;
        });
      },
      //使用模板
      usingTemplate() {
        this.$refs['phoneTinymce'].setContent('<img src="http://images.lecshop.cn/weixin_template/community-recruit-default.jpg" style="width:100%;margin-bottom:5px">\n' +
          '          <div style="padding:10px;font-size:13px;line-height:1.4">\n' +
          '            <p style="color:#FF6A2B;font-weight:600;margin-bottom:10px">各位社区业主们：</p>\n' +
          '            <p style="margin-bottom:20px">我们诚挚的邀请您成为我们的团长，您只需要把本店优质的商品分享给邻里，并负责接收商品分发给大家，在分享商品的同时，挣得属于自己的佣金，点击海报下方按钮，即可加入！</p>\n' +
          '            <p style="color:#FF6A2B;font-weight:600;margin-bottom:10px">1、什么是团长？想成为团长需要具备什么样的条件？</p>\n' +
          '            <p style="margin-bottom:10px">团长为本店指定的业主代表，负责推广本店的优质商品给邻里，同时可赚得佣金成为团长的条件：</p>\n' +
          '            <p style="margin-bottom:20px"> 1）某个社区的业主或长期在社区工作，具备一定的影响力。如业主群群主或活跃用户，社区工作人员等；<br>2）经常进行邻里间的互动，关系相处融洽，同时乐于服务他人；<br> 3）在社区内有线下实体店或仓储空间的优先<br></p>\n' +
          '            <p style="color:#FF6A2B;font-weight:600;margin-bottom:5px">2、团长招募的范围和数量？</p>\n' +
          '            <p style="margin-bottom:20px"> 本次招募X个，限X市市区，每个社区X名<br></p>\n' +
          '            <p style="color:#FF6A2B;font-weight:600;margin-bottom:5px">3、收益说明</p>\n' +
          '            <p style="margin-bottom:20px"> 1）每次团购活动结束后，会结算本次活动内已付款的订单佣金；<br> 2）团长可申请提现，需要商家进行审核<br></p>\n' +
          '            <p style="color:#FF6A2B;font-weight:600;margin-bottom:5px">4、团长的职责说明</p>\n' +
          '            <p style="margin-bottom:20px"> 1）发动和组织社区业主进行团购活动，主动臻选本店发起的团购商品并推广至社区内，也可主动搜集社区内的需求至本店处；<br>2）团长需组织自提货或最后的入户配送，所以需准备3-5平米的闲置空间，满足当天社区业主自提的需要<br></p>\n' +
          '            <p style="color:#FF6A2B;font-weight:600;margin-bottom:5px">5、我们可以为团长提供什么？</p>\n' +
          '            <p style=" margin-bottom:20px"> 1）商品支持：我们有优秀的商品买手团队，为您提供特色、优质、优价的商品；<br>2）品牌支持：丰富的传统媒介与新媒体资源，建立品牌信任；<br> 3）推广支持：通过线上活动为您输送潜在社区用户，并协助举办新品试吃、线下推广等；<br>4）培训支持：定期组织业务培训，提升服务能力<br></p>\n' +
          '          </div>')
      },
    }
  }
</script>
