import { Canvas, View } from '@tarojs/components'
import { useDidShow } from '@tarojs/taro'
import { $, loadAnimation } from 'src/utils'
import classnames from 'classnames'
import React from 'react'
import loading1 from 'src/static/SVG/loading1.json'
import loading2 from 'src/static/SVG/loading2.json'
import loading3 from 'src/static/SVG/loading3.json'
import loading4 from 'src/static/SVG/loading4.json'
import loading5 from 'src/static/SVG/loading5.json'
import loading6 from 'src/static/SVG/loading6.json'
import loading7 from 'src/static/SVG/loading7.json'
import './index.module.scss'

/** 组件透传参数 */
type TIndexProps = {
  /** 是否展示 */
  isShow: boolean;
  /** 是否采用动画覆盖整个屏幕 */
  isCover?: boolean;
}

const LOADING_AVG = [loading1, loading2, loading3, loading4, loading5, loading6, loading7]
const Index = ({ isShow, isCover = true }: TIndexProps) => {
  useDidShow(() => {
    setTimeout(() => {
      const random = ~~((Math.random() + 1) * LOADING_AVG.length) % LOADING_AVG.length
      if (isShow) {
        loadAnimation($('#LoadingContainer__bgContainer__canvas'), {
          animationData: LOADING_AVG[random],
        })
      }
    }, 0)
  })
  return (
    isShow ? (
      <>
        <View className={classnames('LoadingContainer', { 'NoCoverShow': isCover })}>
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

export default React.memo<TIndexProps>(Index)
