/**
 * Created by dujinkai on 2019/6/4.
 */

import request from '@/utils/request';


/**
 * 查询订单设置
 */
export function queryOrderSetting() {
  return request({
    url: 'ordersetting',
    method: 'get',
  })
}

/**
 * 查询订单设置
 */
export function updateOrderSetting(orderSetting) {
  return request({
    url: 'ordersetting',
    method: 'put',
    data: orderSetting
  })
}
