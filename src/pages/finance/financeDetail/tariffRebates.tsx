/**
 * title: 费率返点
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
    class TariffRebates extends Component {
        state = {
            info: {
                create_time: "",
                custom_money: 0,
                money: 0,
                order_money: 0,
                order_sn: "",
                source: "",
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
                    type: 2, //账单类型1=线下收银详情 2=费率返点详情 3=广告收益 4=优惠券收益 5=线上卖券 6=广告支出
                    log_id: _id,
                    // field_help: ""
                }
            }).then(res => {
                this.setState({ info: res.data });
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
                            <View className="D_offlineDeal_list_box_name">订单号</View>
                            <View className="D_offlineDeal_list_box_msg">{this.state.info.order_sn}</View>
                        </View>
                        <View className="D_offlineDeal_list_box" >
                            <View className="D_offlineDeal_list_box_name">订单金额</View>
                            <View className="D_offlineDeal_list_box_msg">{this.state.info.order_money}元</View>
                        </View>

                        <View className="D_offlineDeal_list_box" >
                            <View className="D_offlineDeal_list_box_name">返点</View>
                            <View className="D_offlineDeal_list_box_msg">{this.state.info.custom_money}元</View>
                        </View>
                    </View>
                    <View className="D_offlineDeal_creat" >
                        <View className="D_offlineDeal_creat_box" >
                            <View className="D_offlineDeal_creat_name">创建时间</View>
                            <View className="D_offlineDeal_creat_msg">{this.state.info.create_time}</View>
                        </View>
                    </View>
                </View>
            );
        }
    }
);
