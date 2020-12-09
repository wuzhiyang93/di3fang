<template>
  <div class="app-container">
    <el-form label-position="right" label-width="120px" style="margin-top: 20px">
      <el-form-item label="促销名称">{{crowdfunding.name}}</el-form-item>
      <el-form-item label="促销分类">{{cateName}}</el-form-item>
      <el-form-item label="众筹金额">¥{{crowdfunding.crowdFunding.money.toFixed(2)}}</el-form-item>
      <el-form-item label="众筹时间">{{crowdfunding.startTime}} 至 {{crowdfunding.endTime}}</el-form-item>
      <el-form-item label="发货时间">{{crowdfunding.crowdFunding.shipTime}}</el-form-item>
      <el-form-item label="众筹图片">
        <img :src="crowdfunding.crowdFunding.pic" style="max-height: 220px">
      </el-form-item>
      <el-form-item label="1元支持(抽奖)">{{crowdfunding.crowdFunding.lottery=='0'?'开启':'未开启'}}</el-form-item>
      <el-form-item label="抽奖人数">{{crowdfunding.crowdFunding.lotteryNum}}</el-form-item>
      <el-form-item label="无回报支持"> {{crowdfunding.crowdFunding.noReturnSupport =='0'?'是':'否'}}</el-form-item>
      <el-form-item label="众筹商品">
        <el-table
          :data="selectedSkus"
          border
          fit
          highlight-current-row
        >
          <el-table-column label="货品图片" width="80">
            <template slot-scope="scope"><img :src="scope.row.url" width="50" height="50"></template>
          </el-table-column>
          <el-table-column label="货品编号" width="140">
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column label="货品名称" min-width="200">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column label="规格" min-width="100">
            <template slot-scope="scope">
              <span v-html="getSpecValues(scope.row.skuSpecValues)"></span>
            </template>
          </el-table-column>
          <el-table-column label="众筹价">
            <template slot-scope="scope">{{ scope.row.price.toFixed(2) }}</template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <router-link to="/marketingmanager/goodsmarketing/crowdfunding">
          <el-button icon="el-icon-back">返回众筹项目列表</el-button>
        </router-link>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>

  import {
    queryCrowdfundingMarketingByIdDetail,
    queryMarketingCatesByTypeForCrowdfundingDetail
  } from '@/api/crowdfundingdetail';

  export default {
    data() {
      return {
        cateName: '',// 分类名称
        selectedSkus: [],// 选中的单品信息
        crowdfunding: {
          id: '',
          cateId: '',
          desc: '',
          name: '',
          startTime: '',
          endTime: '',
          crowdFunding: {
            lottery: '0',
            lotteryNum: '',
            money: 0,
            noReturnSupport: '0',
            pic: '',
            shipTime: '',
            spuId: ''
          },
          marketingSkus: [],
          timeValue: '',
        },// 众筹
      }
    },
    created() {
      this.queryCrowdfunding();
    },
    methods: {
      // 查询众筹促销
      queryCrowdfunding() {
        queryCrowdfundingMarketingByIdDetail(this.$route.query.id).then(res => {
          this.crowdfunding.id = res.id;
          this.crowdfunding.cateId = res.cateId;
          this.crowdfunding.desc = res.desc;
          this.crowdfunding.name = res.name;
          this.crowdfunding.startTime = res.startTime.substring(0, 10);
          this.crowdfunding.endTime = res.endTime.substring(0, 10);
          this.crowdfunding.timeValue = [];
          this.crowdfunding.timeValue.push(res.startTime.substring(0, 10));
          this.crowdfunding.timeValue.push(res.endTime.substring(0, 10));
          this.crowdfunding.crowdFunding.lottery = res.crowdFunding.lottery;
          this.crowdfunding.crowdFunding.lotteryNum = res.crowdFunding.lotteryNum;
          this.crowdfunding.crowdFunding.money = res.crowdFunding.money;
          this.crowdfunding.crowdFunding.noReturnSupport = res.crowdFunding.noReturnSupport;
          this.crowdfunding.crowdFunding.pic = res.crowdFunding.pic;
          this.crowdfunding.crowdFunding.spuId = res.crowdFunding.spuId;
          this.crowdfunding.crowdFunding.shipTime = res.crowdFunding.shipTime.substring(0, 10);
          res.marketingSkus.forEach(sku => {
            this.selectedSkus.push({
              id: sku.skuId,
              url: sku.sku.url,
              skuSpecValues: sku.sku.skuSpecValues,
              name: sku.sku.name,
              price: sku.price
            });
          })
          queryMarketingCatesByTypeForCrowdfundingDetail().then(res => {
            if (res && res.length > 0) {
              const cates = res.filter(cate => cate.id = this.crowdfunding.cateId);
              if (cates && cates.length > 0) {
                this.cateName = cates[0].name;
              }
            }
          })
        })
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
