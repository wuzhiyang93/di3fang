import request from '@/utils/request';

/**
 * 查询h5首页模版的单品信息
 */
export function queryMobileIndexSkus(query) {
  return request({
    url: 'mobileindextemplate/skus',
    method: 'get',
    params: query
  })
}

/**
 * 查询h5首页模版的分类信息
 */
export function queryMobileIndexCates() {
  return request({
    url: 'mobileindextemplate/cates',
    method: 'get',
  })
}

/**
 * 查询h5首页的h5专题
 */
export function queryMobileIndexMobileThematic() {
  return request({
    url: 'mobileindextemplate/mobilethematic',
    method: 'get',
  })
}

/**
 * 查询h5首页的根据单品id查询单品信息
 * @param skuId 单品id
 */
export function queryMobileIndexSkuById(skuId) {
  return request({
    url: 'mobileindextemplate/sku/' + skuId,
    method: 'get',
  })
}

/**
 *查询h5首页的根据专题id查询专题信息
 * @param id 专题id
 */
export function queryMobileIndexThematicById(id) {
  return request({
    url: 'mobileindextemplate/mobilethematic/' + id,
    method: 'get',
  })
}

/**
 * 查询h5首页的初始化模版
 * @param id 初始化模版id
 */
export function queryInitMobileIndex(id) {
  return request({
    url: 'mobileindextemplate/inittemplate/' + id,
    method: 'get',
  })
}

/**
 * 新增h5首页
 * @param template 首页模版
 */
export function addMobileIndex(template) {
  return request({
    url: 'mobileindextemplate',
    data: template,
    method: 'post',
  })
}
