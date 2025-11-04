import { getSafeAreaInsets } from '@/utils';
import { View } from '@tarojs/components';
import { getMenuButtonBoundingClientRect, pxTransform } from '@tarojs/taro';
import { ReactNode } from 'react';
import styles from './index.module.scss';

interface Props {
  style?: React.CSSProperties;
  children?: ReactNode;
}

// 获取右侧悬浮胶囊信息
const menuButtonInfo = getMenuButtonBoundingClientRect();
// 获取安全区域的信息
const { topSafeAreaHeight, bottomSafeAreaHeight } = getSafeAreaInsets();

const navTitle = (
  <View className={styles.navTitle} style={{ marginTop: pxTransform(topSafeAreaHeight) }}>
    <View
      className={styles.leftTitleBox}
      style={{ width: pxTransform(menuButtonInfo.width) }}
    ></View>
    <View></View>
    <View
      className={styles.rightTitleBox}
      style={{ width: pxTransform(menuButtonInfo.width), height: '100%' }}
    ></View>
  </View>
);

const Container: React.FC<Props> = ({ style, children }: Props) => {
  return (
    <View className={styles.pagaWrap}>
      {/* 页面标题 */}
      {navTitle}
      {/* 页面内容 */}
      <View className={styles.containerBox}></View>
      {/* 底部安全区 */}
      <View
        style={{
          width: '100%',
          height: pxTransform(bottomSafeAreaHeight),
          backgroundColor: 'transparent',
        }}
      ></View>
    </View>
  );
};

export default Container;
