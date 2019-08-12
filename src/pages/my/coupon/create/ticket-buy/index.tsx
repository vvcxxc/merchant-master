/**title: 优惠信息 */
import React, { Component } from 'react';
import { WingBlank, Flex, List, InputItem, ActionSheet, Toast } from 'antd-mobile';

import { connect } from 'dva';
import { MoneyForm } from '../model';
import { View, Text, Button } from 'antd-mobile';

import AddressImg from '../img/address.png'
import MobileImg from '../img/dianhua.png'
import CollectImg from '../img/starcollect.png'
import './index.less';


interface Props extends MoneyForm {
  dispatch: (arg0: any) => any;
  showPrice: boolean;
}
export default connect(({ createCoupon }: any) => createCoupon.moneyForm)(
  class TicketBuy extends Component<Props> {

    state = {
    };
    componentDidMount = () => {
      console.log(this.props)
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
                  {/* <View className="setMeal_head_shopstar">
                    <img src={CollectImg} />
                  </View> */}
                </View>
                <View className="setMeal_head_msg">
                  <View className="setMeal_head_msg_left">
                    <View className="setMeal_head_msg_left_money">￥{this.props.return_money}</View>
                    <View className="setMeal_head_msg_left_threshold">满{this.props.total_fee}可用</View>
                  </View>
                  <View className="setMeal_head_msg_right">
                    <View className="setMeal_head_msg_right_days">购买后{this.props.validity}日内可用</View>
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
                  {/* <View className="setMeal_store_price">人均：￥222</View> */}
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

            <View className="coupon2">
              <View className="imgbox">
                <View className="coupon_left">
                  <View className="coupon_left_money">
                    <View className="coupon_left_money_icon">￥</View>
                    <View className="coupon_left_money_num">50</View>
                  </View>
                  <View className="coupon_left_threshold">满199可用</View>
                </View>
                <View className="coupon_right">
                  <View className="coupon_right_titlebox">
                    <View className="coupon_right_titlebox_coupon"> 现金券</View>
                    <View className="coupon_right_titlebox_name">洛溪路店</View>
                  </View>
                  <View className="coupon_right_days" >购买后6日内有效</View>
                  <View className="coupon_right_money" >￥10</View>
                </View>
              </View>
            </View>
            <View className="coupon1">
              <View className="imgbox">
                <View className="coupon_left">
                  <img src="" alt="" />
                </View>
                <View className="coupon_right">
                  <View className="coupon_right_title">洛溪路店</View>
                  <View className="coupon_right_info" >试用套装</View>
                  <View className="coupon_right_days" >购买后10日内有效</View>

                  <View className="coupon_right_money" >￥10</View>
                </View>
              </View>
            </View>

          </View>
          <View className="paymoney_box">
            <View className="paymoney_price">
              <View className="paymoney_price_icon">￥</View>
              <View className="paymoney_price_num">{this.props.pay_money}</View>
            </View>
            <View className="paymoney_buynow">立即购买</View>
          </View>
        </View>
      );
    }
  }
);