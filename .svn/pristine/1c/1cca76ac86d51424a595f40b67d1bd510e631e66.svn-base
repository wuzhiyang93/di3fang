<template>
  <div class="app-container">
    <el-radio-group v-model="listStatus" @change="toChangeStatus" style="margin-bottom: 20px">
      <el-radio-button :label="0">团长列表</el-radio-button>
      <el-radio-button :label="1">待审核列表</el-radio-button>
    </el-radio-group>
    <div class="filter-container">
      <div class="filterBox">
        <p>团长手机号</p>
        <el-input placeholder="团长手机号" v-model="listQuery.mobile" size="medium" style="width: 180px;"
                  class="filter-item"/>
      </div>
      <div class="filterBox">
        <p>小区名称</p>
        <el-input placeholder="小区名称" v-model="listQuery.detailAddress" size="medium" style="width: 180px;"
                  class="filter-item"/>
      </div>
      <div class="filterBox" v-if="listQuery.status">
        <p>状态</p>
        <el-select class="filter-item" v-model="listQuery.status" size="medium" style="width: 150px">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="已通过" value="2"></el-option>
          <el-option label="已开除" value="3"></el-option>
        </el-select>
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
      <el-dropdown class="filter-item" style="margin-left: 5px;">
        <el-button size="medium" type="primary">导出团长<i class="el-icon-arrow-down el-icon--right"></i></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="exportAll()">导出所有</el-dropdown-item>
          <el-dropdown-item @click.native="exportSelected()">导出选中</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-table
      :data="communityBuyHeadList"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="40"/>
      <el-table-column label="团长名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="手机号">
        <template slot-scope="scope">{{ scope.row.mobile }}</template>
      </el-table-column>
      <el-table-column label="省市区">
        <template slot-scope="scope">{{ scope.row.address }}</template>
      </el-table-column>
      <el-table-column label="小区名称">
        <template slot-scope="scope">{{ scope.row.detailAddress }}</template>
      </el-table-column>
      <el-table-column label="提货地址">
        <template slot-scope="scope">{{ scope.row.pickUpAddress }}</template>
      </el-table-column>
      <el-table-column label="申请时间" v-if="listStatus == '1'">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="加入时间" v-if="listStatus == '0'">
        <template slot-scope="scope">{{ scope.row.auditTime }}</template>
      </el-table-column>
      <el-table-column label="销售额" v-if="listStatus == '0'">
        <template slot-scope="scope">{{ scope.row.saleMoney }}</template>
      </el-table-column>
      <el-table-column label="累计佣金" v-if="listStatus == '0'">
        <template slot-scope="scope">{{ scope.row.commission }}</template>
      </el-table-column>
      <el-table-column label="状态" width="82" v-if="listStatus == '0'">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == '2'" type="success">已通过</el-tag>
          <el-tag v-if="scope.row.status == '3'" type="info">已开除</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="left" width="145">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == '2'" type="primary" style="margin: 0 5px 0 0" size="mini"
                     @click="toUpdateCommunityBuyHead(scope.row.id)">编辑
          </el-button>
          <el-button v-if="scope.row.status == '2'" size="mini" style="margin: 0" type="danger"
                     @click="toFireCommunityBuyHead(scope.row.id)">
            开除
          </el-button>
          <router-link v-if="scope.row.status == '2'"
                       :to="{path:'/marketingmanager/communitygroupbuy/communitybuyorderlistforhead',query:{mobile:scope.row.mobile}}">
            <el-button type="success" style="margin: 5px 0 0 0" size="mini">查看订单</el-button>
          </router-link>
          <el-button v-if="scope.row.status == '0'" type="primary" size="mini" style="margin: 0 5px 0 0"
                     @click="toPassCommunityBuyHead(scope.row.id)">通过
          </el-button>
          <el-button v-if="scope.row.status == '0'" size="mini" type="danger" style="margin: 0"
                     @click="toRefuseCommunityBuyHead(scope.row.id)">拒绝
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.pageNum+1" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog title="编辑团长信息" :visible.sync="editFlag">
      <el-form label-position="right" :model="headForm" :rules="headRules" ref="headForm" label-width="100px">
        <el-form-item prop="name">
          <span slot="label">团长名称</span>
          <el-input v-model="headForm.name" maxlength="16"/>
        </el-form-item>
        <el-form-item prop="address">
          <span slot="label">省市区</span>
          <el-cascader
            clearable
            style="width: 100%"
            :placeholder="address"
            expand-trigger="hover"
            :props="props"
            v-model="areaSelectedOptions"
            ref="selectAddress">
          </el-cascader>
        </el-form-item>
        <el-form-item prop="detailAddress">
          <span slot="label">小区名称</span>
          <el-input v-model="headForm.detailAddress" maxlength="32"/>
        </el-form-item>
        <el-form-item prop="pickUpAddress">
          <span slot="label">提货点</span>
          <el-input v-model="headForm.pickUpAddress" maxlength="32"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFlag = false">取消</el-button>
        <el-button type="primary" @click="updateCommunityBuyHead">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="审核团长" :visible.sync="auditFlag">
      <el-form label-position="right" :model="auditForm" :rules="auditRules" ref="auditForm" label-width="100px">
        <el-form-item prop="refuseReason">
          <span slot="label">拒绝原因</span>
          <el-input v-model="auditForm.refuseReason" maxlength="1024"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="auditFlag = false">取消</el-button>
        <el-button type="primary" @click="refuseCommunityBuyHead">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    queryCommunityBuyHeadList,
    queryCommunityBuyHeadById,
    queryAllProvinces,
    queryCityByProvinceId,
    queryDistrictByCityId,
    updateCommunityBuyHead,
    fireCommunityBuyHead,
    auditCommunityBuyHead,
    exportAllCommunityBuyHead,
    exportCheckedCommunityBuyHead
  } from '@/api/communitybuyheadlist';

  export default {
    data() {
      return {
        listStatus: 0, // 列表状态 0 团长列表 1 待审核列表
        address: '', // 默认的省市区
        isProcess: false, // 接口是否处理中
        editFlag: false, // 是否显示编辑团长弹窗标识
        auditFlag: false, // 是否显示审核团长弹窗标识
        areaSelectedOptions: [], // 选中的省市区数组
        selectedIds: [], // 批量操作选中的id数组
        listLoading: true, // 列表加载标识
        communityBuyHeadList: null, // 列表数据集合
        total: null, // 总记录数
        listQuery: {
          pageNum: 0, // 当前页码
          pageSize: 10, // 每页显示记录数
          mobile: '', // 团长手机号
          detailAddress: '', // 小区名称
          status: '-1', // 状态  -1 全部 0 待审核 2 已通过 3 已开除
          beginTime: '', // 开始时间
          endTime: '', // 结束时间
        },
        searchTimeValue: null, // 查询条件时间范围，数组格式，数组第一项为开始时间，第二项结束时间
        headForm: {
          id: '', // 团长id
          name: '', // 团长名称
          address: '', // 省市区信息，/间隔
          detailAddress: '', // 详细地址
          pickUpAddress: '', // 提货地址
        },
        headRules: { // 校验规则
          name: [
            {
              required: true,
              message: '请输入团长名称',
              trigger: 'blur'
            }
          ],
          address: [
            {
              required: true,
              message: '请选择地区',
              trigger: 'blur'
            }
          ],
          detailAddress: [
            {
              required: true,
              message: '请输入小区名称',
              trigger: 'blur'
            }
          ],
          pickUpAddress: [
            {
              required: true,
              message: '请输入提货地址',
              trigger: 'blur'
            }
          ]
        },
        auditForm: {
          id: '', // 团长id
          isApproved: '', // 是否通过 0 通过 1 拒绝
          refuseReason: '', // 拒绝原因
        },
        auditRules: {
          refuseReason: [
            {
              required: true,
              message: '请输入拒绝原因',
              trigger: 'blur'
            }
          ]
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
        props: {
          lazy: true,
          lazyLoad(node, resolve) {
            const {level} = node;
            // 查询全部的省
            if (level == 0) {
              queryAllProvinces().then((res) => {
                let node = [];
                if (res && res.length > 0) {
                  node = res.map(item => {
                    return {
                      value: item.id,
                      label: item.name,
                      leaf: false
                    };
                  })
                }
                resolve(node);
              })
            } else if (level == 1) {
              // 查询市
              queryCityByProvinceId(node.value).then(res => {
                let node = [];
                if (res && res.length > 0) {
                  node = res.map(item => {
                    return {
                      value: item.id,
                      label: item.name,
                      leaf: false
                    };
                  })
                }
                resolve(node);
              })
            } else if (level == 2) {
              queryDistrictByCityId(node.value).then(res => {
                let node = [];
                if (res && res.length > 0) {
                  node = res.map(item => {
                    return {
                      value: item.id,
                      label: item.name,
                      leaf: true
                    };
                  })
                }
                resolve(node);
              })
            }
          }
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
        if (this.searchTimeValue) {
          this.listQuery.beginTime = this.searchTimeValue[0];
          this.listQuery.endTime = this.searchTimeValue[1];
        } else {
          this.listQuery.beginTime = '';
          this.listQuery.endTime = '';
        }
        queryCommunityBuyHeadList(this.listQuery).then((response) => {
          this.communityBuyHeadList = response.data;
          this.total = response.recordsTotal;
          this.listLoading = false
        })
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
      // 切换列表
      toChangeStatus() {
        if (this.listStatus === 1) {
          // this.$router.push({path: '/promotionManagement/communityGroupBuy/groupBuyHeadsAuditList'})
          this.listQuery.status = '';
        } else {
          this.listQuery.status = '-1';
        }
        this.listQuery.pageNum = 0;
        this.listQuery.mobile = '';
        this.listQuery.detailAddress = '';
        this.listQuery.beginTime = '';
        this.listQuery.endTime = '';
        this.searchTimeValue = null;
        this.getList();
      },
      // 准备编辑团长信息
      toUpdateCommunityBuyHead(id) {
        if (this.$refs["headForm"]) {
          this.$refs["headForm"].resetFields();
        }
        this.areaSelectedOptions = [];
        queryCommunityBuyHeadById(id).then(res => {
          this.headForm = {
            id: id,
            name: res.name,
            address: res.address,
            detailAddress: res.detailAddress,
            pickUpAddress: res.pickUpAddress,
          };
          this.address = res.address;
          this.editFlag = true;
        })
      },
      // 更新团长信息
      updateCommunityBuyHead() {
        this.$refs["headForm"].validate(valid => {
          if (!this.isProcess && valid) {
            // 获取选中节点数组getCheckedNodes()
            let addressArray = this.$refs["selectAddress"].getCheckedNodes();
            if (addressArray && addressArray.length > 0) {
              if (addressArray[0].pathLabels && addressArray[0].pathLabels.length > 0) {
                this.headForm.address = addressArray[0].pathLabels[0] + '/' + addressArray[0].pathLabels[1] + '/' + addressArray[0].pathLabels[2];
              } else {
                this.headForm.address = this.address;
              }
            } else {
              this.headForm.address = this.address;
            }
            this.isProcess = true;
            updateCommunityBuyHead(this.headForm).then((res) => {
              this.isProcess = false;
              if (res == -1) {
                this.$message({
                  message: '地区格式错误',
                  type: 'error'
                });
              } else if (res == -2) {
                this.$message({
                  message: '团长信息为空',
                  type: 'error'
                });
              } else if (res == 1) {
                this.$message({
                  message: '编辑团长信息成功',
                  type: 'success'
                });
                this.handleFilter();
                this.editFlag = false;
              } else {
                this.$message({
                  message: '编辑团长信息失败',
                  type: 'error'
                });
              }
            })
          }
        });
      },
      // 准备开除团长
      toFireCommunityBuyHead(id) {
        this.$confirm('开除团长后无法撤销，只能重新加入，请确认是否开除此团长？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.fireCommunityBuyHead(id);
        })
      },
      // 开除团长
      fireCommunityBuyHead(id) {
        if (!this.isProcess) {
          this.isProcess = true;
          fireCommunityBuyHead(id).then(res => {
            this.isProcess = false;
            if (res == 1) {
              this.getList();
              this.$message({
                type: 'success',
                message: '开除成功!'
              });
            } else if (res == -1) {
              this.$message({
                type: 'error',
                message: '团长有正在进行中的活动有已付款订单无法开除!'
              })
            } else {
              this.$message({
                type: 'error',
                message: '开除失败!'
              })
            }
          });
        }
      },
      // 准备通过团长审核
      toPassCommunityBuyHead(id) {
        this.$confirm('确定要通过该团长审核吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (!this.isProcess) {

            this.auditForm.id = id;
            this.auditForm.isApproved = '0';

            this.isProcess = true;

            auditCommunityBuyHead(this.auditForm).then(res => {
              this.isProcess = false;
              if (res == 1) {
                this.getList();
                this.$message({
                  type: 'success',
                  message: '审核通过成功!'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: '审核通过失败!'
                })
              }
            })
          }
        })
      },
      // 准备拒绝团长审核
      toRefuseCommunityBuyHead(id) {
        if (this.$refs["auditForm"]) {
          this.$refs["auditForm"].resetFields();
        }
        this.auditForm.id = id;
        this.auditForm.isApproved = '1';
        this.auditForm.refuseReason = '';
        this.auditFlag = true;
      },
      // 拒绝团长审核
      refuseCommunityBuyHead() {
        this.$refs["auditForm"].validate(valid => {
          if (!this.isProcess && valid) {
            this.isProcess = true;
            auditCommunityBuyHead(this.auditForm).then(res => {
              this.isProcess = false;
              if (res == 1) {
                this.auditFlag = false;
                this.getList();
                this.$message({
                  message: '审核拒绝成功',
                  type: 'success'
                });
              } else {
                this.$message({
                  message: '审核拒绝失败',
                  type: 'error'
                });
              }
            })
          }
        })
      },
      // 导出所有团长
      exportAll() {
        let status = this.listStatus === 1 ? '' : this.listQuery.status;
        exportAllCommunityBuyHead(status).then(res => {
          let blob = new Blob([res], {type: "application/vnd.ms-excel"});
          let objectUrl = URL.createObjectURL(blob);
          window.location.href = objectUrl;
        });
      },
      // 导出选中的团长
      exportSelected() {
        if (this.selectedIds && this.selectedIds.length > 0) {
          let status = this.listStatus === 1 ? '' : this.listQuery.status;
          exportCheckedCommunityBuyHead(status, this.selectedIds.toString()).then(res => {
            let blob = new Blob([res], {type: "application/vnd.ms-excel"});
            let objectUrl = URL.createObjectURL(blob);
            window.location.href = objectUrl;
          });
        } else {
          this.$message({
            message: '请至少选择一个团长！',
            type: 'warning'
          })
        }
      },
    }
  }
</script>
