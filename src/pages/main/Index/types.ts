/** 任务的类型 */
export type TTaskItem = {
  title: string
  time: number
  desc: string
  /** 当前任务状态 */
  status: 0 | 1 | 2
  /** 当前任务ID */
  id: number
}

/** 任务列表的类型 */
export type TTaskList = TTaskItem[]

/**
 * 筛选模式
 * - all 不筛选
 * - resolve 已完成
 * - timeout 已过期
 * - un_expired 有效的
 */
export type TFilterType = 'all' | 'resolve' | 'timeout' | 'un_expired'

/** 祖先组件provider透传类型定义 */
export type TPropsThrough = {
  /** 当前的筛选模式 */
  filterType?: TFilterType
  /** 更新函数 */
  updateList?: (lists: TTaskList) => void
  /** 请求函数 */
  // requestFn?: Function
}
