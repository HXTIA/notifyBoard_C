// import { View, Text } from '@tarojs/components'
// import React, { useCallback, useEffect, useState } from 'react'
// import useRequest from 'src/hooks/useRequest'
// import Loading from 'src/components/baseBuiltComp/Loading'
// import { Authorize } from 'src/components/baseBuiltComp/HocWrap'
// import TaskList from './components/Tasklist/task-list'
// import TaskFilter from './components/Tasklist/task-filter'
// import TaskSearch from './components/Tasklist/task-search'
// import { TFilterType, TTaskList } from './types'
// import { IndexContextProvider, getListInterUrl } from './common'
// import './index.module.scss'

// const Index = () => {
//   /** 列表项 */
//   const [lists, setList] = useState<TTaskList>()
//   /** 筛选规则 */
//   const [filterType, setFilterType /** TODO: 透传给筛选组件 */] = useState<TFilterType>('all')
//   const { data, loading, run } = useRequest<TTaskList>(() => ({
//     type: 'Get',
//     url: getListInterUrl,
//     silent: true,
//     reqData: {
//       /** TODO: 需要更新名字 */
//       filterType,
//       /** TODO: 页面 */
//       page: 0
//     },
//   }))
//   useEffect(() => {
//     setList(data)
//   }, [data])

//   /** 透传自组件更新列表数据 */
//   const updateList = useCallback((list: TTaskList) => {
//     setList(list)
//   }, [])

//   useEffect(() => {
//     console.log(' === 筛选类型变化，即将请求 === ')
//     run({ filterType, page: 0 })
//   }, [filterType])

//   // useEffect(() => {
//   //   showModal({
//   //     title: '监测到您还没有订阅',
//   //     content: '您需要订阅'
//   //   }).then(res => {
//   //     subscribe({
//   //       tplId: ['V8JzyKTZZ16srBpi1QQMMUDCLMYzutIVvWGy8irgxiM']
//   //     })
//   //   })
//   // }, [])

//   return (
//     <IndexContextProvider.Provider
//       value={{
//         updateList,
//         filterType,
//       }}
//     >
//       <View className='index_wrapper'>
//         <View className='search'>
//           <TaskSearch />
//         </View>
//         <View className='title_wrapper'>
//           <Text className='title_wrapper__text'>作业列表</Text>
//           <View>
//             <TaskFilter setFilterType={setFilterType} /> {/** 用来加筛选 */}
//           </View>
//         </View>
//         <View className='lists'>
//           {loading ? <Loading isShow /> : <TaskList lists={lists as TTaskList} setPage={set} />}
//         </View>
//       </View>
//     </IndexContextProvider.Provider>
//   )
// }

// export default React.memo(Index)

import { View, Text } from '@tarojs/components'
import React, { useCallback, useEffect, useState } from 'react'
import useRequest from 'src/hooks/useRequest'
import Loading from 'src/components/baseBuiltComp/Loading'
import useUpdateEffect from 'src/hooks/useUpdateEffect'
import TaskList from './components/Tasklist/task-list'
import TaskFilter from './components/Tasklist/task-filter'
import TaskSearch from './components/Tasklist/task-search'
import { TFilterType, TTaskList } from './types'
import { IndexContextProvider, getListInterUrl } from './common'
import './index.module.scss'

const Index = () => {
  /** 透传：列表项 */
  const [lists, setList] = useState<TTaskList>()
  /** 透传：筛选规则 */
  const [filterType, setFilterType /** TODO: 透传给筛选组件 */] = useState<TFilterType>('all')
  /** 透传：当前页数 */
  const [page, setPage] = useState(0)
  /** 透传：搜索的文字 */
  const [searchText, setSearchText] = useState('')
  /** 透传：请求能力 */
  const { loading, run } = useRequest<TTaskList>(
    () => ({
      type: 'Get',
      url: getListInterUrl,
      silent: true,
      reqData: {
        /** TODO: 需要更新名字 */
        filterType,
        /** TODO: 页数 */
        page,
        /** TODO: 筛选文字 */
        searchText,
      },
    }),
    { auto: false, deps: [filterType, page, searchText] },
  )

  /** mounted请求初始化数据 */
  useEffect(() => {
    // setList(data)
    run().then((res) => {
      setList(res)
    })
  }, [])

  /** 透传至组件更新列表数据 */
  const updateList = useCallback((list: TTaskList) => {
    setList(list)
  }, [])

  useUpdateEffect(() => {
    console.log(' === 筛选类型变化，即将请求 === ')
    run({ page: 0, searchText: '' }).then((res) => {
      setList(res)
      setPage(0)
    })
  }, [filterType])

  return (
    <IndexContextProvider.Provider
      value={{
        filterType,
        page,
        searchText,
        requestFn: run,
        updateList,
      }}
    >
      <View className='index_wrapper'>
        <View className='search'>
          <TaskSearch setSearchText={setSearchText} setPage={setPage} />
        </View>
        <View className='title_wrapper'>
          <Text className='title_wrapper__text'>作业列表</Text>
          <View>
            <TaskFilter setFilterType={setFilterType} /> {/** 用来加筛选 */}
          </View>
        </View>
        <View className='lists'>
          <Loading isShow={loading} isCover={false} />
          <TaskList lists={lists as TTaskList} setPage={setPage} />
        </View>
      </View>
    </IndexContextProvider.Provider>
  )
}

export default React.memo(Index)
