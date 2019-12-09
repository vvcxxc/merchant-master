import React, { Component } from 'react';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';

import Styles from './index.less';

const tabs = [
    { title: "招募中" },
    { title: "已结束" },
    { title: "已参与" },
];


class LimitActivity extends Component {
    render() {
        return (
            <div className={Styles.limit_activity_wrap}>
                <Tabs tabs={tabs}
                    initialPage={0}
                    tabBarActiveTextColor="#5BA2FA"
                    tabBarInactiveTextColor="#AAAAAA"
                    // tabBarUnderlineStyle={{width: '20%',height:"15px",backgroundColor:"#5BA2FA",margin: '0 auto'}}
                    tabBarUnderlineStyle={{ height: '.03rem', width: '1.03rem', background: '#5BA2FA', marginLeft: '.75rem' }}
                    onChange={(tab, index) => { console.log('onChange', index, tab); }}
                    onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                >
                    <div className={Styles.tab_recruit_wrap}>
                        <div className={Styles.content_wrap}>
                            <div className={Styles.content_header}>
                                <div className={Styles.content_title}>《10月份鹰潭地区免费推广活动》</div>
                                <div className={Styles.content_countdown}>招募倒计时：3天</div>
                            </div>
                            <div className={Styles.content_desc} style={{ WebkitBoxOrient: 'vertical' }}>
                                活动简介：平台免费给商家引流，发布你的优惠券，我们将以支付作为出口派送给本地消费者很多很多
                            </div>
                            <div className={Styles.content_info}>
                                <div className={Styles.content_tips}>您已发布3项优化信息</div>
                                <div className={Styles.content_btn}>查看</div>
                            </div>
                        </div>
                        <div className={Styles.content_wrap}>
                            <div className={Styles.content_header}>
                                <div className={Styles.content_title}>《10月份鹰潭地区免费推广活动》</div>
                                <div className={Styles.content_countdown}>招募倒计时：3天</div>
                            </div>
                            <div className={Styles.content_desc} style={{ WebkitBoxOrient: 'vertical' }}>
                                活动简介：平台免费给商家引流，发布你的优惠券，我们将以支付作为出口派送给本地消费者很多很多
                            </div>
                            <div className={Styles.content_info}>
                                <div className={Styles.content_tips}>您已发布3项优化信息</div>
                                <div className={Styles.content_btn}>查看</div>
                            </div>
                        </div>
                        <div className={Styles.content_wrap}>
                            <div className={Styles.content_header}>
                                <div className={Styles.content_title}>《10月份鹰潭地区免费推广活动》</div>
                                <div className={Styles.content_countdown}>招募倒计时：3天</div>
                            </div>
                            <div className={Styles.content_desc} style={{ WebkitBoxOrient: 'vertical' }}>
                                活动简介：平台免费给商家引流，发布你的优惠券，我们将以支付作为出口派送给本地消费者很多很多
                            </div>
                            <div className={Styles.content_info}>
                                <div className={Styles.content_tips}>您已发布3项优化信息</div>
                                <div className={Styles.content_btn}>查看</div>
                            </div>
                        </div>
                    </div>

                    <div className={Styles.tab_complete_wrap}>
                        <div className={Styles.content_wrap}>
                            <div className={Styles.complete_container}>
                                <div className={Styles.content_header}>
                                    <div className={Styles.content_title}>《10月份鹰潭地区免费推广活动》</div>
                                    <div className={Styles.content_complete}>已结束</div>
                                </div>
                                <div className={Styles.content_desc}>
                                    活动发布时间：2019-10-10至2019-11-11
                                </div>
                            </div>
                            <div className={Styles.content_info}>
                                <div className={Styles.content_tips}>您已发布3项优化信息</div>
                                <div className={Styles.content_btn}>查看</div>
                            </div>
                        </div>
                        <div className={Styles.content_wrap}>
                            <div className={Styles.complete_container}>
                                <div className={Styles.content_header}>
                                    <div className={Styles.content_title}>《10月份鹰潭地区免费推广活动》</div>
                                    <div className={Styles.content_complete}>已结束</div>
                                </div>
                                <div className={Styles.content_desc}>
                                    活动发布时间：2019-10-10至2019-11-11
                                </div>
                            </div>
                            <div className={Styles.content_info}>
                                <div className={Styles.content_tips}>您已发布3项优化信息</div>
                                <div className={Styles.content_btn}>查看</div>
                            </div>
                        </div>
                        <div className={Styles.content_wrap}>
                            <div className={Styles.complete_container}>
                                <div className={Styles.content_header}>
                                    <div className={Styles.content_title}>《10月份鹰潭地区免费推广活动》</div>
                                    <div className={Styles.content_complete}>已结束</div>
                                </div>
                                <div className={Styles.content_desc}>
                                    活动发布时间：2019-10-10至2019-11-11
                                </div>
                            </div>
                            <div className={Styles.content_info}>
                                <div className={Styles.content_tips}>您已发布3项优化信息</div>
                                <div className={Styles.content_btn}>查看</div>
                            </div>
                        </div>
                    </div>

                    <div className={Styles.tab_partake_wrap}>
                        <div className={Styles.content_wrap}>
                            <div className={Styles.partake_container}>
                                <div className={Styles.content_header}>
                                    <div className={Styles.content_title}>《10月份鹰潭地区免费推广活动》</div>
                                    <div className={Styles.content_partake}>已参与</div>
                                </div>
                                <div className={Styles.content_desc}>
                                    活动发布时间：2019-10-10至2019-11-11
                                </div>
                            </div>
                            <div className={Styles.content_info}>
                                <div className={Styles.content_tips}>您已发布3项优化信息</div>
                            </div>
                        </div>
                        <div className={Styles.content_wrap}>
                            <div className={Styles.partake_container}>
                                <div className={Styles.content_header}>
                                    <div className={Styles.content_title}>《10月份鹰潭地区免费推广活动》</div>
                                    <div className={Styles.content_partake}>已参与</div>
                                </div>
                                <div className={Styles.content_desc}>
                                    活动发布时间：2019-10-10至2019-11-11
                                </div>
                            </div>
                            <div className={Styles.content_info}>
                                <div className={Styles.content_tips}>您已发布3项优化信息</div>
                            </div>
                        </div>
                        <div className={Styles.content_wrap}>
                            <div className={Styles.partake_container}>
                                <div className={Styles.content_header}>
                                    <div className={Styles.content_title}>《10月份鹰潭地区免费推广活动》</div>
                                    <div className={Styles.content_partake}>已参与</div>
                                </div>
                                <div className={Styles.content_desc}>
                                    活动发布时间：2019-10-10至2019-11-11
                                </div>
                            </div>
                            <div className={Styles.content_info}>
                                <div className={Styles.content_tips}>您已发布3项优化信息</div>
                            </div>
                        </div>
                    </div>
                </Tabs>
            </div>
        )
    }
}

export default LimitActivity;