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

export default connect(({ businessArea, app }: any) => ({ businessArea, app }))(
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
			// 已用预算
			already_use_budget: '',
			startTime: undefined,
			endTime: undefined,
			/**是否是修改状态，修改状态下，只能暂停 */
			edit: false,
			isOld: false,
			stopModalShow: false,
			check_desc: null,
			ad_status: 0,
			modal1: false,

			// 是否停止广告 初始值未-1表示未有数据的情况下
			is_pause: -1,
			// 审核状态
			check_status: 0,

			paused_status: 0,
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
					already_use_budget: nextProps.editForm.already_use_budget,
					startTime: nextProps.editForm.begin_time,
					endTime: nextProps.editForm.end_time,
					edit: nextProps.editForm.is_pause === 0,
					// edit: nextProps.editForm.ad_status == 1 || nextProps.editForm.ad_status == 2,
					isOld: true,
					check_desc: nextProps.editForm.check_desc,
					ad_status: nextProps.editForm.ad_status,
					paused_status: nextProps.editForm.paused_status,
					is_pause: nextProps.editForm.is_pause,
					check_status: nextProps.editForm.check_status
				});
			} else {
				this.setState({
					coupon: this.props.businessArea.coupon,
					startTime: this.props.businessArea.startTime,
					endTime: this.props.businessArea.endTime,
					price: this.props.businessArea.price
				})
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
			if (price.split(".")[1] == undefined || (price.split(".")[1].length <= 2 && price.split(".")[2] == undefined)) {
				this.setState({ price })
			}
		};
		handleChangeTime = (time: any) => this.setState({ time });
		handleShowSelectTime = () => this.setState({ showSelectTime: true });
		handleSelectTime = (time: any) => this.setState({ ...time }, this.closeModal);
		handleSubmit = async (e: any, isStop?: boolean) => {
			if (this.state.is_pause == 0 && this.state.check_status == 0) {
				return Toast.info('审核中，请耐心等待');
			}

			// 注：暂停投放不需要处理数据，只是一个暂停操作并不是修改数据的操作

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
				if (Number(this.state.price) < 1) {
					return Toast.info('每日预算金额不能低于1元');
				}
				// 暂停的情况不考虑价格比较问题 除了状态为2时即是暂停时都可以弹出余额不足
				if (!(this.state.is_pause == 0 && this.state.check_status == 1)) {
					if (Number(this.state.price) > Number(this.props.app.data.money)) {
						await this.props.dispatch({
							type: 'businessArea/setFormData',
							payload: {
								coupon: this.state.coupon,          // 优惠券
								startTime: this.state.startTime,    // 起始时间
								endTime: this.state.endTime,        // 结束时间
								price: this.state.price,            // 每日预算
							}
						})
						Modal.alert('提示', '余额不足', [
							{ text: '去充值', onPress: () => router.push('/my/rechange') },
							{ text: '取消', onPress: () => console.log('cancel'), style: 'default' },
						])
						return;
					}
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
					// res = await request({
					// 	url: 'v3/ads/business/' + this.state.id,
					// 	method: 'put',
					// 	data: { ...data, is_pause: 1 }
					// });
					res = await request({ url: 'v3/ads/stop', method: 'put', data: { ad_id: this.state.id } })
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

		handlePaused = () => {
			if (this.state.paused_status == 5) {
				router.push('/my/coupon/detail?id=' + this.state.coupon.value);
			}
		}


		render() {
			const time = this.state.startTime
				? moment.unix(this.state.startTime || 0).format('YYYY.MM.DD') +
				'-' +
				moment.unix(this.state.endTime || 0).format('YYYY.MM.DD')
				: '广告投放时长';
			return (
				<div>
					<div className={((this.state.is_pause == 0 && this.state.check_status == 0) || (this.state.is_pause == 0 && this.state.check_status == 1)) ? styles.ad_status_isPut : this.state.is_pause == 1 ? styles.ad_status_ispause : (this.state.is_pause == 0 && this.state.check_status == 2) ? styles.ad_status_isFail : ''}>
						{
							// this.state.ad_status == 0 ? ' 暂未投放': 
							(this.state.is_pause == 0 && this.state.check_status == 0) ? ' 审核中'
								: (this.state.is_pause == 0 && this.state.check_status == 1) ? ' 已投放'
									: (this.state.is_pause == 1) ? ' 已暂停'
										: (this.state.is_pause == 0 && this.state.check_status == 2) ? ' 审核未通过' : ''
						}
					</div>
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
									>
										每日预算
									<span className={styles.budget_info}>
											{
												(this.state.is_pause == -1) ? '最低预算1元，建议预算1元'
													: (this.state.is_pause == 0 && this.state.check_status == 0) || (this.state.is_pause == 0 && this.state.check_status == 1) ? `预算剩余${(Number(this.state.price) - Number(this.state.already_use_budget)).toFixed(2)}元，低于1.1元广告将暂停`
														: (this.state.is_pause == 1) ? `预算剩余${(Number(this.state.price) - Number(this.state.already_use_budget)).toFixed(2)}元` : ''
											}
										</span>
									</InputItem>
								</List>
								<WhiteSpace size="lg" />
								<Flex justify="start">
									< img src={require('@/assets/ad/ad_intro.png')} alt="" style={{ marginRight: '15px' }} className={styles.ad_intro} />
									<span className={styles.ad_desc} onClick={() => { router.push('/ad/other-page/readme') }}>
										广告位介绍
									</span>
								</Flex>
								<WhiteSpace size="lg" />
								{
									(this.state.is_pause == 0 && this.state.check_status == 2) ? (
										<div>
											<img src={require('@/assets/ad/ad_fail.png')} alt="" className={styles.ad_fail} />
											<span className={styles.check_desc}>{this.state.check_desc}</span>
										</div>
									) : ''
								}
								<WhiteSpace size="lg" />
								{
									this.state.is_pause == 1 ? (
										<div className={styles.paused_status} onClick={this.handlePaused.bind(this)}>
											广告状态：已暂停({
												this.state.paused_status == 1 ? '手动暂停' :
													this.state.paused_status == 2 ? '投放时长超出范围' :
														this.state.paused_status == 3 ? '今日预算不足' :
															this.state.paused_status == 4 ? '余额不足' :
																this.state.paused_status == 5 ? '关联的券或活动已结束' : ''
											})
										</div>
									) : ''
								}
								<Flex justify="center" className={styles.ad_title}>
									<div className={styles.ad_rechange} onClick={this.handleToRechange} style={{ width: "50%", left: "0" }}>充值</div>
									{/* {
										this.state.ad_status != 1 ? (<div
											className={styles.ad_submit}
											onClick={this.handleSubmit}
										>
											{
												this.state.ad_status == 0 ? '投放'
													: this.state.ad_status == 1 ? '投放'
														: this.state.ad_status == 2 ? '暂停'
															: this.state.ad_status == 3 ? '继续投放'
																: this.state.ad_status == 4 ? '投放' : ''
											}
										</div>) : (<div
											className={styles.ad_submit}
											onClick={this.handleSubmit}
										// style={{background: '#c1c1c1'}}
										>
											{
												this.state.ad_status == 0 ? '投放'
													: this.state.ad_status == 1 ? '投放'
														: this.state.ad_status == 2 ? '暂停'
															: this.state.ad_status == 3 ? '继续投放'
																: this.state.ad_status == 4 ? '投放' : ''
											}
										</div>)
									} */}

									<div
										className={styles.ad_submit}
										onClick={this.handleSubmit}>
										{
											this.state.is_pause == 0 ? '暂停投放'
												: this.state.is_pause == 1 ? '继续投放' : '开始投放'
										}
									</div>
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
				</div>
			);
		}
	}
);
