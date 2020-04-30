import React, { Component } from 'react'
import { Flex } from 'antd-mobile'
import GiftItem from './item'
import styles from './index.less'

export default class Gift extends Component {
  state = {

  }

  render() {
    return (
      <div className={styles.gift_page}>
        <Flex className={styles.gift_header} align='center'>
          <img className={styles.header_img} src='http://tmwl.oss-cn-shenzhen.aliyuncs.com/front/YkrCDnRhAH2ip5kAbys5sCSHMBXrQJG6.png' alt='' />
          派送数量：100
        </Flex>
        <GiftItem list={[]} name='发起拼团' />
        <GiftItem list={[]} name='参团有礼' />
        <GiftItem list={[]} name='成团有礼' />
        <GiftItem list={[]} name='成交有礼' />
      </div>
    )
  }
}
