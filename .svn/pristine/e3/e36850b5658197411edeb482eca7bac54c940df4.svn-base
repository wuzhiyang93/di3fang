import request from '@/utils/request';

/**
 * 查询小程序专题模版的单品信息
 */
export function queryAppletThematicSkus(query) {
  return request({
    url: 'appletthematic/update/skus',
    method: 'get',
    params: query
  })
}

/**
 * 查询小程序专题模版的分类信息
 */
export function queryAppletThematicCates() {
  return request({
    url: 'appletthematic/update/cates',
    method: 'get',
  })
}

/**
 * 查询小程序专题的APP专题
 */
export function queryAppletThematicAppletThematic() {
  return request({
    url: 'appletthematic/update/thematics',
    method: 'get',
  })
}

/**
 * 查询小程序专题的根据单品id查询单品信息
 * @param skuId 单品id
 */
export function queryAppletThematicSkuById(skuId) {
  return request({
    url: 'appletthematic/update/sku/' + skuId,
    method: 'get',
  })
}

/**
 *查询小程序专题的根据专题id查询专题信息
 * @param id 专题id
 */
export function queryAppletThematciThematicById(id) {
  return request({
    url: 'appletthematic/update/thematic/' + id,
    method: 'get',
  })
}

/**
 * 查询小程序专题的初始化模版
 * @param id 初始化模版id
 */
export function queryAppletThematicDetailById(id) {
  return request({
    url: 'appletthematic/' + id,
    method: 'get',
  })
}

/**
 * 更新专题
 * @param thematic 专题
 */
export function updateAppletThematic(thematic) {
  return request({
    url: 'appletthematic',
    method: 'put',
    data: thematic
  })
}
