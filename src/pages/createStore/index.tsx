import React, { Component } from 'react';
import { Flex, WingBlank, Button, Toast, Picker, List, Icon, ImagePicker } from 'antd-mobile';
import styles from './index.less';
import request from '@/services/request';
import router from 'umi/router';

export default class CreateStore extends Component {
  state = {
    /**店铺名 */
    name: '',
    /**店铺地址 */
    address: '',
    /**门店电话 */
    phone: '',
    /**经营范围 */
    manage_type: '',
    /**邮箱 */
    email: '',
    /**经营品类范围 */
    manage_list: [],
    value: [],
    /**门头照 */
    files: [],
    /**个人照 */
    my_files: [],
    /**oss信息 */
    oss_data: {}
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

    /**获取oss */
    request({
      url: 'api/v2/up',
      method: 'get'
    }).then( res => {
      let { data } = res.data;
      this.setState({ oss_data : data });
    });




  }


  /**设置门店名 */
  handleName = (e : any) => {
    this.setState({name : e.target.value})
  };
  /**设置门店电话 */
  handlePhone = (e : any) => {
    this.setState({phone : e.target.value})
  };
  /**设置邮箱 */
  handleEmail = (e : any) => {
    this.setState({email : e.target.value})
  };

  /**经营类型的选择 */
  Checkout = (v : any) => {
    this.setState({ manage_type : v[0] });
    this.setState({ value : v });
  }

  /**查看示例 */
  toExample = () => {
    router.push('/createStore/example');
  }

  /**门店图片选择后 */
  Storechange = (files: Object) => {
    this.setState({
      files,
    });

  }
  /**个人照 */
  Mychange = (files: Object) => {
    this.setState({
      my_files: files,
    });
  }


  render() {
    const { files, my_files } = this.state;
    return (
      <div style={{ height: 'auto', width: '100%', background:' #fff', paddingBottom: 60 }}>
          <WingBlank className={styles.wrap}>
            <Flex className={styles.inputWrap}>
              <span>门店名称</span>
              <input
                type="text"
                placeholder='请输入门店名称'
                value={this.state.name}
                onChange={this.handleName}
              />
            </Flex>
            <Flex className={styles.inputWrap}>
              <span>门店地址</span>
              <input
                type="text"
                placeholder='请输入门店地址'
                readOnly={true}
              />
              <Icon type='right' />
            </Flex>
            <Flex className={styles.inputWrap}>
              <span>门店电话</span>
              <input
                type="text"
                placeholder='请输入手机号、座机（需加区号）'
                value={this.state.phone}
                onChange={this.handlePhone}
              />
            </Flex>
            <Flex className={styles.inputWrap}>
            <Picker
              className={styles.picker}
              style={{width : '100%', fontSize: '28px'}}
              data={this.state.manage_list}
              cols={1}
              onOk={this.Checkout}
              value={this.state.value}
            >
              <List.Item arrow="horizontal">经营品类</List.Item>
            </Picker>
            </Flex>
            <Flex className={styles.inputWrap}>
              <span>邮箱</span>
              <input
                type="text"
                placeholder='请输入邮箱（非必填）'
                value={this.state.email}
                onChange={this.handleEmail}
              />
            </Flex>
            <Flex className={styles.imgWrap}>
              <div className={styles.imgTitle}>上传门头照</div>
              <div className={styles.example} onClick={this.toExample}>查看示例</div>
            </Flex>
            <Flex className={styles.pushStore}>
              {/* <img src={require('./shangchuan.png')} /> */}
              <ImagePicker
                style={{ width: '100%'}}
                files={files}
                multiple={false}
                length={1}
                selectable={files.length < 1}
                onChange={this.Storechange}
              />
            </Flex>
            <Flex className={styles.imgWrap}>
              <div className={styles.imgTitle}>上传个人照</div>
            </Flex>
            <Flex className={styles.imgSmall}>
              <ImagePicker
                files={my_files}
                multiple={false}
                length={2}
                selectable={my_files.length < 2}
                onChange={this.Mychange}
              />
            </Flex>
              <Button type="primary" style={{ marginTop: 60, paddingBottom: 60 }}>
                确认创建
              </Button>

          </WingBlank>
      </div>
    )
  }
}
