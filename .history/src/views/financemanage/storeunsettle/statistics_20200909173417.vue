<template>
  <div class="dashboard-editor-container">
    <el-form ref="storeForm" :model="storeForm" class="storeForm">
      <div class="flex">
          <el-input v-model="storeForm.storeName"  placeholder="输入结算单号"></el-input>
          <el-input v-model="storeForm.mobile"  placeholder="输入结算单号"></el-input>
          <el-button type="primary" style="background:#00acac" @click.native="search" icon="el-icon-search">搜索</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="mobile"
          align="center"
          label="手机号"
          width="150">
        </el-table-column>
         <el-table-column
          prop="storeName"
          align="center"
          label="企业名称">
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="未结算单数"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="totalOrderAmount"
          label="订单金额"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="settleAmount"
          label="结算金额"
          align="center"
          >
        </el-table-column>
        
        <el-table-column
          label="操作"
          fixed="right"
          align="center">
          <template slot-scope="scope">
            <router-link  :to="{path:'/financemanage/storesettle/storeunsettleorders',query:{row:scope.row}}">
              <el-button type="text" style="margin: 0 5px 0 0" size="mini">详情</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination background  @size-change="handleSizeChange" @current-change="handleCurrentChange"
                      :current-page="storeForm.pageNum+1" 
                      layout="total, sizes, prev, pager, next, jumper" :total="storeForm.total">
        </el-pagination>
      </div>
    </el-form>
  </div>
</template>
<script>
  import {getUnsettle,postSettleinfo} from '@/api/financial';
  export default {
    components: {
      
    },
    data() {
      return {
        tableData:[],
        Item:{},
        option:[],
        storeForm:{
          pageNum:0,
          pageSize:10,
          total:0,
          storeName:"",//店铺名称
          mobile:"",//手机号
        },
      }
    },
    activated(){
      this.getUnsettle()
    },
    created() {
      this.getUnsettle()
    },
    methods: {
      //获取列表
      getUnsettle(){
        console.log(this.storeForm)
        getUnsettle(this.storeForm).then(res=>{
          console.log(res)
          this.tableData=res.data
          this.storeForm.total=res.recordsTotal
        })
      },
      //搜索
      search(){
        this.getUnsettle()
      },
      // 改变当前页码
      handleCurrentChange(val) {
        this.storeForm.pageNum = val - 1;
        this.getUnsettle()
      },
      // 改变每页显示记录数
      handleSizeChange(val) {
        this.storeForm.pageNum = 0;
        this.storeForm.pageSize = val;
        this.getUnsettle()
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
      button{
        margin-right:10px;
      }
    }
    .editor-slide-upload{
    position: relative;
  }
  .el-upload__text{
    position: absolute;
    bottom: 20px;
    left: 10px;
    line-height: 1;
    color: #999;
  }
  .disabled >>> .el-upload--picture-card{
      display: none
  }
</style>