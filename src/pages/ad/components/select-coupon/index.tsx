import React, { Component } from 'react';
import styles from './index.less';
import { Flex, PickerView, ActivityIndicator } from 'antd-mobile';
import request from '@/services/request';
import { any } from 'prop-types';
import router from 'umi/router';
import Modal from '@/components/modal';

interface Props {
	show: boolean;
	onClose: () => any;
	onSelect: (arg0: any) => any;
}

/**选择优惠券 */
export default class SelectCoupon extends Component<Props> {
	state = {
		result: '',
		loading: false,
		list: [],
		value: [],
		current: {}
	};

	UNSAFE_componentWillReceiveProps(nextProps: { show: boolean }) {
		if (!this.props.show && nextProps.show === true) {
			this.getCouponList();
		}
	}

	getCouponList = async () => {
		this.setState({ loading: true });
		const res = await request({ url: 'v3/coupons' });
		this.setState({ loading: false });
		if (res.code === 200) {
			this.setState({ list: res.data.map((_: { name: any; id: any }) => ({ label: _.name, value: _.id })) });
		}
	};

	handleChangeCoupon = (val: any) => {
		const value = val[0];
		const current: any = this.state.list.find((_: any) => value === _.value);
		this.setState({ result: current.label, value: val, current });
	};

	handleAddCoupon = () => {
		router.push('/my/coupon/create');
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
		const picker = this.state.loading ? (
			<ActivityIndicator />
		) : (
			<PickerView cols={1} data={this.state.list} value={this.state.value} onChange={this.handleChangeCoupon} />
		);
		return (
			<Modal
				title="选择优惠券"
				show={this.props.show}
				onCancel={this.handleAddCoupon}
				onClose={this.props.onClose}
				onConfirm={this.handleSelected}
				okBtn="确定"
				cancelBtn="取消"
			>
				<div className={styles.result}>{this.state.result}</div>
				<Flex className={styles.picker}>{picker}</Flex>
			</Modal>
		);
	}
}
