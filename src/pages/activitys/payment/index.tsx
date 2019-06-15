import React, { Component } from 'react';
import TabPage from '@/components/tab-page';
import { WingBlank, Toast } from 'antd-mobile';
import Coupon from '../components/coupon';
import request from '@/services/request';
import AddButton from '../components/add-button';
import router from 'umi/router';

export default class PayMent extends Component {
	state = {
		data: []
	};
	componentDidMount = () => this.getData(1);
	getData = async (type: number) => {
		Toast.loading('');
		const res = await request({ url: 'v3/return_coupons', params: { status: type } });
		Toast.hide();
		if (res.code === 200) {
			this.setState({ data: res.data });
		}
	};
	handleChange = (id: any) => this.getData(id);
	handleAdd = () => router.push('payment/create');
	render() {
		const tabs = [{ id: 1, label: '进行中' }, { id: 2, label: '待生效' }, { id: 3, label: '已结束' }];
		const coupons = this.state.data.map((_: any, index: number) => <Coupon type={0} key={_.id} {..._} />);
		return (
			<TabPage tabs={tabs} onChange={this.handleChange}>
				<WingBlank>{coupons}</WingBlank>
				<AddButton onClick={this.handleAdd} />
			</TabPage>
		);
	}
}
