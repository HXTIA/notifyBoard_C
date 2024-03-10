import Taro from "@tarojs/taro"
import { showToast } from "../extraUiEffect"
import { buildUrl, parseUrl } from "./query"
import { trackGoToJump } from "../perfTrack"

/**
 * 可以支持的跳转类型
 *
 *  1. switchTab - 切换TAB页面
 *  2. reLaunch - 关闭所有页面打开某一页
 *  3. redirectTo - 重定向到某页面
 *  4. navigateTo - 普通跳转
 *  5. navigateBack - 返回上级页面
 * */
type TRouterJumpType = 'switchTab' | 'reLaunch' | 'redirectTo' | 'navigateTo' | 'navigateBack'

type TGoToParams = {
  url: string,
  methodType: TRouterJumpType,
  extraParams?: {
    [key in string]: string | number | boolean
  } & {
    cid?: string
  }
}

/** 跳转函数 */
export const goTo = ({
  url,
  methodType,
  extraParams
}: TGoToParams) => {
  const $jumpBegin = Date.now()
  const methodFn = Taro[methodType]

  /** 没有正确指定跳转类型 */
  if (!methodFn) {
    showToast({
      title: '跳转失败了，请重试',
      icon: 'error'
    })
    return
  }

  /** 被注入的参数 */
  let injectParams = {
    /** 跳转开始节点 */
    $jumpBegin,
    $page_xpos: extraParams?.cid || ''
  }
  if (extraParams) {
    injectParams = { ...injectParams, ...extraParams }
  }

  injectParams = {
    ...injectParams,
    ...parseUrl(url)
  }

  console.log(' === 跳转配置 === ', injectParams);

  const realUrl = url + buildUrl(injectParams)
  methodFn({
    url: realUrl,
    success: () => {
      const consumingTime = Date.now() - $jumpBegin
      // 跳转埋点
      trackGoToJump({ cid: extraParams?.cid || '', extraParams: { time: consumingTime, path: realUrl } })
    }
  })
}
