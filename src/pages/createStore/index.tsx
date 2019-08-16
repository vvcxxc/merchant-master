import React, { Component } from 'react';
import { Flex, WingBlank, Button, Toast, Picker, List, Icon, ImagePicker } from 'antd-mobile';
import styles from './index.less';
import request from '@/services/request';
import router from 'umi/router';
import upload from '@/services/oss';
import { connect } from 'dva';
import Cookies from 'js-cookie';

export default connect(({ createStore }: any) => createStore)(
  class CreateStore extends Component<any> {
    state = {
      /**店铺名 */
      name: '',
      /**店铺地址 */
      address: '',
      /**门牌号 */
      house_num: '',
      /**门店电话 */
      phone: '',
      /**经营范围 */
      manage_type: '',
      /**邮箱 */
      email: '',
      /**二维码 */
      _code: '',
      /**经营品类范围 */
      manage_list: [],
      value: [],
      /**门头照 */
      files: [],
      /**个人照 */
      my_files: [],
      /**个人照 */
      my_files2: [],
      /**oss信息 */
      oss_data: {},
      /**门头照图片 */
      store_door_header_img: '',
      /**个人照1 */
      store_img_one: '',
      /**个人照2 */
      store_img_two: '',
      /**是否展示地图 */
      is_map: false,
      is_example: false,
      /**经纬度 */
      location: {
        longitude: 0,
        latitude: 0
      }
    };

    componentDidMount() {
      if (Cookies.get("handleName")) {
        this.props.dispatch({
          type: 'createStore/setStore',
          payload: {
            name: Cookies.get("handleName") ? JSON.parse(Cookies.get("handleName")) : "",
            address: Cookies.get("handleAddress") ? JSON.parse(Cookies.get("handleAddress")) : "",
            house_num: Cookies.get("handleHouseNum") ? JSON.parse(Cookies.get("handleHouseNum")) : "",
            phone: Cookies.get("handlePhone") ? JSON.parse(Cookies.get("handlePhone")) : "",
            manage_type: Cookies.get("handleCheckout") ? JSON.parse(Cookies.get("handleCheckout"))[0] : "",
            value: Cookies.get("handleCheckout") ? JSON.parse(Cookies.get("handleCheckout")) : [],
            email: Cookies.get("handleEmail") ? JSON.parse(Cookies.get("handleEmail")) : "",
            _code: Cookies.get("handleCode") ? JSON.parse(Cookies.get("handleCode")) : "",
            files: localStorage.getItem("Storechange") ? JSON.parse(localStorage.getItem("Storechange")) : [],
            my_files: localStorage.getItem("Mychange") ? JSON.parse(localStorage.getItem("Mychange")) : [],
            my_files2: localStorage.getItem("Mychange2") ? JSON.parse(localStorage.getItem("Mychange2")) : []
          }
        })
      }

      /**获取经营品类 */
      request({
        url: 'v3/manage_type',
        method: 'get',
      }).then(res => {
        let { data } = res;
        this.setState({ manage_list: data });
      });


      /**获取oss */
      request({
        url: 'api/v2/up',
        method: 'get'
      }).then(res => {
        let { data } = res;
        console.log(data);
        let oss_data = {
          policy: data.policy,
          OSSAccessKeyId: data.accessid,
          success_action_status: 200, //让服务端返回200,不然，默认会返回204
          signature: data.signature,
          callback: data.callback,
          host: data.host,
          key: data.dir
        }
        this.setState({ oss_data });
      });



    }

    /**设置门店名 */
    handleName = (e: any) => {
      Cookies.set("handleName", JSON.stringify(e.target.value), { expires: 1 });
      // console.log(Cookies.get("storeinfo"));
      this.props.dispatch({
        type: 'createStore/setStore',
        payload: {
          name: e.target.value
        }
      })
    };
    /**设置门店电话 */
    handlePhone = (e: any) => {
      Cookies.set("handlePhone", JSON.stringify(e.target.value), { expires: 1 });
      this.props.dispatch({
        type: 'createStore/setStore',
        payload: {
          phone: e.target.value
        }
      })
    };
    /**设置邮箱 */
    handleEmail = (e: any) => {
      if (e.target.value.includes(" ")) {
        e.target.value = e.target.value.replace(/ /g, "")
      }
      if (e.target.value.includes("＠")) {
        e.target.value = e.target.value.replace(/＠/g, "@")
      }
      this.setState({ email: e.target.value }, () => {
        console.log(this.state.email)
      })
      Cookies.set("handleEmail", JSON.stringify(e.target.value), { expires: 1 });
      this.props.dispatch({
        type: 'createStore/setStore',
        payload: {
          email: e.target.value
        }
      })
    };

    handleCode = (e: any) => {
      Cookies.set("handleCode", JSON.stringify(e.target.value), { expires: 1 });
      this.setState({ _code: e.target.value })
      this.props.dispatch({
        type: 'createStore/setStore',
        payload: {
          _code: e.target.value
        }
      })
    };
    /**经营类型的选择 */
    Checkout = (v: any) => {
      // this.setState({ manage_type : v[0] });
      // this.setState({ value : v });
      Cookies.set("handleCheckout", JSON.stringify(v), { expires: 1 });
      this.props.dispatch({
        type: 'createStore/setStore',
        payload: {
          manage_type: v[0],
          value: v
        }
      })
    }

    /**门牌号 */
    handleHouseNum = (e: any) => {
      Cookies.set("handleHouseNum", JSON.stringify(e.target.value), { expires: 1 });
      this.setState({ house_num: e.target.value })
      this.props.dispatch({
        type: 'createStore/setStore',
        payload: {
          house_num: e.target.value
        }
      })
    }

    /**查看示例 */
    toExample = () => {
      router.push('createStore/example')
    }

    /**门店图片选择后 */
    Storechange = (files: any) => {
      localStorage.setItem("Storechange", JSON.stringify(files));
      // Cookies.set("Storechange", JSON.stringify(files), { expires: 1 });
      this.props.dispatch({
        type: 'createStore/setStore',
        payload: {
          files
        }
      })
      if (files[0]) {
        let img = files[0].url;
        upload(img).then(res => {
          let store_door_header_img = res.data.path || '';
          this.props.dispatch({
            type: 'createStore/setStore',
            payload: {
              store_door_header_img
            }
          })
        })
      } else {
        this.props.dispatch({
          type: 'createStore/setStore',
          payload: {
            store_door_header_img: ''
          }
        })
      }
    }
    /**个人照1 */
    Mychange = (files: any) => {
      localStorage.setItem("Mychange", JSON.stringify(files));
      this.props.dispatch({
        type: 'createStore/setStore',
        payload: {
          my_files: files
        }
      })
      if (files[0]) {
        let img = files[0].url;
        upload(img).then(res => {
          let store_img_one = res.data.path || '';
          this.props.dispatch({
            type: 'createStore/setStore',
            payload: {
              store_img_one
            }
          })
        })
      } else {
        this.props.dispatch({
          type: 'createStore/setStore',
          payload: {
            store_img_one: ''
          }
        })
      }
    }
    /**个人照2 */
    Mychange2 = (files: any) => {
      localStorage.setItem("Mychange2", JSON.stringify(files));
      this.props.dispatch({
        type: 'createStore/setStore',
        payload: {
          my_files2: files
        }
      })
      if (files[0]) {
        let img = files[0].url;
        upload(img).then(res => {
          let store_img_two = res.data.path || '';
          this.props.dispatch({
            type: 'createStore/setStore',
            payload: {
              store_img_two
            }
          })
        })
      } else {
        this.props.dispatch({
          type: 'createStore/setStore',
          payload: {
            store_img_two: ''
          }
        })
      }
    }


    /**打开地图 */
    openMap = () => {
      router.push('/createStore/map')
    }


    createStore = () => {
      let { name, address, house_num, phone, manage_type, email, _code, store_door_header_img, store_img_one, store_img_two, location } = this.props;
      if (name && address && house_num && phone && manage_type && email && store_door_header_img && store_img_one && store_img_two) {

        request({
          url: 'v3/stores',
          method: 'post',
          data: {
            store_name: name,
            address,
            house_num,
            phone,
            manage_type,
            store_door_header_img,
            store_img_one,
            store_img_two,
            xpoint: location.longitude,
            ypoint: location.latitude,
            email,
            code_id: _code
            //接口好了后把_code替换为正式的字段名
          }
        }).then(res => {
          let { code, data } = res;
          if (code == 200) {
            Toast.success(data, 2, () => {
              router.push('/submitQua');
            })
          } else {
            Toast.fail(data)
          }
        })
      } else {
        console.log(name + "," + address + "," + house_num + "," + phone + "," + manage_type + "," + email + "," + store_door_header_img + "," + store_img_one + "," + store_img_two)
        Toast.fail('请将信息填写完整')
      }
    }
    render() {
      const { files, my_files, my_files2 } = this.props;
      // const map = this.state.is_map == true ? (
      //   <MapPage onChange={this.mapChange}/>
      // ) : (
      //   ''
      // );
      return (
        <div style={{ height: 'auto', width: '100%', background: ' #fff', paddingBottom: 60 }}>
          <WingBlank className={styles.wrap}>
            <Flex className={styles.inputWrap}>
              <span>门店名称</span>
              <input
                type="text"
                placeholder='请输入门店名称'
                value={
                  Cookies.get("handleName") ? JSON.parse(Cookies.get("handleName")) : this.props.name
                }
                onChange={this.handleName}
              />
            </Flex>
            <Flex className={styles.inputWrap} onClick={this.openMap}>
              <span>门店地址</span>
              <input
                type="text"
                placeholder='请输入门店地址'
                readOnly={true}
                value={Cookies.get("handleAddress") ? JSON.parse(Cookies.get("handleAddress")) : this.props.address}
              />
              <Icon type='right' />
            </Flex>
            <Flex className={styles.inputWrap}>
              <span>门牌号</span>
              <input
                type="text"
                placeholder='请输入详细门牌号，如：5栋2楼401'
                value={Cookies.get("handleHouseNum") ? JSON.parse(Cookies.get("handleHouseNum")) : this.props.house_num}
                onChange={this.handleHouseNum}
              />
            </Flex>
            <Flex className={styles.inputWrap}>
              <span>门店电话</span>
              <input
                type="text"
                placeholder='请输入手机号、座机（需加区号）'
                value={Cookies.get("handlePhone") ? JSON.parse(Cookies.get("handlePhone")) : this.props.phone}
                onChange={this.handlePhone}
              />
            </Flex>
            <Flex className={styles.inputWrap}>
              <Picker
                className={styles.picker}
                style={{ width: '100%', fontSize: '28px' }}
                data={this.state.manage_list}
                cols={1}
                onOk={this.Checkout}
                value={Cookies.get("handleCheckout") ? JSON.parse(Cookies.get("handleCheckout")) : this.props.value}
              >
                <List.Item arrow="horizontal">经营品类</List.Item>
              </Picker>
            </Flex>
            <Flex className={styles.inputWrap}>
              <span>邮箱</span>
              <input
                type="text"
                placeholder='请输入邮箱'
                value={Cookies.get("handleEmail") ? JSON.parse(Cookies.get("handleEmail")) : this.props.email}
                onChange={this.handleEmail}
              />
            </Flex>
            <Flex className={styles.inputWrap}>
              <span>二维码序号</span>
              <input
                type="text"
                placeholder='请输入二维码序号（非必填）'
                value={Cookies.get("handleCode") ? JSON.parse(Cookies.get("handleCode")) : this.props._code}
                onChange={this.handleCode}
              />
            </Flex>
            <Flex className={styles.imgWrap}>
              <div className={styles.imgTitle}>上传门头照</div>
              <div className={styles.example} onClick={this.toExample}>查看示例</div>
            </Flex>
            <Flex className={styles.pushStore}>
              <ImagePicker
                style={{ width: '100%' }}
                files={localStorage.getItem("Storechange") ? JSON.parse(localStorage.getItem("Storechange")) : files}
                multiple={false}
                length={1}
                selectable={files.length < 1}
                onChange={this.Storechange}
              />
            </Flex>
            <Flex className={styles.imgWrap}>
              <div className={styles.imgTitle}>上传环境照</div>
            </Flex>
            <Flex className={styles.imgSmall}>
              <ImagePicker
                files={localStorage.getItem("Mychange") ? JSON.parse(localStorage.getItem("Mychange")) : my_files}
                multiple={false}
                length={1}
                selectable={my_files.length < 1}
                onChange={this.Mychange}
              />
              <ImagePicker
                files={localStorage.getItem("Mychange2") ? JSON.parse(localStorage.getItem("Mychange2")) : my_files2}
                multiple={false}
                length={1}
                selectable={my_files2.length < 1}
                onChange={this.Mychange2}
              />
            </Flex>
            <Button type="primary" style={{ marginTop: 60, paddingBottom: 60 }} onClick={this.createStore}>
              确认创建
                </Button>

          </WingBlank>
          {/* {map} */}
        </div>
      )
    }
  }
)


