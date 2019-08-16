
/**
 * title: 线上卖券
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
    class OnlineSelling extends Component {
        state = {
            info: {
                money: 0,
                source: "",
                order_money: 0,
                activity_deduction_money: 0,
                cash_deduction_money: 0,
                deduction_coupon_money: 0,
                service_charge: 0,
                rate: "",
                create_time: "",
                order_sn: "",
                ad: "",
                type: 9,
                coupon_name: "",
                coupon_store_name: 0,
                earnings: 0,
                custom_money: 0,
                pay_type:""
            }
        };

        componentDidMount() {
         // console.log(this.props.location.query)
         Toast.loading('加载数据');
         let { _id } = this.props.location.query;
         request({
             url: 'v3/finance/finance_info',
             method: 'get',
             params: {
                 type: 5, //账单类型1=线下收银详情 2=费率返点详情 3=广告收益 4=优惠券收益 5=线上卖券 6=广告支出
                 log_id: _id,
                //  field_help: ""
             }
         }).then(res => {
             console.log(res);
             this.setState({info:res.data});
             Toast.hide();
         })
        }

        render() {
            return (
                <View className="D_offlineDeal" >
                    <View className="D_offlineDeal_title" >
                        <View className="D_offlineDeal_title_money">￥{this.state.info.money}</View>
                        <View className="D_offlineDeal_title_msg">交易成功</View>
                    </View>
                    <View className="D_offlineDeal_list" >
                        <View className="D_offlineDeal_list_box" >
                            <View className="D_offlineDeal_list_box_name">付款方式</View>
                            <View className="D_offlineDeal_list_box_msg">{this.state.info.pay_type}</View>
                        </View>
                        <View className="D_offlineDeal_list_box" >
                            <View className="D_offlineDeal_list_box_name">钱的去向</View>
                            <View className="D_offlineDeal_list_box_msg">{this.state.info.source}</View>
                        </View>

                        <View className="D_offlineDeal_list_box" >
                            <View className="D_offlineDeal_list_box_name">优惠券</View>
                            <View className="D_offlineDeal_list_box_msg">{this.state.info.coupon_name}</View>

                        </View>
                        <View className="D_offlineDeal_list_box" >
                            <View className="D_offlineDeal_list_box_name">订单金额</View>
                            <View className="D_offlineDeal_list_box_msg">{this.state.info.order_money}元</View>
                        </View>

                        <View className="D_offlineDeal_list_box" >
                            <View className="D_offlineDeal_list_box_name">手续费</View>
                            <View className="D_offlineDeal_list_box_msg">{this.state.info.service_charge}元</View>
                        </View>
                    </View>
                    <View className="D_offlineDeal_creat" >
                        <View className="D_offlineDeal_creat_box" >
                            <View className="D_offlineDeal_creat_name">创建时间</View>
                            <View className="D_offlineDeal_creat_msg">{this.state.info.create_time}</View>
                        </View>
                        <View className="D_offlineDeal_creat_box" >
                            <View className="D_offlineDeal_creat_name">订单号</View>
                            <View className="D_offlineDeal_creat_msg">{this.state.info.order_sn}</View>
                        </View>
                    </View>
                </View>
            );
        }
    }
);
