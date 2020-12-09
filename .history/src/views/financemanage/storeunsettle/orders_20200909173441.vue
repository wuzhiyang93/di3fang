<template>
  <div class="dashboard-editor-container">
    <el-form ref="staffForm" :model="staffForm" class="staffForm">
      <div class="flex">
        <el-input v-model="staffForm.orderCode"  placeholder="订单编号"></el-input>
        <el-input v-model="staffForm.skuName"  placeholder="商品名称"></el-input>
        <el-button type="primary" style="background:#00acac" @click.native="search" icon="el-icon-search">搜索</el-button>
        <el-button type="primary" style="background:#00acac" @click.native="settle" >批量结算</el-button>
        <el-button type="primary" style="background:#00acac">导出表格</el-button>
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
          prop="orderActualPrice"
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
  </div>
</template>
<script>
  import {getStorebillingrecords,putSettle} from "@/api/financial"
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
          storeSettleStatus:1,
        },
        shopData:[],
        row:{},
        staffInfo:{},
      }
    },
    created() {
        console.log(this.$route.query.id)
        this.row=this.$route.query.row
        this.staffForm.storeId=this.$route.query.row.storeId
        this.getStorebillingrecords()
    },
    methods: {
      settle(){
        putSettle(this.row.storeId).then(res=>{
          console.log(res)
          if(res){
            this.$message({
              message: '批量结算成功',
              type: 'success'
            });
            this.getStorebillingrecords()
          }else{
            this.$message.error("批量结算失败")
          }
        })
      },
      //列表
      getStorebillingrecords(){
        console.log(this.staffForm)
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
    }
    .el-date-editor .el-range-separator{
      width: 10%;
    }
</style>