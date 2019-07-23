/**
 * title: 财务
 */

import React, { Component } from 'react';
import FiltrateLayout from '@/components/layout';
import NoData from '@/components/no-data';
import { Flex } from 'antd-mobile';
import styles from './index.less';
import { FinanceItem } from './model';
import { connect } from 'dva';
import moment from 'moment';

interface Props {
  data: FinanceItem[];
  dispatch: (arg0: any) => any;
  hasMore: {},
  // page: null
}

export default connect(({ finance }: any) => finance)(
  class FinancePage extends Component<Props> {
    state = {
      page : 1,

      min: undefined,
      max: undefined,

      finance_type: '',
      date: undefined
    };

    componentDidMount() {
      // 清除数据流里的数据
      this.props.dispatch({
        type: 'finance/clearData'
      })
      this.props.dispatch({
        type: 'finance/getData', query: {
          page: this.state.page
        }
      });
    }


    handleChange = (query: any) => {
      this.setState({
        page : 1,
        finance_type: query.hot,
        date: query.time ? moment(query.time).unix() : undefined,
      }, () => {
        // 清除数据流里的数据
        this.props.dispatch({
          type: 'finance/clearData'
        })
        this.props.dispatch({
          type: 'finance/getData',
          query: {
            page : this.state.page,
            finance_type: query.hot,
            date: query.time ? moment(query.time).unix() : undefined,
            moneyscope_micro: this.state.min,
            moneyscope_maximum: this.state.max
          }
        });
      })
    };

    handleChangePrice = (type: string) => (e: any) => this.setState({ [type]: e.target.value });

    handleLoadMore = () => {
      this.setState({
        page: this.state.page + 1
      }, () => {
        this.props.dispatch({
          type: 'finance/getData', query: {
            page: this.state.page,
            finance_type: this.state.finance_type,
            date: this.state.date,
            moneyscope_micro: this.state.min,
            moneyscope_maximum: this.state.max
          }
        })
      })
    }

    render() {

      /**单选条件 */
      const undetermined = [
        { id: 3, label: '线下收银' },
        { id: 5, label: '余额提现' },
        { id: 6, label: '广告收益' },
        { id: 13, label: '费率返点' }
      ];

      /**搜索金额 */
      const layoutAfter = {
        title: '金额',
        context: (
          <Flex className={styles.layoutAfter}>
            <Flex className="input-wrap">
              ￥<input placeholder="最低金额" type="number" onChange={this.handleChangePrice('min')} />
            </Flex>
            <div className="line" />
            <Flex className="input-wrap">
              ￥<input placeholder="最高金额" type="number" onChange={this.handleChangePrice('max')} />
            </Flex>
          </Flex>
        )
      };

      /**页面数据列表 */
      const financeList = this.props.data.length ? (
        this.props.data.map(_ => (
          <Flex key={_.id} className={styles.financeItem}>
            <img src={_.small_icon} alt="" />
            <Flex.Item className="content">
              <div className="ordernum">{_.msg}</div>
              <div className="time">{_.create_time}</div>
            </Flex.Item>
            <div className="more">
              <div>{_.money}</div>
              <span className="status">{_.remark}</span>
            </div>
          </Flex>
        ))
      ) : (
          <NoData type="finance" />
        );

      return (
        <FiltrateLayout after={layoutAfter} undetermined={undetermined} onChange={this.handleChange}>
          {financeList}
          <p style={{ textAlign: "center" }} onClick={this.handleLoadMore.bind(this)}>{this.props.hasMore.hasMore ? "点击加载更多" : "已经到达底线了"}</p>
        </FiltrateLayout>
      );
    }
  }
);
