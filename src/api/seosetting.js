/**
 * seo设置路由
 *
 * @author Caizize created on 2019/5/30
 */

import request from '@/utils/request';


/**
 * 查询seo设置
 */
export function querySystemSeo() {
  return request({
    url: 'seosetting',
    method: 'get',
  })
}

/**
 * 修改seo设置
 *
 * @param systemSeo seo设置
 */
export function updateSystemSeo(systemSeo) {
  return request({
    url: 'seosetting',
    method: 'put',
    data: systemSeo
  })
}
