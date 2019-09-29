import React, { Component } from 'react';
import styles from '../select-coupon/index.less';
import { Flex, PickerView, Toast } from 'antd-mobile';
import request from '@/services/request';
import router from 'umi/router';
import Modal from '@/components/modal';

interface Props {
	show: boolean;
	onClose: () => any;
	onSelect: (arg0: any) => any;
	isAd?: number;
}

/**选择活动 */
export default class SelectActivity extends Component<Props> {
	state = {
		result: '',
		list: [],
		value: [],
		current: {}
	};

	UNSAFE_componentWillReceiveProps(nextProps: { show: boolean }) {
		if (!this.props.show && nextProps.show === true) {
			this.getActivityList();
		}
	}

	getActivityList = async () => {
		Toast.loading('');
    const res = await request({ url: 'v3/activitys' });
		Toast.hide();
		if (res.code === 200 && res.data.length) {
			this.setState({
				list: res.data.map((_: { name: any; id: any }) => ({ label: _.name, value: _.id })),
				value: [res.data[0].id],
				current: {
					label: res.data[0].name,
					value: res.data[0].id
				},
				result: res.data[0].name
			});
		}
	};

	handleChangeCoupon = (val: any) => {
		const value = val[0];
		const current: any = this.state.list.find((_: any) => value === _.value);
		this.setState({ result: current.label, value: val, current });
	};

	handleAddCoupon = () => {
		router.push({ pathname: '/my/coupon/create', query: { isAd: this.props.isAd } });
	};

	handleSelected = () => {
		this.props.onSelect(this.state.current);
	};

	handleClickMask = (e: any) => {
		if (e.target.id === 'mask') {
			this.props.onClose();
		}
	};

	render() {
		return (
			<Modal
				title="选择活动"
				show={this.props.show}
				onCancel={this.handleAddCoupon}
				onClose={this.props.onClose}
				onConfirm={this.handleSelected}
				okBtn="确认"
				cancelBtn="添加"
			>
				<div className={styles.result}>{this.state.result}</div>
				<Flex className={styles.picker}>
					<PickerView
						cols={1}
						data={this.state.list}
						value={this.state.value}
						onChange={this.handleChangeCoupon}
					/>
				</Flex>
			</Modal>
		);
	}
}
