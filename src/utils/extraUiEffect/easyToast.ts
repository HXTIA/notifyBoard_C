import Taro from '@tarojs/taro'
import { isObj, isStr } from '../jsBase'

/** toast入参类型 */
export type TToastOptions = Parameters<typeof Taro.showToast>[0]

/**
 * 页面消息提示
 *
 * 参数可直接传入字符串，也可传入配置对象
 */
const showToast = (param: TToastOptions | string) => {
  let dptOps: TToastOptions = {
    title: '注意',
    icon: 'none',
    duration: 2000,
    mask: true, //是否显示透明蒙层，防止触摸穿透
  }
  if (isStr(param)) {
    dptOps.title = param as string
  } else if (isObj(param)) {
    dptOps = {
      ...dptOps,
      ...(param as TToastOptions),
    }
  }
  return Promise.resolve(Taro.showToast(dptOps))
}

export { showToast }
