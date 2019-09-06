import React, { Component } from 'react';
import { Icon, Grid, Button } from 'antd-mobile';
import request from '@/services/request';
import styles from './index.less'
import wx from "weixin-js-sdk";
import { relative } from 'path';
import QRCode from 'qrcode';

interface Props {
  showPoster: boolean,
  closePoster: () => void,
  data?:any
}

interface dataType {
  address?: string,
  gif_pic?: any,
  gift_id?: number,
  git_money?: number,
  init_money?: string,
  max_money?: string,
  name?: string,
  shop_door_header_img?: string,
  tel?:string
}

export default class Posters extends Component<Props> {

  state = {
    url: '',
    showPoster: false,
    stopPoster: false,
    data:{}
  }

  componentWillReceiveProps() {
    if (!this.props.data ) return
    if (Object.keys(this.props.data).length > 1) {
      // console.log(this.props.data)
      // this.setState({ data: this.props.data }, () => {
      //   this.creatCanvas()
      // })
      if (this.props.data.gift_id == 0) {
        this.shortCreatCanvas(this.props.data)
      } else {
        this.creatCanvas(this.props.data)
      }
      
    }

  }
 
  

  creatCanvas = (data:any) => {
    const canvas: any = document.getElementById('canvas')//获取到cavans 
    const contents = canvas.getContext('2d') //生成htlml5对象
    contents.fillStyle = "#fff";
    contents.fillRect(0, 0, canvas.width, canvas.height);

    let bigImg = new Image()      // 创建img对象 最大的背景图片
    let headImg = new Image()     // 店铺头部
    let borderImg = new Image()   // 礼品边框
    let ballImg = new Image()     // 礼字
    let wxImg = new Image()       // 微信小程序图片
    let JYB_IMG = new Image()     // 拼团兑换券
    let JYB_giftImg = new Image() // 拼团兑换券
    let shadowImg = new Image()   // 阴影图片
    let outlineImg = new Image()  // 轮廓图片
    let giftImg = new Image()     // 礼品图片

    let title = data.title
    let shopName = data.name                                    //店铺名字
    let init_money = this.identifyData(data.init_money)         // 只需多少元
    let max_money = this.identifyData(data.max_money)           // 拼团券的金额
    let phone = data.tel                                        //店铺电话
    let home = data.address                                     //店铺地址
    let giftPrice = data.git_money
    let use_tim = data.use_tim
    let arch = data.gif_name                                    
    let schedule = data.schedule                                //控制进度条
    let link = data.link                                        // 用户扫二维码所跳转的链接
    
    headImg.src = data.shop_door_header_img // 门头照            
    giftImg.src = data.gif_pic              // 礼品图片
   
    bigImg.src = require('../../../../../assets/new_haibao.png')
    borderImg.src = require('../../../../../assets/kuang.png')
    ballImg.src = require('../../../../../assets/qiu.png')
    JYB_IMG.src = require('../../../../../assets/JYB.png')
    shadowImg.src = require('../../../../../assets/shadow.png')
    JYB_giftImg.src = require('../../../../../assets/3.png')
    outlineImg.src = require('../../../../../assets/outline.png')

    QRCode.toDataURL(link)                                      // 网络链接转化为二维码
      .then((url: any) => {
        wxImg.src = url
      })
      .catch((err: any) => { })
    
    bigImg.onload = () => {

      contents.drawImage(bigImg, 0, 0, 1700, 2000, 0, 0, 1505, 1730)
      contents.save();

      contents.font = '23px PingFang-SC-Regular Bold';
      contents.fillStyle = "#fff"
      contents.fillText('电话：' + phone, 105, 1600, 530)

      if (contents.measureText(home).width >= 506) {
        contents.fillText('地址：'+home.slice(0, 19), 105, 1635);
        contents.fillText(home.slice(19, 48), 105, 1670 );
      } else {
        contents.fillText('地址：' +home, 105, 1635 );
      }
      contents.save();

      contents.arc(353, 490 , 58, 0, 2 * Math.PI);
      contents.stroke();
      contents.clip();
      contents.drawImage(headImg, 0, 0, 545, 345, 300, 423  , 145, 145)
      contents.save();
    }

    borderImg.onload = () => {
      if (data.gift_id != 0) {
        contents.drawImage(borderImg, 0, 0, 359, 222, 200, 980, 359, 222)
        contents.save()
      }
    }

    giftImg.onload = () => {
      if (data.gift_id != 0) {
        contents.drawImage(giftImg, 0, 0, 550, 222, 168, 990, 345, 170)
        contents.save()
      }
    }

    ballImg.onload = () => {
      if (data.gift_id != 0) {
        contents.drawImage(ballImg, 0, 0, 359, 222, 335, 970, 359, 222)
        contents.save()
      }
    }

    wxImg.onload = () => {
      contents.drawImage(wxImg, 0, 0, 445, 445, 270, 1270 , 380, 380 )
      contents.save()
    }

    JYB_IMG.onload = () => {
      contents.drawImage(JYB_IMG, 0, 0, 145, 145, 325, 705 , 145, 145)
      contents.save()
    }

    shadowImg.onload = () => {
      contents.drawImage(shadowImg, 0, 0, 655, 180, 120, 680, 580, 200)
      contents.save()
    }
    JYB_giftImg.onload = () => {
      contents.drawImage(JYB_giftImg, 0, 0, 494, 460, 115, 684 , 180, 170)
    }

    contents.font = '32px PingFang-SC-Medium Bold';
    contents.fillStyle = "#313131"

    //文字超过部分定义省略号
    if (contents.measureText(shopName).width >= 200) {
      contents.fillText(shopName.slice(0, 5) + '.....', 260, 600 , 400)
    } else {
      contents.fillText(shopName, 260, 600 , 400)
    }

    contents.fillText('正在发起' + title + '活动，速来！', 170, 650 , 400)
    contents.save()

    contents.font = '25px PingFang-SC-Bold';

    outlineImg.onload = () => {
      contents.drawImage(outlineImg, 0, 0, 204, 160, 315, 814, 180, 170)
    //开始绘制进度条
      contents.lineWidth = 12
      contents.strokeStyle = '#FF6654'
      contents.lineTo(318, 820 );
      contents.lineTo(318 + schedule * 1.8, 820 );
      contents.stroke();
      contents.closePath();
      contents.beginPath();
      contents.lineWidth = 1;
      contents.fillStyle = '#4a4a4a';
      contents.font = '18px PingFang-SC-Regular';
      contents.fillText(schedule + '/100', 504, 825 );
      contents.fill();
      contents.closePath();
    }

    //文字超过部分定义省略号
    if (contents.measureText(shopName).width >= 200) {
      contents.fillText(shopName.slice(0, 5) + '.....', 410, 725 , 430)
    } else {
      contents.fillText(shopName, 410, 725 , 430)
    }
    contents.save()

    contents.font = '18px PingFang-SC-Regular';
    contents.fillText(arch, 325, 760 , 630)

    contents.fillStyle = "#999999"
    contents.fillText(use_tim, 325, 790 , 630)
    contents.save()

    contents.font = '32px PingFang-SC-Medium Bold';
    contents.fillStyle = "#FF6654"
    contents.fillText('只需' + init_money + '元即可领取价值', 190, 905 , 350)
    contents.fillText(max_money + '元得' + title + '券!', 255, 950 , 350)
    contents.save()

    contents.fillText('消费即可免费领取价值', 195, 1210, 450)
    contents.fillText(giftPrice + '元礼品', 280, 1250, 350)
    contents.save()

    contents.font = '28px PingFang-SC-Regular';
    contents.fillStyle = "#313131"
    contents.fillText('长按识别小程序码关注“小熊敬礼”', 145, 1480, 430)
    contents.fillText('一起来领取免费礼品吧！', 195, 1510 , 390)
    contents.save()

    //  setTimeout(() => {
       this.setState({
         url: canvas.toDataURL('image/jpeg')
       })//这里设置了编码 
    //  }, 500);

  }


