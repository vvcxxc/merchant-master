/**title: 创建必读 */

import React, { Component } from 'react';
import { View } from 'antd-mobile';
import router from 'umi/router';
import img0 from "./readme.png"

export default class BusinessArea extends Component {
    state = {

    };
    componentDidMount() {
    }
    render() {
        return (
            <View style={{ width: "100%", height: "auto", fontSize: "0" }}>
                <img src={img0} style={{ width: "100%" }} />
                <View style={{ width: "100%", padding: "65px 40px", boxSizing: "border-box", background: "#21418A" }}
                    onClick={() => { router.push('/ad/business-area') }}>
                    <View
                        style={{ color: "#fff", border: "2px solid #fff", fontSize: "28px", height: "80px", textAlign: "center", lineHeight: "80px", borderRadius: "40px", fontWeight: "bold", background: "#21418A" }}
                    >我要去投放广告  》</View>
                </View>
            </View>
        )
    }
}
