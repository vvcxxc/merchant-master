/**title: 我的冻结金额 */
import React, { Component } from 'react';
import { Flex, WingBlank, Toast, List } from 'antd-mobile';
import styles from './index.less';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import request from '@/services/request';
import router from 'umi/router';
import FiltrateLayout from '../../../components/selectLayout';
import NoData from '@/components/no-data';

export default class FreezeMoney extends Component {
    state = {
        undetermined: {
            title: '订单类型',
            list: [
                { id: 1, label: '提现冻结' },
                { id: 2, label: '广告冻结' },
                { id: 3, label: '邮费冻结' }
            ]
        },
        undetermined2: {
            title: '支付类型',
            list: [
                { _id: 1, label: '已结束' },
                { _id: 2, label: '冻结中' }
            ]
        }
    };

    handleChange = (query: any) => {
        console.log(query)
    };

    render() {
        const list = [{ name: '冻结中金额', num: 1000.00 }]

        return (
            <FiltrateLayout
                undetermined={this.state.undetermined}
                undetermined2={this.state.undetermined2}
                hasInsignificant={true}
                insignificant={list}
                onChange={this.handleChange}
                greyBackground={true}
            >
                <div className={styles.freezeMoney}>
                    <div className={styles.FreezeItem} >
                        <div className={styles.itemLeft}>
                            <div className={styles.itemLeftTop}>
                                <div className={styles.itemTitle}>邮费冻结</div>
                                <div className={styles.itemNum}>¥555.55</div>
                            </div>
                            <div className={styles.itemLeftBottom}>2019-09-11 15:39</div>
                        </div>
                        <div className={styles.itemRight}>冻结中</div>
                    </div >
                </div >
            </FiltrateLayout>

        );
    }
}

