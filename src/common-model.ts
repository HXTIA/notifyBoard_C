import { createModel } from '@rematch/core'
import { RootModel } from './models'
import { getStorage, setStorage } from './utils/storage'

/** 用户信息 */
export interface IUserInfo {
  token?: string
  username?: string
  userActor?: string
  /** 是否绑定授权码 */
  isBindManage?: boolean
}

/** 系统运行所需全局缓存 */
export interface ISystemInfo {
  /** session状态 */
  sessionStatus?: string
  /** 冷启动初始化是否完成 */
  coolStartSuccess: boolean
  /** 是否完善用户信息 */
  hasAccountCompleted?: boolean
  /** 是否弹过授权弹窗 */
  isAuthorizeSubscribePop?: boolean
}

export interface ICommonState {
  userInfo: IUserInfo
  system: ISystemInfo
}

/** 默认store值 从storage中激活 */
export const defaultValue: ICommonState = {
  userInfo: getStorage<IUserInfo>('userInfo') || {},
  system: {
    coolStartSuccess: false,
    hasAccountCompleted: false,
    isAuthorizeSubscribePop: false,
  },
}

export const common = createModel<RootModel>()({
  state: defaultValue,
  reducers: {
    update_UserInfo: (state: ICommonState, newUserinfo: IUserInfo) => {
      state.userInfo = newUserinfo
      setStorage('userInfo', newUserinfo)
      return state
    },
    update_SystemInfo: (state: ICommonState, newSystemInfo: ISystemInfo) => {
      state.system = newSystemInfo
      console.log(' === 更新到了', newSystemInfo)
      return state
    },
  },
})
