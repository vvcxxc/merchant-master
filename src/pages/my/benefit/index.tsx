/**title: 我的收益 */
import React, { Component } from 'react';
import styles from './index.less';
import FiltrateLayout from '@/components/layout';
import BenefitItem, { Item } from './item';
import request from '@/services/request';
import { Toast, Flex } from 'antd-mobile';

export default class Benefit extends Component {
	/** 支付类型 1 微信 2 支付宝 */
	undetermined = [
		{
			id: 0,
			label: '所有类型'
		},
		{
			id: 1,
			label: '微信'
		},
		{ id: 2, label: '支付宝' }
	];
	state = {
		data: [],
		type: 'today',
		payType: undefined,
		date: undefined,
		showNoData: false,
		sum: 0,
		platform: 0,
		count: 0
	};
	componentDidMount = () => this.getData();
	getData = async () => {
		Toast.loading('');
		const res = await request({
			url: 'v3/finance/offline_order',
			params: {
				type: this.state.type,
				pay_type: this.state.payType,
				date: this.state.date
			}
		});
		Toast.hide();
		if (res.code === 200) {
			this.setState({ data: res.data, sum: res.sum, platform: res.platform, count: res.count });
			if (!res.data.length) {
				this.setState({ showNoData: true });
			}
		}
	};
	render() {
		const list = this.state.data.map((_: Item) => <BenefitItem key={_.id} {..._} />);
		const noData = (
			<Flex className="noData" justify="center" direction="column">
				<img src={require('./icon.png')} alt="" />
				<span>暂无交易信息</span>
			</Flex>
		);
		const insignificant = (
			<Flex>
				<Flex.Item>{this.state.count}笔交易</Flex.Item>
				总计￥{this.state.sum}（{this.state.platform}元平台暂管）
			</Flex>
		);
		return (
			<div className={styles.page}>
				<FiltrateLayout undetermined={this.undetermined} insignificant={insignificant} hasInsignificant={true}>
					{this.state.showNoData ? noData : list}
				</FiltrateLayout>
			</div>
		);
	}
}
