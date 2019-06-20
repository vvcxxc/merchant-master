import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import styles from './index.less';

export interface Item {
	id: number;
	order_sn: string;
	create_time: string;
	payment_type: number;
	amount: string;
	store_amount: string;
	small_icon: string;
}

export default class BenefitItem extends Component<Item> {
	render() {
		return (
			<Flex className={styles.item}>
				<img src={this.props.small_icon} className="img" alt="" />
				<Flex.Item>
					<Flex className="title">
						<Flex.Item>{this.props.order_sn}</Flex.Item>
						<div className="price">{this.props.amount}</div>
					</Flex>
					<div className="info">{this.props.create_time}</div>
				</Flex.Item>
			</Flex>
		);
	}
}
