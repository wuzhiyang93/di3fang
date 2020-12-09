/**
 * Created by dujinkai on 2019/6/5.
 */
import request from '@/utils/request';

/**
 * 查询退单列表
 * @param page 分页参数
 * @param params 条件参数
 */
export function queryBackOrders(params) {
  return request({
    url: 'backorders',
    method: 'get',
    params: params
  })
}

/**
 * 查询订单详情
 * @param id 订单id
 */
export function queryOrderById(id) {
  return request({
    url: 'backorder/order/' + id,
    method: 'get',
  })
}
