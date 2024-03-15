import { View } from '@tarojs/components'
import React from 'react'
import useRequest from 'src/hooks/useRequest'
import { query, requestUrlCreator } from 'src/utils'
import Loading from 'src/components/baseBuiltComp/Loading'

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

  return (
    loading ? <Loading isShow={loading} /> : <View>loading结束了</View>
  )
}

export default React.memo(Index)
