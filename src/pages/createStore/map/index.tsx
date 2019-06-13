/**
 * 门店地址
 */
import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, Button, Icon, InputItem, PickerView} from 'antd-mobile';
import { Map } from 'react-amap';
import axios from 'axios';
export default class MapPage extends Component {
  state = {
    city_list: []
  };

  componentDidMount (){
    axios({
      url: 'http://test.api.tdianyi.com/v3/district',
      method: 'get'
    }).then(res => {
      this.setState({
        city_list: res.data.data
      })
    })
  }



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
              <div className={styles.inputIcon}><img src={require('./icon-map.png')} /></div>
              <Flex>
                <InputItem
                  placeholder='请输入详细门牌号'
                >广州市天河区
                </InputItem>
              </Flex>
            </Flex>
          </Flex>
          <PickerView
            data={this.state.city_list}
            value={['02', '02-1', '02-1-1']}
          />
        </WingBlank>
        <div className={styles.mapBox}>
          <Map amapkey={'47d12b3485d7ded218b0d369e2ddd1ea'}/>
        </div>
      </div>
    )
  }
}
