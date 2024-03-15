import { View, Text, Canvas } from '@tarojs/components'
import { useSelector } from 'react-redux'
import { Button } from '@taroify/core'
import { URL } from 'src/utils/const'
import { RootState } from 'src/store'
import { goTo, showLoading, showToast } from 'src/utils/index'
import Loading from 'src/components/baseBuiltComp/Loading'
import './index.scss'

const Index = () => {
  const state = useSelector((state1: RootState) => state1.common)

  // easyLoading.show("加载中...")
  // easyLoading.hide()
  // easyToast("你好")
  // showToast({title:"好好好",icon:"success"})

  return (
    <View className='index_wrapper'>
      <Text>Hello world1212121!-- {state.userInfo.token}</Text>
      <Button onClick={() => goTo({ url: URL.Detail, methodType: 'navigateTo', extraParams: { id: 12 } })}>去详细界面</Button>
      <Loading isShow={false} />
    </View>
  )
}

export default Index
