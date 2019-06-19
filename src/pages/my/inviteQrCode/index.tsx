/**
 * 店铺邀请二维码
 */

import React, {Component} from 'react';
import styles from './index.less';
import { Flex, WingBlank, Toast } from 'antd-mobile';
import request from '@/services/request';
import QRCode from 'qrcode'

export default class InviteQrCode extends Component {
  state = {
    url: '',
    invite_count: '',
    invite_profit: ''
  }
  componentDidMount (){
    request ({
      url: 'api/merchant/invite',
      method: 'get',
    }).then(res => {
      let { code, data } = res;
      this.setState({
        invite_count: data.invite_count,
        invite_profit: data.invite_profit
      })
      if(code == 200){
        let phone = data.invite_phone;
        QRCode.toDataURL('http://test.supplierv2.tdianyi.com/login/register?phone='+phone)
        .then((url: any) => {
          this.setState({
            url
          })
        })
        .catch((err: any) => {})
      }else{
        Toast.fail('暂无')
      }
    })
  }

  render (){
    const { invite_profit, invite_count } = this.state;
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
             <img src={this.state.url}/>
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
              <p>成功邀请(人)</p>
              <p className={styles.num}>{invite_count}</p>
            </div>
            <div>
              <p>我的分成(元)</p>
              <p className={styles.num}>{invite_profit}</p>
            </div>
          </Flex>
        </div>

    )
  }
}
