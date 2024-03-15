import Taro from "@tarojs/taro";
import { IUserInfo } from "src/common-model";
import { isObj } from "./jsBase";

/** 可存储的storage接口 */
interface IStorageData {
  userInfo: IUserInfo;
  common: {};
}
type TStorageKey = keyof IStorageData

/**
 * 获取本地存储
 */
export const getStorage = <T>(key: TStorageKey): T => {
  return Taro.getStorageSync(key)
}

/**
 * 设置本地存储
 */
export const setStorage = <T extends TStorageKey>(
  key: T,
  data: IStorageData[T],
  action: 'cover' | 'diff' = 'cover'
) => {
  if (action === 'diff') {
    const targetData = getStorage(key)
    if (!!targetData) {
      if (isObj(data) && isObj(targetData)) {
        data = Object.assign({}, data, targetData)
      } else {
        throw new EvalError(`
          【setStorage】错误，本地已存储的数据和传入的数据类型不一致
          原始数据${targetData}
          传入数据${data}
        `)
      }
    }
  }
  Taro.setStorageSync(key, data)
}
