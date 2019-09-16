
/**
 * title: 核销记录
 */

import React, { Component } from 'react';
import FiltrateLayout from '@/components/layout';
import NoData from '@/components/no-data';
import { Flex } from 'antd-mobile';
import styles from './index.less';
import { VerificationItem } from './model';
import { connect } from 'dva';
import moment from 'moment';
import { routerRedux } from 'dva/router';
import router from 'umi/router';

interface Props {
    data: VerificationItem[];
    dispatch: (arg0: any) => any;
    hasMore: {},
    // page: null
}

export default connect(({ verification }: any) => verification)(
    class VerificationRecord extends Component<Props> {
        state = {
            page: 1,
            min: undefined,
            max: undefined,
            finance_type: undefined,
            date: undefined
        };

        componentDidMount() {
            console.log(this.props);
            // 清除数据流里的数据
            this.props.dispatch({
                type: 'verification/clearData'
            })
            this.props.dispatch({
                type: 'verification/getData', query: {
                    page: this.state.page
                }
            });
        }

        handleLoadMore = () => {
            if (this.props.hasMore) {
                this.setState({
                    page: this.state.page + 1
                }, () => {
                    this.props.dispatch({
                        type: 'verification/getData', query: {
                            page: this.state.page,
                            finance_type: this.state.finance_type,
                            date: this.state.date,
                            moneyscope_micro: this.state.min,
                            moneyscope_maximum: this.state.max
                        }
                    })
                })
            }
        }

        pushPage = (pathname: string, query: object) => {
            router.push({ pathname, query })
        };
        render() {
            /**页面数据列表 */
            const verificationRecordList = this.props.data.length ? (
                this.props.data.map(_ => (
                    <Flex key={_.id} className={styles.financeItem} onClick={() => { null }}>
                        <div className={styles.recordBox}>
                            <div className={styles.recordLeft}>
                                <div className={styles.recordTime}>13:00</div>
                                <div className={styles.recordDate}>3月10日</div>
                            </div>
                            <div className={styles.recordRight}>
                                <div className={styles.recordMsg}>
                                    <div className={styles.recordStore}>杨大富的五金店杨大富的五金店杨大富的五金店杨大富的五金店杨大富的五金店杨大富的五金店杨大富的五金店</div>
                                    <div className={styles.recordCode}>订单号：06655463654555</div>
                                </div>
                                <div className={styles.recordNum}> +100</div>
                            </div>
                        </div>
                    </Flex>


                ))
            ) : (
                    <NoData type="finance" />
                );

            return (
                <div className={styles.verificationBox}>
                    {verificationRecordList}
                    <p style={{ textAlign: "center" }} onClick={this.handleLoadMore.bind(this)}>{this.props.hasMore.hasMore ? "点击加载更多" : "已经到达底线了"}</p>
                </div>
            );
        }
    }
);
