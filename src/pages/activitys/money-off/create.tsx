/**title: 满减活动 */

import React, { Component } from 'react';
import { WingBlank, List, Button, DatePickerView, Toast } from 'antd-mobile';
import ListItem from 'antd-mobile/lib/list/ListItem';

import styles from './create.less';
import LimitItem from '../components/limit-item';
import moment from 'moment';
import Modal from '@/components/modal';
import request from '@/services/request';
import router from 'umi/router';

/**创建 */
export default class CreateMoneyOff extends Component {
	state = {
		startDate: moment().format('YYYY-MM-DD'),
		endDate: '',
		rules: [{ min: undefined, max: undefined }],
		modalShow: '',
		pickerValue: ''
	};
	handleRuleChange = (index: number, rule: any) => {
		const rules = [...this.state.rules];
		rules.splice(index, 1, rule);
		this.setState({ rules });
	};

	handleCloseModal = () => this.setState({ modalShow: '' });

	handleConfirmModal = (): void =>
		this.setState({ [this.state.modalShow]: this.state.pickerValue }, () =>
			this.setState({ pickerValue: '', modalShow: '' })
		);

	handleShowModal = (type: string) => () => {
		const pickerValue: string = type === 'startDate' ? this.state.startDate : this.state.endDate;
		this.setState({ modalShow: type, pickerValue });
	};

	handlePickerChange = (value: Date) => {
		this.setState({ pickerValue: moment(value).format('YYYY-MM-DD') });
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
		if (!this.state.startDate || !this.state.endDate) {
			Toast.fail('请选择日期');
		} else if (!this.state.rules.length && this.state.rules[0].max && this.state.rules[0].min) {
			Toast.fail('请填写满减规则');
		} else {
			Toast.loading('');
			const res = await request({
				url: 'v3/activity/more_decrease',
				method: 'post',
				data: {
					activity_begin_time: moment(this.state.startDate).unix(),
					activity_end_time: moment(this.state.endDate).unix(),
					grade: JSON.stringify(this.state.rules.map(_ => ({ more: _.min, decrease: _.max })))
				}
			});
			Toast.hide();

			if (res.code === 200) {
				Toast.success('添加成功');
				router.goBack();
			} else {
				Toast.fail(res.data);
			}
		}
	};

	render() {
		const rules = this.state.rules.map((_, index) => (
			<LimitItem
				showAdd={index === 0}
				key={index}
				index={index}
				{..._}
				onChange={this.handleRuleChange}
				onClick={this.handleRuleClick}
			/>
		));
		const minDate =
			this.state.modalShow === 'startDate' ? moment().toDate() : moment(this.state.startDate).toDate();
		const maxDate =
			this.state.modalShow === 'startDate'
				? this.state.endDate
					? moment(this.state.endDate).toDate()
					: undefined
				: undefined;
		return (
			<div className={styles.page}>
				<WingBlank>
					<List>
						<ListItem
							arrow="horizontal"
							extra={this.state.startDate}
							onClick={this.handleShowModal('startDate')}
						>
							开始日期
						</ListItem>
						<ListItem
							arrow="horizontal"
							extra={this.state.endDate}
							onClick={this.handleShowModal('endDate')}
						>
							结束日期
						</ListItem>
					</List>
					<div className="rules">{rules}</div>
					<div className="tip">点击+创建新的信息</div>
					<Button type="primary" className="btn" onClick={this.onSubmit}>
						发布
					</Button>
					<Modal
						show={!!this.state.modalShow}
						title="选择时间"
						okBtn="完成"
						onCancel={this.handleCloseModal}
						onClose={this.handleCloseModal}
						onConfirm={this.handleConfirmModal}
					>
						<DatePickerView
							minDate={minDate}
							value={moment(this.state.pickerValue || undefined).toDate()}
							onChange={this.handlePickerChange}
							mode="date"
						/>
					</Modal>
				</WingBlank>
			</div>
		);
	}
}
