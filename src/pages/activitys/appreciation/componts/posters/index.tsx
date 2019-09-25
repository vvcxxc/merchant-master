import React, { Component } from 'react';
import { Icon, Grid, Button, Toast } from 'antd-mobile';
import request from '@/services/request';
import styles from './index.less'
import wx from "weixin-js-sdk";
import { relative } from 'path';
import QRCode from 'qrcode';
import { Base64 } from 'js-base64';
import { connect } from 'dva';


interface dataType {
  address: string,
  gif_name?: string,
  gif_pic?: any,
  gift_id?: number,
  git_money?: number,
  init_money: string,
  link: string,
  max_money: string,
  name: string,
  schedule: number,
  shop_door_header_img: string,
  tel: string,
  title: string,
  use_tim: string,
  total_fee: string | number,
  pay_money: string | number
}

interface Props<T> {
  showPoster: boolean,
  closePoster: () => void,
  data: T,
  details: any
}

export default connect(({ activity }: any) => activity)(class Posters extends Component<Props<dataType>> {

  state = {
    url: '',
    showPoster: false,
    stopPoster: false,
    data: {},
    headImg: '',//这两个是为了处理跨域问题而设立
    giftImg: '',
    loadingTime: 0.5,
    canvasLength:''
  }

  shouldComponentUpdate(nextProps: Props<dataType>, nextState: Props<dataType>) {
    if (nextProps.showPoster !== nextState.showPoster) {
      if (!this.state.showPoster) {
        this.setState({ showPoster: true })
        this.panduan()
      }//end
    }
    return true
  }

  componentDidMount() {
    console.log('海报触发');
  }

  // 长 短 海报根据此id来
  panduan = () => {

    if (this.props.data.gift_id == 0) {
      this.shortCreatCanvas(this.props.data);
    } else {
      this.creatCanvas(this.props.data);
    }
  }

  // 用来给域里面添加 ‘ \ ’
  judgeNetwork = (Network: string) => {
    if (Network.split('com', 2)[1].slice(0, 1) == '/') {
      return Network.split('.com/', 2)[0] + '.com' + "\\/" + Network.split('.com/', 2)[1]
    } else {
      return Network
    }
  }

  creatCanvas = (data: dataType) => {

    const canvas: any = document.getElementById('canvas')//获取到cavans 
    const contents = canvas.getContext('2d') //生成htlml5对象
    contents.fillStyle = "#fff";
    contents.fillRect(0, 0, canvas.width, canvas.height);
    contents.save()

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
    let init_money = data.pay_money       // 只需多少元
    let max_money = data.max_money        // 拼团券的金额
    let phone = data.tel                                        //店铺电话
    let home = data.address                                     //店铺地址
    let giftPrice = data.git_money
    let use_tim = data.use_tim
    let arch = data.gif_name
    let schedule = data.schedule                                //控制进度条
    let link = data.link                                        // 用户扫二维码所跳转的链接

    if (data.title != '拼团') {
      JYB_IMG.src = require("../../../../../assets/add_money.png")
      JYB_giftImg.src = require("../../../../../assets/add.border.png")  // 满足金额
    } else {
      JYB_IMG.src = require("../../../../../assets/spell_money.png")
      JYB_giftImg.src = require("../../../../../assets/spell_border.png")
    }
    
    giftImg.src = this.props.details.giftImg
    headImg.src = this.props.details.headImg
    bigImg.src = require("../../../../../assets/new_haibao.png")
    borderImg.src = require("../../../../../assets/kuang.png")
    ballImg.src = require("../../../../../assets/qiu.png")
    shadowImg.src = require("../../../../../assets/shadow.png")
    outlineImg.src = require("../../../../../assets/outline.png")

    QRCode.toDataURL(link)                                      // 网络链接转化为二维码
      .then((url: any) => {
        wxImg.src = url
      })
      .catch((err: any) => { })
    
    headImg.onload = () => {
      contents.save();
      contents.restore();
      contents.drawImage(headImg, 0, 0, 545, 345, 290, 410, 145, 145)
      contents.save();
    }

    bigImg.onload = ()=> {
      contents.drawImage(bigImg, 0, 0, 1700, 2000, 0, 0, 1505, 1730)
      contents.save();

      contents.font = '23px PingFang-SC-Regular Bold';
      contents.fillStyle = "#fff"
      contents.fillText('电话：' + phone, 105, 1600, 530)

      if (contents.measureText(home).width >= 506) {
        contents.fillText('地址：' + home.slice(0, 19), 105, 1635);
        contents.fillText(home.slice(19, 48), 105, 1670);
      } else {
        contents.fillText('地址：' + home, 105, 1635);
      }
    }
   

    borderImg.onload = () => {
      contents.drawImage(borderImg, 0, 0, 359, 222, 200, 980, 359, 222)
      contents.save()
    }

    ballImg.onload = () => {
      contents.drawImage(ballImg, 0, 0, 359, 222, 335, 970, 359, 222)
      contents.save()
    }

    giftImg.onload = () => {
      contents.drawImage(giftImg, 0, 0, 600, 550, 173, 990, 345, 170)
      contents.save()
    }

    wxImg.onload = () => {
      contents.drawImage(wxImg, 0, 0, 445, 445, 270, 1270, 380, 380)
      contents.save()
    }

    JYB_IMG.onload = () => {
      contents.drawImage(JYB_IMG, 0, 0, 145, 145, 320, 702, 145, 145)
      contents.save()
    }

    shadowImg.onload = () => {
      contents.drawImage(shadowImg, 0, 0, 655, 180, 120, 680, 580, 200)
      contents.save()
    }
    
    JYB_giftImg.onload = () => {
      
      if (data.title != '拼团') { 
        contents.drawImage(JYB_giftImg, 0, 0, 300, 300, 130, 695, 210, 227)
        contents.save()

        contents.font = '20px PingFang SC Bold';
        contents.fillStyle = "#fff"
        contents.fillText('￥', 170, 780, 500)
        contents.save()

        contents.font = '35px PingFang SC Bold';
        let pices = String(max_money)

        pices.length < 4 ? contents.fillText(pices, 220 - (pices.length * 10), 780, 500) : contents.fillText(pices, 190, 780, 500);
        contents.save()
        contents.font = '20px PingFang SC';
        contents.fillStyle = "#ededed"
        contents.fillText('满' + data.total_fee + '可用', 180, 810, 500)
        contents.save()
        
      }
      else {
        contents.drawImage(JYB_giftImg, 0, 0, 300, 300, 130, 695, 210, 227)
        contents.save()
        contents.font = '35px PingFang SC Bold';
        contents.fillStyle = "#fff"
        contents.fillText('拼团特惠', 150, 780, 500);
        contents.save()
      }

    }

    contents.font = '32px PingFang-SC-Medium Bold';
    contents.fillStyle = "#313131"
    //文字超过部分定义省略号
    contents.measureText(shopName).width < 200 ? contents.fillText(shopName, 345 - shopName.length * 11, 605, 400) : contents.fillText(shopName.slice(0, 7) + '.....', 260, 605, 400)
    contents.fillText('正在发起' + title + '活动，速来！', 170, 650, 400)
    contents.save()
    contents.font = '25px PingFang-SC-Bold';

    outlineImg.onload = () => {
      contents.drawImage(outlineImg, 0, 0, 204, 160, 315, 814, 180, 170)

      //开始绘制进度条
      contents.beginPath();
      contents.lineWidth = 12
      contents.strokeStyle = '#FF6654'
      contents.lineTo(318, 820);
      contents.lineTo(318 + schedule * 1.8, 820);
      contents.stroke();
      contents.closePath();
      contents.beginPath();
      contents.lineWidth = 1;
      contents.fillStyle = '#4a4a4a';
      contents.font = '18px PingFang-SC-Regular';
      contents.fillText(schedule + '/100', 504, 825);
      contents.fill();
      contents.closePath();
      contents.save()
    }
    //文字超过部分定义省略号
    contents.measureText(shopName).width < 200 ? contents.fillText(shopName, 410, 725, 430) : contents.fillText(shopName.slice(0, 5) + '.....', 410, 725, 430);
    contents.save()

    contents.font = '18px PingFang-SC-Regular';
    contents.fillText(arch, 325, 760, 630)

    contents.fillStyle = "#999999"
    contents.fillText(use_tim, 325, 790, 630)
    contents.save()

    contents.font = '32px PingFang-SC-Medium Bold';
    contents.fillStyle = "#FF6654"
    contents.fillText('只需' + init_money + '元即可领取价值', 200, 905, 350)
    contents.fillText(max_money + '元的' + title + '券!', 255, 950, 350)
    contents.save()

    contents.fillText('消费即可免费领取价值', 200, 1210, 450)
    contents.fillText(giftPrice + '元礼品', 280, 1250, 350)
    contents.save()

    contents.font = '28px PingFang-SC-Regular';
    contents.fillStyle = "#313131"
    contents.fillText('长按识别小程序码关注“小熊敬礼”', 145, 1480, 430)
    contents.fillText('一起来领取免费礼品吧！', 195, 1510, 390)
    contents.save()

    Toast.loading('正在生成中，请稍后', this.state.loadingTime);
    setTimeout(() => {
      this.setState({
        canvasLength: canvas.toDataURL('image/jpeg/png')
      }, () => {
        this.controlImgTime(this.state.canvasLength.length)
      })
    }, this.state.loadingTime *2000);

  }

  

  shortCreatCanvas = (data: any) => {
    const canvas: any = document.getElementById('canvas')//获取到cavans 
    const contents = canvas.getContext('2d') //生成htlml5对象
    contents.fillStyle = "#fff";
    contents.fillRect(0, 0, canvas.width, canvas.height);
    contents.save()

    let bigImg = new Image()      // 创建img对象 最大的背景图片
    let headImg = new Image()     // 店铺头部
    let wxImg = new Image()       // 微信小程序图片
    let JYB_IMG = new Image()     // 拼团兑换券
    let JYB_giftImg = new Image() // 拼团兑换券
    let shadowImg = new Image()   // 阴影图片
    let outlineImg = new Image()  // 轮廓图片
    let giftImg = new Image()     // 礼品图片

    let title = data.title
    let shopName = data.name                                    //店铺名字
    let init_money = data.pay_money      // 只需多少元
    let max_money = data.max_money      // 拼团券的金额   
    let phone = data.tel                                        //店铺电话
    let home = data.address                                     //店铺地址
    let use_tim = data.use_tim
    let arch = data.gif_name
    let schedule = data.schedule                                //控制进度条
    let link = data.link                                        // 用户扫二维码所跳转的链接

    QRCode.toDataURL(link)                                      // 网络链接转化为二维码
      .then((url: any) => {
        wxImg.src = url
      })
      .catch((err: any) => { })
    
    if (data.title != '拼团') {
      var meet = data.total_fee
      JYB_IMG.src = require("../../../../../assets/add_money.png")
      JYB_giftImg.src = require("../../../../../assets/add.border.png") 
    } else {
      JYB_IMG.src = require("../../../../../assets/spell_money.png")
      JYB_giftImg.src = require("../../../../../assets/spell_border.png")
    }

    headImg.src = this.props.details.headImg
    // headImg.src = this.judgeNetwork(data.shop_door_header_img)
    bigImg.src = require('../../../../../assets/short_poster.png')
    JYB_IMG.src = require('../../../../../assets/JYB.png')
    shadowImg.src = require('../../../../../assets/shadow.png')
    outlineImg.src = require('../../../../../assets/outline.png')

    headImg.onload = () => {
      contents.drawImage(headImg, 0, 0, 545, 345, 295, 420, 145, 145)
      contents.save();
    }
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
    }

   

    giftImg.onload = () => {
      if (data.gift_id != 0) {
        contents.drawImage(giftImg, 0, 0, 550, 222, 168, 990, 345, 170)
        contents.save()
      }
    }

    wxImg.onload = () => {
      contents.drawImage(wxImg, 0, 0, 445, 445, 270, 1010, 400, 400)
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

      if (data.title != '拼团') {
       contents.drawImage(JYB_giftImg, 0, 0, 300, 300, 130, 700, 215, 235)
        contents.font = '20px PingFang SC Bold';
        contents.fillStyle = "#fff"

        contents.fillText('￥', 170, 780, 500)
        contents.save()
        contents.font = '35px PingFang SC Bold';
        let pices = String(max_money)

        pices.length < 4 ? contents.fillText(pices, 220 - (pices.length * 10), 780, 500) : contents.fillText(pices, 190, 780, 500);
        contents.save()
        contents.font = '20px PingFang SC';
        contents.fillStyle = "#ededed"
        contents.fillText('满' + meet + '可用', 180, 810, 500)
        contents.save()

      } else {
        contents.drawImage(JYB_giftImg, 0, 0, 300, 300, 130, 705, 210, 227)
        contents.save()
        contents.font = '35px PingFang SC Bold';
        contents.fillStyle = "#fff"
        contents.fillText('拼团特惠', 150, 790, 500);
        contents.save()
      }

    }

    contents.font = '32px PingFang-SC-Medium Bold';
    contents.fillStyle = "#313131"

    //文字超过部分定义省略号
    contents.measureText(shopName).width < 200 ? contents.fillText(shopName, 345 - shopName.length * 11.1, 612, 400) : contents.fillText(shopName.slice(0, 7) + '.....', 260, 612, 400)

    contents.fillText('正在发起' + title + '活动，速来！', 170, 660, 400)
    contents.save()

    contents.font = '25px PingFang-SC-Bold';

    outlineImg.onload = () => {
      contents.drawImage(outlineImg, 0, 0, 204, 160, 315, 824, 180, 170)

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
      contents.fillText(schedule + '/100', 504, 835);
      contents.fill();
      contents.closePath();
    }

    //文字超过部分定义省略号
    contents.measureText(shopName).width < 200 ? contents.fillText(shopName, 410, 735, 430): contents.fillText(shopName.slice(0, 5) + '.....', 410, 735, 430)
    contents.save()

    contents.font = '18px PingFang-SC-Regular';
    contents.fillText(arch, 325, 770, 630)

    contents.fillStyle = "#999999"
    contents.fillText(use_tim, 325, 800, 630)
    contents.save()

    contents.font = '32px PingFang-SC-Medium Bold';
    contents.fillStyle = "#FF6654"
    contents.fillText('只需' + init_money + '元即可领取价值', 210, 920, 350)
    contents.fillText(max_money + '元的' + title + '券!', 255, 970, 350)
    contents.save()

    contents.font = '28px PingFang-SC-Regular';
    contents.fillStyle = "#313131"
    contents.fillText('长按识别小程序码关注“小熊敬礼”', 145, 1245, 430)
    contents.fillText('一起来领取免费礼品吧！', 195, 1280, 390)
    contents.save()

    Toast.loading('正在生成中，请稍后', this.state.loadingTime);
    setTimeout(() => {
      this.setState({
        canvasLength: canvas.toDataURL('image/jpeg/png')
      }, () => {
        this.controlImgTime2(this.state.canvasLength.length)
      })
    }, this.state.loadingTime * 1000);

  }

  // 用来优化图片显示时间   图片长度       标准长度
  controlImgTime = (dataLength: number) => {
    setTimeout(() => {
      this.setState({
        url: this.state.canvasLength
      })
    }, 500);
    // console.log(dataLength);
    
    // if (dataLength < 1190000) {
    //   Toast.loading('正在生成中，请稍后', this.state.loadingTime);
    //   setTimeout(() => {
    //     this.setState({ loadingTime: this.state.loadingTime + 0.5 }, () => {
    //       this.controlImgTime(this.state.canvasLength.length)
    //       if (this.state.loadingTime > 1.5) history.go(0) // 如果执行了多次，还是无法显示图片 ，刷新当前页面
    //     })
    //   }, this.state.loadingTime * 1000);
    // } else {
    //   this.setState({
    //     url: this.state.canvasLength
    //   })
    // }
  }


  // 用来优化图片显示时间   图片长度       标准长度
  controlImgTime2 = (dataLength: number) => {
    console.log(dataLength);
    setTimeout(() => {
      this.setState({
        url: this.state.canvasLength
      })
    }, 500);
    // if (dataLength < 1520000) {
      // setTimeout(() => {
        
      // }, 500);
      // Toast.loading('正在生成中，请稍后', this.state.loadingTime);
      // setTimeout(() => {
      //   this.setState({ loadingTime: this.state.loadingTime + 0.5 }, () => {
      //     this.controlImgTime(this.state.canvasLength.length)
      //     if (this.state.loadingTime > 1.5) history.go(0) // 如果执行了多次，还是无法显示图片 ，刷新当前页面
      //   })
      // }, this.state.loadingTime * 1000);
    // } else {
    //   console.log('执行');
      
    //   this.setState({
    //     url: this.state.canvasLength
    //   })
    // }
  }

  // 小数点后一位采用四舍五入
  identifyData = (data: string) => {
    if (!data) return
    if (Number(data.substring(data.indexOf(".") + 1, data.indexOf(".") + 2) ) >= 5) {
      return Number(data.substring(0, data.indexOf("."))) + 1
    } else {
      return Number(data.substring(0, data.indexOf(".")))
    }
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
      <div className={
        this.props.showPoster ? styles.posterBox : styles.hiddenposterBox
      } onClick={this.closeData.bind(this)}>
        {/* big box provide  */}
        {/* //  <div className={ styles.posterBox} onClick={this.closeData.bind(this)}>  */}
        <div className={styles.new_poster}>
          {/* //hidden canvas element 1470 */}
          <div className={styles.hiddenImg}>
            <canvas id="canvas" width="700x" height={this.props.data.gift_id == 0 ? 1470 + 'rem' : 1700 + 'rem'} />
          </div>
          <div className={styles.img_box}>
            <img
              id='img'
              style={{ height: this.props.showPoster? '':'0px'}}
              src={this.state.url} alt="" onClick={this.canvasImg.bind(this)} />
            {/* show Image element */}
            <div className={styles.save_font}>长按保存图片</div>
          </div>
        </div>

      </div>
    )
  }
})
