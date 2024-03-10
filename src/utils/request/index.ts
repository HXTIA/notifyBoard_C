import { TGeneralObject } from "src/types"
import { DefinedEnumKeys } from "../types/enumHelper"
import { request } from "./business"
import { BUSINESS_API_ROOT_PATH, BUSINESS_DOMAIN } from "./constants"
import { TCustomRequestParams } from "./request"

/** get请求 */
export const Get = <T>({ url, silent, data }: TCustomRequestParams<T, TGeneralObject>) => {
  return request<T, TGeneralObject>({
    method: 'GET',
    url,
    data,
    silent,
  })
}

/** post请求 */
export const Post = <T>({ url, silent, data }: TCustomRequestParams<T, TGeneralObject>) => {
  return request<T, TGeneralObject>({
    method: 'POST',
    url,
    data,
    silent,
  })
}

/** put请求 */
export const Put = <T>({ url, silent, data }: TCustomRequestParams<T, TGeneralObject>) => {
  return request<T, TGeneralObject>({
    method: 'PUT',
    url,
    data,
    silent,
  })
}

/** delete请求 */
export const Delete = <T>({ url, silent, data }: TCustomRequestParams<T, TGeneralObject>) => {
  return request<T, TGeneralObject>({
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


export default {
  Get,
  Post,
  Put,
  Delete
}
