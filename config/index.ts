import { defineConfig, type UserConfigExport } from '@tarojs/cli';
import nodePath from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import devConfig from './dev';
import prodConfig from './prod';

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig<'webpack5'>(async (merge, { command, mode }) => {
  const baseConfig: UserConfigExport<'webpack5'> = {
    projectName: 'testVolin',
    date: '2025-11-4',
    designWidth: 750,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2,
    },
    sourceRoot: 'src',
    outputRoot: 'build',
    plugins: ['@tarojs/plugin-generator'],
    alias: {
      '@': nodePath.resolve(__dirname, '..', 'src'),
    },
    defineConstants: {},
    copy: {
      patterns: [],
      options: {},
    },
    framework: 'react',
    compiler: 'webpack5',
    cache: {
      enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },
    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {},
        },
        url: {
          enable: true,
          config: {
            limit: 10240,
          },
        },
        cssModules: {
          enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]',
          },
        },
        scss: {
          // 全局注入 SCSS 变量
          additionalData: `@import "@/styles/global.scss";`,
        },
      },
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin);
        chain.merge({
          resolve: {
            alias: {
              'react-dom': '@tarojs/react',
            },
          },
        });
      },
    },
    h5: {
      publicPath: '/',
      staticDirectory: 'static',
      output: {
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js',
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[chunkhash].css',
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]',
          },
        },
        scss: {
          // 全局注入 SCSS 变量
          additionalData: `@import "@/styles/global.scss";`,
        },
      },
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin);
      },
    },
    rn: {
      appName: 'taroDemo',
      postcss: {
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        },
      },
    },
  };

  process.env.BROWSERSLIST_ENV = process.env.NODE_ENV;

  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig);
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig);
});
