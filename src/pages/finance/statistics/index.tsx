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
import ReactMinimalPieChart from 'react-minimal-pie-chart';
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
    return (
      <div className={styles.page}>
        {/* <div className="bg" /> */}
        <Flex className='time_box'>
          <div>我的经营报告</div>
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
        </Flex>
        <WingBlank className="content">

          <Box title="交易趋势">
            <ResponsiveContainer width="100%" aspect={4.0 / 3.0}>
              <AreaChart margin={{ left: 30, top: 20, bottom: 10, right: 20 }} data={data.business}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" padding={{ left: 20, right: 10 }} label={{ position: 'bottom' }} />
                <YAxis label={{ color: '#ccc' }} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#21418A" strokeWidth={6} fill="#486DDA" />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
          <Box title="店铺数据" lookMore={true} onClickMore={this.hanldeLookMore('/my/benefit')}>
            <Flex className="incomeBox" justify='between'>
              <div className='info-box'>
                <div className="small-title">线下收银</div>
                <Flex className="info">
                  <div className='info-title'>交易笔数</div>
									<span className="price">{data.business_sum.code_wx_and_zfb_order_count}</span>
                </Flex>
                <Flex className="info">
                  <div className='info-title'>交易金额</div>
                  <span className="price">{data.business_sum.code_wx_and_zfb_order_money}</span>
                </Flex>
              </div>
              <div className='info-box'>
                <div className="small-title">平台交易</div>
                <Flex className="info">
                <div className='info-title'>交易笔数</div>
									<span className="price">{data.business_sum.coupons_wx_and_zfb_order_count}</span>
                </Flex>
                <Flex className="info">
                  <div className='info-title'>交易金额</div>
									<span className="price">{data.business_sum.coupons_wx_and_zfb_order_money}</span>
                </Flex>
              </div>
            </Flex>
          </Box>

          <Box title="活动营收" lookMore={true} onClickMore={this.hanldeLookMore('/my/benefit')}>
            <Flex className="incomeBox" justify='between'>
              <div className='info-box'>
                <div className="small-title">增值活动</div>
                <Flex className="info">
                  <div className='info-title'>订单金额</div>
									<span className="price">{data.business_sum.code_wx_and_zfb_order_count}</span>
                </Flex>
                <Flex className="info">
                  <div className='info-title'>订单数量</div>
                  <span className="price">{data.business_sum.code_wx_and_zfb_order_money}</span>
                </Flex>
                <Flex className="info">
                  <div className='info-title'>参与人数</div>
									<span className="price">{data.business_sum.coupons_wx_and_zfb_order_money}</span>
                </Flex>
                <Flex className="info">
                  <div className='info-title'>未核销收入</div>
									<span className="price">{data.business_sum.coupons_wx_and_zfb_order_money}</span>
                </Flex>
                <Flex className="info">
                  <div className='info-title'>已核销收入</div>
									<span className="price">{data.business_sum.coupons_wx_and_zfb_order_money}</span>
                </Flex>
              </div>
              <div className='info-box'>
                <div className="small-title">拼团活动</div>
                <Flex className="info">
                  <div className='info-title'>订单金额</div>
									<span className="price">{data.business_sum.code_wx_and_zfb_order_count}</span>
                </Flex>
                <Flex className="info">
                <div className='info-title'>订单数量</div>
                <span className="price">{data.business_sum.code_wx_and_zfb_order_money}</span>
                </Flex>
                <Flex className="info">
                  <div className='info-title'>参与人数</div>
									<span className="price">{data.business_sum.coupons_wx_and_zfb_order_money}</span>
                </Flex>
                <Flex className="info">
                  <div className='info-title'>未核销收入</div>
									<span className="price">{data.business_sum.coupons_wx_and_zfb_order_money}</span>
                </Flex>
                <Flex className="info">
                  <div className='info-title'>已核销收入</div>
									<span className="price">{data.business_sum.coupons_wx_and_zfb_order_money}</span>
                </Flex>
              </div>
            </Flex>
          </Box>

          <Box title="支付渠道" lookMore={true} onClickMore={this.hanldeLookMore('/my/channel')}>
            <Flex align="center" className='pie_box'>
              <Flex.Item>
                <div className="pie-chart">
                  <ReactMinimalPieChart
                    data={data.pay_channel}
                    lineWidth={30}
                  />
                </div>
              </Flex.Item>
              <Flex.Item>
                <Flex className="pie-tip">
                  <div className="pie zfb" />
                  支付宝渠道
								</Flex>
                <Flex className="pie-tip">
                  <div className="pie wx" />
                  微信渠道
								</Flex>
              </Flex.Item>
            </Flex>
          </Box>

        </WingBlank>
      </div>
    );
  }
}
