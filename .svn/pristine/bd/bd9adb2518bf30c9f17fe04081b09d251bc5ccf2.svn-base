<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filterBox">
        <p>活动名称</p>
        <el-input placeholder="活动名称" v-model="listQuery.name" size="medium" style="width: 180px;" class="filter-item"/>
      </div>
      <div class="filterBox">
        <p>活动状态</p>
        <el-select class="filter-item" v-model="stateValue" size="medium" style="width: 150px">
          <el-option label="全部" value="0"></el-option>
          <el-option label="已撤销" value="1"></el-option>
          <el-option label="未开始" value="2"></el-option>
          <el-option label="进行中" value="3"></el-option>
          <el-option label="已结束" value="4"></el-option>
        </el-select>
      </div>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
      <br/>
      <router-link style="margin-left: 10px" to="/marketingmanager/communitygroupbuy/addcommunitygroupbuy">
        <el-button class="filter-item" size="medium" type="primary" icon="el-icon-plus">添加团购活动</el-button>
      </router-link>
    </div>

    <el-table
      :data="communityBuyList"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="团购名称" min-width="110">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="活动时间" width="310">
        <template slot-scope="scope">{{ scope.row.strEndTime }}</template>
      </el-table-column>
      <el-table-column label="商品总库存" min-width="50">
        <template slot-scope="scope">{{ scope.row.countStock }}</template>
      </el-table-column>
      <el-table-column label="销量" min-width="50">
        <template slot-scope="scope">{{ scope.row.saleNum }}</template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == '1'" type="warning">已撤销</el-tag>
          <el-tag v-if="scope.row.status == '2'" type="success">未开始</el-tag>
          <el-tag v-if="scope.row.status == '3'" type="info">进行中</el-tag>
          <el-tag v-if="scope.row.status == '4'" type="info">已结束</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="320">
        <template slot-scope="scope">
          <el-button type="success" style="margin: 0" size="mini" @click="viewVolume(scope.row.id)">库存/销量</el-button>


          <router-link v-if="scope.row.hasCommunityInvoice == '0'"
                       :to="{path:'/marketingmanager/communitygroupbuy/communitygroupbuydeliverlist',query:{id:scope.row.id,name:scope.row.name}}">
            <el-button type="success" style="margin: 0" size="mini">查看发货单</el-button>
          </router-link>


          <el-popover v-if="scope.row.status == '2' || scope.row.status == '3'"
                      placement="left"
                      @show="showQrCode(scope.row.id)"
                      trigger="hover">
            <div style="text-align: center">
              <img width="120" height="120" :src="codeImg">
              <div style="font-size: 12px; border-bottom: dashed 1px #ccc; line-height: 25px; margin: 0">扫一扫,或者
                <el-link style="font-size: 12px" type="primary" :underline="false"
                         @click="downloadQrCode(scope.row.id)">下载二维码
                </el-link>
              </div>
              <div style="font-size: 12px; margin: 0; padding-top: 5px">
                <el-link style="font-size: 12px" type="primary" :underline="false" href="javascript:;"
                         v-clipboard:copy="mobileUrl + scope.row.id" v-clipboard:success="onCopy">复制地址
                </el-link>
              </div>
            </div>
            <el-button slot="reference" v-if="scope.row.status == '2' || scope.row.status == '3'" type="warning"
                       style="margin: 0" size="mini">推广
            </el-button>
          </el-popover>
          <router-link v-if="scope.row.status == '2' || scope.row.status == '3'"
                       :to="{path:'/marketingmanager/communitygroupbuy/editcommunitygroupbuy',query:{id:scope.row.id}}">
            <el-button type="primary" style="margin: 0" size="mini">编辑</el-button>
          </router-link>

          <el-button v-if="scope.row.status == '2' || scope.row.status == '3'" size="mini" style="margin: 0"
                     type="danger" @click="deleteDialog(scope.row.id)">撤销
          </el-button>

        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.pageNum+1" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>


    <el-dialog title="货品库存/销量" :visible.sync="dialogFormVisible" width="75%">
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
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="库存">
          <template slot-scope="scope">{{ scope.row.stock }}</template>
        </el-table-column>
        <el-table-column label="销量">
          <template slot-scope="scope">{{ scope.row.saleNum }}</template>
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
    queryCommunityBuyPageList, //分页查询社区团购信息
    pageListByMarketId,//查看是团购销量/库存时 分页查询单品信息
    dismissCommunityBuy,//撤销团购活动
    createCommunityBuyQrCode,//创建社区团购活动推广二维码
    downPng,//下载社区团购推广二维码,
    obtaincommunityBuyMobileUrl,//获取移动端社区团购详情地址
  } from '@/api/communitygroupbuylist';

  export default {
    data() {
      return {
        isProcess: false, //接口是否正在处理中
        stateValue: '0', //活动状态
        dialogFormVisible: false, //活动列表显示标记
        listLoading: true, //活动列表加载标记
        SkuListLoading: true,//Sku列表加载标记
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          name: '',
          status: '',
        }, // 查询参数
        codeImg: '', //二维码图片
        skuQuery: {
          pageNum: 0,
          pageSize: 10,
          communityBuyId: ''
        }, //库存销量查询参数
        total: null, // 数据总数,
        totalSku: null, //sku数据总数
        communityBuyList: [], //活动列表数组
        tempCommunityBuyId: '',//临时活动 ID
        skusData: [], //销量列表
        mobileUrl: '',//移动端社区团购详情地址
      }
    },
    created() {
      this.getList();
      this.getcommunityBuyMobileUrl();
    },
    methods: {
      //移动端社区团购详情地址
      getcommunityBuyMobileUrl() {
        obtaincommunityBuyMobileUrl().then(res => {
          this.mobileUrl = res.url;
        });
      },
      //创建推广二维码
      showQrCode(id) {
        this.codeImg = '';
        createCommunityBuyQrCode(id, 120, 120).then(res => {
          let blob = new Blob([res], {type: "application/UTF-8"});
          let objectUrl = URL.createObjectURL(blob);
          this.codeImg = objectUrl;
        });
      },
      //下载二维码
      downloadQrCode(id) {
        if (this.isProcess) {
          return
        }
        this.isProcess = true;
        downPng(id).then(res => {
          this.isProcess = false;
          let blob = new Blob([res], {type: "application/UTF-8"});
          let objectUrl = URL.createObjectURL(blob);
          window.location.href = objectUrl;
        });
      },
      //查询活动列表
      getList() {
        this.listLoading = true
        queryCommunityBuyPageList(this.listQuery).then(response => {
          this.communityBuyList = response.data;
          this.total = response.recordsTotal;
          this.listLoading = false
        });
      },
      //撤销活动
      deleteDialog(id) {
        this.$confirm('确认需要撤销活动吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.isProcess) {
            return;
          }
          this.isProcess = true;
          dismissCommunityBuy(id).then(response => {
            this.isProcess = false;
            if (response > 0) {
              this.$message({
                type: 'success',
                message: '活动撤销成功!'
              })
              this.getList();
            }
          });
        })
      },
      //复制
      onCopy() {
        this.$message({
          type: 'success',
          message: '复制成功!'
        })
      },
      //查看库存销量
      viewVolume(id) {
        this.SkuListLoading = true;
        this.tempCommunityBuyId = id;
        this.skuQuery.communityBuyId = id
        pageListByMarketId(this.skuQuery).then(response => {
          this.skusData = response.data;
          this.totalSku = response.recordsTotal;
          this.SkuListLoading = false;
          this.dialogFormVisible = true;
        });
      },
      // 过滤查询
      handleFilter() {
        if (this.stateValue != '0') {
          this.listQuery.status = this.stateValue;
        } else {
          this.listQuery.status = '';
        }
        this.listQuery.pageNum = 0;
        this.getList();
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
        this.viewVolume(this.tempCommunityBuyId);
      },
    }
  }
</script>
