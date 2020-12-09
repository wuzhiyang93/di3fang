/**
 * 又拍云设置路由
 *
 * @author Caizize created on 2019/5/28
 */

import request from '@/utils/request';


/**
 * 查询又拍云设置
 */
export function queryUpYunSet() {
  return request({
    url: 'upyunset',
    method: 'get',
  })
}

/**
 * 修改又拍云设置
 *
 * @param upYunSetting 又拍云设置信息
 */
export function updateUpYunSet(upYunSetting) {
  return request({
    url: 'upyunset',
    method: 'put',
    data: upYunSetting
  })
}
