/**
 * Created by dujinkai on 2019/6/5.
 */
import request from '@/utils/request';

/**
 * 查询退货详情
 */
export function queryBackOrderById(id) {
  return request({
    url: '/backorder/return/' + id,
    method: 'get',
  })
}

/**
 * 同意退货
 * @param id 退单id
 * @param msg 留言
 */
export function agreeToReturn(id, msg) {
  return request({
    url: '/agreetoreturn/' + id,
    method: 'put',
    params: {message: msg}
  })
}

/**
 * 拒绝退货
 * @param id 退单id
 * @param msg 留言
 */
export function refuseReturn(id, msg) {
  return request({
    url: '/refusereturn/' + id,
    method: 'put',
    params: {message: msg}
  })
}

/**
 *同意确认退货
 * @param id 订单ID
 * @param msg 留言
 * @param money 金额
 */
export function confirmReturn(id, msg, money) {
  return request({
    url: '/confirmreturn/' + id,
    method: 'put',
    params: {message: msg, money: money}
  })
}

/**
 * 拒绝收货
 * @param id 订单id
 * @param msg 留言
 */
export function refuseToReceive(id, msg) {
  return request({
    url: '/refusetoreceive/' + id,
    method: 'put',
    params: {message: msg}
  })
}
