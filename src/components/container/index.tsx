import { getSafeAreaInsets } from '@/utils';
import { Icon } from '@antmjs/vantui';
import { Text, View } from '@tarojs/components';
import { getMenuButtonBoundingClientRect, navigateBack } from '@tarojs/taro';
import { ReactNode, useEffect, useState } from 'react';
import styles from './index.modules.scss';

interface Props {
  style?: React.CSSProperties;
  children?: ReactNode;
  title?: string;
}

// 获取右侧悬浮胶囊信息
const menuButtonInfo = getMenuButtonBoundingClientRect();
// 获取安全区域的信息
const { topSafeAreaHeight, bottomSafeAreaHeight } = getSafeAreaInsets();

const Container: React.FC<Props> = ({ style, children, title = '标题' }: Props) => {
  const [navHeight, setNavHeight] = useState(0);

  console.log(menuButtonInfo);

  useEffect(() => {
    setNavHeight(menuButtonInfo.height + 2 * (menuButtonInfo.top - topSafeAreaHeight));
  }, [menuButtonInfo]);

  //
  const handleGoHome = () => {
    navigateBack({ delta: 1 });
  };

  const navTitle = (
    <View
      className={styles.navTitle}
      style={{
        marginTop: `${topSafeAreaHeight}px`,
        height: `${navHeight}px`,
      }}
    >
      <View
        className={styles.leftTitleBox}
        style={{ width: `calc(100% - ${menuButtonInfo.left}px)`, height: '100%' }}
      >
        <View
          className={styles.iconBtn}
          style={{
            width: menuButtonInfo!.height * 0.9,
            height: menuButtonInfo!.height * 0.9,
          }}
          onClick={handleGoHome}
        >
          <Icon name="arrow-left" color="#1c1c1e" size={menuButtonInfo!.height * 1.2} />
        </View>
      </View>
      <View className={styles.titleBox}>
        {typeof title === 'string' ? <Text className={styles.titleText}>{title}</Text> : title}
      </View>
      <View
        className={styles.rightTitleBox}
        style={{ width: `calc(100% - ${menuButtonInfo.left}px)`, height: '100%' }}
      ></View>
    </View>
  );

  return (
    <View className={styles.pagaWrap}>
      {/* 标题区域 */}
      {navTitle}
      {/* 页面内容 */}
      <View className={styles.containerBox} style={{ paddingBottom: `${bottomSafeAreaHeight}px` }}>
        {children}
      </View>
    </View>
  );
};

export default Container;
