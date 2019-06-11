import React, { Component } from 'react';
import { Flex, List, WingBlank, InputItem, Button, Toast } from 'antd-mobile';

import styles from '../index.less';
import router from 'umi/router';
import SelectCoupon from '../components/select-coupon';
import request from '@/services/request';
import SelectTime from '../components/select-time';

export default class From extends Component {
	state = {
		showSelectCoupon: false,
		showSelectTime: true,
		coupon: {
			label: '',
			value: 0
		},
		price: 0,
		time: 0
	};
	handleToRechange = () => router.push('/my/rechange');
	closeModal = () => this.setState({ showSelectCoupon: false, showSelectTime: false });
	showModal = () => this.setState({ showSelectCoupon: true });
	handleSelectCoupon = (coupon: any) => this.setState({ coupon }, this.closeModal);
	handleChangePrice = (price: any) => this.setState({ price });
	handleChangeTime = (time: any) => this.setState({ time });
	handleShowSelectTime = () => this.setState({ showSelectTime: true });
	handleSubmit = async () => {
		Toast.loading('');
		const data = {
			coupon_id: this.state.coupon.value,
			daily_budget: this.state.price,
			begin_time: this.state.time
		};
		const res = await request({ url: 'v3/ads/business', method: 'post' });
		Toast.hide();
		if (res.code === 200) {
		}
	};
	render() {
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
							<InputItem type="money" placeholder="广告投放时长" onClick={this.handleShowSelectTime}>
								广告投放时长
							</InputItem>
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
				<SelectTime show={this.state.showSelectTime} onClose={this.closeModal} />
			</WingBlank>
		);
	}
}
