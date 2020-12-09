/**
 * 登录设置路由
 *
 * @author Caizize created on 2019/5/28
 */

import request from '@/utils/request';


/**
 * 查询登录设置
 */
export function queryLoginSet() {
  return request({
    url: 'loginset',
    method: 'get',
  })
}

/**
 * 修改登录设置
 *
 * @param loginSetting 登录设置实体
 */
export function updateLoginSet(loginSetting) {
  return request({
    url: 'loginset',
    method: 'post',
    data: loginSetting
  })
}
