/**title: 订单详情 */

import React, { Component } from 'react';
import { WingBlank, Flex, Toast, Icon } from 'antd-mobile';
import styles from './index.less';
import request from '@/services/request';

interface State {
  data: any;
  is_show: boolean
}
export default class OrderDetail extends Component<any, State> {
	state: State = { data: {}, is_show: false };
	componentDidMount = () => this.getData();
	getData = async () => {
		Toast.loading('');
		const res = await request({ url: 'v3/coupons/order_info/' + this.props.location.query.id });
		Toast.hide();
		if (res.code === 200) {
      this.setState({ data: res.data });
      console.log(res.data)
		}
  };

  // 查看更多
  moreData = () => {
    this.setState({is_show : !this.state.is_show})
  }


  // 订单状态
  orderStatus = (status: any) => {
    switch (status){
      case 1:
        return '已支付'
        break
      case 2:
        return '已使用'
        break
      case 3:
        return '已退款'
        break
      case 4:
        return '已过期'
        break
      default:
        return ''
    }
  }

	render() {
		const data = this.state.data;
		return (
			<div className={styles.page} style={{height:"auto",minHeight:"100%",paddingBottom:"20px"}}>
				<WingBlank>
					<div className="price">+{data.pay_money}</div>
					<div className="trade">交易成功</div>
					<div className="content">
						<div className="box">
            <div className="title">订单购买详情</div>
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
								<Flex.Item>￥{data.pay_money}</Flex.Item>
							</Flex>
              <Flex>
								<div className="label">订单状态</div>
                <Flex.Item style={{color: '#FF3622'}}>{this.orderStatus(data.status)}</Flex.Item>
							</Flex>
							<Flex>
								<div className="label">商品名称</div>
                <Flex.Item>{data.name}</Flex.Item>
							</Flex>
							<Flex>
								<div className="label">商品类型</div>
								<Flex.Item>{data.youhui_type === 0 ? '兑换' : '优惠'}券</Flex.Item>
							</Flex>
              <Flex>
								<div className="label">商品来源</div>
								<Flex.Item></Flex.Item>
							</Flex>
              <Flex justify='end' onClick={this.moreData}>
                <div className='order_btn'>查看该订单使用情况</div>
                <div className='order_btn_icon'><Icon type={this.state.is_show ? 'up' : 'down'}/></div>
              </Flex>
						</div>
						{
              this.state.is_show ? (
                <div className="box">
            <div className="title">订单交易详情</div>
							<Flex>
								<div className="label">用户信息</div>
								<Flex.Item>{data.user_name}</Flex.Item>
							</Flex>
              <Flex>
								<div className="label">商品名称</div>
                <Flex.Item>{data.name}</Flex.Item>
							</Flex>
							<Flex>
								<div className="label">核销状态</div>
              <Flex.Item>{data.use_status}</Flex.Item>
							</Flex>
							<Flex>
								<div className="label">核销时间</div>
              <Flex.Item>{data.refund_time}</Flex.Item>
							</Flex>
              <Flex>
								<div className="label">交易单号</div>
              <Flex.Item style={{color: '#486DDA'}}>{data.channel_order_sn}</Flex.Item>
							</Flex>
              {/* <Flex>
								<div className="label">交易金额</div>
								<Flex.Item></Flex.Item>
							</Flex>
              <Flex>
								<div className="label">优惠金额</div>
								<Flex.Item></Flex.Item>
							</Flex>
              <Flex>
								<div className="label">实际付款</div>
								<Flex.Item></Flex.Item>
							</Flex> */}
						</div>
              ) : null
            }
					</div>
				</WingBlank>
			</div>
		);
	}
}
