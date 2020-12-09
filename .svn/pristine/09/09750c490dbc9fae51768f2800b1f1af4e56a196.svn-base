/**
 * 会员等级路由
 *
 * @author Caizize created on 2019/6/6
 */

import request from '@/utils/request';


/**
 * 查询会员等级列表
 *
 * @return 会员等级列表
 */
export function queryCustomerLevelList() {
  return request({
    url: 'customerlevellist',
    method: 'get',
  })
}


/**
 * 设置会员价启用状态
 *
 * @param memberPriceStatus 会员价启用状态 0 启用 1 不启用
 * @return 成功1 否则失败
 */
export function setMemberPriceStatus(memberPriceStatus) {
  return request({
    url: 'customerlevel/setmemberpricestatus/' + memberPriceStatus,
    method: 'put',
  })
}

/**
 * 新增会员等级
 *
 * @param customerLevel 会员等级实体
 * @return 成功1 否则失败 -1 消费金额段已经存在
 */
export function addCustomerLevel(customerLevel) {
  return request({
    url: 'customerlevel',
    method: 'post',
    data: customerLevel
  })
}

/**
 * 根据id查询会员等级
 *
 * @param id 会员等级id
 * @return 会员等级信息
 */
export function queryCustomerLevelById(id) {
  return request({
    url: 'customerlevel/' + id,
    method: 'get',
  })
}

/**
 * 修改会员等级
 *
 * @param customerLevel 会员等级实体
 * @return 成功1 否则失败 -1 消费金额段已经存在
 */
export function updateCustomerLevel(customerLevel) {
  return request({
    url: 'customerlevel',
    method: 'put',
    data: customerLevel
  })
}

/**
 * 删除会员等级
 *
 * @param id 会员等级id
 * @return 成功1 否则失败
 */
export function deleteCustomerLevel(id) {
  return request({
    url: 'customerlevel/' + id,
    method: 'delete',
  })
}
