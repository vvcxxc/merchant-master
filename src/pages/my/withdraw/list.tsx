import React, { Component } from 'react';
import styles from './index.less';
import { Flex, Button, WingBlank, ListView } from 'antd-mobile';
import request from '@/services/request'

export default class WithDrawList extends Component {
  state = {
    scrollDom: ''
  };

  componentDidMount (){
    request({
      url: 'api/merchant/staff/withdrawLogList',
      method: 'get',
      data: {
        page: 2
      }
    }).then(res =>{
    });
    document.addEventListener('scroll',this.handleChangeScroll)
  }

  handleChangeScroll = () => {
    let scrollTop = document.documentElement.scrollTop;
    let clientHeight = window.innerHeight;
    let scrollHeight = document.documentElement.scrollHeight;
    // console.log(scrollTop,clientHeight,scrollHeight);
    let is_bottom = scrollTop + clientHeight === scrollHeight;
    // console.log(is_bottom);
    if(is_bottom){
      alert('距离顶部的高：'+scrollTop+'视窗高度：'+clientHeight+'总高度：'+scrollHeight)
    }
  }



  render (){
    return (
      <div className={styles.list_page}>
        <WingBlank>
          <Flex className={styles.title}>提现总金额：<span>￥2,333.00</span></Flex>
          <div>

            <div className={styles.item}>
              <Flex className={styles.item_li}>
                <div >余额提现</div>
                <div className={styles.money}>50.00</div>
              </Flex>
              <Flex className={styles.item_li}>
                <div className={styles.time}>12-12 18:00</div>
                <div className={styles.type}>提现成功</div>
              </Flex>
            </div>

            <div className={styles.item}>
              <Flex className={styles.item_li}>
                <div >余额提现</div>
                <div className={styles.money}>50.00</div>
              </Flex>
              <Flex className={styles.item_li}>
                <div className={styles.time}>12-12 18:00</div>
                <div className={styles.type}>提现成功</div>
              </Flex>
            </div>



          </div>
        </WingBlank>
      </div>
    )
  }
}
