import axios, { AxiosRequestConfig } from 'axios';

interface Options extends AxiosRequestConfig {
	/**替换的主机域名 */
	host?: string;
}

const host = 'http://test.api.supplier.tdianyi.com/';

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
	/**axios 请求 */
	return axios(options).then(res => res.data);
}
