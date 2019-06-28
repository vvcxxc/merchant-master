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
	/**0兑换 1现金 */
	youhui_type?: number;
	/**状态 1:开启 2已暂停 3已删除 */
	publish_wait: number;
}

export default class MyCouponItem extends Component<Props & Item> {
	handleClick = () => this.props.id && this.props.onClick(this.props.id);
	render() {
		const useScale =
			this.props.total_num && this.props.user_count && (this.props.total_num / this.props.user_count) * 100;
		const leftMain =
			this.props.youhui_type === 1 ? (
				<Flex className="price-wrap" direction="column" justify="center">
					<div className="price">
						￥<span>{parseFloat(this.props.return_money || '0').toFixed(0)}</span>
					</div>
					<span className="info">满{this.props.total_fee}可用</span>
				</Flex>
			) : (
				<Flex className="price-wrap">
					<img src={this.props.image} />
				</Flex>
			);
		return (
			<Flex className={styles.coupon} onClick={this.handleClick}>
				{leftMain}
				<Flex.Item className="rightBox">
					<Flex className="main">
						<Flex.Item>
							<Flex className="title">
								<div className={this.props.youhui_type === 1 ? 'label money' : 'label coupon'}>
									{this.props.youhui_type === 0 && '兑换券'}
									{this.props.youhui_type === 1 && '现金券'}
								</div>
								<Flex.Item className="titleContent">{this.props.coupons_name}</Flex.Item>
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
						{this.props.publish_wait === 1 && <div className="createBannerBtn">生成海报</div>}
						{this.props.publish_wait === 2 && <div className="stopBtn">已暂停发放</div>}
						{this.props.publish_wait === 3 && <div className="stopBtn">已删除</div>}
					</Flex>
				</Flex.Item>
			</Flex>
		);
	}
}
