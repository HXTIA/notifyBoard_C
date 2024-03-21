import { useCallback, useEffect, useMemo, useState } from 'react'
import { TGeneralObject } from 'src/types'
import request from 'src/utils/request'
import { IResultWrap } from 'src/utils/request/Result'
import { getStorage, trackAPIError } from 'src/utils'
import { IUserInfo } from 'src/common-model'
import usePerfTrack from './usePerfTrack'

/** 第一个入参控制请求 */
type TRequestFn = () => {
  /** 请求类型 */
  type: 'Get' | 'Post' | 'Put' | 'Delete'
  /** 请求完整路径 */
  url: string
  /** 请求参数，get请求自动拼接尾部 */
  reqData?: TGeneralObject
  /** 是否静默关闭request loading弹层。 若要使用Loading组件标此项为true */
  silent?: boolean
}

/** 第二个入参控制行为 */
type TRequestOptions = {
  /** 是否自动执行 */
  auto?: boolean
  /** 是否上报性能埋点 */
  isReportPerfTrack?: boolean
  /** success回调，可用于性能埋点 */
  success?: () => void
  /** 请求前逻辑 */
  preFetch?: () => void
}

/**
 * useRequest请求函数
 *
 * 第一个入参是一个可以返回请求参数对象的函数
 * 第二个入参是控制额外行为的配置项
 *
 * ```js
 * 🌰：
 *  const { data, loading } = useRequest(
 *    () => ({
 *      url: requestUrlCreator({ absolutePath: '/detail' }),
 *      type: 'Get',
 *      reqData: {
 *        id: storage?.id
 *      }
 *    }), { auto: true }
 *  )
 * ```
 */
const useRequest = <T>(
  requestFn: TRequestFn,
  options: TRequestOptions = { auto: true, isReportPerfTrack: true },
) => {
  const [loading, setLoading] = useState<boolean>(!!options.auto)
  const [data, setData] = useState<T>()
  const [err, setErr] = useState<any>()
  const PerfTackerInstance = usePerfTrack()
  const { type, url, reqData, silent } = useMemo(() => requestFn(), [])

  const run = useCallback(async () => {
    let res: Partial<IResultWrap<T>> = null as any
    /** 获取请求函数 */
    const fn = request[type]

    /** 请求开始 */
    PerfTackerInstance.requestBegin()
    res = await fn<T>({ url, data: reqData, silent })

    /** 校验是否成功 */
    if (res.isSuccess) {
      setData(res.data)
      /** 请求完成 */
      PerfTackerInstance.responseReady({ api: url, data: res.data as any })
    } else {
      /** 请求没有成功，错误信息可以用errMsg取出 */
      setErr(res.msg)
      /** 上报错误埋点 */
      trackAPIError({
        token: getStorage<IUserInfo>('userInfo').token || 'noLogin',
        api: url,
        reqData,
        errMsg: res.msg,
      })
      res.handleException && res.handleException()
    }
    setLoading(false)

    return res.data
  }, [PerfTackerInstance, reqData, silent, type, url])

  useEffect(() => {
    if (options.auto) {
      run()
    }
  }, [options.auto, run])

  return {
    loading,
    data,
    err,
    run,
  }
}

export default useRequest
