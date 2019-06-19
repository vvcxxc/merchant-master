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

interface Props {
	onClick: (id: any) => any;
	list: Item[];
}

export default class MyCouponList extends Component<Props> {
	render() {
		const list = this.props.list.map((_: Item) => <MyCouponItem key={_.id} {..._} onClick={this.props.onClick} />);
		return <div>{list}</div>;
	}
}
