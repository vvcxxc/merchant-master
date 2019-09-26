import React, { Component } from 'react';
import { Flex, List, WingBlank, InputItem, Button, Toast, ImagePicker, WhiteSpace, Modal } from 'antd-mobile';

import router from 'umi/router';
import SelectCoupon from '../components/select-coupon';
import request from '@/services/request';
import SelectTime from '../components/select-time';
import moment, { localeData } from 'moment';
import SelectAdType from '../components/selectType';
import StopAd from '../components/stop';
import SelectActivity from '../components/select-activity';
import oss from '@/services/oss';

import { connect } from 'dva';
import styles from '../index.less';

interface Props {
	editForm: any;
	position: number;
	onSuccess: () => void;
}

export default connect(({ ad, app }: any) => ({ ad, app }))(
	class From extends Component<Props, any> {
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
			price: '',
			// 已用预算
			already_use_budget: '',
			startTime: undefined,
			endTime: undefined,
			/**是否是修改状态，修改状态下，只能暂停 */
			edit: false,
			/**是否暂停提示显示 */
			stopModalShow: false,
			/**表单类型 本店, 优惠券，活动，链接 */
			formType: this.props.ad.popType,
			//type : null,   // 默认切换顶部tab时type回到第一个
			link: '',
			/**是否已经发布过 */
			maked: false,
			id: 0,
			banner: '',
			files: [],
			// 审批意见
			check_desc: null,
			// 广告状态 默认为初始化状态
			/**
			 * 0 初始
			 * 1 审核中
			 * 2 已投放
			 * 3 已暂停
			 * 4 审核不通过
			 */
			ad_status: 0,   // 已作废


			// 是否停止广告 初始值未-1表示未有数据的情况下
			is_pause: -1,
			// 审核状态
			check_status: 0,

			modal1: false,

			paused_status: 0,

		};
		UNSAFE_componentWillReceiveProps(nextProps: any) {
			// 为了防止切换时没数据而保持渲染所以每次切换时先清除数据
			this.setState({
				coupon: {
					label: "",
					value: 0
				},
				price: "",
				already_use_budget: '',
				edit: false,
				formType: this.props.ad.popType,  // 切换时候的index
				maked: false,
				id: undefined,
				files: [],
				banner: "",
				startTime: undefined,
				endTime: undefined,
				link: "",
				check_desc: null,
				ad_status: 0
			}, () => {
				if (nextProps.editForm.id) {
					this.setState({
						coupon: {
							label: nextProps.editForm.coupon_name,
							value: nextProps.editForm.coupon_id
						},
						price: nextProps.editForm.daily_budget,
						already_use_budget: nextProps.editForm.already_use_budget,
						edit: nextProps.editForm.is_pause === 0,
						// edit: nextProps.editForm.ad_status == 1 || nextProps.editForm.ad_status == 2,
						formType: nextProps.editForm.romotion_type - 1,
						maked: true,
						id: nextProps.editForm.id,
						files: nextProps.editForm.original
							? [{ url: nextProps.editForm.original, path: nextProps.editForm.original }]
							: [],
						banner: nextProps.editForm.original,
						startTime: nextProps.editForm.begin_time,
						endTime: nextProps.editForm.end_time,
						link: nextProps.editForm.link,
						check_desc: nextProps.editForm.check_desc,
						ad_status: nextProps.editForm.ad_status,
						paused_status: nextProps.editForm.paused_status,
						is_pause: nextProps.editForm.is_pause,
						check_status: nextProps.editForm.check_status
					}, () => {
					});
				} else {
					// this.setState({
					// 	files: []
					// });
					// console.log('执行了')
					// console.log(this.props)
					this.setState({
						coupon: this.props.ad.coupon || {},
						startTime: this.props.ad.startTime || undefined,
						endTime: this.props.ad.endTime || undefined,
						price: this.props.ad.price || '',
						files: this.props.ad.files.length != 0 ? this.props.ad.files : [],
					})
				}
			})

		}
		componentDidMount = () => {
			console.log(this.props)
			this.UNSAFE_componentWillReceiveProps(this.props);
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
		handleChangePrice = (price: any) => {
			if (price.split(".")[1] == undefined || (price.split(".")[1].length <= 2 && price.split(".")[2] == undefined)) {
				this.setState({ price })
			}
		};
		handleShowSelectTime = () => this.setState({ showSelectTime: true });
		handleSelectTime = (time: any) => this.setState({ ...time }, this.closeModal);
		/**
		 * 暂停或是投放广告
		 * @param isStop 是否是暂停提交操作
		 */
		handleSubmit = async (e: any, isStop?: boolean) => {
			if (this.state.is_pause == 0 && this.state.check_status == 0) {
				return Toast.info('审核中，请耐心等待')
			}

			// 除了状态为1 和 2
			if (!this.state.edit || isStop) {
				if (this.state.formType === 1 && !this.state.coupon.value && this.props.type != "钻石展位") {
					return Toast.info('请选择优惠券');
				}
				if (this.state.formType === 2 && !this.state.activity.value && this.props.type != "钻石展位") {
					return Toast.info('请选择活动');
				}
				if (this.state.formType === 3 && !this.state.link && this.props.type != "钻石展位") {
					return Toast.info('请填写链接');
				}
				if (!this.state.startTime) {
					return Toast.info('请选择广告投放时长');
				}
				if (!this.state.price) {
					return Toast.info('请输入每日预算');
				}
				if (Number(this.state.price) < 1.1) {
					return Toast.info('每日预算金额不能低于1.1元');
				}
				// 暂停的情况不考虑价格比较问题 除了状态为2时即是暂停时都可以弹出余额不足
				if (!(this.state.is_pause == 0 && this.state.check_status == 1)) {
					if (Number(this.state.price) > Number(this.props.app.data.money)) {
						await this.props.dispatch({
							type: 'ad/setFormData',
							payload: {
								coupon: this.state.coupon,          // 优惠券
								startTime: this.state.startTime,    // 起始时间
								endTime: this.state.endTime,        // 结束时间
								price: this.state.price,            // 每日预算
								files: this.state.files,		 	// 广告图
							}
						})
						Modal.alert('提示', '余额不足', [
							{ text: '去充值', onPress: () => router.push('/my/rechange') },
							{ text: '取消', onPress: () => console.log('cancel'), style: 'default' },
						])
						return;
					}
				}
				if (!this.state.files.length) {
					return Toast.info('请选择广告图');
				}
				Toast.loading('');
				let data: any = {
					daily_budget: this.state.price,
					begin_time: this.state.startTime,
					end_time: this.state.endTime,
					type: this.props.type == "钻石展位" ? 1 : this.state.formType + 1,
					position_id: this.props.position,
					ad_pic: this.state.files[0].path
				};
				if (this.state.formType === 1 && this.props.type != "钻石展位") {
					data.coupon_id = this.state.coupon.value;
					// data.type = this.state.formType + 1;
				} else if (this.state.formType === 2 && this.props.type != "钻石展位") {
					data.activity_id = this.state.activity.value;
					// data.type = this.state.formType + 1;
				} else if (this.state.formType === 3 && this.props.type != "钻石展位") {
					data.link = this.state.link;
					// data.type = this.state.formType + 1;
				}
				let res;
				if (isStop) {
					// 暂停广告
					// res = await request({ url: 'v3/ads/' + this.state.id, method: 'put', data: { ...data, is_pause: 1 } });
					res = await request({ url: 'v3/ads/stop', method: 'put', data: { ad_id: this.state.id } })
				} else {
					if (this.state.maked) {
						// 暂停后继续投放修改接口？
						res = await request({
							url: 'v3/ads/' + this.state.id,
							method: 'put',
							data: { ...data, is_pause: 0 }
						});
					} else {
						// 初始时添加广告
						res = await request({ url: 'v3/ads', method: 'post', data });
					}
				}

				Toast.hide();

				if (res.code === 200) {
					// this.props.dispatch({
					// 	type: 'ad/resetAllData',
					// })
					if (isStop) {
						this.handleCloseModal();
						Toast.success('暂停成功');
					} else {
						Toast.success('投放成功');
					}
					setTimeout(() => {
						this.props.onSuccess();
					}, 1000);
				} else {
					Toast.fail(res.data);
				}
			} else {
				this.props.onSuccess();
				this.handleShowStopAd();
			}
		};

		handleChangeType = async (type: number) => {
			// this.setState({
			// 	type: type
			// }, () => {
			// 	this.props.getIndex(type + 1);
			// });
			await this.props.dispatch({
				type: 'ad/setType',
				payload: {
					popType: type
				}
			})
			await this.props.getIndex(type + 1)
		};

		componentWillUnmount() {
			// this.props.dispatch({
			// 	type: 'ad/resetRomotionType',
			// 	payload: {
			// 		romotionType: 1
			// 	}
			// })
		}

		handleCloseModal = () => this.setState({ stopModalShow: false });

		handleConfirmModal = async () => {
			this.handleSubmit({}, true);
		};

		handleShowStopAd = () => this.setState({ stopModalShow: true });

		handleChangeLink = (value: string) => this.setState({ link: value });

		/**选择广告图 */
		handleCheckImage = async (files: any[], operationType: string) => {
			if (operationType === 'add' && files.length) {
				Toast.loading('上传图片中');
				const res = await oss(files[0].url);
				Toast.hide();
				if (res.status === 'ok') {
					files.splice(0, 1, { ...files[0], path: res.data.path });
					this.setState({ files });
				} else {
					this.setState({ files: [] });
					Toast.fail('上传图片失败');
				}
			} else if (operationType === 'remove') {
				this.setState({ files: [] });
			}
		};

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

			let typeFormInput;
			if (this.state.formType === 0 && this.props.type != "钻石展位") {
				typeFormInput = '';
			} else if (this.state.formType === 1 && this.props.type != "钻石展位") {
				typeFormInput = (
					<List.Item
						extra={this.state.coupon.label ? this.state.coupon.label : '请选择优惠券'}
						arrow="horizontal"
						onClick={this.showModal}
					>
						优惠券
				</List.Item>
				);
			} else if (this.state.formType === 2 && this.props.type != "钻石展位") {
				typeFormInput = (
					<List.Item
						extra={this.state.activity.label ? this.state.activity.label : '请选择活动'}
						arrow="horizontal"
						onClick={this.showModal}
					>
						活动
				</List.Item>
				);
			} else if (this.state.formType === 3 && this.props.type != "钻石展位") {
				typeFormInput = (
					<InputItem
						style={{ textAlign: 'right' }}
						value={this.state.link}
						placeholder="请输入链接"
						onChange={this.handleChangeLink}
						clear
					>
						链接
				</InputItem>
				);
			}
			const imagePicker = !this.state.edit && (
				<ImagePicker
					className={styles.imagePicker}
					selectable={!this.state.files.length}
					files={this.state.files}
					length={1}
					onChange={this.handleCheckImage}
				/>
			);
			return (
				<div>
					{
						// 钻石展位不展示推广
						this.props.type != "钻石展位" ? (<SelectAdType value={this.state.formType} onChange={this.handleChangeType} adStatus={this.props.ad.adStatus} />) : null
					}
					{/* 模态框 */}
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

					<div className={((this.state.is_pause == 0 && this.state.check_status == 0) || (this.state.is_pause == 0 && this.state.check_status == 1) || (this.state.is_pause == 1 && this.state.check_status == 0)) ? styles.ad_status_isPut : (this.state.is_pause == 1 && this.state.check_status == 1) ? styles.ad_status_ispause : (this.state.is_pause == 0 && this.state.check_status == 2) ? styles.ad_status_isFail : ''}>
						{
							// this.state.ad_status == 0 ? ' 暂未投放': 
							(this.state.is_pause == 0 && this.state.check_status == 0) ? ' 审核中'
								: (this.state.is_pause == 0 && this.state.check_status == 1) ? ' 已投放'
									: (this.state.is_pause == 1 && this.state.check_status == 1) ? ' 已暂停'
										: (this.state.is_pause == 1 && this.state.check_status == 0) ? '待审核'
											: (this.state.is_pause == 0 && this.state.check_status == 2) ? ' 审核未通过' : ''
						}
					</div>
					<WingBlank className={styles.maxheight}>

						<Flex direction="column" className={styles.maxheight}>
							<Flex.Item>
								<List>
									{typeFormInput}
									<List.Item extra={time} arrow="horizontal" onClick={this.handleShowSelectTime}>
										广告投放时长
								</List.Item>
									<InputItem
										value={this.state.price}
										extra="元"
										type="money"
										onChange={this.handleChangePrice}
										className={styles.daily_budget}
									>
										每日预算
										<span className={styles.budget_info}>
											{
												(this.state.is_pause == -1) || (this.state.is_pause == 1 && this.state.check_status == 0) ? '最低预算1.1元，建议预算101元'
													: (this.state.is_pause == 0 && this.state.check_status == 0) || (this.state.is_pause == 0 && this.state.check_status == 1) ? `预算剩余${(Number(this.state.price) - Number(this.state.already_use_budget)).toFixed(2)}元，低于1.1元广告将暂停`
														: (this.state.is_pause == 1 && this.state.check_status == 1) ? `预算剩余${(Number(this.state.price) - Number(this.state.already_use_budget)).toFixed(2)}元` : ''
											}
										</span>
									</InputItem>
								</List>
								<div style={{ display: 'flex', justifyContent: 'space-between' }}>
									<div className={styles.adTitle}>广告图</div>
									<div className={styles.adTitle}>
										< img src={require('@/assets/ad/ad_intro.png')} alt="" style={{ marginRight: '15px' }} className={styles.ad_intro} />
										<span className={styles.ad_desc} onClick={() => { router.push('/ad/other-page/readme') }}>
											广告位介绍
										</span>
									</div>
								</div>
								{imagePicker}
								{this.state.edit &&
									<div className={styles.bannerBox}>
										<img className={styles.banner} src={this.state.banner} />
									</div>
								}

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
									(this.state.is_pause == 1 && this.state.check_status == 1) ? (
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
							</Flex.Item>


							<WhiteSpace size="lg" />

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
						</Flex>
						<SelectCoupon
							show={this.state.showSelectCoupon}
							onClose={this.closeModal}
							onSelect={this.handleSelectCoupon}
						/>
						<SelectActivity
							show={this.state.showSelectActivity}
							onClose={this.closeModal}
							onSelect={this.handleSelectCoupon}
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
)
