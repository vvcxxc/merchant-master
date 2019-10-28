import React, { Component } from 'react';
import Posters from '@/pages/activitys/appreciation/componts/posters'
import styles from './index.less'
import request from '@/services/request';
import wx from "weixin-js-sdk";

interface Props {
  closeShare: (close: boolean) => void;
  showShare: boolean;
  type?: Object;
  //定义一个要传递给海报的数据appreciation_info
  posterData?: any,

}

declare global {
  interface Window { open_id: string; pay_url: string; shareLink: string }
}
const Url = window.shareLink ? window.shareLink : 'http://mall.tdianyi.com/';

export default class BottomShare extends Component<Props>{
  state = {
    showShare: false,
    shareButton: false,
    showBottom: true,//控制底部用户操作部分
    showPoster: false,//控制显示海报部分
    showArrows: false,
    showArrowUp: false,
    posterData:{}
  }

  componentWillReceiveProps() {
    if (!this.props.posterData) return
    if (Object.keys(this.props.posterData).length > 1) {
      this.setState({ posterData: this.props.posterData })
    }
  }

  componentDidMount() {

  }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    if (nextProps.showShare != nextState.showShare) { //新旧值在不一致的情况下，更新赋值
      if (!this.state.showShare) this.setState({ showShare: true })
    }
    return true
  }



  //点击遮挡层
  keep_outOnclick = (e: any) => {

      console.log('898989');

    // this.setState({ showBottom: true })//显示
    // this.setState({ showShare: false })
    // this.setState({ showArrows: false })

    // e.stopPropagation();
  }

  // 点击取消
  closeShareData = (e: any) => {
    console.log('取消');
    this.setState({ shareButton: true }) //取消按钮变色
    setTimeout(() => {
      this.setState({ shareButton: false }) //取消按钮变色
      // this.setState({ showShare: false })
    }, 100);
    e.stopPropagation();
  }

  //点击分享
  shareData = (e?: any) => {
    console.log('分享');

    let meta: any = this.props.type
    this.setState({ showBottom: false })// 点击分享 遮挡层不消失 消失白色区域部分
    this.setState({ showArrows:true})

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
            // link: Url+'#/pages/activity/pages/detail/detail?id=' + meta.id + '&type=5&activity_id=' + meta.activity_id + '&gift_id=' + meta.gift_id,
            link: Url+'#/pages/activity/appreciation/index?id='+meta.id+'&type=5&gift_id='+meta.gift_id+'&activity_id='+ meta.activity_id,
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
            // link: Url +'#/pages/activity/pages/detail/detail?id=' + meta.id + '&type=1&activity_id=' + meta.activity_id + '&gift_id=' + meta.gift_id,
            link: Url +'#/pages/activity/appreciation/index?id='+meta.id+'&type=1&gift_id='+meta.gift_id+'&activity_id='+meta.activity_id,
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
            link: Url + '#/business-pages/ticket-buy/index?id=' + meta.id,
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
              link: Url + '#/business-pages/ticket-buy/index?id=' + meta.id,
              imgUrl: 'http://oss.tdianyi.com/front/ir5pyrKzEGGwrS5GpHpNKXzctn5W4bXb.png',
              success: function () {
                //成功后触发
              }
            })
          })

      }//else

    })
    if (e) e.stopPropagation();
  }

  // 点击生成海报
  showPosterData = (e:any) => {
    this.setState({ showPoster: true })
    this.setState({ showBottom: false })// 点击分享 遮挡层不消失 消失白色区域部分
    e.stopPropagation();
  }

  closePoster = (e: any) => {
      console.log('close');

    this.setState({ showArrows: false })
    this.setState({ showPoster: false })
    this.setState({ showShare: false })
    this.setState({ showBottom:true })
  }

  render() {
    return (
      <div style={{ display: this.state.showShare ? '' : 'none'}} className={styles.keep_out}
        // onClick={this.keep_outOnclick.bind(this)}
        onClick={this.closePoster}

      // <div  className={styles.keep_out}
        // style={{ display: this.state.showArrows ? '' : 'none' }}
       >
        <div className={styles.keep_shareBox}

          style={{
            // overflow:'hidden',
            // // height: this.state.showArrows ? 'auto' : '0px',
            display: this.state.showArrows ? '' : 'none'
          }}
        >
          <img
            className={styles.share_arrow}
            src={require('../../../../../assets/jiantou.png')} />
          <div
            className={styles.share_prompt}
          >点击并分享给朋友</div>
        </div>
        <Posters closePoster={this.closePoster} showPoster={this.state.showPoster} data={this.state.posterData}
        >{null}
          </Posters>
        {/* 海报组件 */}

        <div className={styles.share_box} style={{ display: this.state.showBottom  ? '' : 'none' }}>
          <div className={styles.box}>
            <div className={styles.all_center_left} onClick={this.shareData.bind(this)}>
              <div className={styles.text_center}>分享</div>
            </div>
            <div className={styles.all_center_right} onClick={this.showPosterData}>
              <div className={styles.text_center}>生成海报</div>
            </div>
          </div>
          <div className={styles.cancel} onClick={this.closeShareData.bind(this)} style={{ backgroundColor: this.state.shareButton ? 'rgba(0,0,0,0.05)':''}}>取消</div>
        </div>
      </div>
    )
  }
}
