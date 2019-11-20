/**title: 交易详情 */

import React, { Component } from 'react';
import { WingBlank, Flex, Toast, Icon } from 'antd-mobile';
import styles from './index.less';
import request from '@/services/request';


export default class OrderDetail extends Component {
	state = {
		data: {},
		showContent: false
	};
	componentDidMount = () => {
		console.log( this.props.location.query)
		this.getData();}
	getData = async () => {
		Toast.loading('');
		const res = await request({ url: 'v3/coupons/order_info/' + this.props.location.query.id });
		Toast.hide();
		if (res.code === 200) {
			this.setState({ data: res.data });
		}
	};
	showContent = () => { this.setState({ showContent: !this.state.showContent }) }
	render() {
		const data = this.state.data;
		return (
			<div className={styles.page} style={{ height: "auto", minHeight: "100%", paddingBottom: "20px" }}>
				<WingBlank>
					<div className="price">+10056</div>
					<div className="trade">交易成功</div>
					<div className="content">
						<div className="box">
							<Flex>
								<div className="label-title">订单购买详情</div>
							</Flex>
							<Flex>
								<div className="label">订单编号</div>
								<Flex.Item>kid55112223855454</Flex.Item>
							</Flex>
							<Flex>
								<div className="label">订单时间</div>
								<Flex.Item>201944787888</Flex.Item>
							</Flex>
							<Flex>
								<div className="label">订单金额</div>
								<Flex.Item>￥50</Flex.Item>
							</Flex>
							<Flex>
								<div className="label">订单状态</div>
								<Flex.Item style={{ color: '#ff3622' }}>已完成</Flex.Item>
							</Flex>
							<Flex>
								<div className="label">商品名称</div>
								<Flex.Item>艾玛电动车</Flex.Item>
							</Flex>
							<Flex>
								<div className="label">商品类型</div>
								<Flex.Item>现金券</Flex.Item>
							</Flex>
							<Flex>
								<div className="label">商品来源</div>
								<Flex.Item>支付返券</Flex.Item>
							</Flex>
						</div>
						<div className="showContentBtn-box" onClick={this.showContent}>
							<div className="showContentBtn">查看该订单使用状态</div>
							{
								this.state.showContent ? <Icon type="up" color="#bcbcbc" /> : <Icon type="down" color="#bcbcbc" />

							}

						</div>

						{
							this.state.showContent ? <div className="box">
								<Flex>
									<div className="label-title">订单交易详情</div>
								</Flex>
								<Flex>
									<div className="label">用户信息</div>
									<Flex.Item>kksk</Flex.Item>
								</Flex>
								<Flex>
									<div className="label">商品名称</div>
									<Flex.Item>艾玛电动车</Flex.Item>
								</Flex>
								<Flex>
									<div className="label">核销状态</div>
									<Flex.Item>已使用</Flex.Item>
								</Flex>
								<Flex>
									<div className="label">核销时间</div>
									<Flex.Item>2019/08/17</Flex.Item>
								</Flex>
								<div className='order-content'>
									<div className="label">交易单号</div>
									<div className="order_sn-box" style={{ color: '#486dda' }}>
										<div>5466224548878</div>
										<Icon type="right" color="#bcbcbc" />
									</div>
								</div>
								<Flex>
									<div className="label">交易金额</div>
									<Flex.Item>50</Flex.Item>
								</Flex>
								<Flex>
									<div className="label">优惠金额</div>
									<Flex.Item>10</Flex.Item>
								</Flex>
								<Flex>
									<div className="label">实际付款</div>
									<Flex.Item>40</Flex.Item>
								</Flex>
							</div> : null
						}
					</div>
				</WingBlank>
			</div>
		);
	}
}
