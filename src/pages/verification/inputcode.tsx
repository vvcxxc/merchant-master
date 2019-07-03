/**
 * title: 输码验证
 */

import React, { Component } from 'react';
import { InputItem, Flex, WingBlank, Button, Toast } from 'antd-mobile';
import styles from './index.less';
import request from '@/services/request';
import router from 'umi/router';

export default class InputCode extends Component {
	state = {
		code: ''
	};

	handleCode = (e: any) => {
		this.setState({
			code: e
		});
	};

	submit = () => {
		let { code } = this.state;
		if (code) {
			request({
				url: 'api/merchant/youhui/userConsume',
				method: 'post',
				data: {
					code
				}
			}).then(res => {
				if (res.code == 200) {

					router.push({
            pathname: '/verification/success',
            query: {
              id: res.data.youhu_log_id
            }
					});
				} else {
					Toast.fail(res.message);
				}
			});
		} else {
			Toast.fail('请输入优惠券码');
		}
	};

	render() {
		return (
			<div style={{ width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }}>
				<WingBlank>
					<Flex className={styles.input_code}>
						<InputItem placeholder="输入优惠券码" value={this.state.code} onChange={this.handleCode} />
					</Flex>
					<Button type="primary" style={{ marginTop: 400 }} onClick={this.submit}>
						确定
					</Button>
				</WingBlank>
			</div>
		);
	}
}
