/**title: 支付返券 */
import React, { Component } from 'react';
import styles from './create.less';
import { WingBlank, List, Flex, Button, DatePicker, Toast } from 'antd-mobile';
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

	handleSubmit = async () => {
		Toast.loading('');
		let rules: any = {};
		/**http://ci.tdianyi.com/eolinker/#/home/project/inside/api/detail?groupID=62&childGroupID=77&apiID=354&projectName=v3%E5%95%86%E6%88%B7%E5%90%8E%E5%8F%B0&projectID=33 */
		this.state.rules.forEach((_: any, index) => {
			rules['return_coupon_need_amount' + (index + 1)] = _.money;
			rules['available_day' + (index + 1)] = _.day;
			rules['coupon_money' + (index + 1)] = _.returnMoney;
			rules['total_num' + (index + 1)] = _.num;
			rules['total_fee' + (index + 1)] = _.limit;
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
			Toast.success('发布成功');
			router.goBack();
		}
	};

	render() {
		const rules = this.state.rules.map((_, index) => (
			<div>
				<PaymentReturnRules item={_} index={index} key={index} onChange={this.handleRuleChange} />
				{index !== this.state.rules.length - 1 && <div className="line" />}
			</div>
		));
		const startDate = this.state.startDate ? moment(this.state.startDate).toDate() : undefined;
		const endDate = this.state.endDate ? moment(this.state.endDate).toDate() : undefined;
		const minDate = this.state.startDate ? moment(this.state.startDate).toDate() : moment().toDate();
		const maxDate = this.state.endDate ? moment(this.state.endDate).toDate() : undefined;
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
