export type TResultWrap<T> = {
  data: T,
  // header: object,
  // cookies: string,
  errMsg: string,
  statusCode: number,
  isSuccess: boolean
}

/** 业务响应包裹 */
export class ResultWrap<T> implements Partial<TResultWrap<T>>{
  private _data?: T
  private _msg?: string
  private _code?: number
  private _isSuccess?: boolean

  /** 获取请求数据 */
  get data() {
    return this._data
  }

  /** 获取请求响应信息 */
  get msg() {
    return this._msg
  }

  /** 获取请求业务码 */
  get code() {
    return this._code
  }

  get isSuccess() {
    return this._isSuccess
  }

  constructor(params: Partial<TResultWrap<T>>) {
    this._data = params.data
    this._msg = params.errMsg
    this._code = params.statusCode
    this._isSuccess = params.isSuccess
  }
}
