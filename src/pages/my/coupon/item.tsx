import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import styles from './index.less';

export default class MyCouponItem extends Component {
  render() {
    return (
      <Flex
        className={styles.coupon}
        style={{ backgroundImage: `url(${require('./active-bg.png')})` }}
      >
        <Flex className="price-wrap" direction="column">
          <div className="price">
            ￥<span>50</span>
          </div>
          <span className="info">满多少可用</span>
        </Flex>
        <Flex.Item>
          <Flex className="title">
            <div className="label">现金券</div>
            罗西点
          </Flex>
          <div className="right-info info">发券日七天七</div>
          <Flex className={styles.progress}>
            <Flex.Item className="bar">
              <div className="line" style={{ width: `${66}%` }} />
            </Flex.Item>
            <div className="number">66/100</div>
          </Flex>
        </Flex.Item>
      </Flex>
    );
  }
}
