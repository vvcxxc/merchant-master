import axios, { AxiosRequestConfig } from 'axios';
import router from 'umi/router';
import { Toast } from 'antd-mobile';

interface Options extends AxiosRequestConfig {
  /**替换的主机域名 */
  host?: string;
}

declare global {
  interface Window { api: string; }
}

const host = window.api ? window.api : 'http://test.api.supplier.tdianyi.com/';

/**发起请求
 *
 * 使用axios为底层方法
 *
 * 必要参数参考axios
 */
export default function request(options: Options) {
  /**验证token */
  const token = localStorage.getItem('token');
  /**合并headers */
  options.headers = { ...options.headers, Authorization: token };
  /**拼接接口地址 */
  options.url = options.host ? options.host + options.url : host + options.url;
  /**请求超时 */
  // options.timeout = 5000;
  /**axios 请求 */
  return axios(options)
    .then(res => res.data)
    .catch(err => {
      Toast.hide();
      if (err.response && err.response.status === 401) {
        router.push('/login');
      }
      if (err.response && err.response.status !== 401) {
        Toast.fail(err.response.data.message,500);
      }
      return new Promise(() => { });
    });
}
