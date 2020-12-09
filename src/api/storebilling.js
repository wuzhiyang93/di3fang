/**
 * 店铺账单路由
 *
 * @author Caizize created on 2019/5/29
 */

import request from '@/utils/request';


/**
 * 分页查询店铺账单列表
 *
 * @param query 查询参数
 * @return 店铺账单列表
 */
export function queryStoreBillingList(query) {
  return request({
    url: 'storebillings',
    method: 'get',
    params: query,
  })
}

/**
 * 分页查询店铺对账记录
 *
 * @param query 查询参数
 * @return 店铺对账记录列表
 */
export function queryStoreBillingRecords(query) {
  return request({
    url: 'storebillingrecords',
    method: 'get',
    params: query,
  })
}

/**
 * 设置店铺对账记录状态为已结算
 *
 * @param ids 对账记录id数组
 * @return 成功>=1 否则失败
 */
export function updateStoreBillingRecordStatus(ids) {
  return request({
    url: 'storebillingrecord',
    method: 'put',
    params: ids,
  })
}
