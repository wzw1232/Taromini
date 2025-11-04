import {hideLoading} from '@tarojs/taro'
import dayjs from 'dayjs'
import {EMlf} from '@/trace/tools'
import {cacheGetSync} from '@/cache'
import {monitor} from '@/trace'
import type {IPrefix, IPathName, IHref, TProxy} from './constants'
import DOMAIN from './constants'
// 注意：下面三个方法的调用不需要处理reject的场景，内部对请求做了封装，统一抛出到resolve内
import _request from './innerRequest'
import _tencentUpload from './tencentUpload/index'

function sendMonitor(option: any, res: any) {
  const params = {
    d1: option.url,
    d2: JSON.stringify(option),
    d3: res.status,
    d4: res.code,
    d5: JSON.stringify(res),
  }
  if (params.d4 !== '206' && params.d4 !== '499') {
    monitor(EMlf.api, params)
  }
}

async function url(option: Taro.request.Option) {
  const locDomain = await cacheGetSync('domain')
  const prefix = option.url.split('/')[1] as IPrefix
  const isH5Dev = process.env.NODE_ENV === 'development' && process.env.TARO_ENV == 'h5'
  const domain = isH5Dev
    ? ''
    : process.env.DEPLOY_ENV === 'dev'
      ? locDomain || DOMAIN[process.env.DEPLOY_ENV][prefix]
      : DOMAIN[process.env.DEPLOY_ENV][prefix]

  // 暂时先不支持缓存，优化的时候再处理吧
  option.url =
    domain +
    option.url +
    (option.url.indexOf('?') > -1 ? `&t=${dayjs().valueOf()}` : `?t=${dayjs().valueOf()}`)
}
// const mockToken = ''
async function header(option: Taro.request.Option) {
  const token = await cacheGetSync('token')
  const header = {
    Accept: '*/*',
    'Content-Type': 'application/json',
    'X-M-VERSION': process.env.DEPLOY_VERSION,
    'X-M-TOKEN': token,
    'X-M-TYPE': process.env.TARO_ENV,
    'X-M-APP': process.env.TARO_ENV === 'rn' ? 'app' : 'mini',
    release: process.env.GRAY === 'true' ? 'gray' : process.env.DEPLOY_ENV,
    // 'X-M-TOKEN': token || (process.env.DEPLOY_ENV === 'dev' ? mockToken : ''),
  }
  option.header = header
}

async function request<
  T extends Omit<Taro.request.Option, 'success' | 'fail' | 'header'>,
  M extends TProxy,
>(
  options: {
    [K in keyof T]: K extends 'url' ? IPathName<T[K], IPrefix> : T[K]
  },
  type?: M,
): Promise<M extends 'info' ? CreateFetchResponse<any> : any> {
  // warning: 直接内部帮你做了toast
  // info：直接把整个数据返回给请求的await结果
  await url(options)
  await header(options)
  return _request(options).then(res => {
    if (res.code !== '200') {
      sendMonitor(options, res)
    }

    if (res.success) {
      if (type === 'info') {
        return res
      } else {
        return res.data
      }
    } else {
      if (type === 'info') {
        return res
      } else {
        try {
          hideLoading()
        } catch {}
        throw res
      }
    }
  })
}

// 只处理response.data为json的情况,其他返回都属于异常
// 自动化使用的方法
export function createFetch<REQ extends Record<string, any>, RES extends Record<string, any>>(
  url: any,
  method: 'GET' | 'POST',
) {
  return <T extends TProxy = 'warning'>(
    data: REQ,
    type?: T,
  ): Promise<T extends 'info' ? CreateFetchResponse<RES['data']> : RES['data']> => {
    return request(
      {
        url,
        method,
        data: data,
      },
      type,
    )
  }
}

export function thirdRequest<T extends Omit<Taro.request.Option, 'success' | 'fail'>>(options: {
  [K in keyof T]: K extends 'url' ? IHref<T[K]> : T[K]
}) {
  return _thirdRequest(options).then(res => {
    if (res.code !== '200') {
      sendMonitor(options, res)
    }
    return res
  })
}

export function tencentUpload(options: {
  file: any
  filename: string
  index: number
  randomFileName?: boolean
  appointName?: string
  folderName?: string
}) {
  return new Promise(
    (
      resolve: (res: CreateFetchResponse<any> & {index?: number}) => void,
      reject: (res: CreateFetchResponse<any> & {index?: number}) => void,
    ) => {
      _tencentUpload(options).then(res => {
        if (res.code !== '200') {
          sendMonitor(options.file + '_' + options.filename, res)
          reject(res)
        } else {
          resolve(res)
        }
      })
    },
  )
}
