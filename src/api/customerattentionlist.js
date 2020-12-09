/**
 * 会员关注路由
 *
 * @author Caizize created on 2019/8/26
 */

import request from '@/utils/request';


/**
 * 查询会员关注列表
 *
 * @param query 查询参数
 */
export function queryAttentionList(query) {
  return request({
    url: 'customer/attentionlist',
    method: 'get',
    params: query
  })
}
