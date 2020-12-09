import request from '@/utils/request';

/**
 * 查询APP专题模版的单品信息
 */
export function queryAppThematicSkus(query) {
  return request({
    url: 'appthematic/skus',
    method: 'get',
    params: query
  })
}

/**
 * 查询APP专题模版的分类信息
 */
export function queryAppThematicCates() {
  return request({
    url: 'appthematic/cates',
    method: 'get',
  })
}

/**
 * 查询APP专题的APP专题
 */
export function queryAppThematicAppThematic() {
  return request({
    url: 'appthematic/appthematics',
    method: 'get',
  })
}

/**
 * 查询APP专题的根据单品id查询单品信息
 * @param skuId 单品id
 */
export function queryAppThematicSkuById(skuId) {
  return request({
    url: 'appthematic/sku/' + skuId,
    method: 'get',
  })
}

/**
 *查询APP专题的根据专题id查询专题信息
 * @param id 专题id
 */
export function queryAppThematciThematicById(id) {
  return request({
    url: 'appthematic/appthematic/' + id,
    method: 'get',
  })
}

/**
 * 查询app专题的初始化模版
 * @param id 初始化模版id
 */
export function queryInitAppThematic(id) {
  return request({
    url: 'appthematic/inittemplate/' + id,
    method: 'get',
  })
}

/**
 * 添加专题
 * @param thematic 专题
 */
export function addAppThematic(thematic) {
  return request({
    url: 'appthematic',
    method: 'post',
    data: thematic
  })
}
