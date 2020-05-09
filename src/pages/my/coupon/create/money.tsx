import React, { Component } from 'react';
import { Flex, List, InputItem, ImagePicker, Toast, Icon } from 'antd-mobile';
import { connect } from 'dva';
import { MoneyForm } from './model';
import CustomInput from './InputItem'
import UploadImage from '@/components/upload-image'
import styles from './index.less'
import upload from '@/services/oss';
import router from 'umi/router'
interface Props extends MoneyForm {
	dispatch: (arg0: any) => any;
	showPrice: boolean;
	error: any,
	cashcouponImage: any,
	cashcouponImageApi: any,
	moneyForm: any
}

/**创建优惠券 */
export default connect(({ createCoupon }: any) => createCoupon)(
	class MoneyForm extends Component<Props> {
		handleInput = (type: string) => (value: any) => {
      if(type == 'limit_purchase_quantity'){
        if(value <= 100){
          this.props.dispatch({
            type: 'createCoupon/setMoney',
            payload: {
              [type]: value
            }
          });
        }
      }else {
        this.props.dispatch({
          type: 'createCoupon/setMoney',
          payload: {
            [type]: parseInt(value)
          }
        });
      }

    };


		handleInput2 = (type: string) => (value: any) => {
			if (value.split(".")[1] == undefined || (value.split(".")[1].length < 3 && value.split(".")[2] == undefined)) {
				this.props.dispatch({
					type: 'createCoupon/setMoney',
					payload: {
						[type]: value
					}
				});
			}
		};

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

    // 选择限制
    onChooseLimit = () => {
      this.props.dispatch({
        type: 'createCoupon/setMoney',
        payload: {
					isLimit: !this.props.moneyForm.isLimit
        }
      });
		}

		//图片详情使用dva
		uploadImageData = (showFiles: any, propFiles: any) => {
			this.props.dispatch({//负责显示给前台
				type: 'createCoupon/setCashcouponImage',
				payload: showFiles
			})
			this.props.dispatch({//传递给后台
				type: 'createCoupon/setCashcouponImageApi',
				payload: propFiles
			})
    }

    toGift = () => {
      const {total_num} = this.props.moneyForm
      if(!total_num){
        Toast.fail('请先输入发放数量')
        return
      }
      router.push({ pathname: '/activitys/gift', query: {sum: total_num, type: 3}})
    }


		render() {
			const { error, cashcouponImage, cashcouponImageApi } = this.props
			const {
				pay_money,
				validity,
				return_money,
				total_fee,
				total_num,
				money_temp_url1,
				money_temp_url2,
				money_temp_url3,
				isLimit,
				limit_purchase_quantity
			} = this.props.moneyForm
			const priceInput = this.props.showPrice && (
				<CustomInput
					value={String(pay_money || '')}
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
						value={String(validity || '')}
						onChange={this.handleInput('validity')}
					/>
				</Flex>
			);

			return (
				<div>
					<CustomInput
						value={String(return_money || '')}
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
						value={total_fee}
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
						value={String(total_num || '')}
						onChange={this.handleInput('total_num')}
						error={error.issuedNumber}
					/>
          <Flex justify='between' className={styles.limit_box}>
            <div>限购设置</div>
            <div className={styles.radioBox}>{
              isLimit ?
                <Flex className={styles.choose}>
                  <div className={styles.chooseBox} onClick={this.onChooseLimit} style={{ marginRight: 80 }}><img src="http://oss.tdianyi.com/front/p8kjkCbnYmZfD3JGP8feeKsWt8BQNHPh.png" />无限制</div>
                  <div className={styles.chooseBox} onClick={this.onChooseLimit}><img src="http://oss.tdianyi.com/front/36DfKaXdP8ea7SRcCXT8neArCE2YB76N.png" />x份/人</div>
                </Flex>
                :
                <Flex className={styles.choose}>
                  <div className={styles.chooseBox} onClick={this.onChooseLimit} style={{ marginRight: 80 }}><img src="http://oss.tdianyi.com/front/36DfKaXdP8ea7SRcCXT8neArCE2YB76N.png" />无限制</div>
                  <div className={styles.chooseBox} onClick={this.onChooseLimit}><img src="http://oss.tdianyi.com/front/p8kjkCbnYmZfD3JGP8feeKsWt8BQNHPh.png" />x份/人</div>
                </Flex>
            }</div>
          </Flex>
          {
            isLimit ? <Flex className={styles.limit_number_box}>
              <InputItem type='number' value={limit_purchase_quantity} onChange={this.handleInput('limit_purchase_quantity')} placeholder='每个用户最多可购买数量' />
            </Flex> : null
          }
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
									files={money_temp_url1}
									onChange={this.changeImageURL1}
									selectable={!Boolean(money_temp_url1) || money_temp_url1.length < 1}
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
									files={money_temp_url2}
									onChange={this.changeImageURL2}
									selectable={!Boolean(money_temp_url2) || money_temp_url2.length < 1}
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
									files={money_temp_url3}
									onChange={this.changeImageURL3}
									selectable={!Boolean(money_temp_url3) || money_temp_url3.length < 1}
								/>
							</div>
							<div className={styles.describe}></div>
						</div>
					</Flex>

					<div
						className={error.cashActiveImage  ? styles.show_active_picture_error : styles.hidden_active_picture_error}>
						{error.cashActiveImage ? error.cashActiveImage  : null}
					</div>

					<div className={styles.image_details}>
						详情图片
							<span className={styles.prompt}>可上传6张图片对商品进行详细的说明，尺寸比例不限</span>
					</div>
					<Flex className={styles.upload_image_box}>
						<UploadImage
							showFiles={cashcouponImage}
							propFiles={cashcouponImageApi}
							length={6}
							onChange={this.uploadImageData}
						/>
					</Flex>
          <div className={styles.gift}>
              <Flex className={styles.title}><div>礼品设置</div></Flex>
              <div className={styles.gift_Box}>
                <Flex className={styles.giftBox} onClick={this.toGift}>
                  <div style={{ color: "#666666" }}>选择礼品</div>
                  <div className={styles.giftName} >
                    <div className={styles.giftName_title} >
                     </div>
                    <Icon type="right" color='#999' className={styles.icon_right} />
                  </div>
                </Flex>
              </div>
            </div>
				</div>
			);
		}
	}
);
