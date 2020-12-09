import request from '@/utils/request';

/**
 * 分页查询
 * @param query
 */
export function queryCoupon(query) {
  return request({
    url: 'coupon',
    method: 'get',
    params: query
  })
}

/**
 * 复制优惠卷
 * @param id 优惠卷id
 */
export function copyCoupon(id) {
  return request({
    url: 'copycoupon/' + id,
    method: 'get',
  })
}

/**
 * 导出优惠卷
 * @param id 优惠卷id
 */
export function exportCoupon(id) {
  return request({
    url: 'exportcoupon/' + id,
    method: 'post',
    responseType: 'arraybuffer'
  })
}

/**
 * 删除优惠卷
 * @param ids 优惠卷id
 */
export function deleteCoupon(ids) {
  return request({
    url: 'coupon',
    method: 'delete',
    params: {ids: ids}
  })
}

/**
 * 新增优惠卷
 * @param coupon
 */
export function addCoupon(coupon) {
  return request({
    url: 'coupon',
    method: 'post',
    data: coupon
  })

}
