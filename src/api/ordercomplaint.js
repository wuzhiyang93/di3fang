/**
 * 订单投诉路由
 *
 * @author Caizize created on 2019/6/5
 */

import request from '@/utils/request';


/**
 * 分页查询订单投诉列表
 *
 * @param query 查询参数
 * @return 订单投诉列表
 */
export function queryOrderComplaintList(query) {
  return request({
    url: 'ordercomplaintlist',
    method: 'get',
    params: query
  })
}

/**
 * 回复订单投诉
 *
 * @param orderComplaintReply 订单投诉回复实体类
 * @return 成功1 否则失败
 */
export function replyOrderComplaint(orderComplaintReply) {
  return request({
    url: 'ordercomplaint',
    method: 'put',
    data: orderComplaintReply
  })
}
