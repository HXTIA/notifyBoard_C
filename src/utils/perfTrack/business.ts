import { TGeneralObject } from 'src/types'
import { TTrackEventParams, blockConsole, trackEvent } from './trackEvent'

const enum BUSINESS_EVENT_MAP {
  GOTO = 'track_goto_time',
  API_ERROR = 'track_api_error',
}

/** 追踪跳转耗时 */
export const trackGoToJump = ({ cid, extraParams }: Omit<TTrackEventParams, 'eventId'>) => {
  trackEvent({
    eventId: BUSINESS_EVENT_MAP.GOTO,
    cid,
    extraParams,
  })
  blockConsole({ type: 'perf', name: 'goTo跳转', time: extraParams?.time })
}

/** 请求错误埋点 */
type TTrackAPIErrorParams = Pick<TTrackEventParams, 'extraParams'> & {
  token: string
  api: string
  reqData?: TGeneralObject | string | undefined
  errMsg: any
}

/** 网络请求错误埋点 */
export const trackAPIError = ({
  token,
  api,
  reqData,
  extraParams,
  errMsg,
}: TTrackAPIErrorParams) => {
  /* __PURE__ */ console.log(' === API错误埋点上报 === ', token, api, reqData, extraParams, errMsg)
  trackEvent({
    eventId: BUSINESS_EVENT_MAP.API_ERROR,
    extraParams: {
      ...extraParams,
      token,
      api,
      req_data: JSON.stringify(reqData),
      err_msg: JSON.stringify(errMsg),
    },
  })
}
