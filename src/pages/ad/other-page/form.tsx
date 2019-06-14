import React, { Component } from 'react';
import { Flex, List, WingBlank, InputItem, Button, Toast } from 'antd-mobile';

import styles from '../index.less';
import router from 'umi/router';
import SelectCoupon from '../components/select-coupon';
import request from '@/services/request';
import SelectTime from '../components/select-time';
import moment from 'moment';
import SelectAdType from '../components/selectType';
import StopAd from '../components/stop';
import SelectActivity from '../components/select-activity';
import { string } from 'prop-types';

interface Props {
	editForm: any;
}

export default class From extends Component<Props> {
	state = {
		/**显示选择优惠券 */
		showSelectCoupon: false,
		showSelectActivity: false,
		/**显示选择时间 */
		showSelectTime: false,
		/**优惠券 */
		coupon: {
			label: '',
			value: 0
		},
		/**活动 */
		activity: {
			label: '',
			value: 0
		},
		/**每日预算 */
		price: 0,
		startTime: undefined,
		endTime: undefined,
		edit: false,
		/**是否暂停提示显示 */
		stopModalShow: false,
		/**表单类型 本店, 优惠券，活动，链接 */
		formType: 0,
		link: ''
	};
	UNSAFE_componentWillReceiveProps(nextProps: any) {
		if (nextProps.editForm.coupon_id) {
			this.setState({
				coupon: {
					label: '',
					value: nextProps.editForm.coupon_id
				},
				price: nextProps.editForm.daily_budget,
				time: 0,
				edit: true
			});
		}
	}
	handleToRechange = () => router.push('/my/rechange');
	closeModal = () => this.setState({ showSelectCoupon: false, showSelectTime: false, showSelectActivity: false });
	showModal = () => this.setState({ [this.state.formType === 1 ? 'showSelectCoupon' : 'showSelectActivity']: true });
	handleSelectCoupon = (coupon: any) => {
		if (this.state.formType === 1) {
			this.setState({ coupon }, this.closeModal);
		} else if (this.state.formType === 2) {
			this.setState({ activity: coupon }, this.closeModal);
		}
	};
	handleChangePrice = (price: any) => this.setState({ price });
	handleShowSelectTime = () => this.setState({ showSelectTime: true });
	handleSelectTime = (time: any) => this.setState({ ...time }, this.closeModal);
	handleSubmit = async () => {
		if (!this.state.edit) {
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
		} else {
			this.handleShowStopAd();
		}
	};

	handleChangeType = (type: number) => {
		this.setState({ formType: type });
	};

	handleCloseModal = () => this.setState({ stopModalShow: false });

	handleConfirmModal = async () => {
		Toast.loading('');
		const res = await request({ url: 'v3/ads/stop', method: 'put', data: { ad_id: this.props.editForm.id } });
		Toast.hide();
		if (res.code === 200) {
			return Toast.success('暂停成功');
		} else {
			Toast.fail(res.data);
		}
	};

	handleShowStopAd = () => this.setState({ stopModalShow: true });

	handleChangeLink = (value: string) => this.setState({ link: value });

	render() {
		const time = this.state.startTime
			? moment.unix(this.state.startTime || 0).format('YYYY.MM.DD') +
			  '-' +
			  moment.unix(this.state.endTime || 0).format('YYYY.MM.DD')
			: '广告投放时长';

		let typeFormInput;
		if (this.state.formType === 0) {
			typeFormInput = '';
		} else if (this.state.formType === 1) {
			typeFormInput = (
				<List.Item
					extra={this.state.coupon.label ? this.state.coupon.label : '请选择优惠券'}
					arrow="horizontal"
					onClick={this.showModal}
				>
					优惠券
				</List.Item>
			);
		} else if (this.state.formType === 2) {
			typeFormInput = (
				<List.Item
					extra={this.state.activity.label ? this.state.activity.label : '请选择活动'}
					arrow="horizontal"
					onClick={this.showModal}
				>
					活动
				</List.Item>
			);
		} else if (this.state.formType === 3) {
			typeFormInput = (
				<InputItem placeholder="请输入链接" onChange={this.handleChangeLink}>
					链接
				</InputItem>
			);
		}
		return (
			<div>
				<SelectAdType value={this.state.formType} onChange={this.handleChangeType} />
				<WingBlank className={styles.maxheight}>
					<Flex direction="column" className={styles.maxheight}>
						<Flex.Item>
							<List>
								{typeFormInput}
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
							{!this.state.edit ? '投放' : '暂停'}
						</Button>
					</Flex>
					<SelectCoupon
						show={this.state.showSelectCoupon}
						onClose={this.closeModal}
						onSelect={this.handleSelectCoupon}
						isAd={1}
					/>
					<SelectActivity
						show={this.state.showSelectActivity}
						onClose={this.closeModal}
						onSelect={this.handleSelectCoupon}
						isAd={1}
					/>
					<SelectTime
						show={this.state.showSelectTime}
						onClose={this.closeModal}
						onConfirm={this.handleSelectTime}
					/>
				</WingBlank>
				<StopAd
					show={this.state.stopModalShow}
					onClose={this.handleCloseModal}
					onConfirm={this.handleConfirmModal}
				/>
			</div>
		);
	}
}
