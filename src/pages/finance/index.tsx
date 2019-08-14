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
import { routerRedux } from 'dva/router';
import router from 'umi/router';

interface Props {
  data: FinanceItem[];
  dispatch: (arg0: any) => any;
  hasMore: {},
  // page: null
}

export default connect(({ finance }: any) => finance)(
  class FinancePage extends Component<Props> {
    state = {
      page: 1,

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
        page: 1,
        finance_type: query.hot.id,
        date: query.time ? moment(query.time).unix() : undefined,
      }, () => {
        // 清除数据流里的数据
        this.props.dispatch({
          type: 'finance/clearData'
        })
        this.props.dispatch({
          type: 'finance/getData',
          query: {
            page: this.state.page,
            finance_type: query.hot.id,
            date: query.time ? moment(query.time).unix() : undefined,
            moneyscope_micro: this.state.min,
            moneyscope_maximum: this.state.max
          }
        });
      })
    };

    handleChangePrice = (type: string) => (e: any) => {
      console.log(type, e.target.value)
      if (/^[0-9]+\.+[0-9]\d{0,1}$/.test(e.target.value) || /^[0-9]+\.?$/.test(e.target.value) || e.target.value == "") {
        this.setState({ [type]: e.target.value });
      }
    }

    handleLoadMore = () => {
      if (this.props.hasMore) {
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
    }
    pushPage = (pathname: string, query: object) => {
      router.push({ pathname, query })
    };
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
              ￥<input placeholder="最低金额"  onChange={this.handleChangePrice('min')} value={this.state.min} />
            </Flex>
            <div className="line" />
            <Flex className="input-wrap">
              ￥<input placeholder="最高金额"  onChange={this.handleChangePrice('max')} value={this.state.max} />
            </Flex>
          </Flex>
        )
      };

      /**页面数据列表 */
      const financeList = this.props.data.length ? (
        this.props.data.map(_ => (
          <Flex key={_.id} className={styles.financeItem} onClick={
            () => {
              switch (_.type) {
                //账单类型1=线下收银详情 2=费率返点详情 3=广告收益 4=优惠券收益 5=线上卖券 6=广告支出
                case 3: this.pushPage('/finance/financeDetail/list', { _id: _.id, _type: 1 }); break;  //线下交易（线下收银）
                case 13: this.pushPage('/finance/financeDetail/list', { _id: _.id, _type: 2 }); break; //费率返点（商家返点）
                case 6: this.pushPage('/finance/financeDetail/list', { _id: _.id, _type: 3 }); break;  //广告收益
                case 8: this.pushPage('/finance/financeDetail/list', { _id: _.id, _type: 4 }); break;   //优惠券收益（优惠券分润）
                case 15: this.pushPage('/finance/financeDetail/list', { _id: _.id, _type: 5 }); break;   //线上卖券，存疑(平台收益)
                case 9: this.pushPage('/finance/financeDetail/list', { _id: _.id, _type: 6 }); break; //广告购买
                default: return
              }

              // switch (_.type) {
              //   case 3: this.pushPage('/finance/financeDetail/offlineDeal', { _id: _.id }); break;  //线下交易（线下收银）
              //   case 13: this.pushPage('/finance/financeDetail/tariffRebates', { _id: _.id }); break; //费率返点（商家返点）
              //   case 6: this.pushPage('/finance/financeDetail/advertisingRevenue', { _id: _.id }); break;  //广告收益
              //   case 9: this.pushPage('/finance/financeDetail/advertisingSpending', { _id: _.id }); break; //广告购买
              //   case 8: this.pushPage('/finance/financeDetail/couponRevenue', { _id: _.id }); break;   //优惠券收益（优惠券分润）
              //   case 15: this.pushPage('/finance/financeDetail/onlineSelling',{_id:_.id}); break;   //线上卖券，存疑   
              //   default: return
              // }
            }
          }>
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
