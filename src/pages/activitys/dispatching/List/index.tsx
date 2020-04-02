import React, { Component } from 'react';
import styles from './index.less';
import Request from '@/services/request';
import router from 'umi/router';
import { Modal, Flex, Icon, Toast } from 'antd-mobile';
import wx from 'weixin-js-sdk';

const alert = Modal.alert;

class List extends Component {

    state = {
        listData: [],
        showVerification: false
    }

    componentWillMount = () => {
        this.getData();
    }

    getData = () => {
        Request({
            url: 'v3/merchant/delivery/order',
        }).then(res => {
            if (res.code == 200) {
                this.setState({
                    listData: res.data.data
                })
            }
        })
    }

    handleDetail = (id: any) => {
        router.push({
            pathname: "/activitys/dispatching/detail",
            query: {
                id
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
                        method: 'put',
                        data: {
                            delivery_status: 4
                        }
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

    handleDispatch = (id: any) => {
        alert('提示', '确认配送吗？', [
            { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
            {
                text: '确认', onPress: () => {
                    Request({
                        url: `v3/merchant/delivery/order/${id}`,
                        method: 'put',
                        data: {
                            delivery_status: 1
                        }
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
        const { listData } = this.state;
        return (
            <div className={styles.dispatch_list}>
                {
                    listData.map(item => (
                        <div className={styles.list_item} key={item.id}>
                            <div className={styles.prize_info}>
                                <div className={styles.prize_name}>{item.delivery_name}</div>
                                <div className={styles.prize_status}>
                                    {/*  
                                        delivery_status  0待接单 1配送中 2配送成功 3配送失败 4已接单 
                                        order_status     0待支付 1正常 2商家取消 3用户取消 4订单过期自动取消 5订单已完成
                                    */}
                                    {
                                        item.order_status == 2 || item.order_status == 3 || item.order_status == 4 ? "已取消" :
                                            item.order_status == 1 && item.delivery_status == 0 ? "待接单" :
                                                item.order_status == 1 && item.delivery_status == 1 ? "配送中" :
                                                    item.order_status == 1 && item.delivery_status == 2 ? "配送成功" :
                                                        item.order_status == 1 && item.delivery_status == 3 ? "配送失败" :
                                                            item.order_status == 1 && item.delivery_status == 4 ? "已接单" : ""
                                    }
                                </div>
                            </div>
                            <div className={styles.prize_moment}>
                                <div className={styles.prize_date}>{item.created_at}</div>
                            </div>
                            <div className={styles.divider}></div>
                            <div className={styles.footer_btn}>

                                {/* 0待接单 1配送中 2配送成功 3配送失败 4已接单 */}
                                {
                                    item.order_status == 1 && item.delivery_status == 0 ? <div className={styles.order_status} onClick={this.handleAcceptOrder.bind(this, item.id)}>接单</div> :
                                        item.order_status == 1 && item.delivery_status == 1 ? <div className={styles.order_status} onClick={this.handleVerification}>核销二维码</div> :
                                            // item.delivery_status == 2 ? <div className={styles.order_status}>已完成</div> :
                                            // item.delivery_status == 3 ? <div className={styles.order_status}>配送失败</div> :
                                            item.order_status == 1 && item.delivery_status == 4 ? <div className={styles.order_status} onClick={this.handleDispatch.bind(this, item.id)}>配送</div> :
                                                ""
                                }

                                <div className={styles.order_detail} onClick={this.handleDetail.bind(this, item.id)}>查看</div>
                            </div>
                        </div>
                    ))
                }
                {this.verificationPage()}
            </div>
        )
    }
}

export default List;