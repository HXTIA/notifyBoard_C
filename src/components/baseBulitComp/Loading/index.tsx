import { Canvas, View } from '@tarojs/components'
import { useDidShow } from '@tarojs/taro'
import { $, loadAnimation } from 'src/utils/animation'
import loading1 from 'src/static/SVG/loading1.json'
import loading2 from 'src/static/SVG/loading2.json'
import loading3 from 'src/static/SVG/loading3.json'
import loading4 from 'src/static/SVG/loading4.json'
import loading5 from 'src/static/SVG/loading5.json'
import loading6 from 'src/static/SVG/loading6.json'
import loading7 from 'src/static/SVG/loading7.json'
import './index.module.scss'


const LOADING_AVG = [loading1, loading2, loading3, loading4, loading5, loading6, loading7]
const Index = (props: { isShow: boolean }) => {
  useDidShow(() => {
    setTimeout(() => {
      const random = ~~((Math.random() + 1) * LOADING_AVG.length) % LOADING_AVG.length
      if (props.isShow) {
        loadAnimation($('#LoadingContainer__bgContainer__canvas'), {
          animationData: LOADING_AVG[random],
        })
      }
    }, 0)
  })
  return (
    props.isShow ? (
      <>
        <View className='LoadingContainer'>
          <View className='LoadingContainer__bgContainer'>
            <Canvas
              className='LoadingContainer__bgContainer__canvas'
              id='LoadingContainer__bgContainer__canvas'
              type='2d'
            ></Canvas>
          </View>
        </View>
      </>
    ) : <></>
  )
}

export default Index