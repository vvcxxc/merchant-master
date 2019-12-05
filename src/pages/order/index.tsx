/**
 * title: 我的订单
 */

import React, { Component } from 'react';
import styles from './index.less';
import { WingBlank, Flex, Toast, Tabs } from 'antd-mobile';
import FiltrateLayout from '../../components/selectLayout';
import request from '@/services/request';
import moment from 'moment';
import router from 'umi/router';
import NoData from '@/components/no-data';
import { connect } from 'dva';
const tabs = [
  { title: '已核销', id: 2 },
  { title: '未核销', id: 1 },
  { title: '已退款', id: 3 },
];
export default connect(({ orderList }: any) => orderList)(
  class OrderPage extends Component<any> {
    state = {
      list: [],
      total: 0,

      page: 1,
      hasMore: true,

      pay_status: '2',   // 模糊查询筛选
      begin: undefined,           // 模糊查询月份
      end: undefined,
      amount: '',
      youhui_type: undefined
    };


    undetermined = {
      title: '订单类型',
      list: [
        { id: 1, label: '现金券' },
        { id: 0, label: '兑换券' },
      ]
    };
    componentDidMount() {
      if(this.props.list.length == 0){
        this.getData();
      }
    }

    getData = async (query?: any) => {
      // Toast.loading('');
      console.log(moment(1575129600 * 1000).format('YYYY-MM-DD'))
      let params = {}
      let begin = moment().add('month', 0).format('YYYY-MM') + '-01'
      let end = moment(begin).add('month', 1).add('days', -1).format('YYYY-MM-DD')
      if (query){
        // 条件查询
        if(query.begin){
          params = query
        }else{
          params = {
            ...query,
            begin: moment(begin).unix(),
            end: moment(end).unix()
          }
        }
      }else{
        // 初始化
        params = {
          ...this.props.query,
          begin: moment(begin).unix(),
          end: moment(end).unix()
        }
      }
      const res = await request({
        url: 'v3/coupons/order_list',
        params
      });
      Toast.hide();
      if (res.code === 200 && res.data.length != 0) {
        this.props.dispatch({
          type: 'orderList/setList',
          payload: {
            list: [...this.props.list,...res.data],
            total: res.total,
            amount: res.amount
          }
        })
      } else if (res.code === 200 && res.data.length == 0) {
        this.setState({ hasMore: false })
        this.props.dispatch({
          type: 'orderList/setList',
          payload: {
            list: this.props.list,
            total: res.total,
            amount: res.amount
          }
        })
      }
    };

    handleLayoutChange = (query: any) => {
      // 先清空list列表
      this.props.dispatch({type: 'orderList/reset'})
      this.props.dispatch ({
        type: 'orderList/setQuery',
        payload: {
          pay_status: query.tab_index,
          youhui_type: query.hot.id,
          begin: query.time ? moment(query.time).unix() : undefined,
          end: query.time ? moment(query.end_time).unix() : undefined,
          page: 1
        }
      })

      if(!query.end_time && !query.time && !query.hot.id){
        // 重置
        console.log('123123123')
        this.getData({
          pay_status: query.tab_index || 2,
          youhui_type: query.hot.id,
          begin: query.time ? moment(query.time).unix() : undefined,
          end: query.time ? moment(query.end_time).unix() : undefined,
        });
        return
      }else {
        // 筛选
        this.getData({
          pay_status: query.tab_index || 2,
          youhui_type: query.hot.id || this.props.query.youhui_type,
          begin: query.time ? moment(query.time).unix() : undefined,
          end: query.time ? moment(query.end_time).unix() : undefined,
        });
      }



    };

    handleClickOrder = (id: any) => () => {
      router.push({ pathname: '/order/detail', query: { id } });
    };


    handleLoadMore = () => {
      if (this.state.hasMore) {
        // console.log(this.state)
        // this.setState({
        //   page: this.state.page + 1
        // }, () => {
        //   this.getData({
        //     pay_status: this.state.pay_status,
        //     begin: this.state.begin,
        //     end: this.state.end,
        //     page: this.state.page,
        //     youhui_type: this.state.youhui_type
        //   })
        // })
        this.getData({
          pay_status: this.props.query.pay_status,
          begin: this.props.query.begin,
          end: this.props.query.end,
          page: this.props.query.page + 1,
          youhui_type: this.props.query.youhui_type
        })
        this.props.dispatch ({
          type: 'orderList/setQuery',
          payload: {
            ...this.props.query,
            page: this.props.query.page + 1
          }
        })
      }

    }

    tabIndex = (index: number) => {
      switch(index){
        case 1:
          return 1
          break
        case 2:
          return 0
        case 3:
          return 2
      }
    }



    render() {
      const orderList = this.props.list.length ? (
        this.props.list.map((_: any, index) => (
          <Flex className={styles.orderItem} key={index} onClick={this.handleClickOrder(_.id)}>
            <img src={require('@/assets/index/in_store_return.png')} />
            <Flex className="content">
              <div className='content_main'>
                <div className="ordernum">{_.youhui_sn}</div>
                <div className="time">{_.create_time}</div>
              </div>
              <div className='content_right'>
                <div className="money">{_.money}</div>
                <div className="name">{_.youhui_type == 1 ? '现金券' : '兑换券'}</div>
              </div>
              <div className='right_back'>
                <img src={require('@/assets/right_back.png')} />
              </div>
            </Flex>
          </Flex>
        ))
      ) : (
          <NoData type="order" />
        );
      const list = [{ name: '交易笔数', num: this.props.total }, { name: '交易金额', num: this.props.amount }]
      return (
        <FiltrateLayout
          undetermined={this.undetermined}
          hasInsignificant={true}
          insignificant={list}
          onChange={this.handleLayoutChange}
          tab={tabs}
          timeSelect={this.props.query.begin ? moment(this.props.query.begin * 1000).format() : undefined}
          endTimeSelect={this.props.query.end ? moment(this.props.query.end * 1000).format() : undefined}
          idSelect={this.props.query.youhui_type}
          tabIn={this.tabIndex(this.props.query.pay_status)}
        >
          {orderList}

          <p style={{ textAlign: "center" }} onClick={this.handleLoadMore.bind(this)}>{this.state.hasMore ? "点击加载更多" : "已经到达底线了"}</p>
        </FiltrateLayout>

      );
    }
  })
