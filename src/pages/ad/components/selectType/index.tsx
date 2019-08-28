import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import styles from './index.less';

interface Props {
	value?: number;
	onChange: (arg0: number) => any;
}

export default class SelectAdType extends Component<Props> {
	// list = ['本店', '优惠券', '活动', '链接'];
	list = ['本店', '优惠券'];

	state = {
		value: 0
	};

	componentWillReceiveProps(nextProps: any) {
		if (nextProps.value !== this.state.value) {
			this.setState({ value: nextProps.value });
		}
	}

	handleClick = (index: number) => () => {
		this.props.onChange(index)
	};

	render() {
		const labels = this.list.map((_, index) => (
			<div
				className={index === this.state.value ? styles.label + ' ' + styles.activeLabel : styles.label}
				key={_}
				onClick={this.handleClick(index)}
			>
				{_}
			</div>
		));
		return (
			<Flex className={styles.selectType}>
				<div className={styles.title}>我想推广</div>
				<Flex.Item>{labels}</Flex.Item>
			</Flex>
		);
	}
}
