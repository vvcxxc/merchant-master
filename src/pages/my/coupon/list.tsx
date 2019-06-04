import React, { Component } from 'react';
import MyCouponItem from './item';

interface Item {
	id: number;
	coupons_name: string;
	begin_time: number;
	end_time: number;
	return_money: string;
	total_num: number;
	image: string;
	total_fee: number;
	pay_money: string;
	user_count: number;
	store_name: string;
	validity: string;
}

export default class MyCouponList extends Component<any> {
	render() {
		const list = this.props.list.map((_: Item) => <MyCouponItem key={_.id} {..._} />);
		return <div>{list}</div>;
	}
}
