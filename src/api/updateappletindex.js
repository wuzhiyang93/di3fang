import request from '@/utils/request';

/**
 * 查询模版信息
 * @param id模版id
 */
export function queryAppletTemplateById(id) {
  return request({
    url: 'appletindex/' + id,
    method: 'get',
  })
}


/**
 * 查询小程序首页模版的单品信息
 */
export function queryAppletIndexSkus(query) {
  return request({
    url: 'appletindex/update/skus',
    method: 'get',
    params: query
  })
}

/**
 * 查询小程序首页模版的分类信息
 */
export function queryAppletIndexCates() {
  return request({
    url: 'appletindex/update/cates',
    method: 'get',
  })
}

/**
 * 查询小程序首页的APP专题
 */
export function queryAppletIndexThematic() {
  return request({
    url: 'appletindex/update/thematic',
    method: 'get',
  })
}

/**
 * 查询小程序首页的根据单品id查询单品信息
 * @param skuId 单品id
 */
export function queryAppletIndexSkuById(skuId) {
  return request({
    url: 'appletindex/update/sku/' + skuId,
    method: 'get',
  })
}

/**
 *查询小程序首页的根据专题id查询专题信息
 * @param id 专题id
 */
export function queryAppletIndexThematicById(id) {
  return request({
    url: 'appletindex/update/thematic/' + id,
    method: 'get',
  })
}


/**
 * 更新小程序首页模版
 * @param template 模版信息
 */
export function updateAppletIndexTemplate(template) {
  return request({
    url: 'appletindex',
    method: 'put',
    data: template
  })
}
