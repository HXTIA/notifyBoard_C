/**
 * 处理异常逻辑
 *
 * 函数格式统一为：handle_xxx_error_exception，字典表参考 EXCEPTION_HANDLE
 */

import { showToast } from "../extraUiEffect";
import { ResultWrap } from "./Result";
import { STATUS_CODE } from "./constants";

/** 处理未登录 */
const handle_no_login_error_exception = () => {
  console.log('处理未登录');
}

/** 处理请求系统错误 */
const handle_system_error_exception = (resWrap: ResultWrap<any>) => {
  console.log(' === 系统出现故障 === ');
  showToast({
    title: '系统故障，请投诉 并告知研发修复',
    icon: 'none',
    duration: 4000
  })
}

export default {
  handle_no_login_error_exception,
  handle_system_error_exception
}

/** 响应码对应的异常处理 */
export const EXCEPTION_HANDLE = {
  [STATUS_CODE.FAIL]: 'pass_error',
  [STATUS_CODE.NO_LOGIN]: 'no_login_error',
  [STATUS_CODE.SERVER_FAIL]: 'server_error',
}
