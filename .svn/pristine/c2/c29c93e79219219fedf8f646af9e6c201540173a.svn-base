import {
  formatDate  //时间格式化
} from '@/utils/index';


/**
 * @author 葛新帅
 * @time 2019-06-25
 * 用于时间计算
 */


/**
 * 用于计算时间区间内 所有天数的数组 时间格式为 'yyyy-MM-dd'
 * @param startTime  区间开始时间
 * @param endTime 区间结束时间
 * @returns {any[]}  区间内时间集
 */
export function intervalDate(startTime, endTime) {
  let end = formatDate(endTime, 'yyyy-MM-dd');
  let dateArray = new Array();
  for (let i = 0; ; i++) {
    let temp = formatDate(new Date(startTime.getTime() + 3600 * 1000 * 24 * i), 'yyyy-MM-dd')
    dateArray.push(temp);
    if (temp == end) {
      break;
    }
  }
  return dateArray;
}

/**
 * 获取上周起始时间
 * @returns {any[]}  起始时间数组  index0 星期一  index1 星期日
 */
export function lastWeek() {
  let day = new Date().getDay();
  let lastSunday = new Date(new Date().getTime() - 3600 * 1000 * 24 * (day == 0 ? 7 : day));
  let lastMonday = new Date(lastSunday.getTime() - 3600 * 1000 * 24 * 6);
  let dateArray = new Array();
  dateArray.push(lastMonday);
  dateArray.push(lastSunday);
  return dateArray;
}

/**
 * 获取本周到当前时间的起始时间数组
 * @returns {any[]}  起始时间数组  index0 本周一  index1 今天
 */
export function thisWeek() {
  let day = new Date().getDay();
  let thisMonday = new Date(new Date().getTime() - 3600 * 1000 * 24 * (day == 0 ? 6 : day - 1));
  let dateArray = new Array();
  dateArray.push(thisMonday);
  dateArray.push(new Date());
  return dateArray;
}

/**
 * 获取本月起始时间数组
 * @returns {any[]} 起始时间数组 index0 本月一号 index1 今天
 */
export function thisMonth() {
  let dateArray = new Array();
  let day = new Date().getUTCDate();
  let thisOne = new Date(new Date().getTime() - 3600 * 1000 * 24 * (day - 1));
  dateArray.push(thisOne);
  dateArray.push(new Date());
  return dateArray;
}


/**
 * 获取上个月起始时间数组
 * @returns {any[]} 起始时间数组 index0 上月一号   index1 上月最后一天
 */
export function lastMonth() {
  let dateArray = new Array();
  let day = new Date().getUTCDate();
  let lastMonthLastDay = new Date(new Date().getTime() - 3600 * 1000 * 24 * day);
  let lastDay = lastMonthLastDay.getUTCDate();
  let lastMonthFristday = new Date(lastMonthLastDay.getTime() - 3600 * 1000 * 24 * (lastDay - 1))
  dateArray.push(lastMonthFristday);
  dateArray.push(lastMonthLastDay);
  return dateArray;
}

