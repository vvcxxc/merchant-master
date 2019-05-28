import React, { Component } from 'react';
import TabPage from '@/components/tab-page';
import { WingBlank } from 'antd-mobile';
import Coupon from '../components/coupon';

export default class MoneyOff extends Component {
  handleChange = (id: any) => {};
  render() {
    const tabs = [
      { id: 0, label: '进行中' },
      { id: 1, label: '待生效' },
      { id: 2, label: '已结束' },
    ];
    return (
      <TabPage tabs={tabs} onChange={this.handleChange}>
        <WingBlank>
          <Coupon type={1} />
        </WingBlank>
      </TabPage>
    );
  }
}
