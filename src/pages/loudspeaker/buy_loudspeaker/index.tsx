/**title: 购买云音箱 */
import React, { Component } from 'react';
import { Flex, Checkbox, WingBlank, Button, Icon, InputItem, PickerView, List, Toast } from 'antd-mobile';
import request from '@/services/request';
import wx from 'weixin-js-sdk';
import router from 'umi/router';
import MapPage from '@/components/map/index';
import axios from 'axios';
import styles from './index.less';
import speakersRequest from '@/services/speakersRequest'
import { spawn } from 'child_process';
import Cookies from 'js-cookie';
declare global {
  interface Window { open_id: string; pay_url: string; Url: string }
}
const open_id = window.open_id ? window.open_id : 'test_open_id';
interface stateType {
  is_map: boolean,
  city_list: any,
  is_show: boolean,
  checked: boolean,
  shopInfo: any,
  customer_name: string,
  customer_phone: string,
  customer_area: Array<string>,
  customer_address: string,
  show_customer_area:string
}
export default class BuyLoudSpeaker extends Component {

  state: stateType = {
    is_map: false,
    city_list: [],
    is_show: false,
    checked: false,
    shopInfo: {},//购买商品所有信息
    customer_name: '',
    customer_phone: '',
    customer_area: ['广东省', '广州市', '天河区'],
    customer_address: '',
    show_customer_area:''
  }

  componentDidMount() {
    this.getListData()
    axios({
      url: 'http://test.api.tdianyi.com/v3/district',
      method: 'get'
    }).then(res => {
      this.setState({
        city_list: res.data.data
      })
    });
  }

  getListData = () => {
    speakersRequest({
      url: 'api/v1/voice',
      method: 'get'
    }).then(res => {
      const { data, status_code } = res
      if (status_code === 200 || status_code === 304) {
        this.setState({
          shopInfo: data[0]
        })
      }
    })
  }

  /**显示地区筛选 */
  openMap = () => {
    this.setState({ is_show: true });
  }

 
  pickerCityOpen = () => {
    this.setState({ is_show: true })
  }

  // 地区选择滑动赋值
  handleChangeCity = (e: any) => {
    this.setState({ customer_area: e })
  }

  //确认选择地区
  pickerCityOk = () => {
    const { customer_area } = this.state
    this.setState({ is_show: false })
    this.setState({
      show_customer_area: customer_area[0] + ' ' + customer_area[1] + ' ' + customer_area[2]
    })
  }
  //取消选择地区
  pickerCityClose = () => {
    this.setState({ is_show: false, customer_area: [],show_customer_area:'' });
  }

  onChange = () => {
    this.setState({ checked: true })
  }

  getBrowserType = () => {
    switch (true) {
      case navigator.userAgent.toLowerCase().indexOf('micromessenger') > 0:
        return 'wechat'
      case navigator.userAgent.toLowerCase().indexOf('alipay') > 0:
        return 'alipay'
      default:
        return 'alipay'
    }
  }

