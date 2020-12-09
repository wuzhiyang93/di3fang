/**
 * 在线客服路由
 *
 * @author Caizize created on 2019/5/30
 */

import request from '@/utils/request';


/**
 * 查询在线客服
 */
export function queryCustomerService() {
  return request({
    url: 'customerservice',
    method: 'get',
  })
}

/**
 * 修改在线客服
 *
 * @param customerService 在线客服实体
 */
export function updateCustomerService(customerService) {
  return request({
    url: 'customerservice',
    method: 'post',
    data: customerService
  })
}
