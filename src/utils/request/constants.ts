/**
 * 业务请求路径
 * ```
 *  🌰：/api
 *  🌰：/uploadFile
 * ```
 */
export const BUSINESS_API_ROOT_PATH = {
  API: '/api'
}

/**
 * 业务域名（完整协议配置）
 * ```
 *  🌰：https://baidu.com:8080
 * ```
 */
export const BUSINESS_DOMAIN = {
  BUSINESS: process.env.TARO_APP_DOMAIN
}

/**
 * 业务状态码
 */
export const enum STATUS_CODE {
  /** sucess */
  SUCCESS = 0,
  /** 传参错误 */
  FAIL = 400,
  /** 没有登陆 */
  NO_LOGIN = 401,
  /** 服务器异常 */
  SERVER_FAIL = 500,
}

/**
 * [无用可删]
 * 哪些api不需要check token
 */
export const NO_CHECK_TOKEN_WHITE_LIST = [
  '/login',
]
