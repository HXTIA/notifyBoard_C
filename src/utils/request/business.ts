import { IUserInfo } from 'src/common-model'
import { getStorage } from '../storage'
import { ResultWrap } from './Result'
import { baseRequest, TExtraRequestParams, type TCustomRequestParams } from './request'

const baseExtraConfig: TExtraRequestParams = {
  /** 默认需要展示loading */
  silent: false,
  /** 是否需要loading遮罩 */
  loadingNeedMask: true,
  /** loading文字 */
  loadingTitle: '加载中...'
}

export const request = <T, U extends string | object>(params: TCustomRequestParams<T, U>): Promise<ResultWrap<T>> => {
  return new Promise(async (resolve) => {
    let resInstance
    try {

      const result = await baseRequest<T, U>({
        header: {
          token: getStorage<IUserInfo>('userInfo').token
        },
        ...baseExtraConfig,
        ...params,
      })
      const { data, errMsg, statusCode } = result

      resInstance = new ResultWrap<T>({
        data,
        errMsg,
        statusCode,
        isSuccess: true
      })
    } catch (_err) {
      // ! TODO: 在这需要判定响应码
      resInstance = new ResultWrap({
        isSuccess: true,
        errMsg: _err
      })
    }
    resolve(resInstance)
  })
}
