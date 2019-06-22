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
			showPrice: true
		};

		componentDidMount = () => {
			this.setState({ showPrice: !this.props.location.query.isAd });
		};

		handleSelectType = () =>
			ActionSheet.showActionSheetWithOptions({ options: types }, type =>
				this.setState({ type: type !== -1 ? type : this.state.type })
			);

		handleSubmit = async () => {
			Toast.loading('');
			const res = this.state.type === 0 ? await this.postCoupon() : await this.postMoney();
			Toast.hide();
			if (res.code === 200) {
				Toast.success('添加成功');
				this.props.dispatch({ type: 'createCoupon/reset' });
				setTimeout(() => {
					router.goBack();
				}, 2000);
			}
		};

		postCoupon = () =>
			request({
				url: 'api/merchant/youhui/addDiscounts',
				method: 'post',
				data: {
					...this.props.couponForm,
					is_ad: this.props.location.query.isAd,
					/**商圈广告下，购买价格为0 */
					pay_money: this.state.showPrice ? this.props.couponForm : 0
				}
			});

		postMoney = () =>
			request({
				url: 'api/merchant/youhui/addDiscounts',
				method: 'post',
				data: this.props.moneyForm
			});

		render() {
			const form = this.state.type === 0 ? <CouponForm showPrice={this.state.showPrice} /> : <MoneyForm />;
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
						{/* <Flex.Item>预览</Flex.Item> */}
						<Flex.Item onClick={this.handleSubmit}>确认发布</Flex.Item>
					</Flex>
				</Flex>
			);
		}
	}
);
