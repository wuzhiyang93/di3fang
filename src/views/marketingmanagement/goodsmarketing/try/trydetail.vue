<template>
  <div class="app-container">
    <div class="detailsTable">
      <el-row>
        <el-col :span="8">促销名称：{{tryMarketing.name}}</el-col>
        <el-col :span="8">促销分类：{{cateName}}</el-col>
        <el-col :span="8">试用类型：{{tryMarketing.tryMarkting.type=='1'?'付邮试用':'返卷试用'}}</el-col>
      </el-row>
      <el-row>
        <el-col v-if="tryMarketing.tryMarkting.type!='1'" :span="8">送优惠券：{{couponName}}</el-col>
        <el-col :span="8">开始时间：{{tryMarketing.startTime}}</el-col>
        <el-col :span="8">结束时间：{{tryMarketing.endTime}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">提供份数：{{tryMarketing.tryMarkting.tryNum}}</el-col>
        <el-col :span="8">可申请人数：{{tryMarketing.tryMarkting.applyNum}}</el-col>
        <el-col :span="8">已申请人数：{{tryMarketing.tryMarkting.alerdyApplyNum}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">促销描述：{{tryMarketing.desc}}</el-col>
      </el-row>
    </div>
    <el-table
      style="margin-top: 10px"
      :data="tryMarketing.marketingSkus"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="商品图片" width="80">
        <template slot-scope="scope"><img :src="scope.row.sku.url" width="50" height="50"></template>
      </el-table-column>
      <el-table-column label="商品编号" min-width="140">
        <template slot-scope="scope">{{ scope.row.sku.id }}</template>
      </el-table-column>
      <el-table-column label="商品名称" min-width="250">
        <template slot-scope="scope">{{ scope.row.sku.name }}</template>
      </el-table-column>
      <el-table-column label="规格">
        <template slot-scope="scope">
          <span v-html="getSpecValues(scope.row.sku.skuSpecValues)"></span>
        </template>
      </el-table-column>
      <el-table-column label="销售价">
        <template slot-scope="scope">{{ scope.row.sku.price.toFixed(2) }}</template>
      </el-table-column>
    </el-table>
    <div style="text-align: center; margin-top: 20px">
      <el-button type="info" icon="el-icon-back" @click="backPage">返回促销列表</el-button>
    </div>
  </div>
</template>

<script>

  import {queryTryMarketingById, queryCouponsForTry, queryMarketingCatesByTypeForTry} from '@/api/trydetail';

  export default {
    data() {
      return {
        cateName: '',// 分类名称
        couponName: '',// 优惠券名称
        listLoading: true,
        tryMarketing: {
          tryMarkting: {}
        }
      }
    },
    created() {
      this.queryTryMarketingById()
    },
    methods: {
      queryTryMarketingById() {
        queryTryMarketingById(this.$route.query.id).then(res => {
          this.tryMarketing = res;
          this.listLoading = false;

          // 查询分类
          queryMarketingCatesByTypeForTry().then(res => {
            const cate = res.filter(cate => cate.id == this.tryMarketing.cateId)[0]
            if (cate) {
              this.cateName = cate.name
            }
          })

          // 查询优惠卷
          queryCouponsForTry().then(res => {
            const coupon = res.filter(coupon => coupon.id == this.tryMarketing.tryMarkting.couponId)[0];
            if (coupon) {
              this.couponName = coupon.name;
            }
          })

        })
      },
      // 返回
      backPage() {
        this.$router.back(-1)
      },
    },
    computed: {
      getSpecValues() {
        return function (skuSpecValues) {
          let content = '';

          for (let i = 0; i < skuSpecValues.length; i++) {
            content += skuSpecValues[i].spec.name + ":" + skuSpecValues[i].valueRemark + "<br>";
          }
          return content;
        }
      }
    }
  }
</script>
