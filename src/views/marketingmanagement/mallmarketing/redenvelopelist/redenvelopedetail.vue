<template>
  <div class="app-container">
    <div style="line-height: 50px">红包概况</div>
    <div class="detailsTable">
      <el-row>
        <el-col :span="8">红包名称：{{redenvelope.name}}</el-col>
        <el-col :span="8">红包描述：{{redenvelope.desc}}</el-col>
        <el-col :span="8">优惠金额：满：{{redenvelope.fullPrice.toFixed(2)}} 减：{{redenvelope.price.toFixed(2)}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">店铺报名截止时间：{{redenvelope.signupTime}}</el-col>
        <el-col :span="8">开始时间：{{redenvelope.startTime}}</el-col>
        <el-col :span="8">结束时间：{{redenvelope.endTime}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">生成个数：{{redenvelope.num}}</el-col>
        <el-col :span="8">限领个数：{{redenvelope.limitNum}}</el-col>
      </el-row>
    </div>
    <el-tabs @tab-click="changeTab"  v-model="activeName" type="card" style="margin-top: 20px">
      <el-tab-pane label="未领取红包码" name="0">
        <el-table
          :data="noReceived|pagination(pageNo,pageSize)"
          v-loading="listLoading"
          border
          fit
          highlight-current-row
        >
          <el-table-column label="红包码序列号">
            <template slot-scope="scope">{{ scope.row.code }}</template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已领取未使用红包码" name="1">
        <el-table
          :data="noUsed|pagination(pageNo,pageSize)"
          border
          fit
          highlight-current-row
        >
          <el-table-column label="红包码序列号">
            <template slot-scope="scope">{{ scope.row.code }}</template>
          </el-table-column>
          <el-table-column label="领取时间">
            <template slot-scope="scope">{{ scope.row.receiveTime }}</template>
          </el-table-column>
          <el-table-column label="领取人">
            <template slot-scope="scope">{{ scope.row.userName }}</template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已使用红包码" name="2">
        <el-table
          :data="used|pagination(pageNo,pageSize)"
          border
          fit
          highlight-current-row
        >
          <el-table-column label="红包码序列号">
            <template slot-scope="scope">{{ scope.row.code }}</template>
          </el-table-column>
          <el-table-column label="领取时间">
            <template slot-scope="scope">{{ scope.row.receiveTime }}</template>
          </el-table-column>
          <el-table-column label="领取人">
            <template slot-scope="scope">{{ scope.row.userName }}</template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo"
                   :page-size="pageSize" layout=" prev, pager, next, sizes, jumper"
                   :total="activeName=='0'?noReceived.length:activeName=='1'?noUsed.length:used.length"></el-pagination>

    <div style="text-align: center; margin-top: 20px">
      <router-link to="/promotionManagement/mallPromotion/bonusList">
        <el-button type="info" icon="el-icon-back">返回红包列表</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>

  import {queryRedEnvelopeDetails} from '@/api/redenvelopedetail';

  export default {
    data() {
      return {
        activeName: '0',
        listLoading: true,
        redenvelope: {
          fullPrice: 0,
          price: 0
        },
        pageNo: 1,
        pageSize: 10,
        noReceived: [],// 没有领取的红包
        noUsed: [],// 没有使用的红包
        used: [],// 已经使用的红包
      }
    },
    created() {
      this.queryDetail()
    },
    methods: {
      queryDetail() {
        this.listLoading = true;
        queryRedEnvelopeDetails(this.$route.query.id).then(res => {
          this.listLoading = false;
          this.redenvelope = res.redEnvelope;
          this.noReceived = res.redEnvelopeCode.filter(code => code.status == '0');
          this.noUsed = res.redEnvelopeCode.filter(code => code.status == '1');
          this.used = res.redEnvelopeCode.filter(code => code.status == '2');
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
