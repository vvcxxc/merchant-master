import React, { Component } from 'react';
import styles from './index.less';
import TabPage from '@/components/tab-page';
import ContentDetail from './detail';

export default class Detial extends Component<any> {
	state = {
		pageType: 1,
		id: 0
	};

	componentDidMount = () => {
		this.setState({ id: this.props.location.state.id });
	};

	tabs = [{ id: 1, label: '详情' }, { id: 2, label: '领取' }];

	handleChange = (id: number) => this.setState({ pageType: id });

	render() {
		const content = this.state.pageType === 1 ? <ContentDetail id={this.state.id} /> : null;
		return (
			<TabPage tabs={this.tabs} onChange={this.handleChange}>
				{content}
			</TabPage>
		);
	}
}
