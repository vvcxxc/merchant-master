import React, { Component } from 'react';
import { InputItem, List, Flex, ImagePicker, Toast } from 'antd-mobile';
import { connect } from 'dva';
import { CouponForm } from './model';
import styles from './index.less';
import upload from '@/services/oss';
import Notice from '@/pages/activitys/components/notice';
import router from 'umi/router';
import CustomInput from './InputItem'
interface errorType {
	nameWrong?: string,			//券名错误
	marketPrice?: string,		//市场价错误
	issuedNumber?: string,	//发放数量错误
	buyingPrice?: string,		//购买价格错误
	validity?: string,			//有效期错误
	userNotice?: string,		//使用须知
	noticeDetails?: string,	//须知详情
	activeImg?: string 			//活动图片
}
interface Props extends CouponForm {
	dispatch: (arg0: any) => any;
	showPrice: boolean;
	error: errorType
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
			keys: '100',
			nameWrong: '',//券名错误
			marketPrice: '',//市场价错误
			issuedNumber: '',//发放数量错误
			buyingPrice: '',//购买价格错误
			validity: '',//有效期错误
			userNotice: '',//使用须知
			noticeDetails: '',//须知详情
			activeImg :''//活动图片
    };
    componentDidMount(){
      console.log(this.props)
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
				if (value.split(".")[1] == undefined || (value.split(".")[1].length < 2 && value.split(".")[2] == undefined)) {
					this.props.dispatch({
						type: 'createCoupon/setCoupon',
						payload: {
							[type]: value
						}
					});
				}
			}
		};
		handleInput2 = (type: string) => (value: any) => {//发放数量的输入
			this.props.dispatch({
				type: 'createCoupon/setCoupon',
				payload: {
					//handleInput2只可以整数
					[type]: type === 'coupons_name' ? value : parseInt(value)

				}
			});
			if (parseInt(value)) this.setState({ error_total_num:true})
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

		//账号输入
		onChangeText = (value: any) => {
			this.setState({
				inpText: value
			})
		}
		//账号删除
		onDeleteText = () => {
			this.setState({
				inpText: ''
			})
		}

		render() {
			const { error } = this.props
			const notice = this.state.showNotice && (
				<Notice
					keys={this.state.keys}
					notice_list={this.props.description}
					onChange={this.handleNoticeChange}
				/>
			);
			const priceInput = this.props.showPrice && (
				<CustomInput
					extra="元"
					type="money"
					showName='购买价格'
					value={String(this.props.pay_money || '')}
					onChange={this.handleInput('pay_money')}
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
						onChange={this.handleInput2('validity')}
					/>
				</Flex>
			);

			return (
				<div className={styles.discount_coupon}>
					<CustomInput
						showName='优惠券名称'
						placeholder="请输入券的名称"
						value={this.props.coupons_name}
						onChange={this.handleInput('coupons_name')}
						error={error.nameWrong}
					/>
					<CustomInput
						extra="元"
						type="money"
						showName='市场价'
						value={String(this.props.return_money || '')}
						onChange={this.handleInput('return_money')}
						error={error.marketPrice}
					/>
					<CustomInput
						extra="张"
						type="money"
						showName='发放数量'
						value={String(this.props.total_num || '')}
						onChange={this.handleInput2('total_num')}
						error={error.issuedNumber}
					/>
					{priceInput}
					<List.Item extra={DateInput}>优惠券有效期</List.Item>
					{
						error.validity ?
							<div className={styles.groub_hint}>{error.validity}</div> : null
					}
					<List.Item
						extra={<span>{
								this.props.description && this.props.description .length != 0 ? '已设置' + this.props.description .length + '条规则' : '请设置使用须知'}
						</span>}
						arrow="horizontal"
						onClick={this.handleShowNotice}
					>
						使用须知
					</List.Item>
					{
						error.userNotice ?
							<div className={styles.groub_hint}>{error.userNotice}</div> : null
					}
					<div id={styles.no_bottom_box} >
						<List.Item >活动图片</List.Item>
					</div>
					{/* <div>活动图片</div> */}
					<div className={styles.prompt}>温馨提示：请上传横向的图片; 建议图片比例为16:9。</div>
					<Flex className={styles.img_box}>
						<div className={styles.image}>
							<div className={styles.cover_img}>
								<ImagePicker
									className={styles.upload_img}
									multiple={false}
									length={1}
									files={this.props.temp_url1}
									onChange={this.uploadImage('files')}
									selectable={!Boolean(this.props.temp_url1) || this.props.temp_url1.length < 1}
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
									files={this.props.temp_url2}
									onChange={this.uploadImage('detailFiles')}
									selectable={!Boolean(this.props.temp_url2) || this.props.temp_url2.length < 1}
								/>
							</div>
							<div className={styles.describe}></div>
						</div>
					</Flex>
					{
						error.activeImg ?
							<div className={styles.groub_hint} style={{ marginBottom: '50px' }}>{error.activeImg}</div> : null
					}
					{notice}
				</div>
			);
		}
	}
);
