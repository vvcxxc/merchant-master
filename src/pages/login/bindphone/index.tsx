/**
 * title：绑定手机
 */

import React, { Component } from 'react';
import { Flex, WhiteSpace, WingBlank, Button, List, InputItem } from 'antd-mobile';
import styles from './index.less';
import Input from 'antd-mobile/lib/input-item/Input';

export default class ForgetPassword extends Component {
  state = {
    is_ok: true
  };
  render() {
    const button =
      this.state.is_ok === true ? (
        <div className={styles.sendCode} onClick={this.getCode}>发送验证码</div>
      ) : (
        <div className={styles.doneSend} onClick={this.getCode}>{this.state.wait}秒</div>
      );
    return (
      <div style={{ height: '100%', width: '100%', background:' #fff' }}>
      <WingBlank className={styles.wrap}>
        <Flex className={styles.inputWrap}>
          <Input style={{ width: '100%' }} placeholder="请输入账号名" type='number' />
        </Flex>
        <Flex className={styles.inputWrap}>
          <Input style={{ width: '100%' }} placeholder="请输入手机号" />
        </Flex>
        <Flex className={styles.inputWrap}>
          <Input style={{ width: '100%' }} placeholder="请输入不少于6位的密码" />
        </Flex>
        <Flex className={styles.inputWrap}>
          <Input style={{ width: '100%' }} placeholder="请输入验证码" />
          {button}
        </Flex>
        <Flex className={styles.inputWrap}>
          <Input style={{ width: '100%' }} placeholder="请输入邀请人手机号（非必填）" />
        </Flex>
        <WingBlank size="sm">
          <Button type="primary" style={{ marginTop: 60 }}>
            确定
          </Button>
        </WingBlank>
      </WingBlank>
      </div>
    )
  }
}
