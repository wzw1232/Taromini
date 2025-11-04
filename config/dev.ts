import type { UserConfigExport } from '@tarojs/cli';

export default {
  // 热更新
  hot: true,
  logger: {
    quiet: false,
    stats: true,
  },
  mini: {},
  h5: {},
} satisfies UserConfigExport<'webpack5'>;
