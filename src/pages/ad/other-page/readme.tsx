/**title: 创建必读 */

import React, { Component } from 'react';
import { View } from 'antd-mobile';
import router from 'umi/router';
import img0 from "./readme.png";
import leftimg from "./left.png";
import rightimg from "./right.png";

import './readme.less';
import { Carousel, WingBlank } from 'antd-mobile';

export default class BusinessArea extends Component {
    state = {

    };
    componentDidMount() {
    }

    goBack = (item: any) => {
        router.push({ pathname: '/ad/other-page', query: { type: item } });
    }
    render() {
        return (
            <View className="readme_content">
                <img className="readme_background" src={img0} />
                <View className="readme_box"  >
                    <View className="readme_titel"  >
                        <View className="readme_titel_name" >
                            <span  className="lineimg" >
                                <img src={leftimg} />
                            </span>
                            <View className="readme_titel_contentbox">
                                <View className="readme_titel_brief1" >

                                    已有</View>
                                <View className="readme_titel_num" >512</View>
                                <View className="readme_titel_brief2" >人参与投放</View>
                            </View>
                            <span className="lineimg" >
                                <img src={rightimg}  />
                            </span>
                        </View>
                        <View className="readme_titel_list" >
                            <WingBlank>
                                <Carousel className="my-carousel"
                                    vertical
                                    dots={false}
                                    dragging={false}
                                    swiping={false}
                                    autoplay
                                    infinite
                                >
                                    <div className="v-item">carousel 1</div>
                                    <div className="v-item">carousel 2</div>
                                    <div className="v-item">carousel 3</div>
                                </Carousel>
                            </WingBlank>


                        </View>
                    </View>
                    <View className="readme_box1" >
                        <View className="readme_box1_name" >钻石展位</View>
                        <View className="readme_box1_go" onClick={this.goBack.bind(this, '钻石展位')}>我要去投放广告 >></View>
                    </View>
                    <View className="readme_box2" >
                        <View className="readme_box2_name" >铂金展位</View>
                        <View className="readme_box2_go" onClick={this.goBack.bind(this, '铂金展位')}>我要去投放广告 >></View>
                    </View>
                    <View className="readme_box3" >
                        <View className="readme_box3_name" >黄金展位</View>
                        <View className="readme_box3_go" onClick={this.goBack.bind(this, '黄金展位')}>我要去投放广告 >></View>
                    </View>
                </View>
            </View>
        )
    }
}
