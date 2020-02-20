/**
 * title: 广告消费
 */

import React, { Component } from 'react';
import { WingBlank, Flex, Toast, Tabs, Icon } from 'antd-mobile';
import FiltrateLayout from '../../components/selectLayout';
import request from '@/services/request';
import moment from 'moment';
import router from 'umi/router';
import NoData from '@/components/no-data';
import { Item } from 'rc-menu';
import styles from './index.less';


export default class OrderPage extends Component {
    state = {
        list: [],
        qList: [],
        last_page: 0,
        insignificant: 0,
        sum_money: '0.00',
        page: 1,
        hasMore: true,

        pay_status: undefined,   // 模糊查询筛选
        time: undefined,
        end_time: undefined           // 模糊查询月份
    };

    handleLayoutChange = (query: any) => {
        console.log(query)
    }
    pushPage = () => {
        router.push('/AdvertisingSpending/detail');
    };
    handleLoadMore = () => {
        if (this.state.hasMore) {
          this.setState({
            page: this.state.page + 1
          }, () => {
            // this.getData({
            //   position_id: this.state.pay_status && this.state.pay_status != 0 ? this.state.pay_status : undefined,
            //   start_time: this.state.time + ' 0:0:0',
            //   end_time: this.state.end_time + ' 23:59:59'
            // })
          })
        }
      }

    render() {
        const financeList = this.state.list.length ? (
            this.state.qList.map((item: any, index: number) => (
                <div className={styles.AdvertisingSpendingList} key={index}>
                    <div className={styles.AdvertisingContent} >
                        <div className={styles.AdvertisingName} >广告类型</div>
                        <div className={styles.AdvertisingMoneyBox} >
                            <div className={styles.AdvertisingMoney_normal} >黄金广告</div>
                        </div>
                    </div>
                    <div className={styles.AdvertisingContent} >
                        <div className={styles.AdvertisingName} >当日预算</div>
                        <div className={styles.AdvertisingMoneyBox} >
                            <div className={styles.AdvertisingMoney_normal} >¥99.00</div>
                        </div>
                    </div>
                    <div className={styles.AdvertisingContent} >
                        <div className={styles.AdvertisingName} >投放状态</div>
                        <div className={styles.AdvertisingMoneyBox} >
                            <div className={styles.AdvertisingMoney_normal} >已结束</div>
                        </div>
                    </div>
                    <div className={styles.AdvertisingContent} >
                        <div className={styles.AdvertisingName} >展示耗费</div>
                        <div className={styles.AdvertisingMoneyBox} >
                            <div className={styles.AdvertisingMoney_normal} >¥99.00</div>
                        </div>
                    </div>
                    <div className={styles.AdvertisingContent} >
                        <div className={styles.AdvertisingName} >点击耗费</div>
                        <div className={styles.AdvertisingMoneyBox} >
                            <div className={styles.AdvertisingMoney_normal} >¥99.00</div>
                        </div>
                    </div>
                    <div className={styles.AdvertisingContent} >
                        <div className={styles.AdvertisingName} >带结余金额</div>
                        <div className={styles.AdvertisingMoneyBox} >
                            <div className={styles.AdvertisingMoney_normal} >¥99.00</div>
                        </div>
                    </div>
                    <div className={styles.AdvertisingContent} >
                        <div className={styles.AdvertisingName} >已经结余金额</div>
                        <div className={styles.AdvertisingMoneyBox} >
                            <div className={styles.AdvertisingMoney_normal} >/</div>
                        </div>
                    </div>
                </div>

            ))
        ) : (
                <NoData type="finance" />
            );
        const list = [{ name: '金额总计', num: '￥' + this.state.sum_money }]
        return (
            <FiltrateLayout
                hasInsignificant={true}
                insignificant={list}
                onChange={this.handleLayoutChange}
                greyBackground={true}
            >
                <div className={styles.financeListPage} >
                    {financeList}
                </div>
                {
                    this.state.list.length > 1 ? <p style={{ textAlign: "center" }} onClick={this.handleLoadMore.bind(this)}>{this.state.hasMore ? "点击加载更多" : "已经到达底线了"}</p> : null
                }
            </FiltrateLayout>

        );
    }
}
