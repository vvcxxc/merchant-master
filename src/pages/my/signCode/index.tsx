/**
 * title:我的签约码
 */
import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, Toast, Button } from 'antd-mobile';
import request from '@/services/request';
import router from 'umi/router';

export default class SignCode extends Component {
  state = {
    url: ''
  };
  componentDidMount (){
    this.setState({
      url: this.props.location.query.url
    });
  }
  submit = () => {
    request({
      url: 'api/merchant/affirm_sign',
      method: 'post'
    }).then(res => {
      let { code, message } = res;
      if(code == 200){
        Toast.success(message,1,()=>{
          router.goBack()
        })
      }else{
        Toast.fail(message,1)
      }
    })
  }
  render (){
    return (
      <div className={styles.page}>
        <Flex className={styles.title} justify='around'>
          我的签约码
        </Flex>
        <WingBlank className={styles.codeBox}>
          <Flex justify='around'>
           <img src={this.state.url} className={styles.qrCode}/>
          </Flex>
          <div className={styles.tips}>
            <p>1、长按识别上方二维码跳转签约页面；</p>
            <p>2、点击“确认已完成签约”按钮确认签约完成。</p>
          </div>
        </WingBlank>
        <Flex justify='around' className={styles.hint}>
          请确认已完成签约
        </Flex>
        <WingBlank>
          <Button className={styles.button} onClick={this.submit}>确认已完成签约</Button>
        </WingBlank>
      </div>
    )
  }
}
