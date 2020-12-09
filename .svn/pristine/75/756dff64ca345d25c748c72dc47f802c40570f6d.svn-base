<template>
  <div class="app-container">
    <el-form label-position="right" label-width="120px"
             style="margin-top: 20px">
      <el-form-item>
        <span slot="label">促销名称</span>
        <el-input disabled="true" v-model="panicbuy.name" maxlength="40"/>
      </el-form-item>
      <el-form-item>
        <span slot="label">促销时间</span>
        <el-date-picker
          disabled="true"
          style="width: 355px"
          class="search-datepicker"
          size="medium"
          :clearable="false"
          v-model="panicbuy.timeValue"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          align="right">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="促销描述">
        <el-input disabled="true" v-model="panicbuy.desc" type="textarea" maxlength="2048" :rows="3"/>
      </el-form-item>
      <el-form-item>
        <span slot="label"><span class="labelImportant">*</span>选择商品</span>
      </el-form-item>
      <el-form-item>
        <el-table
          :data="selectedSkus"
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
          <el-table-column label="折扣(%)" min-width="90">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="请输入1-100之间的整数，公式：价格 x 折扣" placement="right">
                <el-input disabled="true" v-model="scope.row.orgingdiscount" maxlength="3" type="number"
                          style="width: 70px"></el-input>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="限购(件)" min-width="90">
            <template slot-scope="scope">
              <el-input disabled="true" v-model="scope.row.limitNum" maxlength="7" type="number"
                        style="width: 70px"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="goBack">返回</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>

  import {
    queryPanicBuyForDetail,
  } from '@/api/editpanicbuy';


  export default {
    data() {
      return {
        selectedSkus: [],// 选中的单品信息
        panicbuy: {
          id: '',
          cateId: '',
          desc: '',
          name: '',
          startTime: '',
          endTime: '',
          panicBuyList: [],
          marketingSkus: [],
          timeValue: '',
        },
      }
    },
    created() {
      this.queryPanicBuy();
    },
    methods: {
      queryPanicBuy() {
        queryPanicBuyForDetail(this.$route.query.id).then(res => {
          this.panicbuy.id = res.id;
          this.panicbuy.desc = res.desc;
          this.panicbuy.name = res.name;
          this.panicbuy.startTime = res.startTime;
          this.panicbuy.endTime = res.endTime;
          this.panicbuy.timeValue = [];
          this.panicbuy.timeValue.push(res.startTime);
          this.panicbuy.timeValue.push(res.endTime);
          this.selectedSkus = [];
          this.selectedSkus = res.panicBuyList.map(panicBuy => {
            panicBuy.orgingdiscount = Math.round(panicBuy.discount * 100);
            return panicBuy;
          });
        })
      },
      // 返回
      goBack() {
        this.$router.go(-1);//返回上一层
      }
    }
    ,
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
