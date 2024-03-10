import { Page } from "@tarojs/taro"
import { getCurrentPage } from "../route";
import { blockConsole, trackEvent } from "./trackEvent";
import { isObj } from "../jsBase";

const enum PERFORMANCE_EVENTID {
  RESPONSE_READY = 'track_response_ready'
}

interface IPerfTracker {
  /** 请求开始埋点 */
  requestBegin: () => void
  /** 响应到达埋点 */
  // responseReady: ({ api?: string; data?: any }) => void
  responseReady: (params: { api?: string, data?: any }) => void
}

export class PerfTackerBase {
  /** 当前页面信息 */
  protected _page: Page;
  /** 页面开始的0时刻 */
  protected _zeroTime: number;
  /** 埋点id */
  protected cid: string;
  protected _businessTime: number;

  constructor({ cid }) {
    this._page = getCurrentPage();
    this._zeroTime = Date.now();
    this.cid = cid;
  }
}

/** 业务埋点 */
export class PerfTacker extends PerfTackerBase implements IPerfTracker {
  constructor({ cid }) {
    super({ cid })
  }
  requestBegin() {
    this._businessTime = Date.now();
    blockConsole({ type: 'perf', name: '请求开始，距页面加载', time: this._businessTime - this._zeroTime })
  }

  responseReady({ api = '', data = {} }) {
    const consumeTime = Date.now() - this._businessTime;
    if (isObj(data)) {
      data = JSON.stringify(data)
    }

    trackEvent({
      eventId: PERFORMANCE_EVENTID.RESPONSE_READY,
      cid: this.cid,
      extraParams: { time: consumeTime, api, data }
    });

    blockConsole({ type: 'perf', name: '响应完成埋点', time: consumeTime });
  }
}
