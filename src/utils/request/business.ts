import { IUserInfo } from 'src/common-model'
import { TGeneralObject } from 'src/types'
import { getStorage } from '../storage'
import { ResultWrap } from './Result'
import { baseRequest, TExtraRequestParams, type TCustomRequestParams, TRequestBodyDataExtends } from './request'
import { pipelineResCheck } from './check'

const baseExtraConfig: TExtraRequestParams = {
  /** 默认需要展示loading */
  silent: false,
  /** 是否需要loading遮罩 */
  loadingNeedMask: true,
  /** loading文字 */
  loadingTitle: '加载中...'
}

export const request = <T extends TRequestBodyDataExtends<T>, U extends string | TGeneralObject>(params: TCustomRequestParams<T, U>): Promise<ResultWrap<T>> => {
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
      const { data: originData, type } = pipelineResCheck(result)
      const { data, code, msg } = originData

      resInstance = new ResultWrap<T>({
        data,
        msg,
        code,
        isSuccess: !type,
        type
      })
    } catch (_err) {
      /** 系统直接抛错，和业务无关 */
      resInstance = new ResultWrap({
        isSuccess: false,
        msg: _err,
        type: 'system_error'
      })
    }
    resolve(resInstance)
  })
}
