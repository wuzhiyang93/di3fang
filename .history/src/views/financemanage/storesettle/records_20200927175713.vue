<template>
  <div class="dashboard-editor-container">
    <el-form ref="storeForm" :model="storeForm" class="storeForm">
      <div class="flex">
          <el-input v-model="storeForm.entityName"  placeholder="输入商户名称"></el-input>
          <el-input v-model="storeForm.settleCode"  placeholder="输入结算单号"></el-input>
          <el-select v-model="storeForm.remitStatus" placeholder="是否打款">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" style="background:#00acac" @click.native="search" icon="el-icon-search">搜索</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="settleCode"
          align="center"
          label="结算单号"
          width="150">
        </el-table-column>
         <el-table-column
          prop="createTime"
          align="center"
          label="结算时间">
        </el-table-column>
        <el-table-column
          prop="contactPhone"
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
          label="订单数量"
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
          prop="remitStatus"
          label="是否打款"
          align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.remitStatus == '1'" type="success">已打款</el-tag>
            <el-tag v-else type="danger">未打款</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          align="center">
          <template slot-scope="scope">
            <router-link :to="{path:'/financemanage/storesettle/storesettlerecorddetail',query:{settleCode:scope.row.settleCode,storeId:scope.row.storeId}}">
              <el-button type="text" style="margin: 0 5px 0 0" size="mini">详情</el-button>
            </router-link>
            <el-button v-if="scope.row.remitStatus == '0'" type="text" size="small" @click.native="handleEdit(scope.$index, scope.row,1)">上传打款单据</el-button>
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
    <el-dialog
     title="上传打款单据"
      :visible.sync="showRemit"
      width="30%">
      <div style="margin-bottom:20px">结算金额：{{row.settleAmount}}</div>
      <div>
        <el-upload
        :limit="1"
        :class="{disabled:uploadCardF}"
        :file-list="fileList"
        :on-change = "changeCardF"
        :before-remove= "deleteCardF"
        :show-file-list="true"
        :on-success="upCardBack"
        class="editor-slide-upload"
        :action="uploadApi"
        :headers="headers"
        list-type="picture-card"
        name="image"
        accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,. GIF,.ICO"
      >
        <i class="el-icon-plus"></i>
        <div class="el-upload__text">上传打款单据</div>
      </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click.nactive="postRemit">提交单据</el-button>
        <el-button @click="showRemit = false">取 消</el-button>
        
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {getToken} from '@/utils/token';
  import {getSettle,postSettleinfo,postRemit} from '@/api/financial';
  export default {
    components: {
      
    },
    data() {
      return {
        tableData:[],
        headers: {
          Authorization: 'Bearer ' + getToken()
        },
         options: [{
          value: 0,
          label: '未打款'
        }, {
          value:1,
          label: '已打款 '
        }, {
          value:2,
          label: '全部'
        }],
        uploadApi: process.env.UPLOAD_API,  // 上传图片api
        Item:{},
        uploadCardF:false,
        option:[],
        fileList:[],
        row:{},
        showRemit:false,
        storeForm:{
          pageNum:0,
          pageSize:10,
          total:0,
          storeName:"",//店铺名称
          mobile:"",//手机号
        },
        remitPic:"",
      }
    },
    activated(){
      this.getSettle()
    },
    created() {
      this.getSettle()
    },
    methods: {
      //提交单据
      postRemit(){
         if(!this.remitPic||this.remitPic==""){
           this.$message.error("请上传单据")
           return
         }
        let data={
          settleCode:this.row.settleCode,
          remitPic:this.remitPic
        }
       
        console.log(data)
        postRemit(data).then(res=>{
          console.log(res)
          if(res==1){
           this.getSettle()
            this.showRemit=false
          }else{
            this.$message.error("提交失败")
          }
        })
      },
       //上传单据
      upCardBack(response, file, fileList){
        console.log(response)
        this.remitPic=response
      },
      //删除单据
      deleteCardF(file,fileList){
        console.log('delete')
        this.uploadCardF=false
        this.remitPic=""
      },
      
      changeCardF(file,fileList){
        console.log('change')
        console.log(fileList.length)
        if(fileList.length>0){
          this.uploadCardF=true
        }else{
          this.uploadCardF=false
        }
      },
      //获取列表
      getSettle(){
        console.log(this.storeForm)
        getSettle(this.storeForm).then(res=>{
          console.log(res)
          this.tableData=res.data
          this.storeForm.total=res.recordsTotal
        })
      },
      //搜索
      search(){
        this.getSettle()
      },
      //操作
      handleEdit(index, row,state){
         this.row=row
        if(state==1){
          this.showRemit=true
          this.fileList=[]
        }
      },
      // 改变当前页码
      handleCurrentChange(val) {
        this.storeForm.pageNum = val - 1;
        this.getSettle()
      },
      // 改变每页显示记录数
      handleSizeChange(val) {
        this.storeForm.pageNum = 0;
        this.storeForm.pageSize = val;
        this.getSettle()
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