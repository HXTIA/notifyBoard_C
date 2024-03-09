function typeEqual(obj: any, type: string) {
  return Object.prototype.toString.call(obj) === '[object ' + type + ']'
}

export function isObj(obj: any) {
  return typeEqual(obj, 'Object')
}

export function isArray(obj: any) {
  return typeEqual(obj, 'Array')
}

export function isStr(obj: any) {
  return typeEqual(obj, 'String')
}

export function isUndefined(obj: any) {
  return typeEqual(obj, 'Undefined')
}

export function isNull(obj: any) {
  return typeEqual(obj, 'Null')
}

export function isDate(obj: any) {
  return typeEqual(obj, 'Date')
}

/**
 * 深拷贝
 * @param target 支持对象和数组
 */
export function cloneDeep<T>(targetObj: T): T {
  let map = new Map()
  function baseClone(target: T) {
    if (!isObj(target) && !isArray(target)) return target
    if (map.get(target)) return map.get(target)

    let result = isArray(target) ? [] : {}
    map.set(target, result)

    let keys = Object.keys(target as Object | Array<T>)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      result[key] = baseClone(target[key])
    }
    return result
  }
  return baseClone(targetObj)
}

/**
 * 将对象解析成URL参数
 */
export const objectToUrl: any = (obj: object) => {
  // if (!isObj(obj) && Object.keys(obj).length === 0) {
  //   throw new Error('对象错误!')
  // }
  if (Object.keys(obj).length === 0) return ''
  return Object.keys(obj)
    .map((key) => `${key}=${obj[key]}`)
    .join('&')
}

/**
 *  给对象添加属性
 * @param {*} options
 * @return Object
 */
export const addAttribute = (options: any) => {
  const obj = {}
  for (const item in options) {
    let ele = options[item]
    obj[item] = ele
  }
  return obj
}

/**
 * 复制一个对象的属性到另一个函数
 * @param {*} target
 * @param {*} options
 */
export const copyObject = (target: any, options: any) => {
  for (const item in options) {
    // const ele = options[item];
    Object.assign(target, options[item])
  }
  return target
}

/**
 * 合并对象到指定的对象上
 * @param {*} target
 * @param {*} options
 */
export const addTargetAttribute = (target: any, options: any) => {
  for (const item in options) {
    const ele = options[item]
    if (typeof ele === 'object' && target.hasOwnProperty(item)) {
      Object.assign(target[item], ele)
    } else {
      target[item] = ele
    }
  }
  return target
}
