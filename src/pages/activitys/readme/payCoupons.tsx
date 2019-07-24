/**title: 下单返券 */

import React, { Component } from 'react';
import { View } from 'antd-mobile';
import router from 'umi/router';
import img0 from "./pay_coupons.png"

export default class payCoupons extends Component {
    state = {

    };
    componentDidMount() {
    }
    render() {
        return (
            <View style={{ width: "100%", height: "auto", fontSize: "0" }}>
                <img src={img0} style={{ width: "100%" }} />
                <View style={{ width: "100%", padding: "100px 80px", boxSizing: "border-box", background: "#21418A" ,marginTop:"-5px"}}
                    onClick={() => { router.push('/activitys/payment') }}>
                    <View
                        style={{ color: "#fff",background:"#F55641", fontSize: "55px", height: "120px", textAlign: "center", lineHeight: "120px", borderRadius: "60px" }}
                    >添加活动</View>
                </View>
            </View>
        )
    }
}
