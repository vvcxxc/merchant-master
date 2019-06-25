import React, {Component} from 'react';
import styles from './index.less';
import { Flex, WingBlank } from 'antd-mobile';
import axios from 'axios';

export default class GiftDetails extends Component {
  state = {

  };
  componentDidMount (){
    // axios.post({
    //   url: ''
    // })
  }
  render (){
    return (
      <div className={styles.details}>
        <img src="" />
        <WingBlank>
          <div>
            <p className={styles.gift_name}>简约个性  陶瓷创意马克茶杯个性</p>
            <p className={styles.gift_price}>2018元</p>
            <Flex>
              <div>快递：8元</div>
              <div>半年销量 326</div>
            </Flex>
          </div>
          <Flex className={styles.title} align='end'>
            <div className={styles.gang}>{null}</div>
            商品详情
          </Flex>
          <img src=""/>
          <img src=""/>
          <Flex className={styles.title} align='end'>
            <div className={styles.gang}>{null}</div>
            配送方式
          </Flex>
          <ul>
            <li>快递信息：韵达快递</li>
            <li>快递价格：8元</li>
            <li>发货周期：活动完成后48小时内发货，节假日自动顺延</li>
            <li>特别提示：特别提示的文案内容特别提示的文案内容，特别提示的文案内容特别提示的文案内容。</li>
          </ul>
        </WingBlank>

      </div>
    )
  }
}