  shortCreatCanvas = (data:any) => {
    const canvas: any = document.getElementById('canvas')//获取到cavans 
    const contents = canvas.getContext('2d') //生成htlml5对象
    contents.fillStyle = "#fff";
    contents.fillRect(0, 0, canvas.width, canvas.height);

    let bigImg = new Image()      // 创建img对象 最大的背景图片
    let headImg = new Image()     // 店铺头部
    let borderImg = new Image()   // 礼品边框
    let ballImg = new Image()     // 礼字
    let wxImg = new Image()       // 微信小程序图片
    let JYB_IMG = new Image()     // 拼团兑换券
    let JYB_giftImg = new Image() // 拼团兑换券
    let shadowImg = new Image()   // 阴影图片
    let outlineImg = new Image()  // 轮廓图片
    let giftImg = new Image()     // 礼品图片

    // let data: any = this.state.data
    let title = data.title
    let shopName = data.name                                    //店铺名字
    let init_money = this.identifyData(data.init_money)         // 只需多少元
    let max_money = this.identifyData(data.max_money)           // 拼团券的金额
    let phone = data.tel                                        //店铺电话
    let home = data.address                                     //店铺地址
    let giftPrice = data.git_money
    let use_tim = data.use_tim
    let arch = data.gif_name
    let schedule = data.schedule                                //控制进度条
    let link = data.link                                        // 用户扫二维码所跳转的链接

    QRCode.toDataURL(link)                                      // 网络链接转化为二维码
      .then((url: any) => {
        wxImg.src = url
      })
      .catch((err: any) => { })

    headImg.src = data.shop_door_header_img // 门头照            
    giftImg.src = data.gif_pic              // 礼品图片

    bigImg.src = require('../../../../../assets/short_poster.png')
    borderImg.src = require('../../../../../assets/kuang.png')
    ballImg.src = require('../../../../../assets/qiu.png')
    JYB_IMG.src = require('../../../../../assets/JYB.png')
    shadowImg.src = require('../../../../../assets/shadow.png')
    JYB_giftImg.src = require('../../../../../assets/3.png')
    outlineImg.src = require('../../../../../assets/outline.png')

    bigImg.onload = () => { 
      contents.drawImage(bigImg, 0, 0, 1700, 1700, 0, 0, 1505, 1500)
      contents.save();

      contents.font = '23px PingFang-SC-Regular Bold';
      contents.fillStyle = "#fff"
      contents.fillText('电话：' + phone, 105, 1370, 530)

      if (contents.measureText(home).width >= 506) {
        contents.fillText('地址：' + home.slice(0, 19), 105, 1405);
        contents.fillText(home.slice(19, 48), 105, 1440);
      } else {
        contents.fillText('地址：' + home, 105, 1405);
      }
      contents.save();

      contents.arc(353, 500, 58, 0, 2 * Math.PI);
      contents.stroke();
      contents.clip();
      contents.drawImage(headImg, 0, 0, 545, 345, 300, 433, 145, 145)
      contents.save();

    }

    borderImg.onload = () => {
      if (data.gift_id != 0) {
        contents.drawImage(borderImg, 0, 0, 359, 222, 200, 980, 359, 222)
        contents.save()
      }
    }

    giftImg.onload = () => {
      if (data.gift_id != 0) {
        contents.drawImage(giftImg, 0, 0, 550, 222, 168, 990, 345, 170)
        contents.save()
      }
    }

    ballImg.onload = () => {
      if (data.gift_id != 0) {
        contents.drawImage(ballImg, 0, 0, 359, 222, 335, 970, 359, 222)
        contents.save()
      }
    }

    wxImg.onload = () => {
      contents.drawImage(wxImg, 0, 0, 445, 445, 270, 1017, 380, 380)
      contents.save()
    }

    JYB_IMG.onload = () => {
      contents.drawImage(JYB_IMG, 0, 0, 145, 145, 325, 715, 145, 145)
      contents.save()
    }

    shadowImg.onload = () => {
      contents.drawImage(shadowImg, 0, 0, 655, 180, 120, 690, 580, 200)
      contents.save()
    }
    JYB_giftImg.onload = () => {
      contents.drawImage(JYB_giftImg, 0, 0, 494, 460, 115, 694, 180, 170)
    }

    contents.font = '32px PingFang-SC-Medium Bold';
    contents.fillStyle = "#313131"

    //文字超过部分定义省略号
    if (contents.measureText(shopName).width >= 200) {
      contents.fillText(shopName.slice(0, 5) + '.....', 260, 610, 400)
    } else {
      contents.fillText(shopName, 260, 610, 400)
    }

    contents.fillText('正在发起' + title + '活动，速来！', 170, 660, 400)
    contents.save()

    contents.font = '25px PingFang-SC-Bold';

    outlineImg.onload = () => {
      contents.drawImage(outlineImg, 0, 0, 204, 160, 315,824, 180, 170)
      //开始绘制进度条
      contents.lineWidth = 12
      contents.strokeStyle = '#FF6654'
      contents.lineTo(318, 830);
      contents.lineTo(318 + schedule * 1.8, 830);
      contents.stroke();
      contents.closePath();
      contents.beginPath();
      contents.lineWidth = 1;
      contents.fillStyle = '#4a4a4a';
      contents.font = '18px PingFang-SC-Regular';
      contents.fillText(schedule + '/100', 504,835);
      contents.fill();
      contents.closePath();
    }

    //文字超过部分定义省略号
    if (contents.measureText(shopName).width >= 200) {
      contents.fillText(shopName.slice(0, 5) + '.....', 410, 735, 430)
    } else {
      contents.fillText(shopName, 410, 735, 430)
    }
    contents.save()

    contents.font = '18px PingFang-SC-Regular';
    contents.fillText(arch, 325, 770, 630)

    contents.fillStyle = "#999999"
    contents.fillText(use_tim, 325, 800, 630)
    contents.save()

    contents.font = '32px PingFang-SC-Medium Bold';
    contents.fillStyle = "#FF6654"
    contents.fillText('只需' + init_money + '元即可领取价值', 190, 915, 350)
    contents.fillText(max_money + '元得' + title + '券!', 255, 960, 350)
    contents.save()

    contents.font = '28px PingFang-SC-Regular';
    contents.fillStyle = "#313131"
    contents.fillText('长按识别小程序码关注“小熊敬礼”', 145, 1250, 430)
    contents.fillText('一起来领取免费礼品吧！', 195, 1280, 390)
    contents.save()


  //  setTimeout(() => {
     this.setState({
       url: canvas.toDataURL('image/jpeg')
     })//这里设置了编码 
  //  }, 500);

   }

