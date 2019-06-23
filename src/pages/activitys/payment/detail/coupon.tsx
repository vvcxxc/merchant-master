import React, { Component } from 'react';
import styles from './index.less';
import { Flex } from 'antd-mobile';

interface Props {
	name: string;
	begin_time: number;
	end_time: number;
	expire_day: number;
	is_superposition: number;
	return_money: string;
	use_sum: number;
	user_count: number;
	total_num: number;
}

export default class CouponCard extends Component<Props> {
	render() {
		return (
			<div className={styles.couponCard}>
				<div className="price">{this.props.return_money}</div>
				<div className="info">
					<span>满{30}可用</span>
					<span>有效期{this.props.expire_day}天</span>
				</div>
				<ProgressBar title="库存" value={60} label="1000张" />
				<ProgressBar title="已领" value={60} label="1000张" />
				<ProgressBar title="已使用" value={60} label="1000张" />
			</div>
		);
	}
}

interface ProgressBarProps {
	title: string;
	/**进度 1-100 */
	value: number;
	/**右边显示文字 */
	label: string;
}

class ProgressBar extends Component<ProgressBarProps> {
	render() {
		return (
			<div className={styles.progressBar}>
				<div className="title">{this.props.title}</div>
				<Flex>
					<div className="bar">
						<div className="line" style={{ width: this.props.value + '%' }} />
					</div>
					<div className="label">{this.props.label}</div>
				</Flex>
			</div>
		);
	}
}
