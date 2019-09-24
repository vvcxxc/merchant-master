/**title: 小熊敬礼服务台 */
import React, { Component } from 'react';
import { List, InputItem } from 'antd-mobile';
import styles from './index.less'
import new_request from '@/services/new_request';
import router from 'umi/router';

type Props = any

export default class ServiceCounter extends Component<Props>{

  state = {
    userName: String || Number,
    userPassword: String || Number
  }
  allowLanding = () => {
    // 确认登陆 获取后台返回token
    new_request({
      url: 'v3/service/counter/login',
      method: 'post',
      data: {
        account_name: this.state.userName,
        account_passwd:this.state.userPassword
      }
    })
      .then((res: any) => { 
        if (res.code == 200) {
          localStorage.setItem('token_QL', JSON.stringify(res.data.token))
          router.push({pathname:'../../serviceCounter/scanning'})
        }
      })
  }

  nameFocusInst = (data:any) => {
    this.setState({
      userName:data
    })
  }

  passwordFocusInst = (data:any) => {
    this.setState({
      userPassword: data
    })
  }


  render() {
    return (
      <div className={styles.newLogin}>
        <div className={styles.login}>
          <img src={require('../../../assets/new_login.png')} alt=""/>
        </div>
        <div className={styles.contentInput}>
          <div className={styles.list}>
            <div className={styles.title}>账号</div>
            <InputItem
              clear
              onChange={this.nameFocusInst}
            ></InputItem>
            <div className={styles.password}>密码</div>
            <InputItem
              type="password"
              clear
              onChange={this.passwordFocusInst}
              ></InputItem>
          </div>
        </div>
        <div className={styles.landing}>
          <div onClick={this.allowLanding}>
             登录
         </div>
        </div>
      </div>
    )
  }
}