/**
 * title: 支付邮费
 */

import React, { Component } from 'react';
import { Flex, WingBlank, Button, Toast } from 'antd-mobile';
import styles from './index.less';


export default class PayMent extends Component {
  state = {

  };

  render (){
    return (
      <div style={{width: '100%', height: '100%', background: '#fff', position: 'absolute', top: '0'}}>
        <Flex className={styles.title}>付款金额</Flex>
        <Flex className={styles.money}>￥1000</Flex>
        <WingBlank style={{marginTop: 84}}>
          <Flex className={styles.list}>
            <div>邮费</div>
            <div style={{fontSize: '23px', color: '#999999'}}>10元</div>
          </Flex>
          <Flex className={styles.list}>
            <div>数量</div>
            <div style={{fontSize: '23px', color: '#999999'}}>1000张</div>
          </Flex>
          <Flex className={styles.pay_type}>
            支付方式
          </Flex>
          <Flex className={styles.wechat_type}>
            <div>
              <img src={require('./wechat.png')}/>
              <span>微信支付</span>
            </div>
            <div>
              <img src={require('./choose.png')}/>
            </div>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}
