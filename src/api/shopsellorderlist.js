/**
 * 门店销售订单列表路由
 *
 * @author Caizize created on 2019/8/28
 */

import request from '@/utils/request';


/**
 * 分页查询门店销售订单
 *
 * @param query 查询参数
 */
export function queryStoreSellOrderList(query) {
  return request({
    url: 'storesellorderlist',
    method: 'get',
    params: query
  })
}
