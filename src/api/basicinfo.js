/**
 * 基本信息设置路由
 *
 * @author Caizize created on 2019/5/30
 */

import request from '@/utils/request';


/**
 * 查询基本信息设置
 */
export function queryBaseInfoSet() {
  return request({
    url: 'infoset/baseinfoset',
    method: 'get',
  })
}

/**
 * 修改基本信息设置
 *
 * @param baseInfoSet 基本信息设置
 */
export function updateBaseInfoSet(baseInfoSet) {
  return request({
    url: 'baseinfoset',
    method: 'put',
    data: baseInfoSet
  })
}
