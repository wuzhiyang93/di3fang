<template>
  <div class="app-container">

    <el-tabs v-model="activeName" type="card" @tab-click="toTabPage">
      <el-tab-pane label="秒杀活动设置" name="0"></el-tab-pane>
      <el-tab-pane label="秒杀活动图片" name="1"></el-tab-pane>
      <el-tab-pane label="秒杀活动列表" name="2"></el-tab-pane>
    </el-tabs>

    <div class="filter-container">
      <el-button type="info" icon="el-icon-back" @click="backPage">返回活动列表</el-button>
      <el-button type="primary" style="margin: 0" @click="toBatchShow">批量显示</el-button>
      <el-button type="danger" style="margin: 0" @click="toBatchHide">批量不显示</el-button>
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
      <el-table-column label="排序" width="50">
        <template slot-scope="scope">{{ scope.row.sort }}</template>
      </el-table-column>
      <el-table-column label="商品图片" width="80">
        <template slot-scope="scope"><img :src="scope.row.sku.url" width="50" height="50"></template>
      </el-table-column>
      <el-table-column label="商品编号" width="140">
        <template slot-scope="scope">{{ scope.row.sku.id }}</template>
      </el-table-column>
      <el-table-column label="商品名称" min-width="250">
        <template slot-scope="scope">{{ scope.row.sku.name }}</template>
      </el-table-column>
      <el-table-column label="规格" min-width="150">
        <template slot-scope="scope">
          <span v-html="getSpecValues(scope.row.sku.skuSpecValues)"></span>
        </template>
      </el-table-column>
      <el-table-column label="商家名称" min-width="80">
        <template slot-scope="scope">{{ scope.row.storeName }}</template>
      </el-table-column>
      <el-table-column label="销售价" min-width="80">
        <template slot-scope="scope">{{ scope.row.sku.price.toFixed(2) }}</template>
      </el-table-column>
      <el-table-column label="折扣" width="60">
        <template slot-scope="scope">{{ Math.round(scope.row.discount * 100) }}%</template>
      </el-table-column>
      <el-table-column label="限购(件)" width="80">
        <template slot-scope="scope">{{ scope.row.limitNum }}</template>
      </el-table-column>
      <el-table-column label="是否显示" width="82">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isShow == '1'" type="success">是</el-tag>
          <el-tag v-if="scope.row.isShow == '0'" type="info">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button type="primary" style="margin: 0" size="mini" @click="toUpdateShow(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.pageNum+1" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog title="编辑" :visible.sync="dialogVisible">
      <el-form :model="updateForm" :rules="updateRules" ref="updateForm" label-position="right" label-width="100px">
        <el-form-item prop="sort">
          <span slot="label">排序</span>
          <el-input type="number" v-model="updateForm.sort" maxlength="10"/>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-switch
            v-model="updateForm.isShow"
            active-value="1"
            inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updateShow">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

  import {
    querySeckillScenePanicbuyList,
    updateSeckillScenePanicbuy,
    batchShowSeckillScenePanicbuy,
    batchHideSeckillScenePanicbuy
  } from '@/api/seckillscenepanicbuylist';

  import {plusIntegerValidator} from '@/utils/validate';

  export default {
    data() {
      return {
        dialogVisible: false, // 是否展示编辑弹窗
        activeName: '2', // 页面tab
        selectIds: [], // 多选选中id数组
        isProcess: false, // 接口是否处理中
        listLoading: true, // 加载中
        list: null, // 秒杀商品数据
        total: null, // 数据总数
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          seckillSceneId: this.$route.query.seckillSceneId, // 秒杀场次id
        }, // 查询参数
        updateForm: {
          id: 0, // 秒杀活动折扣id
          isShow: '', // 是否展示 0 不展示 1 展示
          sort: '', // 排序
        }, // 编辑表单
        updateRules: {
          sort: [
            {
              required: true,
              validator: plusIntegerValidator,
              trigger: 'blur'
            }
          ]
        },  // 验证规则
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 查询数据
      getList() {
        this.listLoading = true;
        querySeckillScenePanicbuyList(this.listQuery).then((response) => {
          this.list = response.data;
          this.total = response.recordsTotal;
          this.listLoading = false
        })
      },
      // 翻页
      handleCurrentChange(val) {
        this.listQuery.pageNum = val - 1;
        this.getList();
      },
      // 多选
      handleSelectionChange(val) {
        if (val && val.length > 0) {
          this.selectIds = val.map(row => row.id);
        } else {
          this.selectIds = [];
        }
      },
      // 过滤查询
      handleFilter() {
        this.listQuery.pageNum = 0;
        this.getList();
      },
      // 改变页码
      handleSizeChange(val) {
        this.listQuery.pageNum = 0;
        this.listQuery.pageSize = val;
        this.getList();
      },
      // 准备编辑
      toUpdateShow(seckillScenePanicbuyList) {
        this.updateForm = {
          id: seckillScenePanicbuyList.id,
          isShow: seckillScenePanicbuyList.isShow,
          sort: seckillScenePanicbuyList.sort,
        };
        if (this.$refs["updateForm"]) {
          this.$refs["updateForm"].resetFields();
        }
        this.dialogVisible = true;
      },
      // 保存编辑
      updateShow() {
        this.$refs['updateForm'].validate(valid => {
          if (valid && !this.isProcess) {
            this.isProcess = true;
            updateSeckillScenePanicbuy(this.updateForm).then(res => {
              this.isProcess = false;
              if (res > 0) {
                this.$message({
                  type: 'success',
                  message: '编辑成功！'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: '编辑失败！'
                });
              }
              this.dialogVisible = false;
              this.getList();
            })
          }
        })
      },
      // 准备批量设置秒杀商品展示
      toBatchShow() {
        if (this.selectIds && this.selectIds.length > 0) {
          this.$confirm('您确定要批量设置商品显示吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.batchShow(this.selectIds);
          })
        } else {
          this.$message({
            message: '请至少选择一条数据',
            type: 'warning'
          })
        }
      },
      // 批量设置秒杀商品展示
      batchShow(ids) {
        if (this.isProcess) {
          return;
        }
        this.isProcess = true;
        batchShowSeckillScenePanicbuy({"ids": ids.toString()}).then(res => {
          this.isProcess = false;
          if (res > 0) {
            this.$message({
              type: 'success',
              message: '设置批量显示成功!'
            });
          } else {
            this.$message({
              type: 'error',
              message: '设置批量显示失败！'
            });
          }
          this.selectIds = [];
          this.getList();
        });
      },
      // 准备批量设置秒杀商品不展示
      toBatchHide() {
        if (this.selectIds && this.selectIds.length > 0) {
          this.$confirm('您确定要批量设置商品不显示吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.batchHide(this.selectIds);
          })
        } else {
          this.$message({
            message: '请至少选择一条数据',
            type: 'warning'
          })
        }
      },
      // 批量设置秒杀商品不展示
      batchHide(ids) {
        if (this.isProcess) {
          return;
        }
        this.isProcess = true;
        batchHideSeckillScenePanicbuy({"ids": ids.toString()}).then(res => {
          this.isProcess = false;
          if (res > 0) {
            this.$message({
              type: 'success',
              message: '设置批量不显示成功!'
            });
          } else {
            this.$message({
              type: 'error',
              message: '设置批量不显示失败！'
            });
          }
          this.selectIds = [];
          this.getList();
        });
      },
      // 跳转页面
      toTabPage() {
        if (this.activeName === '0') {
          this.$router.push({path: '/platformpromotion/platformseckill/seckillsetting'})
        }
        if (this.activeName === '1') {
          this.$router.push({path: '/platformpromotion/platformseckill/panicbuypic'})
        }
      },
      // 返回秒杀活动列表
      backPage() {
        this.$router.push({path: '/platformpromotion/platformseckill/seckills'})
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
