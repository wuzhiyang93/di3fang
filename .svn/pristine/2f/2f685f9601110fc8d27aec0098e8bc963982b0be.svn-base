/**
 * Created by dujinkai on 2019/6/5.
 */
import request from '@/utils/request';

/**
 * 查询所有的物流模版
 */
export function queryAllLogisticsTemplates() {
  return request({
    url: 'alllogisticstemplates',
    method: 'get',
  })
}


/**
 * 设置默认模版
 * @param id 模版id
 */
export function setDefaultTemplate(id) {
  return request({
    url: 'defaulttemplate/' + id,
    method: 'put',
  })
}

/**
 * 删除运费模版
 * @param id 模版id
 */
export function deleteLogisticsTemplateById(id) {
  return request({
    url: 'logisticstemplate/' + id,
    method: 'delete',
  })
}
