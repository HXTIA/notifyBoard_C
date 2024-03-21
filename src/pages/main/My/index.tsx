import { View, Text } from '@tarojs/components'
import { URL, goTo } from 'src/utils'
import './index.module.scss'

const Index = () => {
  return (
    <View className='index'>
      <Text>我的页面</Text>
      <View className='list'>
        <View
          className='list__item'
          onClick={() => goTo({ url: URL.Setting, methodType: 'navigateTo' })}
        >
          去设置
        </View>
      </View>
    </View>
  )
}

export default Index
