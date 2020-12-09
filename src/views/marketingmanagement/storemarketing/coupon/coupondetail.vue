<template>
  <div class="app-container">
    <div style="line-height: 50px">优惠券概况</div>
    <div class="detailsTable">
      <el-row>
        <el-col :span="8">优惠券名称：{{coupon.coupon.name}}</el-col>
        <el-col :span="8">生成张数：{{coupon.coupon.num}}</el-col>
        <el-col :span="8">开始时间：{{coupon.coupon.startTime}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">优惠券描述：{{coupon.coupon.desc}}</el-col>
        <el-col :span="8">限领张数：{{coupon.coupon.limitNum}}</el-col>
        <el-col :span="8">结束时间：{{coupon.coupon.endTime}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">类型：{{coupon.coupon.type=='1'?'满减':'直降'}}</el-col>
        <el-col v-if="coupon.coupon.type=='1'" :span="8">
          满：{{coupon.coupon.couponFull.fullPrice.toFixed(2)}}减：{{coupon.coupon.couponFull.price.toFixed(2)}}
        </el-col>
        <el-col v-if="coupon.coupon.type=='2'" :span="8">直降金额：{{coupon.coupon.couponFall.price.toFixed(2)}}</el-col>
      </el-row>
    </div>
    <el-tabs @tab-click="changeTab" v-model="activeName" type="card" style="margin-top: 20px">
      <el-tab-pane label="未领取券码" name="0">
        <el-table
          :data="noReceived|pagination(pageNo,pageSize)"
          v-loading="listLoading"
          border
          fit
          highlight-current-row
        >
          <el-table-column label="券码序列号">
            <template slot-scope="scope">{{ scope.row.code }}</template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已领取未使用券码" name="1">
        <el-table
          :data="noUsed|pagination(pageNo,pageSize)"
          border
          fit
          highlight-current-row
        >
          <el-table-column label="券码序列号">
            <template slot-scope="scope">{{ scope.row.code }}</template>
          </el-table-column>
          <el-table-column label="领取时间">
            <template slot-scope="scope">{{ scope.row.receiveTime }}</template>
          </el-table-column>
          <el-table-column label="领取人">
            <template slot-scope="scope">{{ scope.row.username }}</template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已使用券码" name="2">
        <el-table
          :data="used|pagination(pageNo,pageSize)"
          border
          fit
          highlight-current-row
        >
          <el-table-column label="券码序列号">
            <template slot-scope="scope">{{ scope.row.code }}</template>
          </el-table-column>
          <el-table-column label="领取时间">
            <template slot-scope="scope">{{ scope.row.receiveTime }}</template>
          </el-table-column>
          <el-table-column label="领取人">
            <template slot-scope="scope">{{ scope.row.username }}</template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo"
                   :page-size="pageSize" layout=" prev, pager, next, sizes, jumper"
                   :total="activeName=='0'?noReceived.length:activeName=='1'?noUsed.length:used.length"></el-pagination>

    <div style="text-align: center; margin-top: 20px">
      <el-button type="info" icon="el-icon-back" @click="goBack()">返回优惠券列表</el-button>
    </div>
  </div>
</template>

<script>
  import {queryCouponDetail} from '@/api/coupondetail';

  export default {
    data() {
      return {
        pageNo: 1,
        pageSize: 10,
        noReceived: [],// 没有领取的卷码
        noUsed: [],// 没有使用的卷码
        used: [],// 已经使用的卷码
        coupon: {
          coupon: {}
        },// 优惠卷
        activeName: '0',
        listLoading: true,
      }
    },
    created() {
      this.queryCouponDetail()
    },
    methods: {
      queryCouponDetail() {
        this.listLoading = true;
        queryCouponDetail(this.$route.query.id).then(res => {
          this.listLoading = false;
          this.coupon = res;
          this.noReceived = res.couponCode.filter(code => code.status == '0');
          this.noUsed = res.couponCode.filter(code => code.status == '1');
          this.used = res.couponCode.filter(code => code.status == '2');
        })
      },
      // 返回
      goBack() {
        this.$router.back(-1);
      },
      handleSizeChange(val) {
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        this.pageNo = val;
      },
      changeTab() {
        this.pageNo = 1;
      }
    },
    filters: {
      pagination(array, pageNo, pageSize) {
        let offset = (pageNo - 1) * pageSize;
        let data = (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
        return data
      }
    }
  }
</script>
