/**title: 支付返券 */
import React, { Component } from 'react';
import styles from './create.less';
import { WingBlank, List, Flex, Button, DatePicker, Toast, InputItem, } from 'antd-mobile';
import PaymentReturnRules from './rules';
import moment from 'moment';
import request from '@/services/request';
import router from 'umi/router';

export default class CreatePaymentReturn extends Component {
	state = {
		startDate: moment().format('YYYY-MM-DD'),
		endDate: '',
		rules: [{}]
	};

	handleRuleChange = (index: number, item: any) => {
		const rules = [...this.state.rules];
		rules.splice(index, 1, item);
		this.setState({ rules });
	};

	handleAddRule = () => {
		const rules = [...this.state.rules];
		rules.push({});
		this.setState({ rules });
	};

	handleDateChange = (type: string) => (value: Date) => {
		this.setState({ [type]: moment(value).format('YYYY-MM-DD') });
	};

	//用来对数据做限制
	limitData=(v:any)=>{
		if(v){
			if(v.substr(0,1) === '.' || Number(v)<=0) return false
			return true
		}
	}

	handleSubmit = async () => {
		const { startDate, endDate } = this.state
		let rulesData :any = this.state.rules[0]
		let start_date = new Date(startDate).getTime();
		let end_date = new Date(endDate).getTime();

		if (end_date <= start_date ) { //效验结束时间必须大于开始时间
			Toast.fail('结束日期应大于起始日期');
			return;
		}

		if(!this.limitData(rulesData.money)){
				Toast.fail('返券需大于0元');
			return;
		}

		if(!this.limitData(rulesData.returnMoney)){
				Toast.fail('面额需大于0元');
			return;
		}
		
		if(rulesData.limit){
			if(rulesData.limit.substr(0,1) === '.' || Number(rulesData.limit)<0){
				Toast.fail('使用门槛不能低于0元');
				return
			}
		}else {
			Toast.fail('使用门槛不能低于0元');
				return
		}
		
		if(!this.limitData(rulesData.num)){
			Toast.fail('库存数量需大于0');
			return;
		}

		Toast.loading('');
		let rules: any = {};
		/**http://ci.tdianyi.com/eolinker/#/home/project/inside/api/detail?groupID=62&childGroupID=77&apiID=354&projectName=v3%E5%95%86%E6%88%B7%E5%90%8E%E5%8F%B0&projectID=33 */
		this.state.rules.forEach((_: any, index) => {
			rules['return_coupon_need_amount' + (index + 1)] = _.money*1;
			rules['available_day' + (index + 1)] = _.day*1;
			rules['coupon_money' + (index + 1)] = _.returnMoney*1;
			rules['total_num' + (index + 1)] = _.num*1;
			rules['total_fee' + (index + 1)] = _.limit*1;
		});
		const res = await request({
			url: 'v3/return_coupons',
			method: 'post',
			data: {
				coupon_sum: this.state.rules.length,
				activity_begin_time: moment(this.state.startDate).unix(),
				activity_end_time: moment(this.state.endDate).unix(),
				...rules
			}
		});
		Toast.hide();
		if (res.code === 200) {
			Toast.success('发布成功', 2, () => {
				router.push('/activitys/payment');
			});
		}else {
			Toast.fail(res.data , 2)
		}
	};

	handleDelete = () => {
		const rules = [...this.state.rules];
		rules.splice(rules.length - 1, 1);
		this.setState({ rules });
	};
	render() {
		const rules = this.state.rules.map((_, index) => (
			<div key={' '}>
				<PaymentReturnRules item={_} index={index} key={index} onChange={this.handleRuleChange} />
				{index !== this.state.rules.length - 1 && <div className="line" />}
			</div>
		));
		const startDate = this.state.startDate ? moment(this.state.startDate).toDate() : undefined;
		const endDate = this.state.endDate ? moment(this.state.endDate).toDate() : undefined;
		const minDate = this.state.startDate ? moment(this.state.startDate).toDate() : moment().toDate();
		const maxDate = this.state.endDate ? moment(this.state.endDate).toDate() : undefined;
		const deleteBtn = (
			<Flex justify="center" onClick={this.handleDelete}>
				<div className="delete">删除</div>
			</Flex>
		);
		return (
			<div className={styles.page}>
				<List className="topForm">
					<WingBlank>
						<DatePicker
							extra={this.state.startDate}
							mode="date"
							value={startDate}
							maxDate={maxDate}
							onChange={this.handleDateChange('startDate')}
						>
							<List.Item extra={this.state.startDate} arrow="horizontal">
								开始日期
							</List.Item>
						</DatePicker>
						<DatePicker
							extra={this.state.endDate}
							mode="date"
							value={endDate}
							minDate={minDate}
							onChange={this.handleDateChange('endDate')}
						>
							<List.Item extra={this.state.endDate} arrow="horizontal">
								结束日期
							</List.Item>
						</DatePicker>
					</WingBlank>
				</List>
				<div className="line" />
				{rules}
				{this.state.rules.length > 1 && deleteBtn}
				<Flex direction="column" className="add" onClick={this.handleAddRule}>
					<img src={require('./add.png')} />
					添加返券条件
				</Flex>
				<WingBlank>
					<Button type="primary" className="submitBtn" onClick={this.handleSubmit}>
						发布
					</Button>
				</WingBlank>
			</div>
		);
	}
}
