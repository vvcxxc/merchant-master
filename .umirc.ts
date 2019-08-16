import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  theme: {
    '@brand-primary': '#21418A',
  },

  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        hd: true,
        antd: true,
        dva: true,
        dynamicImport: { webpackChunkName: true },
        title: '小熊敬礼',
        dll: false,
        devServer: {
          host: '192.168.2.187',
          inline: true,
          port: 8090,
        },
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
};
export default config;
