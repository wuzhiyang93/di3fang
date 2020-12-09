import request from '@/utils/request';

/**
 * 分页查询小程序首页
 * @param query 查询参数
 */
export function queryAppletIndex(query) {
  return request({
    url: 'appletindex',
    method: 'get',
    params: query
  })
}


/**
 * 删除小程序首页模版
 * @param id app首页模版id
 */
export function deleteAppletIndex(id) {
  return request({
    url: 'appletindex/' + id,
    method: 'delete',
  })
}


/**
 * 设置小程序模版使用
 * @param id 模版id
 */
export function setappletuse(id) {
  return request({
    url: 'appletindex/setuse/' + id,
    method: 'put',
  })
}
