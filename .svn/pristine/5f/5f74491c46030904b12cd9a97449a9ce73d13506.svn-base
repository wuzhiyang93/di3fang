<template>
  <div class="app-container">
    <el-form :model="fullPresale" :rules="rules" ref="form" label-position="right" label-width="120px"
             style="margin-top: 20px">
      <el-form-item prop="name">
        <span slot="label">促销名称</span>
        <el-input maxlength="40" v-model="fullPresale.name"/>
      </el-form-item>
      <el-form-item prop="cateId">
        <span slot="label">促销分类</span>
        <el-select v-model="fullPresale.cateId" filterable placeholder="请选择促销分类">
          <el-option
            v-for="item in cates"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="endTime">
        <span slot="label">发货时间</span>
        <el-date-picker
          v-model="fullPresale.endTime"
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="促销描述">
        <el-input type="textarea" v-model="fullPresale.desc" maxlength="2048" :rows="3"/>
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
        <el-button type="primary" @click="saveFullPresale">保存促销活动</el-button>
        <router-link to="/marketingmanager/goodsmarketing/presale?type=1">
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
    queryMarketingCatesByTypeForFullPresale,
    querySkusForFullPresale,
    queryExclusionMarketingCountForFullPresale,
    addFullPreSale,
    queryFullPresaleMarketingById,
    queryMarketingCatesByTypeForFullPresaleUpdate,
    querySkusForFullPresaleUpdate,
    queryExclusionMarketingCountForFullPresaleUpdate,
    updatefullpresale
  } from '@/api/editfullpresale';

  import {marketingErrorMap} from '@/utils/index';

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
        }, // 验证规则
        fullPresale: {
          id: '',
          cateId: '',
          desc: '',
          name: '',
          endTime: '',
          marketingSkus: []
        },// 全款促销
        showSkus: false,// 是否显示单品信息
        cates: [],//全款预售分类
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
      }
    },
    created() {
      if (this.isUpdate()) {
        this.queryFullPresale();
      }
      this.queryCates()
    },
    methods: {
      // 查询全款预售
      queryFullPresale() {
        queryFullPresaleMarketingById(this.id).then(res => {
          this.fullPresale.id = res.id;
          this.fullPresale.name = res.name;
          this.fullPresale.desc = res.desc;
          this.fullPresale.cateId = res.cateId;
          this.fullPresale.endTime = res.endTime;
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
          queryMarketingCatesByTypeForFullPresaleUpdate().then(res => {
            this.cates = res;
          })
        } else {
          queryMarketingCatesByTypeForFullPresale().then(res => {
            this.cates = res;
            if (this.cates && this.cates.length > 0) {
              this.fullPresale.cateId = this.cates[0].id;
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
          querySkusForFullPresaleUpdate(this.listQuery).then((response) => {
            this.setSkus(response);
          })
        } else {
          querySkusForFullPresale(this.listQuery).then((response) => {
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
      saveFullPresale() {
        if (this.selectedSkus.length == 0) {
          this.$message({
            type: 'error',
            message: '请选择参加全款预售的商品!'
          });
          return;
        }

        this.$refs['form'].validate(valid => {
          if (!this.isProcess && valid) {
            this.isProcess = true;
            this.fullPresale.marketingSkus = [];
            this.fullPresale.marketingSkus.push({skuId: this.selectedSkus[0].id});
            this.isSkusexclusive(this.fullPresale).then(res => {
              if (!res) {
                if (this.isUpdate()) {
                  updatefullpresale(this.fullPresale).then(() => {
                    this.isProcess = false;
                    this.$message({
                      message: '更新全款预售成功',
                      type: 'success'
                    })
                    this.$router.push({path: '/marketingmanager/goodsmarketing/presale?type=1'})
                  })
                } else {
                  addFullPreSale(this.fullPresale).then(() => {
                    this.isProcess = false;
                    this.$message({
                      message: '添加全款预售成功',
                      type: 'success'
                    })
                    this.$router.push({path: '/marketingmanager/goodsmarketing/presale?type=1'})
                  })
                }
              }
            })
          }
        });
      },
      // 判断选中的单品是否存在促销的互斥
      isSkusexclusive(fullPresale) {
        if (this.isUpdate()) {
          return queryExclusionMarketingCountForFullPresaleUpdate(fullPresale).then(res => {
            this.isProcess = false;
            return this.getSkusexclusiveResult(res);
          })
        } else {
          return queryExclusionMarketingCountForFullPresale(fullPresale).then(res => {
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
