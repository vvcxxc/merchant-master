/**
 * title: 支付邮费
 */

import React, { Component } from 'react';
import { Flex, WingBlank, Button} from 'antd-mobile';
import styles from './index.less';

interface Props {
  list: any
}

export default class PayMent extends Component<Props> {
  state = {
    list: {}
  };
  componentDidMount (){
    this.setState({
      list: this.props.list
    })
  }

  render (){
    return (
      <div style={{width: '100%', height: '100%', background: '#fff', position: 'absolute', top: '0'}}>
        <Flex className={styles.title}>付款金额</Flex>
        <Flex className={styles.money}>￥{this.state.list.payMoney}</Flex>
        <WingBlank style={{marginTop: 84}}>
          <Flex className={styles.list}>
            <div>邮费</div>
            <div style={{fontSize: '23px', color: '#999999'}}>{this.state.list.money}元</div>
          </Flex>
          <Flex className={styles.list}>
            <div>数量</div>
            <div style={{fontSize: '23px', color: '#999999'}}>{this.state.list.number}张</div>
          </Flex>
          <Flex className={styles.pay_type}>
            支付方式
          </Flex>
          <Flex className={styles.wechat_type}>
            <Flex>
              <img src={require('./wechat.png')}/>
              <span>微信支付</span>
            </Flex>
            <Flex>
              <img src={require('./choose.png')}/>
            </Flex>
          </Flex>
          <Button type="primary" style={{ marginTop: 187 }}>
            提交订单
          </Button>
        </WingBlank>
      </div>
    )
  }
}
