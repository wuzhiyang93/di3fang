<template>
  <div class="app-container">
    <el-form :model="fall" :rules="rules" ref="form" label-position="right" label-width="120px"
             style="margin-top: 20px">
      <el-form-item prop="name">
        <span slot="label">促销名称</span>
        <el-input v-model="fall.name" maxlength="40"/>
      </el-form-item>
      <el-form-item prop="fall.price">
        <span slot="label">直降金额</span>
        <el-input type="text" v-model="fall.fall.price" maxlength="20" style="width: 200px">
          <template slot="prepend">¥</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="timeValue">
        <span slot="label">促销时间</span>
        <el-date-picker
          style="width: 355px"
          class="search-datepicker"
          size="medium"
          :clearable="false"
          v-model="fall.timeValue"
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
        <el-input type="textarea" v-model="fall.desc" maxlength="2048" :rows="3"/>
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
        <el-button type="primary" @click="saveFall()">保存促销活动</el-button>
        <router-link to="/marketingmanager/goodsmarketing/fall">
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
    querySkusForFall,
    queryExclusionMarketingCountForFall,
    addFallMarketing,
    queryFallMarketingById,
    queryExclusionMarketingCountForFallUpdate,
    updateFallMarketing,
    querySkusForFallUpdate
  } from '@/api/editfallmarketing';
  import {digitsValidator} from '@/utils/validate';
  import {marketingErrorMap} from '@/utils/index';


  export default {
    props: ['addOrUpdate', 'id'], // 父组件传过来的参数 addOrUpdate新增修改标记 0 新增 1 修改  id直降促销的id
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
          'fall.price': [
            {
              required: true,
              validator: digitsValidator,
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
        fall: {
          id: '',
          desc: '',
          name: '',
          startTime: '',
          endTime: '',
          fall: {
            price: ''
          },
          marketingSkus: [],
          timeValue: '',
        },
        isProcess: false,// 接口是否处理中
        selectedSkus: [],// 选中的单品信息
      }
    },
    created() {
      // 如果是更新则查询直降信息
      if (this.isUpdate()) {
        this.queryFall();
      }
    },
    methods: {
      queryFall() {
        queryFallMarketingById(this.id).then(res => {
          this.selectedSkus = [];
          if (res.marketingSkus && res.marketingSkus.length > 0) {
            this.fall.id = res.id;
            this.fall.desc = res.desc;
            this.fall.name = res.name;
            this.fall.startTime = res.startTime;
            this.fall.endTime = res.endTime;
            this.fall.timeValue = [];
            this.fall.timeValue.push(res.startTime);
            this.fall.timeValue.push(res.endTime);
            this.fall.fall.price = res.fall.price;
            if (res.marketingSkus && res.marketingSkus.length > 0) {
              res.marketingSkus.forEach(sku => {
                this.selectedSkus.push(sku.sku);
              })
            }
          }
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
          querySkusForFallUpdate(this.listQuery).then((response) => {
            this.setSkus(response);
          })
        } else {
          querySkusForFall(this.listQuery).then((response) => {
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
            message: '请选择参加直降的商品!'
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
      // 保存直降
      saveFall() {
        if (this.selectedSkus.length == 0) {
          this.$message({
            type: 'error',
            message: '请选择参加限时折扣的商品!'
          });
          return;
        }
        this.$refs['form'].validate(valid => {
          if (!this.isProcess && valid) {
            this.isProcess = true;
            this.fall.marketingSkus = [];
            this.fall.startTime = this.fall.timeValue[0];
            this.fall.endTime = this.fall.timeValue[1];
            this.selectedSkus.forEach(sku => {
              this.fall.marketingSkus.push({skuId: sku.id});
            })

            this.isSkusexclusive(this.fall).then(res => {
              if (!res) {

                // 更新
                if (this.isUpdate()) {
                  updateFallMarketing(this.fall).then(() => {
                    this.isProcess = false;
                    this.$message({
                      type: 'success',
                      message: '修改直降成功!'
                    });
                    this.$router.push({path: '/marketingmanager/goodsmarketing/fall'})
                  })
                } else {
                  // 新增
                  addFallMarketing(this.fall).then(() => {
                    this.isProcess = false;
                    this.$message({
                      type: 'success',
                      message: '添加直降成功!'
                    });
                    this.$router.push({path: '/marketingmanager/goodsmarketing/fall'})
                  })
                }
              }
            })

          }
        });
      },
      // 判断选中的单品是否存在促销的互斥
      isSkusexclusive(fall) {
        // 修改
        if (this.isUpdate()) {
          return queryExclusionMarketingCountForFallUpdate(fall).then(res => {
            this.isProcess = false;
            return this.getSkusexclusiveResult(res);
          })
        } else {
          return queryExclusionMarketingCountForFall(fall).then(res => {
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
