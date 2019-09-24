/**title: 小熊敬礼服务台 */
import React, { Component } from 'react';
import styles from './index.less'
import QRCode from 'qrcode';
import { Flex, WingBlank, Icon, Toast,Text } from 'antd-mobile';
import request from '@/services/request';
import new_request from '@/services/new_request';
import router from 'umi/router';
import wx from 'weixin-js-sdk';

interface ShopMessage {
  label: string,
  describe:string
}

export default class ServiceCounter extends Component{

  state = {
    service: ['扫码核销', '生成服务码'],
    shopMessage: [
      // {
      //   label: '店铺名称：',
      //   describe: '多美蛋糕店'
      // },
      // {
      //   label: '订单金额：',
      //   describe: '多美蛋糕店'
      // },
      // {
      //   label: '订 单 号：',
      //   describe: '12345678954'
      // },
      // {
      //   label: '消费时间：',
      //   describe: '2019-09-05 11:11:11'
      // }
    ],
    listIndex: 0,
    qrcodeImg: '',
    serviceCounterId: '',
    allow: false,
    orderId:Number
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
          QRCode.toDataURL('http://test.mall.tdianyi.com/#/pages/mycardticket/index?id='+res.data.serviceCounterId)
          .then((url: any) => {
            this.setState({ qrcodeImg: url })
          })
          .catch((err: any) => { })
        }
      })
  }

<<<<<<< HEAD
  componentDidMount() {   // 网络链接转化为二维码   --> 跳到泽铜页面
    // ‘http://test.mall.tdianyi.com/#/pages/mycardticket/index’
    QRCode.toDataURL('http://test.mall.tdianyi.com/#/pages/mycardticket/index?id='+this.state.serviceCounterId)
      .then((url: any) => {
        this.setState({ qrcodeImg: url })
      })
      .catch((err: any) => { })
  }

=======
>>>>>>> test
  // 索引器
  indexer = (index: number) => {
    this.setState({ listIndex: index })
  }

  /**点击核销 */
  cancelAfterVerific = (e: any) => {
    e.stopPropagation();
    console.log(22222);

    wx.scanQRCode({
      needResult: 1,
      desc: 'scanQRCode desc',
      success: ({ resultStr }: any) => {
        this.setState({
          allow:true
        })
        let res = JSON.parse(resultStr)
        let data = [
          { label: '店铺名称：', describe: res.storeName },
          { label: '订单金额：', describe: res.amount },
          { label: ' 订 单 号 ：', describe: res.orderSn },
          { label: '消费时间：', describe: res.orderCreateTime}
        ]
        this.setState({
          shopMessage:data
        })
        this.setState({
          orderId:res.id
        })
      }
    });
  };

  allowverification = () => {
    new_request({
      url: 'v3/service/counter/order_verification',
      method: 'post',
      data: {
        id: this.state.orderId //核销id
      }
    })
      .then((res: any) => {
        if (res.code == 200) {
          // localStorage.setItem('token_QL', JSON.stringify(res.data.token))
          // alert(res.message)
          Toast.success(res.message,1)
          router.push({ pathname: '../../serviceCounter/scanning' })
        }
      }).catch(() => {
        Toast.fail('核销失败', 1);
      })

  }

  controlAllow = () => {
    this.setState({ allow: false })
  }

  closeShadow = (e: any) => {
    this.setState({ allow: false })
    e.stopPropagation();
  }


  render() {
    return (
      <div className={styles.serviceCounter} onClick={this.controlAllow}>
        <div className={styles.title}>{/* title */}
          {
            this.state.service.map((item, index) => {
              return <span key={index} className={this.state.listIndex == index ? styles.spanColor : null} onClick={this.indexer.bind(this, index)}>{item}</span>
            })
          }
        </div>

        {
          this.state.listIndex == 0 ? <div className={styles.content} onClick={this.cancelAfterVerific}>
            {
              !this.state.allow ? <img src={require('../../../assets/bright.png')} alt="" /> : <div className={styles.shopBox} onClick={this.closeShadow.bind(this)}>
                <div className={styles.shopDescirbe}>
                  {
                    this.state.shopMessage.map((item: ShopMessage, index: number) => {
                      return <div className={styles.descirbe}>
                        <Text>{item.label}</Text>
                        <Text className={styles.text}>{item.describe}</Text>
                      </div>
                    })
                  }
                  <div className={styles.descirbeButton} >
                    <Text className={styles.myButton} onClick={this.allowverification.bind(this)}>
                      核销</Text>
                  </div>
                </div>
              </div>
            }

          </div> : <div>
              <div className={styles.content}>
                <img src={this.state.qrcodeImg} className={styles.border_img} alt="" />
              </div>
              <div className={styles.save}>长按二维码可保存在手机相册</div>
            </div>
        }

        <div className={styles.foot} onClick={()=>{router.push({ pathname: '../../serviceCounter/verificationRecord' })}}>
          <div className={styles.foot_head}></div>
          <div className={styles.footContent}>
            <span>核销记录</span>
            <img src={require('../../../assets/jiantou_right.png')} alt="" />
          </div>
        </div>

      </div>
    )
  }
}
