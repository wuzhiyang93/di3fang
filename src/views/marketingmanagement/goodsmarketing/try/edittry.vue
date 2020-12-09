<template>
  <div class="app-container">
    <el-form :model="tryMarketing" :rules="rules" ref="form" label-position="right" label-width="120px"
             style="margin-top: 20px">
      <el-form-item prop="name">
        <span slot="label">促销名称</span>
        <el-input v-model="tryMarketing.name" maxlength="40"/>
      </el-form-item>
      <el-form-item prop="cateId">
        <span slot="label">促销分类</span>
        <el-select v-model="tryMarketing.cateId" filterable placeholder="请选择促销分类">
          <el-option
            v-for="item in cates"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="tryMarkting.type" label="试用类型">
        <el-select class="filter-item" v-model="tryMarketing.tryMarkting.type" size="medium">
          <el-option label="付邮试用" value="1"></el-option>
          <el-option label="返券试用" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="tryMarketing.tryMarkting.type == 2">
        <span slot="label"><span class="labelImportant">*</span>送优惠券</span>
        <el-select v-model="tryMarketing.tryMarkting.couponId" filterable placeholder="请选择优惠券">
          <el-option
            v-for="item in coupons"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="timeValue">
        <span slot="label">促销时间</span>
        <el-date-picker
          style="width: 355px"
          class="search-datepicker"
          size="medium"
          :clearable="false"
          v-model="tryMarketing.timeValue"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          align="right">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="提供份数">
        <el-input-number style="width: 195px" v-model="tryMarketing.tryMarkting.tryNum" controls-position="right"
                         :min="1" :max="999999"
                         :step-strictly="true"></el-input-number>
      </el-form-item>
      <el-form-item prop="tryMarkting.applyNum" label="可申请人数">
        <el-tooltip class="item" effect="dark" content="0表示不限制" placement="right">
          <el-input-number style="width: 195px" v-model="tryMarketing.tryMarkting.applyNum" controls-position="right"
                           :min="0" :max="999999"
                           :step-strictly="true"></el-input-number>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="促销描述">
        <el-input type="textarea" v-model="tryMarketing.desc" maxlength="2048" :rows="3"/>
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
            <el-button size="mini" style="margin: 0" type="danger" @click="deleteSku()">删除</el-button>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveTry()">保存促销活动</el-button>
        <router-link to="/marketingmanager/goodsmarketing/try">
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
      >
        <el-table-column align="center" width="40">
          <template slot-scope="scope">
            <el-radio class="table_radio" :label="scope.row.id" @change.native="selectSku(scope.row)"
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

  import {marketingErrorMap} from '@/utils/index';

  import {
    queryCouponsForTry,
    queryMarketingCatesByTypeForTry,
    querySkusForTry,
    queryExclusionMarketingCountForTry,
    addTryMarketing,
    queryCouponsForTryUpdate,
    queryMarketingCatesByTypeForTryUpdate,
    querySkusForTryUpdate,
    queryExclusionMarketingCountForTryUpdate,
    updateTry,
    queryTryMarketingById
  } from '@/api/edittry';

  export default {
    props: ['addOrUpdate', 'id'], // 父组件传过来的参数 addOrUpdate新增修改标记 0 新增 1 修改  id试用促销的id
    data() {
      const applyNumValidator = (rule, value, callback) => {
        // 如果是0 则不限制 直接放通
        if (value == 0) {
          callback();
        } else {
          // 判断可申请总人数是否大于提供份数
          if (value >= this.tryMarketing.tryMarkting.tryNum) {
            callback();
          } else {
            callback(new Error('可申请总人数不能小于提供份数!'));
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
          'tryMarkting.type': [
            {
              required: true,
              message: '请选择促销分类',
              trigger: 'blur'
            }
          ],
          'tryMarkting.applyNum': [
            {
              trigger: 'blur',
              validator: applyNumValidator
            }
          ],
        }, // 验证规则
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
        selectedSkus: [],// 选中的单品信息
        tempSelectedSku: {},// 临时选中的sku信息
        selectedId: '',// 选中的id
        coupons: [],// 优惠卷
        cates: [],// 分类
        tryMarketing: {
          id: '',
          cateId: '',
          desc: '',
          name: '',
          startTime: '',
          endTime: '',
          marketingSkus: [],
          timeValue: '',
          tryMarkting: {
            applyNum: '0',
            couponId: '0',
            tryNum: '1',
            type: '1'
          }
        }// 试用促销
      }
    },
    created() {
      this.queryCoupon();
      this.queryCate();
      if (this.isUpdate()) {
        this.queryTryMarkeing();
      }
    },
    methods: {
      // 查询试用促销
      queryTryMarkeing() {
        queryTryMarketingById(this.id).then(res => {
          this.tryMarketing.id = res.id;
          this.tryMarketing.cateId = res.cateId;
          this.tryMarketing.desc = res.desc;
          this.tryMarketing.name = res.name;
          this.tryMarketing.startTime = res.startTime.substring(0, 10);
          this.tryMarketing.endTime = res.endTime.substring(0, 10);
          this.tryMarketing.timeValue = [];
          this.tryMarketing.timeValue.push(res.startTime.substring(0, 10));
          this.tryMarketing.timeValue.push(res.endTime.substring(0, 10));
          this.tryMarketing.tryMarkting.applyNum = res.tryMarkting.applyNum;
          this.tryMarketing.tryMarkting.couponId = res.tryMarkting.couponId;
          this.tryMarketing.tryMarkting.tryNum = res.tryMarkting.tryNum;
          this.tryMarketing.tryMarkting.type = res.tryMarkting.type;
          this.selectedSkus = [];
          if (res.marketingSkus && res.marketingSkus.length > 0) {
            this.selectedId = res.marketingSkus[0].skuId;
            this.tempSelectedSku = res.marketingSkus[0].sku;
            this.selectedSkus.push(this.tempSelectedSku);
          }
        })
      },
      // 查询优惠卷
      queryCoupon() {
        if (this.isUpdate()) {
          queryCouponsForTryUpdate().then(res => {
            this.coupons = res;
            this.coupons.unshift({id: '0', name: '未选择优惠卷'});
          })
        } else {
          queryCouponsForTry().then(res => {
            this.coupons = res;
            this.coupons.unshift({id: '0', name: '未选择优惠卷'});
          })
        }
      },
      // 查询分类
      queryCate() {
        if (this.isUpdate()) {
          queryMarketingCatesByTypeForTryUpdate().then(res => {
            this.cates = res;
          })
        } else {
          queryMarketingCatesByTypeForTry().then(res => {
            this.cates = res;
            if (res && res.length > 0) {
              this.tryMarketing.cateId = res[0].id;
            }
          })
        }
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
          querySkusForTryUpdate(this.listQuery).then((response) => {
            this.setSkus(response);
          })
        } else {
          querySkusForTry(this.listQuery).then((response) => {
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
      // 保存选中的sku信息
      saveSelectedSku() {
        if (!this.selectedId) {
          this.$message({
            type: 'error',
            message: '请选择参加试用的商品!'
          });
          return;
        }
        this.selectedSkus = [];
        this.selectedSkus.push(this.tempSelectedSku);
        this.showSkus = false;
      },
      // 删除选中的单品
      deleteSku() {
        this.selectedId = '';
        this.selectedSkus = [];
        this.tempSelectedSku = {};
      },
      // 选中单品
      selectSku(sku) {
        this.selectedId = sku.id;
        this.tempSelectedSku = sku;
      },
      // 保存促销活动
      saveTry() {
        if (this.selectedSkus.length == 0) {
          this.$message({
            type: 'error',
            message: '请选择参加试用的商品!'
          });
          return;
        }

        this.$refs['form'].validate(valid => {
          if (!this.isProcess && valid) {
            this.isProcess = true;
            this.tryMarketing.marketingSkus = [];
            this.tryMarketing.startTime = this.tryMarketing.timeValue[0] + ' 00:00:00';
            this.tryMarketing.endTime = this.tryMarketing.timeValue[1] + ' 23:59:59';
            this.tryMarketing.marketingSkus.push({skuId: this.selectedSkus[0].id});
            this.isSkusexclusive(this.tryMarketing).then(res => {
              if (!res) {
                if (this.isUpdate()) {
                  updateTry(this.tryMarketing).then(() => {
                    this.isProcess = false;
                    this.$message({
                      type: 'success',
                      message: '更新试用成功'
                    });
                    this.$router.push({path: '/marketingmanager/goodsmarketing/try'})
                  })
                } else {
                  addTryMarketing(this.tryMarketing).then(() => {
                    this.isProcess = false;
                    this.$message({
                      type: 'success',
                      message: '添加试用成功'
                    });
                    this.$router.push({path: '/marketingmanager/goodsmarketing/try'})
                  })
                }
              }
            })
          }
        });
      },
      // 判断选中的单品是否存在促销的互斥
      isSkusexclusive(trymarketing) {
        if (this.isUpdate()) {
          return queryExclusionMarketingCountForTryUpdate(trymarketing).then(res => {
            this.isProcess = false;
            return this.getSkusexclusiveResult(res);
          })
        } else {
          return queryExclusionMarketingCountForTry(trymarketing).then(res => {
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
