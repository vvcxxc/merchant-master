import React, { Component } from 'react';
import styles from './index.less'
import request from '@/services/request';
import wx from "weixin-js-sdk";

interface Props {
  showPoster: (show: boolean) => any;
  closeShare: (close: boolean) => any;
  showShare: boolean;
 }

export default class BottomShare extends Component<Props>{
  state = {
    showShare: false,
    shareButton:false
  }


  componentDidMount() {
    
  }

  closeShareData = () => {
    // this.setState({ showShare: true }) // 控制关闭分享组件
    // this.setState({ shareButton: true }) //取消按钮变色
    // setTimeout(() => {
    //   this.props.closeShare(false)
    //   this.setState({ shareButton: false }) //取消按钮变色
    // }, 100);
    // alert('操作')
    let userAgent = navigator.userAgent;
    let isIos = userAgent.indexOf('iPhone') > -1;
    let url: any;
    if (isIos) {
      url = sessionStorage.getItem('url');
    } else {
      url = location.href;
    }
    request({
      url: 'wechat/getShareSign',
      method: 'get',
      params: {
        url
      }
    }).then(res => {
      let _this = this;
      wx.config({
        debug: false,
        appId: res.appId,
        timestamp: res.timestamp,
        nonceStr: res.nonceStr,
        signature: res.signature,
        jsApiList: ['updateAppMessageShareData','updateTimelineShareData']
      });
      this.setState({ showShare: true }) // 控制关闭分享组件
      wx.ready(()=>{ 
        wx.updateAppMessageShareData({
          title: '伊哲大逗逼',
          link: '没有链接',
          imgUrl: '../../icon.png',
          success:function () {
            alert('成功了')
          }
        })
      })
    });

  // }
  }

  showPosterData = () => {
    this.props.showPoster(true)
  }

  

  render() {
    return (
      <div style={{ display: this.props.showShare ? '':'none'}} className={styles.keep_out}>
        <div className={styles.share_box}>
          <div className={styles.box}>
            <div className={styles.all_center} onClick={this.closeShareData}>
              <img src={require('../../../../../assets/share.png')} alt="" />
              <div className={styles.text_center}>分享</div>
            </div>
            <div className={styles.all_center} onClick={this.showPosterData}>
              <img src={require('../../../../../assets/posters.png')} alt="" />
              <div className={styles.text_center} >生成海报</div>
            </div>
          </div>
          <div className={styles.cancel} onClick={this.closeShareData} style={{ backgroundColor: this.state.shareButton ? 'rgba(0,0,0,0.05)':''}}>取消</div>
        </div>
      </div>
    )
  }
}
