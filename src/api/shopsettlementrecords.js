import request from '@/utils/request';


/**
 * 查询门店账单对账记录
 *
 * @param query 查询参数
 */
export function queryOutletBillingRecords(query) {
  return request({
    url: 'shopsettlementdetail',
    method: 'get',
    params: query
  })
}


/**
 * 设置门店账单状态为已结算
 *
 * @param query 查询参数
 */
export function updateStoreBillingRecordStatus(ids) {
  return request({
    url: 'shopsettlementdetail',
    method: 'put',
    params: {ids: ids.toString()}
  })
}

