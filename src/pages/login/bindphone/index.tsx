/**
 * title：绑定手机
 */

import React, { Component } from 'react';
import { Flex, WhiteSpace, WingBlank, Button, List, InputItem, Toast } from 'antd-mobile';
import styles from './index.less';
import Input from 'antd-mobile/lib/input-item/Input';

export default class ForgetPassword extends Component {
  state = {
    is_ok: true,
    username: '',
    phone: '',
    password: '',
    code: '',
    wait: ''


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
        let { code } = res;
        if ( code == 200 ){
          let timer = setInterval(()=>{
            if( wait == 0){
              this.setState({ is_ok: true });
              clearInterval(timer)
            }else{
              wait --;
              this.setState({ is_ok: false , wait});
              clearInterval();
            }
          }, 1000);
        }
      });
    }else{
      Toast.fail('请输入手机号',1)
    }
  }

  handleUser = (e: any) => {
    this.setState({})
  }


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
