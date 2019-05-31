/**
 * title：忘记密码
 */
import React, { Component } from 'react';
import { Flex, WhiteSpace, WingBlank, Button, List, InputItem } from 'antd-mobile';
import styles from './index.less';
import request from '@/services/request';

export default class ForgetPassword extends Component {
  state = {
    is_ok: true,
    is_true: true,
    wait:'',
    /**手机号 */
    phone:'',
    /**验证码 */
    code:'',
    /**密码 */
    password:'',
    /**确认密码 */
    confirm_password:''
  };
  /**设置验证码 */
  handleCode = (e: any) => {
    this.setState({code: e.target.value});
  };
  /**设置手机号 */
  handlePhone = (e: any) => {
    this.setState({phone: e.target.value});
  };
  /**设置密码 */
  handlePassword = (e: any) => {
    this.setState({password: e.target.value});
  };
  /**设置确认密码 */
  handleConfPass = (e: any) => {
    this.setState({confirm_password: e.target.value});
    const { password } = this.state;
    if ( password == e.target.value ){
      this.setState({ is_true: true })
    }else{
      this.setState({ is_true: false })
    }
  };
  /**
   * 获取验证码
   */
  getCode = () => {
    const { phone } = this.state;
    let wait = 60;
    if(phone){
      request({
        url: 'v3/verify_code',
        method: 'get',
        params: {
          phone: phone,
        }
      }).then(res => {
        let { code } = res.data;
        if ( code == 200 ){
          let timer = setInterval(time, 1000);
        }
      });
    }
    //定时器执行函数
    let time = () => {
      if( wait == 0){
        this.setState({ is_ok: true })
      }else{
        wait --;
        this.setState({ is_ok: false, wait:wait });
        clearInterval();
      }
    }
  }
  /**
   * 点击确认提交
   */
  confirm = () => {
    const { code, password, phone, is_true} = this.state;
    if ( code&&password&&phone&&is_true ){
       request({
        url: 'v3/passwords/forget',
        method: 'put',
        data: {
          verify_code: code,
          new_password: password,
          phone: phone
        }
      }).then(res => {})
    }

  }

  render() {
    const button =
    this.state.is_ok === true ? (
      <div className={styles.sendCode} onClick={this.getCode}>发送验证码</div>
    ) : (
      <div className={styles.doneSend}>{this.state.wait}秒</div>
    );
    // 提示确认密码不相同
    const prompt = this.state.is_true === true ? (
      ''
    ) : (
      <span style={{ color:'red' }}>确认密码与新密码不同</span>
    );
    return (
      <div style={{ height: '100%', width: '100%', background:' #fff' }}>
      <WingBlank className={styles.wrap}>
        <Flex className={styles.inputWrap}>
          <input
            style={{ width: '100%' }}
            placeholder="请输入手机号"
            type='number'
            onChange={this.handlePhone}
            value={this.state.phone}
          />
        </Flex>
        <Flex className={styles.inputWrap}>
          <input
            style={{ width: '100%' }}
            placeholder="请输入验证码"
            onChange={this.handleCode}
            value={this.state.code}
          />
          {button}
        </Flex>
        <Flex className={styles.inputWrap}>
          <input
            style={{ width: '100%' }}
            placeholder="请输入新密码"
            onChange={this.handlePassword}
            value={this.state.password}
          />
        </Flex>
        <Flex className={styles.inputWrap}>
          <input
            style={{ width: '100%' }}
            placeholder="确认密码"
            value={this.state.confirm_password}
            onChange={this.handleConfPass}
          />
        </Flex>
        {prompt}
        <WingBlank size="sm">
          <Button type="primary" style={{ marginTop: 60 }} onClick={this.confirm}>
            确定
          </Button>
        </WingBlank>
      </WingBlank>
      </div>
    )
  }
}
