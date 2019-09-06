/**title: 增值活动预览 */
import React, { Component } from 'react';
import { Flex, WingBlank, DatePicker, List, InputItem, Icon, Toast, View } from 'antd-mobile';
import { connect } from 'dva';
import share from '../image/share.png'
import AddressImg from '../image/address.png'
import MobileImg from '../image/dianhua.png'
import briefimg from '../image/brief2.png'
import './index.less';

import { Appreciation } from '../../../model';

import moment from 'moment';


interface Props extends Appreciation {
  dispatch: (arg0: any) => any;
  showPrice: boolean;
}


export default connect(({ activity }: any) => activity.Appreciation)(
  class Appre extends Component<any>  {

    state = {
    };
    componentDidMount = () => {
      console.log(moment(this.props.start_date).format('YYYY-MM-DD'))
      document.title = "五金店"
    };
    render() {
      return (
        <View className="d_appre" >
          <View className="appre_hd" >
            <View className="appre_head">
              <View className="appre_head_ticket">
                <View className="appre_head_circle1"></View>
                <View className="appre_head_circle2"></View>
                <View className="appre_head_left">
                  <View className="appre_head_left_pricebox">
                    <View className="appre_head_left_pricebox_price">￥{this.props.start_price}</View>
                    <View className="appre_head_left_pricebox_msg">起始值</View>
                  </View>
                  <View className="appre_head_left_pricebox_info">最高可抵{this.props.end_price}元 </View>
                </View>
                <View className="appre_head_right">
                  <View className="appre_head_right_total">满{this.props.total_fee}元可用</View>
                  <View className="appre_head_right_days">领取后{this.props.validity}日内有效</View>
                </View>
              </View>
              <View className="appre_head_bottom">
                <View className="appre_head_bottom_gift">送价值3000元耳机</View>
                <View className="appre_head_bottom_list">随时用</View>
                <View className="appre_head_bottom_share">
                  <img src={share} />
                  分享</View>
              </View>
            </View>
          </View>
          <View className="appre_gift" >
            <View className="appre_gift_titlebox" >
              <View className="appre_gift_title" >赠送礼品</View>
              <View className="appre_gift_imglist" >图文详情</View>
            </View>
            <View className="appre_gift_giftinfo" >价值3000元的耳机一副</View>
            <View className="appre_gift_giftmsgbox" >
              <View className="appre_gift_giftmsg" >运费8元</View>
            </View>
            <View className="appre_gift_giftlist" >
              <img className="appre_gift_giftlistImg" src="http://n.sinaimg.cn/photo/transform/700/w1000h500/20190731/5d60-iaqfzyv3096478.jpg" />
            </View>
          </View>
          {/* <View className="appre_process" >
            <View className="appre_process_list" >
              <View className="appre_process_list_img" ></View>
              <View className="appre_process_list_msg" >
                <View> 增值</View>
                <View>购买</View>
              </View>
              <View className="appre_process_list_icon" >
                <View className="appre_process_list_icon_tri" ></View>
              </View>
            </View>
            <View className="appre_process_list" >
              <View className="appre_process_list_img" ></View>
              <View className="appre_process_list_msg" >
                <View> 邀请</View>
                <View>好友</View>
              </View>
              <View className="appre_process_list_icon" >
                <View className="appre_process_list_icon_tri" ></View>
              </View>
            </View>
            <View className="appre_process_list" >
              <View className="appre_process_list_img" ></View>
              <View className="appre_process_list_msg" >
                <View> 帮助</View>
                <View>增值</View>
              </View>
              <View className="appre_process_list_icon" >
                <View className="appre_process_list_icon_tri" ></View>
              </View>
            </View>
            <View className="appre_process_list" >
              <View className="appre_process_list_img" ></View>
              <View className="appre_process_list_msg" >
                <View> 随时</View>
                <View>可用</View>
              </View>
              <View className="appre_process_list_icon" >
              </View>
            </View>
          </View> */}
          <View className="appre_process2" >
            <img className="appre_process2_img" src={briefimg} />
          </View>
          <View className="appre_rule" >
            <View className="appre_rule_title" >温馨提示</View>
            <View className="appre_rule_time" >
              <View className="appre_rule_time_key" >活动时间:</View>
              <View className="appre_rule_time_data" >{moment(this.props.start_date).format('YYYY-MM-DD')} - {moment(this.props.end_date).format('YYYY-MM-DD')}</View>
            </View>
            <View className="appre_rule_list" >
              <View className="appre_rule_list_key" >使用规则:</View>
              <View className="appre_rule_list_data" >
                <View className="appre_rule_list_msg" >. 11111111111</View>
                <View className="appre_rule_list_msg" >. 11111111111</View>
                <View className="appre_rule_list_msg" >. 之前为了解决问题百度到了一篇很好的博文, 具有BFC特性的元素可以看作是隔离了的独立容器,</View>
                <View className="appre_rule_list_msg" >. 11111111111</View>
                <View className="appre_rule_list_msg" >. 11111111111</View>
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

          <View className="paymoney_box">
            <View className="paymoney_price">
              <View className="paymoney_price_icon">￥</View>
              <View className="paymoney_price_num">{this.props.pay_money}</View>
              <View className="paymoney_price_info">(含8元运费)</View>
            </View>
            <View className="paymoney_buynow">立即购买</View>
          </View>
        </View>
      );
    }
  }
);