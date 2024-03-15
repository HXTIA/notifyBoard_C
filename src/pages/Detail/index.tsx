import { View } from '@tarojs/components'
import React from 'react'
import useRequest from 'src/hooks/useRequest'
import { query, requestUrlCreator } from 'src/utils'
import Loading from 'src/components/baseBuiltComp/Loading'
import { ModalNotify } from 'src/components/baseBuiltComp/HocWrap'

const Index = () => {
  const storage = query()
  const { data, loading, err, run } = useRequest(
    () => ({
      url: requestUrlCreator({ absolutePath: '/detail' }),
      type: 'Get',
      reqData: {
        id: storage?.id
      },
      silent: true
    }), { auto: true }
  )

  console.log(query());

  return (
    loading ? <Loading isShow={loading} /> : <View>loading结束了</View>
  )
}

export default React.memo(ModalNotify(Index))
