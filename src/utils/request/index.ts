import { TGeneralObject } from 'src/types'
import Taro from '@tarojs/taro'
import { DefinedEnumKeys } from '../types/enumHelper'
import { request } from './business'
import { BUSINESS_API_ROOT_PATH, BUSINESS_DOMAIN } from './constants'
import { TCustomRequestParams, TResponseType, baseRequest } from './request'

const hofBaseRequest = <T>(
  params: TCustomRequestParams<T, TGeneralObject>,
  type: keyof Taro.request.Method,
) => {
  return request<T, TGeneralObject>({
    ...params,
    method: type,
  })
}

/** get请求 */
export const Get = <T>(params: TCustomRequestParams<T, TGeneralObject>) => {
  return hofBaseRequest<T>(params, 'GET')
}

/** post请求 */
export const Post = <T>(params: TCustomRequestParams<T, TGeneralObject>) => {
  return hofBaseRequest<T>(params, 'POST')
}

/** put请求 */
export const Put = <T>(params: TCustomRequestParams<T, TGeneralObject>) => {
  return hofBaseRequest<T>(params, 'PUT')
}

/** delete请求 */
export const Delete = <T>(params: TCustomRequestParams<T, TGeneralObject>) => {
  return hofBaseRequest<T>(params, 'DELETE')
}

/**
 * 预加载静态资源 - 「图片或文件」
 * @param url 链接
 */
export function preloadResource(url: string): Promise<boolean>

/**
 * 预加载静态资源 - 「图片或文件」
 * @param url 链接
 * @param isImg 是否为image加载
 * @returns
 */
export function preloadResource<T>(url: string, isImg: boolean): Promise<TResponseType<T>>
export function preloadResource<T>(url: string, isImg = true) {
  /* __PURE__ */ console.log(' === 预加载静态资源 === ')
  if (isImg) {
    return new Promise<boolean>((resolve) => {
      const canvas = Taro.createOffscreenCanvas({ width: 300, height: 150 })
      const image = canvas.createImage()
      image.onload = () => resolve(true)
      image.onerror = () => resolve(false)
      image.src = url
    })
  } else {
    return baseRequest<T, any>({
      url,
      method: 'GET',
      silent: true,
    })
  }
}

/** 支持自定义请求 */
export { request }

/**
 * 构造请求url
 */
export const requestUrlCreator = <
  T extends {
    absolutePath: string
    rootPath?: DefinedEnumKeys<typeof BUSINESS_API_ROOT_PATH>
    domain?: DefinedEnumKeys<typeof BUSINESS_DOMAIN>
  },
>({
  absolutePath,
  rootPath = 'API',
  domain = 'BUSINESS',
}: T): string => {
  return BUSINESS_DOMAIN[domain] + BUSINESS_API_ROOT_PATH[rootPath] + absolutePath
}

export default {
  Get,
  Post,
  Put,
  Delete,
}
