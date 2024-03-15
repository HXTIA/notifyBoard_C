import Taro from '@tarojs/taro'
import lottie from 'lottie-miniprogram'

/** dom选择器 */
export const $ = (selector: string) => {
  return Taro.createSelectorQuery().select(selector).node()
}

/** lottie animation 入参 */
export type TLoadAnimationParameter = Parameters<typeof lottie.loadAnimation>[0]

/** lottie utils */
export const loadAnimation = (node: Taro.SelectorQuery, options: TLoadAnimationParameter) => {
  node.exec((res: any) => {
    const canvas = res[0].node
    const context = canvas.getContext('2d')

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
    return lottieIns
  })
}
