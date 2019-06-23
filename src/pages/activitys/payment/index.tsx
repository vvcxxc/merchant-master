/**title: 下单返券 */
import React, { Component } from 'react';
import TabPage from '@/components/tab-page';
import { WingBlank, Toast } from 'antd-mobile';
import Coupon from '../components/coupon';
import request from '@/services/request';
import AddButton from '../components/add-button';
import router from 'umi/router';

export default class PayMent extends Component {
	state = {
		data: [],
		pageStatus: 0
	};
	componentDidMount = () => this.getData(1);
	getData = async (type: number) => {
		this.setState({ pageStatus: type - 1 });
		Toast.loading('');
		const res = await request({ url: 'v3/return_coupons', params: { status: type } });
		Toast.hide();
		if (res.code === 200) {
			this.setState({ data: res.data });
		}
	};
	handleChange = (id: any) => this.getData(id);
	handleAdd = () => router.push('payment/create');
	handleClickCoupon = (id: number) => () => router.push({ pathname: '/activitys/payment/detail', query: { id } });
	render() {
		const tabs = [{ id: 1, label: '进行中' }, { id: 2, label: '待生效' }, { id: 3, label: '已结束' }];
		const coupons = this.state.data.map((_: any, index: number) => (
			<Coupon
				pageStatus={this.state.pageStatus}
				isPayment={true}
				onClick={this.handleClickCoupon(_.id)}
				{..._}
				key={_.id}
			/>
		));
		return (
			<TabPage tabs={tabs} onChange={this.handleChange}>
				<WingBlank>{coupons}</WingBlank>
				<AddButton onClick={this.handleAdd} />
			</TabPage>
		);
	}
}
