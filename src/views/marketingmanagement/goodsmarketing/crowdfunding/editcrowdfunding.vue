<template>
  <div class="app-container">
    <el-form :model="crowdfunding" :rules="rules" ref="form" label-position="right" label-width="120px"
             style="margin-top: 20px">
      <el-form-item prop="name">
        <span slot="label">促销名称</span>
        <el-input maxlength="40" v-model="crowdfunding.name"/>
      </el-form-item>
      <el-form-item prop="cateId">
        <span slot="label">促销分类</span>
        <el-select v-model="crowdfunding.cateId" filterable placeholder="请选择促销分类">
          <el-option
            v-for="item in cates"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="crowdFunding.money">
        <span slot="label">众筹金额</span>
        <el-input v-model="crowdfunding.crowdFunding.money" maxlength="8" style="width: 200px">
          <template slot="prepend">¥</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="timeValue">
        <span slot="label">众筹时间</span>
        <el-date-picker
          style="width: 355px"
          class="search-datepicker"
          size="medium"
          :clearable="false"
          v-model="crowdfunding.timeValue"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          align="right">
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="crowdFunding.shipTime">
        <span slot="label">发货时间</span>
        <el-date-picker
          v-model="crowdfunding.crowdFunding.shipTime"
          type="datetime"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="crowdFunding.pic">
        <span slot="label">众筹图片</span>
        <el-tooltip effect="dark" content="建议图片尺寸280px * 220px" placement="right">
          <el-upload
            class="avatar-uploader"
            :action="uploadApi"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :headers="headers"
            name="image"
            accept=".jpeg,.png,.gif,.ico,.JPEG,.PNG,.GIF,.ICO"
          >
            <img v-if="crowdfunding.crowdFunding.pic" :src="crowdfunding.crowdFunding.pic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="1元支持(抽奖)">
        <el-switch
          style="vertical-align: sub"
          active-value="0"
          inactive-value="1"
          v-model="crowdfunding.crowdFunding.lottery"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item v-if="crowdfunding.crowdFunding.lottery==0" label="抽奖人数">
        <el-input-number style="width: 195px" v-model="crowdfunding.crowdFunding.lotteryNum" controls-position="right"
                         :min="1" :max="999999999"
                         :step-strictly=true></el-input-number>
      </el-form-item>
      <el-form-item label="无回报支持">
        <el-switch
          style="vertical-align: sub"
          active-value="0"
          inactive-value="1"
          v-model="crowdfunding.crowdFunding.noReturnSupport"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <span slot="label"><span class="labelImportant">*</span>选择商品</span>
        <el-button class="filter-item" size="medium" type="primary" icon="el-icon-plus"
                   @click="toShowSpus()">选择促销商品
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-table
          :data="selectedSkus"
          border
          fit
          highlight-current-row
        >
          <el-table-column label="货品图片" width="80">
            <template slot-scope="scope"><img :src="scope.row.url" width="50" height="50"></template>
          </el-table-column>
          <el-table-column label="货品编号" width="150">
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column label="货品名称" min-width="200">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column label="规格" min-width="100">
            <template slot-scope="scope">
              <span v-html="getSpecValues(scope.row.skuSpecValues)"></span>
            </template>
          </el-table-column>
          <el-table-column label="众筹价">
            <template slot-scope="scope">
              <el-input maxlength="8" v-model="scope.row.price" style="width: 100%"/>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveCrowdfunding()">保存促销活动</el-button>
        <router-link to="/marketingmanager/goodsmarketing/crowdfunding">
          <el-button type="info">取消</el-button>
        </router-link>
      </el-form-item>
    </el-form>

    <el-dialog title="选择商品" :visible.sync="showSpus" width="75%">
      <div class="filter-container">
        <el-input placeholder="商品名称" v-model="listQuery.name" maxlength="32" size="medium" style="width: 200px;"
                  class="filter-item"/>
        <el-input placeholder="商品编号" v-model="listQuery.id" maxlength="32" size="medium" style="width: 200px;"
                  class="filter-item"/>
        <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
        </el-button>
      </div>
      <el-table
        :data="list"
        v-loading="listLoading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" width="40">
          <template slot-scope="scope">
            <el-radio class="table_radio" :label="scope.row.id" @change.native="selectSpu(scope.row)"
                      v-model="selectedId">&nbsp;
            </el-radio>
          </template>
        </el-table-column>
        <el-table-column label="商品图片" width="80">
          <template slot-scope="scope"><img :src="scope.row.url" width="50" height="50"></template>
        </el-table-column>
        <el-table-column label="商品编号" width="140">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="商品名称" min-width="250">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="销售价">
          <template slot-scope="scope">{{ scope.row.price.toFixed(2) }}</template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="listQuery.pageNum+1" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="showSpus = false">取消</el-button>
        <el-button type="primary" @click="saveSelectedSku()">保存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

  import {
    querySimpleSpus,
    querySkusBySpuId,
    queryMarketingCatesByTypeForCrowdfunding,
    queryExclusionMarketingCountForCrowdfunding,
    addCrowdFundingMarketing,
    queryCrowdfundingMarketingById,
    queryMarketingCatesByTypeForCrowdfundingUpdate,
    querySimpleSpusUpdate,
    querySkusBySpuIdUpdate,
    queryExclusionMarketingCountForCrowdfundingUpdate,
    updateCrowdFunding
  } from '@/api/editcrowdfunding';
  import {marketingErrorMap} from '@/utils/index';

  import {isMoney} from '@/utils/validate';


  import {getToken} from '@/utils/token';

  export default {
    props: ['addOrUpdate', 'id'], // 父组件传过来的参数 addOrUpdate新增修改标记 0 新增 1 修改  id促销的id
    data() {
      const timeValidator = (rule, value, callback) => {

        if (!value) {
          callback(new Error('请选择发货时间'));
          return;
        }
        if (new Date(this.crowdfunding.timeValue[1]) > new Date(value)) {
          callback(new Error('发货时间不能小于结束时间'));
        } else {
          callback();
        }
      }


      const priceValidator = (rule, value, callback) => {
        if (!isMoney(value)) {
          callback(new Error('请输入合法金额'));
        } else {
          if (value == 0) {
            callback(new Error('众筹金额必须大于0元'));
          } else {
            callback();
          }
        }
      }

      return {
        rules: {
          name: [
            {
              required: true,
              message: '请输入促销名称',
              trigger: 'blur'
            }
          ],
          cateId: [
            {
              required: true,
              message: '请选择促销分类',
              trigger: 'blur'
            }
          ],
          timeValue: [
            {
              required: true,
              message: '请选择促销时间',
              trigger: 'blur'
            }
          ],
          'crowdFunding.shipTime': [
            {
              required: true,
              validator: timeValidator,
              trigger: 'blur'
            }
          ],
          'crowdFunding.money': [
            {
              required: true,
              validator: priceValidator,
              trigger: 'blur'
            }
          ],
          'crowdFunding.pic': [
            {
              required: true,
              trigger: 'blur',
              message: '请上传众筹图片',
            }
          ],
        }, // 验证规则
        headers: {
          Authorization: 'Bearer ' + getToken()
        }, // 认证的头部
        uploadApi: process.env.UPLOAD_API,  // 上传图片api
        cates: [],// 众筹促销的分类
        selectedSkus: [],// 选中的单品信息
        tempSelectedSpu: {},// 临时选中的spu信息
        selectedId: '',// 选中的id
        listLoading: true, // 加载中
        list: null, // 单品数据
        total: null, // 数据总数
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          name: '',
          id: ''
        }, // 查询参数
        showSpus: false,// 是否显示商品信息
        crowdfunding: {
          id: '',
          cateId: '',
          desc: '',
          name: '',
          startTime: '',
          endTime: '',
          crowdFunding: {
            lottery: '0',
            lotteryNum: '',
            money: '',
            noReturnSupport: '0',
            pic: '',
            shipTime: '',
            spuId: ''
          },
          marketingSkus: [],
          timeValue: '',
        },// 众筹
      }
    },
    created() {
      this.queryCates()
      if (this.isUpdate()) {
        this.queryCrowdfunding();
      }
    },
    methods: {
      // 查询众筹促销
      queryCrowdfunding() {
        queryCrowdfundingMarketingById(this.id).then(res => {
          this.crowdfunding.id = res.id;
          this.crowdfunding.cateId = res.cateId;
          this.crowdfunding.desc = res.desc;
          this.crowdfunding.name = res.name;
          this.crowdfunding.startTime = res.startTime.substring(0, 10);
          this.crowdfunding.endTime = res.endTime.substring(0, 10);
          this.crowdfunding.timeValue = [];
          this.crowdfunding.timeValue.push(res.startTime.substring(0, 10));
          this.crowdfunding.timeValue.push(res.endTime.substring(0, 10));
          this.crowdfunding.crowdFunding.lottery = res.crowdFunding.lottery;
          this.crowdfunding.crowdFunding.lotteryNum = res.crowdFunding.lotteryNum;
          this.crowdfunding.crowdFunding.money = res.crowdFunding.money;
          this.crowdfunding.crowdFunding.noReturnSupport = res.crowdFunding.noReturnSupport;
          this.crowdfunding.crowdFunding.pic = res.crowdFunding.pic;
          this.crowdfunding.crowdFunding.spuId = res.crowdFunding.spuId;
          this.crowdfunding.crowdFunding.shipTime = res.crowdFunding.shipTime.substring(0, 10);
          res.marketingSkus.forEach(sku => {
            this.selectedSkus.push({
              id: sku.skuId,
              url: sku.sku.url,
              skuSpecValues: sku.sku.skuSpecValues,
              name: sku.sku.name,
              price: sku.price
            });
          })
        })
      },
      queryCates() {
        if (this.isUpdate()) {
          queryMarketingCatesByTypeForCrowdfundingUpdate().then(res => {
            this.cates = res;
          })
        } else {
          queryMarketingCatesByTypeForCrowdfunding().then(res => {
            this.cates = res;
            if (this.cates && this.cates.length > 0) {
              this.crowdfunding.cateId = this.cates[0].id;
            }
          })
        }
      },
      // 显示商品
      toShowSpus() {
        this.showSpus = true;
        this.listQuery = {
          pageNum: 0,
          pageSize: 10,
          name: '',
          id: ''
        };
        this.querySpus();
      },
      // 查询商品信息
      querySpus() {
        this.listLoading = true

        if (this.isUpdate()) {
          querySimpleSpusUpdate(this.listQuery).then(res => {
            this.setSpus(res);
          })
        } else {
          querySimpleSpus(this.listQuery).then(res => {
            this.setSpus(res);
          })
        }
      },
      // 设置查询出来的单品信息
      setSpus(response) {
        this.list = response.data;
        this.total = response.recordsTotal;
        this.listLoading = false
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val - 1;
        this.querySpus();
      },
      // 过滤查询
      handleFilter() {
        this.listQuery.pageNum = 0;
        this.querySpus();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 0;
        this.listQuery.pageSize = val;
        this.querySpus();
      },
      // 选中商品
      selectSpu(spu) {
        this.selectedId = spu.id;
        this.tempSelectedSpu = spu;
      },
      // 保存选中的sku信息
      saveSelectedSku() {
        if (!this.selectedId) {
          this.$message({
            type: 'error',
            message: '请选择参加众筹的商品!'
          });
          return;
        }
        this.crowdfunding.crowdFunding.spuId = this.selectedId;
        this.selectedSkus = [];

        if (this.isUpdate()) {
          querySkusBySpuIdUpdate(this.selectedId).then(res => {
            if (res && res.length > 0) {
              res.forEach(sku => {
                this.selectedSkus.push({
                  id: sku.id,
                  url: sku.url,
                  skuSpecValues: sku.skuSpecValues,
                  name: sku.name,
                  price: ''
                });
              })
            }
            this.showSpus = false;
          })
        } else {
          querySkusBySpuId(this.selectedId).then(res => {
            if (res && res.length > 0) {
              res.forEach(sku => {
                this.selectedSkus.push({
                  id: sku.id,
                  url: sku.url,
                  skuSpecValues: sku.skuSpecValues,
                  name: sku.name,
                  price: ''
                });
              })
            }
            this.showSpus = false;
          })
        }
      },
      // 上传图片回调
      uploadSuccess(res) {
        this.crowdfunding.crowdFunding.pic = res;
      },
      // 保存促销活动
      saveCrowdfunding() {
        if (this.selectedSkus.length == 0) {
          this.$message({
            type: 'error',
            message: '请选择参加众筹的商品!'
          });
          return;
        }

        if (!this.validatePirce()) {
          this.$message({
            type: 'error',
            message: '请填写商品的正确众筹价格!'
          });
          return;
        }

        this.$refs['form'].validate(valid => {
          if (!this.isProcess && valid) {
            this.isProcess = true;
            this.crowdfunding.marketingSkus = [];
            this.crowdfunding.startTime = this.crowdfunding.timeValue[0] + ' 00:00:00';
            this.crowdfunding.endTime = this.crowdfunding.timeValue[1] + ' 23:59:59';
            if (this.crowdfunding.crowdFunding.shipTime.length != 19) {
              this.crowdfunding.crowdFunding.shipTime = this.crowdfunding.crowdFunding.shipTime + ' 23:59:59';
            }
            this.crowdfunding.marketingSkus = [];

            this.selectedSkus.forEach(sku => {
              this.crowdfunding.marketingSkus.push({skuId: sku.id, price: sku.price});
            })

            this.isSkusexclusive(this.crowdfunding).then(res => {
              if (!res) {
                if (this.isUpdate()) {
                  updateCrowdFunding(this.crowdfunding).then(() => {
                    this.isProcess = false;
                    this.$message({
                      message: '更新众筹促销成功',
                      type: 'success'
                    })
                    this.$router.push({path: '/marketingmanager/goodsmarketing/crowdfunding'})
                  })
                } else {
                  addCrowdFundingMarketing(this.crowdfunding).then(() => {
                    this.isProcess = false;
                    this.$message({
                      message: '添加众筹促销成功',
                      type: 'success'
                    })
                    this.$router.push({path: '/marketingmanager/goodsmarketing/crowdfunding'})
                  })
                }
              }
            })
          }
        });

      },
      // 校验众筹的价格 成功返回true 失败返回false
      validatePirce() {
        for (let i = 0; i < this.selectedSkus.length; i++) {
          if (!isMoney(this.selectedSkus[i].price)) {
            return false;
          }
        }

        return true;
      },
      // 判断选中的单品是否存在促销的互斥
      isSkusexclusive(panic) {
        if (this.isUpdate()) {
          return queryExclusionMarketingCountForCrowdfundingUpdate(panic).then(res => {
            this.isProcess = false;
            return this.getSkusexclusiveResult(res);
          })
        } else {
          return queryExclusionMarketingCountForCrowdfunding(panic).then(res => {
            this.isProcess = false;
            return this.getSkusexclusiveResult(res);
          })
        }
      },
      // 获得互斥促销的结果
      getSkusexclusiveResult(res) {
        // 没有互斥促销
        if (res == 0) {
          return false;
        }
        if (marketingErrorMap[res]) {
          this.$message({
            message: marketingErrorMap[res],
            type: 'error'
          })
        } else {
          this.$message({
            message: '所选商品在促销时间段内存在互斥促销',
            type: 'error'
          })
        }
        return true;
      },

      // 判断是否是更新 如果是更新返回true
      isUpdate() {
        return this.addOrUpdate == 1;
      },

    },
    computed: {
      getSpecValues() {
        return function (skuSpecValues) {
          let content = '';

          for (let i = 0; i < skuSpecValues.length; i++) {
            content += skuSpecValues[i].spec.name + ":" + skuSpecValues[i].valueRemark + "<br>";
          }
          return content;
        }
      }
    }
  }
</script>
