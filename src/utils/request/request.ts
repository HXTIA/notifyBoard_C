import Taro from "@tarojs/taro";
import { hideLoading, showLoading } from "../extraUiEffect";

/** Taro.request入参类型 */
type TTaroRequestParams<T, U> = Parameters<typeof Taro.request<T, U>>[0]

/** 额外请求参数 */
export type TExtraRequestParams = {
  /** 请求是否静默[是否需要loading] */
  silent: boolean
  /** loading文案 */
  loadingTitle?: string,
  /** loading是否需要遮罩 */
  loadingNeedMask?: boolean
}

/** 自定义请求参数类型 */
export type TCustomRequestParams<T, U> = TTaroRequestParams<T, U> & TExtraRequestParams
/** 响应体类型约束 */
export type TRequestBodyDataExtends<T> = T extends string | TaroGeneral.IAnyObject | ArrayBuffer ? T : any;
/** 响应类型 */
export type TResponseType<T> = Taro.request.SuccessCallbackResult<TRequestBodyDataExtends<T>>

/**
 * 基础请求能力
 * @param {TCustomRequestParams} options - 请求入参
 * @returns
 */
export const baseRequest = <T, U extends object | string>(options: TCustomRequestParams<TRequestBodyDataExtends<T>, U>): Promise<TResponseType<T>> => {
  if (!options.silent) {
    const { loadingTitle: title, loadingNeedMask: mask } = options
    showLoading({
      title: title as string,
      mask
    })
  }

  return new Promise((resolve, reject) => {
    Taro.request<T>({
      ...options,
      success: (res: TResponseType<T>) => resolve(res),
      fail: reject,
      complete: () => {
        !options.silent && hideLoading()
      }
    })
  })
}
