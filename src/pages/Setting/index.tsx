import { View, Text } from '@tarojs/components'
import { URL, goTo } from 'src/utils'
import './index.module.scss'

const targetPage = [
  {
    text: '☑️课程选择',
    url: URL.SettingCourse,
  },
  {
    text: '👂反馈一下',
    url: URL.SettingFeedback,
  },
  {
    text: '📢通知管理',
    url: URL.SettingNotify,
  },
  {
    text: '💻用户信息',
    url: URL.SettingUserinfo,
  },
]

const Index = () => {
  return (
    <View className='index'>
      <Text onClick={() => goTo({ methodType: 'navigateBack' })}>设置页面</Text>
      <View className='list'>
        {targetPage.map((v) => {
          return (
            <View
              className='list__item'
              onClick={() => goTo({ url: v.url, methodType: 'navigateTo' })}
              key={v.url}
            >
              {v.text}
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default Index
