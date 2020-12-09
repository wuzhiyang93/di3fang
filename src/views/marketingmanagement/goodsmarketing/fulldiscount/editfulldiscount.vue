<template>
  <div class="app-container">
    <el-form :model="fullDiscount" :rules="rules" ref="form" label-position="right" label-width="120px"
             style="margin-top: 20px">
      <el-form-item prop="name">
        <span slot="label">促销名称</span>
        <el-input v-model="fullDiscount.name" maxlength="40"/>
      </el-form-item>
      <el-form-item>
        <span slot="label"><span class="labelImportant">*</span>促销规则</span>
        <el-tooltip class="item" effect="dark" content="最多添加三级" placement="right">
          <el-button class="filter-item" size="medium" type="primary" icon="el-icon-plus" @click="addFullDiscount()">
            添加多级促销
          </el-button>
        </el-tooltip>
      </el-form-item>
      <el-form-item>
        <el-table
          :data="fullDiscount.fullDiscounts"
          border
          fit
          highlight-current-row
          style="line-height: 20px"
        >
          <el-table-column label="满金额">
            <template slot-scope="scope">
              <el-input v-model="scope.row.fullPrice" type="text" size="small" maxlength="20" style="width: 200px">
                <template slot="prepend">¥</template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="折扣">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="公式：价格 x 折扣" placement="right">
                <el-input v-model="scope.row.odiscount" type="number" size="small" maxlength="2" style="width: 200px">
                  <template slot="append">%</template>
                </el-input>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button v-if="scope.$index!=0" size="mini" type="danger"
                         @click.native.prevent="deleteFullDiscount(scope.$index, fullDiscount.fullDiscounts)">删除
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
          v-model="fullDiscount.timeValue"
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
        <el-input v-model="fullDiscount.desc" type="textarea" maxlength="2048" :rows="3"/>
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
        <el-button type="primary" @click="saveFullDiscount()">保存促销活动</el-button>
        <router-link to="/marketingmanager/goodsmarketing/fulldiscount">
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
  import {
    querySkusForFullDiscount,
    addFullDiscount,
    queryFullDiscountMarketingById,
    querySkusForFullDiscountUpdate,
    updateFullDiscount
  } from '@/api/editfulldiscount';

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

  export default {
    props: ['addOrUpdate', 'id'], // 父组件传过来的参数 addOrUpdate新增修改标记 0 新增 1 修改  id满折促销的id
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
        fullDiscount: {
          id: '',
          desc: '',
          name: '',
          startTime: '',
          endTime: '',
          marketingSkus: [],
          timeValue: '',
          fullDiscounts: [
            {'fullPrice': '', 'discount': '', 'odiscount': ''}
          ]
        },
      }
    },
    created() {
      // 如果是更新 则查询促销信息
      if (this.isUpdate()) {
        this.queryFullDiscount();
      }
    },
    methods: {
      queryFullDiscount() {
        queryFullDiscountMarketingById(this.id).then(res => {
          this.fullDiscount.id = res.id;
          this.fullDiscount.desc = res.desc;
          this.fullDiscount.name = res.name;
          this.fullDiscount.startTime = res.startTime;
          this.fullDiscount.endTime = res.endTime;
          this.fullDiscount.timeValue = [];
          this.fullDiscount.timeValue.push(res.startTime);
          this.fullDiscount.timeValue.push(res.endTime);
          if (res.marketingSkus && res.marketingSkus.length > 0) {
            res.marketingSkus.forEach(sku => {
              this.selectedSkus.push(sku.sku);
            })
          }

          this.fullDiscount.fullDiscounts = [];

          if (res.fullDiscounts && res.fullDiscounts.length > 0) {
            res.fullDiscounts.forEach(fullDiscount => {
              this.fullDiscount.fullDiscounts.push({
                'fullPrice': fullDiscount.fullPrice,
                'discount': fullDiscount.discount,
                'odiscount': Math.round(fullDiscount.discount * 100)
              });
            })
          }
        })
      },
      // 添加满折
      addFullDiscount() {
        // 最多只能添加3条满减数据
        if (this.fullDiscount.fullDiscounts.length < 3) {
          this.fullDiscount.fullDiscounts.push({'fullPrice': '', 'discount': '', 'odiscount': ''});
        }
      },
      // 删除满折
      deleteFullDiscount(index, rows) {
        rows.splice(index, 1)
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
          querySkusForFullDiscountUpdate(this.listQuery).then(res => {
            this.setSkus(res);
          })
        } else {
          querySkusForFullDiscount(this.listQuery).then(res => {
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
            message: '请选择参加满折的商品!'
          });
          return;
        }
        this.tempSelectedSkus.forEach(sku => {
          if (this.selectedSkus.some(selectedSku => selectedSku.id == sku.id)) {
            return;
          }
          this.selectedSkus.push(sku);
        })
        this.tempSelectedSkus = [];
        this.showSkus = false;
      },
      // 删除商品
      deleteSku(sku) {
        this.selectedSkus.removeSku(sku);
      },
      // 保存满折促销
      saveFullDiscount() {
        if (this.selectedSkus.length == 0) {
          this.$message({
            type: 'error',
            message: '请选择参加满折促销的商品!'
          });
          return;
        }

        this.$refs['form'].validate(valid => {
          if (!this.isProcess && valid) {
            this.isProcess = true;
            this.fullDiscount.marketingSkus = [];
            this.fullDiscount.startTime = this.fullDiscount.timeValue[0];
            this.fullDiscount.endTime = this.fullDiscount.timeValue[1];
            this.selectedSkus.forEach(sku => {
              this.fullDiscount.marketingSkus.push({skuId: sku.id});
            })

            this.fullDiscount.fullDiscounts.forEach(fullDiscount => {
              fullDiscount.discount = parseFloat(fullDiscount.odiscount) / 100;
            })

            // 更新
            if (this.isUpdate()) {
              updateFullDiscount(this.fullDiscount).then(() => {
                this.isProcess = false;
                this.$message({
                  type: 'success',
                  message: '更新满折成功!'
                });
                this.$router.push({path: '/marketingmanager/goodsmarketing/fulldiscount'})
              })
            } else {
              // 新增
              addFullDiscount(this.fullDiscount).then(() => {
                this.isProcess = false;
                this.$message({
                  type: 'success',
                  message: '添加满折成功!'
                });
                this.$router.push({path: '/marketingmanager/goodsmarketing/fulldiscount'})
              })
            }

          }
        });
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
