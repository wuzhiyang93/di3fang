/**
 * 平台投诉路由
 *
 * @author Caizize created on 2019/6/6
 */

import request from '@/utils/request';


/**
 * 分页查询平台投诉列表
 *
 * @param query 查询参数
 * @return 平台投诉列表
 */
export function queryComplaintList(query) {
  return request({
    url: 'complaintlist',
    method: 'get',
    params: query
  })
}

/**
 * 回复平台投诉
 *
 * @param complaints 平台投诉实体类
 * @return 成功1 否则失败
 */
export function replyComplaint(complaints) {
  return request({
    url: 'complaint',
    method: 'put',
    data: complaints
  })
}
