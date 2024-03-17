import { Button, View } from '@tarojs/components'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { RootState, store } from 'src/store'
import { goTo, query } from 'src/utils'

const Index = () => {
  console.log(' === 到达 === ', query())
  const url = query()?.$fromPage as string
  const dispatch = useSelector(() => store.dispatch.common)
  const state = useSelector((root: RootState) => root.common)

  const back = useCallback(() => {
    /** 完善信息 */
    dispatch.update_SystemInfo({ ...state.system, sessionStatus: 'ok', hasAccountCompleted: true })
    /** 返回上一页 */
    goTo({ url, methodType: 'redirectTo', extraParams: { ...query() } })
  }, [])

  return (
    <View>
      <View>初始化页面</View>
      <Button onClick={back}>点击我</Button>
    </View>
  )
}

export default React.memo(Index)
