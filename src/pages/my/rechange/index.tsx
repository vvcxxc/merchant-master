/**title: 充值 */

import React, { Component } from 'react';
import styles from './index.less';
import { WingBlank, Flex, InputItem, Button, Toast } from 'antd-mobile';
import request from '@/services/request';
import Cookies from 'js-cookie';
declare global {
  interface Window { open_id: string; pay_url: string; Url: string }
}
const Url = window.url ? window.url : 'http://test.api.tdianyi.com/';
const open_id = window.open_id ? window.open_id : 'test_open_id';
export default class Rechange extends Component {

  state = { money: '' };
  /**input change */
  handleInputChange = (value: any) => {
    if (value.split(".")[1] == undefined || (value.split(".")[1].length <= 2 && value.split(".")[2] == undefined)) {
      this.setState({ money: value });
    }
  }
  /** recahnge submit value */
  /** recahnge submit value */
  submit = async () => {
    console.log(this.state.money);
    if (Number(this.state.money) == 0 || this.state.money == undefined || isNaN(Number(this.state.money))) {
      Toast.fail('请输入充值金额', 1.5);
    } else {
      let openId = Cookies.get(open_id)
      // 判断是否授权
      if (openId) {
        Toast.loading('充值中');
        const res = await request({
          url: 'v3/pay/recharge',
          method: 'post',
          data: {
            xcx: 0,
            rechargeMoney: this.state.money,
            open_id: openId
          }
        });

        Toast.hide();

        if (res.code === 200) {
          window.WeixinJSBridge.invoke('getBrandWCPayRequest', res.data, function (res: { err_msg: string }) {
            ``;
            if (res.err_msg == 'get_brand_wcpay_request:ok') {
              // '支付成功'
              Toast.success('充值成功', 1.5);
            } else {
              Toast.fail('充值失败', 1.5);
            }
          });

          Toast.hide();
        } else {
          this.auth()
        }
      } else {
        this.auth()
      }
    }
  };

  // 授权
  auth = () => {
    let from = window.location.href;
    let url = Url + 'wechat/wxoauth?code_id=0&from=' + from;
    url = encodeURIComponent(url);
    let urls =
      'http://wxauth.tdianyi.com/index.html?appid=wxecdd282fde9a9dfd&redirect_uri=' +
      url +
      '&response_type=code&scope=snsapi_userinfo&connect_redirect=1&state=STATE&state=STATE';
    return (window.location.href = urls);
  }
  render() {
    return (
      <div className={styles.page}>
        <WingBlank>
          <div className="title">充值金额</div>
          <Flex className="input-wrap">
            <span className="symbol">￥</span>
            <Flex.Item>
              <InputItem type="money" placeholder="" onChange={this.handleInputChange} value={this.state.money} clear />
            </Flex.Item>
          </Flex>
          <Button type="primary" onClick={this.submit}>
            充值
					</Button>
        </WingBlank>
      </div>
    );
  }
}
