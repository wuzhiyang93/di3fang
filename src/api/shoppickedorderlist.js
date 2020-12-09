/**
 * 门店自提订单列表路由
 *
 * @author Caizize created on 2019/8/28
 */

import request from '@/utils/request';


/**
 * 分页查询门店自提订单
 *
 * @param query 查询参数
 */
export function queryStorePickedOrderList(query) {
  return request({
    url: 'storepickedorderlist',
    method: 'get',
    params: query
  })
}

/**
 * 确认付款
 * @param orderId 订单id
 * @param remark 备注
 */
export function confirmStorePickedOrder(orderId, remark) {
  return request({
    url: 'confirmstorepickedorder/' + orderId,
    method: 'put',
    params: remark
  })
}
