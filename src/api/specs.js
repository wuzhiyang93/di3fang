/**
 * 商品规格路由
 *
 * @author Caizize created on 2019/5/22
 */

import request from '@/utils/request';


/**
 * 分页查询商品规格列表
 *
 * @param query 查询参数
 */
export function querySpecList(query) {
  return request({
    url: 'specs',
    method: 'get',
    params: query
  })
}

/**
 * 新增商品规格
 *
 * @param spec 规格信息
 */
export function addSpec(spec) {
  return request({
    url: 'spec',
    method: 'post',
    data: spec
  })
}

/**
 * 根据id查询商品规格
 *
 * @param id 规格id
 */
export function querySpecById(id) {
  return request({
    url: 'spec/' + id,
    method: 'get',
  })
}

/**
 * 修改商品规格
 *
 * @param spec 规格信息
 */
export function updateSpec(spec) {
  return request({
    url: 'spec',
    method: 'put',
    data: spec
  })
}

/**
 * 删除商品规格
 *
 * @param ids 规格id数组
 */
export function deleteSpec(ids) {
  return request({
    url: 'spec',
    method: 'delete',
    params: ids
  })
}

/**
 * 查询规格值是否可以删除
 *
 * @param specValueId 规格值id
 * @return true 可以删除 false 不可以删除
 */
export function isSpecValueCanDelete(specValueId) {
  return request({
    url: 'isspecvaluecandelete/' + specValueId,
    method: 'get',
  })
}
