import React, { Component } from 'react';
import { WingBlank } from 'antd-mobile';
import styles from './index.less';
import MyCouponList from './list';

export default class MyCoupon extends Component {
  render() {
    return (
      <div className={styles.page}>
        <WingBlank>
          <MyCouponList />
        </WingBlank>
      </div>
    );
  }
}
