/**
 * title: 支付邮费
 */

import React, { Component } from 'react';
import { Flex, WingBlank, Button, Toast} from 'antd-mobile';
import styles from './index.less';
import Cookies from 'js-cookie';
import axios from 'axios';
import router from 'umi/router'

interface Props {
  list: any;
  type: string;
}
declare global {
  interface Window { open_id: string; pay_url: string;}
}
const pay_url = window.pay_url ? window.pay_url : 'http://test.api.tdianyi.com/payCentre/toSupplierWxPay'
const open_id = window.open_id ? window.open_id : 'test_open_id';
export default class PayMent extends Component<Props> {

  state = {
    list: {
      money: 0,
      number: 0,
      order_sn: '',
      payMoney: 0
    }
  };
  componentDidMount (){
    // console.log(this.props.type)
    this.setState({
      list: this.props.list
    })
  }

  submit = async() => {
    let { list } = this.state;
    let openId = Cookies.get(open_id)
    const res = await axios({
      url: pay_url,
      method: 'post',
      headers: {
        Authorization: localStorage.getItem('token')
      },
      data: {
        type: '10',
        public_type_id: list.order_sn,
        number: '1',
        open_id: openId,
        xcx: '0'
      }
    });
    let {data, code} = res.data;
    if(code == 200){
      let _this = this;
      window.WeixinJSBridge.invoke('getBrandWCPayRequest', data, function(res: { err_msg: string }) {
				``;
				if (res.err_msg == 'get_brand_wcpay_request:ok') {
          // '支付成功'
          if(_this.props.type == 'group'){
            Toast.success('支付成功',2,()=>{
              router.push('/activity/group')
            })
          }else{
            Toast.success('支付成功',2,()=>{
              router.push('/activitys/appreciation');
            })
          }
				}
			});
    }

  }

  render (){
    return (
      <div style={{width: '100%', height: '100%', background: '#fff', position: 'absolute', top: '0'}}>
        <Flex className={styles.title}>付款金额</Flex>
        <Flex className={styles.money}>￥{this.state.list.payMoney}</Flex>
        <WingBlank style={{marginTop: 84}}>
          <Flex className={styles.list}>
            <div>邮费</div>
            <div style={{fontSize: '0.23rem', color: '#999999'}}>{this.state.list.money}元</div>
          </Flex>
          <Flex className={styles.list}>
            <div>数量</div>
            <div style={{fontSize: '0.23rem', color: '#999999'}}>{this.state.list.number}张</div>
          </Flex>
          <Flex className={styles.pay_type}>
            支付方式
          </Flex>
          <Flex className={styles.wechat_type}>
            <Flex className={styles.flex}>
              <img src={require('./wechat.png')}/>
              <span>微信支付</span>
            </Flex>
            <Flex className={styles.flex}>
              <img src={require('./choose.png')}/>
            </Flex>
          </Flex>
          <Button type="primary" style={{ marginTop: 187 }} onClick={this.submit}>
            提交订单
          </Button>
        </WingBlank>
      </div>
    )
  }
}
