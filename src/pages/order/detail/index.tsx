/**title: 订单详情 */

import React, { Component } from 'react';
import { WingBlank, Flex } from 'antd-mobile';
import styles from './index.less';

export default class OrderDetail extends Component {
  render() {
    return (
      <div className={styles.page}>
        <WingBlank>
          <div className="price">+499.99</div>
          <div className="trade">交易成功</div>
          <div className="content">
            <div className="box">
              <Flex>
                <div className="label">订单金额</div>
                <Flex.Item>519.99</Flex.Item>
              </Flex>
              <Flex>
                <div className="label">创建时间</div>
                <Flex.Item>2018-12-20 18:00</Flex.Item>
              </Flex>
              <Flex>
                <div className="label">订单编号</div>
                <Flex.Item>AB45213678914562</Flex.Item>
              </Flex>
              <Flex>
                <div className="label">商户订单</div>
                <Flex.Item>2018122034571234567894</Flex.Item>
              </Flex>
              <Flex>
                <div className="label">优惠券</div>
                <Flex.Item>兑换券</Flex.Item>
              </Flex>
            </div>
            <div className="box">
              <Flex>
                <div className="label">支付用户</div>
                <Flex.Item>用户名称</Flex.Item>
              </Flex>
              <Flex>
                <div className="label">使用状态</div>
                <Flex.Item>已使用</Flex.Item>
              </Flex>
              <Flex>
                <div className="label">使用时间</div>
                <Flex.Item>2019-05-09</Flex.Item>
              </Flex>
              <Flex>
                <div className="label">实收金额</div>
                <Flex.Item>100868元</Flex.Item>
              </Flex>
            </div>
          </div>
        </WingBlank>
      </div>
    );
  }
}
