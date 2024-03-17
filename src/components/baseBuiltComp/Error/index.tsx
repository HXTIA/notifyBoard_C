import { Canvas, CoverView, View } from '@tarojs/components'
import { Button } from '@taroify/core'
import { $ } from 'src/utils'
import useAnimation from 'src/hooks/useAnimation'
import { JSON_MAP } from 'src/static/SVG/lottie-map'
import './index.module.scss'


const Index = () => {
  useAnimation({
    node: $('#ErrorContainer__bgContainer__canvas'),
    template: JSON_MAP['404']
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
