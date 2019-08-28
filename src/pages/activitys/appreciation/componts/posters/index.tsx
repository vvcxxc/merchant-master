import React, { Component } from 'react';
import { Icon, Grid, Button } from 'antd-mobile';
import request from '@/services/request';
import styles from './index.less'
import wx from "weixin-js-sdk";
import { relative } from 'path';
interface Props {
  closePoster: (close: boolean) => any,
  showPoster: boolean
}

export default class Posters extends Component<Props> {
  state = {
    url:''
  }

  componentDidMount() {
    const canvas: any = document.getElementById('canvas')//获取到cavans 
    const contents = canvas.getContext('2d') //生成htlml5对象

    contents.fillStyle = "#fff";
    contents.fillRect(0, 0, canvas.width, canvas.height);
    
    let bigImg = new Image() //创建img对象 最大的背景图片
    let headImg = new Image() // 店铺头部
    let borderImg = new Image()//礼品边框
    let ballImg = new Image()// 礼字
    let giftImg = new Image()// 礼品
    let JYB_IMG = new Image() // 拼团兑换券
    let JYB_giftImg = new Image() // 拼团兑换券
    let shadowImg = new Image() //阴影图片

    bigImg.src = require('../../../../../assets/new_haibao.png')
    headImg.src = require('../../../../../assets/cat.png')
    borderImg.src = require('../../../../../assets/kuang.png')
    ballImg.src = require('../../../../../assets/qiu.png')
    giftImg.src = require('../../../../../assets/cat.png')
    JYB_IMG.src = require('../../../../../assets/JYB.png')
    shadowImg.src = require('../../../../../assets/shadow.png')
    JYB_giftImg.src = require('../../../../../assets/3.png')

    bigImg.onload = function () {
      contents.drawImage(bigImg, 0, 0, 1700, 2000, 0, 0, 1505, 1730)
      // contents.save();

      contents.font = '23px PingFang-SC-Regular Bold';
      contents.fillStyle = "#fff"
      contents.fillText('电话：12352647895', 225, 1600, 530)
      contents.fillText('地址:广东省广州市南州路北晓港湾樱花街道166号', 105, 1630, 890)
      contents.save();

      contents.arc(353, 490, 58, 0, 2 * Math.PI);
      contents.stroke();
      contents.clip();
      contents.drawImage(headImg, 0, 0, 1045, 945, 295, 432, 145, 145)
      contents.save();
    }

    borderImg.onload = () => {
      contents.drawImage(borderImg, 0, 0, 359, 222, 200, 980, 359, 222)
      contents.save()
    }

    ballImg.onload = () => {
      contents.drawImage(ballImg, 0, 0, 359, 222, 330, 970, 359, 222)
      contents.save()
    }

    giftImg.onload = () => {
      contents.drawImage(giftImg, 0, 0, 1045, 945, 285, 1280, 145, 145)
      contents.save()
    }

    JYB_IMG.onload = () => {
      contents.drawImage(JYB_IMG, 0, 0, 145, 145, 325, 705, 145, 145)
      contents.save()
    }

    shadowImg.onload = () => {
      contents.drawImage(shadowImg, 0, 0, 655, 180, 120, 680, 580, 200)
      contents.save()
    }
    JYB_giftImg.onload = () => {
      contents.drawImage(JYB_giftImg, 0, 0, 494, 460, 115,684, 180, 170)
      contents.save()
    }
    
    contents.font = '32px PingFang-SC-Medium Bold';
    contents.fillStyle = "#313131"
    contents.fillText('大富五金店', 270, 600, 400)
    contents.fillText('正在发起拼团活动，速来！', 170, 650, 400)
    contents.save()

    contents.font = '25px PingFang-SC-Bold';
    contents.fillText('洛溪路店', 410, 725, 430)
    contents.save()

    contents.font = '18px PingFang-SC-Regular';
    contents.fillText('兑换XXXX爽肤套装', 325, 760, 630)

    contents.fillStyle = "#999999"
    contents.fillText('发券日七天可用', 325, 790, 630)
    contents.save()

    let progress = 100;
    //开始绘制进度条
    contents.lineWidth = 12
    contents.strokeStyle = '#FF6654'
    contents.lineTo(320, 820);
    contents.lineTo(320 + progress*1.8, 820);
    contents.stroke();
    contents.closePath();
    contents.beginPath();
    contents.lineWidth = 1;
    contents.fillStyle = '#4a4a4a';
    contents.font = '18px PingFang-SC-Regular';
    contents.fillText(progress + '/100', 504, 825);
    contents.fill();
    contents.closePath();

    contents.font = '32px PingFang-SC-Medium Bold';
    contents.fillStyle = "#FF6654"
    contents.fillText('只需20元即可领取价值', 190, 905, 350)
    contents.fillText('50元得拼团券!', 255, 950, 350)
    contents.save()

    contents.fillText('消费即可免费领取价值', 195, 1210, 450)
    contents.fillText('300元礼品', 280, 1250, 350)
    contents.save()

    contents.font = '28px PingFang-SC-Regular';
    contents.fillStyle = "#313131"
    contents.fillText('长按识别小程序码关注“小熊敬礼”', 145, 1480, 430)
    contents.fillText('一起来领取免费礼品吧！', 195, 1510, 390)
    contents.save()

    
    setTimeout(() => {
      let tome = canvas.toDataURL('image/jpeg')//这里设置了编码
      this.setState({ url: tome })
    }, 1000);

  }

