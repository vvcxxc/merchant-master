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
		if (e.indexOf(".") == -1) {
			this.props.onChange(this.props.index, {
				...this.props.item,
				[type]: e
			});
		}
	};
	handleChange2 = (type: string) => (e: any) => {
		if (e.split(".")[1] == undefined || (e.split(".")[1].length < 3 && e.split(".")[2] == undefined)) {
			this.props.onChange(this.props.index, {
				...this.props.item,
				[type]: e
			});
		}
	};
	render() {
		const moneyInput = (
			<Flex>
				支付
				<InputItem className="numberInput" type="money" onChange={this.handleChange2('money')} value={String(this.props.item.money || '')} clear />
				元送
			</Flex>
		);
		const dateInput = (
			<Flex>
				发券日起
				<InputItem className="numberInput" type="money" onChange={this.handleChange('day')} value={String(this.props.item.day || '')} clear />
				天可用
			</Flex>
		);
		const limitInput = (
			<Flex>
				满
				<InputItem className="numberInput" type="money" onChange={this.handleChange2('limit')} value={String(this.props.item.limit || '')} clear />
				元可用
			</Flex>
		);
		return (
			<List className={styles.rules}>
				<WingBlank>
					<List.Item extra={moneyInput} >返券条件</List.Item>
					<InputItem type="money" extra="元" onChange={this.handleChange2('returnMoney')} value={String(this.props.item.returnMoney || '')} clear>面额</InputItem>
					<List.Item extra={limitInput}>使用门槛</List.Item>
					<List.Item extra={dateInput}>优惠券有效期</List.Item>
					<InputItem type="money" extra="张" onChange={this.handleChange('num')} value={String(this.props.item.num || '')} clear>库存数量</InputItem>
				</WingBlank>
			</List>
		);
	}
}
