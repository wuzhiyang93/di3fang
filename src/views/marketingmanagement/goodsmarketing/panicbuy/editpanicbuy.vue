<template>
  <div class="app-container">
    <el-form :model="panicbuy" :rules="rules" ref="form" label-position="right" label-width="120px"
             style="margin-top: 20px">
      <el-form-item prop="name">
        <span slot="label">促销名称</span>
        <el-input v-model="panicbuy.name" maxlength="40"/>
      </el-form-item>
      <el-form-item prop="timeValue">
        <span slot="label">促销时间</span>
        <el-date-picker
          style="width: 355px"
          class="search-datepicker"
          size="medium"
          :clearable="false"
          v-model="panicbuy.timeValue"
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
        <el-input v-model="panicbuy.desc" type="textarea" maxlength="2048" :rows="3"/>
      </el-form-item>
      <el-form-item>
        <span slot="label"><span class="labelImportant">*</span>选择商品</span>
        <div style="display: flex; justify-content: space-between">
          <el-button class="filter-item" size="medium" type="primary" icon="el-icon-plus" @click="toShowSkus()">
            选择秒杀商品
          </el-button>
          <div style="color: #606266">
            批量填充：
            <el-tooltip class="item" effect="dark" content="请输入1-100之间的整数，公式：价格 x 折扣" placement="right">
              <el-input type="number" v-model="batchDiscount" maxlength="3" style="width: 100px" size="small"
                        placeholder="折扣(%)"/>
            </el-tooltip>
            <el-input type="number" v-model="batchLimitNum" maxlength="7" style="width: 100px" size="small"
                      placeholder="限购(件)"/>
            <el-button type="primary" size="small" style="display: inline-block"
                       @click="batchSetData">确定
            </el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-table
          :data="selectedSkus"
          border
          fit
          highlight-current-row
        >
          <el-table-column label="商品图片" width="80">
            <template slot-scope="scope"><img :src="scope.row.sku.url" width="50" height="50"></template>
          </el-table-column>
          <el-table-column label="商品编号" min-width="140">
            <template slot-scope="scope">{{ scope.row.sku.id }}</template>
          </el-table-column>
          <el-table-column label="商品名称" min-width="250">
            <template slot-scope="scope">{{ scope.row.sku.name }}</template>
          </el-table-column>
          <el-table-column label="规格">
            <template slot-scope="scope">
              <span v-html="getSpecValues(scope.row.sku.skuSpecValues)"></span>
            </template>
          </el-table-column>
          <el-table-column label="销售价">
            <template slot-scope="scope">{{ scope.row.sku.price.toFixed(2) }}</template>
          </el-table-column>
          <el-table-column label="折扣(%)" min-width="90">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="请输入1-100之间的整数，公式：价格 x 折扣" placement="right">
                <el-input v-model="scope.row.orgingdiscount" maxlength="3" type="number" style="width: 70px"></el-input>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="限购(件)" min-width="90">
            <template slot-scope="scope">
              <el-input v-model="scope.row.limitNum" maxlength="7" type="number" style="width: 70px"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" style="margin: 0" type="danger" @click="deleteSku(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="savePanic()">保存促销活动</el-button>
        <router-link to="/marketingmanager/goodsmarketing/panicbuy">
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
        <el-button @click="showSkus = false">取消</el-button>
        <el-button type="primary" @click="saveSelectedSku()">保存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

  Array.prototype.skuIndexOf = function (sku) {
    for (let i = 0; i < this.length; i++) {
      if (this[i].skuId == sku.skuId) return i;
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
    querySkusForPanicBuy,
    addPanicMarketing,
    queryExclusionMarketingCountForPanicBuy,
    queryPanicBuy,
    querySkusForPanicBuyUpdate,
    queryExclusionMarketingCountForPanicBuyUpdate,
    updatePanic
  } from '@/api/editpanicbuy';

  import {getToken} from '@/utils/token';
  import {isDigits, integer} from '@/utils/validate';
  import {marketingErrorMap} from '@/utils/index';

  export default {
    props: ['addOrUpdate', 'id'], // 父组件传过来的参数 addOrUpdate新增修改标记 0 新增 1 修改  id折扣促销的id
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
        }, // 验证规则
        selectedSkus: [],// 选中的单品信息
        tempSelectedSku: {},// 临时选中的sku信息
        listLoading: true, // 加载中
        list: null, // 单品数据
        total: null, // 数据总数
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          name: '',
          skuNo: ''
        }, // 查询参数
        showSkus: false,// 是否显示单品信息
        headers: {
          Authorization: 'Bearer ' + getToken()
        }, // 认证的头部
        uploadApi: process.env.UPLOAD_API,  // 上传图片api
        panicbuy: {
          id: '',
          cateId: '',
          desc: '',
          name: '',
          startTime: '',
          endTime: '',
          panicBuyList: [],
          marketingSkus: [],
          timeValue: '',
        },
        isProcess: false,// 接口是否处理中
        batchDiscount: '',// 批量填充的折扣
        batchLimitNum: '',// 批量填充的限购数量
      }
    },
    created() {
      // 如果是更新则查询抢购信息
      if (this.isUpdate()) {
        this.queryPanicBuy();
      }
    },
    methods: {
      queryPanicBuy() {
        queryPanicBuy(this.id).then(res => {
          this.panicbuy.id = res.id;
          this.panicbuy.desc = res.desc;
          this.panicbuy.name = res.name;
          this.panicbuy.startTime = res.startTime;
          this.panicbuy.endTime = res.endTime;
          this.panicbuy.timeValue = [];
          this.panicbuy.timeValue.push(res.startTime);
          this.panicbuy.timeValue.push(res.endTime);
          this.selectedSkus = [];
          this.selectedSkus = res.panicBuyList.map(panicBuy => {
            panicBuy.orgingdiscount = Math.round(panicBuy.discount * 100);
            return panicBuy;
          });
        })
      },
      // 显示商品
      toShowSkus() {
        this.showSkus = true;
        this.listQuery = {
          pageNum: 0,
          pageSize: 10,
          name: '',
          skuNo: ''
        };
        this.querySkus();
      },
      // 查询单品信息
      querySkus() {
        this.listLoading = true
        if (this.isUpdate()) {
          querySkusForPanicBuyUpdate(this.listQuery).then(res => {
            this.setSkus(res);
          })
        } else {
          querySkusForPanicBuy(this.listQuery).then((response) => {
            this.setSkus(response);
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
          this.tempSelectedSkus = val.map(v => {
            return {
              sku: v,
              discount: '',
              orgingdiscount: '',
              limitNum: '',
              skuId: v.id,
            };
          })
        } else {
          this.tempSelectedSkus = [];
        }
      },
      // 保存选中的sku信息
      saveSelectedSku() {
        if (!this.tempSelectedSkus || this.tempSelectedSkus.length == 0) {
          this.$message({
            type: 'error',
            message: '请选择参加秒杀活动的商品!'
          });
          return;
        }
        this.tempSelectedSkus.forEach(tempSelectedSku => {
          if (this.selectedSkus.some(selectedSku => selectedSku.skuId == tempSelectedSku.skuId)) {
            return;
          }
          this.selectedSkus.push(tempSelectedSku);
        });
        this.tempSelectedSkus = [];
        this.showSkus = false;
      },
      // 删除商品
      deleteSku(sku) {
        this.selectedSkus.removeSku(sku);
      },
      // 批量填充折扣，限购数量
      batchSetData() {

        if (!this.selectedSkus || this.selectedSkus.length == 0) {
          this.$message({
            type: 'error',
            message: '请先选择秒杀商品!'
          });
          return;
        }

        // 判断折扣是否合法
        if (this.batchDiscount) {
          if (!isDigits(this.batchDiscount) || this.batchDiscount <= 0 || this.batchDiscount > 100) {
            this.$message({
              type: 'error',
              message: '折扣请输入1-100之间的整数'
            });
            return;
          }
        }

        // 判断限购数量是否合法
        if (this.batchLimitNum) {
          if (!integer(this.batchLimitNum)) {
            this.$message({
              type: 'error',
              message: '限购数量只能填写正整数'
            });
            return;
          }
        }

        this.selectedSkus.forEach(sku => {

          // 批量填充折扣
          if (this.batchDiscount) {
            sku.orgingdiscount = this.batchDiscount;
          }

          // 批量填充限购数量
          if (this.batchLimitNum) {
            sku.limitNum = this.batchLimitNum;
          }

        });

        this.$message({
          type: 'success',
          message: '批量填充成功!'
        });
      },
      // 保存促销活动
      savePanic() {
        if (this.selectedSkus.length == 0) {
          this.$message({
            type: 'error',
            message: '请选择参加限时折扣的商品!'
          });
          return;
        }

        if (this.selectedSkus.some(selectedSku => !isDigits(selectedSku.orgingdiscount) || selectedSku.orgingdiscount <= 0 || selectedSku.orgingdiscount > 100)) {
          this.$message({
            type: 'error',
            message: '请给所有商品的折扣输入1-100之间的整数!'
          });
          return;
        }

        if (this.selectedSkus.some(selectedSku => !integer(selectedSku.limitNum))) {
          this.$message({
            type: 'error',
            message: '请给所有商品的限购数量填写整数!'
          });
          return;
        }

        this.$refs['form'].validate(valid => {
          if (!this.isProcess && valid) {
            this.isProcess = true;
            this.panicbuy.marketingSkus = [];
            this.panicbuy.panicBuyList = [];
            this.panicbuy.startTime = this.panicbuy.timeValue[0];
            this.panicbuy.endTime = this.panicbuy.timeValue[1];
            this.panicbuy.marketingSkus = this.selectedSkus.map(selectedSku => {
                return {
                  skuId: selectedSku.skuId
                }
              }
            );
            this.panicbuy.panicBuyList = this.selectedSkus.map(selectedSku => {
                return {
                  id: selectedSku.id,
                  discount: parseFloat(selectedSku.orgingdiscount) / 100,
                  limitNum: selectedSku.limitNum,
                  skuId: selectedSku.skuId
                }
              }
            );

            this.isSkusexclusive(this.panicbuy).then(res => {
              if (!res) {
                // 更新
                if (this.isUpdate()) {
                  updatePanic(this.panicbuy).then(response => {
                    this.isProcess = false;
                    if (response == 1) {
                      this.$message({
                        type: 'success',
                        message: '更新秒杀活动成功!'
                      });
                      this.$router.push({path: '/marketingmanager/goodsmarketing/panicbuy'})
                    } else if (response == -1) {
                      this.$message({
                        message: '只有未开始的秒杀活动才能修改！',
                        type: 'error'
                      })
                    } else {
                      this.$message({
                        message: '更新失败！',
                        type: 'error'
                      })
                    }
                  })
                } else {
                  // 新增
                  addPanicMarketing(this.panicbuy).then(response => {
                    this.isProcess = false;
                    if (response == 1) {
                      this.$message({
                        type: 'success',
                        message: '添加秒杀活动成功!'
                      });
                      this.$router.push({path: '/marketingmanager/goodsmarketing/panicbuy'})
                    } else {
                      this.$message({
                        message: '添加失败！',
                        type: 'error'
                      })
                    }
                  })
                }
              }
            })
          }
        });
      },
      // 判断选中的单品是否存在促销的互斥
      isSkusexclusive(panic) {
        if (this.isUpdate()) {
          return queryExclusionMarketingCountForPanicBuyUpdate(panic).then(res => {
            this.isProcess = false;
            return this.getSkusexclusiveResult(res);
          })
        } else {
          return queryExclusionMarketingCountForPanicBuy(panic).then(res => {
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
      }
    }
    ,
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
