import request from '@/utils/request';


/**
 * 查询小程序首页模版的单品信息
 */
export function queryAppletIndexSkus(query) {
  return request({
    url: 'appletindex/skus',
    method: 'get',
    params: query
  })
}

/**
 * 查询小程序首页模版的分类信息
 */
export function queryAppletIndexCates() {
  return request({
    url: 'appletindex/cates',
    method: 'get',
  })
}

/**
 * 查询小程序首页的APP专题
 */
export function queryAppletIndexThematic() {
  return request({
    url: 'appletindex/thematic',
    method: 'get',
  })
}

/**
 * 查询小程序首页的根据单品id查询单品信息
 * @param skuId 单品id
 */
export function queryAppletIndexSkuById(skuId) {
  return request({
    url: 'appletindex/sku/' + skuId,
    method: 'get',
  })
}

/**
 *查询小程序首页的根据专题id查询专题信息
 * @param id 专题id
 */
export function queryAppletIndexThematicById(id) {
  return request({
    url: 'appletindex/thematic/' + id,
    method: 'get',
  })
}

/**
 * 查询小程序首页的初始化模版
 * @param id 初始化模版id
 */
export function queryInitAppletIndex(id) {
  return request({
    url: 'appletindex/inittemplate/' + id,
    method: 'get',
  })
}

/**
 * 新增小程序首页
 * @param template 首页模版
 */
export function addAppletIndex(template) {
  return request({
    url: 'appletindex',
    data: template,
    method: 'post',
  })
}
