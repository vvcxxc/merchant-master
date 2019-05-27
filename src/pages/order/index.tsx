/**
 * title: 我的订单
 */

import React, { Component } from 'react';
import styles from './index.less';
import { WingBlank, Flex } from 'antd-mobile';
import FiltrateLayout from '../../components/layout';

export default class OrderPage extends Component {
  state = {
    list: [1, 2, 3, 4],
  };
  render() {
    const orderList = this.state.list.map(_ => (
      <Flex key={_} className={styles.orderItem}>
        <img src="" alt="" />
        <Flex.Item className="content">
          <div className="ordernum">AB12345678901234</div>
          <div className="time">2018-12-06 18:00</div>
        </Flex.Item>
        <div className="status">已支付</div>
      </Flex>
    ));
    return (
      <FiltrateLayout undetermined={[]} hasInsignificant={true}>
        {orderList}
      </FiltrateLayout>
    );
  }
}
