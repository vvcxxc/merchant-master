import React, { Component } from 'react';
import styles from './index.less';
import { Flex } from 'antd-mobile';
import router from 'umi/router';

export interface Item {
	id: number | string;
	prize_name: string;
	avatar: string;
	status: number | string;
	update_at: string;
	user_name: string;
	verification_supplier_id: number | string;
}

export default class VerificationItem extends Component<Item> {

	render() {
		// console.log(this.props,'8989898');
		return (
			<Flex className={styles.item} >
				<img src={this.props.avatar} className="img" alt="" />
				<Flex.Item>
					<Flex className="title">
						{this.props.prize_name}
						{/* <Flex.Item className="time">{this.props.update_at}</Flex.Item> */}
					</Flex>
					<div className="info">核销会员：{this.props.user_name}</div>
					<div className="info">{this.props.update_at}</div>
				</Flex.Item>
			</Flex>
		);
	}
}
