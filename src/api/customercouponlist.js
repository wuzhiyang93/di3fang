/**
 * 会员优惠券路由
 *
 * @author Caizize created on 2019/8/26
 */

import request from '@/utils/request';


/**
 * 查询会员优惠券列表
 *
 * @param query 查询参数
 */
export function queryCustomerCouponList(query) {
  return request({
    url: 'customer/couponlist',
    method: 'get',
    params: query
  })
}
