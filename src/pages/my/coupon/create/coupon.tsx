import React, { Component } from 'react';
import { InputItem, List, Flex, ImagePicker, Toast } from 'antd-mobile';
import { connect } from 'dva';
import { CouponForm } from './model';
import styles from './index.less';
import upload from '@/services/oss';
import Notice from '@/pages/activitys/components/notice';
import router from 'umi/router';

interface Props extends CouponForm {
	dispatch: (arg0: any) => any;
	showPrice: boolean;
}

/**创建优惠券 */
export default connect(({ createCoupon }: any) => createCoupon.couponForm)(
	class CouponForm extends Component<Props> {
		state = {
			inputFile: false,
			files: [],
			detailFiles: [],
			showNotice: false,
			// notice的key值
			keys: '100'
		};
		componentDidMount() {
		}
		handleNoticeChange = (notice: any[], keys: string) => {
			this.setState({ keys });
			this.props.dispatch({
				type: 'createCoupon/setCoupon',
				payload: {
					description: notice
				}
			});
			this.setState({ showNotice: false });
		};
		// handleShowNotice = () => this.setState({ showNotice: true });
		handleShowNotice = () => router.push({ pathname: '/activitys/notice', query: { type: 3 } })
		handleInput = (type: string) => (value: any) => {
			// console.log(value)
			// console.log(type)
			if (type == 'coupons_name') {
				if (value.length <= 30) {
					//名字
					this.props.dispatch({
						type: 'createCoupon/setCoupon',
						payload: {
							[type]: value
						}
					});
				}
			} else {
				if (value.split(".")[1] == undefined || (value.split(".")[1].length < 3 && value.split(".")[2] == undefined)) {
					//涉及到金额的都用一位小数
					this.props.dispatch({
						type: 'createCoupon/setCoupon',
						payload: {
							[type]: value
						}
					});
				}
			}
		};
		handleInput2 = (type: string) => (value: any) => {
			this.props.dispatch({
				type: 'createCoupon/setCoupon',
				payload: {
					//handleInput2只可以整数
					[type]: type === 'coupons_name' ? value : parseInt(value)

				}
			});
		};

		uploadImage = (type: any) => (files: any[], operationType: string, index?: number): void => {
			this.setState({ [type]: files });
			if (type === 'files') {
				this.props.dispatch({ type: 'createCoupon/setCoupon', payload: { temp_url1: files } });
			} else {
				this.props.dispatch({ type: 'createCoupon/setCoupon', payload: { temp_url2: files } });
			}
			if (operationType === 'add') {
				Toast.loading('上传图片中');
				upload(files[files.length - 1].url).then(res => {
					this.setState({ [type]: files });
					Toast.hide();
					if (res.status === 'ok') {
						if (type === 'files') {
							this.props.dispatch({ type: 'createCoupon/setCoupon', payload: { image: res.data.path,  image_url: [...(this.props.image_url || []), res.data.path] } });
						} else {
							this.props.dispatch({
								type: 'createCoupon/setCoupon',
								payload: { image_url: [...(this.props.image_url || []), res.data.path] }
							});
						}
					}
				});
			} else if (operationType === 'remove') {
				this.setState({ [type]: files });
				if (type === 'files') {
					this.props.dispatch({ type: 'createCoupon/setCoupon', payload: { image: '' } });
				} else {
					const urls = [...(this.props.image_url || [])];
					urls.splice(index || -1, 1);
					this.props.dispatch({
						type: 'createCoupon/setCoupon',
						payload: { image_url: [...urls] }
					});
				}
			}
		};

		render() {
			const notice = this.state.showNotice && (
				<Notice
					keys={this.state.keys}
					notice_list={this.props.description}
					onChange={this.handleNoticeChange}
				/>
			);
			const priceInput = this.props.showPrice && (
				<InputItem
					type="money"
					extra="元"
					value={String(this.props.pay_money || '')}
					onChange={this.handleInput('pay_money')}
				>
					购买价格
				</InputItem>
			);
			const DateInput = (
				<Flex>
					购券日起
					<InputItem
						className="numberInput"
						extra="天可用"
						type="money"
						value={String(this.props.validity || '')}
						onChange={this.handleInput2('validity')}
					/>
				</Flex>
			);
			return (
				<div>
					<InputItem
						className={styles.coupons_name}
						value={this.props.coupons_name}
						placeholder="请输入券的名称"
						onChange={this.handleInput('coupons_name')}
						clear
					>
						优惠券名称
					</InputItem>
					<InputItem
						extra="元"
						type="money"
						value={String(this.props.return_money || '')}
						onChange={this.handleInput('return_money')}
					>
						市场价
					</InputItem>
					<InputItem
						type="money"
						extra="张"
						value={String(this.props.total_num || '')}
						onChange={this.handleInput2('total_num')}
					>
						发放数量
					</InputItem>
					{priceInput}
					<List.Item extra={DateInput}>优惠券有效期</List.Item>
					<List.Item
						extra={<span>{this.props.description[0] ? this.props.description[0] + '...' : undefined}</span>}
						arrow="horizontal"
						onClick={this.handleShowNotice}
					>
						使用须知
					</List.Item>
					<List.Item arrow="horizontal">封面图片</List.Item>
					<div className={styles.prompt}>温馨提示：请上传横向的图片; 建议图片比例为16:9。</div>
					<ImagePicker
						files={this.props.temp_url1}
						// files={this.state.files}
						onChange={this.uploadImage('files')}
						selectable={!Boolean(this.props.temp_url1) || this.props.temp_url1.length < 1}
					/>
					<List.Item arrow="horizontal">图片详情</List.Item>
					<ImagePicker
						// files={this.state.detailFiles}
						files={this.props.temp_url2}
						onChange={this.uploadImage('detailFiles')}
						selectable={!Boolean(this.props.temp_url2) || this.props.temp_url2.length < 2}
					/>
					{notice}
				</div>
			);
		}
	}
);
