import { View } from '@tarojs/components'
import React, { useEffect } from 'react'
import { URL, goTo, query } from 'src/utils'
import './index.module.scss'

const Index = () => {
  // const storage = query()
  // const { data, loading, err, run } = useRequest(
  //   () => ({
  //     url: requestUrlCreator({ absolutePath: '/detail' }),
  //     type: 'Get',
  //     reqData: {
  //       id: storage?.id
  //     },
  //     silent: true
  //   }), { auto: true }
  // )
  // console.log(query());
  useEffect(() => {
    // console.log('我调用了一次', query());
  }, [])
  return (
    // loading ? <Loading isShow={loading} /> : <View>loading结束了</View>
    <View onClick={() => goTo({ url: URL.Setting, methodType: 'navigateTo' })}>loading结束了</View>
  )
}

export default React.memo(Index)
