import React, { Component } from 'react';
import { Flex, List, WingBlank, InputItem, Button, Toast, WhiteSpace, Modal } from 'antd-mobile';
import { routerRedux, withRouter } from 'dva/router';

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
			stopModalShow: false,
			check_desc: null,
			ad_status: 0,
			modal1: false
		};

		componentDidMount = () => {
			this.UNSAFE_componentWillReceiveProps(this.props)
		}

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
					// edit: !nextProps.editForm.is_pause,
					edit: nextProps.editForm.ad_status == 1 || nextProps.editForm.ad_status == 2,
					isOld: true,
					check_desc: nextProps.editForm.check_desc,
					ad_status: nextProps.editForm.ad_status
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
		handleChangePrice = (price: any) => {
			console.log(price);
			if (price.split(".")[1] == undefined || (price.split(".")[1].length <= 2 && price.split(".")[2] == undefined)) {
				this.setState({ price })
			}
		};
		handleChangeTime = (time: any) => this.setState({ time });
		handleShowSelectTime = () => this.setState({ showSelectTime: true });
		handleSelectTime = (time: any) => this.setState({ ...time }, this.closeModal);
		handleSubmit = async (e: any, isStop?: boolean) => {
			/**是否是修改提交状态 或者暂停请求状态 */
			if (!this.state.edit || isStop) {
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

		onClose = key => () => {
			this.setState({
				[key]: false,
			});
		}

		handleClick = () => {
			if (this.state.ad_status == 4) {
				this.handleCheckDesc()
			}
		}

		handleCheckDesc = () => {
			this.setState({
				modal1: true
			})
		}


		render() {
			const time = this.state.startTime
				? moment.unix(this.state.startTime || 0).format('YYYY.MM.DD') +
				'-' +
				moment.unix(this.state.endTime || 0).format('YYYY.MM.DD')
				: '广告投放时长';
			return (
				<WingBlank className={styles.maxheight}>
					<Modal
						visible={this.state.modal1}
						transparent
						maskClosable={false}
						onClose={this.onClose('modal1')}
						title="审核失败原因"
						footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
					>
						<div style={{ height: 200, overflow: 'scroll' }}>
							{this.state.check_desc}
						</div>
					</Modal>
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
								<InputItem
									extra="元"
									value={this.state.price}
									type="money"
									onChange={this.handleChangePrice}
									clear
								>
									每日预算
								</InputItem>
							</List>
							{/* <Flex justify="end" className={styles.tip}>
								若余额不足将暂停广告,
								<span className={styles.link} onClick={this.handleToRechange}>
									点击充值
								</span>
							</Flex> */}
							{/* <Flex justify="start">
								<span className={styles.link} onClick={() => { router.push('/ad/business-area/mustRead') }}>
									创建必读
								</span>
							</Flex> */}
							<WhiteSpace size="lg" />
							<Flex justify="start">
								<img src={require('@/assets/ad/ad_intro.png')} alt="" style={{ marginRight: '15px' }} className={styles.ad_intro} />
								<span className={styles.ad_desc} onClick={() => { router.push('/ad/business-area/mustRead') }}>
									广告位介绍
								</span>
							</Flex>
							<WhiteSpace size="lg" />
							<Flex justify="center" className={styles.ad_title}>
								<Button type="warning" inline className={styles.ad_rechange} onClick={this.handleToRechange}>广告充值</Button>
								<WingBlank />
								{
									this.state.ad_status != 1 ? (<Button
										type="primary"
										inline
										className={styles.ad_submit}
										onClick={this.handleSubmit}
									>
										{
											this.state.ad_status == 0 ? '广告投放'
												: this.state.ad_status == 1 ? '暂停投放'
													: this.state.ad_status == 2 ? '暂停投放'
														: this.state.ad_status == 3 ? '继续投放'
															: this.state.ad_status == 4 ? '重新提交' : ''
										}
									</Button>) : (<Button
										type="primary"
										inline
										disabled
										className={styles.ad_submit}
										onClick={this.handleSubmit}
									>
										{
											this.state.ad_status == 0 ? '广告投放'
												: this.state.ad_status == 1 ? '暂停投放'
													: this.state.ad_status == 2 ? '暂停投放'
														: this.state.ad_status == 3 ? '继续投放'
															: this.state.ad_status == 4 ? '重新提交' : ''
										}
									</Button>)
								}
							</Flex>
							<WhiteSpace size="lg" />
							<Flex justify="start">
								<span className={styles.ad_status} onClick={this.handleClick.bind(this)}>
									广告状态 :
									{
										this.state.ad_status == 0 ? ' 暂未投放'
											: this.state.ad_status == 1 ? ' 审核中'
												: this.state.ad_status == 2 ? ' 已投放'
													: this.state.ad_status == 3 ? ' 已暂停'
														: this.state.ad_status == 4 ? ' 审核失败，查看失败原因' : ''
									}
								</span>
								{
									this.state.ad_status == 4 ? (
										<img src={require('@/assets/ad/ad_fail.png')} alt="" className={styles.ad_fail}/>
									) : ''
								}
							</Flex>
						</Flex.Item>

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
