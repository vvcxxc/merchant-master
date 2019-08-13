/**
 * title：忘记密码
 */
import React, { Component } from 'react';
import { Flex, WingBlank, Button, Toast, InputItem } from 'antd-mobile';
import styles from './index.less';
import request from '@/services/request';
import router from 'umi/router';

export default class ForgetPassword extends Component {
  state = {
    is_ok: true,
    is_true: true,
    wait: '',
    /**手机号 */
    phone: '',
    /**验证码 */
    code: '',
    /**密码 */
    password: '',
    /**确认密码 */
    confirm_password: ''
  };
  /**设置验证码 */
  handleCode = (e: any) => {
    this.setState({ code: e });
  };
  /**设置手机号 */
  handlePhone = (e: any) => {
    this.setState({ phone: e });
  };
  /**设置密码 */
  handlePassword = (e: any) => {
    this.setState({ password: e });
  };
  /**设置确认密码 */
  handleConfPass = (e: any) => {
    this.setState({ confirm_password: e });
  };
  /**
   * 获取验证码
   */
  getCode = () => {
    const { phone } = this.state;
    let wait = 60;
    if (phone) {
      if (!window.navigator.onLine) {
        Toast.fail('短信发送失败，请稍后重试')
        return;
      }
      request({
        url: 'v3/verify_code',
        method: 'get',
        params: {
          phone: phone,
        }
      }).then(res => {
        let { code } = res;
        if (code == 200) {
          Toast.success('发送验证码成功');
          let timer = setInterval(() => {
            if (wait == 0) {
              this.setState({ is_ok: true });
              clearInterval(timer)
            } else {
              wait--;
              this.setState({ is_ok: false, wait });
              clearInterval();
            }
          }, 1000);
        } else {
          Toast.fail('短信发送失败，请稍后重试')
        }
      });
    } else {
      Toast.fail('请输入手机号', 1)
    }
  }

  /**
   * 点击确认提交
   */
  confirm = () => {
    const { code, password, phone, is_true, confirm_password } = this.state;
    // 提交前先验证密码是否一致
    // if ( password == confirm_password ){
    //   this.setState({ is_true: true })
    // }else{
    //   this.setState({ is_true: false });
    //   return;
    // }
    if (code && password && phone && is_true) {
      request({
        url: 'v3/passwords/forget',
        method: 'put',
        data: {
          verify_code: code,
          new_password: password,
          phone: phone,
          confirm_password
        }
      }).then(res => {
        let { code, data } = res;
        if (code == 200) {
          Toast.success(data, 2, () => {
            router.push('/login')
          })
        } else {
          Toast.fail(data, 1)
        }
      })
    } else {
      Toast.fail('请填写完整')
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
    // const prompt = this.state.is_true === true || this.state.confirm_password === "" ? (
    //   ''
    // ) : ( 
    //   <span style={{ color:'red' }}>确认密码与新密码不同</span>
    // );
    return (
      <div style={{ height: '100%', width: '100%', background: ' #fff' }}>
        <WingBlank className={styles.wrap}>
          <Flex className={styles.inputWrap}>
            <InputItem
              style={{ width: '100%' }}
              placeholder="请输入手机号"
              type={'number'}
              onChange={this.handlePhone}
              value={this.state.phone}
              clear
            />
          </Flex>
          <Flex className={styles.inputWrap}>
            <InputItem
              style={{ width: '100%' }}
              placeholder="请输入验证码"
              onChange={this.handleCode}
              value={this.state.code}
              clear
            />
            {button}
          </Flex>
          <Flex className={styles.inputWrap}>
            <InputItem
              style={{ width: '100%' }}
              placeholder="请输入新密码"
              type={'password'}
              onChange={this.handlePassword}
              value={this.state.password}
              clear
            />
          </Flex>
          <Flex className={styles.inputWrap}>
            <InputItem
              style={{ width: '100%' }}
              placeholder="确认密码"
              type={'password'}
              value={this.state.confirm_password}
              onChange={this.handleConfPass}
              clear
            />
          </Flex>
          {/* {prompt} */}
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
