import { isDate } from '../../../utils/jsBase'
import { locale, LocaleZh } from './localeZh'

type DateInput = Date | string | number | null | undefined

const FORMAT_DEFAULT = 'YYYY-MM-DD HH:mm:ss'

export const timeFormat = (date: DateInput, formatStr: string = FORMAT_DEFAULT): string => {
  // 传入日期解析为Date对象
  const $d = parseDate(date)
  const str = String(formatStr)

  // 获取本地化配置zh
  const { weekdays, months, meridiem } = locale as LocaleZh

  // 根据小时判断上下午
  const meridiemFunc =
    meridiem ||
    ((hour: number, minute: number, isLowercase: boolean) => {
      const m = hour < 12 ? 'AM' : 'PM'
      const mi = minute
      console.log(mi)
      return isLowercase ? m.toLowerCase() : m
    })

  // 匹配时间格式
  const matches = (match: string) => {
    // 年月日时分秒毫秒
    const $y = $d.getFullYear()
    const $M = $d.getMonth()
    const $D = $d.getDate()
    const $W = $d.getDay()
    const $H = $d.getHours()
    const $m = $d.getMinutes()
    const $s = $d.getSeconds()
    const $ms = $d.getMilliseconds()

    switch (match) {
      // 年份后两位
      case 'YY':
        return String($y).slice(-2)
      // 完整年份
      case 'YYYY':
        return String($y).padStart(4, '0')
      // 月份 0 1 2
      case 'M':
        return $M + 1
      // 月份 01 02 03
      case 'MM':
        return String($M + 1).padStart(2, '0')
      // 月份 1月 2月 3月
      case 'MMM':
        return cutShort(locale.monthsShort, $M, months, 3)
      // 月份 一月 二月 三月
      case 'MMMM':
        return cutShort(months, $M)
      // 日期 1 2 3
      case 'D':
        return $D
      // 日期 01 02 03
      case 'DD':
        return String($D).padStart(2, '0')
      // 星期 0 1 2
      case 'd':
        return String($W)
      // 星期 01 02 03
      case 'dd':
        return cutShort(locale.weekdaysMin, $W, weekdays, 2)
      // 星期简写
      case 'ddd':
        return cutShort(locale.weekdaysShort, $W, weekdays, 3)
      // 星期全称
      case 'dddd':
        return weekdays[$W]
      // 24小时 0 1 2
      case 'H':
        return String($H)
      // 24小时 01 02 03
      case 'HH':
        return String($H).padStart(2, '0')
      // 12小时 0 1 2
      case 'h':
        return String($H % 12 || 12).padStart(1, '0')
      // 12小时 01 02 03
      case 'hh':
        return String($H % 12 || 12).padStart(2, '0')
      // 上下午
      case 'a':
        return meridiemFunc($H, $m)
      // 上下午
      case 'A':
        return meridiemFunc($H, $m)
      // 分钟 0 1 2
      case 'm':
        return String($m)
      // 分钟 01 02 03
      case 'mm':
        return String($m).padStart(2, '0')
      // 秒 0 1 2
      case 's':
        return String($s)
      // 秒 01 02 03
      case 'ss':
        return String($s).padStart(2, '0')
      // 毫秒 0 1 2
      case 'SSS':
        return String($ms).padStart(3, '0')
      default:
        break
    }
    return null
  }

  const REGEX_FORMAT =
    /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g

  return str.replace(REGEX_FORMAT, (match, $1) => $1 || matches(match))
}

/**
 * 解析日期
 * 将传入的日期（时间戳，日期字符串，Date实例）解析为Date对象
 * @param date
 * @returns Date
 */
export const parseDate = (date: DateInput): Date => {
  // 传入null时, 返回无效日期。
  if (date === null) return new Date(NaN) // null is invalid

  // 传入undefined时, 返回当前日期。
  if (typeof date === 'undefined') return new Date() // today

  // 传入Date对象时, 返回Date对象。
  // 创建新的Date实例然后返回（避免直接操作原数据源可能导致的副作用影响）
  if (isDate(date)) return new Date(date)

  // 传入日期字符串时, 返回日期对象。
  if (typeof date === 'string' && !/Z$/i.test(date)) {
    const d = date.match(
      /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
    )

    if (d) {
      // 获取月份，Date中的月份从0开始, 所有需要减1
      const m = Number(d[2]) - 1 || 0
      // 获取毫秒
      const ms = Number((d[7] || '0').substring(0, 3))
      return new Date(
        Number(d[1]),
        m,
        Number(d[3]) || 1,
        Number(d[4]) || 0,
        Number(d[5]) || 0,
        Number(d[6]) || 0,
        ms,
      )
    }
  }

  return new Date(date) // everything else
}

/**
 * 获取arr中的index位置元素
 * arr不存在, 则获取full中的index位置元素, 并且截取该元素的length长度
 * @param arr
 * @param index
 * @param full
 * @param length
 * @returns string
 */
export const cutShort = <T extends { slice: (start?: number, end?: number) => T }>(
  arr: T[],
  index: number,
  full?: T[] | undefined,
  length?: number | undefined,
): T | undefined => {
  return (arr && arr[index]) || (full && full[index].slice(0, length))
}

/**
 * 首位补全
 * 当string的长度不足length时, 在开头以pad作为填充字符
 */
// export const padStart = (string: string | number, length: number, pad: string | undefined) => {
//   var s = String(string)
//   if (!s || s.length >= length) return string
//   return '' + Array(length + 1 - s.length).join(pad) + string
// }

// console.log(timeFormat(new Date(), 'YYYY年M月D日 HH:mm:ss'))
// console.log(timeFormat(new Date(), 'YYYY年M月D日 dddd a HH:mm:ss'))
// console.log(timeFormat(new Date(), 'M月D日 HH:mm'))
// console.log(timeFormat('2021 10:30', 'YYYY-MM-DD HH:mm:ss'))
// console.log(timeFormat('2021-2-2 10:10:11', 'YYYY-MM-DD HH:mm:ss'))
// console.log(timeFormat('2021/10/12 10:35:30', 'YYYY-MM-DD HH:mm:ss'))
// console.log(timeFormat(12315484, 'HH:mm:ss'))

// console.log(timeFormat(new Date()))
// console.log(timeFormat(new Date(), '[Y:] YYYY-MM-DD HH:mm:ss'))
// console.log(timeFormat(new Date(), 'YYYY/MM/DD HH:mm:ss'))
// console.log('=====================================')
// console.log(timeFormat(new Date(), 'YY-YYYY'))
// console.log(timeFormat(new Date(), 'M-MM-MMM-MMMM'))
// console.log(timeFormat(new Date(), 'D-DD'))
// console.log(timeFormat(new Date(), 'd-dd-ddd-dddd'))
// console.log(timeFormat(new Date(), 'H-HH-h-hh'))
// console.log(timeFormat(new Date(), 'a A'))
// console.log(timeFormat(new Date(), 'm-mm'))
// console.log(timeFormat(new Date(), 's-ss'))
// console.log(timeFormat(new Date(), 'SSS'))
