/**
 * Created by dujinkai on 2019/6/5.
 */
import request from '@/utils/request';

/**
 * 查询退款详情
 */
export function queryBackOrderById(id) {
  return request({
    url: '/backorder/refund/' + id,
    method: 'get',
  })
}


/**
 * 同意退款
 * @param id id
 * @param msg 留言
 */
export function agreeToRefund(id, msg) {
  return request({
    url: '/agreetorefund/' + id,
    method: 'put',
    params: {message: msg}
  })
}


/**
 * 拒绝退款
 * @param id id
 * @param msg 留言
 */
export function refuseRefund(id, msg) {
  return request({
    url: '/refuserefund/' + id,
    method: 'put',
    params: {message: msg}
  })
}
