/**
 * 专题设置路由
 *
 * @author Caizize created on 2020/3/19
 */

import request from '@/utils/request';


/**
 * 分页查询专题列表
 *
 * @param query 查询参数
 */
export function queryThematicList(query) {
  return request({
    url: 'thematiclist',
    method: 'get',
    params: query
  })
}

/**
 * 删除专题
 *
 * @param ids 专题id数组
 */
export function deleteThematic(ids) {
  return request({
    url: 'thematic',
    method: 'delete',
    params: ids,
  })
}

/**
 * 新增专题
 *
 * @param thematic 专题实体
 */
export function addThematic(thematic) {
  return request({
    url: 'thematic',
    method: 'post',
    data: thematic,
  })
}

/**
 * 根据id查询专题
 *
 * @param id 专题id
 */
export function queryThematicById(id) {
  return request({
    url: 'thematic/' + id,
    method: 'get',
  })
}

/**
 * 修改专题
 *
 * @param thematic 专题实体
 */
export function updateThematic(thematic) {
  return request({
    url: 'thematic',
    method: 'put',
    data: thematic,
  })
}
