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
 * data
 */
export function postSettleinfo(data) {
  return request({
    url: '/auditseller/settleinfo', 
    method: 'post', 
    data:data
  })
}

/**
 *分页查询店铺对账记录
 * @param query
 */
export function getStorebillingrecords(query) {
  return request({
    url: '/storebillingrecords/V1',
    method: 'get',
    params: query
  })
}


