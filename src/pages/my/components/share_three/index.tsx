import React, { Component } from 'react';
import request from '@/services/request';
import wx from "weixin-js-sdk";
import styles from  './index.less'
export default class ShareThree extends Component<any> {
  state = {
    show:false
  }

   //点击微信好友，转发好友
  friendsData = () => {

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
          title: '伊哲要上天',
          link: 'http://test.mall.tdianyi.com/#/pages/activity/pages/detail/detail?id=3561&type=1&activity_id=1521&gift_id=0',
          imgUrl: '../../icon.png',
          success: function () {
            //成功后触发
          }
        })
      })
    })
    
  }
  //点击 转发朋友圈
  circleData = () => {
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
          title: '朋友圈', // 分享标题
          link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: '', // 分享图标
          success: function () {
            // 设置成功
          }
        })
      })
    })
  }

  //点击取消，然后隐藏
  cancelData = () => {

  }

  render() {
    return (
      <div className={styles.share_} style={{display:'none'}}>
        <div className={styles.share_child}>
          <div>微信好友</div>
          <div>朋友圈</div>
          <div style={{border:'none'}}>取消</div>
        </div>
      </div>
    )
  }
}