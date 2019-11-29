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

  undetermined = {
    title: '广告类型',
    list: [
      { id: 4, label: '商圈广告' },
      { id: 2, label: '黄金广告' },
      { id: 3, label: '铂金广告' },
      { id: 1, label: '钻石广告' }
    ]
  };

  componentDidMount() {
    // document.title="交易明细";
    // window.title="交易明细";
    this.getData();
    this.getData2();
  }

  getData = async (query?: any) => {
    Toast.loading('');
    const res = await request({
      url: 'v3/ads/stats',
      params: {
        ...query,
        page: this.state.page
      }
    });
    Toast.hide();
    const { data, code } = res
    if (code === 200 && data.data.length != 0) {
      let tempList = this.state.qList;
      data.data.map((item: any) => {
        let item2 = {
          shangquan: '0.00',
          huangjin: '0.00',
          zuanshi: '0.00',
          bojin: '0.00',
          gg: '0.00',
          date: new Date(item[0].start_time * 1000).getFullYear() + '/' + (Number(new Date(item[0].start_time * 1000).getMonth()) + 1) + '/' + new Date(item[0].start_time * 1000).getDate()
        }
        item.map((item3: any) => {
          switch (item3.position_id) {
            case 4:
              item2.shangquan = this.toDecimal2(item3.money);
              item2.gg = this.accAdd(Number(item2.gg), Number(item3.money));
              break;
            case 2:
              item2.huangjin = this.toDecimal2(item3.money);
              item2.gg = this.accAdd(Number(item2.gg), Number(item3.money));
              break;
            case 3:
              item2.bojin = this.toDecimal2(item3.money);
              item2.gg = this.accAdd(Number(item2.gg), Number(item3.money));
              break;
            case 1:
              item2.zuanshi = this.toDecimal2(item3.money);
              item2.gg = this.accAdd(Number(item2.gg), Number(item3.money));
              break;
            default:
              break;
          }
        })
        tempList.push(item2);
      })
      // console.log(tempList)
      this.setState({ list: this.state.list.concat(data.data), last_page: res.data.last_page, qList: this.state.qList.concat(tempList) })

    } else if (res.code === 200 && res.data.data.length == 0) {
      this.setState({ hasMore: false })
    }
  };

  getData2 = async (query?: any) => {
    const res = await request({
      url: 'v3/ads/statsSum',
      params: {
        ...query,
      }
    });
    if (res.code === 200) {
      let sum_money = this.toDecimal2(res.data.sum_money);
      this.setState({ sum_money: sum_money })
    }
  };

  handleLayoutChange = (query: any) => {
    this.setState({
      page: 1,
      hasMore: true,
      list: [],
      qList: [],
      pay_status: query.hot.id || undefined,
      start_time: query.time ? moment(query.time).unix() : undefined,
      end_time: query.time ? moment(query.end_time).unix() : undefined
    }, () => {

      this.getData({
        position_id: query.hot.id && query.hot.id != 0 ? query.hot.id : undefined,
        start_time: query.time ? query.time : undefined,
        end_time: query.end_time ? query.end_time : undefined
      });
      this.getData2({
        position_id: query.hot.id && query.hot.id != 0 ? query.hot.id : undefined,
        start_time: query.time ? query.time : undefined,
        end_time: query.end_time ? query.end_time : undefined
      });
    })

  };

  handleLoadMore = () => {
    if (this.state.hasMore) {
      this.setState({
        page: this.state.page + 1
      }, () => {
        this.getData({
          position_id: this.state.pay_status && this.state.pay_status != 0 ? this.state.pay_status : undefined,
          start_time: this.state.time,
          end_time: this.state.end_time
        })
      })
    }

  }

  pushPage = (pathname: string, query: object, e: object) => {
    console.log(pathname, query);
    router.push({ pathname, query })
  };

  accAdd = (arg1: Number, arg2: Number) => {
    var r1, r2, m, c, res;
    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
      var cm = Math.pow(10, c);
      if (r1 > r2) {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", "")) * cm;
      } else {
        arg1 = Number(arg1.toString().replace(".", "")) * cm;
        arg2 = Number(arg2.toString().replace(".", ""));
      }
    } else {
      arg1 = Number(arg1.toString().replace(".", ""));
      arg2 = Number(arg2.toString().replace(".", ""));
    }
    res = this.toDecimal2(String((arg1 + arg2) / m))
    return res;
  }

  toDecimal2 = (x: any) => {
    var f = parseFloat(x);
    if (isNaN(f)) {
      return false;
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + 2) {
      s += '0';
    }
    return s;
  }
  render() {
    const financeList = this.state.list.length ? (
      this.state.qList.map((item: any, index: number) => (
        <div className={styles.AdvertisingSpendingList} key={index} >
          <div className={styles.AdvertisingTitle} >
            <div className={styles.AdvertisingDate} >{item.date}</div>
            <div className={styles.AdvertisingTotalMoney} >￥{item.gg}</div>
          </div>
          {
            this.state.pay_status && this.state.pay_status != 4 ? null : <div className={styles.AdvertisingContent} >
              <div className={styles.AdvertisingName} >商圈广告消费</div>
              <div className={styles.AdvertisingMoneyBox} >
                <div className={styles.AdvertisingMoney} >￥{item.shangquan}</div>
                <Icon type="right" color="#bcbcbc" />
              </div>
            </div>
          }
          {
            this.state.pay_status && this.state.pay_status != 2 ? null : <div className={styles.AdvertisingContent} >
              <div className={styles.AdvertisingName} >黄金广告消费</div>
              <div className={styles.AdvertisingMoneyBox} >
                <div className={styles.AdvertisingMoney} >￥{item.huangjin}</div>
                <Icon type="right" color="#bcbcbc" />
              </div>
            </div>
          }
          {
            this.state.pay_status && this.state.pay_status != 3 ? null : <div className={styles.AdvertisingContent} >
              <div className={styles.AdvertisingName} >铂金广告消费</div>
              <div className={styles.AdvertisingMoneyBox} >
                <div className={styles.AdvertisingMoney} >￥{item.bojin}</div>
                <Icon type="right" color="#bcbcbc" />
              </div>
            </div>
          }
          {
            this.state.pay_status && this.state.pay_status != 1 ? null :
              <div className={styles.AdvertisingContent}>
                <div className={styles.AdvertisingName} >钻石广告消费</div>
                <div className={styles.AdvertisingMoneyBox} >
                  <div className={styles.AdvertisingMoney} >￥{item.zuanshi}</div>
                  <Icon type="right" color="#bcbcbc" />
                </div>
              </div>
          }
        </div>
      ))
    ) : (
        <NoData type="finance" />
      );
    const list = [{ name: '金额总计', num: '￥' + this.state.sum_money }]
    return (
      <FiltrateLayout
        undetermined={this.undetermined}
        hasInsignificant={true}
        insignificant={list}
        onChange={this.handleLayoutChange}
        greyBackground={true}
      >
        {financeList}




        {
          this.state.list.length > 1 ? <p style={{ textAlign: "center" }} onClick={this.handleLoadMore.bind(this)}>{this.state.hasMore ? "点击加载更多" : "已经到达底线了"}</p> : null
        }
      </FiltrateLayout>

    );
  }
}
