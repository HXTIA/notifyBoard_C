import { Button, View } from '@tarojs/components'
import React, { FC, useCallback, useContext, useMemo, useState } from 'react'
import { Divider, Empty, List, PullRefresh } from '@taroify/core'
import TaskItem from './task-item'
import { TStateHookUpdateFn, TTaskItem, TTaskList } from '../../types'
import { IndexContextProvider } from '../../common'
import './list.module.scss'

const Index: FC<{ lists: TTaskList; setPage: TStateHookUpdateFn<number> }> = ({
  lists,
  setPage,
}) => {
  /** 获取context透传 */
  const { updateList, filterType, page, requestFn } = useContext(IndexContextProvider)
  /** 是否正在刷新 */
  const [isRefresh, setRefreshStatus] = useState<boolean>(false)
  /** 能否展示列表 */
  const isCanShowList = useMemo(() => lists && lists.length, [lists])

  /** 加载函数：下拉刷新 */
  const pullDownRefreshList = useCallback(async () => {
    console.log(' === 下拉刷新ing === ')
    setRefreshStatus(true)
    const res = await requestFn!({ page: 0 })
    setTimeout(() => {
      setRefreshStatus(false)
      console.log(' === 下拉刷新结束 === ')
      setPage(0)
    }, 200)
    if (res) {
      updateList!(res)
    }
  }, [requestFn, setPage, updateList])

  /** 加载函数：触底加载「目前通过点击按钮触发」 */
  const pullUpLoad = useCallback(async () => {
    if (page < 0 || isRefresh) {
      return
    }
    console.log(' === 继续加载ing === ')
    /** 使用Mutex锁节流请求 */
    setRefreshStatus(true)
    const res = await requestFn!({ page: page + 1 })
    if (res && res.length) {
      /** 更新数据 & 设置当前页 */
      updateList!([...lists, ...res])
      setPage(page + 1)
      /** 解除Mutex锁 */
      setRefreshStatus(false)
    } else {
      console.log(' === 加载结束到底了 === ')
      setPage(-1)
    }
  }, [page, isRefresh, requestFn, updateList, lists, setPage])

  /**
   * 任务细则处理函数
   *
   * *这里只做ui级别的承接，实际上删除、重启、完成仍然依赖接口*
   */
  const handleTaskItemEvents = useCallback(
    async (events: 'delete' | 'resolve' | 'reopen', taskinfo: TTaskItem) => {
      const index = lists.findIndex((v) => v.id === taskinfo.id)
      /** TODO: 求最优解。当前在长列表的背景下会容易卡顿。尝试虚拟列表？ */
      /** 因为不能直接修改lists，react会判定引用没有变化即使使用setState也不会变化 */
      const copiedList = lists.map((v) => v)
      if (index < 0) {
        console.log(' === 任务索引错误，退出 === ', taskinfo)
        return
      }
      switch (events) {
        case 'delete':
        case 'resolve': {
          /** 删除和完成本质上逻辑都是从现存列表中删除 */
          copiedList.splice(index, 1)
          break
        }

        case 'reopen': {
          copiedList.splice(index, 1)
          /** 如果是默认筛选模式 => 删完之后插到第一个 */
          if (filterType === 'all') {
            copiedList.unshift(taskinfo)
          }
        }
      }

      console.log(
        ` === 列表更新，本次触发类型 ${events}，变化后列表：${JSON.stringify(copiedList)} === `,
      )
      updateList!(copiedList)
    },
    [filterType, lists, updateList],
  )
  return (
    <PullRefresh loading={isRefresh} onRefresh={pullDownRefreshList}>
      {/* TODO: 暂时取消上拉加载 */}
      <List>
        {
          /** 要求lists存在并且长度>0 */
          isCanShowList ? (
            <>
              {lists.map((v, index) => {
                return (
                  <View key={index}>
                    <TaskItem taskInfo={v} handleEvents={handleTaskItemEvents} />
                  </View>
                )
              })}
              {/* 没有更多页面了，增加分割线 */}
              {page < 0 ? (
                <Divider
                  style={{
                    color: '#99e64d' /** TODO: 换颜色 */,
                    borderColor: '#1989fa',
                    padding: '0 30rpx',
                    margin: '0',
                    paddingBottom: '40rpx',
                  }}
                >
                  到底了呦~
                </Divider>
              ) : (
                /* 用来兜底用户删了过多元素，从而无法触发触底的case */
                <Button onClick={pullUpLoad}>加载更多</Button>
              )}
            </>
          ) : (
            /** lists不存在或lists长度为0 */
            <Empty>
              <Empty.Image />
              <Empty.Description>暂时没有更多了</Empty.Description>
            </Empty>
          )
        }
      </List>
    </PullRefresh>
  )
}

export default React.memo(Index)
