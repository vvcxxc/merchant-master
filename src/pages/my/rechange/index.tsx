/**title: 充值 */

import React, { Component } from 'react';
import styles from './index.less';
import { WingBlank, Flex, InputItem, Button, Toast } from 'antd-mobile';
import request from '@/services/request';
import Cookies from 'js-cookie';
declare global {
  interface Window { open_id: string; pay_url: string;}
}
const open_id = window.open_id ? window.open_id : 'test_open_id';
export default class Rechange extends Component {

	state = { money: 0 };
	/**input change */
	handleInputChange = (value: any) => this.setState({ money: parseFloat(value) });
	/** recahnge submit value */
	submit = async () => {
		Toast.loading('充值中');
		const res = await request({
			url: 'v3/pay/recharge',
			method: 'post',
			data: {
				xcx: 0,
				rechargeMoney: this.state.money,
				open_id
			}
		});

		Toast.hide();

		if (res.code === 200) {
			window.WeixinJSBridge.invoke('getBrandWCPayRequest', res.data, function(res: { err_msg: string }) {
				``;
				if (res.err_msg == 'get_brand_wcpay_request:ok') {
					// '支付成功'
				}
			});
		}
	};
	render() {
		return (
			<div className={styles.page}>
				<WingBlank>
					<div className="title">充值金额</div>
					<Flex className="input-wrap">
						<span className="symbol">￥</span>
						<Flex.Item>
							<InputItem type="money" placeholder="" onChange={this.handleInputChange} />
						</Flex.Item>
					</Flex>
					<Button type="primary" onClick={this.submit}>
						充值
					</Button>
				</WingBlank>
			</div>
		);
	}
}
