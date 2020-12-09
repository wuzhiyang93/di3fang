/**
 * 服务支持路由
 *
 * @author Caizize created on 2019/5/21
 */

import request from '@/utils/request';


/**
 * 分页查询服务支持列表
 *
 * @param query 查询参数
 */
export function queryServiceSupportList(query) {
  return request({
    url: 'servicesupports',
    method: 'get',
    params: query
  })
}

/**
 * 新增服务支持
 *
 * @param serviceSupport 服务支持信息
 */
export function addServiceSupport(serviceSupport) {
  return request({
    url: 'servicesupport',
    method: 'post',
    data: serviceSupport
  })
}

/**
 * 根据id查询服务支持
 *
 * @param id 服务支持id
 */
export function queryServiceSupportById(id) {
  return request({
    url: 'servicesupport/' + id,
    method: 'get',
  })
}

/**
 * 修改服务支持
 *
 * @param serviceSupport 服务支持信息
 */
export function updateServiceSupport(serviceSupport) {
  return request({
    url: 'servicesupport',
    method: 'put',
    data: serviceSupport
  })
}

/**
 * 删除服务支持
 *
 * @param ids 服务支持id数组
 */
export function deleteServiceSupport(ids) {
  return request({
    url: 'servicesupport',
    method: 'delete',
    params: ids
  })
}
