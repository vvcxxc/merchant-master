import React, { Component } from 'react';
import { Flex, List, InputItem } from 'antd-mobile';
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
					// [type]: value

				}
			});
		};

		handleInput2 = (type: string) => (value: any) => {
			if (value.split(".")[1] == undefined || (value.split(".")[1].length < 3 && value.split(".")[2] == undefined)) {
				this.props.dispatch({
					type: 'createCoupon/setMoney',
					payload: {
						// [type]: parseInt(value)
						[type]: value

					}
				});
			}
		};


		render() {
			const priceInput = this.props.showPrice && (
				<InputItem
					extra="元"
					type="money"
					value={String(this.props.pay_money || '')}
					onChange={this.handleInput2('pay_money')}
				>
					购买价格
				</InputItem>
			);


			const DateInput = (
				<Flex>
					购券日起
				<InputItem
				className="numberInput" 
						extra="天可用"
						type="money"
						value={String(this.props.validity || '')}
						onChange={this.handleInput('validity')}
					/>
				</Flex>
			);



			return (
				<div>
					<InputItem
						value={String(this.props.return_money || '')}
						type="money"
						onChange={this.handleInput2('return_money')}
						extra="元"
					>
						面额
					</InputItem>
					{priceInput}
					<InputItem
						type="money"
						extra="元"
						value={this.props.total_fee}
						onChange={this.handleInput2('total_fee')}
					>
						使用门槛
					</InputItem>
					<List.Item extra={DateInput}>优惠券有效期</List.Item>
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
