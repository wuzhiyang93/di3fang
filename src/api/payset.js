/**
 * 支付设置路由
 *
 * @author Caizize created on 2019/5/28
 */

import request from '@/utils/request';


/**
 * 查询支付设置
 */
export function queryPaySet() {
  return request({
    url: 'payset',
    method: 'get',
  })
}

/**
 * 修改支付设置
 *
 * @param paySetCommon 支付设置信息
 * @param codeType 支付设置类型 1 支付宝 2 微信 3 银联
 */
export function updatePaySet(paySetCommon, codeType) {
  return request({
    url: 'payset/' + codeType,
    method: 'post',
    data: paySetCommon
  })
}
