import React from 'react'
import useRequest from 'src/hooks/useRequest'

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
  /** 页数 */
  page: number
  /** 搜索文字 */
  searchText?: string
  /** 更新函数 */
  updateList?: (lists: TTaskList) => void
  /** 请求函数 */
  requestFn?: ReturnType<typeof useRequest<TTaskList>>['run']
}

/** useState更新函数的类型 */
export type TStateHookUpdateFn<T> = React.Dispatch<React.SetStateAction<T>>
