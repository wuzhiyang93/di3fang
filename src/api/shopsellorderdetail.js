/**
 * 门店销售订单详情路由
 *
 * @author Caizize created on 2019/8/28
 */

import request from '@/utils/request';


/**
 * 根据订单id查询门店销售订单信息
 * @param orderId 订单id
 */
export function queryStoreSellOrderByOrderId(orderId) {
  return request({
    url: 'storesellorder/' + orderId,
    method: 'get',
  })
}
