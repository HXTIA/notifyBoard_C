import Taro from '@tarojs/taro'

/** 标准事件埋点 */
export type TTrackEventParams = {
  eventId: string,
  cid?: string,
  extraParams?: {
    [key in string]: any
  }
} & {
    [key in string]: any
  }

/** 埋点函数 */
export const trackEvent = (params: TTrackEventParams) => {
  console.log(' ===== 埋点函数 =====');
  // 埋点依赖请求库....
  Taro.reportEvent(params.eventId, {
    ...params.extraParams
  })
}

/** 打印埋点信息 */
export const blockConsole = (
  { type, name, time }:
    { type: 'perf' | 'custom', name: string, time: number }
) =>
  console.log(
    `%c-> ${type === 'custom' ? '自定义埋点' : '性能埋点'} ${name} 耗时: %c${time} ms`,
    `background-color: ${'#d4c39e'}; color: ${'#333333'}; padding: 0 0 0 8px; border-radius: 2px`,
    `color: ${'#d4c39e'}; font-size: 12px; padding: 0 8px;`
  )
