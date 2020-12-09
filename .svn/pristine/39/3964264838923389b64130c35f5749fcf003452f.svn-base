/**
 * Created by dujinkai on 2019/5/17.
 */
import request from '@/utils/request';

/**
 * 分页查询类型信息
 * @param 查询参数
 */
export function typelist(query) {
  return request({
    url: 'types',
    method: 'get',
    params: query
  })
}

/**
 * 添加商品类型
 * @param  商品类型
 */
export function addType(type) {
  return request({
    url: 'type',
    method: 'post',
    data: type
  })
}

/**
 * 查询三级分类
 */
export function queryThirdCategory() {
  return request({
    url: 'thirdcategorys',
    method: 'get'
  })
}

/**
 * 删除品牌信息
 * @param ids 品牌id
 */
export function delType(ids) {
  return request({
    url: 'type',
    method: 'delete',
    params: ids
  })
}

/**
 *  根据id查询类型信息
 */
export function queryById(id) {
  return request({
    url: 'type/' + id,
    method: 'get',
  })
}


/**
 * 更新类型
 * @param type 类型信息
 */
export function updateType(type) {
  return request({
    url: 'type',
    method: 'put',
    data: type
  })
}

/**
 * 检查类型是否关联了商品
 * @param id 类型id
 */
export function checkTypeAssociated(id) {
  return request({
    url: 'checktypeassociated/' + id,
    method: 'get',
  })
}
