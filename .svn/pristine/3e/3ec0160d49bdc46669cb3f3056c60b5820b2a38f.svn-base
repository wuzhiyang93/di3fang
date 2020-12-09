/**
 * Created by dujinkai on 2019/5/17.
 */
import request from '@/utils/request';

/**
 * 分页查询订单列表
 * @param 查询参数
 */
export function orderList(query) {
  return request({
    url: 'orders',
    method: 'get',
    params: query
  })
}

/**
 * 取消订单
 * @param id 订单id
 */
export function cancelOrder(id) {
  return request({
    url: 'order/' + id,
    method: 'delete',
  })
}


/**
 * 确认订单
 * @param id 订单id
 * @param reason 原因
 */
export function confirmOrder(id, reason) {
  return request({
    url: 'confirmorder/' + id,
    method: 'put',
    params: reason
  })
}


/**
 * 修改价格
 * @param id 订单id
 * @param params 修改参数
 */
export function changePrice(id, params) {
  return request({
    url: 'modifyprice/' + id,
    method: 'put',
    params: params
  })
}


/**
 * 发货
 * @param id 订单id
 * @param params 修改参数
 */
export function deliverOrder(params) {
  return request({
    url: 'deliverorder/' + params.id + "/" + params.waybillCode + "/" + params.companyId,
    method: 'put',
  })
}


/**
 *查询订单的物流模版信息
 * @param id 订单id
 */
export function queryLogisticsCompanys(id) {
  return request({
    url: 'order/logisticscompanys',
    method: 'get',
  })
}

/**
 * 核销虚拟订单
 * @param id 订单id
 * @param writeOffCode 核销码
 */
export function chargeOffVirtualOrder(id, writeOffCode) {
  return request({
    url: 'chargeoffvirtualorder/' + id + "/" + writeOffCode,
    method: 'put',
  })
}

/**
 * 修改物流单号
 */
export function changeExpressNo(params) {
  return request({
    url: 'changeexpressno/' + params.id + "/" + params.waybillCode + "/" + params.companyId,
    method: 'put',
  })
}

/**
 * 导出所有订单
 * @param status 订单状态
 */
export function exportAllOrder(status) {
  return request({
    url: 'exportallorder',
    method: 'post',
    params: {status: status},
    responseType: 'arraybuffer'
  })
}

/**
 * 导出选择订单
 */
export function exportCheckedOrder(status, ids) {
  return request({
    url: 'exportcheckedorder',
    method: 'post',
    params: {ids: ids, status: status},
    responseType: 'arraybuffer'
  })
}
