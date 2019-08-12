import React, { Component } from 'react';
import { Flex, List, WingBlank, InputItem, Button, Toast, ImagePicker } from 'antd-mobile';

import styles from '../index.less';
import router from 'umi/router';
import SelectCoupon from '../components/select-coupon';
import request from '@/services/request';
import SelectTime from '../components/select-time';
import moment from 'moment';
import SelectAdType from '../components/selectType';
import StopAd from '../components/stop';
import SelectActivity from '../components/select-activity';
import oss from '@/services/oss';

import { connect } from 'dva';

interface Props {
	editForm: any;
	position: number;
	onSuccess: () => void;
}

export default connect(({ ad }: any) => ad)(
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
			startTime: undefined,
			endTime: undefined,
			/**是否是修改状态，修改状态下，只能暂停 */
			edit: false,
			/**是否暂停提示显示 */
			stopModalShow: false,
			/**表单类型 本店, 优惠券，活动，链接 */
			formType: this.props.popType,
			//type : null,   // 默认切换顶部tab时type回到第一个
			link: '',
			/**是否已经发布过 */
			maked: false,
			id: 0,
			banner: '',
			files: [{ path: '' }]
		};
		UNSAFE_componentWillReceiveProps(nextProps: any) {
			// 为了防止切换时没数据而保持渲染所以每次切换时先清除数据
			this.setState({
				coupon: {
					label: "",
					value: 0
				},
				price: "",
				edit: false,
				formType: this.props.popType,  // 切换时候的index
				maked: false,
				id: undefined,
				files: [{ path: '' }],
				banner: "",
				startTime: undefined,
				endTime: undefined,
				link: ""
			}, () => {
				if (nextProps.editForm.id) {
					this.setState({
						coupon: {
							label: nextProps.editForm.coupon_name,
							value: nextProps.editForm.coupon_id
						},
						price: nextProps.editForm.daily_budget,
						edit: nextProps.editForm.is_pause === 0,
						formType: nextProps.editForm.romotion_type - 1,
						maked: true,
						id: nextProps.editForm.id,
						files: nextProps.editForm.original
							? [{ url: nextProps.editForm.original, path: nextProps.editForm.original }]
							: [],
						banner: nextProps.editForm.original,
						startTime: nextProps.editForm.begin_time,
						endTime: nextProps.editForm.end_time,
						link: nextProps.editForm.link
					});
				} else {
					this.setState({
						files: []
					});
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
		handleChangePrice = (price: any) => this.setState({ price });
		handleShowSelectTime = () => this.setState({ showSelectTime: true });
		handleSelectTime = (time: any) => this.setState({ ...time }, this.closeModal);
		/**
		 * 暂停或是投放广告
		 * @param isStop 是否是暂停提交操作
		 */
		handleSubmit = async (e: any, isStop?: boolean) => {
			if (!this.state.edit || isStop) {
				if (this.state.formType === 1 && !this.state.coupon.value) {
					return Toast.info('请选择优惠券');
				}
				if (this.state.formType === 2 && !this.state.activity.value) {
					return Toast.info('请选择活动');
				}
				if (this.state.formType === 3 && !this.state.link) {
					return Toast.info('请填写链接');
				}
				if (!this.state.startTime) {
					return Toast.info('请选择广告投放时长');
				}
				if (!this.state.price) {
					return Toast.info('请输入每日预算');
				}
				if (!this.state.files.length) {
					return Toast.info('请选择广告图');
				}
				Toast.loading('');
				let data: any = {
					daily_budget: this.state.price,
					begin_time: this.state.startTime,
					end_time: this.state.endTime,
					type: this.state.formType + 1,
					position_id: this.props.position,
					ad_pic: this.state.files[0].path
				};
				if (this.state.formType === 1) {
					data.coupon_id = this.state.coupon.value;
				} else if (this.state.formType === 2) {
					data.activity_id = this.state.activity.value;
				} else if (this.state.formType === 3) {
					data.link = this.state.link;
				}
				let res;
				if (isStop) {
					res = await request({ url: 'v3/ads/' + this.state.id, method: 'put', data: { ...data, is_pause: 1 } });
				} else {
					if (this.state.maked) {
						res = await request({
							url: 'v3/ads/' + this.state.id,
							method: 'put',
							data: { ...data, is_pause: 0 }
						});
					} else {
						res = await request({ url: 'v3/ads', method: 'post', data });
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

		handleChangeType = (type: number) => {
			// this.setState({ 
			// 	type: type
			// }, () => {
			// 	this.props.getIndex(type + 1);
			// });
			this.props.dispatch({
				type: 'ad/setType',
				payload: {
					popType: type
				}
			})
			this.props.getIndex(type + 1)
		};

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
						this.props.type != "钻石展位" ? (<SelectAdType value={this.state.formType} onChange={this.handleChangeType} />) : null
					}
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
										clear
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
								<div className={styles.adTitle}>广告图</div>
								{imagePicker}
								{this.state.edit &&
									<div className={styles.bannerBox}>
										<img className={styles.banner} src={this.state.banner} />
									</div>
									//this.state.formType == 0 ? <img className={styles.banner} src={this.state.banner} /> 
									//  : this.state.formType == 1?  <img className={styles.banner} src={this.state.banner} /> : null
								}
							</Flex.Item>
							<Flex justify="start">
								<span className={styles.link} onClick={() => { router.push('/ad/other-page/readme') }}>
									创建必读
								</span>
							</Flex>
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