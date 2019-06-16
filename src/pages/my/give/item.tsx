import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import styles from './index.less';

export default class MyGiveItem extends Component<any> {
	render() {
		return (
			<Flex className={styles.item}>
				<Flex.Item>
					<div>{this.props.name}</div>
					<span>{this.props.created_at}</span>
				</Flex.Item>
				<div className="after">
					<div>{this.props.integral}</div>
					<span>{this.props.msg}</span>
				</div>
			</Flex>
		);
	}
}
