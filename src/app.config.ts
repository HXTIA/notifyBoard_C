export default defineAppConfig({
  pages: [
    'pages/main/Index/index',
    'pages/Group/index',
    'pages/My/index',
    'pages/Manage/index',
    'pages/Group/Message/index',
    'pages/Group/Editor/index',
    'pages/Group/Hot/index',
    'pages/My/Edit/index',
    'pages/My/Message/index',
    'pages/Manage/Discuss/index',
    'pages/Manage/User/index',
    'pages/Manage/Topic/index',
  ],
  subPackages: [
    // {
    //   root: 'pages/Group',
    //   pages: [
    //     'index',
    //     'Message/index',
    //     'Hot/index',
    //     'Editor/index'
    //   ]
    // },
    {
      root: 'pages/Detail',
      pages: [
        'index'
      ],
      // 注册为独立分包
      independent: true
    },
    // {
    //   root: 'pages/Manage',
    //   pages: [
    //     'index',
    //     'Discuss/index',
    //     'Topic/index',
    //     'User/index'
    //   ]
    // },
    // {
    //   root: 'pages/My',
    //   pages: [
    //     'index',
    //     'Edit/index',
    //     'Message/index'
    //   ]
    // }
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
        pagePath: 'pages/Group/index',
        text: '',
        iconPath: './static/tabbarIcon/group.png',
        selectedIconPath: './static/tabbarIcon/group_active.png',
      },
      {
        pagePath: 'pages/My/index',
        text: '',
        iconPath: './static/tabbarIcon/my.png',
        selectedIconPath: './static/tabbarIcon/my_active.png',
      },
      {
        pagePath: 'pages/Manage/index',
        text: '',
        iconPath: './static/tabbarIcon/manage.png',
        selectedIconPath: './static/tabbarIcon/manage_active.png',
      },
    ],
  },
  /** 不适配黑暗模式 */
  darkmode: false,
})
