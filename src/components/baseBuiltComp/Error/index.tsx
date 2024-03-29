import { Canvas, CoverView, View } from '@tarojs/components'
import { Button } from '@taroify/core'
import { useDidShow } from '@tarojs/taro'
import { $, loadAnimation } from 'src/utils'
import NoFound from 'src/static/SVG/404.json'
import './index.module.scss'

const Index = () => {
  useDidShow(() => {
    setTimeout(() => {
      loadAnimation($('#ErrorContainer__bgContainer__canvas'), { animationData: NoFound })
    }, 0)
  })
  return (
    <View className='ErrorContainer'>
      <View className='ErrorContainer__bgContainer'>
        <Canvas
          className='ErrorContainer__bgContainer__canvas'
          id='ErrorContainer__bgContainer__canvas'
          type='2d'
        ></Canvas>
        <CoverView className='ErrorContainer__bgContainer__title'>
          页面未找到捏？点击一下我们回去吧！
        </CoverView>
        <Button>点击</Button>
      </View>
    </View>
  )
}

export default Index
