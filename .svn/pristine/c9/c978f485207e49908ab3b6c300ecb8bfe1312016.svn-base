<template>
  <div class="app-container">
    <el-alert title="" type="warning" :closable="false" show-icon>
      <p style="font-size: 13px">注意！ 物流模板，若修改不当，会影响订单运费的结算。<el-link style="font-size: 13px; vertical-align: baseline" @click.native="ruleTipsVisible = true">查看计算公式</el-link></p>
    </el-alert>
    <div class="filter-container" style="margin-top: 20px">
      <router-link to="/ordermanager/logisticstemplatemanager/addlogisticstemplate">
        <el-button class="filter-item" size="medium" type="primary" icon="el-icon-plus">添加物流模板</el-button>
      </router-link>
    </div>

    <el-table
      :data="list"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="物流模板名称" min-width="162">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="运送方式" min-width="110">
        <template slot-scope="scope">快递配送</template>
      </el-table-column>
      <el-table-column label="是否默认" min-width="160">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isDefault == '0'" type="success">是</el-tag>
          <el-tag v-if="scope.row.isDefault == '1'" type="info">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="left" min-width="185">
        <template slot-scope="scope">
          <router-link
            :to="{path:'/ordermanager/logisticstemplatemanager/updatelogisticstemplate',query:{id:scope.row.id}}">
            <el-button type="primary" style="margin: 0 10px 5px 0" size="mini">修改</el-button>
          </router-link>
          <el-button v-if="scope.row.isDefault == '1'" size="mini" style="margin: 0 10px 0 0" type="danger"
                     @click="deleteDialog(scope.row.id)">删除
          </el-button>
          <el-button v-if="scope.row.isDefault == '1'" type="primary" style="margin: 0 10px 5px 0" size="mini"
                     @click="setDefault(scope.row.id)">设为默认
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="运费算法" :visible.sync="ruleTipsVisible" width="80%">
      <div style="line-height: 28px">
        <p>订单改价不影响运费计算<br>单品运费包邮条件的判断、基于商品所有营销之后的金额判断(不包含红包，积分，优惠券)<br>一笔订单中使用相同单品运费模板的所有商品件数、重量叠加后再计算</p>
        <p>订单包含多种运费模板时，取所有商品中，首件/首重/金额最大的运费模板，计算使用该模板的所有商品运费，使用其他模板的商品都按照各自模板的续件/续重/金额来计算，再求和。<br>注意：计算时要排除包邮商品</p>
        <p>例：一笔订单中包含：</p>
        <p>商品A10件（重量0.5KG）关联运费模板1（按重量、默认地区）：首重0.5KG，10元，续重1Kg，5元<br>商品B10件（重量0.6KG）关联运费模板2（按重量、默认地区）：首重0.5KG，12元，续重0.5KG，6元<br>商品C10件（重量0.5KG）关联运费模板3 ( 按件数、默认地区 ) ：首件1件，5元，续件1件，4元<br>商品D10件（重量0.5KG）关联运费模板4（按件数、默认地区）：首件1件，4元，续件1件，4元，江浙沪地区，购买满1件包邮</p>
        <p>计算过程为：</p>
        <p>1、对比收货地址，获取当前商品使用的运费模板相关地区的运费设置、包邮条件设置<br>2、排除符合包邮条件的商品D，比较得知商品B首价较高<br>3、商品B运费 = 12 +（0.6×10-0.5) ÷ 0.5 × 6 = 78<br>商品A运费 =（0.5×10）÷ 1 × 5 = 25<br>商品C运费 = 10 × 4 = 40<br>商品D运费 = 0<br>总运费 = 78 + 25 + 40 = 143</p>
        <p>如何判断商品是否包邮<br>例如：商品A设置的基础运费是10元，每增加一件，运费加2元，满3件包邮<br>若：一笔订单中仅有商品A，A满3件则不参与计算运费，不满3件需参与计算<br>若：一笔订单中商品B与A使用的运费模板一致，A\B各买2件，共4件，满足包邮条件。</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="ruleTipsVisible = false">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {queryAllLogisticsTemplates, setDefaultTemplate, deleteLogisticsTemplateById} from '@/api/logisticstemplate';

  export default {
    data() {
      return {
        ruleTipsVisible: false,
        listLoading: true,
        list: null,// 物流模版数据
        isProcess: false, // 接口是否处理中
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        queryAllLogisticsTemplates().then(res => {
          this.list = res;
          this.listLoading = false;
        })
      },
      deleteDialog(id) {
        this.$confirm('确定要删除此物流模板吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.isProcess) {
            return;
          }
          this.isProcess = true;

          deleteLogisticsTemplateById(id).then(res => {
            this.isProcess = false;
            if (res > 0) {
              this.$message({
                type: 'success',
                message: '物流模版删除成功!'
              })
            } else if (res == -1) {
              this.$message({
                type: 'error',
                message: '默认模版不能删除!'
              })
            } else {
              this.$message({
                type: 'error',
                message: '默认模版删除失败!'
              })
            }

            this.getList();
          })
        })
      },
      setDefault(id) {
        this.$confirm('确定要设置此模板为默认吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.isProcess) {
            return;
          }
          this.isProcess = true;
          setDefaultTemplate(id).then(res => {
            this.isProcess = false;
            if (res > 0) {
              this.$message({
                type: 'success',
                message: '设置默认物流模版成功!'
              })
            } else {
              this.$message({
                type: 'error',
                message: '设置默认物流模版失败!'
              })
            }

            this.getList();
          })
        })
      }
    }
  }
</script>
