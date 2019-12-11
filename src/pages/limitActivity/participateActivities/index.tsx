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

  state = {
    onChangeType:false//决定是否需要显示活动图片
  }

  

  onChangeType = (onChangeType:boolean) => {
    this.setState({ onChangeType})
  }

  render() {
    const { onChangeType } = this.state
    return (
      <div className={styles.participateActivities}>
        
        <div className={styles.activity_big_img}>
          <img src={'https://t11.baidu.com/it/u=1335957622,2671955539&fm=76'} alt="" />
        </div>
        <InputBox onChangeType={this.onChangeType}></InputBox>
        {
          onChangeType ? <div className={styles.set_prompt}>{'*请上传横行的图片，建议图片比例16:9'}</div> : null
        }
        {
          onChangeType ? <UploadPictures/>:null
        }
        <AttendRules></AttendRules>

        <div className={styles.foot}>
          <span>提交活动</span>
          {/* //提交活动后， 将所有的缓存全部清除 */}
          <span>取消</span>
        </div>

     
      </div>
    )
  }
}