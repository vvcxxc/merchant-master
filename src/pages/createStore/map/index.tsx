/**
 * 门店地址
 */
import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, Button, Toast, Icon, List, InputItem} from 'antd-mobile';
import request from '@/services/request';
import { Map } from 'react-amap';

export default class MapPage extends Component {
  state = {

  };

  render (){
    return (
      <div className={styles.box}>
        <WingBlank>
          <Flex className={styles.inputWrap}>

            <div className={styles.city}>
              <div className={styles.city_name}>广州</div>
              <div className={styles.icon}>
                <Icon type='down' color='#000' size='xxs'/>
              </div>
            </div>

            <Flex className={styles.inputBox}>
              <div className={styles.inputicon}><img src={require('./icon-map.png')} /></div>
              <Flex>
                <InputItem
                  placeholder='请输入详细门牌号'
                >广州市天河区
                </InputItem>
              </Flex>
            </Flex>
          </Flex>
        </WingBlank>
        <div className={styles.mapbox}>
          <Map amapkey={'47d12b3485d7ded218b0d369e2ddd1ea'}/>
        </div>
      </div>
    )
  }
}
