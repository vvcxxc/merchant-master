import React, { Component } from 'react';
import { Modal, Flex, Icon, Toast } from 'antd-mobile';
import styles from './index.less';
import Request from '@/services/request';
import router from 'umi/router';
import wx from 'weixin-js-sdk';


const alert = Modal.alert;
class Detail extends Component {

    state = {
        info: {},
        showVerification: false
    }

    handleCancel = () => {
        alert('提示', '确认取消该订单吗？', [
            { text: '不取消', onPress: () => console.log('cancel'), style: 'default' },
            { text: '取消', onPress: () => console.log('ok') },
        ])
    };

    componentWillMount = () => {
        this.getData();
    }

    getData = () => {
        const id = this.props.history.location.query.id;
        Request({
            url: `v3/merchant/delivery/order/${id}`,
            method: 'GET'
        }).then(res => {
            if (res.code == 200) {
                this.setState({
                    info: res.data
                })
            }
        })
    }

    handleAcceptOrder = (id: any) => {
        alert('提示', '确认接单吗？', [
            { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
            {
                text: '确认', onPress: () => {
                    Request({
                        url: `v3/merchant/delivery/order/${id}`,
                        method: 'POST'
                    }).then(res => {
                        // console.log(res)
                        if (res.code == 200) {
                            this.getData();
                        }
                    })
                }
            },
        ])
    }


    /**核销 */
    handleVerification = () => this.setState({ showVerification: !this.state.showVerification });

    /**点击核销 */
    Verification = () => {
        wx.scanQRCode({
            needResult: 1,
            desc: 'scanQRCode desc',
            success: ({ resultStr }: any) => {
                let res = JSON.parse(resultStr);
                if (res.verificationType && res.verificationType == "Prize") {
                    //核销奖品
                    console.log(res)
                    Request({
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
                    Request({
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
                            <img src={require('@/assets/menu/15.png')} />
                        扫码验证
                    </Flex>
                    </Flex.Item>
                    <Flex.Item>
                        <Flex
                            justify="center"
                            direction="column"
                            onClick={() => { router.push('/verification/inputcode') }}
                        >
                            <img src={require('@/assets/menu/16.png')} />
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
        const { info } = this.state;
        return (
            <div className={styles.order_detail}>
                <div className={styles.order_name}>
                    <div className={styles.logo}></div>
                    <div className={styles.title}>订单信息</div>
                </div>
                <div className={styles.flex_order_info}>
                    <div className={styles.order_info_status}>商品名称</div>
                    <div className={styles.order_info_value}>{info.delivery_name}</div>
                </div>
                <div className={styles.flex_order_info}>
                    <div className={styles.order_info_status}>配送状态</div>
                    <div className={styles.order_status}>
                        {/* 0待接单 1配送中 2配送成功 3配送失败 */}
                        {
                            info.delivery_status == 0 ? "待接单" :
                                info.delivery_status == 1 ? "配送中" :
                                    info.delivery_status == 2 ? "配送成功" :
                                        info.delivery_status == 3 ? "配送失败" : ""
                        }
                    </div>
                </div>
                <div className={styles.flex_order_info}>
                    <div className={styles.order_info_status}>订单号</div>
                    <div className={styles.order_info_value}>{info.delivery_no}</div>
                </div>
                <div className={styles.flex_order_info}>
                    <div className={styles.order_info_status}>订单金额</div>
                    <div className={styles.order_info_value}>{info.order_money}元</div>
                </div>
                <div className={styles.flex_order_info}>
                    <div className={styles.order_info_status}>订单时间</div>
                    <div className={styles.order_info_value}>{info.delivery_time}</div>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.order_name}>
                    <div className={styles.logo}></div>
                    <div className={styles.title}>配送信息</div>
                </div>
                <div className={styles.flex_order_info}>
                    <div className={styles.order_info_status}>配送人姓名</div>
                    <div className={styles.order_info_value}>{info.user_name}</div>
                </div>
                <div className={styles.flex_order_info}>
                    <div className={styles.order_info_status}>配送人电话</div>
                    <div className={styles.order_info_value}>{info.user_mobile}</div>
                </div>
                <div className={styles.flex_order_info}>
                    <div className={styles.order_info_status}>配送费用</div>
                    <div className={styles.order_info_value}>{info.delivery_money}元</div>
                </div>
                <div className={styles.flex_order_info}>
                    <div className={styles.order_info_status}>配送地址</div>
                    <div className={styles.order_info_value}>{info.detail}</div>
                </div>


                {/* <div className={styles.footer_btn}>
                    <div className={styles.cancel} onClick={this.handleCancel}>取消</div>
                    <div className={styles.order_btn}>接单</div>
                </div> */}
                {/* <div className={styles.footer_btn}>
                    <div className={styles.cancel} onClick={this.handleCancel}>取消</div>
                    <div className={styles.order_btn}>配送</div>
                </div> */}
                {/* <div className={styles.footer_btn}>
                    <div className={styles.cancel} onClick={this.handleCancel}>取消</div>
                    <div className={styles.order_btn}>核销二维码</div>
                </div> */}
                {/* <div className={styles.footer_btn}>
                    <div className={styles.go_back} onClick={() => router.push('/activitys/dispatching/List')}>返回配送列表</div>
                </div> */}



                {/* 0待接单 1配送中 2配送成功 3配送失败 */}
                {
                    info.delivery_status == 0 ? (
                        <div className={styles.footer_btn}>
                            {/* <div className={styles.cancel} onClick={this.handleCancel}>取消</div> */}
                            <div className={styles.order_btn} onClick={this.handleAcceptOrder.bind(this, info.id)}>接单</div>
                        </div>
                    ) : info.delivery_status == 1 ? (
                        <div className={styles.footer_btn}>
                            {/* <div className={styles.cancel} onClick={this.handleCancel}>取消</div> */}
                            <div className={styles.order_btn} onClick={this.handleVerification}>核销二维码</div>
                        </div>
                    ) : (
                                <div className={styles.footer_btn}>
                                    <div className={styles.go_back} onClick={() => router.push('/activitys/dispatching/List')}>返回配送列表</div>
                                </div>
                            )
                }
                {this.verificationPage()}
            </div>
        )
    }
}

export default Detail;