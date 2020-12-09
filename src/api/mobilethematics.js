import request from '@/utils/request';

/**
 *分页查询app专题
 * @param query 查询参数
 */
export function queryMobileThematic(query) {
  return request({
    url: 'mobilethematic',
    method: 'get',
    params: query
  })
}

/**
 * 删除app专题
 * @param id 专题id
 */
export function deleteMobileThematic(id) {
  return request({
    url: 'mobilethematic/' + id,
    method: 'delete',
  })
}
