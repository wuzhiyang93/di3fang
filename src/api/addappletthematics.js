import request from '@/utils/request';

/**
 * 查询小程序专题模版的单品信息
 */
export function queryAppletThematicSkus(query) {
  return request({
    url: 'appletthematic/skus',
    method: 'get',
    params: query
  })
}

/**
 * 查询小程序专题模版的分类信息
 */
export function queryAppletThematicCates() {
  return request({
    url: 'appletthematic/cates',
    method: 'get',
  })
}

/**
 * 查询小程序专题的APP专题
 */
export function queryAppletThematicAppletThematic() {
  return request({
    url: 'appletthematic/thematics',
    method: 'get',
  })
}

/**
 * 查询小程序专题的根据单品id查询单品信息
 * @param skuId 单品id
 */
export function queryAppletThematicSkuById(skuId) {
  return request({
    url: 'appletthematic/sku/' + skuId,
    method: 'get',
  })
}

/**
 *查询小程序专题的根据专题id查询专题信息
 * @param id 专题id
 */
export function queryAppletThematciThematicById(id) {
  return request({
    url: 'appletthematic/thematic/' + id,
    method: 'get',
  })
}

/**
 * 查询小程序专题的初始化模版
 * @param id 初始化模版id
 */
export function queryInitAppletThematic(id) {
  return request({
    url: 'appletthematic/inittemplate/' + id,
    method: 'get',
  })
}

/**
 * 添加专题
 * @param thematic 专题
 */
export function addAppletThematic(thematic) {
  return request({
    url: 'appletthematic',
    method: 'post',
    data: thematic
  })
}
