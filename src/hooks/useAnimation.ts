import { useEffect, useState, useCallback } from 'react'
import { preloadResource, loadAnimation, TLoadAnimationReturnType, showToast } from 'src/utils'

/**
 * 动画引用hooks
 * @param node 目标节点
 * @param template lottie-json模版
 */
const useAnimation = ({
  node,
  template,
  isAutoRun = true,
}: {
  node: Taro.SelectorQuery
  template: string
  isAutoRun?: boolean
}) => {
  const [instance, setInstance] = useState<TLoadAnimationReturnType>()

  /** 运行函数 */
  const run = useCallback(() => {
    if (instance) {
      /* __PURE__ */ console.log(' === 取消重复运行lottie === ')
      return
    }
    preloadResource(template, false)
      .then((res) => {
        setTimeout(async () => {
          /* __PURE__ */ console.log(' === lottie执行，当前模版为 === ', template)
          const ins = await loadAnimation(node, { animationData: res.data })
          setInstance(ins)
        }, 0)
      })
      .catch((err) => {
        showToast({ title: '网络开小差了～ 请检查网络', icon: 'none' })
      })
  }, [instance])

  /** 如果配置为自动运行在挂载的时候就执行 */
  useEffect(() => {
    if (isAutoRun) {
      /* __PURE__ */ console.log('自动执行')
      run()
    }
    return () => {
      if (instance) {
        /* __PURE__ */ console.log(' === lottie实例销毁 === ', instance)
        instance.destroy()
      }
    }
  }, [instance])

  return { run, instance }
}

export default useAnimation
