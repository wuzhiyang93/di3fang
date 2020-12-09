/**
 * Created by dujinkai on 2019/5/17.
 */
import request from '@/utils/request';

/**
 * 分页查询商品导入信息
 * @param 查询参数
 */
export function spuimportLists(query) {
  return request({
    url: 'spuimports',
    method: 'get',
    params: query
  })
}

/**
 * 删除商品导入
 * @param ids 删除ids
 */
export function delSpuImport(ids) {
  return request({
    url: 'spuimports',
    method: 'delete',
    params: ids
  })
}
