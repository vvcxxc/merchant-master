/**
 * 门店信息
 */

import React, { Component } from 'react';
import styles from './index.less';
import { WingBlank, Flex, InputItem, List, Picker, ImagePicker} from 'antd-mobile';
import router from 'umi/router';
import request from '@/services/request';

const Item = List.Item;
export default class StoreInfo extends Component {
  state = {
    value: [],
    manage_type: '',
    manage_list: [],
    store_head: [],
    store_img1: [],
    store_img2: [],
    store_img3: []
  };
  componentDidMount (){
    /**获取经营品类 */
    request({
      url: 'v3/manage_type',
      method: 'get',
    }).then( res => {
      let { data } = res.data;
      this.setState({ manage_list : data });
    });
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

  render (){
    const { store_head, store_img1, store_img2, store_img3 } = this.state;
    return (
      <div style={{ width: '100%', height: '100%', background: '#fff' }}>
        <WingBlank className={styles.inputBox}>
          <List>
            <InputItem placeholder='门店名称'>门店名称</InputItem>
            <InputItem placeholder='门店地址'>门店地址</InputItem>
            <InputItem placeholder='门店电话'>门店电话</InputItem>
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
              <Flex>
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
            <Item extra="13012312312" arrow="horizontal">换绑手机</Item>
          </List>
        </WingBlank>
      </div>
    )
  }
}
