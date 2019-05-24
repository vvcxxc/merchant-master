import React, { Component } from 'react';
import { Flex, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import styles from './index.less';
import Input from 'antd-mobile/lib/input-item/Input';

export default class Login extends Component {
  state = {
    tab: 0,
  };
  render() {
    return (
      <WingBlank className={styles.wrap}>
        <Flex>
          <Flex.Item>
            <span className={styles.title}>商家登录</span>
          </Flex.Item>
          <a href="#">注册</a>
        </Flex>
        <div className="tab">
          <Flex>
            <div className={this.state.tab === 0 ? 'tab-item active' : 'tab-item'}>
              短信验证码登录
            </div>
            <div className={this.state.tab === 1 ? 'tab-item active' : 'tab-item'}>
              账号密码登录
            </div>
          </Flex>
        </div>
        <Flex className={styles.inputWrap}>
          <Input style={{ width: '100%' }} placeholder="请填写账号" />
        </Flex>
        <Flex className={styles.inputWrap}>
          <Input style={{ width: '100%' }} placeholder="请填写密码" />
        </Flex>
        <Flex justify="end">
          <span className={styles.warring}>忘记密码？</span>
        </Flex>
        <WingBlank size="sm">
          <Button type="primary" style={{ marginTop: 86 }}>
            登录
          </Button>
        </WingBlank>
      </WingBlank>
    );
  }
}
