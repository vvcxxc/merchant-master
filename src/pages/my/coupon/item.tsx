import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import styles from './index.less';

interface Props {
	id: number;
	coupons_name: string;
	begin_time: number;
	end_time: number;
	return_money: string;
	total_num: number;
	image: string;
	total_fee: number;
	pay_money: string;
	user_count: number;
	store_name: string;
	validity: string;
}

export default class MyCouponItem extends Component<Props> {
	render() {
		const useScale = (this.props.total_num / this.props.user_count) * 100;
		return (
			<Flex className={styles.coupon} style={{ backgroundImage: `url(${require('./active-bg.png')})` }}>
				<Flex className="price-wrap" direction="column">
					<div className="price">
						￥<span>{parseFloat(this.props.return_money).toFixed(0)}</span>
					</div>
					<span className="info">满{this.props.total_fee}可用</span>
				</Flex>
				<Flex.Item>
					<Flex className="title">
						<div className="label">现金券</div>
						{this.props.coupons_name}
					</Flex>
					<div className="right-info info">{this.props.validity}</div>
					<Flex className={styles.progress}>
						<Flex.Item className="bar">
							<div className="line" style={{ width: `${useScale}%` }} />
						</Flex.Item>
						<div className="number">
							{this.props.total_num}/{this.props.user_count}
						</div>
					</Flex>
				</Flex.Item>
			</Flex>
		);
	}
}
