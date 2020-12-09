import request from '@/utils/request';


/**
 * 分页查询用户消费额
 * @param query 查询参数
 */
export function queryCustomerConsumption(query) {
  return request({
    url: 'memberanalysis/consumption',
    method: 'get',
    params: query
  })
}
