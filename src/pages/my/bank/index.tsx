import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, Button } from 'antd-mobile'
import request from '@/services/request';
import router from 'umi/router'

export default class MyBank extends Component {
  state = {
    info: [],
    is_show: true,
  };
  componentDidMount() {
    request({
      url: 'api/merchant/staff/userBankList',
      method: 'post',
    }).then(res => {
      let { data } = res;
      if (data[0].bank_info) {
        this.setState({
          info: data[0]
        })
      } else {
        this.setState({ is_show: false })
      }

    })
  }

  toChange = () => {
    router.push('bank/changeBank')
  }
  /**卡号每4位加空格 */
  replaceStr = (str: any) => {
    if (str != undefined) {
      return str.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
    }
  }
  render() {
    let info:any = this.state.info
    const bank = this.state.is_show == true ? (
      <div>
        <div className={styles.bank_card}>
            <Flex className={styles.bank_name}>{info.bank_name}</Flex>
            <Flex className={styles.bank_type}>储蓄卡</Flex>
            <Flex className={styles.bank_num}>{this.replaceStr(info.bank_info)}</Flex>
          </div>
          {/* <Button className={styles.button} onClick={this.toChange}>修改银行卡</Button> */}
      </div>
    ) : (
        <Flex justify='around' className={styles.no_bank}>
          <img src={require('./bank.png')} />
        </Flex>
      )
    return (
      <div style={{ width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }}>
        <WingBlank>
          {bank}
        </WingBlank>
      </div>
    )
  }
}
