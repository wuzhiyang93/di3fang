/**
 * 拼团促销列表路由
 *
 * @author Caizize created on 2019/8/7
 */

import request from '@/utils/request';


/**
 * 分页查询拼团促销列表
 *
 * @param query 查询参数
 */
export function queryGroupMarketingList(query) {
  return request({
    url: 'groupmarketinglist',
    method: 'get',
    params: query
  })
}

/**
 * 删除拼团促销
 *
 * @param marketingId 促销id
 */
export function deleteGroupMarketing(marketingId) {
  return request({
    url: 'groupmarketing/' + marketingId,
    method: 'delete',
  })
}
