import Taro, { Current, Page } from "@tarojs/taro"

/** 获得页面栈 */
export const getPages = (): Page[] => Taro.getCurrentPages()

/** 获得当前页面(栈顶页面) */
export const getCurrentPage = (): Page => {
  const queue = getPages()
  return queue[queue.length - 1]
}

/** 获得当前页面实例 */
export const getCurrentPageInstance = (): Current => Taro.getCurrentInstance()
