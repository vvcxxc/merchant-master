import React, { Component } from 'react';
import { List, InputItem } from 'antd-mobile';
import styles from './index.less'
import new_request from '@/services/new_request';
import router from 'umi/router';

type Props = any

export default class ServiceCounter extends Component<Props>{

  allowLanding = () => {

    // 确认登陆 获取后台返回token
    new_request({
      url: 'v3/service/counter/login',
      method: 'post',
      data: {
        account_name: '孙悟空',
        account_passwd:'123456'
      }
    })
      .then((res: any) => { 
        if (res.code == 200) {
          localStorage.setItem('token_QL', JSON.stringify(res.data.token))
          router.push({pathname:'../../serviceCounter/scanning'})
        }
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
            ></InputItem>
            <div className={styles.password}>密码</div>
            <InputItem
              type="password"
              clear
              ></InputItem>
          </div>
        </div>

        <div className={styles.landing}>
          <div onClick={this.allowLanding}>
             登陆
         </div>
        </div>

      </div>
    )
  }
}