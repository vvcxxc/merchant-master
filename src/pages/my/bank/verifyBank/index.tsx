/**title: 绑定银行卡 */
import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, Button, List, InputItem, Toast } from 'antd-mobile'
import Success from '../component/success'
import Fail from '../component/fail'
import request from '@/services/request';
import router from 'umi/router'
import { message } from 'antd';

export default class MyBank extends Component {
  state = {

    //input输入值
    phoneNumber: '',
    verification: '',

    //短信验证码
    showTime: false,
    time: 60,

    //商户id 银行卡号
    id: '',
    card: '',

    //控制绑定成功 绑定失败弹框
    success: false,
    fail:false
  };
  componentDidMount() {
    request({
      url: 'api/merchant/staff/userBankList',
      method: 'post',
    }).then(res => {
      const { code, data } = res
      if (code == 200) {
        this.setState({
          id: data[0].id,
          card: data[0].bank_info
        })
      } else {
        Toast.fail(message)
      }
    })

  }



  inputValue = (type:string,value:any) => {
    this.setState({ [type]: value})
  }


  updateTime = () => {

    const myTime = setTimeout(() => {
      this.setState({ time: this.state.time - 1 }, () => {
        if (this.state.time < 1) {
          this.setState({ time: 60, showTime:false})
          clearTimeout(myTime)
          return
        }
        this.updateTime()
      })
    }, 1000);

  }

  //获取验证码
  getVerificationCode = () => {
    const { phoneNumber, id } = this.state
    if (!phoneNumber) {
      Toast.fail('手机号不能为空')
      return
    }
    Toast.loading('',6000)
    request({
      url: 'v3/sendSmsCode',
      method: 'post',
      data: {
        supplier_id: id,
        phone: phoneNumber
      }
    }).then(res => {
      Toast.hide()
      const { code, message, data } = res
      if (code == 200) {
        Toast.success(message)
        this.setState({ showTime: true })
        this.updateTime()
      } else {
        Toast.fail(message)
      }
    }).catch(()=>{
      Toast.hide()
    })
  }


  //绑定银行卡
  bindingCard = () => {
    const { verification, phoneNumber,id } = this.state
    request({
      url: 'v3/bindCard',
      method: 'post',
      data: {
        supplier_id: id,
        phone: phoneNumber,
        code: verification
      }
    }).then(res => {
      const { code, data } = res
      if (code == 200) {
        this.setState({ success:true })
        const time = setTimeout(() => {
          this.setState({ success: false })
          clearTimeout(time)
        }, 1500);
      } else {
        this.setState({ fail: true })
      }
    })
  }

  render() {
    const { card, success,fail } = this.state
    return (
      <div style={{ width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }}>
        <WingBlank>
          <div className={styles.bank_card}>
            <Flex className={styles.bank_num}>
              <span>银行卡号</span>
              <span>{card.slice(0, 4)}</span>
              <span>{'****'}</span>
              <span>{'****'}</span>
              <span>{card.slice(-4)}</span>
            </Flex>
            <InputItem
              value={this.state.phoneNumber}
              placeholder="请输入手机号"
              onChange={this.inputValue.bind(this, 'phoneNumber')}
            />
            <InputItem
              value={this.state.verification}
              placeholder="请输入验证码"
              extra={
                !this.state.showTime ? <div onClick={this.getVerificationCode}>获取验证码</div>: this.state.time
              }
              onChange={this.inputValue.bind(this, 'verification')}
            />

          </div>
          <Button className={styles.button} onClick={this.bindingCard}>绑定</Button>
        </WingBlank>
        { success && <Success /> }
        {
          fail && <Fail trigger={() => { this.setState({ fail: false }) }} />}
      </div>
    )
  }
}
