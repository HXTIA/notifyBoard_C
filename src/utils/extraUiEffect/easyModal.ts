import Taro from '@tarojs/taro'

/**模态框配置项 */
type TModalOptions = Exclude<Parameters<typeof Taro.showModal>[0], undefined>

const showModal = async ({
  title,
  cancelText = '取消',
  confirmText = '确定',
  content,
  showCancel = true,
}:
  TModalOptions) => {

  return new Promise(resolve => {
    Taro.showModal({
      title,
      content,
      cancelText,
      confirmText,
      showCancel,
      success(res) {
        resolve(res.confirm)
      },
      fail(res) {
        console.log(' ==== 模态框异常 ==== ', res);
        resolve(false)
      }
    })
  })
}


export default showModal
