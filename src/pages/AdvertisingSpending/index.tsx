/**
 * title: 交易明细
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
    insignificant: 0,

    page: 1,
    hasMore: true,

    pay_status: '',   // 模糊查询筛选
    date: undefined           // 模糊查询月份
  };

  undetermined = {
    title: '广告类型',
    list: [
      { id: 1, label: '商圈广告' },
      { id: 2, label: '黄金广告' },
      { id: 3, label: '铂金广告' },
      { id: 4, label: '钻石广告' }
    ]
  };

  componentDidMount() {
    // document.title="交易明细";
    // window.title="交易明细";
    this.getData();
  }

  getData = async (query?: any) => {
    // Toast.loading('');
    // const res = await request({
    //   url: 'v3/finance/merchant_bill', params: {
    //     ...query,
    //     page: this.state.page
    //   }
    // });
    // Toast.hide();
    // if (res.code === 200 && res.data.length != 0) {
    //   this.setState({ list: this.state.list.concat(res.data), insignificant: res.total });
    // } else if (res.code === 200 && res.data.length == 0) {
    //   this.setState({ hasMore: false })
    // }
  };

  handleLayoutChange = (query: any) => {
    this.setState({
      page: 1,
      hasMore: true,
      list: [],
      pay_status: query.hot.id || undefined,
      type: query.hot._id,
      date: query.time ? moment(query.time).unix() : undefined
    }, () => {
      this.getData({
        pay_status: query.hot.id || 0,
        type: query.hot._id || undefined,
        date: query.time ? moment(query.time).unix() : undefined
      });
    })

  };

  handleLoadMore = () => {
    if (this.state.hasMore) {
      this.setState({
        page: this.state.page + 1
      }, () => {
        this.getData({
          pay_status: this.state.pay_status || undefined,
          date: this.state.date
        })
      })
    }

  }

  pushPage = (pathname: string, query: object, e: object) => {
    console.log(pathname, query);
    router.push({ pathname, query })
  };

  render() {
    const financeList = this.state.list.length ? (
      this.state.list.map((_: any) => (
        <Flex className={styles.financeItem} key={_.id} >
          <img src={_.small_icon} />
          <Flex.Item className="content">
            <div className="financenum">{_.order_sn}</div>
            <div className="financetime">{_.create_time}</div>
          </Flex.Item>
          <div className="content-right">
            <Flex.Item className="content">
              <div className="financemoney">{_.money}</div>
              <div className="financestatus">{_.msg}</div>
            </Flex.Item>
            <Icon type="right" color="#bcbcbc" />
          </div>
        </Flex>
      ))
    ) : (
        <NoData type="finance" />
      );
    const list = [{ name: '金额总计', num: '10086' }]
    return (
      <FiltrateLayout
        undetermined={this.undetermined}
        hasInsignificant={true}
        insignificant={list}
        onChange={this.handleLayoutChange}
        greyBackground={true}
      >
        {/* {financeList} */}

        <div className={styles.AdvertisingSpendingList} >
          <div className={styles.AdvertisingTitle} >
            <div className={styles.AdvertisingDate} >2019/11/17</div>
            <div className={styles.AdvertisingTotalMoney} >98696</div>
          </div>
          <div className={styles.AdvertisingContent} onClick={() => router.push({ pathname: '/ad/business-area', query: { value: 1 } })}>
            <div className={styles.AdvertisingName} >商圈广告消费</div>
            <div className={styles.AdvertisingMoneyBox} >
              <div className={styles.AdvertisingMoney} >56</div>
              <Icon type="right" color="#bcbcbc" />
            </div>
          </div>
          <div className={styles.AdvertisingContent}  onClick={() => router.push({ pathname: '/ad/other-page', query: { value: 1 ,type:'黄金展位'} })}>
            <div className={styles.AdvertisingName} >黄金广告消费</div>
            <div className={styles.AdvertisingMoneyBox} >
              <div className={styles.AdvertisingMoney} >56</div>
              <Icon type="right" color="#bcbcbc" />
            </div>
          </div>
          <div className={styles.AdvertisingContent} onClick={() => router.push({ pathname: '/ad/other-page', query: { value: 1 ,type:'铂金展位'} })} >
            <div className={styles.AdvertisingName} >铂金广告消费</div>
            <div className={styles.AdvertisingMoneyBox} >
              <div className={styles.AdvertisingMoney} >56</div>
              <Icon type="right" color="#bcbcbc" />
            </div>
          </div>
          <div className={styles.AdvertisingContent} onClick={() => router.push({ pathname: '/ad/other-page', query: { value: 1,type:'钻石展位' } })} >
            <div className={styles.AdvertisingName} >钻石广告消费</div>
            <div className={styles.AdvertisingMoneyBox} >
              <div className={styles.AdvertisingMoney} >56</div>
              <Icon type="right" color="#bcbcbc" />
            </div>
          </div>
        </div>


        {
          this.state.list.length > 1 ? <p style={{ textAlign: "center" }} onClick={this.handleLoadMore.bind(this)}>{this.state.hasMore ? "点击加载更多" : "已经到达底线了"}</p> : null
        }
      </FiltrateLayout>

    );
  }
}
