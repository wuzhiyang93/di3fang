<template>
  <div class="app-container">
    <el-alert
      style="margin-bottom: 20px"
      title="管理您常用的物流公司，订单发货时方便选择，最多可设置20个物流公司。"
      type="warning">
    </el-alert>


    <el-row :gutter="20">
      <el-col v-for="item in companys" :span="3" style="margin-bottom: 20px">
        <el-checkbox @change="changeChoose(item)" v-model="item.isUse==1" :label="item.name" border></el-checkbox>
      </el-col>
    </el-row>


  </div>
</template>

<script>

  import {
    queryLogisticsCompanysWithUse,
    changyLogisticsCompanysUse
  } from '@/api/logisticscompanyset';

  export default {
    data() {
      return {
        companys: [],// 物流公司
      }
    },
    created() {
      this.queryLogisticsCompanysWithUse()
    },
    methods: {
      changeChoose(company) {
        let actionType = company.isUse == 0 ? 1 : 0;
        // 设置为使用 则判断是否已经达到了20个
        if (actionType == 1) {
          if (this.companys.filter(x => x.isUse == 1).length >= 20) {
            this.$message({
              type: 'error',
              message: '最多可设置20个物流公司'
            });
            return;
          }
        }
        changyLogisticsCompanysUse(company.id, actionType).then(() => {
          this.queryLogisticsCompanysWithUse()
        })
      },
      // 查询物流公司
      queryLogisticsCompanysWithUse() {
        queryLogisticsCompanysWithUse().then(res => {
          this.companys = res;
        })
      }
    }
  }
</script>
