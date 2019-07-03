/**title: 财务统计 */
import React, { Component } from 'react';

import styles from './index.less';
import { WingBlank, Flex, DatePicker, Toast } from 'antd-mobile';
import moment from 'moment';
import Box from './box';
import request from '@/services/request';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PieChart from 'react-minimal-pie-chart';
import router from 'umi/router';

interface Data {
	business_sum: Business_sum;
	pay_channel: number[];
	business: Business;
	platform: Platform;
}
interface Business_sum {
	code_wx_and_zfb_order_count: number;
	code_wx_and_zfb_order_money: number;
	coupons_wx_and_zfb_order_sum_count: number;
	coupons_wx_and_zfb_order_count: number;
	coupons_wx_and_zfb_order_money: number;
}
interface Business {
	20190501: number;
	20190516: number;
	20190517: number;
}
interface Platform {
	fee_sum_money: number;
	coupons_sum_money: number;
	ad_sum_money: number;
}

export default class FinanceStatistis extends Component {
	state = {
		date: moment().format('YYYY/MM'),
		data: {
			business_sum: {},
			pay_channel: [],
			business: {},
			platform: {}
		}
	};
	handlePickerChange = (date: Date) => this.setState({ date: moment(date).format('YYYY/MM') }, this.getData);
	componentDidMount = () => this.getData();

	getPieChartLabel = ({ data, dataIndex }: any) => Math.round(data[dataIndex].percentage) + '%';

	getData = async () => {
		Toast.loading('');
		const res = await request({
			url: 'v3/finance/business_tncome',
			params: { date: moment(this.state.date, 'YYYY/MM').format('YYYYMMDD') }
		});
		Toast.hide();
		if (res.code === 200) {
			this.setState({ data: res.data });
		}
	};

	hanldeLookMore = (path: string) => () => router.push(path);
	render() {
		const data: any = this.state.data;
		const lineStyle = [
			buildStyles({
				pathColor: 'rgba(51,150,251,1)',
				trailColor: 'rgba(51,150,251,.2)'
			}),
			buildStyles({
				pathColor: 'rgba(246,95,75,1)',
				trailColor: 'rgba(246,95,75,.2)'
			}),
			buildStyles({
				pathColor: 'rgba(77,169,236,1)',
				trailColor: 'rgba(77,169,236,.2)'
			})
		];
		const defs = [
			{
				dataKey: 'time',
				range: [0, 1]
			},
			{
				dataKey: 'tem',
				tickCount: 5,
				min: 0
			}
		];
		return (
			<div className={styles.page}>
				<div className="bg" />
				<WingBlank className="content">
					<DatePicker
						mode="month"
						value={moment(this.state.date, 'YYYY/MM').toDate()}
						onChange={this.handlePickerChange}
					>
						<Flex className="time-select">
							{this.state.date}
							<img src={require('./down-icon.png')} />
						</Flex>
					</DatePicker>
					<Box title="营业收入走势图">
						<ResponsiveContainer width="100%" aspect={4.0 / 3.0}>
							<AreaChart margin={{ left: 20, top: 20, bottom: 80, right: 20 }} data={data.business}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="day" padding={{ left: 20, right: 10 }} label={{ position: 'bottom' }} />
								<YAxis label={{ color: '#ccc' }} />
								<Tooltip />
								<Area type="monotone" dataKey="value" stroke="#21418A" strokeWidth={6} fill="#Ff6654" />
							</AreaChart>
						</ResponsiveContainer>
					</Box>
					<Box title="营业收入" lookMore={true} onClickMore={this.hanldeLookMore('/my/benefit')}>
						<Flex className="incomeBox">
							<Flex.Item>
								<div className="small-title">线下收银</div>
								<div className="info">
									订单数：
									<span className="price">{data.business_sum.code_wx_and_zfb_order_count}</span>
								</div>
								<div className="info">
									金额：<span className="price">{data.business_sum.code_wx_and_zfb_order_money}</span>
								</div>
							</Flex.Item>
							<Flex.Item>
								<div className="small-title">平台交易</div>
								<div className="info">
									订单数：
									<span className="price">{data.business_sum.coupons_wx_and_zfb_order_count}</span>
								</div>
								<div className="info">
									金额：
									<span className="price">{data.business_sum.coupons_wx_and_zfb_order_money}</span>
								</div>
							</Flex.Item>
						</Flex>
					</Box>
					<Box title="支付渠道" lookMore={true} onClickMore={this.hanldeLookMore('/my/benefit')}>
						<Flex align="end" style={{ padding: 50 }}>
							<Flex.Item>
								<div className="pie-chart">
									<PieChart
										label={this.getPieChartLabel}
										data={data.pay_channel}
										labelStyle={{ fontSize: 10, fill: '#fff' }}
									/>
								</div>
							</Flex.Item>
							<Flex.Item>
								<Flex className="pie-tip">
									<div className="pie zfb" />
									支付宝支付
								</Flex>
								<Flex className="pie-tip">
									<div className="pie wx" />
									微信支付
								</Flex>
							</Flex.Item>
						</Flex>
					</Box>
					<Box title="平台收益" lookMore={true} onClickMore={this.hanldeLookMore('/my/platformBenefit')}>
						<Flex>
							<Flex.Item>
								<div className="progressbar">
									<CircularProgressbarWithChildren strokeWidth={6} styles={lineStyle[0]} value={80}>
										¥{data.platform.fee_sum_money}
									</CircularProgressbarWithChildren>
									<div className="barName">费率返点</div>
								</div>
							</Flex.Item>
							<Flex.Item>
								<div className="progressbar">
									<CircularProgressbarWithChildren strokeWidth={6} styles={lineStyle[1]} value={80}>
										¥{data.platform.coupons_sum_money}
									</CircularProgressbarWithChildren>
									<div className="barName">券收益</div>
								</div>
							</Flex.Item>
							<Flex.Item>
								<div className="progressbar">
									<CircularProgressbarWithChildren strokeWidth={6} styles={lineStyle[2]} value={80}>
										¥ {data.platform.ad_sum_money}
									</CircularProgressbarWithChildren>
									<div className="barName">广告收益</div>
								</div>
							</Flex.Item>
						</Flex>
					</Box>
				</WingBlank>
			</div>
		);
	}
}
