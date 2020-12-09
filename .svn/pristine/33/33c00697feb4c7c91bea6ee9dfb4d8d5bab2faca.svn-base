/**
 * 物流公司路由
 *
 * @author Caizize created on 2019/5/27
 */

import request from '@/utils/request';


/**
 * 查询所有物流信息
 *
 */
export function queryLogisticsCompanys() {
  return request({
    url: 'logisticscompanys',
    method: 'get',
  })
}


/**
 * 新增物流公司
 *
 * @param logisticsCompany 物流公司信息
 */
export function addLogisticsCompany(logisticsCompany) {
  return request({
    url: 'logisticscompany',
    method: 'post',
    data: logisticsCompany
  })
}


/**
 * 删除物流公司
 *
 * @param ids 物流公司id数组
 */
export function deleteLogisticsCompany(id) {
  return request({
    url: 'logisticscompany/' + id,
    method: 'delete',
  })
}
