import request from '@/utils/request';

/**
 *分页查询审核商家结算信息列表
 * @param query
 */
export function getsettleinfo(query) {
  return request({
    url: '/auditseller/settleinfo',
    method: 'get',
    params: query
  })
}

/**
 *商家审核操作
 * @param query
 */
export function postSettleinfo(param) {
  return request({
    url: '/auditseller/settleinfo', 
    method: 'post', 
    data: param
  })
}

