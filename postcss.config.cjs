module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // 设计稿宽度 1920 / 19.2 = 100
      // 这样 100px 就会转成 1rem，方便计算
      rootValue: 100, 
      // 需要转换的属性，* 表示全部
      propList: ['*'],
      // 允许在媒体查询中转换 px
      mediaQuery: false,
      // 过滤掉不需要转换的选择器
      selectorBlackList: [
        '.ignore', 
        '.layui-layer-shade', // 遮罩层通常不需要缩放
        '#nprogress'          // 进度条不需要缩放
      ], 
      // 最小转换数值，如果设为 2，那么 1px 不会被转换（常用于细边框）
      minPixelValue: 2,
      // 默认不排除 node_modules，确保第三方库也缩放
      exclude: false
    }
  }
}
