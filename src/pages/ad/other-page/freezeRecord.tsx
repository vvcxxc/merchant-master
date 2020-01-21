import React, { Component } from 'react';
import { DatePicker, List } from 'antd-mobile';
import styles from '../index.less';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

export default class FreezeRecord extends Component {

    state = {
        date: now
    }

    render() {
        return (
            <div className={styles.freeze_record}>
                <div className={styles.freeze_title}>
                    <div className={styles.freeze_date}>
                        <DatePicker
                            mode="date"
                            extra="Optional"
                            value={this.state.date}
                            onChange={date => this.setState({ date })}
                            
                        >
                            <div className={styles.freeze_time}>冻结时间</div>
                        </DatePicker>
                    </div>
                    <div className={styles.freeze_money}>冻结金额</div>
                    <div className={styles.remaining_balance_money}>待结余金额</div>
                    <div className={styles.surplus_already_money}>已经结余金额</div>
                </div>
                <div className={styles.data_item}>
                    <div className={styles.data_time}>2019/11/07</div>
                    <div className={styles.data_freeze_money}>￥99.99</div>
                    <div className={styles.data_remaining_balance_money}>￥66.66</div>
                    <div className={styles.data_surplus_already_money}>/</div>
                </div>
                <div className={styles.data_item}>
                    <div className={styles.data_time}>2019/11/07</div>
                    <div className={styles.data_freeze_money}>￥99.99</div>
                    <div className={styles.data_remaining_balance_money}>￥66.66</div>
                    <div className={styles.data_surplus_already_money}>/</div>
                </div>
            </div>
        )
    }
}