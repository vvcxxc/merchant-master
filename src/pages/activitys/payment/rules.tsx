import React, { Component } from 'react';
import { List, WingBlank, Flex, InputItem,Toast } from 'antd-mobile';
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
	// 限制用户返券
	 limitCoupons(v: any) {
		 if(v.substr(0,1) === '.'){//过滤用户第一位输入为'.'
			  Toast.fail('返券需大于0元');
			 return
		 }

			let data =Number(v)
			if(Number(v)<=0){//过滤用户输入金额小于或者等于0
			 Toast.fail('返券需大于0元');
			 return
		 }

	 }

	 //限制面额
	 limitDenomination(v: any) {
		 if(v.substr(0,1) === '.'){//过滤用户第一位输入为'.'
			  Toast.fail('面额需大于0元');
			 return
		 }

			let data =Number(v)
			if(Number(v)<=0){//过滤用户输入金额小于或者等于0
			 Toast.fail('面额需大于0元');
			 return
		 }
	 }

	 // 限制使用门槛
	 limitThreshold(v:any){
		 if(v.substr(0,1) === '.'){//过滤用户第一位输入为'.'
			  Toast.fail('使用门槛不能低于0元');
			 return
		 }
		 	let data =Number(v)
			if(Number(v)<0){//过滤用户输入金额小于或者等于0
			Toast.fail('使用门槛不能低于0元');
			 return
		 }
	 }

	 //限制有效期
	 limmitInventory(v:any){
		if(Number(v)<=0){//过滤用户输入金额小于或者等于0
			 Toast.fail('库存数量需大于0');
			 return
		 }
	 }

	render() {
		const moneyInput = (
			<Flex>
				支付
				<InputItem className="numberInput" type="money"
				onChange={this.handleChange2('money')} value={String(this.props.item.money || '')}
				onVirtualKeyboardConfirm={this.limitCoupons.bind(this)}//点击确定
				onBlur={this.limitCoupons.bind(this)} //失去焦点触发
				/>
				元送
			</Flex>
		);
		const dateInput = (
			<Flex>
				领券日起
				<InputItem className="numberInput" type="money" onChange={this.handleChange('day')} value={String(this.props.item.day || '')} />
				天可用
			</Flex>
		);
		const limitInput = (
			<Flex>
				满
				<InputItem className="numberInput" type="money" onChange={this.handleChange2('limit')} value={String(this.props.item.limit || '')}
				onVirtualKeyboardConfirm={this.limitThreshold.bind(this)}//点击确定
				onBlur={this.limitThreshold.bind(this)} //失去焦点触发
				/>
				元可用
			</Flex>
		);
		return (
			<List className={styles.rules}>
				<WingBlank>
					<List.Item extra={moneyInput} >返券条件</List.Item>
					<InputItem type="money" extra="元" onChange={this.handleChange2('returnMoney')} value={String(this.props.item.returnMoney || '')}
					onVirtualKeyboardConfirm={this.limitDenomination.bind(this)}//点击确定
					onBlur={this.limitDenomination.bind(this)} //失去焦点触发
					>面额</InputItem>
					<List.Item extra={limitInput}>使用门槛</List.Item>
					<List.Item extra={dateInput}>优惠券有效期</List.Item>
					<InputItem type="money" extra="张" onChange={this.handleChange('num')} value={String(this.props.item.num || '')}
						onVirtualKeyboardConfirm={this.limmitInventory.bind(this)}//点击确定
						onBlur={this.limmitInventory.bind(this)} //失去焦点触发
					>库存数量</InputItem>
				</WingBlank>
			</List>
		);
	}
}
