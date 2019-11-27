/**
 * title: 我的订单
 */

import React, { Component } from 'react';
import styles from './index.less';
import { WingBlank, Flex, Toast, Tabs } from 'antd-mobile';
import FiltrateLayout from '../../components/selectLayout';
import request from '@/services/request';
import moment from 'moment';
import router from 'umi/router';
import NoData from '@/components/no-data';

const tabs = [
  { title: '已核销', id: 2 },
  { title: '未核销', id: 1 },
  { title: '已退款', id: 3 },
];
export default class OrderPage extends Component {
  state = {
    list: [],
    total: 0,

    page: 1,
    hasMore: true,

    pay_status: '2',   // 模糊查询筛选
    begin: undefined,           // 模糊查询月份
    end: undefined,
    amount: '',
    youhui_type: undefined
  };


  undetermined = {
    title: '订单类型',
    list: [
      { id: 1, label: '现金券' },
      { id: 0, label: '兑换券' },
    ]
  };
  componentDidMount() {
    this.getData();
  }

  getData = async (query?: any) => {
    Toast.loading('');
    let querys = {}
    if (!query) {
      let begin = moment().add('month', 0).format('YYYY-MM') + '-01'
      let end = moment(begin).add('month', 1).add('days', -1).format('YYYY-MM-DD')
      querys = {
        begin: moment(begin).unix(),
        end: moment(end).unix()
      }
    } else {
      querys = query
    }
    const res = await request({
      url: 'v3/coupons/order_list', params: {
        pay_status: this.state.pay_status,
        ...querys,
        page: this.state.page,
      }
    });
    Toast.hide();
    if (res.code === 200 && res.data.length != 0) {
      this.setState({ list: this.state.list.concat(res.data), total: res.total, amount: res.amount });
    } else if (res.code === 200 && res.data.length == 0) {
      this.setState({ hasMore: false,total: res.total, amount: res.amount })
    }
  };

  handleLayoutChange = (query: any) => {
    let start = moment().add('month', 0).format('YYYY-MM') + '-01'
    let end = moment(start).add('month', 1).add('days', -1).format('YYYY-MM-DD')
    this.setState({
      page: 1,
      hasMore: true,
      list: [],
      pay_status: query.tab_index || undefined,
      youhui_type: query.hot.id,
      begin: query.time ? moment(query.time).unix() : moment(start).unix() ,
      end: query.time ? moment(query.end_time).unix() : moment(end).unix(),
    }, () => {
      this.getData({
        pay_status: query.tab_index || 1,
        youhui_type: query.hot.id,
        begin: query.time ? moment(query.time).unix() : undefined,
        end: query.time ? moment(query.end_time).unix() : undefined,
      });
    })

  };

  handleClickOrder = (id: any) => () => {
    router.push({ pathname: '/order/detail', query: { id } });
  };


  handleLoadMore = () => {
    if (this.state.hasMore) {
      console.log(this.state)
      this.setState({
        page: this.state.page + 1
      }, () => {
        this.getData({
          pay_status: this.state.pay_status,
          begin: this.state.begin,
          end: this.state.end,
          page: this.state.page,
          youhui_type: this.state.youhui_type
        })
      })
    }

  }



  render() {
    const orderList = this.state.list.length ? (
      this.state.list.map((_: any, index) => (
        <Flex className={styles.orderItem} key={index} onClick={this.handleClickOrder(_.id)}>
          <img src={require('@/assets/index/in_store_return.png')} />
          <Flex className="content">
            <div className='content_main'>
              <div className="ordernum">{_.youhui_sn}</div>
              <div className="time">{_.create_time}</div>
            </div>
            <div className='content_right'>
              <div className="money">{_.money}</div>
      <div className="name">{_.youhui_type == 1 ? '现金券' : '兑换券'}</div>
            </div>
            <div className='right_back'>
              <img src={require('@/assets/right_back.png')} />
            </div>
          </Flex>
        </Flex>
      ))
    ) : (
        <NoData type="order"/>
      );
    const list = [{ name: '交易笔数', num: this.state.total }, { name: '交易金额', num: this.state.amount }]
    return (
      <FiltrateLayout
        undetermined={this.undetermined}
        hasInsignificant={true}
        insignificant={list}
        onChange={this.handleLayoutChange}
        tab={tabs}
      >
        {orderList}

        <p style={{ textAlign: "center" }} onClick={this.handleLoadMore.bind(this)}>{this.state.hasMore ? "点击加载更多" : "已经到达底线了"}</p>
      </FiltrateLayout>

    );
  }
}
