import React, { Component } from 'react';
import request from '@/services/request';
import wx from "weixin-js-sdk";
import styles from './index.less'

interface Props {
  show: boolean,
  onclick: (close: boolean) => void,
  name:string | null
}
export default class ShareThree extends Component<Props> {
  state = {
    showBottom:true
  }

   //点击微信好友，转发好友
  friendsData = () => {
    this.setState({ showBottom: false })

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
        jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']
      });
      wx.ready(() => {//需要后台提供文字，多个id 图片
        wx.updateAppMessageShareData({
          title: '发现一家你喜欢的店铺('+this.props.name+')，速来围观！',
          desc: '刚刚发现了这家店铺(' + this.props.name +')，活动多多，优惠空前，你绝对喜欢，快点进来看看！',
          link: 'http://test.mall.tdianyi.com/#/pages/business/index?id=4652',
          imgUrl: 'http://oss.tdianyi.com/front/ir5pyrKzEGGwrS5GpHpNKXzctn5W4bXb.png',
          success: function () {
            //成功后触发
          }
        })
      })
    })
    
  }
  //点击 转发朋友圈
  circleData = () => {
    this.setState({ showBottom:false})
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
        jsApiList: ['updateTimelineShareData']
      });
      wx.ready(() => {//需要后台提供文字，多个id 图片
        wx.updateTimelineShareData({
          title: '发现一家你喜欢的店铺(' + this.props.name + ')，速来围观！',
          desc: '刚刚发现了这家店铺(' + this.props.name + ')，活动多多，优惠空前，你绝对喜欢，快点进来看看！',
          link: 'http://test.mall.tdianyi.com/#/pages/business/index?id=4652',
          imgUrl: 'http://oss.tdianyi.com/front/ir5pyrKzEGGwrS5GpHpNKXzctn5W4bXb.png', // 分享图标
          success: function () {
            // 设置成功
          }
        })
      })
    })
  }

  //点击取消，然后隐藏
  cancelData = () => {
    this.props.onclick(false)
  }

  //给一个全局点击的事件
  keep_outOnclick = () => {
    //如果是分享的遮挡层 用户点击遮挡层的时候，遮挡层消失
    if (!this.state.showBottom) {
      this.props.onclick(false)
      this.setState({ showBottom: true })
    }
  }

  render() {
    return (
      <div className={styles.share_} style={{ display: this.props.show ? '' : 'none' }} onClick={this.keep_outOnclick}>
        
        <div className={styles.keep_shareBox} style={{ display: !this.state.showBottom ? '' : 'none' }}>
          <img className={styles.share_arrow} src={require('../../../../assets/jiantou.png')} />
          <div
            className={styles.share_prompt}
          >点击并分享给朋友</div>
        </div>

        <div className={styles.share_child} style={{display:this.state.showBottom?'':'none'}}>
          <div onClick={this.friendsData}>微信好友</div>
          <div onClick={this.circleData}>朋友圈</div>
          <div style={{ border: 'none' }} onClick={this.cancelData}>取消</div>
        </div>
      </div>
    )
  }
}