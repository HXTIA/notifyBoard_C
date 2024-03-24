export default definePageConfig({
  /** 页面标题 */
  navigationBarTitleText: '',
  /** 是否开启下拉刷新 */
  enablePullDownRefresh: false,
  /** 自定义导航栏 */
  navigationStyle: 'default',
  /** 开启朋友分享 */
  enableShareAppMessage: true,
  /** 开启朋友圈分享 */
  enableShareTimeline: true,
  /** 自定义背景颜色 */
  backgroundColor: '#ffffff',
  /** 非首页设置返回Home */
  homeButton: false,
  /** 下拉loading颜色 dark | light */
  backgroundTextStyle: 'dark',
  onReachBottomDistance: 50,
  disableScroll: true,
})
