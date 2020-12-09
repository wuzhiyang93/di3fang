/**
 * Created by dujinkai on 2019//18.
 */
import request from '@/utils/request';

/**
 * 分页查询会员信息
 * @param 查询参数
 */
export function queryCustomers(query) {
  return request({
    url: 'customers',
    method: 'get',
    params: query
  })
}

/**
 * 删除会员信息
 * @param ids 会员id
 */
export function deleteCustomers(ids) {
  return request({
    url: 'customers',
    method: 'delete',
    params: {ids: ids}
  })
}

/**
 * 发送通知
 * @param letters 通知
 */
export function addstationLetters(letters) {
  return request({
    url: 'stationletters',
    method: 'post',
    data: letters
  })
}


/**
 * 导出所有会员
 * @param status 订单状态
 */
export function exportAllCustomer(status) {
  return request({
    url: 'exportallcustomer',
    method: 'post',
    responseType: 'arraybuffer'
  })
}

/**
 * 导出选中的会员
 */
export function exportCheckedCustomer(ids) {
  return request({
    url: 'exportcheckedcustomer',
    method: 'post',
    params: {ids: ids},
    responseType: 'arraybuffer'
  })
}

/**
 * 查询所有的省份
 */
export function queryAllProvinces() {
  return request({
    url: 'customer/allprovinces',
    method: 'get',
  })
}

/**
 * 根据省份id查询市
 * @param id 省份id
 */
export function queryCityByProvinceId(id) {
  return request({
    url: 'customer/querycitybyprovinceid/' + id,
    method: 'get',
  })
}

/**
 * 根据市id查询下面的区
 * @param id 市区id
 */
export function queryDistrictByCityId(id) {
  return request({
    url: 'customer/querydistrictbycityid/' + id,
    method: 'get',
  })
}

/**
 * 新增会员
 * @param customer 会员信息
 */
export function addCustomer(customer) {
  return request({
    url: 'customer',
    method: 'post',
    data: customer
  })
}

/**
 * 检查手机号码是否存在
 * @param mobile 手机号码
 */
export function checkMobileExist(mobile) {
  return request({
    url: 'checkmobileexist/' + mobile,
    method: 'get',
  })
}

/**
 * 检查邮箱是否存在
 * @param email 邮箱
 */
export function checkEmailExist(email) {
  return request({
    url: 'checkemailexist/' + email,
    method: 'get',
  })
}

/**
 * 根据会员id查询会员信息
 * @param id 会员id
 */
export function queryCustomerById(id) {
  return request({
    url: 'customer/' + id,
    method: 'get',
  })
}

/**
 * 更新会员
 * @param customer 会员信息
 */
export function updateCustomer(customer) {
  return request({
    url: 'customer',
    method: 'put',
    data: customer
  })
}
