import { IUserInfo } from 'src/common-model'
import { TGeneralObject } from 'src/types'
import { getStorage } from '../storage'
import { ResultWrap } from './Result'
import { baseRequest, TExtraRequestParams, type TCustomRequestParams } from './request'
import { pipelineResCheck } from './check'

const baseExtraConfig: TExtraRequestParams = {
  /** 默认需要展示loading */
  silent: false,
  /** 是否需要loading遮罩 */
  loadingNeedMask: true,
  /** loading文字 */
  loadingTitle: '加载中...'
}

export const request = <T, U extends string | TGeneralObject>(params: TCustomRequestParams<T, U>): Promise<ResultWrap<T>> => {
  return new Promise(async (resolve) => {
    let resInstance
    try {

      const result = await baseRequest<T, U>({
        ...baseExtraConfig,
        ...params,
        header: {
          token: getStorage<IUserInfo>('userInfo').token,
          ...params.header
        },
      })
      const { data, errMsg, statusCode, type } = pipelineResCheck(result)

      resInstance = new ResultWrap<T>({
        data,
        errMsg,
        statusCode,
        isSuccess: !!type,
        type
      })
    } catch (_err) {
      /** 系统直接抛错，和业务无关 */
      resInstance = new ResultWrap({
        isSuccess: false,
        errMsg: _err,
        type: 'system_error'
      })
    }
    resolve(resInstance)
  })
}
