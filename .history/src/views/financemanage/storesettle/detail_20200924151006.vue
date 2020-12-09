<template>
  <div class="dashboard-editor-container">
    <div>
      <p class="flex"><span>供应商名称：{{Item.storeName}}</span><span>结算金额：{{Item.settleAmount}}</span></p>
      <p class="flex"><span>结算单号：{{Item.settleCode}}</span><span>结算日期：{{Item.createTime}}</span></p>
      <p class="flex"><span>是否打款：<template v-if="Item.remitStatus == 1">已打款</template><template v-else>未打款</template></span><span>结算单据<el-button type="primary" style="background:#00acac;margin-left:20px" @click.native="look">查看单据</el-button></span></p>
    </div>
    <el-form ref="staffForm" :model="staffForm" class="staffForm">
      <div class="flex">
        <el-input v-model="staffForm.orderCode"  placeholder="订单编号"></el-input>
        <el-input v-model="staffForm.skuName"  placeholder="商品名称"></el-input>
        <el-button type="primary" style="background:#00acac" @click.native="search" icon="el-icon-search">搜索</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
          <el-table-column
          type="index"
           align="center"
           label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="orderCreateTime"
          align="center"
          label="下单时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="orderCode"
          align="center"
          label="订单编号">
        </el-table-column>

        <el-table-column
          prop="skuName"
          align="center"
          label="商品名称"
          >
        </el-table-column>
        <el-table-column
          prop="skuNo"
          label="商品编码"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="skuAmount"
          label="订单金额"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="skuActualAmount"
          label="结算金额"
          align="center"
          >
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination background  @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current="staffForm.pageNum" 
                      :current-page="staffForm.pageNum+1" 
                      layout="total, sizes, prev, pager, next, jumper" :total="staffForm.total">
        </el-pagination>
      </div>
    </el-form>
        <el-dialog
    title="查看单据"
    :visible.sync="dialogVisible"
    width="40%"
    >
      <template v-if="Item.remitPic"><img style="widht:100%" :src="Item.remitPic"></template>
      <template v-else>暂未上传单据</template>
    </el-dialog>
  </div>
</template>
<script>
  import {getStorebillingrecords,getSettledetail,postRemit} from "@/api/financial"
  export default {
    components: {
      
    },
    data() {
      return {
        tableData:[],
        Item:{},
        date:"",
        staffDialog:false,
        dialogVisible:false,
        staffTitle:"",
        staffForm:{
          pageNum:0,
          pageSize:10,
          total:0,
          storeId:"",
          orderCode:"",
          skuName:"",
          settleCode:"",
          storeSettleCode:"",
          storeSettleStatus:2,
        },
        shopData:[],
        row:{},
        staffInfo:{},
      }
    },
    created() {
        this.staffForm.settleCode=this.$route.query.settleCode
        this.staffForm.storeSettleCode=this.$route.query.settleCode
        this.staffForm.storeId=this.$route.query.storeId
        this.getStorebillingrecords()
        this.getSettledetail()
    },
    methods: {
      
      //查看单据
      look(){
        this.dialogVisible=true
      },
      //详情
      getSettledetail(){
        getSettledetail(this.staffForm.settleCode).then(res=>{
          console.log(res)
          if(res.flag==1){
            this.Item=res.data
          }
        })
      },
      //列表
      getStorebillingrecords(){
        getStorebillingrecords(this.staffForm).then(res=>{
          console.log(res)
          this.tableData=res.data
          this.staffForm.total=res.recordsTotal
        })
      },
      //搜索
      search(){
        if(this.date){
          this.staffForm.startTime=this.date[0]
          this.staffForm.endTime=this.date[1]
        }
        
        this.getStorebillingrecords()
      },
       // 改变当前页码
      handleCurrentChange(val) {
        this.staffForm.pageNum = val - 1;
        this.getStorebillingrecords()
      },
      // 改变每页显示记录数
      handleSizeChange(val) {
        this.staffForm.pageNum = 0;
        this.staffForm.pageSize = val;
        this.getStorebillingrecords()
      },
    },
}
</script>
<style lang="scss" scoped>
.dashboard-editor-container {
    padding: 20px;
    background-color: #fff;
    position: relative;
  }
    .flex{
      display: flex;
      margin: 0 0 20px;
      .el-input{
        width: 150px;
       
      }
      div{
         margin-right:10px;
      }
      span{
        flex: 1;
      }
    }
    .el-date-editor .el-range-separator{
      width: 10%;
    }
</style>