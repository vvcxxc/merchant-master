import axios, { AxiosRequestConfig } from 'axios';
interface Options extends AxiosRequestConfig {
	/**替换的主机域名 */
	host?: string;
}
const host = 'http://tmwl.oss-cn-shenzhen.aliyuncs.com';

/**base64转blob */
function b64toBlob(b64Data: any, contentType = '', sliceSize = 512) {
	const byteCharacters = atob(b64Data);
	const byteArrays = [];

	for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		const slice = byteCharacters.slice(offset, offset + sliceSize);

		const byteNumbers = new Array(slice.length);
		for (let i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}

		const byteArray = new Uint8Array(byteNumbers);

		byteArrays.push(byteArray);
	}

	const blob = new Blob(byteArrays, { type: contentType });
	return blob;
}

/**随机数 */
function randomString(len: any) {
	len = len || 32;
	const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
	const maxPos = chars.length;
	let pwd = '';
	for (let i = 0; i < len; i++) {
		pwd += chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return pwd;
}

function oss(options: Options, files: any) {
	const imgUrl = files;
	const block = imgUrl.split(';');
	const contentType = block[0].split(':')[1]; // In this case "image/jpeg"
	const realData = block[1].split(',')[1];
	var blob = b64toBlob(realData, contentType);
	const formData = new FormData();

	let oss_data = JSON.parse(localStorage.getItem('oss_data') || '');
	formData.append('OSSAccessKeyId', oss_data.OSSAccessKeyId);
	formData.append('callback', oss_data.callback);
	formData.append('host', oss_data.host);
	formData.append('policy', oss_data.policy);
	formData.append('signature', oss_data.signature);
	formData.append('success_action_status', '200');
	formData.append('key', oss_data.key + randomString(32) + '.png');
	formData.append('file', blob);

	options.headers = { ...options.headers, 'Content-Type': 'multipart/form-data' };
	options.url = host;
	options.data = formData;
	return axios(options)
		.then(res => res.data)
		.catch(err => {});
}

export default function upload(img: any) {
	return oss({ method: 'post' }, img);
}
