/**
 * 店铺邀请二维码
 */

import React, {Component} from 'react';
import styles from './index.less';
import { Flex, WingBlank } from 'antd-mobile';

export default class InviteQrCode extends Component {
  state = {

  }

  render (){
    return (
        <div className={styles.pages}>
          <Flex style={{marginTop: 41}} justify='around'>
            <div className={styles.title}>
              <p>邀请店铺</p>
              <p>领好礼</p>
            </div>
          </Flex>
          <WingBlank className={styles.qrCode}>
            1
          </WingBlank>
          <Flex className={styles.my_invite} justify='around'>
            <div>
              <p>成功邀请（人）</p>
              <p>20</p>
            </div>
            <div>
              <p>我的分成（元）</p>
              <p>2000</p>
            </div>
          </Flex>
        </div>

    )
  }
}
