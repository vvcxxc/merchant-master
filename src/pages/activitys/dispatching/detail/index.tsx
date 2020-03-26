import React, { Component } from 'react';
import { Modal } from 'antd-mobile';
import styles from './index.less';
import Request from '@/services/request';
import router from 'umi/router';


const alert = Modal.alert;
class Detail extends Component {

    state = {
        info: {}
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
                            <div className={styles.order_btn}>核销二维码</div>
                        </div>
                    ) : (
                                <div className={styles.footer_btn}>
                                    <div className={styles.go_back} onClick={() => router.push('/activitys/dispatching/List')}>返回配送列表</div>
                                </div>
                            )
                }
            </div>
        )
    }
}

export default Detail;