import exception from "./exception"

interface IResultWrapBase<T> {
  data: T,
  // header: object,
  // cookies: string,
  errMsg: string,
  statusCode: number,
  isSuccess: boolean
}

/** 业务响应包裹基础类 */
class ResultWrapBase<T> implements Partial<IResultWrapBase<T>>{
  private _data?: T
  private _errMsg?: string
  private _statusCode?: number
  private _isSuccess?: boolean

  /** 获取请求数据 */
  get data() {
    return this._data
  }

  /** 获取请求响应信息 */
  get errMsg() {
    return this._errMsg
  }

  /** 获取请求业务码 */
  get code() {
    return this._statusCode
  }

  /** 获得到是否成功请求 */
  get isSuccess() {
    return this._isSuccess
  }

  constructor(params: Partial<IResultWrapBase<T>>) {
    this._data = params.data
    this._errMsg = params.errMsg
    this._statusCode = params.statusCode
    this._isSuccess = params.isSuccess
  }
}

export interface IResultWrap<T> extends IResultWrapBase<T> {
  /** 自动处理此次请求异常 */
  handleException: () => void
}

export class ResultWrap<T> extends ResultWrapBase<T> implements Partial<IResultWrap<T>>{
  private _type: string;
  constructor(params: Partial<IResultWrap<T>> & { type?: string }) {
    super(params)
    this._type = params?.type || 'success'
  }

  public handleException() {
    if (this.isSuccess) {
      console.log('请求成功！没有异常可处理');
      return
    } else {
      const fn = this.chooseTargetHandle()
      if (!fn) {
        console.warn('[❌]: 没有找到自动化处理的函数，请检查是否预先定义');
      }
      fn(this)
    }
  }

  private chooseTargetHandle(): Function {
    const type = this._type
    const schema = `handle_${type}_exception`
    console.log(' === 自动化错误处理schema为: === ', schema);
    return exception[schema]
  }
}
