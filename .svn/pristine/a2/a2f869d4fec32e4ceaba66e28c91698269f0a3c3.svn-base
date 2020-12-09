<template>
  <div class="app-container">
    <div class="filter-container">
      <el-dropdown class="filter-item" style="margin-left: 5px;" @command="exportAll">
        <el-button size="medium" type="primary">导出发货单<i class="el-icon-arrow-down el-icon--right"></i></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>导出所有</el-dropdown-item>
          <el-dropdown-item>导出选中</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <router-link
        :to="{path:'/marketingmanager/communitygroupbuy/communitygroupbuyprint',query:{id:thisCommunityBuyId,name:communityBuyName}}">
        <el-button class="filter-item" size="medium" style="margin-left: 5px;" type="primary" icon="el-icon-printer">
          打印发货单
        </el-button>
      </router-link>
    </div>

    <div style="margin-bottom: 20px">
      <el-tag type="success" style="font-size: 14px">销售总额：¥{{amountMoney}}</el-tag>
      <el-divider direction="vertical"></el-divider>
      <el-tag style="margin-left: 10px; font-size: 14px">销售总数：{{amountSales}}件</el-tag>
    </div>

    <el-table
      :data="tableData"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="40"/>
      <el-table-column label="团长名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="手机号" min-width="110">
        <template slot-scope="scope">{{ scope.row.mobile }}</template>
      </el-table-column>
      <el-table-column label="省市区" min-width="150">
        <template slot-scope="scope">{{ scope.row.address }}</template>
      </el-table-column>
      <el-table-column label="小区名称" min-width="150">
        <template slot-scope="scope">{{ scope.row.detailAddress }}</template>
      </el-table-column>
      <el-table-column label="销售额">
        <template slot-scope="scope">{{ scope.row.money }}</template>
      </el-table-column>
      <el-table-column label="销量">
        <template slot-scope="scope">{{ scope.row.num }}</template>
      </el-table-column>
      <el-table-column label="操作" width="165">
        <template slot-scope="scope">
          <el-button type="success" style="margin: 5px 0 0 0" size="mini" @click="showDetail(scope.row.id)">查看明细
          </el-button>
          <router-link
            :to="{path:'/marketingmanager/communitygroupbuy/communitygroupbuyheadsprint',query:{id:thisCommunityBuyId,headId:scope.row.headId,name:communityBuyName}}">
            <el-button type="primary" style="margin: 0" size="mini">打印</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.pageNum+1" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>


    <el-dialog title="货品清单" :visible.sync="dialogFormVisible" width="75%">
      <el-table
        :data="skusData"
        v-loading="SkuListLoading"
        border
        fit
        highlight-current-row
      >
        <el-table-column label="货品图片" width="80">
          <template slot-scope="scope"><img :src="scope.row.url" width="50" height="50"></template>
        </el-table-column>
        <el-table-column label="货品名称" min-width="300">
          <template slot-scope="scope">{{ scope.row.skuName }}</template>
        </el-table-column>
        <el-table-column label="销量">
          <template slot-scope="scope">{{ scope.row.num }}</template>
        </el-table-column>
      </el-table>


      <div class="pagination-container">
        <el-pagination background @current-change="skuHandleCurrentChange"
                       :current-page="skuQuery.pageNum+1"
                       :page-size="skuQuery.pageSize"
                       layout="total, prev, pager, next, jumper"
                       :total="totalSku">
        </el-pagination>
      </div>


      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

  import {
    querycommunityInvoice, //分页查询社区团购发货单信息
    queryCommunityInvoiceDetail,//分页查询社区团购发货单详情,
    exportAllCommunityInvoice,//导出所有社区团购发货单信息
    queryMoneyAndNum,//查询社区团购的 '销售总额' 和 '销售总数'
  } from '@/api/communitygroupbuydeliverlist';


  export default {
    data() {
      return {
        thisCommunityBuyId: this.$route.query.id,
        communityBuyName: this.$route.query.name,
        isProcess: false, //接口是否正在处理中
        dialogFormVisible: false, //详情窗口显示标记
        listLoading: true,//数据加载中
        SkuListLoading: true,//Sku列表加载标记
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          communityBuyId: this.$route.query.id
        }, // 查询参数
        skuQuery: {
          pageNum: 0,
          pageSize: 10,
          communityInvoiceId: ''
        }, //库存销量查询参数
        total: null, // 数据总数,
        totalSku: null, //sku数据总数
        tableData: [], //数据列表数组
        multipleSelection: [],
        skusData: [],//销售量数组
        amountSales: '',//销量总数
        amountMoney: '',//销售总额
        tempId: '',//临时活动 ID

      }
    },
    created() {
      this.getList();
      this.getSales();
    },
    methods: {
      //获取列表数据
      getList() {
        this.listLoading = true
        querycommunityInvoice(this.listQuery).then(response => {
          this.tableData = response.data;
          this.total = response.recordsTotal;
          this.listLoading = false
        });
      },
      //查询销售量和销售额
      getSales() {
        queryMoneyAndNum(this.$route.query.id).then(response => {
          if (response.indexOf('-') > -1) {
            this.amountMoney = Number(response.split('-')[0]).toFixed(2);
            this.amountSales = response.split('-')[1];
          }
        });
      },
      //销量详情
      showDetail(id) {
        this.tempId = id;
        this.skuQuery.communityInvoiceId = id;
        this.SkuListLoading = true;
        queryCommunityInvoiceDetail(this.skuQuery).then(response => {
          this.skusData = response.data;
          this.totalSku = response.recordsTotal;
          this.dialogFormVisible = true;
          this.SkuListLoading = false;
        });
      },
      exportAll() {
        exportAllCommunityInvoice(this.$route.query.id).then(res => {
          let blob = new Blob([res], {type: "application/UTF-8"});
          let objectUrl = URL.createObjectURL(blob);
          window.location.href = objectUrl;
        });
      },
      handleSelectionChange(val) {
        // val 为选中数据的集合
        this.multipleSelection = val
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val - 1;
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 0;
        this.listQuery.pageSize = val;
        this.getList();
      },
      skuHandleCurrentChange(val) {
        this.skuQuery.pageNum = val - 1;
        this.showDetail(this.tempId);
      },

    }
  }
</script>
