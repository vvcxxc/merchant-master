/**
 * title: 我的订单
 */

import React, { Component } from 'react';
import styles from './index.less';
import { WingBlank, Flex, Toast } from 'antd-mobile';
import FiltrateLayout from '../../components/selectLayout';
import request from '@/services/request';
import moment from 'moment';
import router from 'umi/router';
import NoData from '@/components/no-data';

export default class OrderPage extends Component {
  state = {
    list: [],
    insignificant: 0,

    page: 1,
    hasMore: true,

    pay_status: '',   // 模糊查询筛选
    date: undefined           // 模糊查询月份
  };


  undetermined = {
    title: '订单类型',
    list: [
      { id: 1, label: '现金券' },
      { id: 2, label: '兑换券' },
      { id: 3, label: '拼图券' },
      { id: 4, label: '增值券' }
    ]
  };
  componentDidMount() {
    this.getData();
  }

  getData = async (query?: any) => {
    Toast.loading('');
    const res = await request({
      url: 'v3/coupons/order_list', params: {
        ...query,
        page: this.state.page
      }
    });
    Toast.hide();
    if (res.code === 200 && res.data.length != 0) {
      this.setState({ list: this.state.list.concat(res.data), insignificant: res.total });
    } else if (res.code === 200 && res.data.length == 0) {
      this.setState({ hasMore: false })
    }
  };

  handleLayoutChange = (query: any) => {
    this.setState({
      page: 1,
      hasMore: true,
      list: [],
      pay_status: query.hot.id || undefined,
      type: query.hot._id,
      date: query.time ? moment(query.time).unix() : undefined
    }, () => {
      this.getData({
        pay_status: query.hot.id || 0,
        type: query.hot._id || undefined,
        date: query.time ? moment(query.time).unix() : undefined
      });
    })

  };

  handleClickOrder = (id: any) => () => {
    router.push({ pathname: '/order/detail', query: { id } });
  };


  handleLoadMore = () => {
    if (this.state.hasMore) {
      this.setState({
        page: this.state.page + 1
      }, () => {
        this.getData({
          pay_status: this.state.pay_status || undefined,
          date: this.state.date
        })
      })
    }

  }

  render() {
    const orderList = this.state.list.length ? (
      this.state.list.map((_: any) => (
        <Flex key={_.id} className={styles.orderItem} onClick={this.handleClickOrder(_.id)}>
          <img src={_.small_icon} />
          <Flex.Item className="content">
            <div className="ordernum">{_.youhui_sn}</div>
            <div className="time">{_.create_time}</div>
          </Flex.Item>
          <div className="status">{_.status_msg}</div>
        </Flex>
      ))
    ) : (
        <NoData type="order" />
      );
    const list = [{ name: '交易笔数', num: '10086' }, { name: '交易金额', num: '156.00' }]
    return (
      <FiltrateLayout
        undetermined={this.undetermined}
        hasInsignificant={true}
        insignificant={list}
        onChange={this.handleLayoutChange}
      >
        {orderList}
        <p style={{ textAlign: "center" }} onClick={this.handleLoadMore.bind(this)}>{this.state.hasMore ? "点击加载更多" : "已经到达底线了"}</p>
      </FiltrateLayout>

    );
  }
}
