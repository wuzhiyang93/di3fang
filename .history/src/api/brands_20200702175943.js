/**
 * Created by dujinkai on 2019/5/17.
 */
import request from '@/utils/request';

/**
 * 分页查询品牌信息
 * @param 查询参数
 */
export function brandlist(query) {
  return request({
    url: 'brands',
    method: 'get',
    params: query
  })
}

/**
 * 添加品牌
 * @param brand 品牌信息
 */
export function addBrand(brand) {
  return request({
    url: 'brand',
    method: 'post',
    data: brand
  })
}


/**
 * 删除品牌信息
 * @param ids 品牌id
 */
export function delBrand(ids) {
  return request({
    url: 'brand',
    method: 'delete',
    params: ids
  })
}

/**
 *  根据品牌id查询品牌信息
 */
export function queryById(id) {
  return request({
    url: 'brand/' + id,
    method: 'get',
  })
}


/**
 * 更新品牌
 * @param brand 品牌信息
 */
export function updateBrand(brand) {
  return request({
    url: 'brand',
    method: 'put',
    data: brand
  })
}

