import request from '@/utils/request';


/**
 * 查询门店支付类型
 */
export function queryStorePayType() {
  return request({
    url: 'storepaytype',
    method: 'get',
  })
}

/**
 * 修改门店支付类型
 * @param payType 支付类型
 */
export function updStorePayType(id, name) {
  return request({
    url: 'storepaytype',
    method: 'put',
    params: {id: id, name: name}
  })
}


/**
 * 删除门店支付类型
 *
 * @param id  删除的 id
 */
export function delStorePayType(id) {
  return request({
    url: 'storepaytype/' + id,
    method: 'delete',
  })
}


/**
 * 添加门店支付类型
 * @param payName 门店支付类型名称
 */
export function addStorePayType(payName) {
  return request({
    url: 'storepaytype',
    method: 'post',
    params: {payName: payName}
  })
}
