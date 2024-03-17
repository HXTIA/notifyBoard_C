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
    node.exec((res: any) => {
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
  })
}
