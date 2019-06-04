/**title: 添加优惠券 */
import React, { Component } from 'react';
import { WingBlank, Flex, List, InputItem, ActionSheet } from 'antd-mobile';
import styles from './index.less';
import CouponForm from './coupon';

const types = ['优惠券', '现金券'];

export default class CreateCoupon extends Component {
	state = {
		type: 0 // 券的类型
	};

	handleSelectType = () =>
		ActionSheet.showActionSheetWithOptions({ options: types }, type =>
			this.setState({ type: type !== -1 ? type : this.state.type })
		);
	render() {
		const form = this.state.type === 0 ? <CouponForm /> : null;
		return (
			<Flex direction="column" className={styles.page}>
				<Flex.Item>
					<WingBlank>
						<List>
							<List.Item
								extra={types[this.state.type]}
								arrow="horizontal"
								onClick={this.handleSelectType}
							>
								券的类型
							</List.Item>
							{form}
						</List>
					</WingBlank>
				</Flex.Item>
				<Flex>footer</Flex>
			</Flex>
		);
	}
}
