/**
 * title: 我的订单
 */

import React, { Component } from 'react';
import styles from './index.less';
import { WingBlank, Flex, Toast } from 'antd-mobile';
import FiltrateLayout from '../../components/layout';
import request from '@/services/request';
import moment from 'moment';

export default class OrderPage extends Component {
	state = {
		list: [1, 2, 3, 4],
		insignificant: 0
	};

	undetermined = [
		{
			id: 0,
			label: '所有订单'
		},
		{ id: 1, label: '已支付' },
		{ id: 2, label: '已使用' },
		{ id: 3, label: '已退款' },
		{ id: 4, label: '已过期' }
	];

	componentDidMount() {
		this.getData();
	}

	getData = async (query?: any) => {
		Toast.loading('');
		const res = await request({ url: 'v3/coupons/order_list', params: query });
		Toast.hide();
		if (res.code === 200) {
			this.setState({ list: res.data, insignificant: res.total });
		}
	};

	handleLayoutChange = (query: any) => {
		this.getData({
			pay_status: query.hot,
			date: query.time ? moment(query.time).valueOf() : undefined
		});
	};

	render() {
		const orderList = this.state.list.map((_: any) => (
			<Flex key={_.id} className={styles.orderItem}>
				<img src={_.small_icon} />
				<Flex.Item className="content">
					<div className="ordernum">{_.youhui_sn}</div>
					<div className="time">{_.create_time}</div>
				</Flex.Item>
				<div className="status">{_.status_msg}</div>
			</Flex>
		));
		return (
			<FiltrateLayout
				undetermined={this.undetermined}
				hasInsignificant={true}
				insignificant={`${this.state.insignificant}笔交易`}
				onChange={this.handleLayoutChange}
			>
				{orderList}
			</FiltrateLayout>
		);
	}
}
