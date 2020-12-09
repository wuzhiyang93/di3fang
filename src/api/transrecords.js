import request from '@/utils/request';

/**
 * 分页查询交易流水
 */
export function queryTransRecords(query) {
  return request({
    url: 'transrecords',
    method: 'get',
    params: query
  })
}


/**
 * 查询订单详情
 * @param id 订单id
 */
export function queryOrderById(id) {
  return request({
    url: 'transrecords/order/' + id,
    method: 'get',
  })
}

/**
 * 根据订单id查询门店自提订单信息
 * @param orderId 订单id
 */
export function queryStorePickedOrderById(orderId) {
  return request({
    url: 'transrecords/storepickedorder/' + orderId,
    method: 'get',
  })
}

