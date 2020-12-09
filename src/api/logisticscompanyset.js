import request from '@/utils/request';


/**
 * 查询所有物流信息
 *
 */
export function queryLogisticsCompanysWithUse() {
  return request({
    url: 'logisticscompanyuse',
    method: 'get',
  })
}

/**
 * 设置物流公司是否使用
 */
export function changyLogisticsCompanysUse(companyId, actionType) {
  return request({
    url: 'logisticscompanyuse/' + companyId + '/' + actionType,
    method: 'put',
  })
}

