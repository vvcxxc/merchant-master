import React from 'react';
import styles from './index.less';
import { Flex } from 'antd-mobile';

const types = ['返', '满'];

interface Props {
  type: number;
}

export default function Coupon({ type }: Props) {
  return (
    <div className={styles.coupon}>
      <Flex className="content">
        <div className="headimg">{types[type]}</div>
        <Flex.Item className="info">
          <Flex className="title">
            支付返券
            <Flex.Item className="status">即将结束</Flex.Item>
          </Flex>
          <div className="labels">
            <div className="label">满30返2</div>
          </div>
        </Flex.Item>
      </Flex>
      <Flex className="bottom" justify="end">
        <Flex className="btn" justify="center">
          <img src={require('./icon.png')} />
          分享
        </Flex>
      </Flex>
    </div>
  );
}
