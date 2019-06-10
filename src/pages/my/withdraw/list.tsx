import React, { Component } from 'react';
import styles from './index.less';
import { Flex, Button, WingBlank, ListView } from 'antd-mobile';
import request from '@/services/request'

export default class WithDrawList extends Component {
  state = {

  };

  componentDidMount (){
    request({
      url: 'api/merchant/staff/withdrawLogList',
      method: 'get',
    }).then(res =>{

    })
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
