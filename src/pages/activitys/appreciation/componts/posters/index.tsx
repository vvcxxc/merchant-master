import React, { Component } from 'react';
import { Icon, Grid, Button } from 'antd-mobile';
import request from '@/services/request';
import styles from './index.less'
import wx from "weixin-js-sdk";
interface Props {
  closePoster: (close: boolean) => any,
  showPoster: boolean
}



export default class Posters extends Component<Props> {
  state = {
    url: ''
  }
  componentDidMount() {
    const canvas: any = document.getElementById('canvas');
    // const canvas: any = document.getElementById('canvas');


    canvas.style.backgroundColor = '#fff';
    canvas.style.borderRadius = '15px'

    const can_object = canvas.getContext('2d') //html5对象
    let imgs = new Image // 图片
    // imgs.src = 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2045657337,1202469231&fm=26&gp=0.jpg'
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
    // convertCanvasToImage(canvas) {
    // var image = new Image();
    imgs.src = canvas.toDataURL("image/png");
    this.setState({
      url: imgs.src
    })

  }

  saveMyImg = () => {
    // function exportCanvasAsPNG(id, fileName) {
    var canvasElement: any = document.getElementById('canvas');

    var MIME_TYPE = "image/png/jpg";
    var imgURL = canvasElement.toDataURL(MIME_TYPE);//转换base64位编码

    var link = document.createElement('a')
    link.download = 'dis'
    link.href = imgURL

    link.dispatchEvent(new MouseEvent('click'))

    link.setAttribute('href', imgURL);

    link.dataset.downloadurl = [MIME_TYPE, link.download, link.href].join(':');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);


    // let userAgent = navigator.userAgent;
    // let isIos = userAgent.indexOf('iPhone') > -1;
    // let url: any;
    // if (isIos) {
    //   url = sessionStorage.getItem('url');
    // } else {
    //   url = location.href;
    // }
    // request({
    //   url: 'wechat/getShareSign',
    //   method: 'get',
    //   params: {
    //     url
    //   }
    // }).then(res => {
    //   let _this = this;
    //   wx.config({
    //     debug: false,
    //     appId: res.appId,
    //     timestamp: res.timestamp,
    //     nonceStr: res.nonceStr,
    //     signature: res.signature,
    //     jsApiList: [
    //       "updateAppMessageShareData"
    //     ]
    //   });

    //   wx.ready(function () {
    //     wx.getLocalImgData({
    //       localId: '1', // 图片的localID
    //       success: function (res: any) {
    //         var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
    //       }
    //     });
    //   })
    // }
    // )
  }
  closeData = () => {
    this.props.closePoster(false)
  }




  render() {
    return (
      <div className={styles.posterBox} style={{ display: this.props.showPoster ? '' : 'none' }}>
        <div className={styles.posters}>
          <div className={styles.title}>
            <div className={styles.font}>生成海报</div>
            <div className={styles.close} onClick={this.closeData}><Icon type='cross' /></div>
          </div>
          <div className={styles.canvas_box}>
            <canvas id="canvas" width="565px;" height="726px"/>
            <img src={this.state.url}/>
          </div>
          <div className={styles.save}>
            <Button className={styles.save_img} onClick={this.saveMyImg}>保存图片</Button>
          </div>
          <div className={styles.describe}>保存图片到相册，你可以分享海报</div>
          <div className={styles.line}>{null}</div>
        </div>
      </div>
    )
  }
}
