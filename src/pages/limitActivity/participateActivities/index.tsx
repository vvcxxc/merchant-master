/**
 * title: 参与活动
 */
import React, { Component } from 'react'
import { List, InputItem, Toast } from 'antd-mobile';
import InputBox from './components/inputBox'
import styles from './index.less'

export default class participateActivities extends Component {

 

  render() {
    return (
      <div className={styles.participateActivities}>
        
        <div className={styles.activity_big_img}>
          <img src={'https://t11.baidu.com/it/u=1335957622,2671955539&fm=76'} alt="" />
        </div>

        <InputBox></InputBox>


      

     
      </div>
    )
  }
}