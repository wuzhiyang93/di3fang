import request from '@/utils/request';


/**
 * 查询 APP版本信息
 */
export function queryAppVersion() {
  return request({
    url: 'appversionconfig',
    method: 'get',
  })
}

/**
 * 修改 APP 版本信息
 * @param config  配置信息
 */
export function updateAppVersion(config) {
  return request({
    url: 'appversionconfig',
    method: 'put',
    data: config
  })
}
