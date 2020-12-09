import request from '@/utils/request';


/**
 * 查找所有模板
 */
export function queryAllTemplate() {
  return request({
    url: 'templates',
    method: 'get',
  })
}

/**
 * 设置模版使用
 * @param id 模版id
 */
export function setUseTemplate(id) {
  return request({
    url: 'template/setuse/' + id,
    method: 'put',
  })
}
