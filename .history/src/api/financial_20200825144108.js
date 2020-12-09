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
 *分页查询店铺已结算账单
 * @param query
 */
export function getSettle(query) {
  return request({
    url: '/settle/list',
    method: 'get',
    params: query
  })
}

/**
 *分页查询店铺未结算账单
 * @param query
 */
export function getUnsettle(query) {
  return request({
    url: '/storebillings/unsettle',
    method: 'get',
    params: query
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

/**
 *批量结算  
 * @param query
 */
export function putSettle(data) {
  return request({
    url: '/storebillingrecord/settle?storeId='+data,
    method: 'put',
  })
}


