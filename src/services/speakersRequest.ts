import axios, { AxiosRequestConfig } from 'axios';
import router from 'umi/router';
import { Toast } from 'antd-mobile';
import QS from 'qs';
import Axios from 'axios';

interface Options extends AxiosRequestConfig {
  /**替换的主机域名 */
  host?: string;
}

declare global {
  interface Window { speaker_api: string; }
}

const host = window.speaker_api ? window.speaker_api : 'http://test.api.voice.tdianyi.com/';

/**发起请求
 *
 * 使用axios为底层方法
 *
 * 必要参数参考axios
 */
export default function request(options: Options) {
  const token = localStorage.getItem('token');
  options.headers = { ...options.headers, Authorization: token };
  options.url = options.host ? options.host + options.url : host + options.url;
  return axios(options)
    .then(res => res.data)
    .catch(err => {
      Toast.hide();
      if (err.response && err.response.status === 401) {
        router.push('/login');
      }
      if (err.response && err.response.status !== 401) {
        Toast.fail(err.response.data.message,1);
      }
      return new Promise(() => { });
    });
}

// export default function request(options: Options) {
//   const token = localStorage.getItem('token');
//   options.url = options.host ? options.host + options.url : host + options.url;

//   Axios.interceptors.request.use(function (config) {
//     if (token) {
//       config.headers.Authorization = token
//     }
//     return config
//   }, function (error) {
//     return Promise.reject(error)
//   })

//   if (options.method == "post") {
//     Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//     options.data = QS.stringify(options.data);
//     return Axios(options)
//       .then(res => res.data)
//       .catch(err => {
//         Toast.hide();
//         if (err.response && err.response.status === 401) {
//           router.push('/login');
//         }
//         if (err.response && err.response.status !== 401) {
//           Toast.fail(err.response.data.message, 1);
//         }
//         return new Promise(() => { });
//       });
//   } else {
//     return Axios(options)
//       .then(res => res.data)
//       .catch(err => {
//         Toast.hide();
//         if (err.response && err.response.status === 401) {
//           router.push('/login');
//         }
//         if (err.response && err.response.status !== 401) {
//           Toast.fail(err.response.data.message, 1);
//         }
//         return new Promise(() => { });
//       });
//   }
// }