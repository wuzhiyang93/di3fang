<template>
  <div class="app-container">
    <el-form label-position="right" :model="communityBuyForm" :rules="Rules" ref="communityBuyForm" label-width="120px"
             style="margin-top: 20px">
      <el-form-item prop="name">
        <span slot="label">团购名称</span>
        <el-input maxlength="12" v-model="communityBuyForm.name" placeholder="请填写活动名称, 长度为1~12个字"/>
      </el-form-item>
      <el-form-item label="团购公告">
        <el-input type="textarea" v-model="communityBuyForm.announcement" maxlength="200" :rows="3"
                  placeholder="请填写团购公告, 长度为1~200个字"/>
      </el-form-item>
      <el-form-item prop="startEndTime">
        <span slot="label">团购时间</span>
        <el-date-picker
          style="width: 355px"
          class="search-datepicker"
          size="medium"
          :clearable="false"
          v-model="communityBuyForm.startEndTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker>
        <div style="color: rgb(153, 153, 153); line-height: initial; margin-top: 5px;">活动时间最长7天</div>
      </el-form-item>
      <el-form-item prop="deliveryTime">
        <span slot="label">送达时间</span>
        <el-date-picker
          v-model="communityBuyForm.deliveryTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <span slot="label"><span class="labelImportant">*</span>选择商品</span>
        <el-button class="filter-item" size="medium" type="primary" icon="el-icon-plus"
                   @click="showSkuTables">选择促销商品
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-table
          :data="selectSkuArry"
          v-loading="listLoading"
          border
          fit
          highlight-current-row
        >
          <el-table-column label="商品图片" width="80">
            <template slot-scope="scope"><img :src="scope.row.url" width="50" height="50"></template>
          </el-table-column>
          <el-table-column label="商品名称" min-width="250">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column label="可售数量">
            <template slot-scope="scope">
              <el-input type="number" v-model="scope.row.stock"/>
            </template>
          </el-table-column>
          <el-table-column label="供货价">
            <template slot-scope="scope">
              <el-input type="number" v-model="scope.row.supplyPrice"/>
            </template>
          </el-table-column>
          <el-table-column label="零售价">
            <template slot-scope="scope">{{ scope.row.price }}</template>
          </el-table-column>
          <el-table-column label="团购价">
            <template slot-scope="scope">
              <el-input type="number" v-model="scope.row.groupPrice"/>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="138">
            <template slot-scope="scope">
              <el-button size="mini" style="margin: 0" type="primary" @click="prepareEditSkuInfo(scope.row)">编辑
              </el-button>
              <el-button size="mini" style="margin: 0" type="danger" @click="deleteDialog(scope.row.skuId)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createData">保存促销活动</el-button>
        <router-link to="/marketingmanager/communitygroupbuy/communitygroupbuylist">
          <el-button type="info">取消</el-button>
        </router-link>
      </el-form-item>
    </el-form>

    <el-dialog title="选择商品" :visible.sync="dialogFormVisible" width="75%">
      <div class="filter-container">
        <el-input placeholder="商品名称" size="medium" v-model="skuQuery.skuName" style="width: 200px;"
                  class="filter-item"/>
        <el-input placeholder="商品编号" size="medium" v-model="skuQuery.skuNo" style="width: 200px;" class="filter-item"/>
        <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search">搜索
        </el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="skusData"
        v-loading="skuListLoading"
        @select="checkedChange"
        border
        fit
        reserve-selection="true"
        row-key="id"
        highlight-current-row
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center" width="40"/>
        <el-table-column label="商品图片" width="80">
          <template slot-scope="scope"><img :src="scope.row.url" width="50" height="50"></template>
        </el-table-column>
        <el-table-column label="商品名称" min-width="250">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="商品编号" width="140">
          <template slot-scope="scope">{{ scope.row.skuNo }}</template>
        </el-table-column>
        <el-table-column label="价格" min-width="150">
          <template slot-scope="scope">{{ scope.row.price }}</template>
        </el-table-column>
        <el-table-column label="库存">
          <template slot-scope="scope">{{ scope.row.stock }}</template>
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
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="saveData">保存</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑商品" :visible.sync="editSkuVisible" width="75%">
      <el-form label-position="right" :model="editForm" :rules="editSkuFormRules" ref="editForm" label-width="100px">
        <el-form-item prop="name">
          <span slot="label">SPU标题</span>
          <el-input maxlength="200" v-model="editForm.name"/>
        </el-form-item>
        <el-form-item label="SPU副标题">
          <el-input maxlength="200" v-model="editForm.desc"/>
        </el-form-item>
        <el-form-item prop="pics">
          <span slot="label">SPU图片</span>
          <el-upload
            :action="uploadApi"
            :on-success="uploadLabelLogSuccess"
            :on-remove="removeSkuImages"
            :headers="headers"
            :file-list="fileList"
            name="image"
            style="display: inline-block"
            list-type="picture-card"
            accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO"
            :on-preview="handlePictureCardPreview">
            <el-tooltip effect="dark" content="建议图片尺寸800px * 800px" placement="right">
              <i class="el-icon-plus"></i>
            </el-tooltip>
          </el-upload>
        </el-form-item>
        <el-form-item label="图文详情">
          <tinymce v-model="editForm.mobileDesc" :height="300"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editSkuVisible = false">取消</el-button>
        <el-button type="primary" @click="saveSkuInfo">保存</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="imageDialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'


  //校验活动起始时间
  let checkStartEndTime = (rule, value, callback) => {
    if (value.length == 0) {
      callback(new Error("起始时间不能为空"))
    } else {
      let now = new Date().getTime();
      let startTime = new Date(value[0]).getTime();
      let endTime = new Date(value[1]).getTime();
      if (startTime <= now) {
        callback(new Error("起始时间不得早于当前时间"));
      } else if ((endTime - startTime) > 1000 * 60 * 60 * 24 * 7) {
        callback(new Error("活动时间最长为 7 天"));
      } else {
        callback();
      }

    }
  }
  //校验送达时间
  let checkDeliveryTime = (rule, value, callback) => {
    if (!value) {
      callback(new Error("送达时间不能为空"))
    } else {
      let now = new Date().getTime();
      let deliveryTime = new Date(value).getTime();
      if (deliveryTime <= now) {
        callback(new Error("送达时间不得早于当前时间"));
      } else {
        callback();
      }

    }
  }


  import {
    queryMarketSkuPageList, //分页查询sku列表信息
    editCommunityBuy, //保存编辑后的团购活动信息
    queryCommunityBuy, //编辑团购活动时查询该团购信息
  } from '@/api/editcommunitygroupbuy'


  import {
    formatDate,  //时间格式化
    parseTime
  } from '@/utils/index';


  import {
    isEmpty, //非空
    isMoney,//是否金钱
  } from '@/utils/validate'


  import {getToken} from "@/utils/token";


  export default {
    components: {Tinymce},
    data() {
      return {
        uploadApi: process.env.UPLOAD_API,// 上传文件路由
        headers: { // 设置上传的请求头部
          Authorization: 'Bearer ' + getToken()
        },
        dialogImageUrl: '',
        listLoading: false,
        skuListLoading: false,
        dialogFormVisible: false,
        editSkuVisible: false,
        imageDialogVisible: false,
        removeSkuIdArray: [],//要移除的SKUID
        selectSkuArry: [], //已选sku列表数据
        skuIdArray: [],//选中的 SKUID 数组
        skusData: [],//sku数据列表
        totalSku: null, //sku数据总数
        tempSkuArray: [], //临时保存SKU列表选中的SKU数据
        tempSkuImages: [], //临时图片数组, 存放当前编辑的 SKU 图片详情
        fileList: [], //图片详情
        skuQuery: {
          pageNum: 0,
          pageSize: 10,
          skuName: '',
          skuNo: '',
        }, //库存销量查询参数
        communityBuyForm: {
          id: this.$route.query.id,
          startEndTime: [],
          name: '', //团购名称
          announcement: '',//团购公告
          deliveryTime: '',//送达时间
          startTime: '',//开始时间
          endTime: '', //结束时间
          communityBuySkus: []//参与团购的sku
        },
        checkErrorMsg: '',//校验错误信息
        editForm: {
          name: '', //sku标题
          desc: '', //sku副标题
          mobileDesc: '', //移动端详情
          pics: '', //图片 多个逗号隔开
          skuId: '', //skuId
        },//编辑表单
        Rules: { //添加支付类型 校验
          name: [{
            required: true,
            trigger: 'blur',
            validator: isEmpty,
          }],
          startEndTime: [{
            required: true,
            trigger: 'blur',
            validator: checkStartEndTime,
          }],
          deliveryTime: [{
            required: true,
            trigger: 'blur',
            validator: checkDeliveryTime,
          }],
        },
        editSkuFormRules: { //编辑 SKU 详情 校验
          name: [{
            required: true,
            trigger: 'blur',
            validator: isEmpty,
          }],
        }
      }
    },
    created() {
      this.getInfo();
    },
    methods: {

      //查询当前活动详情
      getInfo() {
        queryCommunityBuy(this.$route.query.id).then(response => {
          if (response != null) {
            this.communityBuyForm.announcement = response.announcement;
            this.communityBuyForm.deliveryTime = response.deliveryTime;
            this.communityBuyForm.name = response.name;
            this.communityBuyForm.startEndTime = [response.startTime, response.endTime];
            this.selectSkuArry = response.communityBuySkus;
            this.selectSkuArry.forEach(value => {
              this.skuIdArray.push(value.skuId);
              value.url = value.defaultPhoto;
              value.skuImages = value.pics.split(',');
            })
          }
        });
      },
      //编辑 SKU 详情时移除图片
      removeSkuImages(file) {
        let url = file.response == undefined ? file.url : file.response;
        let index = this.tempSkuImages.indexOf(url);
        if (index > -1) {
          this.tempSkuImages.splice(index, 1);
        }
      },
      //准备编辑 SKU 详情
      prepareEditSkuInfo(row) {
        this.tempSkuImages = [];
        this.fileList = [];
        for (let i = 0; i < this.selectSkuArry.length; i++) {
          if (this.selectSkuArry[i].skuId == row.skuId) {
            this.editForm.name = this.selectSkuArry[i].name;
            this.editForm.skuId = this.selectSkuArry[i].skuId;
            this.editForm.desc = this.selectSkuArry[i].desc;
            this.editForm.mobileDesc = this.selectSkuArry[i].mobileDesc;
            this.selectSkuArry[i].skuImages.forEach(value => {
              this.fileList.push({name: 'images', url: value});
              this.tempSkuImages.push(value);
            });
            this.editSkuVisible = true;
            break;
          }
        }
      },
      //保存 SKU 详情
      saveSkuInfo() {
        if (this.tempSkuImages.length < 1) {
          this.$message({
            message: '请至少上传一张图片',
            type: 'warning'
          });
          return;
        }
        this.$refs['editForm'].validate(valid => {

          if (valid) {
            for (let i = 0; i < this.selectSkuArry.length; i++) {
              if (this.selectSkuArry[i].skuId == this.editForm.skuId) {
                this.selectSkuArry[i].name = this.editForm.name;
                this.selectSkuArry[i].desc = this.editForm.desc;
                this.selectSkuArry[i].mobileDesc = this.editForm.mobileDesc;
                this.selectSkuArry[i].skuImages = this.tempSkuImages;
                break;
              }
            }
            this.editSkuVisible = false;
          }
        })
      },
      // 上传标签页图标回调
      uploadLabelLogSuccess(res) {
        this.tempSkuImages.push(res);
      },
      //显示 sku 列表
      showSkuTables() {
        this.skuQuery.pageNum = 0;
        this.getSkuList();
        this.dialogFormVisible = true;
      },
      //获取 sku 数据信息
      async getSkuList() {
        this.removeSkuIdArray = [];
        this.skuListLoading = true;
        await queryMarketSkuPageList(this.skuQuery).then(response => {
          this.skusData = response.data;
          this.totalSku = response.recordsTotal;
          this.skuListLoading = false;
        });
        let array = [];
        for (let i = 0; i < this.skusData.length; i++) {
          for (let k = 0; k < this.skuIdArray.length; k++) {
            if (this.skusData[i].id == this.skuIdArray[k]) {
              array.push(this.skusData[i]);
            }
          }
        }
        array.forEach(value => {
          this.$refs.multipleTable.toggleRowSelection(value, true);
        });
      },
      //翻页事件
      skuHandleCurrentChange(val) {
        this.skuQuery.pageNum = val - 1;
        this.getSkuList();
      },
      //搜索事件
      handleFilter() {
        this.skuQuery.pageNum = 0;
        this.getSkuList();
      },
      //选中事件
      handleSelectionChange(vals) {
        this.tempSkuArray = vals;
      },
      //放大预览图片
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.imageDialogVisible = true
      },
      deleteDialog() {
        this.$confirm('确定要删除选择的商品？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let index = this.skuIdArray.indexOf(skuId);
          if (index > -1) {
            this.skuIdArray.splice(index, 1);
          }
          for (let i = 0; i < this.selectSkuArry.length; i++) {
            if (this.selectSkuArry[i].skuId == skuId) {
              this.selectSkuArry.splice(i, 1);
              break;
            }
          }
          this.$message({
            type: 'success',
            message: '商品删除成功!'
          });
        })
      },
      //保存选中商品
      saveData() {
        this.dialogFormVisible = false;
        //保存时  移除 勾选掉的 SKU 信息
        if (this.removeSkuIdArray.length > 0) {
          this.removeSkuIdArray.forEach(reSkuId => {
            let index = this.skuIdArray.indexOf(reSkuId);
            if (index > -1) {
              this.skuIdArray.splice(index, 1);
              for (let i = 0; i < this.selectSkuArry.length; i++) {
                if (this.selectSkuArry[i].skuId == reSkuId) {
                  this.selectSkuArry.splice(i, 1);
                }
              }
            }
          })
        }
        for (let i = 0; i < this.tempSkuArray.length; i++) {
          let value = this.tempSkuArray[i];
          if (this.skuIdArray.indexOf(value.id) > -1) {
            continue;
          }
          let images = [];
          value.skuImages.forEach(value2 => {
            images.push(value2.url);
          });
          let sku = {
            url: value.url,
            name: value.name,
            desc: value.subTitle,
            stock: '',
            supplyPrice: '', //供货价
            groupPrice: '', //团购价
            price: value.price,
            mobileDesc: '',
            pics: '',
            skuImages: images,
            skuId: value.id,
          };
          this.skuIdArray.push(value.id);
          this.selectSkuArry.push(sku);
        }
        this.$message({
          type: 'success',
          message: '添加促销商品成功!'
        })
      },
      createData() {
        this.$refs['communityBuyForm'].validate(valid => {
          if (valid) {
            if (!this.checkSkuPrice()) {
              this.$message({
                message: this.checkErrorMsg,
                type: 'warning'
              });
              return;
            }
            for (let i = 0; i < this.selectSkuArry.length; i++) {
              this.selectSkuArry[i].pics = this.selectSkuArry[i].skuImages.join(',');
            }
            this.communityBuyForm.startTime = parseTime(new Date(this.communityBuyForm.startEndTime[0]), 'yyyy-MM-dd hh:mm:ss');
            this.communityBuyForm.endTime = parseTime(new Date(this.communityBuyForm.startEndTime[1]), 'yyyy-MM-dd hh:mm:ss');
            this.communityBuyForm.deliveryTime = parseTime(new Date(this.communityBuyForm.deliveryTime), 'yyyy-MM-dd hh:mm:ss');
            this.communityBuyForm.communityBuySkus = this.selectSkuArry;
            this.communityBuyForm.communityBuySkus.forEach(value => {
              value.picsList = null;
              value.communityBuyId = this.$route.query.id;
            });
            console.log(this.communityBuyForm);
            editCommunityBuy(this.communityBuyForm).then(response => {
              if (response > 0) {
                this.$message({
                  type: 'success',
                  message: '保存促销活动成功!'
                });
                this.$router.push({path: "/marketingmanager/communitygroupbuy/communitygroupbuylist"})
              }
            });
          }
        })
      },

      //手动勾选SKU 时触发的事件
      checkedChange(selection, row) {
        let index = this.skuIdArray.indexOf(row.id);
        if (index > -1) {
          this.removeSkuIdArray.push(row.id);
        }
      },
      checkSkuPrice() {
        // 原价 > 团购价 > 供货价
        for (let i = 0; i < this.selectSkuArry.length; i++) {
          let sku = this.selectSkuArry[i];
          if (!isMoney(sku.supplyPrice) || !isMoney(sku.groupPrice)) {
            this.checkErrorMsg = '请输入合法金额';
            return false;
          }
          if (sku.price <= sku.supplyPrice || sku.price <= sku.groupPrice || sku.groupPrice <= sku.supplyPrice) {
            this.checkErrorMsg = '活动商品价格规则 :  原价 > 团购价 > 供货价 ';
            return false;
          }
        }
        return true;
      },
    }
  }
</script>
