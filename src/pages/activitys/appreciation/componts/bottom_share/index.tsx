import React, { Component } from 'react';
import Posters from '@/pages/activitys/appreciation/componts/posters'
import styles from './index.less'
import request from '@/services/request';
import wx from "weixin-js-sdk";

interface Props {
  closeShare: (close: boolean) => void;
  showShare: boolean;
  type?:Object
 }

export default class BottomShare extends Component<Props>{
  state = {
    showShare: false,
    shareButton: false,
    showBottom: true,//控制底部用户操作部分
    showPoster: false//控制显示海报部分
  }


  componentDidMount() {
    
  }

  // 点击取消
  closeShareData = () => {
    this.setState({ showShare: true }) // 控制关闭分享组件
    this.setState({ shareButton: true }) //取消按钮变色
    setTimeout(() => {
      this.props.closeShare(false)
      this.setState({ shareButton: false }) //取消按钮变色
    }, 100);
  }

  // 点击生成海报
  showPosterData = () => {
    this.setState({ showPoster: true })
    this.setState({ showShare: false })
  }

  //关闭海报
  closePoster = (close: any) => {
    this.setState({ showPoster: false })
    console.log(this.props,'prop')
  }
  
  //点击分享 // 如果礼品为 0 ，没礼品
  shareData = () => {
    let meta: any = this.props.type
    this.setState({ showBottom: false })// 点击分享 遮挡层不消失 消失白色区域部分
    
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

      if (meta.name == '拼团') {
        wx.ready(() => {//需要后台提供文字，多个id 图片
          wx.updateAppMessageShareData({
            title:  meta.title,
            desc: meta.text,
            link: 'http://test.mall.tdianyi.com/#/pages/activity/pages/detail/detail?id=' + meta.id + '&type=5&activity_id=' + meta.activity_id + '&gift_id=' + meta.gift_id,
            imgUrl: 'http://oss.tdianyi.com/front/ir5pyrKzEGGwrS5GpHpNKXzctn5W4bXb.png',
            success: function () {
              //成功后触发
            }
          })
        })
        
      } else if (meta.name == '增值') {
        
        wx.ready(() => {
          wx.updateAppMessageShareData({
            title: meta.title,
            desc: meta.text,
            link: 'http://test.mall.tdianyi.com/#/pages/activity/pages/detail/detail?id=' + meta.id + '&type=1&activity_id=' + meta.activity_id + '&gift_id=' + meta.gift_id,
            imgUrl: 'http://oss.tdianyi.com/front/ir5pyrKzEGGwrS5GpHpNKXzctn5W4bXb.png',
            success: function () {
              //成功后触发
            }
          })
        })

      } else if (meta.name == '优惠券' && meta.youhui_type == 0) {//兑换券
        
        wx.ready(() => {
          wx.updateAppMessageShareData({
            title:  meta.storeName + '正在派发' + meta.return_money+'元兑换券，手慢无，速抢！',
            desc: '拼手速的时候来了，超值兑换券限量抢购，手慢就没了！速速戳进来一起领取！',
            link: 'http://test.mall.tdianyi.com/#/pages/business/index?id='+meta.id,
            imgUrl: 'http://oss.tdianyi.com/front/ir5pyrKzEGGwrS5GpHpNKXzctn5W4bXb.png',
            success: function () {
              //成功后触发
            }
          })
        })
      }  else if (meta.name == '优惠券' && meta.youhui_type == 1) {//现金券

          wx.ready(() => {
            wx.updateAppMessageShareData({
              title: '嘘，这里有一张' + meta.return_money+'元现金券，悄悄领了，别声张！',
              desc:  meta.storeName+'又搞活动啦，是好友我才偷偷告诉你，现金券数量有限，领券要快姿势要帅！',
              link: 'http://test.mall.tdianyi.com/#/pages/business/index?id=' + meta.id,
              imgUrl: 'http://oss.tdianyi.com/front/ir5pyrKzEGGwrS5GpHpNKXzctn5W4bXb.png',
              success: function () {
                //成功后触发
              }
            })
          })
        
      }//else
    
    })
  }

  //给一个全局点击的事件
  keep_outOnclick = (e:any) => {
   
    //如果是分享的遮挡层 用户点击遮挡层的时候，遮挡层消失
    if (!this.state.showBottom) {
      this.props.closeShare(false)
      this.setState({ showBottom:true})
    }
    // e.preventDefault()
    e.stopPropagation();
  }
  

  render() {
    const poster = <Posters closePoster={this.closePoster} showPoster={this.state.showPoster} >{null}</Posters>
    return (
      <div style={{ display: this.props.showShare ? '' : 'none' }} className={styles.keep_out} onClick={this.keep_outOnclick.bind(this)}>
        
        <div className={styles.keep_shareBox} style={{ display: !this.state.showBottom ? '' : 'none' }} >
          <img
            className={styles.share_arrow}
            src={require('../../../../../assets/jiantou.png')} />
          <div
            className={styles.share_prompt}
          >点击并分享给朋友</div>
        </div>

        {poster}{/* 海报组件 */}
        
        <div className={styles.share_box} style={{ display: this.state.showBottom ? '' : 'none' }}>
          <div className={styles.box}>
            <div className={styles.all_center} onClick={this.shareData}>
              <img src={require('../../../../../assets/share.png')} alt="" />
              <div className={styles.text_center}>分享</div>
            </div>
            <div className={styles.all_center} onClick={this.showPosterData}>
              <img src={require('../../../../../assets/posters.png')} alt="" />
              <div className={styles.text_center}>生成海报</div>
            </div>
          </div>
          <div className={styles.cancel} onClick={this.closeShareData} style={{ backgroundColor: this.state.shareButton ? 'rgba(0,0,0,0.05)':''}}>取消</div>
        </div>
      </div>
    )
  }
}
