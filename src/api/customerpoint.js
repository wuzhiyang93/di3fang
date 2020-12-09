/**
 * 会员积分路由
 *
 * @author Caizize created on 2019/8/26
 */

import request from '@/utils/request';


/**
 * 分页查询会员积分列表
 *
 * @param query 查询参数
 */
export function queryCustomerPointList(query) {
  return request({
    url: 'customer/pointlist',
    method: 'get',
    params: query
  })
}

/**
 * 查询用户积分总额
 *
 * @param customerId 会员id
 */
export function queryCustomerTotalPoint(customerId) {
  return request({
    url: 'customer/totalpoint/' + customerId,
    method: 'get',
  })
}

/**
 * 新增会员积分
 *
 * @param customerPoint 会员积分实体
 */
export function addCustomerPoint(customerPoint) {
  return request({
    url: 'customer/addpoint',
    method: 'post',
    data: customerPoint
  })
}
