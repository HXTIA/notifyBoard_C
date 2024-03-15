import { Button, Canvas, CoverView, View } from '@tarojs/components'
import FORBIDDEN from 'src/static/SVG/forbidden.json'
import { $, loadAnimation } from 'src/utils'
import { useEffect } from 'react'
import './index.module.scss'

const Index = () => {
  useEffect(() => {
    setTimeout(() => {
      loadAnimation($('#ForbiddenContainer__bgContainer__canvas'), {
        animationData: FORBIDDEN,
      })
    }, 0)
  })
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
