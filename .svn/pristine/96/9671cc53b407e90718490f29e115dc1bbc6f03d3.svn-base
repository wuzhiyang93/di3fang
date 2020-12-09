import request from '@/utils/request';

/**
 * 查询APP首页模版的单品信息
 */
export function queryAppIndexSkus(query) {
  return request({
    url: 'appindextemplate/skus',
    method: 'get',
    params: query
  })
}

/**
 * 查询APP首页模版的分类信息
 */
export function queryAppIndexCates() {
  return request({
    url: 'appindextemplate/cates',
    method: 'get',
  })
}

/**
 * 查询APP首页的APP专题
 */
export function queryAppIndexAppThematic() {
  return request({
    url: 'appindextemplate/appthematic',
    method: 'get',
  })
}

/**
 * 查询APP首页的根据单品id查询单品信息
 * @param skuId 单品id
 */
export function queryAppIndexSkuById(skuId) {
  return request({
    url: 'appindextemplate/sku/' + skuId,
    method: 'get',
  })
}

/**
 *查询APP首页的根据专题id查询专题信息
 * @param id 专题id
 */
export function queryAppIndexThematicById(id) {
  return request({
    url: 'appindextemplate/appthematic/' + id,
    method: 'get',
  })
}

/**
 * 查询app首页的初始化模版
 * @param id 初始化模版id
 */
export function queryInitAppIndex(id) {
  return request({
    url: 'appindextemplate/inittemplate/' + id,
    method: 'get',
  })
}

/**
 * 新增app首页
 * @param template 首页模版
 */
export function addAppIndex(template) {
  return request({
    url: 'appindextemplate',
    data: template,
    method: 'post',
  })
}
