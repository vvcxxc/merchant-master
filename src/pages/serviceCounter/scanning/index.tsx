import React, { Component } from 'react';
import styles from './index.less'
import QRCode from 'qrcode';
import { Flex, WingBlank, Icon, Toast,Text } from 'antd-mobile';
import request from '@/services/request';
import new_request from '@/services/new_request';
import router from 'umi/router';
import wx from 'weixin-js-sdk';

// type Props = any

interface ShopMessage {
  label: string,
  describe:string
}

export default class ServiceCounter extends Component{

  state = {
    service: ['扫码核销', '生成服务码'],
    shopMessage: [
      {
        label: '店铺名称：',
        describe: '多美蛋糕店'
      },
      {
        label: '订单金额：',
        describe: '多美蛋糕店'
      },
      {
        label: '订 单 号：',
        describe: '12345678954'
      },
      {
        label: '消费时间：',
        describe: '2019-09-05 11:11:11'
      }
    ],
    listIndex: 0,
    qrcodeImg: '',
    serviceCounterId: Number,
    allow:false
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

  componentDidMount() {   // 网络链接转化为二维码   --> 跳到泽铜页面
    QRCode.toDataURL('http://test.supplierv2.tdianyi.com/serviceCounter/myCardTicket?id='+this.state.serviceCounterId)                                     
      .then((url: any) => {
        this.setState({ qrcodeImg: url })
      })
      .catch((err: any) => { })
  }

  // 索引器
  indexer = (index: number) => {
    this.setState({ listIndex: index })
  }

  // 扫码
  scanCode = () => {
    console.log('扫码');

  }
  // 核销
  // cancelAfterVerific = () => {
  //   // console.log('核销');
  //   this.Verification()
  // }

  /**点击核销 */
  cancelAfterVerific = () => {
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

            alert(res)
            // 这里成功触发后， 出现是否允许核销
            this.setState({ allow:true })
            // alert('成功了')
            router.push({ pathname: '../../serviceCounter/scanning' })
            // router.push({ pathname: '/' })
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

  allowverification = () => {
    new_request({
      url: 'v3/service/counter/order_verification',
      method: 'post',
      data: {
       id: 1 //核销id
      }
    })
      .then((res: any) => {
        if (res.code == 200) {
          localStorage.setItem('token_QL', JSON.stringify(res.data.token))
          router.push({ pathname: '../../serviceCounter/scanning' })
        }
      })
    
  }


  render() {
    return (
      <div className={styles.serviceCounter} style={{ backgroundColor: this.state.allow ?"rgba('0,0,0,.3')":"#fff"}}>
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
              !this.state.allow ? <img src={require('../../../assets/bright.png')} alt="" /> : <div >
                <div className={styles.shopDescirbe}>
                  {
                    this.state.shopMessage.map((item: ShopMessage, index: number) => {
                      return <div className={styles.descirbe}>
                        <Text>{item.label}</Text>
                        <Text className={styles.text}>{item.describe}</Text>
                      </div>
                    })
                  }
                  <div className={styles.descirbeButton} onClick={}>
                    <Text className={styles.myButton}>
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
          <div className={styles.footContent} onClick={this.cancelAfterVerific}>
            <span>核销记录</span>
            <img src={require('../../../assets/jiantou_right.png')} alt="" />
          </div>
        </div>

      </div>
    )
  }
}