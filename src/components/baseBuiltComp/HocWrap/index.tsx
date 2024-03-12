import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from 'src/store'
import { URL, goTo, query } from "src/utils";
import showModal from "src/utils/extraUiEffect/easyModal";
import ForbiddenComp from 'src/components/baseBuiltComp/Forbidden'
import Loading from "../Loading";
import Guide from './components/guideInit'

/** @HOC 校验登陆态 */
export const Authorize = (Component) => {
  return React.memo(() => {
    const state = useSelector((root: RootState) => root.common.system)
    if (!state.coolStartSuccess) {
      return (
        <Loading isShow />
      )
    } else {
      if (state.sessionStatus === 'ok' && state.hasAccountCompleted)
        return <Component />
      return <Guide isLogin={state.sessionStatus === 'ok'} />
    }
  })
}

/** @HOC 禁止页面要求必须是已授权的 */
export const Forbidden = (Component) => {
  return React.memo(() => {
    const state = useSelector((root: RootState) => root.common)
    if (!state.system.coolStartSuccess) {
      return (
        <Loading isShow />
      )
    } else {
      if (state.userInfo.isBindManage)
        return <Component />
      return <ForbiddenComp />
    }
  })
}

/** @HOC 模态框提示登陆态 */
export const ModalNotify = (Component: any) => {
  return React.memo(() => {
    useEffect(() => {
      showModal({ title: '登录提示', content: '您当前还没有登陆，未登录无法正常使用小程序 现在去登陆吗？', cancelText: '稍后登陆', confirmText: '现在登陆' }).then(res => {
        if (res) {
          goTo({
            url: URL.Initial,
            methodType: 'redirectTo',
            extraParams: {
              ...query()
            },
            options: {
              authorize: false
            }
          })
        }
      })
    })
    return <Component />
  })
}


