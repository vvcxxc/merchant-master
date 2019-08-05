/**title: 拼团活动预览 */
import React, { Component } from 'react';
import { Flex, WingBlank, DatePicker, List, InputItem, Icon, Toast, View } from 'antd-mobile';
import { Group } from '../../../model';
import { connect } from 'dva';
import share from '../image/share.png'
import AddressImg from '../image/address.png'
import MobileImg from '../image/dianhua.png'
import './index.less';


interface Props extends Group {
  dispatch: (arg0: any) => any;
}

export default connect(({ activity }: any) => activity)(
  class activityGroup extends Component<any>  {

    state = {
    };
    componentDidMount = () => {
      document.title = "五金店"
    };
    render() {
      return (
        <View className="d_group" >

          <View className="coupon_box">
            <View className="coupon_box_img">
              <img className="coupunimg" src="http://n.sinaimg.cn/photo/700/w1000h500/20190731/a0fe-iaqfzyv3176912.jpg" />
              <View className="group_head_bottom_share">
                <img className="shareimg" src={share} />
                分享
              </View>
              <View className="coupon_box_success">
                <img className="group_success_img" src={share} />
                杨文宝拼团成功
              </View>
            </View>
            <View className="coupon_box_title">
              <View className="group_coupon_title" >一颗红豆起司面包圈</View>
              <View className="group_rule_time" >
                <View className="group_rule_time_key" >活动时间:</View>
                <View className="group_rule_time_data" >2019.08.03-2019.08.04</View>
              </View>
              <View className="group_head_bottom">
                <View className="group_head_bottom_gift">送价值3000元耳机</View>
                <View className="group_head_bottom_list">3人团</View>
                <View className="group_head_bottom_list">24小时</View>
              </View>
              <View className="group_msg" >
                <View className="group_msg_titlebox" >商品详情</View>
                <View className="group_msg_giftinfo" >价值3000元的耳机一副</View>
                <View className="group_msg_giftlist" >
                  <img className="group_msg_giftlistImg" src="http://n.sinaimg.cn/photo/transform/700/w1000h500/20190731/5d60-iaqfzyv3096478.jpg" />
                  <img className="group_msg_giftlistImg" src="http://n.sinaimg.cn/photo/transform/700/w1000h500/20190731/5d60-iaqfzyv3096478.jpg" />
                </View>
              </View>
            </View>
          </View>
          <View className="group_gift" >
            <View className="group_gift_titlebox" >
              <View className="group_gift_title" >赠送礼品</View>
              <View className="group_gift_imglist" >图文详情</View>
            </View>
            <View className="group_gift_giftinfo" >价值3000元的耳机一副</View>
            <View className="group_gift_giftmsgbox" >
              <View className="group_gift_giftmsg" >运费8元</View>
            </View>
            <View className="group_gift_giftlist" >
              <img className="group_gift_giftlistImg" src="http://n.sinaimg.cn/photo/transform/700/w1000h500/20190731/5d60-iaqfzyv3096478.jpg" />
            </View>
          </View>
          <View className="group_process" >
            <View className="group_process_list" >
              <View className="group_process_list_img" ></View>
              <View className="group_process_list_msg" >
                <View>开始</View>
                <View>拼团</View>
              </View>
              <View className="group_process_list_icon" >></View>
            </View>
            <View className="group_process_list" >
              <View className="group_process_list_img" ></View>
              <View className="group_process_list_msg" >
                <View> 邀请</View>
                <View>好友</View>
              </View>
              <View className="group_process_list_icon" >></View>
            </View>
            <View className="group_process_list" >
              <View className="group_process_list_img" ></View>
              <View className="group_process_list_msg" >
                <View>使用</View>
                <View>送礼</View>
              </View>
              <View className="group_process_list_icon" ></View>
            </View>
          </View>




          <View className="group_num" >
            <View className="group_num_titlebox" >
              <View className="group_num_title" >4人正在拼</View>
              <View className="group_num_now" >正在拼团</View>
            </View>
            <View className="group_listbox" >
              <View className="group_list" >
                <View className="group_list_img" >
                  <img src="http://n.sinaimg.cn/photo/transform/300/w150h150/20190610/a205-hyeztys3944198.jpg" alt="" />
                </View>
                <View className="group_list_name" >杨大富</View>
                <View className="group_list_btnbox" >
                  <View className="group_list_btn" >立即参团</View>
                </View>
                <View className="group_list_timesbox" >
                  <View className="group_list_lack" >
                    <View className="group_list_lackredblack1" >还差</View>
                    <View className="group_list_lackred" >1人</View>
                    <View className="group_list_lackredblack2" >拼成</View>
                  </View>
                  <View className="group_list_times" >23.50.30</View>
                </View>
              </View>
              <View className="group_list" >
                <View className="group_list_img" >
                  <img src="http://n.sinaimg.cn/photo/transform/300/w150h150/20190610/a205-hyeztys3944198.jpg" alt="" />
                </View>
                <View className="group_list_name" >杨大富</View>
                <View className="group_list_btnbox" >
                  <View className="group_list_btn" >立即参团</View>
                </View>
                <View className="group_list_timesbox" >
                  <View className="group_list_lack" >
                    <View className="group_list_lackredblack1" >还差</View>
                    <View className="group_list_lackred" >1人</View>
                    <View className="group_list_lackredblack2" >拼成</View>
                  </View>
                  <View className="group_list_times" >23.50.30</View>
                </View>
              </View>
            </View>
          </View>
          <View className="appre_rule" >
            <View className="appre_rule_title" >拼团规则</View>
            <View className="appre_rule_people" >
              <View className="appre_rule_people_key" >拼团人数:</View>
              <View className="appre_rule_people_data" >3人团</View>
            </View>
            <View className="appre_rule_time" >
              <View className="appre_rule_time_key" >拼团时间:</View>
              <View className="appre_rule_time_data" >24小时内</View>
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
              <View className="paymoney_price_num">100</View>
              <View className="paymoney_price_oldprice">￥300</View>
              <View className="paymoney_price_info">(含8元运费)</View>
            </View>
            <View className="paymoney_buynow">立即购买</View>
            <View className="paymoney_groupnow">发起拼团</View>
            
            
          </View>

        </View >
      );
    }
  }
);