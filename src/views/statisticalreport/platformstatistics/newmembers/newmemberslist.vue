<template>
  <div class="app-container">
    <router-link to="/statisticalreport/platformstatistics/newmembers">
      <el-button class="filter-item" size="medium" style="margin: 10px 0;" type="primary" icon="el-icon-back">返回新增会员统计</el-button>
    </router-link>

    <el-table
      :data="list"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="等级">
        <template slot-scope="scope">{{ scope.row.customerLevel.name }}</template>
      </el-table-column>
      <el-table-column label="手机号">
        <template slot-scope="scope">{{ scope.row.mobile }}</template>
      </el-table-column>
      <el-table-column label="邮箱">
        <template slot-scope="scope">{{ scope.row.email }}</template>
      </el-table-column>
      <el-table-column label="手机验证" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isMobileVerification == '1'" type="success">是</el-tag>
          <el-tag v-if="scope.row.isMobileVerification == '0'" type="info">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="邮箱验证" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isEmailVerification == '1'" type="success">是</el-tag>
          <el-tag v-if="scope.row.isEmailVerification == '0'" type="info">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == '1'" type="success">正常</el-tag>
          <el-tag v-if="scope.row.status == '2'" type="danger">冻结</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">
          <span v-if="scope.row.type == '1'">普通</span>
          <span v-if="scope.row.type == '2'">商家</span>
        </template>
      </el-table-column>
      <el-table-column label="预存款总额">
        <template slot-scope="scope">{{ scope.row.allPredeposit }}</template>
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
    queryNewCustomer  //分页查询新增会员信息
  } from '@/api/newmemberslist';

export default {
  data() {
    return {
      listLoading: true,
      listQuery: {
        pageNum: 0,
        pageSize: 10,
        createTime:''
      }, // 查询参数
      list: null, // 页面数据,
      total: null, // 数据总数,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listQuery.createTime = this.$route.query.newCustomerTime;
      queryNewCustomer(this.listQuery).then(response => {
        this.list = response.data;
        this.total = response.recordsTotal;
        this.listLoading = false
      });
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val - 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 0;
      this.listQuery.pageSize = val;
      this.getList();
    },
  }
}
</script>
