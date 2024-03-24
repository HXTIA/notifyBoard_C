import { IUserInfo } from 'src/common-model'
import { TGeneralObject } from 'src/types'
import { getStorage } from '../storage'
import { ResultWrap } from './Result'
import { baseRequest, TExtraRequestParams, type TCustomRequestParams } from './request'
import { pipelineResCheck } from './check'
import { isUndefined } from '../jsBase'
import { showToast } from '../extraUiEffect'
import { trackAPIError } from '../perfTrack'

const baseExtraConfig: TExtraRequestParams = {
  /** 默认需要展示loading */
  silent: false,
  /** 是否需要loading遮罩 */
  loadingNeedMask: true,
  /** loading文字 */
  loadingTitle: '加载中...',
}

export const request = <T, U extends string | TGeneralObject>(
  params: TCustomRequestParams<T, U>,
): Promise<ResultWrap<T>> => {
  return new Promise(async (resolve) => {
    let resInstance
    try {
      const result = await baseRequest<T, U>({
        ...baseExtraConfig,
        ...params,
        header: {
          token: getStorage<IUserInfo>('userInfo').token,
          ...params.header,
        },
      })

      console.log(' === resData == ', result)

      const { data: originData, type } = pipelineResCheck(result)

      const isError = ['data', 'code', 'msg', 'type'].every((v) => isUndefined(originData[v]))
      if (isError) {
        /* __PURE__ */ console.log(' === 出错了，不是业务问题，检查接口及网络 === ')
        throw new Error('params are undefined')
      }

      const { data, code, msg } = originData
      resInstance = new ResultWrap<T>({
        data,
        msg,
        code,
        isSuccess: !type,
        type,
      })
      if (!params.silent) {
        const { loadingNeedMask: mask } = params
        showToast({
          title: !type ? '执行成功～' : '执行失败了.....',
          mask,
        })
      }
      if (!type) {
        /** 上报错误埋点 */
        trackAPIError({
          token: getStorage<IUserInfo>('userInfo').token || 'noLogin',
          api: params.url,
          reqData: params.data,
          errMsg: msg,
        })
      }
    } catch (_err) {
      /** 系统直接抛错，和业务无关 */
      resInstance = new ResultWrap({
        isSuccess: false,
        msg: _err,
        type: 'system_error',
      })
      if (!params.silent) {
        const { loadingNeedMask: mask } = params
        showToast({
          title: '执行失败了.....',
          mask,
        })
      }
      /** 上报错误埋点 */
      trackAPIError({
        token: getStorage<IUserInfo>('userInfo').token || 'noLogin',
        api: params.url,
        reqData: params.data,
        errMsg: _err,
      })
    }
    resolve(resInstance)
  })
}
