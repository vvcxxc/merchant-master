import React, { Component } from 'react';
import { Flex, List, WingBlank, InputItem, Button, Toast } from 'antd-mobile';

import styles from '../index.less';
import router from 'umi/router';
import SelectCoupon from '../components/select-coupon';
import request from '@/services/request';
import SelectTime from '../components/select-time';
import moment from 'moment';

export default class From extends Component {
	state = {
		showSelectCoupon: false,
		showSelectTime: false,
		coupon: {
			label: '',
			value: 0
		},
		price: 0,
		time: 0,
		startTime: undefined,
		endTime: undefined
	};
	handleToRechange = () => router.push('/my/rechange');
	closeModal = () => this.setState({ showSelectCoupon: false, showSelectTime: false });
	showModal = () => this.setState({ showSelectCoupon: true });
	handleSelectCoupon = (coupon: any) => this.setState({ coupon }, this.closeModal);
	handleChangePrice = (price: any) => this.setState({ price });
	handleChangeTime = (time: any) => this.setState({ time });
	handleShowSelectTime = () => this.setState({ showSelectTime: true });
	handleSelectTime = (time: any) => this.setState({ ...time }, this.closeModal);
	handleSubmit = async () => {
		if (!this.state.coupon.value) {
			return Toast.info('请选择优惠券');
		}
		if (!this.state.startTime) {
			return Toast.info('请选择广告投放时长');
		}
		if (!this.state.price) {
			return Toast.info('请输入每日预算');
		}
		Toast.loading('');
		const data = {
			coupon_id: this.state.coupon.value,
			daily_budget: this.state.price,
			begin_time: this.state.startTime,
			end_time: this.state.endTime
		};
		const res = await request({ url: 'v3/ads/business', method: 'post', data });
		Toast.hide();
		if (res.code === 200) {
			return Toast.success('投放成功');
		} else {
			Toast.fail(res.data);
		}
	};
	render() {
		const time = this.state.startTime
			? moment.unix(this.state.startTime || 0).format('YYYY.MM.DD') +
			  '-' +
			  moment.unix(this.state.endTime || 0).format('YYYY.MM.DD')
			: '广告投放时长';
		return (
			<WingBlank className={styles.maxheight}>
				<Flex direction="column" className={styles.maxheight}>
					<Flex.Item>
						<List>
							<List.Item
								extra={this.state.coupon.label ? this.state.coupon.label : '请选择优惠券'}
								arrow="horizontal"
								onClick={this.showModal}
							>
								优惠券
							</List.Item>
							<List.Item extra={time} arrow="horizontal" onClick={this.handleShowSelectTime}>
								广告投放时长
							</List.Item>
							<InputItem extra="元" type="money" onChange={this.handleChangePrice}>
								每日预算
							</InputItem>
						</List>
						<Flex justify="end" className={styles.tip}>
							若余额不足将暂停广告,
							<span className={styles.link} onClick={this.handleToRechange}>
								点击充值
							</span>
						</Flex>
					</Flex.Item>
					<Button type="primary" className={styles.submitBtn} onClick={this.handleSubmit}>
						投放
					</Button>
				</Flex>
				<SelectCoupon
					show={this.state.showSelectCoupon}
					onClose={this.closeModal}
					onSelect={this.handleSelectCoupon}
				/>
				<SelectTime
					show={this.state.showSelectTime}
					onClose={this.closeModal}
					onConfirm={this.handleSelectTime}
				/>
			</WingBlank>
		);
	}
}
