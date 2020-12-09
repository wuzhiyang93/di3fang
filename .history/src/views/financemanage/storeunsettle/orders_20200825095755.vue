<template>
  <div class="dashboard-editor-container">
    <el-form ref="staffForm" :model="staffForm" class="staffForm">
      <div class="flex">
        
          <el-input v-model="staffForm.orderCode"  placeholder="输入结算单号"></el-input>
         <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至 "
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd">
        </el-date-picker>
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
          prop="orderActualPrice"
          label="订单金额"
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
  import {getStorebillings} from "@/api/storeInfo"
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
          startTime:"",
          endTime:"",
          storeId:this.$store.state.user.storeId,
          storeSettleCode:this.$route.query.settleCode
        },
        shopData:[],
        staffInfo:{},
      }
    },
    created() {
        console.log(this.staffForm.storeId)
        this.getStorebillings()
    },
    methods: {
  
      //列表
      getStorebillings(){
        console.log(this.staffForm)
        getStorebillings(this.staffForm).then(res=>{
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
        
        this.getStorebillings()
      },
       // 改变当前页码
      handleCurrentChange(val) {
        this.staffForm.pageNum = val - 1;
        this.getStorebillings()
      },
      // 改变每页显示记录数
      handleSizeChange(val) {
        this.staffForm.pageNum = 0;
        this.staffForm.pageSize = val;
        this.getStorebillings()
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