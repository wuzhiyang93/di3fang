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
    url: '/auditseller/settleinfo?id='+data.id+"&settleAuditStatus="+data.settleAuditStatu, 
    method: 'put', 
  })
}

/**
 *分页查询店铺结算单
 * @param query
 */
export function getSettledetail(data) {
  return request({
    url: '/settle/detail?settleCode='+data,
    method: 'get',
  })
}


/**
 * 上传打款凭证
 * @param query 参数
 */
export function postRemit(query) {
  return request({
    url: '/settle/remit',
    method: 'post',
    params: query
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
    method: 'post',
  })
}


