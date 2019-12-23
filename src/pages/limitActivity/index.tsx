import React, { Component } from 'react';
import { Tabs, WhiteSpace, Badge, Toast } from 'antd-mobile';
import request from '@/services/active_request';
import Styles from './index.less';
import router from 'umi/router';

const tabs = [
    { title: "招募中" },
    { title: "已结束" },
    { title: "已参与" },
];

class LimitActivity extends Component {
    state = {
        data: [],
        data0: [],//1招募中 0已结束 2已参与
        data1: [],
        data2: []
    }
    componentDidMount() {
        this.redirectIdx(0);
    }
    redirectIdx = (idx: Number) => {
        if (idx == 0) { this.getData(1); }//1招募中
        else if (idx == 1) { this.getData(2); }//0已结束
        else if (idx == 2) { this.getData(3); }
    }

    getData = (type: Number) => {
        Toast.loading('');
        request({
            url: 'v3/recruitActivities',
            params: { status: type }
        }).then(res => {
            Toast.hide();
            if (type == 2) {//已结束
                let data0 = this.state.data0.concat(res.data);
                this.setState({ data0: data0, data: data0 });
            } else if (type == 1) {//1招募中
                let data1 = this.state.data1.concat(res.data);
                this.setState({ data1: data1, data: data1 });
            } else if (type == 3) {
                let data2 = this.state.data2.concat(res.data);
                this.setState({ data2: data2, data: data2 })
            }
        }).catch(err => {
            Toast.hide();
        })
    }
    goToActivityList = (id: Number | String) => {
        router.push({
            pathname: '/limitActivity/activityList',
            query: { id: id }
        })
    }
    render() {
        return (
            <div className={Styles.limit_activity_wrap}>
                <Tabs tabs={tabs}
                    initialPage={0}
                    tabBarActiveTextColor="#6AA4F6"
                    tabBarInactiveTextColor="#AAAAAA"
                    // tabBarUnderlineStyle={{width: '20%',height:"15px",backgroundColor:"#5BA2FA",margin: '0 auto'}}
                    tabBarUnderlineStyle={{ height: '.07rem', width: '1.03rem', background: '#6AA4F6', marginLeft: '.75rem', border: 'none', borderRadius: '8px' }}
                    onChange={(tab, index) => { this.redirectIdx(index) }}
                // onTabClick={(tab, index) => { this.redirectIdx(index) }}
                >

                    <div className={Styles.tab_recruit_wrap}>
                        {
                            this.state.data1.length > 0 ? this.state.data1.map((item: any, index: any) => {
                                return (
                                    <div className={Styles.content_wrap} key={item.id}>
                                        <div className={Styles.content_header}>
                                            <div className={Styles.content_title}>{item.name}</div>
                                            <div className={Styles.content_countdown}>招募倒计时：{item.last_day}天</div>
                                        </div>
                                        <div className={Styles.content_desc} style={{ WebkitBoxOrient: 'vertical' }}>
                                            活动简介：{item.introduce}
                                        </div>
                                        <div className={Styles.content_info}>
                                            <div className={Styles.content_tips}>您已发布{item.youhui_count}项优惠信息</div>
                                            <div className={Styles.content_btn} onClick={this.goToActivityList.bind(this, item.id)}>{item.youhui_count == 0 ? '立即参与' : '查看'}</div>
                                        </div>
                                    </div>
                                )
                            }) : <div style={{ textAlign: 'center' }}>暂无数据</div>
                        }
                    </div>

                    <div className={Styles.tab_complete_wrap}>
                        {
                            this.state.data0.length > 0 ? this.state.data0.map((item: any, index: any) => {
                                return (
                                    <div className={Styles.content_wrap} key={item.id}>
                                        <div className={Styles.complete_container}>
                                            <div className={Styles.content_header}>
                                                <div className={Styles.content_title}>{item.name}</div>
                                                <div className={Styles.content_complete}>已结束</div>
                                            </div>
                                            <div className={Styles.content_desc}>
                                                活动发布时间：{item.start_date}至{item.end_date}
                                            </div>
                                        </div>
                                        <div className={Styles.content_info}>
                                            <div className={Styles.content_tips}>您已发布{item.youhui_count}项优惠信息</div>
                                            {
                                                item.youhui_count != 0 ? <div className={Styles.content_btn} onClick={this.goToActivityList.bind(this, item.id)}>查看</div> : null
                                            }
                                        </div>
                                    </div>
                                )
                            }) : <div style={{ textAlign: 'center' }}>暂无数据</div>
                        }
                    </div>

                    <div className={Styles.tab_partake_wrap}>
                        {
                            this.state.data2.length > 0 ? this.state.data2.map((item: any, index: any) => {
                                return (
                                    <div className={Styles.content_wrap} key={item.id}>
                                        <div className={Styles.partake_container}>
                                            <div className={Styles.content_header}>
                                                <div className={Styles.content_title}>{item.name}</div>
                                                <div className={Styles.content_partake}>已参与</div>
                                            </div>
                                            <div className={Styles.content_desc}>
                                                活动发布时间：{item.start_date}至{item.end_date}
                                            </div>
                                        </div>
                                        <div className={Styles.content_info}>
                                            <div className={Styles.content_tips}>您已发布{item.youhui_count}项优惠信息</div>
                                            {
                                                item.youhui_count != 0 ? <div className={Styles.content_btn} onClick={this.goToActivityList.bind(this, item.id)}>查看</div> : null
                                            }
                                        </div>
                                    </div>
                                )
                            }) : <div style={{ textAlign: 'center' }}>暂无数据</div>
                        }
                    </div>

                </Tabs>
            </div>
        )
    }
}

export default LimitActivity;
