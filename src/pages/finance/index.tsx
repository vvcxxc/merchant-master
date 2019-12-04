/**
 * title: 交易明细
 */

import React, { Component } from 'react';
import styles from './index.less';
import { WingBlank, Flex, Toast, Tabs, Icon } from 'antd-mobile';
import FiltrateLayout from '../../components/selectLayout';
import request from '@/services/request';
import moment from 'moment';
import router from 'umi/router';
import NoData from '@/components/no-data';
import { Item } from 'rc-menu';
import { connect } from 'dva';

interface Props {
  location: any,
  dispatch: any,
  details: any
}
let timer: any;
export default connect(({ finance }: any) => finance)(
// export default
  class OrderPage extends Component<Props> {
  state = {
    list: [],
    insignificant: 0,

    page: 1,
    hasMore: true,

    pay_status: '',   // 模糊查询筛选
    date: undefined,         // 模糊查询月份，
    date2: undefined,
    type: undefined,
    payType: undefined,
    showNoData: false,
    data: [],
    transaction_number: 0,
    transaction_amount: 0,
    order_num: 0
  };

  undetermined = {
    title: '交易类型',
    list: [
      { id: 1, label: '二维码收款' }
    ]
  };
  undetermined2 = {
    title: '支付类型',
    list: [
      { _id: 'wx', label: '微信' },
      { _id: 'zfb', label: '支付宝' }
    ]
  };

    componentDidMount = () => {
      const { Finance } = this.props
      this.getOrderNumber();
      this.getData();
    // this.props.Finance.ListData ?
    // if (Finance.ListData) {
    //   this.setState({
    //     data: Finance.ListData,
    //     // page:
    //     // end_time
    //     // start_time
    //     // from
    //     // type
    //     })
    //   }
    // this.getData();
  };

  getOrderNumber = async () => {
    const res = await request({
      url: 'v3/offline_order/new_order_number'
    })
    this.setState({
      order_num: res
    }, () => {
      if (timer) { clearTimeout(timer) }
      timer = setTimeout(() => {
        this.getOrderNumber()
      }, 5000)
    })
  };

  hanleRefresh = () => {
    //  location.reload();
    this.setState({
      page: 1,
      hasMore: true,
      date: undefined,
      date2: undefined,
      payType: undefined,
      type: undefined,
      data: [],
    }, () => {
      this.getData();
    })
  }

  getData = async () => {
    Toast.loading('');
    const res = await request({
      url: 'v3/offline_order/list',
      params: {
        type: this.state.type,
        from: this.state.payType,
        start_time: this.state.date,
        end_time: this.state.date2,
        page: this.state.page
      }
    });

    

    console.log(this.props);
    

    Toast.hide();
    if (res.data.length != 0) {
      this.setState({ data: this.state.data.concat(res.data), transaction_number: res.transaction_number, transaction_amount: res.transaction_amount });

      this.props.dispatch({
        type: 'finance/setFinance',
        payload: {
          ListData: this.state.data
          // page: this.state.page,
          // end_time: this.state.date2,
          // start_time: this.state.date,
          // from: this.state.payType,
          // type: this.state.type
        }
      })

    } else if (res.data.length == 0) {
      this.setState({
        hasMore: false,
        transaction_number: res.transaction_number,
        transaction_amount: res.transaction_amount
      });
    }
  };

  handleLoadMore = () => {
    if (this.state.hasMore) {
      this.setState({
        type: this.state.type,
        pay_type: this.state.payType,
        start_time: this.state.date,
        end_time: this.state.date2,
        page: this.state.page + 1
      }, () => {
        this.getData()
      })
    }
  }


  handleChange = (query: any) => {
    this.setState({
      date: query.time || undefined,
      date2: query.end_time || undefined,
      payType: query.hot._id,
      type: query.hot.id
    }, () => {
      this.getData()
    })
    // 每次change时重置
    this.setState({
      showNoData: false,
      data: [],
      count: 0,
      sum: 0,
      platform: 0,
      page: 1,
      hasMore: true
    });
  };

  pushPage = (_id: object, e: object) => {
    router.push({ pathname: '/finance/detail', query: { id: _id } })
  };
  componentWillUnmount() {
    clearTimeout(timer)
  }

  render() {
    const financeList = this.state.data.length ? (
      <div>
        {
          this.state.data.map((_: any) => (
            <Flex className={styles.financeItem} key={_.id} onClick={this.pushPage.bind(this, _.id)}>
              <img src={_.small_icon} />
              <Flex.Item className="content">
                <div className="financenum">{_.order_sn}</div>
                <div className="financetime">{_.create_time}</div>
              </Flex.Item>
              <div className="content-right">
                <Flex.Item className="content">
                  <div className="financemoney">{_.amount}</div>
                  <div className="financestatus">二维码收款</div>
                </Flex.Item>
                <Icon type="right" color="#bcbcbc" />
              </div>
            </Flex>
          ))
        }
        <p style={{ textAlign: "center" }} onClick={this.handleLoadMore.bind(this)}>{this.state.hasMore ? "点击加载更多" : "已经到达底线了"}</p>
      </div>
    ) : (
        <NoData type="finance" />
      );
    const list = [{ name: '交易笔数', num: this.state.transaction_number }, { name: '交易金额', num: this.state.transaction_amount }]
    return (
      <FiltrateLayout
        undetermined={this.undetermined}
        undetermined2={this.undetermined2}
        idSelect={1}
        _idSelect={'wx'}
        timeSelect={'2019-12-3'}
        endTimeSelect={'2019-12-9'}
        hasInsignificant={true}
        insignificant={list}
        onChange={this.handleChange}
      >
        <div className={styles.notice}>
          <img src={require('@/assets/notice.png')} alt="" />
          <div onClick={this.hanleRefresh.bind(this)}>当前有{this.state.order_num}条新订单，点击刷新</div>
        </div>
        <div className={styles.data_wrap}>
          {financeList}
        </div>
      </FiltrateLayout>

    );
  }
  })
