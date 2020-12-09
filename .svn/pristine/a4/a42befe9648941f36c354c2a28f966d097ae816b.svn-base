import request from '@/utils/request';


/**
 * 分页查询收入支出记录
 * @param query 查询参数
 */
export function queryIncomeAndExpensesRecords(query) {
  return request({
    url: 'biglling',
    method: 'get',
    params: query
  })
}


/**
 * 查询收入和支出
 * @param query 查询参数
 */
export function queryIncomeAndExpenses(query) {
  return request({
    url: '/biglling/statistical',
    method: 'get',
    params: query
  })
}
