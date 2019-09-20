import React, { Component } from 'react';
import styles from './index.less'
import QRCode from 'qrcode';
import { Flex, WingBlank, Icon, Toast } from 'antd-mobile';
import request from '@/services/request';
import new_request from '@/services/new_request';
import router from 'umi/router';
import wx from 'weixin-js-sdk';

type Props = any

export default class ServiceCounter extends Component<Props>{

  state = {
    service: ['扫码核销', '生成服务码'],
    listIndex: 0,
    qrcodeImg: '',
    serviceCounterId:Number
  }

  componentWillMount() {
    if (!localStorage.getItem('token_QL')) router.push({ pathname: '../../serviceCounter/serviceLogin' })
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
        jsApiList: ['getLocation', 'openLocation', 'scanQRCode']
      });
    });

    // 拿到核销id
    new_request({
      url: 'v3/service/counter/info',
      method: 'get',
      params: {}
    })
      .then((res: any) => {
        if (res.code == 200) {
          this.setState({ serviceCounterId: res.data.serviceCounterId})
        }
      })
  }

  componentDidMount() {
    QRCode.toDataURL('阿敏，你个二货，哈哈哈')                                      // 网络链接转化为二维码
      .then((url: any) => {
        // console.log(url);
        this.setState({ qrcodeImg: url })
      })
      .catch((err: any) => { })
  }

  // 索引器
  indexer = (index: number) => {
    console.log(index, '所以韩');
    this.setState({ listIndex: index })
  }

  // 扫码
  scanCode = () => {
    console.log('扫码');

  }
  // 核销
  cancelAfterVerific = () => {
    // console.log('核销');
    // this.Verification()
  }

  /**点击核销 */
  Verification = () => {
    console.log('执行');
    
    wx.scanQRCode({
      needResult: 1,
      desc: 'scanQRCode desc',
      success: ({ resultStr }: any) => {
        let res = JSON.parse(resultStr);

        // new_request({
        //   url: 'v3/service/counter/order_verification',
        //   method: 'post',
        //   params: {
        //     id: this.state.serviceCounterId
        //   }
        // })
        //   .then((res: any) => {
        //     if (res.code == 200) {
        //       // alert(res.code)
        //       Toast.fail(res.message);
        //     } else {
        //       // alert('失败了')
        //       Toast.fail('失败');
        //     }
        //   })
        
        request({
          url: 'api/merchant/youhui/userConsume',
          method: 'post',
          data: {
            code: res.youhui_sn
          }
        }).then(res => {
          if (res.code == 200) {
             alert('成功了')
            router.push({ pathname: '/' })
            // alert('成功了')
            // router.push({
            //   pathname: '/verification/success',
            //   query: {
            //     id: res.data.youhu_log_id
            //   }
            // })
          } else {
            Toast.fail(res.message);
          }
        });
      }
    });
  };


  render() {
    return (
      <div className={styles.serviceCounter}>
        <div className={styles.title}>{/* title */}
          {
            this.state.service.map((item, index) => {
              return <span key={index} className={this.state.listIndex == index ? styles.spanColor : null} onClick={this.indexer.bind(this, index)}>{item}</span>
            })
          }
        </div>

        {
          this.state.listIndex == 0 ? <div className={styles.content} onClick={this.Verification}>
            <img src={require('../../../assets/bright.png')} alt="" />
          </div> : <div>
              <div className={styles.content}>
                <img src={this.state.qrcodeImg} className={styles.border_img} alt="" />
              </div>
              <div className={styles.save}>长按二维码可保存在手机相册</div>
            </div>
        }

        <div className={styles.foot}>
          <div className={styles.foot_head}></div>
          <div className={styles.footContent} onClick={this.cancelAfterVerific}>
            <span>核销记录</span>
            <img src={require('../../../assets/jiantou_right.png')} alt="" />
          </div>
        </div>
      </div>
    )
  }
}