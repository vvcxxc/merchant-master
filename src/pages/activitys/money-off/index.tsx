/**title: 满减活动 */
import React, { Component } from 'react';
import TabPage from '@/components/tab-page';
import { WingBlank, Toast } from 'antd-mobile';
import Coupon from '../components/coupon';
import request from '@/services/request';
import AddButton from '../components/add-button';
import router from 'umi/router';

export default class MoneyOff extends Component {
	state = { type: 1, data: [] };

	componentDidMount = () => this.getData();

	handleChange = (id: any) => this.setState({ type: id }, this.getData);

	getData = async () => {
		Toast.loading('');
		const res = await request({ url: 'v3/activity/more_decrease_list', params: { status: this.state.type } });
		Toast.hide();
		if (parseInt(res.code) === 200) {
			this.setState({ data: res.data });
		}
	};

	handleClickCoupon = (id: any) => {
		router.push({ pathname: '/activitys/money-off/detail', state: { id } });
	};

	handleClickAdd = () => router.push('money-off/create');

	render() {
		const tabs = [{ id: 1, label: '进行中' }, { id: 2, label: '待生效' }, { id: 3, label: '已结束' }];
		const coupons = this.state.data.map((_: any) => (
			<Coupon
				pageStatus={this.state.type - 1}
				{..._}
				onClick={this.handleClickCoupon}
				key={_.activity_id}
				type={1}
			/>
		));
		return (
			<TabPage tabs={tabs} onChange={this.handleChange}>
				<WingBlank>
					{coupons}
					<AddButton onClick={this.handleClickAdd} />
				</WingBlank>
			</TabPage>
		);
	}
}
