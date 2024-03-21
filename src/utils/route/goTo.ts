import Taro from '@tarojs/taro'
import { store } from 'src/store'
import { config } from 'src/config'
import { showToast } from '../extraUiEffect'
import { buildUrl, parseUrl } from './query'
import { trackGoToJump } from '../perfTrack'
import { isStr } from '../jsBase'
import { getCurrentPage, getPages } from './page'

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

export type TGoToParams = {
  /** 目标页面 */
  url?: string
  methodType: TRouterJumpType
  /** 额外透传参数 */
  extraParams?: {
    [key in string]: string | number | boolean | undefined
  } & {
    /** 运营点位 */
    cid?: string
  }
  /** 配置项 */
  options?: {
    /** 是否校验登陆态 */
    authorize?: boolean
  }
}

/** 跳转函数 */
export const goTo = ({
  url,
  methodType,
  options = { authorize: true },
  extraParams,
}: TGoToParams) => {
  const $jumpBegin = Date.now()
  const methodFn = Taro[methodType]

  /** 没有正确指定跳转类型 */
  if (!methodFn) {
    showToast({
      title: '跳转失败了，请重试',
      icon: 'none',
    })
    return
  }

  /** 校验是否登陆 */
  if (options.authorize) {
    const token = store.getState()?.common?.userInfo?.token
    if (!token || !isStr(token)) {
      /** 理论来说不需要校验checkSession，因为HOC会处理没token，如果没登陆态都走不到这里 */
      showToast({
        title: '您当前还没有登陆',
      })
      return
    }
  }

  /** 被注入的参数 */
  let injectParams = {
    /** 跳转开始节点 */
    $jumpBegin,
    $page_xpos: extraParams?.cid || '',
    $fromPage: ('/' + getCurrentPage().route) as string,
  }
  if (extraParams) {
    injectParams = { ...extraParams, ...injectParams }
  }

  injectParams = {
    ...injectParams,
    ...parseUrl(url || ''),
  }

  const [baseUrl] = (url || '').split('?')
  console.log(' === 跳转配置 === ', injectParams)

  const realUrl = baseUrl + buildUrl(injectParams)
  methodFn({
    url: realUrl,
    success: () => {
      const consumingTime = Date.now() - $jumpBegin
      // 跳转埋点
      trackGoToJump({
        cid: extraParams?.cid || '',
        extraParams: { time: consumingTime, path: realUrl },
      })
    },
    complete() {
      setTimeout(() => {
        console.log(' === 当前页面栈现存 === ', getPages())
      }, 100)
    },
  })
}

/** 返回判定目标页面是否为一个tabBar页面 */
export const isTabBarPage = (url: string): boolean => {
  url = url.charAt(0) === '/' ? url.substring(1, url.length) : url
  const reg = new RegExp(url)
  const { tabBar } = config
  const list = tabBar?.list || []
  return list.some(({ pagePath }) => pagePath.match(reg))
}
