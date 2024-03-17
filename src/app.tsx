import { Provider } from 'react-redux'
import Taro, { useError, useLaunch } from '@tarojs/taro'
import Error from 'src/components/baseBuiltComp/Error'
import { store } from './store'
import './app.scss'
import { Get, getStorage, preloadResource, requestUrlCreator } from './utils'
import { IUserInfo } from './common-model'
import { JSON_MAP } from './static/SVG/lottie-map'


function App(props) {
  useError((err) => {
    console.log('错了', err)
    return <Error />
  })

  useLaunch(async () => {
    /** 1. 校验登陆态 */
    let sessionRes
    try {
      sessionRes = (await Taro.checkSession()).errMsg
    } catch (error) {
      sessionRes = 'fail'
    }
    const isExpired = /fail/.test(sessionRes)

    /** 2. 校验获取用户信息 */
    const token = getStorage<IUserInfo>('userInfo')?.token

    /** TODO: 需和后端确定响应体 */
    let userinfo: any
    if (token) {
      try {
        const wrap = await Get<{ [key in string]: any }>({ url: requestUrlCreator({ absolutePath: '/userInfo' }), silent: true })
        userinfo = wrap.isSuccess && wrap.data
      } catch (err) {
        console.log(' === 获取用户信息请求错误 === ', err);
      }
    }

    /** 预加载静态资源 */
    preloadResource(JSON_MAP['forbidden'], false)

    // store.dispatch.common.update_UserInfo({ ...userinfo })
    // TODO: 需要更新为实际的userinfo参数
    store.dispatch.common.update_SystemInfo({ sessionStatus: isExpired ? 'fail' : 'ok', coolStartSuccess: true, hasAccountCompleted: !!(userinfo || false) })

    console.log('==== 应用冷启动初始化成功！ ====');
  })
  return (
    // 在入口组件不会渲染任何内容，但我们可以在这里做类似于状态管理的事情
    <Provider store={store}>
      {/* props.children 是将要被渲染的页面 */}
      {props.children}
    </Provider>
  )
}

export default App
