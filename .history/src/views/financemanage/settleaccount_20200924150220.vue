<template>
  <div class="dashboard-editor-container">
    <el-form ref="storeForm" :model="storeForm" class="storeForm">
      <div class="flex">
          <el-input v-model="storeForm.companyName"  placeholder="输入企业名称"></el-input>
          <el-select v-model="storeForm.businessType" placeholder="账号类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="storeForm.settleAuditStatus" placeholder="审核状态">
            <el-option
              v-for="item in options1"
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
          type="index"
          align="center"
          label="序号"
          width="50">
        </el-table-column>
         <el-table-column
          prop="companyName"
          align="center"
          label="企业名称">
        </el-table-column>
        <el-table-column
          prop="businessType"
          label="账号类型"
          align="center"
          >
          <template slot-scope="scope">
            商户
            <!-- <el-tag v-if="scope.row.businessType == '1'">品牌</el-tag>
            <el-tag v-if="scope.row.businessType == '0'">商户</el-tag> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="bankAddress"
          label="银行"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="bankUserName"
          label="账户名"
          align="center"
          >
        </el-table-column>
         <el-table-column
          prop="bankAccount"
          label="账号"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="bankName"
          label="支行"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="bankName"
          label="许可证图片"
          align="center"
          >
          <template slot-scope="scope">
            <el-link
              v-show="showCarPic"
              :underline="false"
              type="success"
              :href="scope.row.busLicensePic"
              target="_blank"
              style="vertical-align: bottom"
            > 查看
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="settleAuditStatus"
          label="审核状态"
          align="center"
          >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.settleAuditStatus == '1'" type="success">已通过</el-tag>
            <el-tag v-if="scope.row.settleAuditStatus == '0'" type="info">待审核</el-tag>
            <el-tag  v-if="scope.row.settleAuditStatus == '2'" type="danger">审核失败</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.settleAuditStatus == '0'" >
              <el-button type="text" style="margin: 0 5px 0 0" size="mini"  @click="handleDelete(scope.row,1)">通过</el-button>
              <el-button type="text" style="margin: 0 5px 0 0" size="mini"  @click="handleDelete(scope.row,2)">驳回</el-button>
            </template>
            <template v-if="scope.row.settleAuditStatus == '1'" >-</template>
            <template v-if="scope.row.settleAuditStatus == '2'" >
              <el-button type="text" style="margin: 0 5px 0 0" size="mini"  @click="handleDelete(scope.row,0)">失败原因</el-button>
            </template>
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
  import {getsettleinfo,postSettleinfo} from '@/api/financial';
  export default {
    components: {
      
    },
    data() {
      return {
        tableData:[],
        Item:{},
        showCarPic: true,
        option:[],
        options: [{
          value: 0,
          label: '商户'
        }, {
          value:1,
          label: '品牌 '
        },{
          value:'',
          label: '全部'
        }],
        options1: [{
          value: 0,
          label: '未审核'
        }, {
          value:1,
          label: '已审核 '
        }, {
          value:2,
          label: '审核不通过'
        }, {
          value:'',
          label: '全部'
        }],
        storeForm:{
          pageNum:0,
          pageSize:10,
          total:0,
          companyName:"",//公司名称
          storeName:"",//店铺名称
          settleAuditStatus:"",//结算账户审核状态 0 未审核 1 已审核 2 审核不通过
        },
        
      }
    },
    activated(){
      this.getsettleinfo()
    },
    created() {
      this.getsettleinfo()
    },
    methods: {
      //获取列表
      getsettleinfo(){
        console.log(this.storeForm)
        getsettleinfo(this.storeForm).then(res=>{
          console.log(res)
          this.tableData=res.data
          this.storeForm.total=res.recordsTotal
        })
      },
      //操作
      handleDelete(row,index){
        if(index==0){
            this.$alert(row.reason, '失败原因', {
              confirmButtonText: '确定',
              callback: action => {
                
              }
            });
        }else{
          if(index==2){
            this.$prompt('', '请输入驳回原因', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputValidator(val){
                console.log(val)
                if(val){
                  return true
                }else{
                  return false
                }
              },
              inputErrorMessage: '必须输入原因'
            }).then(({ value }) => {
              let data={
                "settleAuditStatus":index,
                "reason":value,
                "id":row.id
              }
              postSettleinfo(data).then(res=>{
                if(res==1){
                  this.getsettleinfo()
                }else{
                  this.$message.error("操作失败")
                }
              })
            }).catch(() => {
     
            });
          }else{
            this.$prompt('', '确定通过审核么', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(({ value }) => {
              let data={
                  settleAuditStatus:index,
                  reason:"",
                  id:row.id
              }
              postSettleinfo(data).then(res=>{
                console.log(res)
                if(res==1){
                  this.getsettleinfo()
                }else{
                  this.$message.error("操作失败")
                }
              })
            }).catch(() => {
     
            });
            
          }
          
        }
      },
      //搜索
      search(){
        this.storeForm.pageNum=0
        this.getsettleinfo()
      },
      // 改变当前页码
      handleCurrentChange(val) {
        this.storeForm.pageNum = val - 1;
        this.getsettleinfo()
      },
      // 改变每页显示记录数
      handleSizeChange(val) {
        this.storeForm.pageNum = 0;
        this.storeForm.pageSize = val;
        this.getsettleinfo()
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