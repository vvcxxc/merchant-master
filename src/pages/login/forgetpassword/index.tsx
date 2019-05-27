/**
 * title：忘记密码
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
          <Input style={{ width: '100%' }} placeholder="请输入手机号" type='number' />
        </Flex>
        <Flex className={styles.inputWrap}>
          <Input style={{ width: '100%' }} placeholder="请输入验证码" />
          <Button size='small' className={styles.button}>发送验证码</Button>
        </Flex>
        <Flex className={styles.inputWrap}>
          <Input style={{ width: '100%' }} placeholder="请输入新密码" />
        </Flex>
        <Flex className={styles.inputWrap}>
          <Input style={{ width: '100%' }} placeholder="确认密码" />
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
