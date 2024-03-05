import { DefinedEnumKeys } from "../types/enumHelper"
import { request } from "./business"
import { BUSINESS_API_ROOT_PATH, BUSINESS_DOMAIN } from "./constants"
import { TCustomRequestParams } from "./request"

/** get请求 */
export const Get = <T>({ url, silent, data }: TCustomRequestParams<T, string>) => {
  return request<T, string>({
    method: 'GET',
    url,
    data,
    silent,
  })
}

/** post请求 */
export const Post = <T>({ url, silent, data }: TCustomRequestParams<T, object>) => {
  return request<T, object>({
    method: 'POST',
    url,
    data,
    silent,
  })
}

/** put请求 */
export const Put = <T>({ url, silent, data }: TCustomRequestParams<T, object>) => {
  return request<T, object>({
    method: 'PUT',
    url,
    data,
    silent,
  })
}

/** delete请求 */
export const Delete = <T>({ url, silent, data }: TCustomRequestParams<T, object>) => {
  return request<T, object>({
    method: 'DELETE',
    url,
    data,
    silent,
  })
}

/** 支持自定义请求 */
export { request }

/**
 * 构造请求url
 */
export const requestUrlCreator = <T extends {
  absolutePath: string,
  rootPath?: DefinedEnumKeys<typeof BUSINESS_API_ROOT_PATH>,
  domain?: DefinedEnumKeys<typeof BUSINESS_DOMAIN>
}>({
  absolutePath,
  rootPath = 'API',
  domain = 'BUSINESS'
}: T): string => {
  return BUSINESS_DOMAIN[domain] + BUSINESS_API_ROOT_PATH[rootPath] + absolutePath
}
