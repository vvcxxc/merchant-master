/**title: 商圈广告 */

import React, { Component } from 'react';
import AdLayout from '../components/ad-layout';
import From from './form';
import ExpenseCalendar from '../components/expense-calendar';
import Chart from './chart';
import request from '@/services/request';
import { Toast } from 'antd-mobile';

export default class BusinessArea extends Component<any> {
	componentDidMount() {
		this.getDetail();
	}
	getDetail = async () => {
		Toast.loading('');
		// const types = await request({ url: 'v3/ad_positions' });
		// console.log(types);
		// 钻石-》支付页-》1      铂金-》线上商城-》3        黄金-》活动-》2
		const res = await request({ url: 'v3/ads/by_type', params: { ad_type: 2 } });
		Toast.hide();
	};
	render() {
		const form = <From />;
		const expenseCalendar = <ExpenseCalendar />;
		const chart = <Chart />;
		return <AdLayout children={[form, expenseCalendar, chart]} />;
	}
}
