import request from '@/utils/request';


/**
 * 查询门店账单
 *
 * @param query 查询参数
 */
export function queryOutletBillings(query) {
  return request({
    url: 'shopsettlement',
    method: 'get',
    params: query
  })
}



