import React, { Component } from 'react';
import styles from './index.less';
import { Flex } from 'antd-mobile';

export interface Item {
	youhui_log_id: number;
	youhui_sn: string;
	name: string;
	confirm_time: string;
	user_name: string;
	image: string;
}

export default class VerificationItem extends Component<Item> {
	render() {
		return (
			<Flex className={styles.item}>
				<img src={this.props.image} className="img" alt="" />
				<Flex.Item>
					<Flex className="title">
						{this.props.name}
						<Flex.Item className="time">{this.props.confirm_time}</Flex.Item>
					</Flex>
					<div className="info">核销会员：{this.props.user_name}</div>
					<div className="info">订单号：{this.props.youhui_sn}</div>
				</Flex.Item>
			</Flex>
		);
	}
}
