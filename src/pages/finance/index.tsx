/**
 * title: 交易明细
 */

import React, { Component } from 'react';
import styles from './index.less';
import { WingBlank, Flex, Toast, Tabs,Icon } from 'antd-mobile';
import FiltrateLayout from '../../components/selectLayout';
import request from '@/services/request';
import moment from 'moment';
import router from 'umi/router';
import NoData from '@/components/no-data';
import { Item } from 'rc-menu';


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
    title: '交易类型',
    list: [
      { id: 1, label: '二维码收款' }
    ]
  };
  undetermined2 = {
    title: '支付类型',
    list: [
      { _id: 1, label: '微信' },
      { _id: 2, label: '支付宝' }
    ]
  };
  componentDidMount() {
    this.getData();
  }

  getData = async (query?: any) => {
    Toast.loading('');
    const res = await request({
      url: 'v3/finance/merchant_bill', params: {
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
    // router.push({ pathname: '/order/detail', query: { id } });
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
        <Flex className={styles.financeItem}>
          <img src={''} />
          <Flex.Item className="content">
            <div className="financenum">{_.order_sn}</div>
      <div className="financetime">{_.create_time}</div>
          </Flex.Item>
          <div className="content-right">
            <Flex.Item className="content">
              <div className="financemoney">{_.money}</div>
              <div className="financestatus">{_.msg}</div>
            </Flex.Item>
            <Icon type="right" color="#bcbcbc" />
          </div>
        </Flex>
      ))
    ) : (
        <NoData type="finance" />
      );
    const list = [{ name: '交易笔数', num: '10086' }, { name: '交易金额', num: '156.00' }]
    return (
      <FiltrateLayout
        undetermined={this.undetermined}
        undetermined2={this.undetermined2}
        hasInsignificant={true}
        insignificant={list}
        onChange={this.handleLayoutChange}
        tab={[]}
      >
        {orderList}

        <p style={{ textAlign: "center" }} onClick={this.handleLoadMore.bind(this)}>{this.state.hasMore ? "点击加载更多" : "已经到达底线了"}</p>
      </FiltrateLayout>

    );
  }
}
