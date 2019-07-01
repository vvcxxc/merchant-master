import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  theme: {
    '@brand-primary': '#21418A',
  },
  define: {
    "window.api": "http://api.supplier.tdianyi.com/",
    "window.open_id": "open_id",
    "window.url": "http://api.tdianyi.com/",
    "window.from": "http://supplier.tdianyi.com",
    "window.pay_url": "http://api.tdianyi.com/payCentre/toSupplierWxPay"
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
        title: '团卖物联',
        dll: false,
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
