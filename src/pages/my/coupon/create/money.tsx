import React, { Component } from 'react';
import { Flex, List, InputItem, ImagePicker, Toast } from 'antd-mobile';
import { connect } from 'dva';
import { MoneyForm } from './model';
import CustomInput from './InputItem'
import styles from './index.less'
import upload from '@/services/oss';

interface Props extends MoneyForm {
	dispatch: (arg0: any) => any;
	showPrice: boolean;
	error: any
}

/**创建优惠券 */
export default connect(({ createCoupon }: any) => createCoupon.moneyForm)(
	class MoneyForm extends Component<Props> {
		handleInput = (type: string) => (value: any) => {
			this.props.dispatch({
				type: 'createCoupon/setMoney',
				payload: {
					[type]: parseInt(value)
					// [type]: value

				}
			});
		};

		handleInput2 = (type: string) => (value: any) => {
			if (value.split(".")[1] == undefined || (value.split(".")[1].length < 3 && value.split(".")[2] == undefined)) {
				this.props.dispatch({
					type: 'createCoupon/setMoney',
					payload: {
						// [type]: parseInt(value)
						[type]: value

					}
				});
			}
		};



		// uploadImage = (type: any) => (files: any[], operationType: string, index?: number): void => {
		// 	this.setState({ [type]: files });
		// 	if (type === 'files') {
		// 		this.props.dispatch({ type: 'createCoupon/setCoupon', payload: { temp_url1: files } });
		// 	} else {
		// 		this.props.dispatch({ type: 'createCoupon/setCoupon', payload: { temp_url2: files } });
		// 	}
		// 	if (operationType === 'add') {
		// 		Toast.loading('上传图片中');
		// 		upload(files[files.length - 1].url).then(res => {
		// 			this.setState({ [type]: files });
		// 			Toast.hide();
		// 			if (res.status === 'ok') {
		// 				if (type === 'files') {
		// 					this.props.dispatch({ type: 'createCoupon/setCoupon', payload: { image: res.data.path, image_url: [...(this.props.image_url || []), res.data.path] } });
		// 				} else {
		// 					this.props.dispatch({
		// 						type: 'createCoupon/setCoupon',
		// 						payload: { image_url: [...(this.props.image_url || []), res.data.path] }
		// 					});
		// 				}
		// 			}
		// 		});
		// 	} else if (operationType === 'remove') {
		// 		this.setState({ [type]: files });
		// 		if (type === 'files') {
		// 			this.props.dispatch({ type: 'createCoupon/setCoupon', payload: { image: '' } });
		// 		} else {
		// 			const urls = [...(this.props.image_url || [])];
		// 			urls.splice(index || -1, 1);
		// 			this.props.dispatch({
		// 				type: 'createCoupon/setCoupon',
		// 				payload: { image_url: [...urls] }
		// 			});
		// 		}
		// 	}
		// };

		changeImageURL1 = (files: any) => {
			Toast.loading('')
			if (files[0]) {
				let img = files[0].url;
				upload(img).then(res => {
					Toast.hide()
					let { data } = res;
					this.props.dispatch({
						type: 'createCoupon/setMoney',
						payload: {
							money_temp_url1: files,
							money_image_url1: data.path
						}
					});
				});
			} else {
				Toast.hide()
				this.props.dispatch({
					type: 'createCoupon/setMoney',
					payload: {
						money_temp_url1: [],
						money_image_url1: '',
					}
				});
			}
		}

		changeImageURL2 = (files: any) => {
			Toast.loading('')
			if (files[0]) {
				let img = files[0].url;
				upload(img).then(res => {
					Toast.hide()
					let { data } = res;
					this.props.dispatch({
						type: 'createCoupon/setMoney',
						payload: {
							money_temp_url2: files,
							money_image_url2: data.path,
						}
					});
				});
			} else {
				Toast.hide()
				this.props.dispatch({
					type: 'createCoupon/setMoney',
					payload: {
						money_temp_url2: [],
						money_image_url2: '',
					}
				});
			}
		}
		changeImageURL3 = (files: any) => {
			Toast.loading('')
			if (files[0]) {
				let img = files[0].url;
				upload(img).then(res => {
					Toast.hide()
					let { data } = res;
					this.props.dispatch({
						type: 'createCoupon/setMoney',
						payload: {
							money_temp_url3: files,
							money_image_url3: data.path,
						}
					});
				});
			} else {
				Toast.hide()
				this.props.dispatch({
					type: 'createCoupon/setMoney',
					payload: {
						money_temp_url3: [],
						money_image_url3: '',
					}
				});
			}
		}


		render() {
			const { error } = this.props
			const priceInput = this.props.showPrice && (
				<CustomInput
					value={String(this.props.pay_money || '')}
					type="money"
					showName='购买价格'
					onChange={this.handleInput2('pay_money')}
					extra="元"
					error={error.buyingPrice}
				/>
			);


			const DateInput = (
				<Flex>
					购券日起
					<InputItem
						className="numberInput"
						extra="天可用"
						type="money"
						value={String(this.props.validity || '')}
						onChange={this.handleInput('validity')}
					/>
				</Flex>
			);

			return (
				<div>
					<CustomInput
						value={String(this.props.return_money || '')}
						type="money"
						showName='面额'
						onChange={this.handleInput2('return_money')}
						extra="元"
						error={error.amountError}
					/>
					{priceInput}
					<CustomInput
						showName='使用门槛'
						type="money"
						extra="元"
						value={this.props.total_fee}
						onChange={this.handleInput2('total_fee')}
						error={error.doorsill}
					/>
					<List.Item extra={DateInput}>优惠券有效期</List.Item>


					<div className={styles.groub_hint} style={{ borderTop: error.validity ? '1px solid red' : '' }}>{error.validity ? error.validity : ''}</div>

					<CustomInput
						showName='发放数量'
						type="money"
						extra="张"
						integer={6}
						value={String(this.props.total_num || '')}
						onChange={this.handleInput('total_num')}
						error={error.issuedNumber}
					/>
					<div id={styles.no_bottom_box} >
						<List.Item >活动图片</List.Item>
					</div>
					<div className={styles.prompt}>温馨提示：请上传正方形的图片，建议图片比例1:1。</div>
					<Flex className={styles.img_box}>
						<div className={styles.image}>
							<div className={styles.cover_img}>
								<ImagePicker
									className={styles.upload_img}
									multiple={false}
									length={1}
									files={this.props.money_temp_url1}
									onChange={this.changeImageURL1}
									selectable={!Boolean(this.props.money_temp_url1) || this.props.money_temp_url1.length < 1}
								/>
							</div>
							<div className={styles.describe}>封面</div>
						</div>
						<div className={styles.image}>
							<div className={styles.cover_img}>
								<ImagePicker
									className={styles.upload_img}
									multiple={false}
									length={1}
									files={this.props.money_temp_url2}
									onChange={this.changeImageURL2}
									selectable={!Boolean(this.props.money_temp_url2) || this.props.money_temp_url2.length < 1}
								/>
							</div>
							<div className={styles.describe}></div>
						</div>
						<div className={styles.image}>
							<div className={styles.cover_img}>
								<ImagePicker
									className={styles.upload_img}
									multiple={false}
									length={1}
									files={this.props.money_temp_url3}
									onChange={this.changeImageURL3}
									selectable={!Boolean(this.props.money_temp_url3) || this.props.money_temp_url3.length < 1}
								/>
							</div>
							<div className={styles.describe}></div>
						</div>
					</Flex>
					{
						<div className={styles.groub_hint} style={{
							marginBottom: '50px',
							borderTop: error.cashActiveImage ? '1px solid red' : ''
						}}>
							{error.cashActiveImage ? error.cashActiveImage : null}
						</div>
					}
				</div>
			);
		}
	}
);
