import request from '@/utils/request';



/**
 * 查询促销统计
 * @param query 查询参数
 */
export function queryMarketingStatistics(query) {
  return request({
    url: 'promotionstatistics',
    method: 'get',
    params: query
  })
}

