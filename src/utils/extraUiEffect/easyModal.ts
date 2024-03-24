import Taro from '@tarojs/taro'

/**模态框配置项 */
type TModalOptions = Exclude<Parameters<typeof Taro.showModal>[0], undefined>

export const showModal = async ({
  title,
  cancelText = '取消',
  confirmText = '确定',
  content,
  showCancel = true,
}: TModalOptions) => {
  return new Promise((resolve, reject) => {
    Taro.showModal({
      title,
      content,
      cancelText,
      confirmText,
      showCancel,
      success(res) {
        resolve(res.confirm)
      },
      fail(err) {
        /* __PURE__ */ console.log(' ==== 模态框异常 ==== ', err)
        reject(err)
      },
    })
  })
}

export default showModal
