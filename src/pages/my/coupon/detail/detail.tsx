import React, { Component } from 'react';
import styles from './index.less';
import request from '@/services/request';
import { Toast } from 'antd-mobile';
import MyCouponItem, { Item } from '../item';

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

	render() {
		const itemProps: Item = this.state.data;
		return (
			<div className={styles.detail}>
				<MyCouponItem {...itemProps} onClick={this.handleClickItem} />
			</div>
		);
	}
}
