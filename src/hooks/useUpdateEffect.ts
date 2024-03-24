import { useEffect, useRef } from 'react'

/** 首屏不会执行，只有当依赖项更新的时候会执行 */
const useUpdateEffect = (effect: () => void, deps: any[]) => {
  const isMounted = useRef(false)

  useEffect(() => {
    if (isMounted.current) {
      effect()
    } else {
      isMounted.current = true
    }
  }, deps)
}

export default useUpdateEffect
