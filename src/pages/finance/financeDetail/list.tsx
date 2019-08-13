
import React, { Component } from 'react';
import { Toast, View } from 'antd-mobile';
import { connect } from 'dva';
import { Data } from '@/models/app';
import request from '@/services/request';
import './index.less';

interface Props {
    data: Data;
    dispatch: (arg0: any) => any;
}

export default connect(({ finance }: any) => finance)(
    class List extends Component {
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
                ad_issue:"",
                pay_type:""

            },
            id: 0,
            type: 0

        };

        componentDidMount() {
            Toast.loading('加载数据');
            let { _id, _type } = this.props.location.query;
            switch (_type) {
                case 1: document.title = "线下收银"; break;
                case 2: document.title = "商家返点"; break;
                case 3: document.title = "广告收益"; break;
                case 4: document.title = "优惠券分润"; break;
                case 5: document.title = "线上卖券"; break;
                case 6: document.title = "广告购买"; break;
                default: return
            }
            request({
                url: 'v3/finance/finance_info',
                method: 'get',
                params: {
                    type: _type, //账单类型1=线下收银详情 2=费率返点详情 3=广告收益 4=优惠券收益 5=线上卖券 6=广告支出
                    log_id: _id,
                }
            }).then(res => {
                console.log(res);
                this.setState({ info: res.data, id: _id, type: _type });
                Toast.hide();
            })
        }

        render() {
            return (
                <View>

                    {
                        //线下收银
                        this.state.type == 1 ? <View className="D_offlineDeal" >
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
                                    <View className="D_offlineDeal_list_box_name">订单金额</View>
                                    <View className="D_offlineDeal_list_box_msg">{this.state.info.order_money}元</View>
                                </View>

                                <View className="D_offlineDeal_list_box" >
                                    <View className="D_offlineDeal_list_box_name">活动抵扣</View>
                                    <View className="D_offlineDeal_list_box_msg">{this.state.info.activity_deduction_money}元</View>
                                </View>

                                <View className="D_offlineDeal_list_box" >
                                    <View className="D_offlineDeal_list_box_name">现金券抵扣</View>
                                    <View className="D_offlineDeal_list_box_msg">{this.state.info.cash_deduction_money}元</View>
                                </View>


                                <View className="D_offlineDeal_list_box" >
                                    <View className="D_offlineDeal_list_box_name">现金券</View>
                                    <View className="D_offlineDeal_list_box_msg">{this.state.info.deduction_coupon_money}元</View>

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
                        </View> : null
                    }
                    {
                        //费率返点
                        this.state.type == 2 ? <View className="D_offlineDeal" >
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
                        </View> : null
                    }
                    {
                        //广告收益
                        this.state.type == 3 ? <View className="D_offlineDeal" >
                            <View className="D_offlineDeal_title" >
                                <View className="D_offlineDeal_title_money">广告</View>
                                <View className="D_offlineDeal_title_msg">{this.state.info.ad}</View>
                            </View>
                            <View className="D_offlineDeal_list" >
                                <View className="D_offlineDeal_list_box" >
                                    <View className="D_offlineDeal_list_box_name">广告发布者</View>
                                    <View className="D_offlineDeal_list_box_msg">{this.state.info.ad_issue}</View>
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
                        </View> : null
                    }
                    {
                        //优惠券收益
                        this.state.type == 4 ? <View className="D_offlineDeal" >
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
                        </View> : null
                    }
                    {
                        //线上卖券
                        this.state.type == 5 ? <View className="D_offlineDeal" >
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
                        </View> : null
                    }
                    {
                        //广告支出
                        this.state.type == 6 ? <View className="D_offlineDeal" >
                            <View className="D_offlineDeal_title" >
                                <View className="D_offlineDeal_title_money">￥{this.state.info.money}</View>
                                <View className="D_offlineDeal_title_msg">交易成功</View>
                            </View>
                            <View className="D_offlineDeal_list" >
                                <View className="D_offlineDeal_list_box" >
                                    <View className="D_offlineDeal_list_box_name">广告</View>
                                    <View className="D_offlineDeal_list_box_msg">{this.state.info.ad}</View>
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
                        </View> : null
                    }
                </View>
            );
        }
    }
);
