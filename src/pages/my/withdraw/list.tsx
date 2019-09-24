import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank } from 'antd-mobile';
import request from '@/services/request';


export default class WithDrawList extends Component {
  state = {
    scrollDom: '',
    list: [],
    page: 1,
    total: 0,
    hasMore: true,
    withdraw_sum: ''
  };

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    request({
      url: 'api/merchant/staff/withdrawLogList',
      method: 'get',
      params: {
        page: this.state.page
      }
    }).then(res => {
      let { data, total, withdraw_sum } = res;
      this.setState({
        list: this.state.list.concat(data),
        total,
        withdraw_sum,
        hasMore: res.data.length != 0 ? true : false
      });
    });
  }

  // more = () => {
  //   let { total } = this.state;
  //   let sum = Math.ceil(total/12);
  //   if(this.state.page <= sum){
  //     request({
  //       url: 'api/merchant/staff/withdrawLogList',
  //       method: 'get',
  //       data: {
  //         page: 2
  //       }
  //     }).then(res =>{
  //       let { data, total } = res;
  //       this.setState({
  //         list: this.state.list.concat(data),
  //         total,
  //       });
  //     },function(){
  //       //
  //     });
  //   }else{
  //     this.setState({hasMore: false})
  //   }

  // }

  handleLoadMore = () => {
    if (this.state.hasMore) {
      this.setState({
        page: this.state.page + 1
      }, () => {
        this.getData()
      })
    }
  }



  render() {
    const item = this.state.list.map((data, idx) => {
      return (
        <div className={styles.item} key={data.id}>
          <Flex className={styles.item_li}>
            <div >余额提现</div>
            <div className={styles.money}>{data.money}</div>
          </Flex>
          <Flex className={styles.item_li}>
            <div className={styles.time}>{data.create_time}</div>
            <div className={styles.type}>{data.status_msg}</div>
          </Flex>
        </div>
      )
    });


    return (
      <div className={styles.list_page} >
        <WingBlank>
          <Flex className={styles.title}>提现总金额：<span>￥{this.state.withdraw_sum}</span></Flex>
        </WingBlank>
        {item}
        <p style={{ textAlign: "center" }} onClick={this.handleLoadMore.bind(this)}>{this.state.hasMore ? "点击加载更多" : "已经到达底线了"}</p>
      </div>
    )
  }
}
