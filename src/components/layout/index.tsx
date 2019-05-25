import React, { Component } from 'react';
import styles from './index.less';
import { WingBlank, Flex } from 'antd-mobile';

/**筛选列表页组件 */
export default class FiltrateLayout extends Component {
  render() {
    return (
      <Flex className={styles.wrap} direction="column">
        <div className={styles.filtrate}>
          <WingBlank>
            <Flex align="center">
              <span>筛选</span>
              <span>月份</span>
            </Flex>
          </WingBlank>
        </div>
        <div className={styles.num}>
          <WingBlank>9笔交易</WingBlank>
        </div>
        <Flex.Item className={styles.content}>
          <WingBlank>{this.props.children}</WingBlank>
        </Flex.Item>
      </Flex>
    );
  }
}
