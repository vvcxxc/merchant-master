/**title: 充值 */

import React, { Component } from 'react';
import styles from './index.less';
import { WingBlank, Flex, InputItem, Button, Toast } from 'antd-mobile';
import request from '@/services/request';

export default class Rechange extends Component {
	state = { money: 0 };
	/**input change */
	handleInputChange = (value: any) => this.setState({ money: parseFloat(value) });
	/** recahnge submit value */
	submit = () => {
		Toast.loading('充值中');
		request({ url: '', method: 'post', data: {} })
			.then(() => {
				Toast.info('充值成功');
			})
			.catch(() => Toast.hide());
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
