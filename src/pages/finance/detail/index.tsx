/**title: 订单详情 */

import React, { Component } from 'react';
import { WingBlank, Flex, Toast } from 'antd-mobile';
import styles from './index.less';
import request from '@/services/request';

interface State {
	data: any;
}
export default class OrderDetail extends Component<any, State> {
	state: State = { data: {} };
	componentDidMount = () => this.getData();
	getData = async () => {
		Toast.loading('');
		const res = await request({ url: 'v3/coupons/order_info/' + this.props.location.query.id });
		Toast.hide();
		if (res.code === 200) {
			this.setState({ data: res.data });
		}
	};
	render() {
		const data = this.state.data;
		return (
			<div className={styles.page} style={{height:"auto",minHeight:"100%",paddingBottom:"20px"}}>
				<WingBlank>
					<div className="price">+{data.return_money}</div>
					<div className="trade">交易成功</div>
					<div className="content">
						<div className="box">
							<Flex>
								<div className="label">订单编号</div>
								<Flex.Item>{data.youhui_sn}</Flex.Item>
							</Flex>
              <Flex>
								<div className="label">订单时间</div>
								<Flex.Item>{data.create_time}</Flex.Item>
							</Flex>
							<Flex>
								<div className="label">订单金额</div>
								<Flex.Item>￥{data.return_money}</Flex.Item>
							</Flex>

							<Flex>
								<div className="label">商户订单</div>
								<Flex.Item>{data.channel_order_sn}</Flex.Item>
							</Flex>
							<Flex>
								<div className="label">优惠券</div>
								<Flex.Item>{data.youhui_type === 0 ? '兑换' : '优惠'}券</Flex.Item>
							</Flex>
						</div>
						<div className="box">
							<Flex>
								<div className="label">支付用户</div>
								<Flex.Item>{data.user_name}</Flex.Item>
							</Flex>
							<Flex>
								<div className="label">使用状态</div>
								<Flex.Item>{data.status}</Flex.Item>
							</Flex>
							<Flex>
								<div className="label">使用时间</div>
								<Flex.Item>{data.refund_time}</Flex.Item>
							</Flex>
							<Flex>
								<div className="label">实收金额</div>
								<Flex.Item>{data.pay_money}元</Flex.Item>
							</Flex>
						</div>
					</div>
				</WingBlank>
			</div>
		);
	}
}
