export type TProxy = 'warning' | 'info'
export type IPrefix = keyof typeof domain.real

export type IPathName<T extends string, K extends string> = T extends `/${K}${infer R}`
  ? `/${K}${R}`
  : never

export type IHref<T extends string> = T extends `https://${infer R}`
  ? `https://${R}`
  : T extends `http://${infer R}`
    ? `http://${R}`
    : never

/************************************************** */
/** 上半部分类型，下半部分逻辑 */
/************************************************** */

const domain = {
  real: {
    boke: 'https://boke-api.18qjz.cn',
  },
  pre: {
    boke: 'https://api-pre.xx.com',
  },
  stable: {
    boke: 'https://api-stable.xx.com',
  },
  dev: {
    // volin: 'http://192.168.99.8:8089', // 宽宽
    volin: 'http://192.168.99.92:8088', // 蓝一
  },
}

export default domain