  payment = (order_num:any)=> {
    let _type: number;
    let browserType = this.getBrowserType();
    if (browserType == 'wechat') {
      _type = 1;
    } else if (browserType == 'alipay') {
      _type = 2;
    }

    let openid = Cookies.get(open_id)

    // let datas = {
    //   //传递给后台的数据
    // }
    //请求支付属性
    // request({
    //   url: 'v1/youhui/wxXcxuWechatPay',
    //   method: "POST",
    //   data: JSON.stringify(datas)
    // })/api/v1/voice/pay
    
    speakersRequest({
      url: 'api/v1/voice/pay',
      method: "POST",
      data: {
        order_num,
        openid
      }
    })
      .then((res: any) => {
        if (_type == 1) {
          //微信支付
          window.WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
            "appId": res.data.appId,
            "timeStamp": res.data.timeStamp,
            "nonceStr": res.data.nonceStr,
            "package": res.data.package,
            "signType": res.data.signType,
            "paySign": res.data.paySign
          },
            function (res) {
              //微信支付成功
              if (res.err_msg == "get_brand_wcpay_request:ok") {

              } else {
                //微信支付失败
              }
            }
          );
        } else if (_type == 2) {
          //支付宝支付
          window.AlipayJSBridge.call('tradePay', {
            tradeNO: res.data.alipayOrderSn, // 必传，此使用方式下该字段必传
          }, res => {
            //支付宝支付成功
            if (res.resultCode === "9000") {

            } else {
              //支付宝支付失败
            }
          })
        } else {
          console.log(_type)
        }
      })
  }

  //传递用户购买信息给后台
  buyShop = () => {
    const { customer_address,
      show_customer_area,
      customer_name, customer_phone,shopInfo } = this.state
    if (!customer_address || !show_customer_area || !customer_name || !customer_phone) {
      Toast.fail('收货信息未填写完整')
      return
    }
    speakersRequest({
      url: 'api/v1/voice/buy',
      method: 'post',
      params: {
        name: customer_name,
        phone: customer_phone,
        area: show_customer_area,
        address: customer_address,
        voice_box_id:shopInfo.id
      }
    }).then(res => {
      const { data, status_code } = res
      this.payment({ order_num: data.order_num})
    })
  }

  //输入用户姓名
  inputCustomer_name = (e:any) => {
    this.setState({ customer_name: e.target.value})
  }
  //输入用户电话
  inputCustomer_phone = (e:any) => {
    this.setState({ customer_phone: e.target.value })
  }
  //输入用户详细地址
  inputCustomer_address = (e:any) => {
    this.setState({ customer_address: e.target.value })
  }

  stopPassing = (e:any) => {
    e.stopPropagation()
  }

  render() {
    const { shopInfo, customer_area, show_customer_area} = this.state
    const picker = this.state.is_show == true ? (
      <div className={styles.picker_box} onClick = {this.pickerCityClose}>
        <div className={styles.picker} onClick={this.stopPassing.bind(this)}>
          <Flex className={styles.picker_buttons}>
            <span onClick={this.pickerCityClose}>取消</span>
            <span onClick={this.pickerCityOk}>完成</span>
          </Flex>
          <PickerView
            onChange={this.handleChangeCity}
            data={this.state.city_list}
            value={this.state.customer_area}
          />
        </div>
      </div>
    ) : (
        ''
      );
    const CheckboxItem = Checkbox.CheckboxItem;
    return (
      <div className={styles.buy_speakers}>
        <div className={styles.buy_title}>设备信息</div>

        <div className={styles.equipment}>
          <div className={styles.equipment_left}>
            <img src={shopInfo.image} alt="" />
          </div>
          <ul className={styles.equipment_right}>
            <li>{shopInfo.name}</li>
            <li><span>￥</span>{shopInfo.price}</li>
          </ul>
        </div>

        <div className={styles.info_title}>收货信息</div>
        <Flex className={styles.inputWrap}>
          <span>收货人</span>
          <input
            type="text"
            placeholder='请填写收货人姓名'
            value={this.state.customer_name}
            onChange={this.inputCustomer_name}
          />
        </Flex>
        <Flex className={styles.inputWrap}>
          <span>手机号码</span>
          <input
            type="text"
            placeholder='请填写收货人手机号'
            value={this.state.customer_phone}
            onChange={this.inputCustomer_phone}
          />
        </Flex>
        <List.Item
          arrow="horizontal"
          extra={<div>{show_customer_area}</div>}
          onClick={this.openMap}
        >
          所在地区
       </List.Item>
        <Flex className={styles.inputWrap}>
          <span>详细地址</span>
          <input
            type="text"
            placeholder='街道、楼牌号等'
            value={this.state.customer_address}
            onChange={this.inputCustomer_address}
          />
        </Flex>
        {/* 暂时注释，等待提供协约信息 */}
        {/* <div className={styles.check_equipment}>
          <CheckboxItem
            key={this.state.checked}
            onChange={() => this.onChange}
            defaultChecked={true}
          >
            {'设备协议'}
          </CheckboxItem>
        </div> */}
        {picker}

        <div className={styles.buy_speakers_foot}>
          <div>￥<span>{shopInfo.price}</span></div>
          <span onClick={this.buyShop} className={styles.onclick_box}>
            确认
          </span>
        </div>
      </div>
    )
  }
}