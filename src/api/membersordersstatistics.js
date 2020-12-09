import request from '@/utils/request';



/**
 * 分页查询用户下单量
 * @param query 查询参数
 */
export function queryCustomerOrderAmount(query) {
  return request({
    url: 'memberanalysis/orderamount',
    method: 'get',
    params: query
  })
}
