import React, { Component } from 'react';
import MyGiveItem from './item';

interface Props {
	list: any[];
}
export default class MyGiveList extends Component<Props> {
	render() {
		const list = this.props.list.map((_: any) => <MyGiveItem key={_.id} {..._} />);
		return <div>{list}</div>;
	}
}
