/**title: 优惠信息 */
import React, { Component } from 'react';
import { WingBlank, Flex, List, InputItem, ActionSheet, Toast } from 'antd-mobile';

import { connect } from 'dva';
import { View, Text, Button } from 'antd-mobile';
// import CashCoupon1 from '../component/cash-coupon1/index';
// import CashCoupon2 from '../component/cash-coupon2/index';

import AddressImg from '../component/img/address.png'
import MobileImg from '../component/img/dianhua.png'
import CollectImg from '../component/img/starcollect.png'
import './index.less';

export default class TicketBuy extends Component {

  state = {
    yPoint: 0,
    xPoint: 0,
    keepCollect_data: "",
    //表面收藏
    keepCollect_bull: false,
    coupon: {
      begin_time: "",
      brief: "",
      //真正的收藏
      collect: "0",
      description: "",
      end_time: "",
      icon: "h",
      id: 0,
      image: "",
      image_type: 1,
      list_brief: "",
      own: "",
      label: ['1'],
      pay_money: "",
      return_money: "",
      yname: "",
      youhui_type: 0,
      expire_day: ''
    },
    store: {
      brief: "",
      id: 717,
      open_time: "",
      route: "",
      saddress: "",
      sname: "",
      tel: "",
      distance: "",
      shop_door_header_img: ""
    },
    goods_album: [
      {
        id: 700,
        image_url: ""
      }
    ],
    recommend: [{
      begin_time: "",
      brief: "",
      end_time: "",
      id: 1283,
      list_brief: "",
      open_time: "",
      pay_money: "",
      return_money: "",
      sname: "",
      yname: "",
      youhui_type: 1,
      expire_day: '',
      total_fee: '',
      image: ''
    }]
  };

  render() {
    return (
      <View className="setMeal" >
        <View className="setMeal_hd" >
          <View className="setMeal_head">
            <View className="setMeal_head_ticket">
              <View className="setMeal_head_circle1"></View>
              <View className="setMeal_head_circle2"></View>
              <View className="setMeal_head_title">
                <View className="setMeal_head_shopname">洛溪路店</View>
                <View className="setMeal_head_shopstar">
                  <img src={CollectImg} />
                </View>
              </View>
              <View className="setMeal_head_msg">
                <View className="setMeal_head_msg_left">
                  <View className="setMeal_head_msg_left_money">￥50</View>
                  <View className="setMeal_head_msg_left_threshold">满100可用</View>
                </View>
                <View className="setMeal_head_msg_right">
                  <View className="setMeal_head_msg_right_days">购买后六天可用</View>
                  <View className="setMeal_head_msg_right_listbox">
                    <View className="setMeal_head_msg_right_list">可叠加</View>
                    <View className="setMeal_head_msg_right_list">免预约</View>
                    <View className="setMeal_head_msg_right_list">随时退</View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className="setMeal_store">
          <View className="setMeal_store_box">
            <View className="setMeal_store_title">适用店铺</View>
            <View className="setMeal_store_storebox">
              <View className="setMeal_store_img">
                <img src="http://n.sinaimg.cn/photo/transform/300/w150h150/20190610/a205-hyeztys3944198.jpg" alt="" />
              </View>
              <View className="setMeal_store_msg">
                <View className="setMeal_store_name">洛溪店</View>
                <View className="setMeal_store_price">人均：￥222</View>
              </View>
              <View className="setMeal_store_icon">
                >
              </View>
            </View>
            <View className="setMeal_store_addressbox">
              <View className="setMeal_store_distance">
                <View className="setMeal_store_distance_img">
                  <img src={AddressImg} />
                </View>
                <View className="setMeal_store_distance_info">2.6米</View>
              </View>
              <View className="setMeal_store_address">aaaaaaaaaaaa</View>
              <View className="setMeal_store_mobile">
                <img src={MobileImg} />
              </View>
            </View>
          </View>
        </View>
        <View className="setMeal_ticket">
          <View className="setMeal_ticket_more">更多本店宝贝</View>


          <View className="coupon1">
            <View className="imgbox">
              <View className="coupon_left">
              <img src="http://n.sinaimg.cn/photo/518/w311h207/20190323/JPCi-huqrnap4097130.jpg" alt="" />
              </View>
              <View className="coupon_right">
                <View className="coupon_right_title">洛溪路店</View>
                <View className="coupon_right_info" >xxxxxs试用套装</View>
                <View className="coupon_right_days" >购买后6日内有效</View>
                
                <View className="coupon_right_money" >￥30</View>
              </View>
            </View>
          </View>



          <View className="coupon2">
            <View className="imgbox">
              <View className="coupon_left">
                <View className="coupon_left_money">
                  <View className="coupon_left_money_icon">￥</View>
                  <View className="coupon_left_money_num">500</View>
                </View>
                <View className="coupon_left_threshold">满199可用</View>
              </View>
              <View className="coupon_right">
                <View className="coupon_right_titlebox">
                  <View className="coupon_right_titlebox_coupon"> 现金券</View>
                  <View className="coupon_right_titlebox_name">洛溪路店</View>
                </View>
                <View className="coupon_right_days" >购买后6日内有效</View>
                <View className="coupon_right_money" >￥30</View>
              </View>
            </View>
          </View>
        </View>
        <View className="paymoney_box">
          <View className="paymoney_price">
            <View className="paymoney_price_icon">￥</View>
            <View className="paymoney_price_num">10</View>
          </View>
          <View className="paymoney_buynow">立即购买</View>
        </View>
      </View>
    );
  }
}
