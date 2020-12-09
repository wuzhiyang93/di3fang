/**
 * 会员等级路由
 *
 * @author Caizize created on 2019/8/27
 */

import request from '@/utils/request';


/**
 * 根据会员id查询会员信息（包含会员等级）
 *
 * @param customerId 会员id
 */
export function queryCustomerByIdWithLevel(customerId) {
  return request({
    url: 'customer/customerlevel/' + customerId,
    method: 'get',
  })
}

/**
 * 更新会员消费金额
 *
 * @param customMoney 会员消费金额实体类
 */
export function updateCustomMoney(customMoney) {
  return request({
    url: 'customer/money',
    method: 'put',
    data: customMoney
  })
}
