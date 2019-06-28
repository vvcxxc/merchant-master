import React, { Component } from 'react';
import { List, WingBlank, Flex, InputItem } from 'antd-mobile';
import styles from './create.less';

interface Props {
	onChange: (index: number, item: any) => any;
	index: number;
	item: any;
}

export default class PaymentReturnRules extends Component<Props> {
	handleChange = (type: string) => (e: any) => {
		this.props.onChange(this.props.index, {
			...this.props.item,
			[type]: e.target ? parseFloat(e.target.value) : e
		});
	};
	render() {
		const moneyInput = (
			<Flex>
				支付
				<InputItem className="numberInput" type="number" onChange={this.handleChange('money')} />
				元送
			</Flex>
		);
		const dateInput = (
			<Flex>
				发券日起
				<InputItem className="numberInput" type="number" onChange={this.handleChange('day')} />
				天可用
			</Flex>
		);
		const limitInput = (
			<Flex>
				满
				<InputItem className="numberInput" type="number" onChange={this.handleChange('limit')} />
				元可用
			</Flex>
		);
		return (
			<List className={styles.rules}>
				<WingBlank>
					<List.Item extra={moneyInput}>返券条件</List.Item>
					<InputItem type="money" extra="元" onChange={this.handleChange('returnMoney')}>
						面额
					</InputItem>
					<List.Item extra={limitInput}>使用门槛</List.Item>
					<List.Item extra={dateInput}>兑换券有效期</List.Item>
					<InputItem type="money" extra="张" onChange={this.handleChange('num')}>
						库存数量
					</InputItem>
				</WingBlank>
			</List>
		);
	}
}
