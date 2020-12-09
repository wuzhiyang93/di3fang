/**
 * 修改专题路由（可视化编辑）
 *
 * @author Caizize created on 2020/4/7
 */

import request from '@/utils/request'


/**
 * 分页查询单品信息(全站，包含店铺)
 * @param query 查询参数
 */
export function queryAllSkus(query) {
  return request({
    url: 'thematic/update/allskus',
    method: 'get',
    params: query
  })
}

/**
 * 分页查询文章列表
 * @param query 查询参数
 */
export function queryArticleList(query) {
  return request({
    url: 'thematic/update/articlelist',
    method: 'get',
    params: query
  })
}

/**
 * 分页查询专题
 * @param query 查询参数
 */
export function queryThematicList(query) {
  return request({
    url: 'thematic/update/thematiclist',
    method: 'get',
    params: query
  })
}

/**
 * 查询帮助列表
 * @param query 查询参数
 */
export function queryHelpList(query) {
  return request({
    url: 'thematic/update/helplist',
    method: 'get',
    params: query
  })
}

/**
 * 查询所有分类
 */
export function queryAllCategory() {
  return request({
    url: '/thematic/update/cates',
    method: 'get',
  })
}

/**
 * 根据单品id查询单品信息
 */
export function querySkuById(id) {
  return request({
    url: 'thematic/update/sku/' + id,
    method: 'get',
  })
}

/**
 * 根据文章id查询文章信息
 */
export function queryArticleById(id) {
  return request({
    url: 'thematic/update/article/' + id,
    method: 'get',
  })
}

/**
 * 根据id查询专题
 */
export function queryThematicById(id) {
  return request({
    url: 'thematic/update/thematic/' + id,
    method: 'get',
  })
}

/**
 * 根据id查询帮助
 */
export function queryHelpById(id) {
  return request({
    url: 'thematic/update/help/' + id,
    method: 'get',
  })
}

/**
 * 查询专题信息
 *
 * @param id 专题id
 */
export function queryTemplate(id) {
  return request({
    url: 'visual/thematic/' + id,
    method: 'get',
  })
}

/**
 * 查询当前使用的模板
 */
export function queryCurrentTemplate() {
  return request({
    url: 'thematic/currenttemplate/update',
    method: 'get',
  })
}

/**
 * 修改专题（可视化编辑）
 */
export function updateThematic(thematic) {
  return request({
    url: 'visual/thematic',
    method: 'put',
    data: thematic
  })
}
