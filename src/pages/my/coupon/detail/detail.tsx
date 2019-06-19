import React, { Component } from 'react';
import styles from './index.less';
import request from '@/services/request';
import { Toast, Flex } from 'antd-mobile';
import MyCouponItem, { Item } from '../item';
import router from 'umi/router';

interface Props {
	id: any;
}

export default class ContentDetail extends Component<Props> {
	state = {
		data: {}
	};

	UNSAFE_componentWillReceiveProps(nextProps: { id: number }) {
		if (nextProps.id !== 0) {
			this.getData(nextProps.id);
		}
	}

	getData = async (id: number) => {
		Toast.loading('');
		const res = await request({ url: 'api/merchant/youhui/getYouhuiInfo', params: { coupons_id: id } });
		Toast.hide();
		if (res.code === 200) {
			this.setState({ data: res.data });
		}
	};

	handleClickItem = () => {};

	handleDeleteCoupon = async () => {
		Toast.loading('');
		const res = await request({ url: 'v3/coupons/' + this.props.id, method: 'delete' });
		Toast.hide();
		if (res.code === 200) {
			Toast.success('删除成功');
			router.goBack();
		} else {
			Toast.fail(res.data);
		}
	};

	handleStopCoupon = async () => {
		Toast.loading('');
		const res = await request({ url: 'v3/coupons/stop/' + this.props.id, method: 'put' });
		Toast.hide();
		if (res.code === 200) {
			Toast.success('暂停成功');
			router.goBack();
		} else {
			Toast.fail(res.data);
		}
	};

	render() {
		const itemProps: Item = this.state.data;
		const rules = '';
		return (
			<Flex direction="column" className={styles.detail}>
				<Flex.Item>
					<MyCouponItem {...itemProps} onClick={this.handleClickItem} />
					<div className="couponDetail">
						<Flex className="head">
							<img src="" alt="" />
							<Flex.Item>
								<div className="title">使用规则</div>
							</Flex.Item>
						</Flex>
						<ul className="ruleList">{rules}</ul>
					</div>
				</Flex.Item>
				<Flex className="footerBtns">
					<Flex.Item className="deleteBtn" onClick={this.handleDeleteCoupon}>
						删除优惠券
					</Flex.Item>
					<Flex.Item className="stopBtn" onClick={this.handleStopCoupon}>
						暂停发放优惠券
					</Flex.Item>
				</Flex>
			</Flex>
		);
	}
}
