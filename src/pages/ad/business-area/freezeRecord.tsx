import React, { Component } from 'react';
import { DatePicker, List } from 'antd-mobile';
import request from '@/services/request';
import styles from '../index.less';
import moment from 'moment';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

export default class FreezeRecord extends Component {

    state = {
        date: now,
        adId: null,
        dataItems: [],
        page: 1,
        // day: null,
        isMore: true,

    }

    getData = () => {
        const { adId, page,} = this.state;
        request({
            url: `v3/ad/${adId}/lockMoneyLog`,
            method: 'GET',
            params: {
                page,
                
            }
        }).then(res => {
            const { code, data } = res;
            const { dataItems } = this.state;
            if (code == 200) {
                if (data.data.length != 0) {
                    this.setState({
                        dataItems: dataItems.concat(data.data)
                    })
                } else if (data.data.length == 0) {
                    this.setState({
                        isMore: false
                    })
                }
            }
        })
    }

    componentDidMount = async () => {
        await this.setState({
            adId: this.props.adId
        })
        this.getData();
    }

    handleLoadMore = async () => {
        await this.setState({
            page: this.state.page + 1
        })
        this.getData();
    }

    render() {
        const { dataItems, isMore } = this.state;
        return (
            <div className={styles.freeze_record}>
                <div className={styles.freeze_title}>
                    <div className={styles.freeze_date}>
                        <DatePicker
                            mode="date"
                            extra="Optional"
                            value={this.state.date}
                            onChange={date =>
                                this.setState({
                                    date,
                                    day: moment(date).format('YYYY-MM-DD'),
                                    page: 1,
                                    dataItems: []
                                }, () => {
                                    this.getData();
                                })
                            }
                        >
                            <div className={styles.freeze_time}>冻结时间</div>
                        </DatePicker>
                    </div>
                    <div className={styles.freeze_money}>冻结金额</div>
                    <div className={styles.remaining_balance_money}>待结余金额</div>
                    <div className={styles.surplus_already_money}>已经结余金额</div>
                </div>
                {
                    dataItems ? dataItems.map((item, index) => {
                        return (
                            <div className={styles.data_item}>
                                <div className={styles.data_time}>{item.year}/{item.month}/{item.day}</div>
                                <div className={styles.data_freeze_money}>￥{item.total_lock_money}</div>
                                <div className={styles.data_remaining_balance_money}>￥{item.waiting_surplus_money}</div>
                                <div className={styles.data_surplus_already_money}>￥{item.surplus_money}</div>
                            </div>
                        )
                    }) : ""
                }
                {
                    isMore ? (
                        <p className={styles.load_more} onClick={this.handleLoadMore.bind(this)}>点击加载更多</p>
                    ) : (
                            <p className={styles.no_data}>暂无更多数据</p>
                        )
                }
            </div>
        )
    }
}