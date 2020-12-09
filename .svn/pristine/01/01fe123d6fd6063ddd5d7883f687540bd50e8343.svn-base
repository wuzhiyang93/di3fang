<template>
  <div class="app-container">
    <el-form label-position="right" label-width="120px">
      <el-form-item label="试用满意度">
        <el-rate
          v-model="starValue"
          disabled
          :colors="['#99A9BF', '#F7BA2A', '#F90']"
          score-template="{value}"
          style="display: inline-block"
        />
      </el-form-item>
      <el-form-item label="商品亮点及建议">{{advice}}</el-form-item>
      <el-form-item label="试用过程及感受">{{feel}}
      </el-form-item>
      <el-form-item label="试用过程图片">
        <img v-for="(url,index) in src" :key="index" :src="url" style="display: block">
      </el-form-item>
      <el-form-item>
        <el-button type="info" icon="el-icon-back" @click="backPage">返回试用申请列表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>


  import {
    queryTryReport,//查询试用报告
  } from '@/api/trialpromotionreport';


  export default {
    data() {
      return {
        starValue: 0,//评分
        advice: '',//亮点及建议
        feel: '',//感受
        src: []//试用图片
      }
    },
    created() {
      this.getData()
    },
    methods: {
      backPage() {
        this.$router.back(-1)
      },
      //初始化页面数据
      getData() {
        queryTryReport(this.$route.query.id).then((response) => {
          this.starValue = response.satisfaction;
          this.advice = response.advice;
          this.feel = response.feel;
          this.src = response.pics.split(',');
        })
      }
    }
  }
</script>
