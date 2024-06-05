export default defineAppConfig({
  pages: [
    // 路由配置
    'pages/index/index',
    'pages/doQuestion/index',
    'pages/result/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    // 全局标题
    navigationBarTitleText: 'MBTI 性格测试',
    navigationBarTextStyle: 'black'
  }
})
