import Taro from '@tarojs/taro';

export const getSafeAreaInsets = () => {
  const info = Taro.getSystemInfoSync();
  const topSafeAreaHeight = info.statusBarHeight || 0;
  const bottomSafeAreaHeight = info.screenHeight - (info.safeArea?.bottom || 0);
  return { topSafeAreaHeight, bottomSafeAreaHeight };
};
