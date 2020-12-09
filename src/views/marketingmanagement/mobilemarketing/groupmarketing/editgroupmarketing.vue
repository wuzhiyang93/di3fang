<template>
  <div class="app-container">
    <el-form label-position="right" :model="form" :rules="rules" ref="form" label-width="120px"
             style="margin-top: 20px">
      <el-form-item prop="name">
        <span slot="label">促销名称</span>
        <el-input maxlength="40" v-model="form.name" :disabled="isDetail()"/>
      </el-form-item>
      <el-form-item prop="cateId">
        <span slot="label">促销分类</span>
        <el-select v-model="form.cateId" filterable placeholder="请选择促销分类" :disabled="isDetail()">
          <el-option
            v-for="item in marketingCates"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="groupMarketing.groupNum">
        <span slot="label">拼团人数</span>
        <el-input type="number" style="width: 200px" v-model="form.groupMarketing.groupNum" maxlength="11"
                  :disabled="isDetail()"/>
      </el-form-item>
      <el-form-item prop="groupMarketing.limitNum">
        <span slot="label">限购数量</span>
        <el-input type="number" style="width: 200px" v-model="form.groupMarketing.limitNum" maxlength="11"
                  :disabled="isDetail()"/>
      </el-form-item>
      <el-form-item prop="groupMarketing.price">
        <span slot="label">拼团价格</span>
        <el-input type="number" style="width: 200px" v-model="form.groupMarketing.price" maxlength="20"
                  :disabled="isDetail()">
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
          v-model="form.timeValue"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          align="right"
          :disabled="isDetail()">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="拼团规则">
        <el-input type="textarea" v-model="form.groupMarketing.rule" maxlength="1024" :rows="3" :disabled="isDetail()"/>
      </el-form-item>
      <el-form-item label="促销描述">
        <el-input type="textarea" v-model="form.desc" maxlength="2048" :rows="3" :disabled="isDetail()"/>
      </el-form-item>
      <el-form-item v-if="!isDetail()">
        <span slot="label"><span class="labelImportant">*</span>选择商品</span>
        <el-button class="filter-item" size="medium" type="primary" icon="el-icon-plus" @click="toShowSkus()"
                   v-if="!isDetail()" :disabled="isDetail()">选择促销商品
        </el-button>
      </el-form-item>
      <el-form-item>
        <span slot="label" v-if="isDetail()"><span class="labelImportant">*</span>拼团商品</span>
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
          <el-table-column label="操作" v-if="!isDetail()">
            <el-button size="mini" style="margin: 0" type="danger" @click="deleteSku()" :disabled="isDetail()">删除
            </el-button>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveGroupMarketing()" v-if="!isDetail()" :disabled="isDetail()">保存促销活动
        </el-button>
        <router-link to="/marketingmanager/mobilemarketing/groupmarketing">
          <el-button type="info">取消</el-button>
        </router-link>
      </el-form-item>
    </el-form>

    <el-dialog title="选择商品" :visible.sync="showSkus" width="75%">
      <div class="filter-container">
        <el-input placeholder="商品名称" v-model="listQuery.name" maxlength="32" size="medium" style="width: 200px;"
                  class="filter-item"/>
        <el-input placeholder="商品编号" v-model="listQuery.skuNo" size="medium" style="width: 200px;" class="filter-item"/>
        <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
        </el-button>
      </div>
      <el-table
        :data="skuList"
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
    queryMarketingCatesByTypeForAddGroup,
    querySkusForAddGroup,
    queryExclusionMarketingCountForAddGroup,
    addGroupMarketing,
    queryGroupMarketingById,
    queryMarketingCatesByTypeForUpdateGroup,
    querySkusForUpdateGroup,
    queryExclusionMarketingCountForUpdateGroup,
    updateGroup,
    queryGroupMarketingDetailById,
    queryMarketingCatesByTypeForDetail
  } from '@/api/editgroupmarketing';
  import {isDigits, integer, priceValidator} from '@/utils/validate';
  import {marketingErrorMap} from '@/utils/index';

  export default {
    props: ['addOrUpdateOrDetail', 'id'], // 父组件传过来的参数 addOrUpdateOrDetail 新增修改或详情标记 0 新增 1 修改 2 详情  id拼团促销的id
    data() {
      const groupNumValidator = (rule, value, callback) => {
        if (!isDigits(value) || value <= 1) {
          callback(new Error('请输入大于1的整数'));
        } else {
          callback();
        }
      };

      const limitNumValidator = (rule, value, callback) => {
        if (!integer(value)) {
          callback(new Error('请输入大于零的整数'));
        } else {
          callback();
        }
      };

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
          'groupMarketing.groupNum': [
            {
              required: true,
              trigger: 'blur',
              validator: groupNumValidator
            }
          ],
          'groupMarketing.limitNum': [
            {
              required: true,
              trigger: 'blur',
              validator: limitNumValidator
            }
          ],
          'groupMarketing.price': [
            {
              required: true,
              trigger: 'blur',
              validator: priceValidator
            }
          ],
        }, // 验证规则
        selectedSkus: [],// 选中的单品信息
        tempSelectedSku: {},// 临时选中的sku信息
        selectedId: '',// 选中的id
        listLoading: true, // 加载中
        skuList: null, // 单品集合
        total: null, // 数据总数
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          name: '',
          skuNo: ''
        }, // 查询参数
        showSkus: false,// 是否显示单品信息
        marketingCates: [],// 拼团促销的分类
        form: {
          id: '',
          name: '',
          cateId: '',
          desc: '',
          startTime: '',
          endTime: '',
          groupMarketing: {
            groupNum: '',
            limitNum: '',
            price: '',
            rule: ''
          },
          marketingSkus: [],
          timeValue: '',
        },
        isProcess: false,// 接口是否处理中
      }
    },
    created() {
      this.queryCate();
      // 如果是更新或者详情则查询拼团促销信息
      if (!this.isAdd()) {
        this.queryGroupMarketingById();
      }
    },
    methods: {
      queryGroupMarketingById() {
        (this.isUpdate() ? queryGroupMarketingById(this.id) : queryGroupMarketingDetailById(this.id)).then(res => {
          this.form.id = res.id;
          this.form.name = res.name;
          this.form.cateId = res.cateId;
          this.form.desc = res.desc;
          this.form.startTime = res.startTime;
          this.form.endTime = res.endTime;
          this.form.timeValue = [];
          this.form.timeValue.push(res.startTime);
          this.form.timeValue.push(res.endTime);
          this.form.groupMarketing.groupNum = res.groupMarketing.groupNum;
          this.form.groupMarketing.limitNum = res.groupMarketing.limitNum;
          this.form.groupMarketing.price = res.groupMarketing.price;
          this.form.groupMarketing.rule = res.groupMarketing.rule;
          this.selectedSkus = [];
          if (res.marketingSkus && res.marketingSkus.length > 0) {
            this.selectedId = res.marketingSkus[0].skuId;
            this.tempSelectedSku = res.marketingSkus[0].sku;
            this.selectedSkus.push(this.tempSelectedSku);
          }
        })
      },
      queryCate() {
        // 更新查询分类
        if (this.isUpdate()) {
          queryMarketingCatesByTypeForUpdateGroup().then(res => {
            this.marketingCates = res;
          })
        } else if (this.isAdd()) {
          // 新增查询分类
          queryMarketingCatesByTypeForAddGroup().then(res => {
            this.marketingCates = res;
            if (this.marketingCates && this.marketingCates.length > 0) {
              this.form.cateId = this.marketingCates[0].id;
            }
          })
        } else {
          queryMarketingCatesByTypeForDetail().then(res => {
            this.marketingCates = res;
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
        this.listLoading = true;
        if (this.isUpdate()) {
          querySkusForUpdateGroup(this.listQuery).then(res => {
            this.setSkus(res);
          })
        } else if (this.isAdd()) {
          querySkusForAddGroup(this.listQuery).then((response) => {
            this.setSkus(response);
          })
        }
      },
      // 设置查询出来的单品信息
      setSkus(response) {
        this.skuList = response.data;
        this.total = response.recordsTotal;
        this.listLoading = false
      },
      // 改变当前页码
      handleCurrentChange(val) {
        this.listQuery.pageNum = val - 1;
        this.querySkus();
      },
      // 过滤查询
      handleFilter() {
        this.listQuery.pageNum = 0;
        this.querySkus();
      },
      // 改变每页显示记录数
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
            message: '请选择参加拼团的商品!'
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
      saveGroupMarketing() {
        if (this.selectedSkus.length == 0) {
          this.$message({
            type: 'error',
            message: '请选择参加拼团的商品!'
          });
          return;
        }

        this.$refs['form'].validate(valid => {
          if (!this.isProcess && valid) {
            this.isProcess = true;
            this.form.marketingSkus = [];
            this.form.startTime = this.form.timeValue[0];
            this.form.endTime = this.form.timeValue[1];
            this.form.marketingSkus.push({skuId: this.selectedSkus[0].id});

            this.isSkusexclusive(this.form).then(res => {
              if (!res) {
                // 更新
                if (this.isUpdate()) {
                  updateGroup(this.form).then(res => {
                    this.isProcess = false;
                    if (res == 1) {
                      this.$message({
                        message: '修改拼团促销成功',
                        type: 'success'
                      })
                      this.$router.push({path: '/marketingmanager/mobilemarketing/groupmarketing'})
                    } else {
                      this.$message({
                        message: '修改拼团促销失败',
                        type: 'error'
                      })
                    }
                  })
                } else if (this.isAdd()) {
                  // 新增
                  addGroupMarketing(this.form).then(response => {
                    this.isProcess = false;
                    if (response == 1) {
                      this.$message({
                        message: '新增拼团促销成功',
                        type: 'success'
                      })
                      this.$router.push({path: '/marketingmanager/mobilemarketing/groupmarketing'})
                    } else {
                      this.$message({
                        message: '新增拼团促销失败',
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
          return queryExclusionMarketingCountForUpdateGroup(panic).then(res => {
            this.isProcess = false;
            return this.getSkusexclusiveResult(res);
          })
        } else if (this.isAdd()) {
          return queryExclusionMarketingCountForAddGroup(panic).then(res => {
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
      // 判断是否是新增 如果是新增返回true
      isAdd() {
        return this.addOrUpdateOrDetail == 0;
      },
      // 判断是否是修改 如果是修改返回true
      isUpdate() {
        return this.addOrUpdateOrDetail == 1;
      },
      // 判断是否是详情 如果是详情返回true
      isDetail() {
        return this.addOrUpdateOrDetail == 2;
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
