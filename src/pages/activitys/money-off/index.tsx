import React, { Component } from 'react';
import TabPage from '@/components/tab-page';
import { WingBlank, Toast } from 'antd-mobile';
import Coupon from '../components/coupon';
import request from '@/services/request';
import AddButton from '../components/add-button';

export default class MoneyOff extends Component {
	state = { type: 1, data: [] };

	componentDidMount = () => this.getData();

	handleChange = (id: any) => {};

	getData = async () => {
		Toast.loading('');
		const res = await request({ url: 'v3/activity/more_decrease_list', params: { status: this.state.type } });
		Toast.hide();
		if (parseInt(res.code) === 200) {
			this.setState({ data: res.data });
		}
	};

	render() {
		const tabs = [{ id: 0, label: '进行中' }, { id: 1, label: '待生效' }, { id: 2, label: '已结束' }];
		const coupons = this.state.data.map((_: any) => <Coupon {..._} key={_.activity_id} type={1} />);
		return (
			<TabPage tabs={tabs} onChange={this.handleChange}>
				<WingBlank>
					{coupons}
					<AddButton />
				</WingBlank>
			</TabPage>
		);
	}
}
