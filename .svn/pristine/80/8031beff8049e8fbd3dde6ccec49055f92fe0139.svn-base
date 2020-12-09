import request from '@/utils/request';

/**
 * 分页查询app首页
 * @param query 查询参数
 */
export function queryAppIndex(query) {
  return request({
    url: 'appindextemplate',
    method: 'get',
    params: query
  })
}

/**
 * 删除app首页模版
 * @param id app首页模版id
 */
export function deleteAppIndex(id) {
  return request({
    url: 'appindextemplate/' + id,
    method: 'delete',
  })
}

/**
 * 设置app模版使用
 * @param id 模版id
 */
export function setappuse(id) {
  return request({
    url: 'appindextemplate/setuse/' + id,
    method: 'put',
  })
}
