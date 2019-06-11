import React, { Component } from 'react';
import Modal from '@/components/modal';
import { Flex, DatePickerView } from 'antd-mobile';
import styles from './index.less';
import moment from 'moment';

interface Props {
	show: boolean;
	onClose: () => any;
}

export default class SelectTime extends Component<Props> {
	state = {
		startTime: undefined,
		endTime: undefined,
		active: 0
	};
	handleConfirm = () => {};
	handleSetActive = (type: number) => () => {
		if (type === this.state.active) {
			this.setState({ active: 0 });
		} else {
			this.setState({ active: type });
		}
	};
	handleChange = (
		date: string | number | void | moment.Moment | Date | (string | number)[] | moment.MomentInputObject | undefined
	) => {
		if (this.state.active !== 0) {
			this.setState({ [this.state.active === 1 ? 'startTime' : 'endTime']: moment(date).format('YYYY-MM-DD') });
		}
	};
	render() {
		const value =
			this.state.active === 1 ? this.state.startTime : this.state.active === 2 ? this.state.endTime : undefined;
		const minDate = this.state.active === 1 ? moment().toDate() : moment(this.state.startTime).toDate();

		const datePicker =
			this.state.active === 1 ? (
				<DatePickerView
					mode="date"
					value={moment(this.state.startTime).toDate()}
					minDate={minDate}
					onChange={this.handleChange}
				/>
			) : (
				<DatePickerView
					mode="date"
					value={moment(this.state.endTime).toDate()}
					minDate={minDate}
					onChange={this.handleChange}
				/>
			);
		return (
			<Modal
				title="选择投放时长"
				show={this.props.show}
				onClose={this.props.onClose}
				onCancel={this.props.onClose}
				onConfirm={this.handleConfirm}
			>
				<Flex className={styles.content}>
					<Flex.Item
						className={this.state.active === 1 ? styles.activeTime : styles.time}
						onClick={this.handleSetActive(1)}
					>
						{this.state.startTime}
					</Flex.Item>
					<div className={styles.zhi}>至</div>
					<Flex.Item
						className={this.state.active === 2 ? styles.activeTime : styles.time}
						onClick={this.handleSetActive(2)}
					>
						{this.state.endTime}
					</Flex.Item>
				</Flex>
				{datePicker}
			</Modal>
		);
	}
}
