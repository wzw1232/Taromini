import {request} from '@tarojs/taro'
import {randomStr} from '@antmjs/utils'
import {filterUndefinedAndNull, generateUUID, getSign} from '@/utils'
import {cacheGetSync} from '@/cache'
import type {IPrefix, IPathName} from '../constants'
import Taro from '@tarojs/taro'

// 基于和服务端的约定，这个方法主要是用来处理返回类型是json的请求，非json类型的自己单独封装
// 格式如下 { statusCode: number, data: { success: boolean, data: any, code: string, message: string } }
export default function innerRequest<
  T extends Omit<Taro.request.Option, 'success' | 'fail'>,
>(option: {
  [K in keyof T]: K extends 'url' ? IPathName<T[K], IPrefix> : T[K]
}) {
  if (option.method === 'GET') {
    option.data = filterUndefinedAndNull(option.data)
  }

  return new Promise(async (resolve: (res: CreateFetchResponse<any>) => void) => {
    const secret = await cacheGetSync('siscrt')
    // const token = (await cacheGetSync('token')) || ''
    const token = 'RTYyQkMxREZBQTYzODYyNjU0QjUzRjIyREYwOTI2MjI2NDBEMEFENDoxMDA3OmFwcA'
    const random = randomStr(16)
    const sign = getSign((option.data as any) || {}, random, secret)
    // const uuid = await cacheGetSync('uuid')
    // const _uuid = generateUUID()
    // const mobileId = uuid || _uuid
    // const mobileId = uuid || '40a1dddb-71ea-4946-a521-27ca798e438b'
    // if (!uuid) {
    //   await cacheSetSync('uuid', _uuid)
    // }
    option.header = {
      ...option.header,
      'X-M-KEY': random,
      'X-M-SIGN': sign,
      'X-M-TOKEN': token,
      mobileId: '40a1dddb-71ea-4946-a521-27ca798e438b',
      'X-M-APP': 'app',
    }

    option.timeout = option.timeout || 30000
    option.dataType = 'json'
    option.responseType = 'text'
    request({
      ...option,
    })
      .then(res => {
        // 符合返回的规范才认定为成功
        if ((res.data.data || res.data.code) && typeof res.data.success === 'boolean') {
          if (res.data.success) {
            resolve({
              header: res.header,
              success: true,
              code: '200',
              data: res.data.data,
              message: '',
            })
          } else {
            resolve({
              header: res.header,
              success: false,
              code: (res.data.code || 597).toString(),
              data: res.data.msg || res.data.message,
              message: res.data.msg || res.data.message,
            })
          }
        } else {
          if (res.statusCode === 200) res.statusCode = 598
          resolve({
            header: res.header,
            success: false,
            code: (res.statusCode || 599).toString(),
            data: res,
            message: '请求错误',
          })
        }
      })
      .catch(error => {
        console.log(error)
        resolve({
          header: {},
          success: false,
          code: '499',
          data: error,
          message: '网络不稳定，请重试',
        })
      })
  })
}
