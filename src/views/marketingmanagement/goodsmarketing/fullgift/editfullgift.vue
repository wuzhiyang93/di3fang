<template>
  <div class="app-container">
    <el-form :model="fullGift" :rules="rules" ref="form" label-position="right" label-width="120px"
             style="margin-top: 20px">
      <el-form-item prop="name">
        <span slot="label">促销名称</span>
        <el-input maxlength="40" v-model="fullGift.name"/>
      </el-form-item>
      <el-form-item>
        <span slot="label"><span class="labelImportant">*</span>促销规则</span>
        <el-tooltip class="item" effect="dark" content="最多添加三级" placement="right">
          <el-button class="filter-item" size="medium" type="primary" icon="el-icon-plus" @click="toAddGift()">添加多级促销
          </el-button>
        </el-tooltip>
      </el-form-item>
      <el-form-item :key="gift.id" v-for="(gift,index) in fullGift.fullGifts">
        <div class="tableHeader">
          <span style="display: inline-block; vertical-align: top; line-height: 40px">满</span>
          <el-input maxlength="8" v-model="gift.fullPrice" style="width: 120px" type="text" size="small"/>
          <span style="display: inline-block; vertical-align: top; line-height: 40px">元</span>
          <el-button style="float: right; margin:6px 0 0 10px" class="filter-item" size="mini"
                     @click.native.prevent="deleteGift(index, fullGift.fullGifts)" type="danger"
                     v-if="index!=0" icon="el-icon-delete">删除
          </el-button>
          <el-button style="float: right; margin:6px 0 0 10px" class="filter-item" size="mini" type="primary"
                     icon="el-icon-plus" @click="toShowSkus(gift.tempSkuInfos)">选择赠品
          </el-button>
        </div>
        <el-table
          :data="gift.tempSkuInfos"
          border
          fit
          highlight-current-row
        >
          <el-table-column label="商品图片" width="80">
            <template slot-scope="scope"><img :src="scope.row.url" width="50" height="50"></template>
          </el-table-column>
          <el-table-column label="货品编号" min-width="140">
            <template slot-scope="scope">{{ scope.row.skuId }}</template>
          </el-table-column>
          <el-table-column label="货品名称" min-width="250">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column label="规格">
            <template slot-scope="scope">
              <span v-html="getSpecValues(scope.row.skuSpecValues)"></span>
            </template>
          </el-table-column>
          <el-table-column label="销售价">
            <template slot-scope="scope">{{ scope.row.price.toFixed(2) }}</template>
          </el-table-column>
          <el-table-column label="数量" width="120">
            <template slot-scope="scope">
              <el-input-number style="width: 100px" v-model="scope.row.num" controls-position="right" :min="1"
                               :max="100000"
                               :step-strictly="true"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button size="mini" type="danger"
                         @click.native.prevent="deleteGiftSkus(scope.$index, gift.tempSkuInfos)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item prop="timeValue">
        <span slot="label">促销时间</span>
        <el-date-picker
          style="width: 355px"
          class="search-datepicker"
          size="medium"
          :clearable="false"
          v-model="fullGift.timeValue"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          align="right">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="促销描述">
        <el-input v-model="fullGift.desc" type="textarea" maxlength="2048" :rows="3"/>
      </el-form-item>
      <el-form-item>
        <span slot="label"><span class="labelImportant">*</span>选择商品</span>
        <el-button class="filter-item" size="medium" type="primary" icon="el-icon-plus"
                   @click="toShowSkus()">选择促销商品
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-table
          :data="selectedSkus"
          border
          fit
          highlight-current-row
        >
          <el-table-column label="商品图片" width="80">
            <template slot-scope="scope"><img :src="scope.row.url" width="50" height="50"></template>
          </el-table-column>
          <el-table-column label="商品编号" min-width="140">
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column label="商品名称" min-width="250">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column label="规格">
            <template slot-scope="scope">
              <span v-html="getSpecValues(scope.row.skuSpecValues)"></span>
            </template>
          </el-table-column>
          <el-table-column label="销售价">
            <template slot-scope="scope">{{ scope.row.price.toFixed(2) }}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" style="margin: 0" type="danger" @click="deleteSku(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveFullGift()">保存促销活动</el-button>
        <router-link to="/marketingmanager/goodsmarketing/fullgift">
          <el-button type="info">取消</el-button>
        </router-link>
      </el-form-item>
    </el-form>

    <el-dialog title="选择商品" :visible.sync="showSkus" width="75%">
      <div class="filter-container">
        <el-input placeholder="商品名称" v-model="listQuery.name" maxlength="32" size="medium" style="width: 200px;"
                  class="filter-item"/>
        <el-input placeholder="商品编号" v-model="listQuery.skuNo" maxlength="32" size="medium" style="width: 200px;"
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center" width="40"/>
        <el-table-column label="商品图片" width="80">
          <template slot-scope="scope"><img :src="scope.row.url" width="50" height="50"></template>
        </el-table-column>
        <el-table-column label="商品编号" width="140">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="商品名称" min-width="250">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="规格" min-width="150">
          <template slot-scope="scope">
            <span v-html="getSpecValues(scope.row.skuSpecValues)"></span>
          </template>
        </el-table-column>
        <el-table-column label="销售价">
          <template slot-scope="scope">{{ scope.row.price.toFixed(2)}}</template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="listQuery.pageNum+1" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showSkus = false">取消</el-button>
        <el-button type="primary" @click="saveSelectedSku()">保存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  Array.prototype.skuIndexOf = function (sku) {
    for (let i = 0; i < this.length; i++) {
      if (this[i].id == sku.id) return i;
    }
    return -1;
  };

  Array.prototype.removeSku = function (sku) {
    let index = this.skuIndexOf(sku);
    if (index > -1) {
      this.splice(index, 1);
    }
  };

  import {
    querySkusForFullGift,
    addFullGiftMarketing,
    queryFullGiftMarketingById,
    querySkusForFullGiftUpdate,
    updateFullGift
  } from '@/api/editfullgift';

  import {isMoney} from '@/utils/validate';

  export default {
    props: ['addOrUpdate', 'id'], // 父组件传过来的参数 addOrUpdate新增修改标记 0 新增 1 修改  id促销的id
    data() {
      return {
        rules: {
          name: [
            {
              required: true,
              message: '请输入促销名称',
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
        }, // 验证规则
        tempSkuInfos: [],// 临时的满赠商品
        fullGift: {
          id: '',
          desc: '',
          name: '',
          startTime: '',
          endTime: '',
          marketingSkus: [],
          fullGifts: [{fullPrice: '', tempSkuInfos: []}],
          timeValue: '',
        },
        tempSelectedSkus: [],// 临时选中的sku信息
        showSkus: false,// 是否显示单品信息
        listLoading: true, // 加载中
        list: null, // 单品数据
        total: null, // 数据总数
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          name: '',
          skuNo: ''
        }, // 查询参数
        isProcess: false,// 接口是否处理中
        selectedSkus: [],// 选中的单品信息
      }
    },
    created() {
      if (this.isUpdate()) {
        this.queryFullGift();
      }
    },
    methods: {
      queryFullGift() {
        queryFullGiftMarketingById(this.id).then(res => {
          this.fullGift.id = res.id;
          this.fullGift.name = res.name;
          this.fullGift.desc = res.desc;
          this.fullGift.startTime = res.startTime;
          this.fullGift.endTime = res.endTime;
          this.fullGift.timeValue = [];
          this.fullGift.timeValue.push(res.startTime);
          this.fullGift.timeValue.push(res.endTime);
          if (res.marketingSkus && res.marketingSkus.length > 0) {
            res.marketingSkus.forEach(sku => {
              this.selectedSkus.push(sku.sku);
            })
          }

          this.fullGift.fullGifts = new Array();

          if (res.fullGifts && res.fullGifts.length > 0) {
            res.fullGifts.forEach(fullGift => {
              const gift = {};
              gift.fullPrice = fullGift.fullPrice;
              gift.tempSkuInfos = new Array();
              fullGift.giftSkuInfos.forEach(sku => {
                gift.tempSkuInfos.push({
                  skuId: sku.skuId,
                  num: sku.num,
                  url: sku.sku.url,
                  name: sku.sku.name,
                  price: sku.sku.price,
                  skuSpecValues: sku.sku.skuSpecValues
                });
              })
              this.fullGift.fullGifts.push(gift);
            })
          }
        })
      },
      // 显示商品
      toShowSkus(tempSkuInfos) {
        this.showSkus = true;
        this.listQuery = {
          pageNum: 0,
          pageSize: 10,
          name: '',
          skuNo: ''
        };
        this.querySkus();
        this.tempSkuInfos = tempSkuInfos;
      },
      // 查询单品信息
      querySkus() {
        this.listLoading = true
        if (this.isUpdate()) {
          querySkusForFullGiftUpdate(this.listQuery).then(res => {
            this.setSkus(res);
          })
        } else {
          querySkusForFullGift(this.listQuery).then(res => {
            this.setSkus(res);
          })
        }
      },
      // 设置查询出来的单品信息
      setSkus(response) {
        this.list = response.data;
        this.total = response.recordsTotal;
        this.listLoading = false
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val - 1;
        this.querySkus();
      },
      // 过滤查询
      handleFilter() {
        this.listQuery.pageNum = 0;
        this.querySkus();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 0;
        this.listQuery.pageSize = val;
        this.querySkus();
      },
      handleSelectionChange(val) {
        if (val && val.length > 0) {
          this.tempSelectedSkus = val;
        } else {
          this.tempSelectedSkus = [];
        }
      },
      // 保存选中的sku信息
      saveSelectedSku() {
        if (!this.tempSelectedSkus || this.tempSelectedSkus.length == 0) {
          this.$message({
            type: 'error',
            message: '请选择参商品!'
          });
          return;
        }

        // 赠品
        if (this.tempSkuInfos) {
          this.tempSelectedSkus.forEach(sku => {
            if (this.tempSkuInfos.some(tempSku => tempSku.skuId == sku.id)) {
              return;
            }
            this.tempSkuInfos.push({
              skuId: sku.id,
              num: 1,
              url: sku.url,
              name: sku.name,
              price: sku.price,
              skuSpecValues: sku.skuSpecValues
            });
          })
          this.tempSelectedSkus = [];
        } else {
          // 参加满赠的商品
          this.tempSelectedSkus.forEach(sku => {
            if (this.selectedSkus.some(selectedSku => selectedSku.id == sku.id)) {
              return;
            }
            this.selectedSkus.push(sku);
          })
          this.tempSelectedSkus = [];
        }

        this.showSkus = false;
      },
      // 删除商品
      deleteSku(sku) {
        this.selectedSkus.removeSku(sku);
      },
      // 添加赠品
      toAddGift() {
        if (this.fullGift.fullGifts.length < 3) {
          this.fullGift.fullGifts.push({fullPrice: '', tempSkuInfos: []});
        }
      },
      // 删除赠品
      deleteGift(index, rows) {
        rows.splice(index, 1)
      },
      // 删除赠品的单品
      deleteGiftSkus(index, skuInfos) {
        skuInfos.splice(index, 1)
      },
      // 保存促销活动
      saveFullGift() {

        if (this.selectedSkus.length == 0) {
          this.$message({
            type: 'error',
            message: '请选择参加满赠活动的商品!'
          });
          return;
        }

        // 校验赠品
        if (!this.validateGift()) {
          return;
        }

        this.$refs['form'].validate(valid => {
          if (!this.isProcess && valid) {
            this.isProcess = true;
            this.fullGift.marketingSkus = [];
            this.fullGift.startTime = this.fullGift.timeValue[0];
            this.fullGift.endTime = this.fullGift.timeValue[1];
            this.selectedSkus.forEach(sku => {
              this.fullGift.marketingSkus.push({skuId: sku.id});
            })
            this.fullGift.fullGifts.forEach(fullGift => {
              const gifts = new Array();
              fullGift.tempSkuInfos.forEach(gift => {
                gifts.push({skuId: gift.skuId, num: gift.num});
              })
              fullGift.skuInfos = JSON.stringify(gifts);
            })

            if (this.isUpdate()) {
              // 修改
              updateFullGift(this.fullGift).then(() => {
                this.isProcess = false;
                this.$message({
                  message: '更新满赠促销成功',
                  type: 'success'
                })
                this.$router.push({path: '/marketingmanager/goodsmarketing/fullgift'})
              })
            } else {
              // 新增
              addFullGiftMarketing(this.fullGift).then(() => {
                this.isProcess = false;
                this.$message({
                  message: '添加满赠促销成功',
                  type: 'success'
                })
                this.$router.push({path: '/marketingmanager/goodsmarketing/fullgift'})
              })
            }
          }
        });
      },
      // 校验赠品 成功返回true 失败返回false
      validateGift() {
        for (let i = 0; i < this.fullGift.fullGifts.length; i++) {
          // 满赠的价格不对
          if (!isMoney(this.fullGift.fullGifts[i].fullPrice)) {
            this.$message({
              type: 'error',
              message: '请填写正确满赠的价格!'
            });
            return false;
          }
          // 没有选择赠品
          if (this.fullGift.fullGifts[i].tempSkuInfos.length == 0) {
            this.$message({
              type: 'error',
              message: '请选择赠品!'
            });
            return false;
          }
        }
        return true;
      },
      // 判断是否是更新 如果是更新返回true
      isUpdate() {
        return this.addOrUpdate == 1;
      }
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
