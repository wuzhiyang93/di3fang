import request from '@/utils/request';


/**
 * 分页查询审核商家列表
 * @param query 查询参数
 */
export function querySellerAduitList(query) {
  return request({
    url: 'auditseller',
    method: 'get',
    params: query
  })
}


/**
 * 删除商家
 * @param id 商家 id
 */
export function deleteStore(id) {
  return request({
    url: 'auditseller/' + id,
    method: 'delete',
  })
}

/**
 * 商家通过审核
 * @param param 参数
 */
export function passStoreAudit(param) {
  return request({
    url: 'auditseller',
    method: 'put',
    data: param
  })
}


/**
 * 拒绝商家
 * @param param 参数
 */
export function refuseStoreAudit(param) {
  return request({
    url: 'auditseller/refuse',
    method: 'put',
    data: param
  })
}

/**
 * 批量关店
 * @param ids 参数
 */
export function closeStores(ids) {
  return request({
    url: 'auditseller/closestores',
    method: 'put',
    params: ids
  })
}



