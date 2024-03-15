import { createModel } from '@rematch/core'
import { RootModel } from './models'
import { getStorage, setStorage } from './utils/storage';

export interface IUserInfo {
  token?: string;
  username?: string;
  userActor?: string;
}

export interface ICommonState {
  userInfo: IUserInfo;
}

/** 默认store值 从storage中激活 */
export const defaultValue: ICommonState = {
  userInfo: getStorage('userInfo')
}

export const common = createModel<RootModel>()({
  state: defaultValue,
  reducers: {
    update_UserInfo: (state: ICommonState, newUserinfo: IUserInfo) => {
      state.userInfo = newUserinfo
      setStorage('userInfo', newUserinfo)
      return state
    },
  },
})
