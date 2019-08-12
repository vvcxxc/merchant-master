/**
 * title: 优惠券收益
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
    class CouponRevenue extends Component {
        state = {
            info: {
                coupon_name: "优惠券名称",
coupon_store_name: 222,
create_time: "2019-08-08 17:49:10",
earnings: 111,
money: 111,
order_sn: "B39324245434523452532",
            }
        };

        componentDidMount() {
            // console.log(this.props.location.query)
            let { _id } = this.props.location.query;
            request({
                url: 'v3/finance/finance_info',
                method: 'get',
                params: {
                    type: 4, //账单类型1=线下收银详情 2=费率返点详情 3=广告收益 4=优惠券收益 5=线上卖券 6=广告支出
                    log_id: _id,
                    // field_help: ""
                }
            }).then(res => {
                console.log(res);
                this.setState({ info: res.data });
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
                            <View className="D_offlineDeal_list_box_name">券发布者</View>
                            <View className="D_offlineDeal_list_box_msg">{this.state.info.coupon_store_name}</View>
                        </View>
                        <View className="D_offlineDeal_list_box" >
                            <View className="D_offlineDeal_list_box_name">收益</View>
                            <View className="D_offlineDeal_list_box_msg">{this.state.info.earnings}元</View>
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
