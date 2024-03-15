import { Canvas, View } from '@tarojs/components'
import { Button } from '@taroify/core'
import React, { useCallback, useEffect, useMemo } from 'react'
import { $, URL, goTo, loadAnimation, query } from 'src/utils'
import NoFound from 'src/static/SVG/404.json'
import './guide.module.scss'

const NO_LOGIN = '您当前还未登录，登陆后才可访问作业提醒'
const NO_INFO = '您还没有完善组织信息，无法拉取数据'

const Index = ({ isLogin }: { isLogin: boolean }) => {
  useEffect(() => {
    setTimeout(() => {
      loadAnimation($('#ErrorContainer__bgContainer__canvas'), { animationData: NoFound })
    }, 0)
  })
  const notifyText = useMemo(() => !isLogin ? NO_LOGIN : NO_INFO, [isLogin])
  const notifyBtnText = useMemo(() => !isLogin ? '去登陆' : '去完善', [isLogin])
  const goToPage = useCallback(() => {
    const targetPage = isLogin ? URL.SettingUserinfo : URL.Initial
    goTo({
      url: targetPage,
      methodType: 'navigateTo',
      extraParams: {
        ...query()
      },
      options: {
        authorize: false
      }
    })
  }, [isLogin])

  return (
    <View className='ErrorContainer'>
      <View className='ErrorContainer__bgContainer'>
        <Canvas
          className='ErrorContainer__bgContainer__canvas'
          id='ErrorContainer__bgContainer__canvas'
          type='2d'
        ></Canvas>
        <View className='ErrorContainer__bgContainer__title'>{notifyText}</View>
        <Button onClick={goToPage}>{notifyBtnText}</Button>
      </View>
    </View>
  )
}


export default React.memo(Index)
