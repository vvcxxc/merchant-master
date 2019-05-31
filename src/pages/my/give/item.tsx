import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import styles from './index.less';

export default class MyGiveItem extends Component {
  render() {
    return (
      <Flex className={styles.item}>
        <Flex.Item>
          <div>谁给他的礼品币</div>
          <span>2018.12.20 18:00</span>
        </Flex.Item>
        <div className="after">
          <div>+1000</div>
          <span>可用</span>
        </div>
      </Flex>
    );
  }
}
