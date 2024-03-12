import { View, Text, Canvas } from '@tarojs/components'
import React, { useEffect } from 'react'
import { ModalNotify } from 'src/components/baseBuiltComp/HocWrap'
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

  return (
    // loading ? <Loading isShow={loading} /> : <View>loading结束了</View>
    <View>loading结束了</View>
  )
}

export default React.memo(ModalNotify(Index))
