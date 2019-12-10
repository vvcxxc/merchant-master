/**
 * title: 参与活动
 */
import React, { Component } from 'react'
import { List, InputItem, Toast } from 'antd-mobile';
import { connect } from 'dva';
import InputBox from './components/inputBox'//输入框
import AttendRules from './components/attendRules'//参与规则
import UploadPictures from './components/active_img'
import styles from './index.less'


export default class participateActivities extends Component {

 

  render() {
    return (
      <div className={styles.participateActivities}>
        
        <div className={styles.activity_big_img}>
          <img src={'https://t11.baidu.com/it/u=1335957622,2671955539&fm=76'} alt="" />
        </div>

        <InputBox></InputBox>
        <div className={styles.set_prompt}>{'*请上传横行的图片，建议图片比例16:9'}</div>
        <UploadPictures></UploadPictures>
        <AttendRules></AttendRules>

        <div className={styles.foot}>
          <span></span>
          <span></span>
        </div>

     
      </div>
    )
  }
}