import request from '@/utils/request';

/**
 * 根据父节点查询子节点信息
 * @param parentId 父节点
 */
export function queryCategoryByParentIdForAddSpu(parentId) {
  return request({
    url: 'spu/add/cate/' + parentId,
    method: 'get',
  })
}

/**
 * 查询所有的物流模版
 */
export function queryAllLogisticsTemplates() {
  return request({
    url: 'spu/add/alllogisticstemplates',
    method: 'get',
  })
}

/**
 * 查询指定的规格信息
 */
export function querySpecsByIds(specIds) {
  return request({
    url: 'spu/add/specs',
    method: 'get',
    params: {ids: specIds}
  })
}

/**
 *  查询类型详情
 * @param id 类型id
 */
export function queryTypeDetail(id) {
  return request({
    url: 'spu/add/type/' + id,
    method: 'get',
  })
}

/**
 * 查询所有品牌
 */
export function queryAllBrands() {
  return request({
    url: 'spu/add/brands',
    method: 'get',
  })
}

/**
 *  查询所有的会员等级
 */
export function queryAllLevels() {
  return request({
    url: 'spu/add/levels',
    method: 'get',
  })
}

/**
 * 查询所有服务支持
 */
export function queryAllServiceSupport() {
  return request({
    url: 'spu/add/servciesupports',
    method: 'get',
  })
}


/**
 * 添加商品信息
 * @param spu 商品信息
 */
export function addSpu(spu) {
  return request({
    url: 'spu',
    method: 'post',
    data: spu
  })
}

/**
 * 添加 规格值
 * @param specValue 规格值
 */
export function addSpecValue(specValue) {
  return request({
    url: 'spu/specvalue',
    method: 'post',
    data: specValue
  })
}

/**
 * 查询商品导入
 * @param id 商品导入id
 */
export function querSpuImport(id) {
  return request({
    url: 'spu/import/' + id,
    method: 'get',
  })
}
