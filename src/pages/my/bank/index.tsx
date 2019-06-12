import React, {Component} from 'react';
import styles from './index.less';
import { Flex, WingBlank, Button } from 'antd-mobile'
import request from '@/services/request';
import router from 'umi/router'

export default class MyBank extends Component {
  state = {
    info: []
  };
  componentDidMount (){
    request({
      url: 'api/merchant/staff/userBankList',
      method: 'post',
    }).then(res => {
      let { data } = res;
      this.setState({
        info: data[0]
      })
    })
  }

  toChange = () => {
    router.push('bank/changeBank')
  }

  render (){
    const { info } = this.state;
    return (
      <div style={{width: '100%', height: '100%', background: '#fff', overflow: 'hidden'}}>
        <WingBlank>
          <div className={styles.bank_card}>
            <Flex className={styles.bank_name}>{info.bank_name}</Flex>
            <Flex className={styles.bank_type}>储蓄卡</Flex>
            <Flex className={styles.bank_num}>{info.bank_info}</Flex>
          </div>
          <Button className={styles.button} onClick={this.toChange}>修改银行卡</Button>
        </WingBlank>
      </div>
    )
  }
}
