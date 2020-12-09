import request from '@/utils/request';

/**
 * 查询Mobile专题模版的单品信息
 */
export function queryMobileThematicSkus(query) {
  return request({
    url: 'mobilethematic/update/skus',
    method: 'get',
    params: query
  })
}

/**
 * 查询Mobile专题模版的分类信息
 */
export function queryMobileThematicCates() {
  return request({
    url: 'mobilethematic/update/cates',
    method: 'get',
  })
}

/**
 * 查询Mobile专题的Mobile专题
 */
export function queryMobileThematicMobileThematic() {
  return request({
    url: 'mobilethematic/update/mobilethematics',
    method: 'get',
  })
}

/**
 * 查询Mobile专题的根据单品id查询单品信息
 * @param skuId 单品id
 */
export function queryMobileThematicSkuById(skuId) {
  return request({
    url: 'mobilethematic/update/sku/' + skuId,
    method: 'get',
  })
}

/**
 *查询Mobile专题的根据专题id查询专题信息
 * @param id 专题id
 */
export function queryMobileThematciThematicById(id) {
  return request({
    url: 'mobilethematic/update/mobilethematic/' + id,
    method: 'get',
  })
}

/**
 * 查询Mobile专题
 * @param id 模版id
 */
export function queryMobileThematicDetailById(id) {
  return request({
    url: 'mobilethematic/' + id,
    method: 'get',
  })
}

/**
 * 更新专题
 * @param thematic 专题
 */
export function updateMobileThematic(thematic) {
  return request({
    url: 'mobilethematic',
    method: 'put',
    data: thematic
  })
}
