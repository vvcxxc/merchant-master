/**title: 展位广告 */

import React, { Component } from 'react';
import AdLayout from '../components/ad-layout';
import From from './form';
import ExpenseCalendar from '../components/expense-calendar';
import Chart from './chart';
import request from '@/services/request';
import { Toast } from 'antd-mobile';

export default class BusinessArea extends Component<any> {
	state = {
		data: {},
		// log: {},
		position: 0,
		adId: null, // 广告ID
		romotionType: 1 // 推广ID
	};
	componentDidMount() {
		this.getDetail();
	}
	getDetail = async () => {
		Toast.loading('');
		// 钻石-》支付页-》1      铂金-》线上商城-》3        黄金-》活动-》2
		let position;
		switch (this.props.location.query.type) {
			case '钻石展位':
				position = 1;
				break;
			case '黄金展位':
				position = 2;
				break;
			case '铂金展位':
				position = 3;
				break;
		}
		this.setState({ position });
		const res = await request({ url: 'v3/ads/by_type', params: { ad_type: 1, position_id: position, romotion_type: this.state.romotionType } });
		Toast.hide();
		if (res.code === 200) {
			if (res.data.length != 0) {
				this.setState({
					data: res.data[0],
					adId: res.data[0].id
				});
			} 
			else {
				// 为了防止美数据的情况下还把原本的数据带过去子组件
				this.setState({
					data : {}
				})
			}	
			// this.setLog();
		}
	};

	// setLog = async () => {
	// 	const res = await request({ url: 'v3/ad_logs', params: { ad_id: this.state.adId } });
	// 	if (res.code === 200) {
	// 		this.setState({ log: res.data });
	// 	}
	// };

	handleSuccess = () => this.getDetail();

	handleIndexFromChild = (v: any) => {
		this.setState({
			romotionType: v
		}, () => {
			this.getDetail()
		})

	}

	render() {
		const form = <From onSuccess={this.handleSuccess} position={this.state.position} getIndex={this.handleIndexFromChild}  editForm={this.state.data} type={this.props.location.query.type} />;
		// const expenseCalendar = <ExpenseCalendar log={this.state.log} />;
		const expenseCalendar = <ExpenseCalendar adId={this.state.adId} />;
		const chart = <Chart adId={this.state.adId} />;
		return <AdLayout children={[form, expenseCalendar, chart]} />;
	}
}
