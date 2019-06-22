import React, { Component } from 'react';
import { InputItem } from 'antd-mobile';
import { connect } from 'dva';
import { MoneyForm } from './model';

interface Props extends MoneyForm {
	dispatch: (arg0: any) => any;
	showPrice: boolean;
}

/**创建优惠券 */
export default connect(({ createCoupon }: any) => createCoupon.moneyForm)(
	class MoneyForm extends Component<Props> {
		handleInput = (type: string) => (value: any) => {
			this.props.dispatch({
				type: 'createCoupon/setMoney',
				payload: {
					[type]: parseInt(value)
				}
			});
		};

		render() {
			const priceInput = this.props.showPrice && (
				<InputItem
					extra="元"
					type="money"
					value={String(this.props.pay_money || '')}
					onChange={this.handleInput('pay_money')}
				>
					购买价格
				</InputItem>
			);
			return (
				<div>
					<InputItem
						value={String(this.props.return_money || '')}
						type="money"
						onChange={this.handleInput('return_money')}
						extra="元"
					>
						面额
					</InputItem>
					{priceInput}
					<InputItem
						type="money"
						extra="张"
						value={String(this.props.total_fee || '')}
						onChange={this.handleInput('total_fee')}
					>
						使用门槛
					</InputItem>
					<InputItem
						extra="天可用"
						type="money"
						value={String(this.props.validity || '')}
						onChange={this.handleInput('validity')}
					>
						优惠券有效期
					</InputItem>
					<InputItem
						type="money"
						extra="张"
						value={String(this.props.total_num || '')}
						onChange={this.handleInput('total_num')}
					>
						发放数量
					</InputItem>
				</div>
			);
		}
	}
);
