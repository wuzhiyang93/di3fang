/**
 * Created by dujinkai on 2019/5/17.
 */
import request from '@/utils/request';

/**
 * 分页查询角色信息
 * @param 查询参数
 */
export function rolelist(query) {
  return request({
    url: 'roles',
    method: 'get',
    params: query
  })
}


/**
 * 查询管理员的菜单权限
 */
export function roleAuthMenu() {
  return request({
    url: '/role/managermenus',
    method: 'get'
  })
}


/**
 * 添加角色
 * @param 角色
 */
export function addRole(role) {
  return request({
    url: 'role',
    method: 'post',
    data: role
  })
}

/**
 * 根据角色ID查询该角色拥有对权限ID
 * @param id 角色id
 */
export function queryAuthIdByRoleId(id) {
  return request({
    url: '/role/' + id,
    method: 'get'
  })
}

/**
 * 更新角色
 * @param 角色
 */
export function updateRole(role) {
  return request({
    url: 'role',
    method: 'put',
    data: role
  })
}


/**
 * 删除角色
 * @param 角色
 */
export function deleteRole(ids) {
  return request({
    url: 'role',
    method: 'delete',
    params: ids
  })
}
