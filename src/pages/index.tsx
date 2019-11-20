/**title: 小熊敬礼 */

import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, Icon, Toast, Grid } from 'antd-mobile';
import verificationImage from '../assets/varied/verification@2x.png';
import { connect } from 'dva';
import router from 'umi/router';
import { Data } from '@/models/app';
import { routerRedux } from 'dva/router';
import request from '@/services/request';
import wx from 'weixin-js-sdk';
import Cookies from 'js-cookie';
declare global {
    interface Window { open_id: string; pay_url: string; Url: string }
}
const Url = window.url ? window.url : 'http://test.api.tdianyi.com/';
const open_id = window.open_id ? window.open_id : 'test_open_id';


const data1 = Array.from(new Array(6)).map(() => ({
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
  }));
interface Props {
    data: Data;
    dispatch: (arg0: any) => any;
}
export default connect(({ app }: any) => app)(
    class IndexPage extends Component<Props> {
        /**是否显示核销的界面 */
        state = {
            showVerification: false,
            //支付开通状态
            payment_status: {},
            reason: '',
            is_show: false
        };

        componentWillMount() {
            // 给两个用于海报使用
            localStorage.setItem('QL_headImg', 'refresh')
            localStorage.setItem('QL_giftImg', 'refresh')
            request({
                url: 'v3/payment_profiles/payment_status',
                method: 'get'
            }).then(res => {
                let { data } = res;
                let reason = '';
                if (data.apply_store_status.store_open_status == 0) {
                    router.push('/createStore');
                } else if (data.apply_store_status.store_open_status == 2) {
                    router.push('/review');
                } else if (data.apply_store_status.store_open_status == 1) {
                    router.push('/review');
                } else {
                    if (data.payment_status.payment_open_status == 0) {
                        reason = '请您提交经营资质，完成入驻'
                        this.setState({ is_show: true });
                    } else if (data.payment_status.payment_open_status == 1) {
                        reason = '资料审核中'
                        this.setState({ is_show: true });
                    } else if (data.payment_status.payment_open_status == 2) {
                        reason = '资质审核失败，查看详情'
                        this.setState({ is_show: true });
                    }
                }
                this.setState({
                    reason
                })
            }).catch(err => {
                console.log(err)
            });
            let userAgent = navigator.userAgent;
            let isIos = userAgent.indexOf('iPhone') > -1;
            let url: any;
            if (isIos) {
                url = sessionStorage.getItem('url');
            } else {
                url = location.href;
            }
            // request({
            //     url: 'wechat/getShareSign',
            //     method: 'get',
            //     params: {
            //         url
            //     }
            // }).then(res => {
            //     let _this = this;
            //     wx.config({
            //         debug: false,
            //         appId: res.appId,
            //         timestamp: res.timestamp,
            //         nonceStr: res.nonceStr,
            //         signature: res.signature,
            //         jsApiList: ['getLocation', 'openLocation', 'scanQRCode']
            //     });
            // }).catch(err => {
            //     console.log(err)
            // });
        }

        componentDidMount() {
            let openId = Cookies.get(open_id);
            if (process.env.NODE_ENV != 'development') {
                if (!openId) {
                    this.auth()
                }
            }
            this.props.dispatch({
                type: 'app/getData'
            });
        }

        /**跳转到页面 */
        pushPage = (pathname: string) => () => this.props.dispatch(routerRedux.push({ pathname }));

        /**核销 */
        handleVerification = () => this.setState({ showVerification: !this.state.showVerification });
        /**跳转到任意页面 */
        toPage = (item: any) => () => {
            switch (item.name) {
                case '商圈广告':
                    router.push('/ad/business-area');
                    break;
                case '黄金展位':
                case '铂金展位':
                case '钻石展位':
                    router.push({ pathname: '/ad/other-page', query: { type: item.name } });
                    break;
                case '好友增值':
                    router.push('/activitys/appreciation/createAppreciation');
                    break;
                case '社区拼团':
                    router.push('/activitys/group/createGroup');
                    break;
                case '满减活动':
                    router.push('/activitys/money-off/create');
                    break;
                case '提现记录':
                    router.push('/my/withdraw/list');
                    break;
                case '店内领券':
                    router.push('/my/coupon/create');
                    break;
                case '财务统计':
                    router.push('/finance/statistics');
                    break;
                case '支付返券':
                    router.push('/activitys/payment/create');
                    break;
                case '线下收银':
                    router.push('/my/benefit');
                    break;
                case '核销记录':
                    router.push('/verification');
                    break;
                case '我的收益':
                    router.push('/my/platformBenefit');
                    break;
                case '抽奖核销记录':
                    router.push('/verificationPrize');
                    break;
            }
        };
        // 授权
        auth = () => {
            let from = window.location.href;
            let url = Url + 'wechat/wxoauth?code_id=0&from=' + from;
            url = encodeURIComponent(url);
            let urls =
                'http://wxauth.tdianyi.com/index.html?appid=wxecdd282fde9a9dfd&redirect_uri=' +
                url +
                '&response_type=code&scope=snsapi_userinfo&connect_redirect=1&state=STATE&state=STATE';
            return (window.location.href = urls);
        }

        /**点击核销 */
        Verification = () => {
            wx.scanQRCode({
                needResult: 1,
                desc: 'scanQRCode desc',
                success: ({ resultStr }: any) => {
                    let res = JSON.parse(resultStr);
                    if (res.verificationType && res.verificationType == "Prize") {
                        //核销奖品
                        request({
                            url: 'v3/activity/verification',
                            method: 'PUT',
                            data: {
                                id: res.id
                            }
                        }).then(res => {
                            if (res.code == 200) {
                                Toast.success(res.message, 2, () => {
                                    router.push({
                                        pathname: '/verificationPrize',
                                    })
                                });
                            } else {
                                Toast.fail(res.message);
                            }
                        }).catch(err => {
                            console.log(err)
                        });
                    } else {
                        //核销
                        request({
                            url: 'api/merchant/youhui/userConsume',
                            method: 'post',
                            data: {
                                code: res.youhui_sn
                            }
                        }).then(res => {
                            if (res.code == 200) {
                                Toast.success(res.message, 2, () => {
                                    router.push({
                                        pathname: '/verification/success',
                                        query: {
                                            youhui_log_id: res.data.youhu_log_id
                                        }
                                    })
                                });
                            } else {
                                Toast.fail(res.message);
                            }
                        }).catch(err => {
                            console.log(err)
                        });
                    }
                }
            });
        };

        /**审核页面 */
        verificationPage = () =>
            this.state.showVerification ? (
                <Flex className={styles.verificationPage} justify="end" direction="column">
                    <Flex className="icons">
                        <Flex.Item>
                            <Flex justify="center" direction="column" onClick={this.Verification}>
                                <img src={require('../assets/menu/15.png')} />
                                扫码验证
							</Flex>
                        </Flex.Item>
                        <Flex.Item>
                            <Flex
                                justify="center"
                                direction="column"
                                onClick={this.pushPage('/verification/inputcode')}
                            >
                                <img src={require('../assets/menu/16.png')} />
                                输码验证
							</Flex>
                        </Flex.Item>
                    </Flex>
                    <Flex className="close-icon" align="center" justify="center">
                        <Icon type="cross-circle-o" color="rgba(0, 0, 0, 0.2)" onClick={this.handleVerification} />
                    </Flex>
                </Flex>
            ) : null;
        render() {
            const { data } = this.props;
            const mapIcons = (list: Array<any>) =>
                list.map(_ => (
                    <Flex direction="column" justify="center" key={_.name} onClick={this.toPage(_)} className={styles.ad_management}>
                        <img src={_.small_icon} className="icon_img" />
                        <div className="item_name">{_.name}</div>
                    </Flex>
                ));
            const title =
                this.state.is_show == true ? (
                    <Flex className={styles.header_title} justify="between" onClick={this.pushPage('/review')}>
                        {this.state.reason}
                        <Icon type="right" color="#FF6734" />
                    </Flex>
                ) : null;
            return (
                <div className={styles.page}>
                    {/* 数字信息 */}
                    {title}
                    {/* <div className={styles.numberInfo}>
                        <Flex justify="center">
                            <div className="matter">
                                <Flex align="end" justify="center">
                                    <span className="label">余额</span>
                                    <span className="value">{data.money}</span>
                                </Flex>
                                <Flex justify="center">
                                    <div className="btn" onClick={this.pushPage('/my/withdraw')}>
                                        提现
									</div>
                                    <div className="btn" onClick={this.pushPage('/my/rechange')}>
                                        充值
									</div>
                                </Flex>
                            </div>
                        </Flex>
                    </div> */}
                    <div className={styles.benefit_info}>
                        <Flex justify="around">
                            <div className={styles.today_income}>
                                <Flex>
                                    <div className={styles.today_income_title}>
                                        今日收入（元）
                                    </div>
                                    <img src={require('@/assets/index/arrow_icon.png')} className={styles.arrow_icon} alt="" />
                                </Flex>
                                <div className={styles.today_income_money}>5000.00</div>
                            </div>
                            <div className={styles.divider}></div>
                            <div className={styles.business_num}>
                                <Flex>
                                    <div className={styles.business_num_title}>
                                        交易笔数（元）
                                    </div>
                                    <img src={require('@/assets/index/arrow_icon.png')} className={styles.arrow_icon} alt="" />
                                </Flex>
                                <div className={styles.business_num_money}>500</div>
                            </div>
                        </Flex>
                    </div>
                    {/* 页面内容 */}
                    <WingBlank className={styles.content}>
                        <div className={styles.box}>
                            <div className="inside">
                                <Flex direction="column" justify="center" className={styles.financial_statistics} onClick={() => router.push('/finance/statistics')}>
                                    <div className="item_info">财务统计</div>
                                </Flex>
                                <Flex direction="column" justify="center" className={styles.fund_trends}>
                                    <div className="item_info">资金动态</div>
                                </Flex>
                                <Flex direction="column" justify="center" className={styles.withdraw_record} onClick={() => router.push('/my/withdraw/list')}>
                                    <div className="item_info">提现记录</div>
                                </Flex>
                                <Flex direction="column" justify="center" className={styles.verification_record} onClick={() => router.push('/verification')}>
                                    <div className="item_info">核销记录</div>
                                </Flex>
                                <Flex direction="column" justify="center" className={styles.ad_consume}  onClick={() => router.push('/AdvertisingSpending')}>
                                    <div className="item_info">广告消费</div>
                                </Flex>
                                <Flex direction="column" justify="center" className={styles.my_profit} onClick={() => router.push('/my/platformBenefit')}>
                                    <div className="item_info">我的收益</div>
                                </Flex>
                            </div>
                        </div>
                        <div className={styles.box}>
                            <div className="title">活动管理</div>
                            <div className="inside">
                                <Flex direction="column" justify="start" className="item_detail" onClick={this.pushPage('/my/coupon/create')}>
                                    <img src={require('@/assets/index/in_store_return.png')} className="icon_img" alt="" />
                                    <div className="item_name">店内发券</div>
                                </Flex>
                                <Flex direction="column" justify="start" className="item_detail" onClick={this.pushPage('/activitys/payment/create')}>
                                    <img src={require('@/assets/index/payment_coupon.png')} className="icon_img" alt="" />
                                    <div className="item_name">支付返券</div>
                                </Flex>
                                <Flex direction="column" justify="start" className="item_detail" onClick={this.pushPage('/activitys/appreciation/createAppreciation')}>
                                    <img src={require('@/assets/index/friend_appreciation.png')} className="icon_img" alt="" />
                                    <div className="item_name">好友增值</div>
                                </Flex>
                                <Flex direction="column" justify="start" className="item_detail" onClick={this.pushPage('/activitys/group/createGroup')}>
                                    <img src={require('@/assets/index/community group.png')} className="icon_img" alt="" />
                                    <div className="item_name">社区拼团</div>
                                </Flex>
                                <Flex direction="column" justify="start" className="item_detail" onClick={this.pushPage('/activitys/money-off/create')}>
                                    <img src={require('@/assets/index/full_scale_activities.png')} className="icon_img" alt="" />
                                    <div className="item_name">满减活动</div>
                                </Flex>
                                <Flex direction="column" justify="start" className="item_detail">
                                    <img src={require('@/assets/index/expect_more.png')} className="icon_img" alt="" />
                                    <div className="item_name">期待更多</div>
                                </Flex>
                            </div>
                        </div>
                        <div className={styles.box_ad}>
                            <div className="title">广告管理</div>
                            <div className="inside">{mapIcons(data.ad_management)}</div>
                        </div>
                        {/* <div className={styles.box}>
                            <div className="title">资产管理</div>
                            <div className="inside">{mapIcons(data.property_management)}</div>
                        </div> */}
                        {/* <Grid data={data1} columnNum={3} /> */}
                    </WingBlank>
                    {/* 核销按钮 */}
                    <Flex
                        onClick={this.handleVerification}
                        className={styles.verification}
                        justify="center"
                        align="center"
                        direction="column"
                    >
                        <img src={verificationImage} />
                        核销
					</Flex>
                    {this.verificationPage()}
                </div>
            );
        }
    }
);
