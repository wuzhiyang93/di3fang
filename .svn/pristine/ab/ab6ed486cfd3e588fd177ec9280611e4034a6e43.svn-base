import request from '@/utils/request';

/**
 * 查询APP首页模版的单品信息
 */
export function queryAppIndexSkus(query) {
  return request({
    url: 'appindextemplate/update/skus',
    method: 'get',
    params: query
  })
}

/**
 * 查询APP首页模版的分类信息
 */
export function queryAppIndexCates() {
  return request({
    url: 'appindextemplate/update/cates',
    method: 'get',
  })
}

/**
 * 查询APP首页的APP专题
 */
export function queryAppIndexAppThematic() {
  return request({
    url: 'appindextemplate/update/appthematic',
    method: 'get',
  })
}

/**
 * 查询APP首页的根据单品id查询单品信息
 * @param skuId 单品id
 */
export function queryAppIndexSkuById(skuId) {
  return request({
    url: 'appindextemplate/update/sku/' + skuId,
    method: 'get',
  })
}

/**
 *查询APP首页的根据专题id查询专题信息
 * @param id 专题id
 */
export function queryAppIndexThematicById(id) {
  return request({
    url: 'appindextemplate/update/appthematic/' + id,
    method: 'get',
  })
}

/**
 * 查询模版信息
 * @param id模版id
 */
export function queryAppTemplateById(id) {
  return request({
    url: 'appindextemplate/' + id,
    method: 'get',
  })
}

/**
 * 更新app首页模版
 * @param template 模版信息
 */
export function updateAppIndexTemplate(template) {
  return request({
    url: 'appindextemplate',
    method: 'put',
    data: template
  })
}
