const BASE_CDN_DOMAIN = 'https://hx.404fwf.cn/notifyBoard/SVG/'

/** 只读元组 */
const MAPPING = [
  '404',
  'forbidden',
  'loading1',
  'loading2',
  'loading3',
  'loading4',
  'loading5',
  'loading6',
  'loading7',
  'success'
] as const;

/** lottie动画映射 */
export const JSON_MAP = MAPPING.reduce((pre, cur) => {
  pre[cur] = BASE_CDN_DOMAIN + cur + '.json';
  return pre;
}, {} as Record<typeof MAPPING[number], string>);
