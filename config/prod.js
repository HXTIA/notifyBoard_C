module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {},
  mini: {
    /** 自动提取了chunk */
    // commonChunks: {},

    /** 优化主包体积 & 自动提取chunk */
    optimizeMainPackage: {
      enable: true,
    },

    /** 提取css */
    // miniCssExtractPluginOption: {
    //   filename: '[name].css',
    //   chunkFilename: '[name].css',
    // },
  }
  /** 看起来会默认压缩 */
  // jsMinimizer: 'terser', // 默认压缩为terser
  // terser: {
  //   enable: true,
  //   // https://github.com/terser/terser#minify-options
  //   config: {
  //     compress: {
  //       arguments: true,
  //       dead_code: true
  //     },
  //     toplevel: true,
  //     keep_classnames: true,
  //     keep_fnames: true
  //   },
  // },
  // cssMinimize: {}
  // plugins: [
  //   '@tarojs/plugin-terser'
  // ],
}
