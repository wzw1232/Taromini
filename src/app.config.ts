export default defineAppConfig({
  pages: ['pages/index/index', 'pages/web/index', 'pages/mine/index'],
  subPackages: [],
  tabBar: {
    custom: true,
    backgroundColor: '#ffffff',
    color: '#cccccc',
    selectedColor: '#1b9666',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '空间',
        iconPath: 'resources/tabbar/space.png',
        selectedIconPath: 'resources/tabbar/space_choose.png',
      },
      // {
      //   pagePath: 'pages/scene/index',
      //   text: '场景',
      //   iconPath: 'resources/tabbar/scene.png',
      //   selectedIconPath: 'resources/tabbar/scene_choose.png',
      // },
      // {
      //   pagePath: 'pages/auto/index',
      //   text: '自动化',
      //   iconPath: 'resources/tabbar/automation.png',
      //   selectedIconPath: 'resources/tabbar/automation_choose.png',
      // },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: 'resources/tabbar/profile.png',
        selectedIconPath: 'resources/tabbar/profile_choose.png',
      },
    ],
  },
  // 关闭H5路由动画
  animation: false,
  style: 'v2',
  window: {
    navigationBarTitleText: '',
    navigationBarTextStyle: 'black',
    // @ts-ignore
    titleBarColor: '#ffffff',
    backgroundColor: '#ffffff',
    backgroundColorTop: '#ffffff',
    backgroundColorBottom: '#ffffff',
    backgroundImageColor: '#ffffff',
    // 微信全局设置自定义导航栏
    navigationStyle: 'custom',
    // 支付宝全局设置自定义导航栏
    transparentTitle: 'always',
    titlePenetrate: 'YES',
    enablePullDownRefresh: false,
  },
  permission: {
    'scope.userLocation': {
      desc: '您的位置信息将用于后续蓝牙搜索控制器等功能',
    },
  },
  requiredPrivateInfos: ['getLocation', 'chooseLocation', 'chooseAddress'],
});
