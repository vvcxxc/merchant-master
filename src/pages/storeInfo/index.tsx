/**
 * 门店信息
 */

import React, { Component } from 'react';
import styles from './index.less';
import { WingBlank, Flex, InputItem, List, Picker, ImagePicker} from 'antd-mobile';
import router from 'umi/router';
import request from '@/services/request';
import MapPage from '@/pages/createStore/map/index';
import { templateLiteral } from '@babel/types';

const Item = List.Item;
export default class StoreInfo extends Component {
  state = {
    store_name: '',
    address: '',
    house_num: '',
    phone: '',
    value: [],
    manage_type: '',
    manage_list: [],
    store_head: [],
    store_img1: [],
    store_img2: [],
    store_img3: [],

    store_door_header_img: '',
    store_img_one: '',
    store_img_two: '',
    store_img_three: '',
    is_map: false,
    account_mobile: ''


  };
  componentDidMount (){
    /**获取经营品类 */
    request({
      url: 'v3/manage_type',
      method: 'get',
    }).then( res => {
      let { data } = res;
      this.setState({ manage_list : data });
    });
    request({
      url: 'v3/stores',
      method: 'get',
    }).then(res => {
      let {data} = res;
      this.setState({
        store_name: data.name,
        phone: data.tel,
        address: data.address,
        shop_door_header_img: data.shop_door_header_img,
        store_img_two: data.store_img_two,
        store_img_one: data.store_img_one,
        account_mobile: data.account_mobile,
        manage_type: data.manage_type_id
      })
    })
  }


  /**经营类型的选择 */
  Checkout = (v : any) => {
    this.setState({ manage_type : v[0] });
    this.setState({ value : v });
  }
  /**设置门头照 */
  Storechange = (files: Object) => {
    this.setState({
      store_head: files,
    });

  }
  /**设置环境照 */
  StoreImg1 = (files: Object) => {
    this.setState({
      store_img1: files,
    });
  }
  StoreImg2 = (files: Object) => {
    this.setState({
      store_img2: files,
    });
  }
  StoreImg3 = (files: Object) => {
    this.setState({
      store_img3: files,
    });
  }

  /**修改密码去 */
  toChangePassword = () => {
    router.push('/storeInfo/change/changepassword')
  }
  /**去换绑手机 */
  toChangePhone = () => {
    router.push({
      pathname: '/storeInfo/change/changephone'
    })
  }
  handleStoreName = (e: any) => {
    this.setState({store_name: e})
  }
  handleHouseNum = (e: any) => {
    this.setState({house_num: e})
  }
  handlePhone = (e: any) => {
    this.setState({phone: e})
  }


  /**地图的回调 */
  mapChange = (location: object, address: string) => {
    this.setState({
      location,
      address,
      is_map: false
    })
  }
  /**打开地图 */
  openMap = () => {
    this.setState({is_map: true});
  }

  render (){
    const map = this.state.is_map == true ? (
      <MapPage onChange={this.mapChange}/>
    ) : (
      ''
    )

    const { store_head, store_img1, store_img2, store_img3, store_name, address, house_num, phone, account_mobile} = this.state;
    return (
      <div style={{ width: '100%', height: '100%', background: '#fff' }}>
        <WingBlank className={styles.inputBox}>
          <List>
            <InputItem placeholder='门店名称' value={store_name} onChange={this.handleStoreName}>门店名称</InputItem>
            <InputItem placeholder='门店地址' onClick={this.openMap} value={address}>门店地址</InputItem>
            <InputItem placeholder='请输入详细门牌号，如：5栋2楼401' value={house_num} onChange={this.handleHouseNum}>门牌号</InputItem>
            <InputItem placeholder='门店电话' value={phone} onChange={this.handlePhone}>门店电话</InputItem>
            <Flex className={styles.pickers}>
              <Picker
                style={{width : '100%', fontSize: '28px'}}
                data={this.state.manage_list}
                cols={1}
                onOk={this.Checkout}
                value={this.state.value}
              >
                <List.Item arrow="horizontal">经营品类</List.Item>
              </Picker>
            </Flex>
            <Flex className={styles.picker_img}>
              <div className={styles.picker_title}>
                门头照
              </div>
              <div>
              <ImagePicker
                className={styles.img_picker}
                style={{ width: '100%'}}
                files={store_head}
                multiple={false}
                length={1}
                selectable={store_head.length < 1}
                onChange={this.Storechange}
              />
              </div>
            </Flex>
            <Flex className={styles.picker_img}>
              <div className={styles.picker_title}>环境照</div>
              <Flex style={{width: 'auto'}}>
                <ImagePicker
                  className={styles.img_picker}
                  style={{ width: '100%'}}
                  files={store_img1}
                  multiple={false}
                  length={1}
                  selectable={store_img1.length < 1}
                  onChange={this.StoreImg1}
                />
                <ImagePicker
                  className={styles.img_picker}
                  style={{ width: '100%'}}
                  files={store_img2}
                  multiple={false}
                  length={1}
                  selectable={store_img2.length < 1}
                  onChange={this.StoreImg2}
                />
                <ImagePicker
                  className={styles.img_picker}
                  style={{ width: '100%'}}
                  files={store_img3}
                  multiple={false}
                  length={1}
                  selectable={store_img3.length < 1}
                  onChange={this.StoreImg3}
                />
              </Flex>
            </Flex>
            <Item extra="修改" arrow="horizontal" onClick={this.toChangePassword}>修改账户密码</Item>
            <Item extra={account_mobile} arrow="horizontal" onClick={this.toChangePhone}>换绑手机</Item>
          </List>
        </WingBlank>
        {map}
      </div>
    )
  }
}
