/**title: 支付返券详情 */

import React, { Component } from 'react';
import request from '@/services/request';
import { Toast, Flex, WingBlank } from 'antd-mobile';
import styles from './index.less';
import CouponCard from './coupon';
import moment from 'moment';

export default class payReturnDetail extends Component<any> {
	state = {
		data: {},
		hasData: false
	};
	componentDidMount = () => this.getData();
	getData = async () => {
		Toast.loading('');
		const res = await request({ url: 'v3/return_coupons/' + this.props.location.query.id });
		Toast.hide();
		if (res.code === 200) {
			this.setState({ data: res.data, hasData: true });
		}
	};
	render() {
		const data: any = this.state.data;

		if (!this.state.hasData) return null;

		/**优惠列表 */
		const coupons = data.coupon.map((_: any, index: number) => (
			<div className="couponWrap">
				<CouponCard key={index} {..._} />
			</div>
		));

		return (
			<div className={styles.page}>
				<WingBlank>
					<Flex className="head">
						<div className="label">返</div>
						<Flex.Item className="name">{data.activity.name}</Flex.Item>
						<div className="time">
							{moment.unix(data.activity.activity_begin_time).format('YYYY/MM/DD')}-
							{moment.unix(data.activity.activity_end_time).format('YYYY/MM/DD')}
						</div>
					</Flex>
					{coupons}
				</WingBlank>
			</div>
		);
	}
}
