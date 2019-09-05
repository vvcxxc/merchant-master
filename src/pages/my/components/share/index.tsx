import React, { Component } from 'react';
import request from '@/services/request';
import wx from "weixin-js-sdk";
import styles from './index.less'

interface Props {
  show?: boolean,
  onclick: (close: boolean) => void,
  info?: any
}
export default class Share extends Component<Props> {
  state = {
    showBottom: true
  }



  //点击取消，然后隐藏
  cancelData = () => {
    this.props.onclick(false)
  }

  //给一个全局点击的事件
  keep_outOnclick = (e:any) => {
    //如果是分享的遮挡层 用户点击遮挡层的时候，遮挡层消失
    // if (!this.state.showBottom) {
      this.props.onclick(false)
      // this.setState({ showBottom: true })
    // }/*  */
    e.stopPropagation();
  }

  render() {
    return (
        <div className={styles.share_} style={{ display: this.props.show ? '' : 'none' }} onClick={this.keep_outOnclick.bind(this)}>
          <div className={styles.keep_shareBox} >
            <img className={styles.share_arrow} src={require('../../../../assets/jiantou.png')} />
          <div
            className={styles.share_prompt}
            >点击并分享给朋友</div>
          </div>
        </div>
    )
  }
}