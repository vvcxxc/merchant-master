/**title: 核销记录 */

import React, { Component } from 'react';
import styles from './index.less';
import { WingBlank, Toast } from 'antd-mobile';
import VerificationItem, { Item } from './item';
import request from '@/services/request';

export default class Verification extends Component {
	state = { data: [] };
	componentDidMount = () => this.getData();
	getData = async () => {
		Toast.loading('');
		const res = await request({ url: 'api/merchant/youhui/getuUerConsumeList' });
		Toast.hide();
		if (res.code === 200) {
			this.setState({ data: res.data });
		}
	};
	render() {
		const list = this.state.data.map((_: Item) => <VerificationItem key={_.youhui_log_id} {..._} />);
		return (
			<div className={styles.page}>
				<WingBlank>{list}</WingBlank>
			</div>
		);
	}
}
