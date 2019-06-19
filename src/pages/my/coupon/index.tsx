/** title: 优惠券 */
import React, { Component } from 'react';
import { WingBlank, Toast } from 'antd-mobile';
import styles from './index.less';
import MyCouponList from './list';
import request from '@/services/request';
import NoData from './noData';
import router from 'umi/router';

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

	hanldeClick = (id: number) => router.push({ pathname: './coupon/detail', state: { id } });

	render() {
		const content = this.state.list.length ? (
			<WingBlank>
				<MyCouponList list={this.state.list} onClick={this.hanldeClick} />
			</WingBlank>
		) : (
			<NoData />
		);
		return <div className={styles.page}>{content}</div>;
	}
}
