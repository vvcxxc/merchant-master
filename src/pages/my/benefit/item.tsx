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
}

export default class BenefitItem extends Component<Item> {
	render() {
		return (
			<Flex className={styles.item}>
				<img src="" className="img" alt="" />
				<Flex.Item>
					<Flex className="title">
						{this.props.order_sn}
						<div className="price">{this.props.amount}</div>
					</Flex>
					<div className="info">{this.props.create_time}</div>
				</Flex.Item>
			</Flex>
		);
	}
}
