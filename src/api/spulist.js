/**
 * Created by dujinkai on 2019/6/21.
 */
import request from '@/utils/request';

/**
 * 分页查询商品信息
 * @param 查询参数
 */
export function querySpus(query) {
  return request({
    url: 'spus',
    method: 'get',
    params: query
  })
}

/**
 * 查询品牌信息
 */
export function queryBrands() {
  return request({
    url: 'spu/brands',
    method: 'get'
  })
}

/**
 * 根据分类id查询所有子分类信息
 * @param id 父及分类id
 */
export function queryCategoryByParentIdForSpu(id) {
  return request({
    url: 'spu/categorybyparentid/' + id,
    method: 'get'
  })
}

/**
 * 生成索引
 */
export function createIndex() {
  return request({
    url: 'createindex',
    method: 'put'
  })
}

/**
 * 修改商品的上下架状态
 * @param ids 商品id
 * @param status 状态
 */
export function updateShelvesStatus(ids, status) {
  return request({
    url: 'updateshelvesstatus',
    method: 'put',
    params: {ids: ids, status: status}
  })
}

/**
 * 删除商品信息
 * @param ids 商品id
 */
export function deleteSpus(ids) {
  return request({
    url: 'spus',
    method: 'delete',
    params: {ids: ids}
  })
}

/**
 * 导出所有商品
 * @param status 订单状态
 */
export function exportAllSpu() {
  return request({
    url: 'exportallspu',
    method: 'post',
    responseType: 'arraybuffer'
  })
}

/**
 * 导出选择商品
 */
export function exportCheckedSpu(ids) {
  return request({
    url: 'exportcheckedspu',
    method: 'post',
    params: {ids: ids},
    responseType: 'arraybuffer'
  })
}
