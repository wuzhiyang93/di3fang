/**
 * 地区管理路由
 *
 * @author Caizize created on 2019/6/4
 */

import request from '@/utils/request';


/**
 * 查询所有省份列表
 *
 * @return 所有省份列表
 */
export function queryAllProvinces() {
  return request({
    url: 'provinces',
    method: 'get',
  })
}

/**
 * 根据省份id查询市列表
 *
 * @param provinceId 省份id
 * @return 市列表
 */
export function queryCityByProvinceId(provinceId) {
  return request({
    url: 'citybyprovinceid/' + provinceId,
    method: 'get',
  })
}

/**
 * 根据市id查询区列表
 *
 * @param cityId 市id
 * @return 区列表
 */
export function queryDistrictByCityId(cityId) {
  return request({
    url: 'districtbycityid/' + cityId,
    method: 'get',
  })
}

/**
 * 新增省
 *
 * @param province 省信息
 * @return 成功1 否则失败
 */
export function addProvince(province) {
  return request({
    url: 'province',
    method: 'post',
    data: province
  })
}

/**
 * 新增市
 *
 * @param city 市信息
 * @return 成功1 否则失败
 */
export function addCity(city) {
  return request({
    url: 'city',
    method: 'post',
    data: city
  })
}

/**
 * 新增区
 *
 * @param district 区信息
 * @return 成功1 否则失败
 */
export function addDistrict(district) {
  return request({
    url: 'district',
    method: 'post',
    data: district
  })
}

/**
 * 根据省id查询省信息
 *
 * @param id 省id
 * @return 省信息
 */
export function queryProvinceById(id) {
  return request({
    url: 'province/' + id,
    method: 'get',
  })
}

/**
 * 根据市id查询市信息
 *
 * @param id 市id
 * @return 市信息
 */
export function queryCityById(id) {
  return request({
    url: 'city/' + id,
    method: 'get',
  })
}

/**
 * 根据区id查询区信息
 *
 * @param id 区id
 * @return 区信息
 */
export function queryDistrictById(id) {
  return request({
    url: 'district/' + id,
    method: 'get',
  })
}

/**
 * 修改省信息
 *
 * @param province 省信息
 * @return 成功1 否则失败
 */
export function updateProvince(province) {
  return request({
    url: 'province',
    method: 'put',
    data: province
  })
}

/**
 * 修改市信息
 *
 * @param city 市信息
 * @return 成功1 否则失败
 */
export function updateCity(city) {
  return request({
    url: 'city',
    method: 'put',
    data: city
  })
}

/**
 * 修改区信息
 *
 * @param district 区信息
 * @return 成功1 否则失败
 */
export function updateDistrict(district) {
  return request({
    url: 'district',
    method: 'put',
    data: district
  })
}

/**
 * 删除省份信息
 *
 * @param id 省份id
 * @return 成功1 否则失败 -1 省下面有市信息不能删除
 */
export function deleteProvinceById(id) {
  return request({
    url: 'province/' + id,
    method: 'delete',
  })
}

/**
 * 删除市信息
 *
 * @param id 市id
 * @return 成功1 否则失败 -1 市下面有区信息不能删除
 */
export function deleteCityById(id) {
  return request({
    url: 'city/' + id,
    method: 'delete',
  })
}

/**
 * 删除区信息
 *
 * @param id 区id
 * @return 成功1 否则失败
 */
export function deleteDistrictById(id) {
  return request({
    url: 'district/' + id,
    method: 'delete',
  })
}
