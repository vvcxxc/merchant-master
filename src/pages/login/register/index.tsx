/**
 * title：注册账号
 */
import React, { Component } from 'react';
import { Flex, WhiteSpace, WingBlank, Button, List, InputItem } from 'antd-mobile';
import styles from './index.less';
import Input from 'antd-mobile/lib/input-item/Input';

export default class Register extends Component {
  state = {

  };
  render() {
    return (
      <WingBlank className={styles.wrap}>
        <Flex className={styles.inputWrap}>
          <Input style={{ width: '100%' }} placeholder="请输入账号名" />
        </Flex>
        <Flex className={styles.inputWrap}>
          <Input style={{ width: '100%' }} placeholder="请输入邮箱地址（非必填）" />
        </Flex>
        <Flex className={styles.inputWrap}>
          <Input style={{ width: '100%' }} placeholder="请输入手机号" type='number' />
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
            注册账号
          </Button>
        </WingBlank>
        <Flex.Item className={styles.footer}>
        点击“注册”即同意<span style={{ color: '#21418A' }}>《团卖物联服务及隐私条款》</span>
        </Flex.Item>
      </WingBlank>
    )
  }
}
