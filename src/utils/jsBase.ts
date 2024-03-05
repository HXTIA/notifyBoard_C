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
      result[key] = cloneDeep(target[key])
    }
    return result
  }
  return baseClone(targetObj)
}
