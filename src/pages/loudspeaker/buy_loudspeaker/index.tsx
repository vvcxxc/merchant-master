/**title: 购买云音箱 */
import React, { Component } from 'react';
import { Flex, Checkbox, WingBlank, Button, Icon, InputItem, PickerView, List } from 'antd-mobile';
import request from '@/services/request';
import wx from 'weixin-js-sdk';
import router from 'umi/router';
import MapPage from '@/components/map/index';
import axios from 'axios';
import styles from './index.less';
import { spawn } from 'child_process';

export default class BuyLoudSpeaker extends Component {

  state = {
    list: [
      { value: '设备型号', color: '#e3eaef' },
      { value: '设备信息设备信息设备信息', color: '#fff' },
      { value: '￥100.00', color: '#fff' }
    ],
    detailAddress: '',
    is_map: false,
    city_list: [],
    value: ['广东省', '广州市', '天河区'],
    is_show: false,
    checked: false
  }

  componentDidMount() {
    axios({
      url: 'http://test.api.tdianyi.com/v3/district',
      method: 'get'
    }).then(res => {
      this.setState({
        city_list: res.data.data
      })
    });
  }

  handleChange = () => {

  }

  /**显示地区筛选 */
  openMap = () => {
    this.setState({ is_show: true });
  }

  pickerCityClose = () => {
    this.setState({ is_show: false, value: [] });
  }
  pickerCityOpen = () => {
    this.setState({ is_show: true })
  }
  handleChangeCity = (e: any) => {
    this.setState({ value: e })
  }

  pickerCityOk = () => {
    console.log(this.state.value, 'value');

    this.setState({ is_show: false })
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

  payment() {
    let _type:number;
    let browserType = this.getBrowserType();
    if (browserType == 'wechat') {
      _type = 1;
    } else if (browserType == 'alipay') {
      _type = 2;
    } 
    let datas = {
        //传递给后台的数据
    }
    //请求支付属性
    request({
      url: 'v1/youhui/wxXcxuWechatPay',
      method: "POST",
      data: JSON.stringify(datas)
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

  render() {
    const { list } = this.state
    const picker = this.state.is_show == true ? (
      <div className={styles.picker}>
        <Flex className={styles.picker_buttons}>
          <span onClick={this.pickerCityClose}>取消</span>
          <span onClick={this.pickerCityOk}>完成</span>
        </Flex>
        <PickerView
          onChange={this.handleChangeCity}
          data={this.state.city_list}
          value={this.state.value}
        />
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
            <img src={require('../../../assets/share1.png')} alt="" />
          </div>
          <ul className={styles.equipment_right}>
            {
              list.map((value, index) => {
                return <li key={index} style={{ color: value.color }}>{value.value}</li>
              })
            }
          </ul>
        </div>

        <div className={styles.info_title}>收货信息</div>
        <Flex className={styles.inputWrap}>
          <span>收货人</span>
          <input
            type="text"
            placeholder='请填写收货人姓名'
            value={this.state.detailAddress}
            onChange={this.handleChange.bind(this)}
          />
        </Flex>
        <Flex className={styles.inputWrap}>
          <span>手机号码</span>
          <input
            type="text"
            placeholder='请填写收货人手机号'
            value={this.state.detailAddress}
            onChange={this.handleChange.bind(this)}
          />
        </Flex>
        <List.Item
          arrow="horizontal"
          extra={<div>99998999989989898989789</div>}
          onClick={this.openMap}
        >
          所在地区
       </List.Item>
        <Flex className={styles.inputWrap}>
          <span>详细地址</span>
          <input
            type="text"
            placeholder='街道、楼牌号等'
            value={this.state.detailAddress}
            onChange={this.handleChange.bind(this)}
          />
        </Flex>
        <div className={styles.check_equipment}>
          <CheckboxItem
            key={this.state.checked}
            onChange={() => this.onChange}
            defaultChecked={true}
          >
            {'设备协议'}
          </CheckboxItem>
        </div>

        <div className={styles.In_box} >
          {picker}
        </div>

        <div className={styles.buy_speakers_foot}>
          <div>￥<span>100.00</span></div>
          <span className={styles.onclick_box}>
            确认
          </span>
        </div>
      </div>
    )
  }
}