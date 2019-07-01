import React, { Component } from 'react';
import MyCouponItem, { Item } from './item';

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
