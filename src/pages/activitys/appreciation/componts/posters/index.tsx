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
    const canvas: any = document.getElementById('canvas');

    // const canvas:any = document.cre

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
          <div className={styles.hide_canvas_box} >
            <canvas id="canvas" width="565px;" height="726px" />
          </div>
          <div className={styles.canvas_box} >
            <img src={this.state.url} alt="" />
          </div>
          <div className={styles.save}>
            <Button className={styles.save_img}>长按图片保存</Button>
          </div>
          <div className={styles.describe}>保存图片到相册，你可以分享海报</div>
          <div className={styles.line}>{null}</div>
        </div>
      </div>
    )
  }
}