  // 小数点后一位采用四舍五入
  identifyData = (data: string) => {
    if (!data) return
    if (Number(data.split('.', 1)[0]) >= 5) return Number(data.substring(0, data.indexOf("."))) + 1
    return Number(data.substring(0, data.indexOf(".")))
  }
  

  closeData = (e: any) => {
    this.setState({ showPoster: false })
    this.props.closePoster()
    e.stopPropagation();
  }
  
  canvasImg = (e: any) => { // 用户点击图片保证 遮挡层不会消失
    e.stopPropagation();
  }

  render() {
    return (
      <div className={this.props.showPoster ? styles.posterBox : styles.hiddenposterBox} onClick={this.closeData.bind(this)}>
        {/* big box provide  */}
    {/* //  <div className={ styles.posterBox} onClick={this.closeData.bind(this)}>  */}
        <div className={styles.new_poster}>
          <div className={styles.hiddenImg}>{/* hidden canvas element */}
            <canvas id="canvas" width="700x" height={this.props.data.gift_id == 0? 1470+'px':1700+'px'} />
          </div>
          <div className={styles.img_box}>
            <img src={this.state.url} alt="" onClick={this.canvasImg.bind(this)} />{/* show Image element*/}
            <div className={styles.save_font}>长按保存图片</div>
          </div>
        </div>
        
      </div>
    )
  }
}
