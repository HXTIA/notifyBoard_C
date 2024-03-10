import { isObj } from "../jsBase"
import { getPages } from "./page"

/** 透传的参数 */
type TPassParamsObject = { [key in string]: string | number | boolean }

/** 构建页面参数 */
export const buildUrl = (obj: TPassParamsObject): string => {
  if (Object.keys(obj).length === 0) return ''
  return Object.keys(obj)
    .map((key, i) => `${(!i ? '?' : '')}${key}=${obj[key]}`)
    .join('&')
}

/** 解析url路径参数 */
export const parseUrl = (url: string): TPassParamsObject => {
  const [_, params] = url.split('?')
  if (!params) return {}

  const obj = {}
  params.split('&').forEach(key => {
    const [k, v] = key.split('=')
    obj[k] = v
  })

  return obj
}

/** 获得当前页面的所有透传参数 */
export const query = (): TPassParamsObject => {
  const queue = getPages()
  const current = queue[queue.length - 1]
  if (!current || !isObj(current)) {
    console.warn('[📖]: query api异常，查询当前页面栈为空或数据异常');
    return {}
  }

  return parseUrl(current.$taroPath)
}
