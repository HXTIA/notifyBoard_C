import { Button, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React from 'react'
import { goTo, isTabBarPage, query } from 'src/utils'

const Index = () => {
  console.log(' === 到达 === ', query())
  const url = query()?.$fromPage as string
  const methodType = isTabBarPage(url) ? 'switchTab' : 'redirectTo'

  return (
    <View>
      <View>初始化页面</View>
      <Button onClick={() => goTo({ url, methodType, extraParams: { ...query() } })}>点击我</Button>
    </View>
  )
}

export default React.memo(Index)
