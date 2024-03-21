import { Canvas, View } from '@tarojs/components'
import { Button } from '@taroify/core'
import React, { useCallback, useMemo, useEffect } from 'react'
import { $, URL, goTo, query } from 'src/utils'
import { JSON_MAP } from 'src/static/SVG/lottie-map'
import useAnimation from 'src/hooks/useAnimation'
import './guide.module.scss'

const NO_LOGIN = '您当前还未登录，登陆后才可访问作业提醒'
const NO_INFO = '您还没有完善组织信息，无法拉取数据'

const Index = ({ isLogin }: { isLogin: boolean }) => {
  const { run } = useAnimation({
    node: $('#GuideContainer__bgContainer__canvas'),
    template: JSON_MAP['forbidden'],
    isAutoRun: false,
  })
  useEffect(() => {
    run()
  }, [])
  const notifyText = useMemo(() => (!isLogin ? NO_LOGIN : NO_INFO), [isLogin])
  const notifyBtnText = useMemo(() => (!isLogin ? '去登陆' : '去完善'), [isLogin])
  const goToPage = useCallback(() => {
    goTo({
      url: URL.Initial,
      methodType: 'redirectTo',
      extraParams: {
        ...query(),
      },
      options: {
        authorize: false,
      },
    })
  }, [])

  return (
    <View className='GuideContainer'>
      <View className='GuideContainer__bgContainer'>
        <Canvas
          className='GuideContainer__bgContainer__canvas'
          id='GuideContainer__bgContainer__canvas'
          type='2d'
        ></Canvas>
        <View className='GuideContainer__bgContainer__title'>{notifyText}</View>
        <Button onClick={goToPage}>{notifyBtnText}</Button>
      </View>
    </View>
  )
}

export default React.memo(Index)
