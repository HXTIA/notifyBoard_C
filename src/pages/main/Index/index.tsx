import { View, Text } from '@tarojs/components'
import React, { useCallback, useEffect, useState } from 'react'
import useRequest from 'src/hooks/useRequest'
import Loading from 'src/components/baseBuiltComp/Loading'
import { Authorize } from 'src/components/baseBuiltComp/HocWrap'
import TaskList from './components/Tasklist/task-list'
import TaskFilter from './components/Tasklist/task-filter'
import { TFilterType, TTaskList } from './types'
import { IndexContextProvider, getListInterUrl } from './common'
import './index.module.scss'

const Index = () => {
  /** 列表项 */
  const [lists, setList] = useState<TTaskList>()
  /** 筛选规则 */
  const [filterType, setFilterType /** TODO: 透传给筛选组件 */] = useState<TFilterType>('all')
  const { data, loading, run } = useRequest<TTaskList>(() => ({
    type: 'Get',
    url: getListInterUrl,
    silent: true,
    reqData: {
      /** TODO: 需要更新名字 */
      filterType,
    },
  }))
  useEffect(() => {
    setList(data)
  }, [data])

  /** 透传自组件更新列表数据 */
  const updateList = useCallback((list: TTaskList) => {
    setList(list)
  }, [])

  useEffect(() => {
    console.log(' === 筛选类型变化，即将请求 === ')
    run()
  }, [filterType])

  // useEffect(() => {
  //   showModal({
  //     title: '监测到您还没有订阅',
  //     content: '您需要订阅'
  //   }).then(res => {
  //     subscribe({
  //       tplId: ['V8JzyKTZZ16srBpi1QQMMUDCLMYzutIVvWGy8irgxiM']
  //     })
  //   })
  // }, [])

  return (
    <IndexContextProvider.Provider
      value={{
        updateList,
        filterType,
      }}
    >
      <View className='index_wrapper'>
        <View className='header-image'>大头图</View>
        <View className='search'>搜索框</View>
        <View className='title_wrapper'>
          <Text className='title_wrapper__text'>作业列表</Text>
          <View>
            <TaskFilter setFilterType={setFilterType} /> {/** 用来加筛选 */}
          </View>
        </View>
        <View className='lists'>
          {loading ? <Loading isShow /> : <TaskList lists={lists as TTaskList} />}
        </View>
      </View>
    </IndexContextProvider.Provider>
  )
}

export default React.memo(Authorize(Index))
