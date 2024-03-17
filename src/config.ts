import { Config } from "@tarojs/taro"

/** 供给 app.config消费 */
export const config: Config = {
  pages: [
    'pages/main/Index/index',
    'pages/main/Calendar/index',
    'pages/main/Manage/index',
    'pages/main/Manage/Publish/index',
    'pages/main/My/index',
    // 'pages/Detail/index',
    // 'pages/Initial/index',
    // 'pages/Setting/index',
    // 'pages/Setting/Userinfo/index',
    // 'pages/Setting/Notify/index',
    // 'pages/Setting/Feedback/index',
    // 'pages/Setting/Course/index'
  ],
  subPackages: [
    {
      root: 'pages/Detail',
      pages: [
        'index'
      ],
    },
    {
      root: 'pages/Initial',
      pages: [
        'index'
      ],
    },
    {
      root: 'pages/Setting',
      pages: [
        'index',
        'Course/index',
        'Feedback/index',
        'Notify/index',
        'Userinfo/index'
      ],
    }
  ],
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    enablePullDownRefresh: false,
  },
  // 自定义TabBar使用
  tabBar: {
    selectedColor: '#f46a34',
    list: [
      {
        pagePath: 'pages/main/Index/index',
        text: '',
        iconPath: './static/tabbarIcon/home.png',
        selectedIconPath: './static/tabbarIcon/home_active.png',
      },
      {
        pagePath: 'pages/main/Calendar/index',
        text: '',
        iconPath: './static/tabbarIcon/group.png',
        selectedIconPath: './static/tabbarIcon/group_active.png',
      },
      {
        pagePath: 'pages/main/Manage/index',
        text: '',
        iconPath: './static/tabbarIcon/my.png',
        selectedIconPath: './static/tabbarIcon/my_active.png',
      },
      {
        pagePath: 'pages/main/My/index',
        text: '',
        iconPath: './static/tabbarIcon/manage.png',
        selectedIconPath: './static/tabbarIcon/manage_active.png',
      },
    ],
  },
  /** 不适配黑暗模式 */
  darkmode: false,
}
