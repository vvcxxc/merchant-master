/**
 * 店铺邀请二维码
 */

import React, {Component} from 'react';
import styles from './index.less';
import { Flex, WingBlank } from 'antd-mobile';
import request from '@/services/request';
import QRCode from 'qrcode.react';

export default class InviteQrCode extends Component {
  state = {

  }
  componentDidMount (){
    request ({
      url: 'api/merchant/invite',
      method: 'get',
    }).then(res => {
      // console.log(res)
    })
  }

  render (){
    return (
        <div className={styles.pages}>
          <Flex style={{marginTop: 41}} justify='around'>
            <div className={styles.title}>
              <p>邀请店铺</p>
              <p>领好礼</p>
            </div>
          </Flex>
          <WingBlank className={styles.qrCode}>
            <Flex className={styles.qrImg} justify='around'>
              <QRCode value="http://facebook.github.io/react/" size={450} renderAs='canvas'/>
            </Flex>
            <WingBlank className={styles.tips}>
              <p>1、点击右上角分享邀请链接，朋友通过链接注册</p>
              <p>2、分享个人邀请二维码，朋友扫码注册</p>
            </WingBlank>
          </WingBlank>
          <Flex style={{marginTop: 30, color: '#fff', fontSize: '24px'}} justify='around'>长按图片即可保存二维码</Flex>
          <Flex style={{marginTop: 70, color: '#fff', fontSize: '32px'}} justify='around'>我的邀请</Flex>
          <Flex className={styles.my_invite} justify='around'>
            <div>
              <p>成功邀请（人）</p>
              <p className={styles.num}>20</p>
            </div>
            <div>
              <p>我的分成（元）</p>
              <p className={styles.num}>2000</p>
            </div>
          </Flex>
        </div>

    )
  }
}
