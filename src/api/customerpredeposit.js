/**
 * 会员预存款路由
 *
 * @author Caizize created on 2019/8/27
 */

import request from '@/utils/request';


/**
 * 分页查询会员预存款列表
 *
 * @param query 查询参数
 */
export function queryPredepositList(query) {
  return request({
    url: 'customer/predepositlist',
    method: 'get',
    params: query
  })
}

/**
 * 查询用户预存款总额
 *
 * @param customerId 会员id
 */
export function queryCurrentPredeposit(customerId) {
  return request({
    url: 'customer/currentpredeposit/' + customerId,
    method: 'get',
  })
}

/**
 * 新增会员预存款
 *
 * @param predepositRecord 会员预存款记录
 */
export function addCustomerPredeposit(predepositRecord) {
  return request({
    url: 'customer/addpredeposit',
    method: 'post',
    data: predepositRecord
  })
}
