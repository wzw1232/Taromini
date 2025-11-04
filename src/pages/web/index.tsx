import { WebView } from '@tarojs/components';
import { useRouter } from '@tarojs/taro';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';

const WebPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const _url = router.params['url']!;
    const exp = /\?/;
    const url = _url + `${exp.test(_url) ? '&' : '?'}stamp=${dayjs().valueOf()}`;

    // 在 H5 环境下使用 location.replace，在其他环境下使用 WebView
    if (process.env.TARO_ENV === 'h5') {
      location.replace(url);
    }
  }, [router.params]);

  const _url = router.params['url']!;
  const exp = /\?/;
  const url = _url + `${exp.test(_url) ? '&' : '?'}stamp=${dayjs().valueOf()}`;

  return process.env.TARO_ENV !== 'h5' ? <WebView src={url} /> : <></>;
};

export default WebPage;

definePageConfig({
  // 这里不要设置标题，在Container组件上面设置
  navigationBarTitleText: '',
  navigationBarTextStyle: 'white',
});
