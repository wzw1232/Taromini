import { Image, View } from '@tarojs/components';
import { navigateTo, pxTransform, switchTab } from '@tarojs/taro';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';

// tabBar 配置
const tabBarList = [
  {
    pagePath: '/pages/index/index',
    text: '空间',
    iconPath: 'https://g.18qjz.cn/img/volin/public/space.png',
    selectedIconPath: 'https://g.18qjz.cn/img/volin/public/space_choose.png',
  },
  {
    pagePath: '/pages/scene/index',
    text: '场景',
    iconPath: 'https://g.18qjz.cn/img/volin/public/scene.png',
    selectedIconPath: 'https://g.18qjz.cn/img/volin/public/scene_choose.png',
  },
  {
    pagePath: '/pages/auto/index',
    text: '自动化',
    iconPath: 'https://g.18qjz.cn/img/volin/public/automation.png',
    selectedIconPath: 'https://g.18qjz.cn/img/volin/public/automation_choose.png',
  },
  {
    pagePath: '/pages/mine/index',
    text: '我的',
    iconPath: 'https://g.18qjz.cn/img/volin/public/profile.png',
    selectedIconPath: 'https://g.18qjz.cn/img/volin/public/profile_choose.png',
  },
];

interface Props {
  active: number;
  bottom?: number;
}

const CustomTabBar: React.FC<Props> = ({ active, bottom = 0 }) => {
  const [list, setList] = useState<typeof tabBarList | undefined>(undefined);
  const color = '#cccccc';
  const selectedColor = '#1b9666';

  useEffect(() => {
    setList(tabBarList);
    // 示例：如果没有 token，跳转到某个页面
    navigateTo({ url: '/pages/auto/other/planAdjust' });
  }, []);

  const switchTabBar = (pagePath: string) => {
    if (
      (active === 0 && pagePath === '/pages/index/index') ||
      // (active === 1 && pagePath === '/pages/scene/index') ||
      // (active === 2 && pagePath === '/pages/auto/index') ||
      (active === 3 && pagePath === '/pages/mine/index')
    )
      return;
    switchTab({ url: pagePath });
  };

  if (!list || list.length === 0) return null;

  return (
    <View className={classNames(styles.tabBar, 'fixedBottomButtonView')} style={{ bottom }}>
      {list.map((item, index) => (
        <View key={index} className={styles.tabBarItem} onClick={() => switchTabBar(item.pagePath)}>
          <Image
            style={{
              marginTop: pxTransform(16),
              width: pxTransform(50),
              height: pxTransform(50),
            }}
            src={active === index ? item.selectedIconPath : item.iconPath}
          />
          <View
            className={styles.itemText}
            style={{ color: active === index ? selectedColor : color }}
          >
            {item.text}
          </View>
        </View>
      ))}
    </View>
  );
};

export default CustomTabBar;
