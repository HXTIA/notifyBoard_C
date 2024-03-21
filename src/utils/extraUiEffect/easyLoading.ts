import Taro from '@tarojs/taro'
import { isObj, isStr } from '../jsBase'

export type TLoadingOptions = Parameters<typeof Taro.showLoading>[0]

/**
 * 显示Loading
 *
 * 参数可直接传入字符串，也可传入配置对象
 */
const showLoading = (param: TLoadingOptions | string) => {
  let dptOps: TLoadingOptions = {
    title: '加载中...',
    mask: true, //是否显示透明蒙层，防止触摸穿透
  }
  if (isStr(param)) {
    dptOps.title = param as string
  } else if (isObj(param)) {
    dptOps = {
      ...dptOps,
      ...(param as TLoadingOptions),
    }
  }
  return Taro.showLoading(dptOps)
}

/** 隐藏loading */
const hideLoading = (delay: number = 2000) => {
  delay < 300 && (delay = 0)
  setTimeout(() => {
    Taro.hideLoading()
  }, delay)
}

export { showLoading, hideLoading }
