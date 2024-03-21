import { TResponseType } from './request'
import { STATUS_CODE } from './constants'
import { isBoolean } from '../jsBase'
import { EXCEPTION_HANDLE } from './exception'

/** 检查流水线列表 */
const CHECK_LIST = [checkStatusCodeSuccessful]

/** 执行流水线检查响应信息 */
export const pipelineResCheck = <T>(
  responseData: TResponseType<T>,
): TResponseType<T> & { type?: string } => {
  const isOk = CHECK_LIST.reduce((pre, cur) => {
    if (isBoolean(pre) && !!pre) return cur(responseData)

    return pre
  }, true)

  if (isBoolean(isOk)) return responseData
  else return { ...responseData, type: isOk as string }
}
/** 校验请求是否成功 */
function checkStatusCodeSuccessful(responseData: TResponseType<any>) {
  const { data, statusCode } = responseData
  if (statusCode === STATUS_CODE.SUCCESS) return true

  /** check因为什么导致错误 */
  return switchExceptionType(data.code)
}

/** 分配错误类型 */
function switchExceptionType(statusCode: number) {
  return EXCEPTION_HANDLE[statusCode] || '❌unknown_error'
}
