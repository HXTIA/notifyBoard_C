import { createContext } from 'react'
import { requestUrlCreator } from 'src/utils'
import { TPropsThrough } from './types'

/** context props透传 https://zh-hans.react.dev/learn/passing-data-deeply-with-context#  */
export const IndexContextProvider = createContext<TPropsThrough>({})

/** 列表数据的基础路径 */
export const getListInterUrl = requestUrlCreator({
  absolutePath: '/4182382-0-default/lists' /** TODO: 需要替换,mock路径 */,
})

/** 任务数据基础路径 */
export const taskInterUrl = requestUrlCreator({
  absolutePath: '/4182382-0-default/tasks',
})

/** 需要被订阅的模版 */
export const tplIds = [
  /** 作业提醒 */
  'X4et8qrCY9UA3yXAB1FfZ16UXOU4-2wglppSqYxTAII',
  /** 消息通知 */
  'V8JzyKTZZ16srBpi1QQMMUDCLMYzutIVvWGy8irgxiM',
]

/** 任务状态枚举 */
export const TASK_STATUS = {
  /** 有效期内 */
  UN_EXPIRED: 0,
  /** 即将过期 */
  CRITICALITY: 1,
  /** 已过期 */
  EXPIRED: 2,
  /** 已完成 */
  RESOLVED: 3,
}
