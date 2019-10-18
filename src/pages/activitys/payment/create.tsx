/**title: 支付返券 */
import React, { Component } from 'react';
import styles from './create.less';
import { WingBlank, List, Flex, Button, Icon, DatePicker, Toast, InputItem, } from 'antd-mobile';
import PaymentReturnRules from './rules';
import moment from 'moment';
import request from '@/services/request';
import router from 'umi/router';
import SelectTime from '@/components/select-time';
import SelectCalendar from '@/components/calendar'
// import CreateCalendar from '@/components/calendarTwo'

export default class CreatePaymentReturn extends Component {
	state = {
		rules: [{}],
		start_date: '',
		end_date: '',
		showSelectTime: false,
		showStartTime: null,
		showEndtTime:null
	};
	// handleShowSelectTime = () => { this.setState({ showSelectTime: true }) };
	// 显示日历
	handleShowSelectTime = () => {
		console.log('显示日历');
		this.setState({ showSelectTime: true })
	}
	//关闭时间选择
	// closeModal = () => this.setState({ showSelectCoupon: false, showSelectTime: false, showSelectActivity: false });
	// handleSelectTime = (time: any) => {
	// 	console.log(time);
	// 	this.setState({ start_date: new Date(time.startTime).toString(), end_date: new Date(time.endTime).toString() }, this.closeModal)
	// };
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


	//用来对数据做限制
	limitData = (v: any) => {
		if (v) {
			if (v.substr(0, 1) === '.' || Number(v) <= 0) return false
			return true
		}
	}

	handleSubmit = async () => {
		if (!this.state.start_date || !this.state.end_date) {
			Toast.fail('没有选择活动时间');
			return;
		}

		let rulesData: any = this.state.rules[0];
		if (!this.limitData(rulesData.money)) {
			Toast.fail('返券需大于0元');
			return;
		}

		if (!this.limitData(rulesData.returnMoney)) {
			Toast.fail('面额需大于0元');
			return;
		}

		if (rulesData.limit) {
			if (rulesData.limit.substr(0, 1) === '.' || Number(rulesData.limit) < 0) {
				Toast.fail('使用门槛不能低于0元');
				return
			}
		} else {
			Toast.fail('使用门槛不能低于0元');
			return
		}

		if (!this.limitData(rulesData.num)) {
			Toast.fail('库存数量需大于0');
			return;
		}

		Toast.loading('');
		let rules: any = {};
		/**http://ci.tdianyi.com/eolinker/#/home/project/inside/api/detail?groupID=62&childGroupID=77&apiID=354&projectName=v3%E5%95%86%E6%88%B7%E5%90%8E%E5%8F%B0&projectID=33 */
		this.state.rules.forEach((_: any, index) => {
			rules['return_coupon_need_amount' + (index + 1)] = _.money * 1;
			rules['available_day' + (index + 1)] = _.day * 1;
			rules['coupon_money' + (index + 1)] = _.returnMoney * 1;
			rules['total_num' + (index + 1)] = _.num * 1;
			rules['total_fee' + (index + 1)] = _.limit * 1;
		});
		const { start_date, end_date } = this.state
		let activity_begin_time = start_date
		let activity_end_time = end_date
		// console.log(activity_begin_time, activity_end_time)
		const res = await request({
			url: 'v3/return_coupons',
			method: 'post',
			data: {
				coupon_sum: this.state.rules.length,
				activity_begin_time,
				activity_end_time,
				...rules
			}
		});
		Toast.hide();
		if (res.code === 200) {
			Toast.success('发布成功', 2, () => {
				router.push('/activitys/payment');
			});
		} else {
			Toast.fail(res.data, 2)
		}
	};

	handleDelete = () => {
		const rules = [...this.state.rules];
		rules.splice(rules.length - 1, 1);
		this.setState({ rules });
	};

	// 日历组件中获取 开始和结束时间
	start_endTime = (date: any) => {
		this.setState({ showSelectTime: false })
		if (!date.startTime)return 
		this.setState({ start_date: date.startTime, end_date: date.endTime })
		this.setState({ showStartTime: date.showStartTime, showEndtTime: date.showEndtTime })
	}
	render() {
		const rules = this.state.rules.map((_, index) => (
			<div key={' '}>
				<PaymentReturnRules item={_} index={index} key={index} onChange={this.handleRuleChange} />
				{index !== this.state.rules.length - 1 && <div className="line" />}
			</div>
		));

		const deleteBtn = (
			<Flex justify="center" onClick={this.handleDelete}>
				<div className="delete">删除</div>
			</Flex>
		);
		const { start_date, end_date, showStartTime, showEndtTime } = this.state;
		const time = start_date ? showStartTime + '至' + showEndtTime:''
		return (
			<div className={styles.page}>
				<List className="topForm">
					<WingBlank>
						<Flex className="notice" onClick={this.handleShowSelectTime}>
							<div style={{ color: "#666666" }}>活动时间</div>
							<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
								{time}
								<Icon type="right" color='#999' className="icon_right" />
							</div>
						</Flex>
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
				{/* <SelectTime
					show={this.state.showSelectTime}
					onClose={this.closeModal}
					onConfirm={this.handleSelectTime}
				/> */}
				<SelectCalendar
					show={this.state.showSelectTime}
					choose={this.start_endTime.bind(this)}/>
				{/* <CreateCalendar/> */}
			</div>
		);
	}
}
