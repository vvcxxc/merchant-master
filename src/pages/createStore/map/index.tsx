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
    city_list: [],
    // 城市选择页
    is_show: true,
    // picker的value
    value: [],
    // picker选好的值
    city: [],
    // 城市名称
    city_name: '北京',
    // 省市区
    province: '北京'
  };

  componentDidMount (){
    axios({
      url: 'http://test.api.tdianyi.com/v3/district',
      method: 'get'
    }).then(res => {
      this.setState({
        city_list: res.data.data
      })
    });
  }

  handleChangeCity = (e: any) => {
    this.setState({value: e})
  }

  pickerCityClose = () => {
    this.setState({is_show: false, value: []});
  }
  pickerCityOpen = () => {
    this.setState({is_show: true})
  }
  pickerCityOk = () => {
    let { value } = this.state;
    let city_name = value[1];
    let province = '';
    for (let i = 0; i < value.length; i ++){
      province += value[i]
    }
    this.setState({
      is_show: false,
      city: this.state.value,
      city_name,
      province
    })
  }



  render (){
    const picker = this.state.is_show == true ? (
      <div className={styles.picker}>
          <Flex className={styles.picker_buttons}>
            <span onClick={this.pickerCityClose}>取消</span>
            <span onClick={this.pickerCityOk}>完成</span>
          </Flex>
          <PickerView
            onChange={this.handleChangeCity}
            data={this.state.city_list}
            value={this.state.value}
          />
        </div>
    ) : (
      ''
    );
    const { city_name, province } = this.state;




    return (
      <div className={styles.box}>
        <WingBlank>
          <Flex className={styles.inputWrap}>

            <div className={styles.city}>
              <div className={styles.city_name} onClick={this.pickerCityOpen}>{city_name}</div>
              <div className={styles.icon}>
                <Icon type='down' color='#000' size='xxs'/>
              </div>
            </div>

            <Flex className={styles.inputBox}>
              <div className={styles.inputIcon}><img src={require('./icon-map.png')} /></div>
              <Flex>
                <InputItem
                  placeholder='请输入详细门牌号'
                >{province}
                </InputItem>
              </Flex>
            </Flex>
          </Flex>

        </WingBlank>
        <div className={styles.mapBox}>
          <Map amapkey={'47d12b3485d7ded218b0d369e2ddd1ea'} zoom={13}/>
        </div>
        {picker}

      </div>
    )
  }
}
