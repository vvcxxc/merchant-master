import React, { Component } from 'react';
import styles from './index.less';
import FiltrateLayout from '@/components/layout';
import request from '@/services/request';
import { Toast, Flex, WingBlank } from 'antd-mobile';

interface RateItem {
	order_sn: string;
	date: string;
	money: number;
}

interface CouponItem {
	coupons_name: string;
	store_name: string;
	date: string;
	money: number;
	order_no: number;
}

interface AdItem {
	ad_name: string;
	store_name: string;
	date: string;
	ad_msg: string;
	money: number;
}

export default class PlatformBenefit extends Component {
	state = {
		data: [],
		type: 0,
		total: 0,
		invoice: 0
	};
	componentDidMount = () => this.getData();
	handleTabChange = (index: number) => this.setState({ type: index, data: [] }, this.getData);
	getData = async () => {
		let url = '';
		if (this.state.type === 0) {
			url = 'v3/finance/rate_earnings';
		} else if (this.state.type === 1) {
			url = 'v3/finance/coupons_earnings';
		} else {
			url = 'v3/finance/ad_earnings';
		}
		Toast.loading('');
		const res = await request({ url });
		Toast.hide();
		if (res.code === 200) {
			this.setState({
				data: res.data,
				total: res.rate_sum || res.coupons_sum || res.ad_sum,
				invoice: res.invoice
			});
		}
	};
	render() {
		let list;
		if (this.state.type === 0) {
			list = this.state.data.map((_: RateItem) => (
				<Flex direction="column" className={styles.item}>
					<Flex>
						<Flex.Item>{_.order_sn}</Flex.Item>
						<div className="price">{_.money}</div>
					</Flex>
					<Flex className="info">{_.date}</Flex>
				</Flex>
			));
		} else if (this.state.type === 1) {
			list = this.state.data.map((_: CouponItem) => (
				<Flex direction="column" className={styles.item}>
					<Flex>
						<Flex.Item>{_.coupons_name}</Flex.Item>
						<div className="price">{_.money}</div>
					</Flex>
					<Flex className="info">{_.store_name}</Flex>
					<Flex className="info">
						单号：<Flex.Item>{_.order_no}</Flex.Item>
						{_.date}
					</Flex>
				</Flex>
			));
		} else if (this.state.type === 2) {
			list = this.state.data.map((_: AdItem) => (
				<Flex direction="column" className={styles.item}>
					<Flex>
						<Flex.Item>{_.ad_name}</Flex.Item>
						<div className="price">{_.money}</div>
					</Flex>
					<Flex className="info">{_.store_name}</Flex>
					<Flex className="info">
						<Flex.Item>{_.ad_msg}</Flex.Item>
						{_.date}
					</Flex>
				</Flex>
			));
		}
		const insignificant = (
			<Flex>
				总计￥{this.state.total} {this.state.type === 0 && `，已结算￥${this.state.invoice || 0}`}
			</Flex>
		);
		return (
			<FiltrateLayout
				undetermined={[]}
				tabs={['费率', '券', '广告']}
				onTabChange={this.handleTabChange}
				hasInsignificant={true}
				insignificant={insignificant}
			>
				<WingBlank>{list}</WingBlank>
			</FiltrateLayout>
		);
	}
}
