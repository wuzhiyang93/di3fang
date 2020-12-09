<template>
  <div class="app-container">
    <el-form :model="depositPresale" :rules="rules" ref="form" label-position="right" label-width="120px"
             style="margin-top: 20px">
      <el-form-item prop="name">
        <span slot="label">促销名称</span>
        <el-input maxlength="40" v-model="depositPresale.name"/>
      </el-form-item>
      <el-form-item prop="cateId">
        <span slot="label">促销分类</span>
        <el-select v-model="depositPresale.cateId" filterable placeholder="请选择促销分类">
          <el-option
            v-for="item in cates"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="depositPreSale.depositPre">
        <span slot="label">定金百分比</span>
        <el-tooltip class="item" effect="dark" content="请输入1-90之间的整数，公式：价格 x 百分比" placement="right">
          <el-input v-model="depositPresale.depositPreSale.depositPre" type="number" maxlength="2" style="width: 200px">
            <template slot="append">%</template>
          </el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item prop="endTime">
        <span slot="label">尾款支付时间</span>
        <el-date-picker
          v-model="depositPresale.endTime"
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="促销描述">
        <el-input type="textarea" v-model="depositPresale.desc" maxlength="2048" :rows="3"/>
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
        <el-button type="primary" @click="saveDepositPresale()">保存促销活动</el-button>
        <router-link to="/marketingmanager/goodsmarketing/presale">
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

  import {
    queryMarketingCatesByTypeForPresale,
    querySkusForDepositPresale,
    queryExclusionMarketingCountForDepositPresale,
    addDepositPreSale,
    queryDepositPresaleMarketingById,
    queryMarketingCatesByTypeForPresaleUpdate,
    querySkusForDepositPresaleUpdate,
    queryExclusionMarketingCountForDepositPresaleUpdate,
    updateDepositPreSale
  } from '@/api/editdepositpresale';

  import {marketingErrorMap} from '@/utils/index';

  import {isDigits} from '@/utils/validate';

  export default {
    props: ['addOrUpdate', 'id'], // 父组件传过来的参数 addOrUpdate新增修改标记 0 新增 1 修改  促销的id
    data() {
      const timeValidator = (rule, value, callback) => {
        if (!value || new Date() >= new Date(value)) {
          callback(new Error('不能小于当前时间'));
        } else {
          callback();
        }
      }

      const depositPreValidator = (rule, value, callback) => {
        if (!isDigits(value) || value <= 0 || value > 90) {
          callback(new Error('请输入1-90之间的整数'));
        } else {
          callback();
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
          endTime: [
            {
              required: true,
              validator: timeValidator,
              trigger: 'blur'
            }
          ],
          'depositPreSale.depositPre': [
            {
              required: true,
              validator: depositPreValidator,
              trigger: 'blur'
            }
          ],
        }, // 验证规则
        selectedSkus: [],// 选中的单品信息
        tempSelectedSku: {},// 临时选中的sku信息
        selectedId: '',// 选中的id
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
        cates: [],//定金预售分类
        depositPresale: {
          id: '',
          cateId: '',
          desc: '',
          name: '',
          endTime: '',
          marketingSkus: [],
          depositPreSale: {
            depositPre: ''
          }
        }//定金预售
      }
    },
    created() {
      if (this.isUpdate()) {
        this.queryDepositPresale();
      }
      this.queryCates()
    },
    methods: {
      // 查询定金预售
      queryDepositPresale() {
        queryDepositPresaleMarketingById(this.id).then(res => {
          this.depositPresale.id = res.id;
          this.depositPresale.name = res.name;
          this.depositPresale.desc = res.desc;
          this.depositPresale.cateId = res.cateId;
          this.depositPresale.endTime = res.endTime;
          this.depositPresale.depositPreSale.depositPre = Math.round(res.depositPreSale.depositPre * 100);
          this.selectedSkus = [];
          if (res.marketingSkus && res.marketingSkus.length > 0) {
            this.selectedId = res.marketingSkus[0].skuId;
            this.tempSelectedSku = res.marketingSkus[0].sku;
            this.selectedSkus.push(this.tempSelectedSku);
          }
        })
      },
      // 查询分类
      queryCates() {
        if (this.isUpdate()) {
          queryMarketingCatesByTypeForPresaleUpdate().then(res => {
            this.cates = res;
          })
        } else {
          queryMarketingCatesByTypeForPresale().then(res => {
            this.cates = res;
            if (this.cates && this.cates.length > 0) {
              this.depositPresale.cateId = this.cates[0].id;
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
          querySkusForDepositPresaleUpdate(this.listQuery).then((response) => {
            this.setSkus(response);
          })
        } else {
          querySkusForDepositPresale(this.listQuery).then((response) => {
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
      // 选中单品
      selectSku(sku) {
        this.selectedId = sku.id;
        this.tempSelectedSku = sku;
      },
      // 保存选中的sku信息
      saveSelectedSku() {
        if (!this.selectedId) {
          this.$message({
            type: 'error',
            message: '请选择参加定金预售的商品!'
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
      // 保存促销活动
      saveDepositPresale() {
        if (this.selectedSkus.length == 0) {
          this.$message({
            type: 'error',
            message: '请选择参加定金预售的商品!'
          });
          return;
        }

        this.$refs['form'].validate(valid => {
          if (!this.isProcess && valid) {
            this.isProcess = true;
            this.depositPresale.marketingSkus = [];
            this.depositPresale.marketingSkus.push({skuId: this.selectedSkus[0].id});
            this.isSkusexclusive(this.depositPresale).then(res => {
              if (!res) {
                if (this.isUpdate()) {
                  updateDepositPreSale(this.depositPresale).then(() => {
                    this.isProcess = false;
                    this.$message({
                      message: '更新定金预售成功',
                      type: 'success'
                    })
                    this.$router.push({path: '/marketingmanager/goodsmarketing/presale'})
                  })
                } else {
                  addDepositPreSale(this.depositPresale).then(() => {
                    this.isProcess = false;
                    this.$message({
                      message: '添加定金预售成功',
                      type: 'success'
                    })
                    this.$router.push({path: '/marketingmanager/goodsmarketing/presale'})
                  })
                }
              }
            })
          }
        });
      },
      // 判断选中的单品是否存在促销的互斥
      isSkusexclusive(depositPresale) {
        if (this.isUpdate()) {
          return queryExclusionMarketingCountForDepositPresaleUpdate(depositPresale).then(res => {
            this.isProcess = false;
            return this.getSkusexclusiveResult(res);
          })
        } else {
          return queryExclusionMarketingCountForDepositPresale(depositPresale).then(res => {
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
