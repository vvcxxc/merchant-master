import React, { Component } from 'react';
import styles from './index.less';
import Request from '@/services/request';
import router from 'umi/router';
import { Modal } from 'antd-mobile';

const alert = Modal.alert;

class List extends Component {

    state = {
        listData: []
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
        const { listData } = this.state;
        return (
            <div className={styles.dispatch_list}>
                {
                    listData.map(item => (
                        <div className={styles.list_item} key={item.id}>
                            <div className={styles.prize_info}>
                                <div className={styles.prize_name}>{item.delivery_name}</div>
                                <div className={styles.prize_status}>
                                    {/* 0待接单 1配送中 2配送成功 3配送失败 */}
                                    {
                                        item.delivery_status == 0 ? "待接单" :
                                            item.delivery_status == 1 ? "配送中" :
                                                item.delivery_status == 2 ? "配送成功" :
                                                    item.delivery_status == 3 ? "配送失败" : ""
                                    }
                                </div>
                            </div>
                            <div className={styles.prize_moment}>
                                <div className={styles.prize_date}>{item.created_at}</div>
                            </div>
                            <div className={styles.divider}></div>
                            <div className={styles.footer_btn}>

                                {/* 0待接单 1配送中 2配送成功 3配送失败 */}
                                {
                                    item.delivery_status == 0 ? <div className={styles.order_status} onClick={this.handleAcceptOrder.bind(this, item.id)}>接单</div> :
                                        item.delivery_status == 1 ? <div className={styles.order_status}>核销二维码</div> :
                                            // item.delivery_status == 2 ? <div className={styles.order_status}>已完成</div> :
                                            // item.delivery_status == 3 ? <div className={styles.order_status}>配送失败</div> :
                                            ""
                                }

                                <div className={styles.order_detail} onClick={this.handleDetail.bind(this, item.id)}>查看</div>
                            </div>
                        </div>
                    ))
                }

            </div>
        )
    }
}

export default List;