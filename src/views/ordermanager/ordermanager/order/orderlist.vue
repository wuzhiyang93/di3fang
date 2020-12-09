<template>
  <div class="app-container">
    <el-radio-group @change="changeStatus()" v-model="orderStatus" style="margin-bottom: 20px">
      <el-radio-button :label="0">全部</el-radio-button>
      <el-radio-button :label="1">待付款</el-radio-button>
      <el-radio-button :label="2">待发货</el-radio-button>
      <el-radio-button :label="3">待收货</el-radio-button>
      <el-radio-button :label="4">已完成</el-radio-button>
      <el-radio-button :label="5">已关闭</el-radio-button>
    </el-radio-group>
    <div class="filter-container">
      <div class="filterBox">
        <p>订单号</p>
        <el-input placeholder="订单号" v-model="listQuery.orderCode" size="medium" style="width: 150px;"
                  class="filter-item"/>
      </div>
      <div class="filterBox">
        <p>用户名</p>
        <el-input placeholder="用户名" v-model="listQuery.customerName" size="medium" style="width: 150px;"
                  class="filter-item"/>
      </div>
      <div class="filterBox">
        <p>支付方式</p>
        <el-select class="filter-item" v-model="listQuery.payType" size="medium" style="width: 150px"
                   placeholder="请选择支付方式">
          <el-option label="全部" value=""></el-option>
          <el-option label="在线付款" value="0"></el-option>
          <el-option label="货到付款" value="1"></el-option>
        </el-select>
      </div>
      <div class="filterBox">
        <p>订单类型</p>
        <el-select class="filter-item" v-model="listQuery.orderType" size="medium" style="width: 150px"
                   placeholder="请选择订单类型">
          <el-option label="全部" value=""></el-option>
          <el-option label="普通订单" value="0"></el-option>
          <el-option label="定金预售" value="1"></el-option>
          <el-option label="全款预售" value="2"></el-option>
          <el-option label="虚拟商品订单" value="7"></el-option>
        </el-select>
      </div>
      <el-date-picker
        style="width: 355px"
        class="search-datepicker"
        size="medium"
        :clearable="false"
        v-model="searchTimeValue"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="yyyy-MM-dd HH:mm:ss"
        value-format="yyyy-MM-dd HH:mm:ss"
        align="right">
      </el-date-picker>
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
      <br/>
      <el-dropdown class="filter-item" style="margin-left: 5px;">
        <el-button size="medium" type="primary">导出订单<i class="el-icon-arrow-down el-icon--right"></i></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="exportAll()">导出所有</el-dropdown-item>
          <el-dropdown-item @click.native="exportSelected()">导出选中</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button @click="toPrint()" class="filter-item" size="medium" style="margin-left: 5px;" type="primary"
                 icon="el-icon-printer">
        批量打印
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
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == '1'" type="warning">待付款</el-tag>
          <el-tag v-if="scope.row.status == '2'" type="warning">待发货</el-tag>
          <el-tag v-if="scope.row.status == '3'" type="warning">待收货</el-tag>
          <el-tag v-if="scope.row.status == '4'" type="success">已完成</el-tag>
          <el-tag v-if="scope.row.status == '5'" type="info">已关闭</el-tag>
          <el-tag v-if="scope.row.status == '6'" type="info">已关闭</el-tag>
          <el-tag v-if="scope.row.status == '7'" type="info">已关闭</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="支付方式" width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.payType == '0'">在线付款</span>
          <span v-if="scope.row.payType == '1'">货到付款</span>
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
      <el-table-column label="操作" align="left" min-width="185">
        <template slot-scope="scope">
          <router-link :to="{path:'/ordermanager/ordermanager/orderdetail',query:{id:scope.row.id}}">
            <el-button type="success" style="margin: 0 10px 5px 0" size="mini">详情</el-button>
          </router-link>
          <el-button @click="toConfirmOrder(scope.row.id)" v-if="confirmBtnShow(scope.row)" type="primary"
                     style="margin: 0 10px 5px 0"
                     size="mini">确认付款
          </el-button>
          <el-button @click="toChangePrice(scope.row.id,scope.row.price,scope.row.freightPrice)"
                     v-if="changePriceBtnShow(scope.row)" type="primary"
                     style="margin: 0 10px 0 0" size="mini">改价
          </el-button>
          <el-button @click="toCancelOrder(scope.row.id)" v-if="cancelBtnShow(scope.row)" size="mini"
                     style="margin: 0 10px 0 0" type="danger">取消
          </el-button>
          <el-button @click="toDelivery(scope.row.id)" v-if="scope.row.status == '2' && scope.row.orderType !='7'"
                     type="primary" style="margin: 0 10px 0 0" size="mini">发货
          </el-button>
          <el-button @click="toWriteOff(scope.row.id)" v-if="scope.row.status == '2' && scope.row.orderType =='7'"
                     type="primary"
                     style="margin: 0 10px 0 0" size="mini">核销
          </el-button>
          <el-button v-if="scope.row.status == '3'" type="primary" style="margin: 0 10px 0 0" size="mini"
                     @click="toChangeDelivery(scope.row.id)">修改物流单号
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

    <el-dialog title="确认付款" :visible.sync="confirmShow">
      <el-alert title="注意！ 确认付款后订单状态将修改为待发货，你确定要修改吗？" style="margin-bottom: 20px" type="warning" :closable="false"
                show-icon></el-alert>
      <el-form :model="confirmReason" :rules="confirmRules" ref="confirmForm" label-position="right"
               label-width="100px">
        <el-form-item prop="reason">
          <span slot="label">请填写原因</span>
          <el-input maxlength="200" v-model="confirmReason.reason"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="confirmShow = false">取消</el-button>
        <el-button type="primary" @click="confrimOrder()">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="改价" :visible.sync="changePriceShow">
      <el-form :model="changePriceForm" :rules="changePriceRules" ref="changePriceForm" label-position="right"
               label-width="100px">
        <el-form-item prop="price">
          <span slot="label">优惠金额</span>
          <el-input v-model="changePriceForm.price" type="number" maxlength="20" style="width: 200px">
            <template slot="prepend">¥</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="reason">
          <span slot="label">原因</span>
          <el-input v-model="changePriceForm.reason" maxlength="200"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changePriceShow = false">取消</el-button>
        <el-button type="primary" @click="changePrice">确定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="发货" :visible.sync="deliveryShow">
      <el-form :model="deliveryForm" :rules="deliveryRules" ref="deliveryForm" label-position="right"
               label-width="100px">
        <el-form-item prop="companyId">
          <span slot="label">物流公司</span>
          <el-select v-model="deliveryForm.companyId" filterable placeholder="请选择物流公司" style="width: 100%;">
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

    <el-dialog title="修改物流单号" :visible.sync="changeDeliveryShow">
      <el-form :model="deliveryForm" :rules="deliveryRules" ref="deliveryForm" label-position="right"
               label-width="100px">
        <el-form-item prop="companyId">
          <span slot="label">物流公司</span>
          <el-select v-model="deliveryForm.companyId" filterable placeholder="请选择物流公司" style="width: 100%;">
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
        <el-button @click="changeDeliveryShow = false">取消</el-button>
        <el-button type="primary" @click="changeDelivery()">确定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="核销" :visible.sync="writeOffShow" width="480px">
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
        <el-button @click="writeOffShow = false">取消</el-button>
        <el-button type="primary" @click="writeOff()">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    orderList,
    cancelOrder,
    confirmOrder,
    changePrice,
    queryLogisticsCompanys,
    deliverOrder,
    chargeOffVirtualOrder,
    changeExpressNo,
    exportAllOrder,
    exportCheckedOrder
  } from '@/api/orderlist';

  import {priceValidator} from '@/utils/validate';

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
    data() {
      return {
        isProcess: false,// 接口是否处理中
        changeDeliveryShow: false,// 修改物流单号二次确认标记
        writeOffValue: '',// 核销码
        writeOffOrderId: '0',//核销虚拟订单的订单id
        writeOffShow: false,//虚拟订单核销二次确认
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
        changePriceRules: {
          reason: [
            {
              required: true,
              message: '请填写原因!',
              trigger: 'blur'
            }
          ],
          price: [
            {
              required: true,
              trigger: 'blur',
              validator: priceValidator
            }
          ]
        },  // 修改价格验证规则
        changePriceForm: {
          price: '',
          reason: ''
        },// 修改价格的表单
        changePriceOrderId: 0,// 修改价格订单id
        changePriceShow: false,// 修改价格二次确认标记
        confirmRules: {
          reason: [
            {
              required: true,
              message: '请填写原因!',
              trigger: 'blur'
            }
          ]
        },  // 验证规则
        confirmReason: {reason: ''},// 确认付款的原因
        confirmOrderId: 0,// 确认付款时候的订单id
        confirmShow: false, // 确认付款二次确认标记
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          status: '',
          orderCode: '',
          customerName: '',
          payType: '',
          orderType: '',
          startTime: '',
          endTime: ''
        }, // 查询参数
        listLoading: true, // 加载中
        list: null, // 订单数据
        total: null, // 数据总数,
        searchTimeValue: null,// 搜索时间
        orderStatus: '0',// 搜索条件订单状态
        oldPrice: 0, // 原始价格 修改订单金额的时候使用
        freightPrice: 0, //运费 修改订单金额的时候使用
        selectedIds: [],// 选中的订单id
        companys: [],// 物流公司
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        orderList(this.listQuery).then(response => {
          this.list = response.data;
          this.total = response.recordsTotal;
          this.listLoading = false
        });
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val - 1;
        this.getList();
      },
      handleSelectionChange(val) {
        if (val && val.length > 0) {
          this.selectedIds = val.map(row => row.id);
        } else {
          this.selectedIds = [];
        }
      },
      // 过滤查询
      handleFilter() {
        this.listQuery.pageNum = 0;
        if (this.searchTimeValue) {
          this.listQuery.startTime = this.searchTimeValue[0];
          this.listQuery.endTime = this.searchTimeValue[1];
        } else {
          this.listQuery.startTime = '';
          this.listQuery.endTime = '';
        }

        this.listQuery.status = this.orderStatus;

        if (this.listQuery.status == 0) {
          this.listQuery.status = '';
        }

        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 0;
        this.listQuery.pageSize = val;
        this.getList();
      },
      // 改变订单状态
      changeStatus() {
        this.handleFilter();
      },
      // 是否显示取消按钮
      cancelBtnShow(order) {
        // 订单状态是待付款 并且 订单类型不是定金预售 定金预售订单不能取消
        return order.status == '1' && order.orderType != '1';
      },
      // 是否显示修改价格按钮
      changePriceBtnShow(order) {
        // 订单状态是待发货 并且 订单类型不是预售订单 预售订单不能改价
        return order.status == '1' && order.orderType != '1' && order.orderType != '2';
      },
      // 是否显示确认付款按钮
      confirmBtnShow(order) {
        // 待付款状态 并且可以确认付款的时候（定金预算第二次如果过了付款时间则不能确认付款）
        return order.status == '1' && order.presaleOrderCanPay;
      },
      //  取消订单二次确认
      toCancelOrder(id) {
        this.$confirm('订单不能随意中断，你确定要修改吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 处理中则直接返回
          if (this.isProcess) {
            return;
          }
          this.isProcess = true;
          cancelOrder(id).then(res => {
            this.isProcess = false;
            if (res > 0) {
              this.$message({
                type: 'success',
                message: '取消订单成功!'
              })
            } else {
              this.$message({
                type: 'error',
                message: '取消订单失败!'
              })
            }
            this.handleFilter();
          })
        })
      },
      // 确认付款二次确认
      toConfirmOrder(id) {
        this.confirmShow = true;
        this.confirmOrderId = id;
        if (this.$refs["confirmForm"]) {
          this.$refs["confirmForm"].resetFields();
        }
        this.confirmReason = {reason: ''};
      },
      // 确认付款
      confrimOrder() {
        this.$refs['confirmForm'].validate(valid => {
          if (valid && !this.isProcess) {
            this.isProcess = true;
            confirmOrder(this.confirmOrderId, this.confirmReason).then(res => {
              this.isProcess = false;
              if (res > 0) {
                this.$message({
                  type: 'success',
                  message: '确认付款成功!'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: '确认付款失败!'
                });
              }
              this.confirmShow = false;
              this.confirmOrderId = 0;
              this.handleFilter();
            })
          }
        })
      },
      // 改价二次确认
      toChangePrice(id, price, freightPrice) {
        this.oldPrice = price;
        this.freightPrice = freightPrice;
        this.changePriceOrderId = id;
        this.changePriceShow = true;
        if (this.$refs["changePriceForm"]) {
          this.$refs["changePriceForm"].resetFields();
        }
        this.changePriceForm = {
          price: '',
          reason: ''
        }
      },
      // 修改价格
      changePrice() {
        this.$refs['changePriceForm'].validate(valid => {
          if (!this.isProcess && valid && !this.checkModifyPriceError(this.changePriceForm.price, this.oldPrice, this.freightPrice)) {
            this.isProcess = true;
            changePrice(this.changePriceOrderId, this.changePriceForm).then(res => {
              this.isProcess = false;
              if (res > 0) {
                this.$message({
                  type: 'success',
                  message: '修改价格成功!'
                });
              } else if (res == -1) {
                this.$message({
                  type: 'error',
                  message: '修改后订单金额必须大0.1!!'
                });
              } else if (res == -2) {
                this.$message({
                  type: 'error',
                  message: '此订单不能修改价格!'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: '修改价格失败!'
                });
              }
              this.changePriceShow = false;
              this.changePriceOrderId = 0;
              this.oldPrice = 0;
              this.freightPrice = 0;
              this.handleFilter();
            })
          }
        })
      },
      //校验修改后的价格
      checkModifyPriceError(price, oldPrice, freightPrice) {
        var errorFlag = false;
        if ((oldPrice * 100 - price * 100) / 100 < 0.1) {
          errorFlag = true;
          this.$message({
            type: 'error',
            message: '修改后金额必须大于0.1!!'
          });
        } else if ((oldPrice * 100 - price * 100 - freightPrice * 100) / 100 < 0.1) {
          errorFlag = true;
          this.$message({
            type: 'error',
            message: '修改后金额必须大于运费'
          });
        }
        return errorFlag;
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

        queryLogisticsCompanys().then(res => {
          this.deliveryShow = true;
          this.companys = res;
        });
      },
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
                  message: '发货成功'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: deliverErrorMap[res]
                });
              }
              this.deliveryShow = false;
              this.handleFilter();
            })
          }
        })
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
      // 核销二次确认
      toWriteOff(id) {
        this.writeOffOrderId = id;
        this.writeOffShow = true;
        this.writeOffValue = '';
      },
      // 核销虚拟订单
      writeOff() {
        if (!this.writeOffValue) {
          this.$message({
            type: 'error',
            message: '请输入核销码'
          });
          return;
        }

        if (this.isProcess) {
          return;
        }
        this.isProcess = true;
        chargeOffVirtualOrder(this.writeOffOrderId, this.writeOffValue).then(res => {
          this.isProcess = false;
          if (res == -1) {
            this.$message({
              type: 'error',
              message: '核销码错误'
            });
          } else if (res > 0) {
            this.$message({
              type: 'success',
              message: '核销成功'
            });
            this.writeOffOrderId = 0;
            this.writeOffShow = false;
            this.handleFilter();
          } else {
            this.$message({
              type: 'error',
              message: '核销失败'
            });
          }
        });
      },
      // 修改物流单号二次确认
      toChangeDelivery(id) {
        this.deliveryForm = {
          id: id,
          waybillCode: '',
          company: '',
        }
        if (this.$refs["deliveryForm"]) {
          this.$refs["deliveryForm"].resetFields();
        }
        queryLogisticsCompanys().then(res => {
          this.changeDeliveryShow = true;
          this.companys = res;
        });
      },
      // 修改物流单号
      changeDelivery() {
        this.$refs['deliveryForm'].validate(valid => {
          if (valid && !this.isProcess) {
            this.isProcess = true;
            changeExpressNo(this.deliveryForm).then(res => {
              this.isProcess = false;
              if (res > 0) {
                this.$message({
                  type: 'success',
                  message: '修改物流单号成功'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: deliverErrorMap[res],
                });
              }
              this.changeDeliveryShow = false;
              this.handleFilter();
            })
          }
        })
      },
      // 导出所有订单
      exportAll() {
        let status = this.orderStatus == 0 ? '' : this.orderStatus;
        exportAllOrder(status).then(res => {
          let blob = new Blob([res], {type: "application/vnd.ms-excel"});
          let objectUrl = URL.createObjectURL(blob);
          window.location.href = objectUrl;
        });
      },
      // 导出选中的订单
      exportSelected() {
        if (this.selectedIds && this.selectedIds.length > 0) {
          let status = this.orderStatus == 0 ? '' : this.orderStatus;
          exportCheckedOrder(status, this.selectedIds.toString()).then(res => {
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
      // 批量打印订单
      toPrint() {
        if (this.selectedIds && this.selectedIds.length > 0) {
          this.$router.push({
            path: '/ordermanager/ordermanager/printorders',
            query: {ids: this.selectedIds.toString()}
          });
        } else {
          this.$message({
            message: '请至少选择一条订单！',
            type: 'warning'
          })
        }
      }

    }
  }
</script>
