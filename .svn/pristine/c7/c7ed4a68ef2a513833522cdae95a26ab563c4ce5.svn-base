import request from '@/utils/request';

/**
 * 查询APP专题模版的单品信息
 */
export function queryAppThematicSkus(query) {
  return request({
    url: 'appthematic/update/skus',
    method: 'get',
    params: query
  })
}

/**
 * 查询APP专题模版的分类信息
 */
export function queryAppThematicCates() {
  return request({
    url: 'appthematic/update/cates',
    method: 'get',
  })
}

/**
 * 查询APP专题的APP专题
 */
export function queryAppThematicAppThematic() {
  return request({
    url: 'appthematic/update/appthematics',
    method: 'get',
  })
}

/**
 * 查询APP专题的根据单品id查询单品信息
 * @param skuId 单品id
 */
export function queryAppThematicSkuById(skuId) {
  return request({
    url: 'appthematic/update/sku/' + skuId,
    method: 'get',
  })
}

/**
 *查询APP专题的根据专题id查询专题信息
 * @param id 专题id
 */
export function queryAppThematciThematicById(id) {
  return request({
    url: 'appthematic/update/appthematic/' + id,
    method: 'get',
  })
}

/**
 * 根据专题id查询专题信息
 * @param id  专题id
 */
export function queryAppThematicDetailById(id) {
  return request({
    url: 'appthematic/' + id,
    method: 'get',
  })
}

/**
 * 更新app专题
 * @param thematic app专题
 */
export function updateAppThematic(thematic) {
  return request({
    url: 'appthematic',
    data: thematic,
    method: 'put',
  })
}

