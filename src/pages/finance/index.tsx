/**
 * title: 财务
 */

import React, { Component } from 'react';
import FiltrateLayout from '@/components/layout';
import { Flex } from 'antd-mobile';
import styles from './index.less';

export default class FinancePage extends Component {
  state = {
    list: [1, 2, 3, 4, 5, 6, 7],
  };
  render() {
    const financeList = this.state.list.map(_ => (
      <Flex key={_} className={styles.financeItem}>
        <img src="" alt="" />
        <Flex.Item className="content">
          <div className="ordernum">扫码支付</div>
          <div className="time">12-06 18:00</div>
        </Flex.Item>
        <div className="more">
          <div>-50.00</div>
          <span className="status">提现中</span>
        </div>
      </Flex>
    ));
    return <FiltrateLayout>{financeList}</FiltrateLayout>;
  }
}
