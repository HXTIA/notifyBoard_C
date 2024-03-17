import { Canvas, View } from '@tarojs/components'
import { $ } from 'src/utils'
import classnames from 'classnames'
import React, { useEffect } from 'react'
import useAnimation from 'src/hooks/useAnimation'
import { JSON_MAP } from 'src/static/SVG/lottie-map'
import './index.module.scss'

/** 组件透传参数 */
type TIndexProps = {
  /** 是否展示 */
  isShow: boolean;
  /** 是否采用动画覆盖整个屏幕 */
  isCover?: boolean;
}

const LOADING_AVG = ['loading1', 'loading2', 'loading3', 'loading4', 'loading5', 'loading6', 'loading7']
const Index = ({ isShow, isCover = true }: TIndexProps) => {
  const random = ~~((Math.random() + 1) * LOADING_AVG.length) % LOADING_AVG.length
  const { run } = useAnimation({
    node: $('#LoadingContainer__bgContainer__canvas'),
    template: JSON_MAP[LOADING_AVG[random]],
    isAutoRun: false
  })
  useEffect(() => {
    isShow && run()
  }, [isShow])

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
