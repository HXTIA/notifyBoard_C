import { Button, Canvas, CoverView, View } from '@tarojs/components'
import { $ } from 'src/utils'
import useAnimation from 'src/hooks/useAnimation'
import { JSON_MAP } from 'src/static/SVG/lottie-map'
import { useEffect } from 'react'
import './index.module.scss'

const Index = () => {
  const { run, instance } = useAnimation({
    node: $('#ForbiddenContainer__bgContainer__canvas'),
    template: JSON_MAP['forbidden'],
    isAutoRun: false,
  })
  useEffect(() => {
    run()
    // setTimeout(() => {
    //   instance?.pause()
    // }, 4000);
  }, [instance])
  return (
    <View className='ForbiddenContainer'>
      <View className='ForbiddenContainer__bgContainer'>
        <Canvas
          className='ForbiddenContainer__bgContainer__canvas'
          id='ForbiddenContainer__bgContainer__canvas'
          type='2d'
        ></Canvas>
        <CoverView className='ForbiddenContainer__bgContainer__title'>
          SRY 你没有权限访问该页面
        </CoverView>
        <Button>返回主页（退一步海阔天空）</Button>
      </View>
    </View>
  )
}

export default Index
