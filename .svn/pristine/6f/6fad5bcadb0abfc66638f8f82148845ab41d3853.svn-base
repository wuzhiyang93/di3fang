import request from '@/utils/request';


/**
 * 查询系统首页统计
 */
export function queryIndexStatistics() {
  return request({
    url: 'index/statistics',
    method: 'get',
  })
}


/**
 * 首页查询订单
 */
export function queryOrdersForIndex() {
  return request({
    url: 'index/orders?status=2',
    method: 'get',
  })
}


/**
 * 核销虚拟订单
 * @param orderId 订单id
 * @param writeOffCode 核销码
 */
export function chargeOffVirtualOrderForIndex(orderId, writeOffCode) {
  return request({
    url: 'index/chargeoffvirtualorder/' + orderId + '/' + writeOffCode,
    method: 'post',
  })
}

/**
 * 查询店铺使用的物流信息
 */
export function queryLogisticsCompanys() {
  return request({
    url: 'index/logisticscompanys',
    method: 'get',
  })
}

/**
 * 发货
 * @param id 订单id
 * @param params 修改参数
 */
export function deliverOrder(params) {
  return request({
    url: 'index/deliver/' + params.id + "/" + params.waybillCode + "/" + params.companyId,
    method: 'post',
  })
}
