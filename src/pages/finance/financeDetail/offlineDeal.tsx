/**
 * title: 线下交易
 */
import React, { Component } from 'react';
import { Flex, WingBlank, Icon, Toast, View } from 'antd-mobile';
import verificationImage from '../assets/varied/verification@2x.png';
import { connect } from 'dva';
import router from 'umi/router';
import { Data } from '@/models/app';
import { routerRedux } from 'dva/router';
import request from '@/services/request';
import './index.less';

interface Props {
    data: Data;
    dispatch: (arg0: any) => any;
}

export default connect(({ finance }: any) => finance)(
    class OfflineDeal extends Component {
        state = {

        };

        componentDidMount() {
            // console.log(this.props.route.title)
            
        }

        render() {
            return (
                <View className="D_offlineDeal" >
                    <View className="D_offlineDeal_title" >
                        <View className="D_offlineDeal_title_money">￥218.80</View>
                        <View className="D_offlineDeal_title_msg">交易成功</View>
                    </View>
                    <View className="D_offlineDeal_list" >
                        <View className="D_offlineDeal_list_box" >
                            <View className="D_offlineDeal_list_box_name">付款方式</View>
                            <View className="D_offlineDeal_list_box_msg">微信/支付宝/团卖</View>
                        </View>
                        <View className="D_offlineDeal_list_box" >
                            <View className="D_offlineDeal_list_box_name">钱的去向</View>
                            <View className="D_offlineDeal_list_box_msg">微信</View>
                        </View>

                        <View className="D_offlineDeal_list_box" >
                            <View className="D_offlineDeal_list_box_name">订单金额</View>
                            <View className="D_offlineDeal_list_box_msg">301元</View>
                        </View>

                        <View className="D_offlineDeal_list_box" >
                            <View className="D_offlineDeal_list_box_name">活动抵扣</View>
                            <View className="D_offlineDeal_list_box_msg">-2元(满100-2)</View>
                        </View>

                        <View className="D_offlineDeal_list_box" >
                            <View className="D_offlineDeal_list_box_name">现金券抵扣</View>
                            <View className="D_offlineDeal_list_box_msg">-100元(优惠券抵扣)</View>
                        </View>


                        <View className="D_offlineDeal_list_box" >
                            <View className="D_offlineDeal_list_box_name">现金券</View>
                            <View className="D_offlineDeal_list_box_msg">20元</View>

                        </View>
                        <View className="D_offlineDeal_list_box" >
                            <View className="D_offlineDeal_list_box_name">手续费</View>
                            <View className="D_offlineDeal_list_box_msg">-0.2元(费率6%)</View>
                        </View>
                    </View>
                    <View className="D_offlineDeal_creat" >
                        <View className="D_offlineDeal_creat_box" >
                            <View className="D_offlineDeal_creat_name">创建时间</View>
                            <View className="D_offlineDeal_creat_msg">2019-05-09  10:55</View>
                        </View>
                        <View className="D_offlineDeal_creat_box" >
                            <View className="D_offlineDeal_creat_name">订单号</View>
                            <View className="D_offlineDeal_creat_msg">15645431646131313131</View>
                        </View>
                    </View>
                </View>
            );
        }
    }
);
