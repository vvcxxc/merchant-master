/**title: 满减活动 */

import React, { Component } from 'react';
import { Flex, Icon, WingBlank, List, Button, DatePickerView, Toast } from 'antd-mobile';
import ListItem from 'antd-mobile/lib/list/ListItem';
import SelectTime from '@/components/select-time';
import styles from './create.less';
import LimitItem from '../components/limit-item';
import moment from 'moment';
import Modal from '@/components/modal';
import request from '@/services/request';
import router from 'umi/router';

/**创建 */
export default class CreateMoneyOff extends Component {
	state = {
		start_date: '',
		end_date: '',
		rules: [{ min: undefined, max: undefined }],
		showSelectTime: false,
		indexList: [],
		timeSelect: false
	};
	handleShowSelectTime = () => { this.setState({ showSelectTime: true }) };
	//关闭时间选择
	closeModal = () => this.setState({ showSelectCoupon: false, showSelectTime: false, showSelectActivity: false });
	handleSelectTime = (time: any) => {
		this.setState({ start_date: new Date(time.startTime).toString(), end_date: new Date(time.endTime).toString() }, this.closeModal)
	};
	handleRuleChange = (index: number, rule: any) => {
		const rules = [...this.state.rules];
		rules.splice(index, 1, rule);
		this.setState({ rules });
	};




	handleRuleClick = (index: any) => {
		const rules = [...this.state.rules];
		if (index !== 0) {
			rules.splice(index, 1);
		} else {
			rules.push({ min: undefined, max: undefined });
		}
		this.setState({ rules });
	};

	onSubmit = async () => {
		let rulesList = this.state.rules;
		let indexList = [];
		for (let i = 0; i < rulesList.length; i++) {
			if (!rulesList[i].min || !rulesList[i].max || Number(rulesList[i].max) > Number(rulesList[i].min) || Number(rulesList[i].min) == 0 || Number(rulesList[i].max) == 0) {
				indexList.push(i);
			}
		}
		this.setState({ indexList: indexList })
		let timeSelectBool;
		if (!this.state.start_date || !this.state.end_date) {
			timeSelectBool = true;
			this.setState({ timeSelect: true })
		} else {
			timeSelectBool = false;
			this.setState({ timeSelect: false })
		}
		if (indexList.length > 0 || timeSelectBool == true) {
			return;
		}

		Toast.loading('');
		let a = moment(this.state.start_date).startOf('day')
		let activity_begin_time = moment(a._d).format('X')
		let b = moment(this.state.end_date).endOf('day')
		let activity_end_time = moment(b).format('X');

		const res = await request({
			url: 'v3/activity/more_decrease',
			method: 'post',
			data: {
				activity_begin_time,
				activity_end_time,
				grade: JSON.stringify(this.state.rules.map(_ => ({ more: _.min, decrease: _.max })))
			}
		});
		Toast.hide();

		if (res.code === 200) {
			Toast.success('添加成功', 2, () => {
				router.push('/activitys/money-off')
			});

		} else {
			Toast.fail(res.data);
		}

	};

	render() {
		const rules = this.state.rules.map((_, index) => (
			<LimitItem
				showAdd={index === 0}
				key={index}
				index={index}
				isError={this.state.indexList.indexOf(index) >= 0 ? true : false}
				{..._}
				onChange={this.handleRuleChange}
				onClick={this.handleRuleClick}
			/>
		));

		const { start_date, end_date, } = this.state;
		const time = start_date ? new Date(start_date).getFullYear() + '-' + (new Date(start_date).getMonth() + 1) + '-' + new Date(start_date).getDate() + '至' + new Date(end_date).getFullYear() + '-' + (new Date(end_date).getMonth() + 1) + '-' + new Date(end_date).getDate() : '';
		return (
			<div className={styles.page}>
				<WingBlank>

					<Flex className="notice" onClick={this.handleShowSelectTime}>
						<div style={{ color: "#666666" }}>活动时间</div>
						<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
							{time}
							<Icon type="right" color='#999' className="icon_right" />
						</div>
					</Flex>
					{
						this.state.timeSelect && (!this.state.start_date && !this.state.end_date) ? <div className="errorLine" >请选择活动时间后重新提交</div> : null
					}
					{
						this.state.timeSelect && ((this.state.start_date && !this.state.end_date) || (!this.state.start_date && this.state.end_date)) ? <div className="errorLine" >未设置开始时间/结束时间/,无法提交</div> : null
					}




					<div className="rules">{rules}</div>
					<div className="tip">点击+创建新的信息</div>
					<Button type="primary" className="btn" onClick={this.onSubmit}>
						发布
					</Button>


				</WingBlank>
				<SelectTime
					show={this.state.showSelectTime}
					onClose={this.closeModal}
					onConfirm={this.handleSelectTime}
				/>
			</div>
		);
	}
}
