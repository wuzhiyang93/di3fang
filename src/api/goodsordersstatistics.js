import request from '@/utils/request';


/**
 * 分页查询单品销量
 * @param query 查询参数
 */
export function querySkuSaleVolume(query) {
  return request({
    url: 'goodssold/salevolume',
    method: 'get',
    params: query
  })
}
