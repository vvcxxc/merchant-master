import React, { Component } from 'react';
import Modal from '@/components/modal';
import { Flex, DatePickerView } from 'antd-mobile';
import styles from './index.less';
import moment from 'moment';

interface Props {
	show: boolean;
	onClose: () => any;
	onConfirm: (arg0: any) => any;
}

export default class SelectTime extends Component<Props> {
	state = {
		startTime: moment().format('YYYY-MM-DD'),
		endTime: undefined,
		active: 1
	};
	handleConfirm = () => {
		if (this.state.endTime && this.state.startTime) {
			let a = moment(this.state.endTime).endOf('day')
			let b = Number(moment(a._d).format('X'))
			this.props.onConfirm({
				startTime: moment(this.state.startTime).unix(),
				endTime: b 
			});
		}
	};
	handleSetActive = (type: number) => () => {
		this.setState({ active: type });
	};
	handleChange = (
		date: string | number | void | moment.Moment | Date | (string | number)[] | moment.MomentInputObject | undefined
	) => {
		if (this.state.active !== 0) {
			this.setState({ [this.state.active === 1 ? 'startTime' : 'endTime']: moment(date).format('YYYY-MM-DD') });
		}
	};
	render() {
		const minDate = this.state.active === 1 ? moment().toDate() : moment(this.state.startTime).toDate();
		const maxDate = this.state.active === 1 && this.state.endTime ? moment(this.state.endTime).toDate() : undefined;

		const datePicker =
			this.state.active === 1 ? (
				<DatePickerView
					mode="date"
					value={moment(this.state.startTime).toDate()}
					minDate={moment().toDate()}
					maxDate={maxDate}
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
