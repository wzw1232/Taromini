import {atom, PrimitiveAtom} from 'jotai'
import Taro from '@tarojs/taro'

// react native 不支持selector 会报错

export interface IMenuButton {
  // 用来判断是否同时通过systemInfo+menuButton得出来的数据
  precise: boolean
  bottom: number
  width: number
  height: number
  left: number
  right: number
  marginRight: number
  top: number
  center: number
  statusBarHeight: number
}

// 和UI有关的全局数据存储在这里，和UI无关的全局数据存储在cache.ts文件中

export const menuButtonStore = atom() as PrimitiveAtom<IMenuButton>

export const auditingAppStore = atom(false)

/**
 * 如果需要实时相关的数据，请直接调用getSystemInfo
 */
export const cacheSysInfoStore = atom() as PrimitiveAtom<undefined | Taro.getSystemInfo.Result>

export const tabbarSelected = atom() as PrimitiveAtom<any | undefined>
