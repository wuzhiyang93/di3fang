<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="yonghu" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              今日新增用户
            </div>
            <count-to :start-val="0" :end-val="newCustomerToday" :duration="2000" class="card-panel-num"/>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="jinrixiaoshoue" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              今日销售额
            </div>
            <count-to :start-val="0" :end-val="saleAmountToday" :duration="2000" :decimals="2" class="card-panel-num"/>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="dingdanshuliang" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              今日订单数
            </div>
            <count-to :start-val="0" :end-val="saleCountToday" :duration="2000" class="card-panel-num"/>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="yuexiaoshoue" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              本周销售额
            </div>
            <count-to :start-val="0" :end-val="saleAmountThisWeek" :duration="2000" :decimals="2"
                      class="card-panel-num"/>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 20px">
      <chart :options="orgOptions" theme="macarons" :auto-resize="true" style="width: 100%"/>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <div style="background: #fff; padding: 16px 16px 0; margin-bottom: 20px">
          <chart :options="orgOptions1" theme="macarons" :auto-resize="true" style="width: 100%; height: 300px"/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div style="background: #fff; padding: 16px 16px 0; margin-bottom: 20px">
          <chart :options="orgOptions2" theme="macarons" :auto-resize="true" style="width: 100%; height: 300px"/>
        </div>
      </el-col>
    </el-row>

    <div class="tableHeader" style="padding: 10px; color: #333; display: flex; justify-content: space-between">
      <div>待发货订单</div>
      <div style="font-size: 14px; color: #999">您有{{totalOrders}}条待发货订单</div>
    </div>
    <el-table
      :data="orders"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="订单号" min-width="162">
        <template slot-scope="scope">{{ scope.row.orderCode }}</template>
      </el-table-column>
      <el-table-column label="买家" min-width="110">
        <template slot-scope="scope">{{ scope.row.customerName }}</template>
      </el-table-column>
      <el-table-column label="下单时间" min-width="160">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="订单类型" width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.orderType == '0'">普通订单</span>
          <span v-if="scope.row.orderType == '1'">定金预售</span>
          <span v-if="scope.row.orderType == '2'">全款预售</span>
          <span v-if="scope.row.orderType == '3'">拼团订单</span>
          <span v-if="scope.row.orderType == '7'">虚拟商品订单</span>
        </template>
      </el-table-column>
      <el-table-column label="订单总额" min-width="80">
        <template slot-scope="scope">{{ scope.row.price.toFixed(2) }}</template>
      </el-table-column>
      <el-table-column label="订单状态" width="82">
        <el-tag type="warning">待发货</el-tag>
      </el-table-column>
      <el-table-column label="支付方式" width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.payType == '0'">在线付款</span>
          <span v-if="scope.row.payType != '0'">货到付款</span>
        </template>
      </el-table-column>
      <el-table-column label="来源" width="50">
        <template slot-scope="scope">
          <span v-if="scope.row.source == '1'">PC</span>
          <span v-if="scope.row.source == '2'">H5</span>
          <span v-if="scope.row.source == '3'">APP</span>
          <span v-if="scope.row.source == '4'">小程序</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.orderType=='7'" type="primary" style="margin: 0" size="mini"
                     @click="toShowWriteOff(scope.row.id)">核销
          </el-button>
          <el-button v-if="scope.row.orderType!='7'" type="primary" style="margin: 0" size="mini"
                     @click="toDelivery(scope.row.id)">发货
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="发货" :visible.sync="deliveryShow">
      <el-form :model="deliveryForm" :rules="deliveryRules" ref="deliveryForm" label-position="right"
               label-width="100px">
        <el-form-item prop="companyId">
          <span slot="label">物流公司</span>
          <el-select v-model="deliveryForm.companyId" filterable placeholder="请选择物流公司">
            <el-option
              v-for="item in companys"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="waybillCode">
          <span slot="label">运单号</span>
          <el-input v-model="deliveryForm.waybillCode" maxlength="20"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deliveryShow = false">取消</el-button>
        <el-button type="primary" @click="delivery()">确定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="核销" :visible.sync="writeOffFlag" width="480px">
      <el-form>
        <el-form-item style="margin-bottom: 10px">
          <el-input type="text" v-model="writeOffValue" maxlength="6"/>
        </el-form-item>
        <el-form-item class="writeOffButton">
          <el-button @click="digitalButton(1)">1</el-button>
          <el-button @click="digitalButton(2)">2</el-button>
          <el-button @click="digitalButton(3)">3</el-button>
          <el-button @click="digitalButton(4)">4</el-button>
          <el-button @click="digitalButton(5)">5</el-button>
          <el-button @click="digitalButton(6)">6</el-button>
          <el-button @click="digitalButton(7)">7</el-button>
          <el-button @click="digitalButton(8)">8</el-button>
          <el-button @click="digitalButton(9)">9</el-button>
          <el-button @click="digitalButton(0)">0</el-button>
          <el-button @click="clearButton">清除</el-button>
          <el-button @click="backspaceButton">后退</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="writeOffFlag = false">取消</el-button>
        <el-button type="primary" @click="writeOff()">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import CountTo from 'vue-count-to'

  import {
    queryIndexStatistics, // 查询系统首页统计，
    queryOrdersForIndex,
    chargeOffVirtualOrderForIndex,
    queryLogisticsCompanys,
    deliverOrder
  } from '@/api/indexpage';

  import {
    formatDate  //时间格式化
  } from '@/utils/index';

  import {
    thisWeek, // 获取本周到当前时间的起始时间数组
    intervalDate,//计算区间内时间数组
  } from '@/utils/datecalculate';

  // 发货失败错误码
  const deliverErrorMap = {
    '0': '失败',
    '-2': '订单正在申请退款',
    '-1': '订单号含有中文',
    '-3': '拼团未成功',
    '-4': '众筹还未成功',
    '-5': '订单不存在',
    '-6': '物流公司不存在'
  }

  export default {
    components: {
      CountTo
    },
    data() {
      return {
        companys: [],// 物流公司
        deliveryRules: {
          companyId: [
            {
              required: true,
              message: '请选择物流公司!',
              trigger: 'blur'
            }
          ],
          waybillCode: [
            {
              required: true,
              message: '请填写运单号!',
              trigger: 'blur'
            }
          ]
        },  // 发货验证规则
        deliveryForm: {
          id: 0,
          companyId: '',//选择的物流公司id
          waybillCode: '',
        },// 发货提交表单
        deliveryShow: false,//发货二次确认标记
        isProcess: false,// 接口是否处理中
        orderId: 0,// 订单id
        writeOffValue: '', // 核销码
        writeOffFlag: false,// 核销标记
        totalOrders: 0, // 订单总记录数
        newCustomerToday: 0,//今日新增用户
        saleAmountThisWeek: 0,//本周销售额
        saleCountToday: 0,//今日店铺销售量
        saleAmountToday: 0, //今日店铺销售额
        newCustomerCountThisWeek: [0, 0, 0, 0, 0, 0, 0],//新增用户数组
        saleCountThisWeekGroupByDay: [0, 0, 0, 0, 0, 0, 0],//本周店铺销售量数组
        saleAmountThisWeekGroupByDay: [0, 0, 0, 0, 0, 0, 0],//本周店铺销售额
        consignmentDialogVisible: false,
        listLoading: true,
        orgOptions: {},
        orgOptions1: {},
        orgOptions2: {},
        orders: []
      }
    },
    created() {
      this.getList();
      this.queryOrders();
    },
    methods: {
      // 发货
      delivery() {
        this.$refs['deliveryForm'].validate(valid => {
          if (valid && !this.isProcess) {
            this.isProcess = true;
            deliverOrder(this.deliveryForm).then(res => {
              this.isProcess = false;
              if (res > 0) {
                this.$message({
                  type: 'success',
                  message: '发货成功!'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: deliverErrorMap[res],
                });
              }
              this.deliveryShow = false;
              this.queryOrders();
            })
          }
        })
      },
      // 发货二次确认
      toDelivery(id) {
        this.deliveryForm = {
          id: id,
          waybillCode: '',
          company: '',
        }
        if (this.$refs["deliveryForm"]) {
          this.$refs["deliveryForm"].resetFields();
        }

        queryLogisticsCompanys(id).then(res => {
          this.deliveryShow = true;
          this.companys = res;
        });
      },
      // 核销
      writeOff() {
        if (!this.writeOffValue) {
          this.$message({
            type: 'error',
            message: '请输入核销码!'
          });
          return;
        }

        if (this.isProcess) {
          return;
        }
        this.isProcess = true;
        chargeOffVirtualOrderForIndex(this.orderId, this.writeOffValue).then(res => {
          this.isProcess = false;
          if (res == -1) {
            this.$message({
              type: 'error',
              message: '核销码错误!'
            });
          } else if (res > 0) {
            this.$message({
              type: 'success',
              message: '核销成功!'
            });
            this.orderId = 0;
            this.writeOffFlag = false;
            this.queryOrders();
          } else {
            this.$message({
              type: 'error',
              message: '核销失败!'
            });
          }
        });
      },
      toShowWriteOff(orderId) {
        this.writeOffValue = "";
        this.writeOffFlag = true;
        this.orderId = orderId;
      },
      digitalButton(num) {
        if (this.writeOffValue.length < 6) {
          this.writeOffValue = this.writeOffValue + num
        }
      },
      clearButton() {
        this.writeOffValue = ''
      },
      backspaceButton() {
        this.writeOffValue = this.writeOffValue.slice(0, this.writeOffValue.length - 1)
      },
      queryOrders() {
        this.listLoading = true;
        queryOrdersForIndex().then(res => {
          this.totalOrders = res.recordsTotal;
          this.orders = res.data;
          this.listLoading = false;
        })
      },
      getList() {
        queryIndexStatistics().then(response => {
          this.newCustomerToday = response.newCustomerToday;
          this.saleAmountThisWeek = response.saleAmountThisWeek;
          this.saleCountToday = response.saleCountToday;
          this.saleAmountToday = response.saleAmountToday;
          this.initGraph(response);
        });
      },
      //初始化曲线图
      initGraph(response) {
        let startEndTime = thisWeek();
        let thisWeekArray = intervalDate(startEndTime[0], startEndTime[1]);

        //初始化本周新增用户曲线图
        let thisWeekCustomer = response.newCustomerThisWeekGroupByDay;
        for (let i = 0; i < thisWeekCustomer.length; i++) {
          let index = thisWeekArray.indexOf(formatDate(new Date(thisWeekCustomer[i].newCustomerTime), 'yyyy-MM-dd'));
          if (index > -1) {
            this.newCustomerCountThisWeek.splice(index, 1, thisWeekCustomer[i].newCustomerNum)
          }
        }

        //初始化本周店铺销售量曲线图
        let sale = response.saleCountThisWeekGroupByDay;
        for (let i = 0; i < sale.length; i++) {
          let index = thisWeekArray.indexOf(formatDate(new Date(sale[i].newOrderTime), 'yyyy-MM-dd'));
          if (index > -1) {
            this.saleCountThisWeekGroupByDay.splice(index, 1, sale[i].salesVolume)
          }
        }

        //初始化本周店铺销售额曲线图
        let saleAmount = response.saleAmountThisWeekGroupByDay;
        for (let i = 0; i < saleAmount.length; i++) {
          let index = thisWeekArray.indexOf(formatDate(new Date(saleAmount[i].newOrderTime), 'yyyy-MM-dd'));
          if (index > -1) {
            this.saleAmountThisWeekGroupByDay.splice(index, 1, saleAmount[i].salesAmount)
          }
        }

      },
    },
    mounted() {
      this.orgOptions = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#5ab1ef'
            }
          },
          position: pt => {
            return [pt[0], '10%']
          }
        },
        grid: {
          left: '70',
          right: '2%'
        },
        title: {
          text: '本周销售额',
          textAlign: 'center',
          left: '50%',
          textStyle: {
            color: '#666'
          }
        },
        xAxis: {
          type: 'category',
          data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],
          axisLine: {
            lineStyle: {
              color: '#666'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#666'
            }
          }
        },
        series: [{
          data: this.saleAmountThisWeekGroupByDay,
          type: 'line',
          smooth: true,
          itemStyle: {
            normal: {
              color: '#5ab1ef', // 圈圈的颜色
              lineStyle: {
                color: '#5ab1ef' // 线的颜色
              }
            }
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgba(54,163,247,0.9)' // 0% 处的颜色
              }, {
                offset: 1, color: 'rgba(54,163,247,0.05)' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          }
        }]
      }
      this.orgOptions1 = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#2ec7c9'
            }
          },
          position: pt => {
            return [pt[0], '10%']
          }
        },
        grid: {
          left: '70',
          right: '2%'
        },
        title: {
          text: '本周订单数',
          textAlign: 'center',
          left: '50%',
          textStyle: {
            color: '#666'
          }
        },
        xAxis: {
          type: 'category',
          data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],
          axisLine: {
            lineStyle: {
              color: '#666'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#666'
            }
          }
        },
        series: [{
          data: this.saleCountThisWeekGroupByDay,
          type: 'line',
          smooth: true,
          itemStyle: {
            normal: {
              color: '#2ec7c9', // 圈圈的颜色
              lineStyle: {
                color: '#2ec7c9' // 线的颜色
              }
            }
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgba(46,199,201,0.9)' // 0% 处的颜色
              }, {
                offset: 1, color: 'rgba(46,199,201,0.05)' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          }
        }]
      }
      this.orgOptions2 = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#ffb980'
            }
          },
          position: pt => {
            return [pt[0], '10%']
          }
        },
        grid: {
          left: '70',
          right: '2%'
        },
        title: {
          text: '本周新用户数',
          textAlign: 'center',
          left: '50%',
          textStyle: {
            color: '#666'
          }
        },
        xAxis: {
          type: 'category',
          data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],
          axisLine: {
            lineStyle: {
              color: '#666'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#666'
            }
          }
        },
        series: [{
          data: this.newCustomerCountThisWeek,
          type: 'line',
          smooth: true,
          itemStyle: {
            normal: {
              color: '#ffb980', // 圈圈的颜色
              lineStyle: {
                color: '#ffb980' // 线的颜色
              }
            }
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgba(255,185,128,0.9)' // 0% 处的颜色
              }, {
                offset: 1, color: 'rgba(255,185,128,0.05)' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          }
        }]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    padding: 20px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .panel-group {
      .card-panel-col {
        margin-bottom: 20px;
      }

      .card-panel {
        height: 108px;
        cursor: pointer;
        font-size: 12px;
        position: relative;
        overflow: hidden;
        color: #666;
        background: #fff;
        box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
        border-color: rgba(0, 0, 0, .05);

        &:hover {
          .card-panel-icon-wrapper {
            color: #fff;
          }

          .icon-people {
            background: #40c9c6;
          }

          .icon-message {
            background: #36a3f7;
          }

          .icon-money {
            background: #ff6c60;
          }

          .icon-shopping {
            background: #ffb980
          }
        }

        .icon-people {
          color: #40c9c6;
        }

        .icon-message {
          color: #36a3f7;
        }

        .icon-money {
          color: #ff6c60;
        }

        .icon-shopping {
          color: #ffb980
        }

        .card-panel-icon-wrapper {
          float: left;
          margin: 14px 0 0 14px;
          padding: 16px;
          transition: all 0.38s ease-out;
          border-radius: 6px;
        }

        .card-panel-icon {
          float: left;
          font-size: 48px;
        }

        .card-panel-description {
          float: right;
          font-weight: bold;
          margin: 26px 26px 26px 0;

          .card-panel-text {
            line-height: 18px;
            color: rgba(0, 0, 0, 0.45);
            font-size: 16px;
            margin-bottom: 12px;
          }

          .card-panel-num {
            font-size: 20px;
          }
        }
      }
    }
  }
</style>
