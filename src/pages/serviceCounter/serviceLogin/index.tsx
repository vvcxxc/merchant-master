import React, { Component } from 'react';
import { List, InputItem } from 'antd-mobile';
import styles from './index.less'
// import './index.css'



type Props = any

export default class ServiceCounter extends Component<Props>{

  allowLanding = () => {
    console.log('898989');
    
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