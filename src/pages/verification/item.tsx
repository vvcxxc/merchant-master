import React, { Component } from 'react';
import styles from './index.less';
import { Flex } from 'antd-mobile';
import router from 'umi/router';

export interface Item {
	youhui_log_id: number;
	youhui_sn: string;
	name: string;
	confirm_time: string;
	user_name: string;
	image: string;
}

export default class VerificationItem extends Component<Item> {

	my_click = ()=>{
		router.push({ pathname: 'verification/success', query: { youhui_log_id: this.props.youhui_log_id } })
	}
	render() {
		// console.log(this.props,'8989898');

		return (
			<Flex className={styles.item} onClick={this.my_click}>
				<img src={this.props.image} className="img" alt="" />
				<Flex.Item>
					<Flex className="title" justify='between'>
          <div className='name'>	{this.props.name}</div>
						<div className="time">{this.props.confirm_time}</div>
					</Flex>
					<div className="info">核销会员：{this.props.user_name}</div>
					<div className="info">订单号：{this.props.youhui_sn}</div>
				</Flex.Item>
			</Flex>
		);
	}
}
