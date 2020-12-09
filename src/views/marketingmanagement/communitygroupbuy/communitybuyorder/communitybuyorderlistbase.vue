<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filterBox">
        <p>团长手机号</p>
        <el-input placeholder="团长手机号" v-model="listQuery.communityBuyHeadMobile" size="medium" style="width: 180px;"
                  class="filter-item"/>
      </div>
      <div class="filterBox">
        <p>团购名称</p>
        <el-input placeholder="团购名称" v-model="listQuery.communityBuyName" size="medium" style="width: 180px;"
                  class="filter-item"/>
      </div>
      <div class="filterBox">
        <p>小区名称</p>
        <el-input placeholder="小区名称" v-model="listQuery.communityName" size="medium" style="width: 180px;"
                  class="filter-item"/>
      </div>
      <el-date-picker
        style="width: 355px"
        class="search-datepicker"
        size="medium"
        :clearable="false"
        v-model="searchTimeValue"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss"
        align="right">
      </el-date-picker>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
      <br/>
      <el-dropdown class="filter-item">
        <el-button size="medium" type="primary">导出订单<i class="el-icon-arrow-down el-icon--right"></i></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="exportAll()">导出所有</el-dropdown-item>
          <el-dropdown-item @click.native="exportSelected()">导出选中</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-table
      :data="communityBuyOrderList"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="40"/>
      <el-table-column label="订单号">
        <template slot-scope="scope">{{ scope.row.orderCode }}</template>
      </el-table-column>
      <el-table-column label="团长手机号">
        <template slot-scope="scope">{{ scope.row.communityBuyHeadMobile }}</template>
      </el-table-column>
      <el-table-column label="团长名称">
        <template slot-scope="scope">{{ scope.row.communityBuyHeadName }}</template>
      </el-table-column>
      <el-table-column label="团购名称">
        <template slot-scope="scope">{{ scope.row.communityBuyName }}</template>
      </el-table-column>
      <el-table-column label="小区名称">
        <template slot-scope="scope">{{ scope.row.communityName }}</template>
      </el-table-column>
      <el-table-column label="订单总额">
        <template slot-scope="scope">{{ scope.row.price }}</template>
      </el-table-column>
      <el-table-column label="利润">
        <template slot-scope="scope">{{ scope.row.profit }}</template>
      </el-table-column>
      <el-table-column label="下单时间" width="160">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="订单状态" width="82">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == '1'" type="warning">待支付</el-tag>
          <el-tag v-if="scope.row.status == '2'" type="warning">已支付</el-tag>
          <el-tag v-if="scope.row.status == '4'" type="success">已完成</el-tag>
          <el-tag v-if="scope.row.status == '5'" type="info">已取消</el-tag>
          <el-tag v-if="scope.row.status == '6'" type="info">已取消</el-tag>
          <el-tag v-if="scope.row.status == '7'" type="info">已取消</el-tag>

        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <router-link :to="{path:detailPath,query:{id:scope.row.id}}">
            <el-button type="success" style="margin: 0 10px 5px 0" size="mini">详情</el-button>
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

    <div style="text-align: center; margin-top: 20px" v-if="mobile">
      <el-button type="info" icon="el-icon-back" @click="goBack">返回团长列表</el-button>
    </div>

  </div>
</template>

<script>

  export default {
    props: ['detailPath', 'mobile', 'queryUrl', 'exportAllUrl', 'exportCheckedUrl'], // 父组件传过来的参数
    data() {
      return {
        searchTimeValue: null, // 查询条件时间范围，数组格式，数组第一项为开始时间，第二项结束时间
        selectedIds: [], // 批量操作选中的id数组
        listLoading: true, // 列表加载标识
        communityBuyOrderList: null, // 列表数据集合
        total: null, // 总记录数
        listQuery: {
          pageNum: 0, // 当前页码
          pageSize: 10, // 每页显示记录数
          communityBuyHeadMobile: '', // 团长手机号
          communityBuyName: '', // 团购名称
          communityName: '', // 小区名称
          startTime: '', // 开始时间
          endTime: '', // 结束时间
        },
        pickerOptions: {
          shortcuts: [{
            text: '最近三天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 查询社区团购团长列表
      getList() {
        this.listLoading = true;
        if (this.mobile) {
          this.listQuery.communityBuyHeadMobile = this.mobile;
        }
        if (this.searchTimeValue) {
          this.listQuery.startTime = this.searchTimeValue[0];
          this.listQuery.endTime = this.searchTimeValue[1];
        } else {
          this.listQuery.startTime = '';
          this.listQuery.endTime = '';
        }
        this.queryUrl(this.listQuery).then((response) => {
          this.communityBuyOrderList = response.data;
          this.total = response.recordsTotal;
          this.listLoading = false
        })
      },
      // 返回
      goBack() {
        this.$router.back(-1);
      },
      // 过滤查询
      handleFilter() {
        this.listQuery.pageNum = 0;
        this.getList();
      },
      // 改变当前页码
      handleCurrentChange(val) {
        this.listQuery.pageNum = val - 1;
        this.getList();
      },
      // 改变每页显示记录数
      handleSizeChange(val) {
        this.listQuery.pageNum = 0;
        this.listQuery.pageSize = val;
        this.getList();
      },
      // 多选选中id
      handleSelectionChange(val) {
        // val 为选中数据的集合
        if (val && val.length > 0) {
          this.selectedIds = val.map(row => row.id);
        } else {
          this.selectedIds = [];
        }
      },
      // 导出所有订单
      exportAll() {
        this.exportAllUrl(this.mobile ? this.mobile : '').then(res => {
          let blob = new Blob([res], {type: "application/vnd.ms-excel"});
          let objectUrl = URL.createObjectURL(blob);
          window.location.href = objectUrl;
        });
      },
      // 导出选中的订单
      exportSelected() {
        if (this.selectedIds && this.selectedIds.length > 0) {
          this.exportCheckedUrl(this.selectedIds.toString()).then(res => {
            let blob = new Blob([res], {type: "application/vnd.ms-excel"});
            let objectUrl = URL.createObjectURL(blob);
            window.location.href = objectUrl;
          });
        } else {
          this.$message({
            message: '请至少选择一条订单！',
            type: 'warning'
          })
        }
      },
    }
  }
</script>
