import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import styles from './index.less';

interface Props {
	onClick: (id: number) => any;
}

export interface Item {
	id?: number;
	coupons_name?: string;
	begin_time?: number;
	end_time?: number;
	return_money?: string;
	total_num?: number;
	image?: string;
	total_fee?: number;
	pay_money?: string;
	user_count?: number;
	store_name?: string;
	validity?: string;
	description?: any[];
}

export default class MyCouponItem extends Component<Props & Item> {
	handleClick = () => this.props.id && this.props.onClick(this.props.id);
	render() {
		const useScale =
			this.props.total_num && this.props.user_count && (this.props.total_num / this.props.user_count) * 100;
		return (
			<Flex className={styles.coupon} onClick={this.handleClick}>
				<Flex className="price-wrap" direction="column" justify="center">
					<div className="price">
						￥<span>{parseFloat(this.props.return_money || '0').toFixed(0)}</span>
					</div>
					<span className="info">满{this.props.total_fee}可用</span>
				</Flex>
				<Flex.Item className="rightBox">
					<Flex className="main">
						<Flex.Item>
							<Flex className="title">
								<div className="label">现金券</div>
								{this.props.coupons_name}
							</Flex>
							<div className="right-info info">{this.props.validity}</div>
							<Flex className={styles.progress}>
								<div className="bar">
									<div className="line" style={{ width: `${useScale}%` }} />
								</div>
								<div className="number">
									{this.props.total_num}/{this.props.user_count}
								</div>
							</Flex>
						</Flex.Item>
						<div className="createBannerBtn">生成海报</div>
					</Flex>
				</Flex.Item>
			</Flex>
		);
	}
}