  componentWillReceiveProps () {
    // console.log('这里改变了值')
    // console.log(this.props, 'props')
    // shouldComponentUpdate(this.props)

  }
  
  shouldComponentUpdate(nextProps: any, nextState: any) {
    // console.log(nextProps, '1')
    // console.log(nextProps, '2')
    // console.log('出啊')
    return true //true继续执行  false不继续执行
  }
  // shouldComponentUpdate () {
    
  // }

  closeData = (e:any) => {
    this.props.closePoster(false)//海报消失
    // this.state.showBottom                           // 分享白色底部消失
    e.stopPropagation();
  }

 

  abandoned = () => {
    
    const canvas: any = document.getElementById('canvas');

    canvas.style.borderRadius = '15px'
    const can_object = canvas.getContext('2d') //html5对象

    can_object.fillStyle = "#fff";
    can_object.fillRect(0, 0, canvas.width, canvas.height);

    let imgs = new Image // 图片
    imgs.style.borderRadius = '15px'
    imgs.src = require('./pisha.png')

    let smallImg = new Image
    smallImg.src = require('./pisha.png')

    can_object.save()
    imgs.onload = function () {
      can_object.drawImage(imgs, 0, 0, 476, 498, 42, 34, 476, 498);
      can_object.save()
      can_object.arc(440, 614, 60, 0, 2 * Math.PI);
      can_object.stroke();
      can_object.clip();
      can_object.drawImage(smallImg, 0, 0, 120, 120, 380, 554, 120, 120);
    }

    can_object.fillStyle = "#313131"
    can_object.font = '32px PingFang-SC-Medium';
    can_object.fillText('杨大富的五金店', 42, 600, 490, 900);
    can_object.fillStyle = "#666666"
    can_object.font = '25px PingFang-SC-Medium';
    can_object.fillText('南州路北晓港湾樱花街道...', 42, 650, 490, 900);
    can_object.fillText('电话：12352647895', 42, 695, 490, 900);
    can_object.fillStyle = "#999999"
    can_object.font = '21px PingFang-SC-Medium';
    can_object.fillText('长按识别小程序码', 360, 695, 490, 900);

    can_object.mozImageSmoothingEnabled = false;
    can_object.webkitImageSmoothingEnabled = false;
    can_object.msImageSmoothingEnabled = false;
    can_object.imageSmoothingEnabled = false;

    setTimeout(() => {
      let tome = canvas.toDataURL('image/jpeg')//这里设置了编码
      this.setState({ url: tome })
    }, 1000);
  }

  
  canvasImg = (e: any) => { // 用户点击图片保证 遮挡层不会消失
    e.stopPropagation();
  }

  // 点击海报 不会触发遮挡层点击事件
  // 点击遮挡层 海报消失  然后变成正常页面
  // 利用生命周期 

  
  render() {
    return (
      <div className={styles.posterBox} onClick={this.closeData.bind(this)} style={{ display: this.props.showPoster ? '' : 'none' }}>{/* big box provide  */}
        <div className={styles.new_poster}>
          <div className={styles.hiddenImg}>{/* hidden canvas element */}
            <canvas id="canvas" width="700x" height="1700px" />
          </div>
          <img src={this.state.url} alt="" onClick={this.canvasImg.bind(this)}/>{/* show Image element*/}
        </div>
      </div>

      // style={{ display: this.props.showPoster ? '' : 'none' }}
      // <div className={styles.posterBox}>
      //   <div className={styles.posters}>
      //     <div className={styles.title}>
      //       <div className={styles.font}>生成海报</div>
      //       <div className={styles.close} onClick={this.closeData}><Icon type='cross' /></div>
      //     </div>
      //     <div className={styles.hide_canvas_box} >
      //       <canvas id="canvas" width="565px;" height="726px" />
      //     </div>
      //     <div className={styles.canvas_box} >
      //       <img src={this.state.url} alt="" />
      //     </div>
      //     <div className={styles.save}>
      //       <Button className={styles.save_img}>长按图片保存</Button>
      //     </div>
      //     <div className={styles.describe}>保存图片到相册，你可以分享海报</div>
      //     <div className={styles.line}>{null}</div>
      //   </div>
      // </div>
    )
  }
}
