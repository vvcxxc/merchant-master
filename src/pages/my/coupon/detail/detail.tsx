import React, { Component } from 'react';
import styles from './index.less';
import request from '@/services/request';
import { Toast, Flex, WingBlank } from 'antd-mobile';
import MyCouponItem, { Item } from '../item';
import router from 'umi/router';
import OperationTip from '@/components/OperationTip';

interface Props {
	id: any;
}

export default class ContentDetail extends Component<Props, any> {
	state = {
		data: { description: [], publish_wait: 1 },
		modalType: ''
	};

	modal: any = {};

	// UNSAFE_componentWillReceiveProps(nextProps: { id: number }) {
	// 	if (nextProps.id !== 0) {
	// 		this.getData(nextProps.id);
	// 	}
	// }

	componentDidMount = () => this.getData(this.props.id);

	getData = async (id: number) => {
		Toast.loading('');
		const res = await request({ url: 'api/merchant/youhui/getYouhuiInfo', params: { coupons_id: id } });
		Toast.hide();
		if (res.code === 200) {
			this.setState({ data: res.data });
		} else {
			Toast.fail(res.message);
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
		const res = await request({
			url: 'v3/coupons/stop/' + this.props.id,
			data: { status: this.state.data.publish_wait === 1 ? 2 : 1 },
			method: 'put'
		});
		Toast.hide();
		if (res.code === 200) {
			Toast.success(this.state.data.publish_wait === 1 ? '暂停成功' : '发放成功');
			setTimeout(() => {
				this.getData(this.props.id);
			}, 1000);
		} else {
			Toast.fail(res.data);
		}
	};

	showModal = (type: string) => () => {
		if (this.state.data.publish_wait === 1) {
			this.setState({ modalType: type });
			this.modal.show &&
				this.modal.show({
					text: type === 'stop' ? '暂停投放优惠券 将会怎么样怎么样' : '删除优惠券 将会怎么样怎么样'
				});
		} else {
			this.handleStopCoupon();
		}
	};

	handleModalConfirm = (isConfirm: boolean) => {
		if (isConfirm) {
			return this.state.modalType === 'stop' ? this.handleStopCoupon() : this.handleDeleteCoupon();
		}
	};

	render() {
		const itemProps: Item = this.state.data;
		const rules = this.state.data.description.map((_: string) => <li key={_}>{_}</li>);
		const stopBtnStyle = { backgroundColor: this.state.data.publish_wait === 1 ? '#ff6654' : '' };
		return (
			<Flex direction="column" className={styles.detail}>
				<Flex.Item>
					<WingBlank>
						<MyCouponItem {...itemProps} onClick={this.handleClickItem} />
					</WingBlank>
					<div className="couponDetail">
						<Flex className="head">
							<img src={require('./icon.png')} alt="" />
							<Flex.Item>
								<div className="title">使用规则</div>
							</Flex.Item>
						</Flex>
						<ul className="ruleList">{rules}</ul>
					</div>
				</Flex.Item>
				<Flex className="footerBtns">
					<Flex.Item className="deleteBtn" onClick={this.showModal('delete')}>
						删除优惠券
					</Flex.Item>
					<Flex.Item className="stopBtn" onClick={this.showModal('stop')} style={stopBtnStyle}>
						{this.state.data.publish_wait === 1 ? '暂停' : ''}发放优惠券
					</Flex.Item>
				</Flex>

				<OperationTip
					onConfirm={this.handleModalConfirm}
					// tslint:disable-next-line: jsx-no-lambda
					getRef={(node: any) => (this.modal = node)}
				/>
			</Flex>
		);
	}
}
