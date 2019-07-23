/**
 * title: 广告收益
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
    class AdvertisingRevenue extends Component {
        state = {

        };

        componentDidMount() {
            // console.log(this.props.route.title)
        }

        render() {
            return (
                <View className="D_offlineDeal" >
                    <View className="D_offlineDeal_title" >
                        <View className="D_offlineDeal_title_money">广告</View>
                        <View className="D_offlineDeal_title_msg">15645431646131313131</View>
                    </View>
                    <View className="D_offlineDeal_list" >
                        <View className="D_offlineDeal_list_box" >
                            <View className="D_offlineDeal_list_box_name">广告发布者</View>
                            <View className="D_offlineDeal_list_box_msg">空空店铺</View>
                        </View>
                        <View className="D_offlineDeal_list_box" >
                            <View className="D_offlineDeal_list_box_name">收益</View>
                            <View className="D_offlineDeal_list_box_msg">0.20元</View>
                        </View>
                    </View>
                    <View className="D_offlineDeal_creat" >
                        <View className="D_offlineDeal_creat_box" >
                            <View className="D_offlineDeal_creat_name">创建时间</View>
                            <View className="D_offlineDeal_creat_msg">2019-05-09  10:55</View>
                        </View>
                    </View>
                </View>
            );
        }
    }
);
