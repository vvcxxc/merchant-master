/**
 * title: 财务
 */

import React, { Component } from 'react';
import FiltrateLayout from '@/components/layout';
import { Flex } from 'antd-mobile';
import styles from './index.less';

export default class FinancePage extends Component {
  state = {
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  };
  render() {
    const undetermined = [
      { id: 3, label: '线下收银' },
      { id: 5, label: '余额提现' },
      { id: 6, label: '广告收益' },
      { id: 13, label: '费率返点' },
    ];
    const layoutAfter = {
      title: '金额',
      context: (
        <Flex className={styles.layoutAfter}>
          <Flex className="input-wrap">
            ￥<input placeholder="最低金额" type="text" />
          </Flex>
          <div className="line" />
          <Flex className="input-wrap">
            ￥<input placeholder="最高金额" type="text" />
          </Flex>
        </Flex>
      ),
    };
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
    return (
      <FiltrateLayout after={layoutAfter} undetermined={undetermined}>
        {financeList}
      </FiltrateLayout>
    );
  }
}
