<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="toTabPage">
      <el-tab-pane label="秒杀活动设置" name="0"></el-tab-pane>
      <el-tab-pane label="秒杀活动图片" name="1"></el-tab-pane>
      <el-tab-pane label="秒杀活动列表" name="2"></el-tab-pane>
    </el-tabs>

    <el-alert title="操作说明：" type="warning" :closable="false">
      <p>1. 平台管理员在秒杀设置中配置的所有秒杀场景都会展示在秒杀列表中。</p>
      <p>2. 平台管理员可以通过管理商品按钮去管理参与商家秒杀商品的排序以及显示规则。</p>
    </el-alert>

    <el-radio-group @change="changeType" v-model="promotionStatus" style="margin: 20px 0">
      <el-radio-button :label="1">即将开始</el-radio-button>
      <el-radio-button :label="2">进行中</el-radio-button>
      <el-radio-button :label="3">已结束</el-radio-button>
    </el-radio-group>

    <div v-if="promotionStatus ==1|| promotionStatus ==3" class="filter-container">
      <el-date-picker
        v-model="timeValue"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd HH:mm:ss"
        size="medium"
        type="date"
        placeholder="选择日期时间">
      </el-date-picker>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" style="margin: 0"
                 @click="handleFilter">搜索
      </el-button>
    </div>

    <el-table
      :data="list"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="活动日期">
        <template slot-scope="scope">{{ scope.row.seckillTime.substring(0,10) }}</template>
      </el-table-column>
      <el-table-column label="场次">
        <template slot-scope="scope">{{ scope.row.seckillTime.substring(11,16)}}</template>
      </el-table-column>
      <el-table-column label="结束时间">
        <template slot-scope="scope">{{ scope.row.seckillendTime }}</template>
      </el-table-column>
      <el-table-column label="参与商家数">
        <template slot-scope="scope">{{ scope.row.storeNum }}</template>
      </el-table-column>
      <el-table-column label="秒杀商品数量">
        <template slot-scope="scope">{{ scope.row.skuNum }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link
            :to="{path:'/platformpromotion/platformseckill/seckillscenepanicbuy',query:{seckillSceneId:scope.row.id}}">
            <el-button type="primary" style="margin: 0" size="mini">管理商品</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.pageNum+1" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import {
    querySeckillSceneLists,
  } from '@/api/seckills';

  import {
    formatDate  //时间格式化
  } from '@/utils/index';

  export default {
    data() {
      return {
        activeName: '2',
        timeValue: '',
        promotionStatus: '1', // 1 即将开始 2 进行中 3 已结束
        listLoading: true, // 加载中
        list: null, // 秒杀场次
        total: null, // 数据总数
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          type: '1',
          seckillTime: '',
        }, // 查询参数
        tableData: [
          {
            date: '2019-06-10',
            scene: '21:00',
            endTime: '2019-06-10 22:00',
            storeNum: '5',
            skuNum: '16'
          },
          {
            date: '2019-06-10',
            scene: '21:00',
            endTime: '2019-06-10 22:00',
            storeNum: '5',
            skuNum: '16'
          },
          {
            date: '2019-06-10',
            scene: '21:00',
            endTime: '2019-06-10 22:00',
            storeNum: '5',
            skuNum: '16'
          },
          {
            date: '2019-06-10',
            scene: '21:00',
            endTime: '2019-06-10 22:00',
            storeNum: '5',
            skuNum: '16'
          },
          {
            date: '2019-06-10',
            scene: '21:00',
            endTime: '2019-06-10 22:00',
            storeNum: '5',
            skuNum: '16'
          },
          {
            date: '2019-06-10',
            scene: '21:00',
            endTime: '2019-06-10 22:00',
            storeNum: '5',
            skuNum: '16'
          },
          {
            date: '2019-06-10',
            scene: '21:00',
            endTime: '2019-06-10 22:00',
            storeNum: '5',
            skuNum: '16'
          },
          {
            date: '2019-06-10',
            scene: '21:00',
            endTime: '2019-06-10 22:00',
            storeNum: '5',
            skuNum: '16'
          },
          {
            date: '2019-06-10',
            scene: '21:00',
            endTime: '2019-06-10 22:00',
            storeNum: '5',
            skuNum: '16'
          },
          {
            date: '2019-06-10',
            scene: '21:00',
            endTime: '2019-06-10 22:00',
            storeNum: '5',
            skuNum: '16'
          }
        ]
      }
    },
    created() {
      this.querySeckillSceneLists()
    },
    methods: {
      // 查询秒杀场次
      querySeckillSceneLists() {
        this.listLoading = true
        this.listQuery.type = this.promotionStatus;
        this.listQuery.seckillTime = this.timeValue;
        querySeckillSceneLists(this.listQuery).then((response) => {
          this.list = response.data;
          this.total = response.recordsTotal;
          this.listLoading = false
        })
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val - 1;
        this.querySeckillSceneLists();
      },
      // 过滤查询
      handleFilter() {
        this.listQuery.pageNum = 0;
        this.querySeckillSceneLists();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 0;
        this.listQuery.pageSize = val;
        this.querySeckillSceneLists();
      },
      // 改变tab
      changeType() {
        //  如果选择的是进行中的则把时间设置当前时间
        if (this.promotionStatus == '2') {
          this.timeValue = formatDate(new Date(), 'yyyy-MM-dd 00:00:00');
        } else {
          this.timeValue = '';
        }
        this.handleFilter();
      },
      toTabPage() {
        if (this.activeName === '0') {
          this.$router.push({path: '/platformpromotion/platformseckill/seckillsetting'})
        }
        if (this.activeName === '1') {
          this.$router.push({path: '/platformpromotion/platformseckill/panicbuypic'})
        }
      }
    }
  }
</script>
