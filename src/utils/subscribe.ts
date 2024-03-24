import Taro from '@tarojs/taro'
import { store } from 'src/store'
import { ISystemInfo } from 'src/common-model'
import { showModal, showToast } from './extraUiEffect'
import { URL, goTo } from './route'

type TSubscribeOptions = {
  tplId: string[]
}

const handleFailAuth = async (osStorage: ISystemInfo) => {
  const res = await showModal({
    title: '📢 通知提醒',
    content: '不开启授权将永远不会接收到作业推送，现在要去开启通知嘛？',
  })

  if (res) {
    goTo({ url: URL.SettingNotify, methodType: 'navigateTo' })
    return Promise.resolve({ errno: 1 })
  } else {
    showToast({
      title: '稍后请移步设置页面开启，否则接收不到通知',
      icon: 'none',
      duration: 5000,
      mask: false,
    })
  }

  /** 更新系统状态，组织模态框多次弹出 */
  store.dispatch.common.update_SystemInfo({ ...osStorage, isAuthorizeSubscribePop: true })
  return Promise.resolve({ errno: 0 })
}

/** 基础订阅能力 */
export const subscribe = ({ tplId }: TSubscribeOptions): Promise<{ errno: 0 | 1 }> => {
  const osStorage = store.getState().common.system
  return new Promise<{ errno: 0 | 1 }>((resolve) =>
    Taro.requestSubscribeMessage({
      tmplIds: [...tplId],
      success: async (res) => {
        let isReject = false
        tplId.forEach((k) => {
          const v = res[k]
          if (/reject/.test(v)) {
            isReject = true
            /* __PURE__ */ console.log(' === 模版授权取消 === ', k)
          }
        })
        let ret
        if (isReject && !osStorage?.isAuthorizeSubscribePop) {
          ret = await handleFailAuth(osStorage)
        }
        if (!isReject) {
          /* __PURE__ */ console.log(' === 你已成功授权 === ')
        }
        resolve(ret || { errno: 0 })
      },
      fail: async () => {
        let ret
        if (!osStorage?.isAuthorizeSubscribePop) {
          ret = await handleFailAuth(osStorage)
        }
        /* __PURE__ */ console.log(' === 模版授权失败 === ')
        resolve(ret || { errno: 0 })
      },
    }),
  )
}

/**
 * 应用于Component组件类中函数的订阅HOF装饰器
 *
 * ! 注意：只能用于类式组件，函数式组件不可用
 */
export function subscribeHOF(tplIds: string[]) {
  return function (_target, _key, descriptor) {
    /** 获取原函数 */
    const originalFunction = descriptor.value
    /** 额外执行订阅逻辑 */
    descriptor.value = async function () {
      /** 先等授权逻辑走完 */
      const { errno } = await subscribe({ tplId: tplIds })
      return !errno ? originalFunction.apply(this, arguments) : () => void 0
    }
    return descriptor
  }
}
