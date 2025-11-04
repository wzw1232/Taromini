// @ts-ignore
import dayjs from 'dayjs'
import {randomNum} from '@antmjs/utils'
import COS from '@/libs/cos-wx-sdk-v5' //'cos-wx-sdk-v5'
import {getCosKey} from '@/actions/common'

export default function (options: {
  file: any
  filename: string
  index: number
  randomFileName?: boolean
  appointName?: string
  folderName?: string
}) {
  const {file, filename, index, appointName, folderName, randomFileName = true} = options
  return new Promise(
    async (resolve: (res: CreateFetchResponse<any> & {index?: number}) => void) => {
      const cos = new COS({
        // ForcePathStyle: true, // 如果使用了很多存储桶，可以通过打开后缀式，减少配置白名单域名数量，请求时会用地域域名
        getAuthorization: async function (_options: any, callback: (...prams: any) => void) {
          // 异步获取临时密钥
          const res = await getCosKey({}, 'info')
          if (res.success) {
            const {tmpSecretId, tmpSecretKey, sessionToken, startTime, expiredTime} = res.data
            callback({
              TmpSecretId: tmpSecretId,
              TmpSecretKey: tmpSecretKey,
              XCosSecurityToken: sessionToken,
              // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
              StartTime: startTime, // 时间戳，单位秒，如：1580000000
              ExpiredTime: expiredTime, // 时间戳，单位秒，如：1580000900
            })
          } else {
            resolve({
              code: '599',
              success: false,
              data: res,
              message: '请求异常',
              index,
              header: {},
            })
          }
        },
      })
      const ext = '.' + filename.substring(filename.lastIndexOf('.') + 1)
      const date = dayjs()
      const initFloder = `${date.get('year')}${date.get('month') + 1}${date.get('date')}${date.get(
        'hour',
      )}${date.get('minute')}${date.get('second')}`

      const folder = folderName ? `${folderName}/${initFloder}` : initFloder

      // @ts-ignore
      cos.postObject(
        {
          Bucket: 'sbqfc-1307862547',
          Region: 'ap-shanghai',
          Key: (appointName
            ? `img/${process.env.DEPLOY_ENV}/${appointName}`
            : `img/${process.env.DEPLOY_ENV}/${folder}/${
                randomFileName ? randomNum(10000, 100000) + ext : filename
              }`
          ).replace(/[\u4E00-\u9FFF\u0020]/g, ''),
          FilePath: file,
        },
        function (err, data) {
          if (data && data.Location) {
            data.url = file
            resolve({
              code: '200',
              success: true,
              data: data,
              message: '',
              index,
              header: {},
            })
          } else {
            resolve({
              code: '599',
              success: false,
              data: err,
              message: '请求异常',
              index,
              header: {},
            })
          }
        },
      )
    },
  )
}
