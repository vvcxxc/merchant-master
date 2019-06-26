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

  componentDidMount (){
    request({
      url: 'api/merchant/staff/withdrawLogList',
      method: 'get',
      data: {
        page: 1
      }
    }).then(res =>{
      let { data, total, withdraw_sum } = res;
      this.setState({
        list: data,
        total,
        withdraw_sum
      });
    });
  }

  more = () => {
    let { total } = this.state;
    let sum = Math.ceil(total/12);
    if(this.state.page <= sum){
      request({
        url: 'api/merchant/staff/withdrawLogList',
        method: 'get',
        data: {
          page: 2
        }
      }).then(res =>{
        let { data, total } = res;
        this.setState({
          list: this.state.list.concat(data),
          total,
        });
      },function(){
        // console.log(this.state.list)
      });
    }else{
      this.setState({hasMore: false})
    }

  }



  render (){
    const item = this.state.list.map((data,idx)=>{
      return(
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
      <div className={styles.list_page}>
        <WingBlank>
          <Flex className={styles.title}>提现总金额：<span>￥{this.state.withdraw_sum}</span></Flex>
        </WingBlank>
        {item}
      </div>
    )
  }
}
