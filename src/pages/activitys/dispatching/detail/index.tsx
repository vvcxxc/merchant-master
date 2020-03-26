import React, { Component } from 'react';
import styles from './index.less';

class Detail extends Component {
    render() {
        return (
            <div className={styles.order_detail}>
                <div className={styles.order_name}>
                    <div className={styles.logo}></div>
                    <div className={styles.title}>订单信息</div>
                </div>
                <div className={styles.flex_order_info}>
                    <div className={styles.order_info_status}>商品名称</div>
                    <div className={styles.order_info_value}>商品名称是一个慕斯蛋糕</div>
                </div>
                <div className={styles.flex_order_info}>
                    <div className={styles.order_info_status}>配送状态</div>
                    <div className={styles.order_info_value}>待接单</div>
                </div>
                <div className={styles.flex_order_info}>
                    <div className={styles.order_info_status}>订单号</div>
                    <div className={styles.order_info_value}>pc9527</div>
                </div>
                <div className={styles.flex_order_info}>
                    <div className={styles.order_info_status}>订单金额</div>
                    <div className={styles.order_info_value}>99.99元</div>
                </div>
                <div className={styles.flex_order_info}>
                    <div className={styles.order_info_status}>订单时间</div>
                    <div className={styles.order_info_value}>2020-02-20 19:45:30</div>
                </div>
            </div>
        )
    }
}

export default Detail;