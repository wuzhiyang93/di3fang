/**
 * 管理员路由
 *
 * @author Caizize created on 2019/5/28
 */

import request from '@/utils/request';


/**
 * 分页查询管理员列表
 *
 * @param query 查询参数
 */
export function queryManagerList(query) {
  return request({
    url: 'managerlist',
    method: 'get',
    params: query
  })
}

/**
 * 查询所有角色
 */
export function queryRoleListForManager() {
  return request({
    url: 'rolelistformanager',
    method: 'get',
  })
}

/**
 * 新增管理员
 *
 * @param manager 管理员信息
 * @param roleId 角色id
 */
export function addManager(manager, roleId) {
  return request({
    url: 'manager/' + roleId,
    method: 'post',
    data: manager
  })
}

/**
 * 根据id查询管理员
 *
 * @param managerId 管理员id
 */
export function queryManagerById(managerId) {
  return request({
    url: 'manager/' + managerId,
    method: 'get',
  })
}

/**
 * 修改管理员
 *
 * @param roleAndManager 角色管理员实体类
 */
export function updateManager(roleAndManager) {
  return request({
    url: 'manager',
    method: 'put',
    data: roleAndManager
  })
}

/**
 * 删除管理员
 *
 * @param managerIds 管理员id数组
 */
export function deleteManager(managerIds) {
  return request({
    url: 'manager',
    method: 'delete',
    params: managerIds
  })
}
