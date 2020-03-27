/**title: 添加优惠券 */
import React, { Component } from 'react';
import { WingBlank, Flex, List, InputItem, ActionSheet, Toast } from 'antd-mobile';
import styles from './index.less';
import CouponForm from './coupon';
import MoneyForm from './money';
import request from '@/services/request';
import { connect } from 'dva';
import router from 'umi/router';

const types = ['优惠券', '现金券'];

export default connect(({ createCoupon }: any) => createCoupon)(
	class CreateCoupon extends Component<any> {
		state = {
			type: 0, // 券的类型
			/**是否显示购买价格，商圈广告下不显示 */
			showPrice: true,
			error: {
				nameWrong: '',//券名错误
				marketPrice: '',//市场价错误
				issuedNumber: '',//发放数量错误
				buyingPrice: '',//购买价格错误
				validity: '',//有效期错误
				userNotice: '',//使用须知
				noticeDetails: '',//须知详情
				activeImg: '',//活动图片

			},
			errorTwo: {
				amountError: '',//面额
				doorsill: '',//门槛
				buyingPrice: '',//购买价格错误
				issuedNumber: '',//发放数量错误
				validity: '',//有效期错误
				cashActiveImage: ''
			}
		};

		componentDidMount = () => {
			this.setState({ showPrice: !this.props.location.query.isAd });
		};

		handleSelectType = () =>
			ActionSheet.showActionSheetWithOptions({ options: types }, type =>
				this.setState({ type: type !== -1 ? type : this.state.type })
			);

		handleSubmit = async () => {
			console.log(this.props);
			const { type } = this.state
			let total: any = {}
			//这里触发校验函数
			if (type === 0) {//优惠券判断

				const { coupons_name, return_money, total_num, pay_money, validity, description, image_url, total_fee } = this.props.couponForm

				let returnMoney = return_money && Number(return_money)//市场价格
				let totalNum = total_num && Number(total_num)//发放数量
				let payMoney = pay_money && Number(pay_money)//购买价格
				let Validity = validity && Number(validity)//有效期

				!coupons_name || coupons_name.length < 1 ?
					total.nameWrong = '请输入优惠券名称' : (
						!/^[\u4e00-\u9fa5A-Za-z0-9-_!@#$%^&*()+=,./';:"?><\|！@#￥%……&*（）——：“”；》《，。、？|]*$/.test(coupons_name) ?
							total.nameWrong = '优惠券名称中含有非法字符，请重新编辑。' : ''
					)

				total.marketPrice = !returnMoney && returnMoney !== 0 ? '请输入市场价格' : (
					returnMoney == 0 ? '市场价格必须大于0' : ''
				)

				total.issuedNumber = !totalNum && totalNum !== 0 ? '请设置发放数量' : (
					totalNum === 0 ? '发放数量必须大于0' : ''
				)

				total.buyingPrice = !payMoney && payMoney !== 0 && this.state.showPrice ? '请设置购买价格' : (
					payMoney === 0 && payMoney <= returnMoney && this.state.showPrice ? '购买价格必须大于0元' : (
						(payMoney > returnMoney && returnMoney || returnMoney === 0) && this.state.showPrice ? '购买价格不可高于市场价格，请重新设置' : ''
					)
				)

				total.validity = !Validity && Validity !== 0 ? '请设置优惠券有效期' : (
					Validity === 0 ? '优惠券有效期必须大于0' : ''
				)

				!description[0] ? total.userNotice = '请设置使用须知' : (
					description.map((item: any, index: number) => {
						!/^[\u4e00-\u9fa5A-Za-z0-9-_!@#$%^&*()+=,./';:"?><\|！@#￥%……&*（）——：“”；》《，。、？|]*$/.test(item) ? total.userNotice = '含有非法字符，请重新编辑后提交' : ''
					})
				)

				image_url ? (
					total.activeImg = !image_url[0] || !image_url[1] ? '请上传图片完整后再重新提交' : ''
				) : (
						total.activeImg = '请上传图片完整后再重新提交'
					)
				// console.log(total);
			}

			if (type == 1) {//现金券判断
				const { coupons_type, pay_money, return_money, total_fee, total_num, validity, money_image_url1, money_image_url2, money_image_url3 } = this.props.moneyForm

				let returnMoney = return_money && Number(return_money)
				let payMoney = pay_money && Number(pay_money)
				let totalFee = total_fee && Number(total_fee)
				let Validity = validity && Number(validity)//有效期
				let totalNum = total_num && Number(total_num)

				total.amountError = !returnMoney && returnMoney !== 0 ? '请设置购买价格' : (
					returnMoney <= 0 ? '购买价格必须大于0元' : ''
				)
				total.buyingPrice = !payMoney && payMoney !== 0 && this.state.showPrice ? '请设置购买价格' : (
					payMoney === 0 && payMoney <= returnMoney && this.state.showPrice ? '购买价格必须大于0元' : (
						payMoney > returnMoney && returnMoney && this.state.showPrice ? '购买价格不可高于优惠券面额，请重新设置.' : ''
					)
				)

				// total.doorsill = !totalFee && totalFee !== 0 ? '请设置使用门槛' : (
				// 	totalFee > returnMoney ? '使用门槛不可高于卡券面额，请重新设置' : ''//如果returnMoney没有值？
				// )

				total.validity = !Validity && Validity !== 0 ? '请设置优惠券有效期' : (
					Validity <= 0 ? '优惠券有效期必须大于0' : ''
				)

				total.issuedNumber = !totalNum && totalNum !== 0 ? '请设置发放数量' : (
					totalNum <= 0 ? '发放数量必须大于0' : ''
				)

				total.cashActiveImage = !money_image_url1 || !money_image_url2 || !money_image_url3 ? '请上传图片完整后再重新提交' : ""

				// console.log(total);

			}

			switch (type) {
				case 1:
					console.log(324)
					this.setState({ errorTwo: total })
					for (let key in total) {
						if (total[key]) {
							this.setState({ errorTwo: total })
							return
						}
						this.setState({ errorTwo: {} })
					}
					break;

				default:
					this.setState({ error: total })
					for (let key in total) {
						console.log(total[key])
						if (total[key]) {
							this.setState({ error: total })
							return
						}
						this.setState({ error: {} })
					}
					break;
			}

			Toast.loading('');
			const res = this.state.type === 0 ? await this.postCoupon() : await this.postMoney();
			Toast.hide();

			if (!res) return
			if (res.code === 200) {
				Toast.success('添加成功');
				this.props.dispatch({
					type: 'businessArea/setCoupon',
					payload: {
						label: this.state.type === 0 ? this.props.couponForm.coupons_name : res.data.msg,
						value: res.data.youhu_id
					}
				});
				this.props.dispatch({ type: 'createCoupon/reset' });
				setTimeout(() => {
					if (this.props.location.query.isAd) {
						router.goBack();
					} else {
						router.push('/my/coupon');
					}
				}, 2000);
			}
		};

		postCoupon = () =>
			request({
				url: 'api/merchant/youhui/addDiscounts',
				method: 'post',
				data: {
					// ...this.props.couponForm,
					coupons_type: this.props.couponForm.coupons_type * 1,
					coupons_name: this.props.couponForm.coupons_name,
					return_money: this.props.couponForm.return_money * 1,
					total_num: this.props.couponForm.total_num * 1,
					validity: this.props.couponForm.validity * 1,
					description: this.props.couponForm.description,
					image: this.props.couponForm.image,
					image_url: this.props.couponForm.image_url,
					// temp_url1: this.props.couponForm.temp_url1,
					// temp_url2: this.props.couponForm.temp_url2,
					is_ad: this.props.location.query.isAd,
					/**商圈广告下，购买价格为0 */
					pay_money: this.state.showPrice ? this.props.couponForm.pay_money * 1 : 0,
					share_info: this.props.couponForm.shareText,
					is_delivery: this.props.couponForm.isDelivery ? 1 : 0,

				}
			});

		postMoney = () =>

			request({
				url: 'api/merchant/youhui/addDiscounts',
				method: 'post',
				data: {
					// ...this.props.moneyForm,
					return_money: this.props.moneyForm.return_money * 1,
					coupons_type: this.props.moneyForm.coupons_type * 1,
					total_fee: this.props.moneyForm.total_fee * 1,
					validity: this.props.moneyForm.validity * 1,
					total_num: this.props.moneyForm.total_num * 1,
					is_ad: this.props.location.query.isAd,
					/**商圈广告下，购买价格为0 */
					pay_money: this.state.showPrice ? this.props.moneyForm.pay_money * 1 : 0,
					image: this.props.moneyForm.money_image_url1,
					image_url: [this.props.moneyForm.money_image_url1, this.props.moneyForm.money_image_url2, this.props.moneyForm.money_image_url3]
				}
			});


		pushPage = (_type: any) => {
			if (_type == 1) {
				router.push('/my/coupon/create/ticket-buy');
			} else if (_type == 0) {
				router.push('/my/coupon/create/set-meal');
			}

		};
		render() {
			const form =
				this.state.type === 0 ? (
					<CouponForm
						showPrice={this.state.showPrice}
						error={this.state.error}
					/>

				) : (
						<MoneyForm
							showPrice={this.state.showPrice}
							error={this.state.errorTwo}
						/>
					);
			return (
				<Flex direction="column" className={styles.page}>
					<Flex.Item>
						<WingBlank>
							<List>
								<List.Item
									extra={types[this.state.type]}
									arrow="horizontal"
									onClick={this.handleSelectType}
								>
									券的类型
								</List.Item>
								{form}
							</List>
						</WingBlank>
					</Flex.Item>
					<Flex className={styles.btns}>
						{/* <Flex.Item onClick={this.pushPage.bind(this, this.state.type)}>预览</Flex.Item> */}
						<Flex.Item onClick={this.handleSubmit}>确认发布</Flex.Item>
					</Flex>
				</Flex>
			);
		}
	}
);
