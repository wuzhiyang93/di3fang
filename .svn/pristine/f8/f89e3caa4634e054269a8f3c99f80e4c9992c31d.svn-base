import request from '@/utils/request';

/**
 * 分页查询app首页
 * @param query 查询参数
 */
export function queryMobileIndex(query) {
  return request({
    url: 'mobileindextemplate',
    method: 'get',
    params: query
  })
}

/**
 * 删除app首页模版
 * @param id app首页模版id
 */
export function deleteMobileIndex(id) {
  return request({
    url: 'mobileindextemplate/' + id,
    method: 'delete',
  })
}

/**
 * 设置app模版使用
 * @param id 模版id
 */
export function setMobileuse(id) {
  return request({
    url: 'mobileindextemplate/setuse/' + id,
    method: 'put',
  })
}
