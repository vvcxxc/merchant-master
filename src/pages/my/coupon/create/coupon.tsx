import React, { Component } from 'react';
import { InputItem, List, Flex } from 'antd-mobile';
import { connect } from 'dva';
import { CouponForm } from './model';
import styles from './index.less';
import upload from '@/services/oss';

interface Props extends CouponForm {
	dispatch: (arg0: any) => any;
}

/**创建优惠券 */
export default connect(({ createCoupon }: any) => createCoupon.couponForm)(
	class CouponForm extends Component<Props> {
		fileInput: HTMLInputElement | null | undefined;

		state = {
			inputFile: false
		};

		handleInput = (type: string) => (value: any) => {
			this.props.dispatch({
				type: 'createCoupon/setCoupon',
				payload: {
					[type]: parseInt(value)
				}
			});
		};

		handleUpload = () => this.fileInput && this.fileInput.click();

		uploadImage = (e: any) => {
			upload(e.target.files[0].url);
		};

		render() {
			return (
				<div>
					<InputItem placeholder="请输入券的名称">优惠券名称</InputItem>
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
						onChange={this.handleInput('total_num')}
					>
						发放数量
					</InputItem>
					<InputItem
						type="money"
						extra="元"
						value={String(this.props.pay_money || '')}
						onChange={this.handleInput('pay_money')}
					>
						购买价格
					</InputItem>
					<InputItem
						extra="天可用"
						type="money"
						value={String(this.props.validity || '')}
						onChange={this.handleInput('validity')}
					>
						优惠券有效期
					</InputItem>
					<List.Item arrow="horizontal">使用须知</List.Item>
					<List.Item arrow="horizontal">
						<Flex>
							<span className={styles.coverTitle}>封面图片</span>{' '}
							<div className={styles.addImg} onClick={this.handleUpload} />
						</Flex>
					</List.Item>
					<input
						ref={then => (this.fileInput = then)}
						type="file"
						className={styles.upload}
						onChange={this.uploadImage}
					/>
				</div>
			);
		}
	}
);
