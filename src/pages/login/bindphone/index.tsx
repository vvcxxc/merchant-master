/**
 * title：绑定手机
 */

import React, { Component } from 'react';
import { Flex, WhiteSpace, WingBlank, Button, List, InputItem } from 'antd-mobile';
import styles from './index.less';
import Input from 'antd-mobile/lib/input-item/Input';

export default class ForgetPassword extends Component {
  state = {

  };
  render() {
    return (
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
          <Button size='small' className={styles.button}>发送验证码</Button>
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
    )
  }
}
