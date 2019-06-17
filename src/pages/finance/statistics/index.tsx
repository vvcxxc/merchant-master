/**title: 财务统计 */
import React, { Component } from 'react';

import styles from './index.less';
import { WingBlank, Flex, DatePicker } from 'antd-mobile';
import moment from 'moment';
import Box from './box';

export default class FinanceStatistis extends Component {
	state = {
		date: moment().format('YYYY/MM')
	};
	handlePickerChange = (date: Date) => this.setState({ date: moment(date).format('YYYY/MM') });
	render() {
		return (
			<div className={styles.page}>
				<div className="bg" />
				<WingBlank className="content">
					<DatePicker
						mode="month"
						value={moment(this.state.date).toDate()}
						onChange={this.handlePickerChange}
					>
						<Flex className="time-select">
							{this.state.date}
							<img src="" alt="" />
						</Flex>
					</DatePicker>
					<Box title="营业收入走势图" isNoDate={true} />
					<Box title="营业收入" isNoDate={true} />
					<Box title="支付渠道" isNoDate={true} />
					<Box title="平台收益" isNoDate={true} />
				</WingBlank>
			</div>
		);
	}
}
