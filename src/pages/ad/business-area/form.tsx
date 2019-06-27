import React, { Component } from 'react';
import { Flex, List, WingBlank, InputItem, Button, Toast } from 'antd-mobile';

import styles from '../index.less';
import router from 'umi/router';
import SelectCoupon from '../components/select-coupon';
import request from '@/services/request';
import SelectTime from '../components/select-time';
import moment from 'moment';
import StopAd from '../components/stop';
import { connect } from 'dva';

interface Props {
	editForm: any;
	onChange: () => any;
	coupon: Coupon;
	hasCoupon: false;
}

interface Coupon {
	id: string;
	name: string;
}

export default connect(({ businessArea }: any) => businessArea)(
	class From extends Component<Props> {
		state = {
			id: 0,
			showSelectCoupon: false,
			showSelectTime: false,
			coupon: {
				label: '',
				value: 0
			},
			price: '',
			startTime: undefined,
			endTime: undefined,
			/**是否是修改状态，修改状态下，只能暂停 */
			edit: false,
			isOld: false,
			stopModalShow: false
		};

		UNSAFE_componentWillReceiveProps(nextProps: Props) {
			if (nextProps.editForm.id) {
				this.setState({
					id: nextProps.editForm.id,
					coupon: {
						label: nextProps.editForm.coupon_name,
						value: nextProps.editForm.coupon_id
					},
					price: nextProps.editForm.daily_budget,
					startTime: nextProps.editForm.begin_time,
					endTime: nextProps.editForm.end_time,
					edit: !nextProps.editForm.is_pause,
					isOld: true
				});
			}
			if (nextProps.hasCoupon) {
				this.setState({
					coupon: nextProps.coupon
				});
			}
		}
		handleToRechange = () => router.push('/my/rechange');
		closeModal = () => this.setState({ showSelectCoupon: false, showSelectTime: false });
		showModal = () => this.setState({ showSelectCoupon: true });
		handleSelectCoupon = (coupon: any) => this.setState({ coupon }, this.closeModal);
		handleChangePrice = (price: any) => this.setState({ price });
		handleChangeTime = (time: any) => this.setState({ time });
		handleShowSelectTime = () => this.setState({ showSelectTime: true });
		handleSelectTime = (time: any) => this.setState({ ...time }, this.closeModal);
		handleSubmit = async (e: any, isStop?: boolean) => {
			/**是否是修改提交状态 或者暂停请求状态 */
			if (!this.state.edit || isStop) {
				if (!this.state.coupon.value) {
					return Toast.info('请选择兑换券');
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
					end_time: this.state.endTime,
					is_pause: 0
				};
				let res;
				/**是否是暂停操作 */
				if (isStop) {
					res = await request({
						url: 'v3/ads/business/' + this.state.id,
						method: 'put',
						data: { ...data, is_pause: 1 }
					});
				} else {
					/**是否是修改状态 */
					if (this.state.isOld) {
						res = await request({ url: 'v3/ads/business/' + this.state.id, method: 'put', data });
					} else {
						res = await request({ url: 'v3/ads/business', method: 'post', data });
					}
				}

				Toast.hide();
				if (res.code === 200) {
					if (isStop) {
						this.handleCloseModal();
						Toast.success('暂停成功');
					} else {
						Toast.success('投放成功');
					}
					setTimeout(() => {
						this.props.onChange();
					}, 1000);
				} else {
					Toast.fail(res.data);
				}
			} else {
				this.handleShowStopAd();
			}
		};

		handleCloseModal = () => this.setState({ stopModalShow: false });

		handleConfirmModal = () => {
			this.handleSubmit({}, true);
		};

		handleShowStopAd = () => this.setState({ stopModalShow: true });

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
									extra={this.state.coupon.label ? this.state.coupon.label : '请选择兑换券'}
									arrow="horizontal"
									onClick={this.showModal}
								>
									兑换券
								</List.Item>
								<List.Item extra={time} arrow="horizontal" onClick={this.handleShowSelectTime}>
									广告投放时长
								</List.Item>
								<InputItem
									extra="元"
									value={this.state.price}
									type="money"
									onChange={this.handleChangePrice}
								>
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
						<Button
							type="primary"
							className={!this.state.edit ? styles.submitBtn : styles.stopBtn}
							onClick={this.handleSubmit}
						>
							{!this.state.edit ? '投放' : '暂停'}
						</Button>
					</Flex>
					<SelectCoupon
						show={this.state.showSelectCoupon}
						onClose={this.closeModal}
						onSelect={this.handleSelectCoupon}
						value={this.state.coupon.value}
						isAd={1}
					/>
					<SelectTime
						show={this.state.showSelectTime}
						onClose={this.closeModal}
						onConfirm={this.handleSelectTime}
					/>

					<StopAd
						show={this.state.stopModalShow}
						onClose={this.handleCloseModal}
						onConfirm={this.handleConfirmModal}
					/>
				</WingBlank>
			);
		}
	}
);
