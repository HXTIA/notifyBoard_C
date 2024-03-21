import { Button, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { IUserInfo } from 'src/common-model'
import usePerfTrack from 'src/hooks/usePerfTrack'
import useRequest from 'src/hooks/useRequest'
import { RootState, store } from 'src/store'
import {
  getStorage,
  goTo,
  isTabBarPage,
  query,
  requestUrlCreator,
  showToast,
  trackAPIError,
} from 'src/utils'
import request from 'src/utils/request'
import OrgInit from './components/orgInit'

const Index = () => {
  console.log(' === 到达 === ', query())
  const url = query()?.$fromPage as string
  const dispatch = useSelector(() => store.dispatch.common)
  const state = useSelector((root: RootState) => root.common)

  const PerfTackerInstance = usePerfTrack()
  const toLogin = () => {
    Taro.login({
      success: async function (res) {
        if (res.code) {
          console.log(' === wx登陆成功 === ', res.code)

          /** 请求开始 */
          PerfTackerInstance.requestBegin()
          const loginUrl = requestUrlCreator({ absolutePath: '/login' })
          const result: any = await request['Post']({
            url: loginUrl,
            data: { code: res.code },
            silent: false,
          })

          /** 校验是否成功 */
          if (result.isSuccess) {
            /** 请求完成 */
            PerfTackerInstance.responseReady({ api: loginUrl, data: result.data as any })
            console.log('请求结果：', result.data)
            // setStorage('userInfo', { token: result.data.token })
            dispatch.update_UserInfo({ ...state.userInfo, token: result.data.token })
            console.log('token =', getStorage<IUserInfo>('userInfo').token)
            console.log('state', store.getState().common.userInfo.token)
          } else {
            /** 上报错误埋点 */
            trackAPIError({
              token: getStorage<IUserInfo>('userInfo').token || 'noLogin',
              api: loginUrl,
              reqData: res.code,
              errMsg: res.code,
            })
          }
        } else {
          showToast({ title: '登录失败', icon: 'error' })
        }
      },
      fail: function () {
        showToast({ title: '登录失败', icon: 'error' })
      },
    })
  }

  // 检查本地存储有无token
  if (!!getStorage<IUserInfo>('userInfo').token) {
    // 有token，判断微信登录态是否过期
    Taro.checkSession({
      success: function () {
        //session_key 未过期，并且在本生命周期一直有效
        console.log(' === session_key 未过期 === ')
      },
      fail: function () {
        // session_key 已经失效，需要重新执行登录流程
        // 过期，拉起微信登录，重新登录
        toLogin()
      },
    })
  } else {
    // 无token，拉起微信登录
    toLogin()
  }

  // 未过期，请求用户信息，有无组织，年级，班级，头像昵称，课程信息

  // 未完善，跳转到初始化页面

  // 完善，全量参数透传跳转到目标页面
  const back = useCallback(() => {
    /** 完善信息 */
    dispatch.update_SystemInfo({ ...state.system, sessionStatus: 'ok', hasAccountCompleted: true })
    /** 判断上一页是否为tabbar */
    const methodType = isTabBarPage(url) ? 'switchTab' : 'redirectTo'
    /** 返回上一页 */
    goTo({ url, methodType, extraParams: { ...query() } })
  }, [dispatch, state.system, url])

  return (
    <View>
      <OrgInit></OrgInit>
      <Button onClick={back}>点击我</Button>
    </View>
  )
}

export default React.memo(Index)
