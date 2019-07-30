/**title: 优惠信息 */
import React, { Component } from 'react';
import { WingBlank, Flex, List, InputItem, ActionSheet, Toast } from 'antd-mobile';
import { CouponForm } from '../model';
import { connect } from 'dva';
import { View, Text, Button } from 'antd-mobile';
// import CashCoupon1 from '../component/cash-coupon1/index';
// import CashCoupon2 from '../component/cash-coupon2/index';

import AddressImg from '../img/address.png'
import MobileImg from '../img/dianhua.png'
import CollectImg from '../img/starcollect.png'
import './index.less';


interface Props extends CouponForm {
  dispatch: (arg0: any) => any;
  showPrice: boolean;
}

export default connect(({ createCoupon }: any) => createCoupon.couponForm)(
  class SetMea extends Component<Props>  {

    state = {
    };
    componentDidMount = () => {
      console.log(this.props)
    };
    render() {
      return (
        <View className="setMeal" >
          <View className="coupon_box">
            <View className="coupon_box_img">
              <img src={this.props.image} />
            </View>
            <View className="coupon_box_msg">
              <View className="coupon_box_msg_title">{this.props.coupons_name}
                {/* <View className="coupon_box_msg_collect">
                  <img src={CollectImg} />
                </View> */}

              </View>
              {/* <View className="coupon_box_msg_brief">xxxxxs试用套装xxxxxs试用套装xxxxxs试用套装xxxxxs试用套装xxxxxs试用套装xxxxxs试用套装xxxxxs试用套装</View> */}

              <View className="setMeal_head_listbox">
                <View className="setMeal_head_list">可叠加</View>
                <View className="setMeal_head_list">免预约</View>
                <View className="setMeal_head_list">随时退</View>
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

          <View className="setMeal_rule">
            <View className="setMeal_rule_title">购买须知</View>
            <View className="setMeal_rule_days">有效期</View>
            <View className="setMeal_rule_days_info">购买后{this.props.validity}日内可用</View>
            <View className="setMeal_rule_brief">使用规则：</View>
            <View className="setMeal_rule_list_box">
              {
                this.props.description.map((item) => {
                  return <View className="setMeal_rule_list" key={item} >{item}</View>
                })
              }

            </View>
          </View>

          <View className="setMeal_brief">
            <View className="setMeal_brief_title">图文详情</View>
            <View className="setMeal_brief_list_box">
              {
                this.props.image_url.map((item) => {
                 return <View className="setMeal_brief_list" key={item}>
                    <img src={item} />
                  </View>
                })
              }


            </View>
          </View>
          <View className="setMeal_ticket">
            <View className="setMeal_ticket_more">更多本店宝贝</View>


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

            <View className="coupon1">
              <View className="imgbox">
                <View className="coupon_left">
                  <img src={this.props.image} alt="" />
                </View>
                <View className="coupon_right">
                  <View className="coupon_right_title">洛溪路店</View>
                  <View className="coupon_right_info" >试用套装</View>
                  <View className="coupon_right_days" >购买后6日内有效</View>
                  <View className="coupon_right_money" >￥30</View>
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