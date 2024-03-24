import Taro from '@tarojs/taro'
import lottie from 'lottie-miniprogram'

/** dom选择器 */
export const $ = (selector: string) => {
  return Taro.createSelectorQuery().select(selector).node()
}

/** lottie animation 入参 */
export type TLoadAnimationParameter = Parameters<typeof lottie.loadAnimation>[0]
export type TLoadAnimationReturnType = ReturnType<typeof lottie.loadAnimation>

/** lottie utils */
export const loadAnimation = (node: Taro.SelectorQuery, options: TLoadAnimationParameter) => {
  return new Promise<TLoadAnimationReturnType>((resolve) => {
    const fn = () => {
      node.exec((res: any) => {
        if (!res[0].node) {
          loop()
        }
        const canvas = res[0].node
        const context = canvas.getContext('2d')

        /** 处理像素比导致lottie模糊问题 */
        const dpr = Taro.getSystemInfoSync().pixelRatio
        canvas.width = canvas.width * dpr
        canvas.height = canvas.height * dpr
        context.scale(dpr, dpr)

        lottie.setup(canvas)
        const lottieIns = lottie.loadAnimation({
          rendererSettings: {
            progressiveLoad: true,
            context,
          },
          autoplay: true,
          loop: true,
          ...options,
        })
        resolve(lottieIns)
      })
    }

    const loop = () => {
      Taro.nextTick(() => {
        if (!node) {
          loop()
          /* __PURE__ */ console.log(' === 目前还没有node节点，轮训.... === ')
        } else {
          /* __PURE__ */ console.log(' === 已有节点，开始渲染 === ')
          fn()
        }
      })
    }
    loop()
  })
}
