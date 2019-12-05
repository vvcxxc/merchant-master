import React, { Component } from 'react';
import { Flex, List, InputItem } from 'antd-mobile';
import { connect } from 'dva';
import { MoneyForm } from './model';
import CustomInput from './InputItem'
import styles from './index.less'

interface Props extends MoneyForm {
	dispatch: (arg0: any) => any;
	showPrice: boolean;
	error: any
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
			const { error } = this.props
			const priceInput = this.props.showPrice && (
				<CustomInput
					value={String(this.props.pay_money || '')}
					type="money"
					showName='购买价格'
					onChange={this.handleInput2('pay_money')}
					extra="元"
					error={error.buyingPrice}
				/>
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
					<CustomInput
						value={String(this.props.return_money || '')}
						type="money"
						showName='面额'
						onChange={this.handleInput2('return_money')}
						extra="元"
						error={error.amountError}
					/>
					{priceInput}
					<CustomInput
						showName='使用门槛'
						type="money"
						extra="元"
						value={this.props.total_fee}
						onChange={this.handleInput2('total_fee')}
						error={error.doorsill}
					/>
					<List.Item extra={DateInput}>优惠券有效期</List.Item>


					<div className={styles.groub_hint} style={{ borderTop: error.validity ? '1px solid red' : '' }}>{error.validity?error.validity:''}</div>

					<CustomInput
						showName='发放数量'
						type="money"
						extra="张"
						integer={6}
						value={String(this.props.total_num || '')}
						onChange={this.handleInput('total_num')}
						error={error.issuedNumber}
					/>

				</div>
			);
		}
	}
);
