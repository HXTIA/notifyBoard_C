// eslint-disable-next-line import/no-commonjs
const path = require('path')

const resolve = path.resolve
const pathFn = (rPath) => resolve(__dirname, '../', rPath)


const config = {
  projectName: 'notifyBoard_C',
  date: '2024-3-1',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  alias: {
    src: pathFn('src'),
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {},
  framework: 'react',
  compiler: {
    type: 'webpack5',
    /** 开启bundle预编译提高二次编译速度 */
    prebundle: {
      enable: true,
      /** 缓存目录 */
      cacheDir: pathFn('.cache'),
      timings: true
    }
  },
  cache: {
    enable: false,
    /** 构建依赖，当config内容发生变化刷新缓存 */
    // buildDependencies: {
    //   config: [
    //     pathFn('./src/app.tsx'),
    //     pathFn('./src/app.config.ts')
    //   ]
    //   // config: [path.join(appPath, 'config/index.js')],
    // },
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
}

export default function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
