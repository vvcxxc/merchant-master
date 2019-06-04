/** title: 优惠券 */
import React, { Component } from 'react';
import { WingBlank, Toast } from 'antd-mobile';
import styles from './index.less';
import MyCouponList from './list';
import request from '@/services/request';
import NoData from './noData';

export default class MyCoupon extends Component {
	state = { list: [] };

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		Toast.loading('');
		request({ url: 'api/merchant/youhui/discounts/list' }).then(res => {
			Toast.hide();
			if (res.code === 200) {
				this.setState({ list: res.data });
			}
		});
	};
	render() {
		const content = this.state.list.length ? (
			<WingBlank>
				<MyCouponList list={this.state.list} />
			</WingBlank>
		) : (
			<NoData />
		);
		return <div className={styles.page}>{content}</div>;
	}
}
