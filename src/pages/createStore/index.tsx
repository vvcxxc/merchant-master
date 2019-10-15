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
      },
      imgshow1: false,
      imgshow2: false,
      imgshow3: false,


      detailAddress: ''
    };

    componentDidMount() {
      console.log(Cookies.get('handleAddress'))
      console.log(Cookies.get('handleDetailAddress'))
      if((Cookies.get('handleAddress') && Cookies.get('handleDetailAddress') )) {
        if((Cookies.get('handleAddress') != Cookies.get('handleDetailAddress'))) {
          console.log('执行不等于')
          this.setState({
            detailAddress: Cookies.get("handleDetailAddress") ? JSON.parse(Cookies.get("handleDetailAddress")) : ""
          })
        }else {
          console.log('执行等于')
          this.setState({
            detailAddress: Cookies.get("handleDetailAddress") ? JSON.parse(Cookies.get("handleDetailAddress")) : ""
          })
        }


      }else {
        console.log('执行2')
        this.setState({
          // detailAddress: Cookies.get("handleDetailAddress") ? JSON.parse(Cookies.get("handleDetailAddress")) :
          //                 Cookies.get("handleAddress") ? JSON.parse(Cookies.get("handleAddress")) : ""
          detailAddress: Cookies.get("handleAddress") ? JSON.parse(Cookies.get("handleAddress")) : ""
        })
      }

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
          store_door_header_img: Cookies.get("Storechange") ? JSON.parse(Cookies.get("Storechange")) : "",
          store_img_one: Cookies.get("Mychange") ? JSON.parse(Cookies.get("Mychange")) : "",
          store_img_two: Cookies.get("Mychange2") ? JSON.parse(Cookies.get("Mychange2")) : "",
          imgshow1: !Cookies.get("Storechange") ? false : (JSON.parse(Cookies.get("Storechange")) != "" ? true : false),
          imgshow2: !Cookies.get("Mychange") ? false : (JSON.parse(Cookies.get("Mychange")) != "" ? true : false),
          imgshow3: !Cookies.get("Mychange2") ? false : (JSON.parse(Cookies.get("Mychange2")) != "" ? true : false),
          location: Cookies.get("handleLocation") ? JSON.parse(Cookies.get("handleLocation")) : "",
        }
      })

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
      Toast.loading('')
      if (files[0]) {
        let img = files[0].url;
        upload(img).then(res => {
          Toast.hide()
          this.props.dispatch({
            type: 'createStore/setStore',
            payload: {
              files
            }
          })
          let store_door_header_img = res.data.path || '';
          Cookies.set("Storechange", JSON.stringify(store_door_header_img), { expires: 1 });
          this.props.dispatch({
            type: 'createStore/setStore',
            payload: {
              store_door_header_img
            }
          })
        })
      } else {
        Toast.hide()
        Cookies.set("Storechange", JSON.stringify(""), { expires: 1 });
        this.props.dispatch({
          type: 'createStore/setStore',
          payload: {
            store_door_header_img: '',
            files: []
          }
        });
      }
    }
    /**个人照1 */
    Mychange = (files: any) => {
      Toast.loading('')
      if (files[0]) {
        let img = files[0].url;
        upload(img).then(res => {
          this.props.dispatch({
            type: 'createStore/setStore',
            payload: {
              my_files: files
            }
          })
          Toast.hide()
          let store_img_one = res.data.path || '';
          Cookies.set("Mychange", JSON.stringify(store_img_one), { expires: 1 });
          this.props.dispatch({
            type: 'createStore/setStore',
            payload: {
              store_img_one
            }
          })
        })
      } else {
        Toast.hide()
        Cookies.set("Mychange", JSON.stringify(""), { expires: 1 });
        this.props.dispatch({
          type: 'createStore/setStore',
          payload: {
            store_img_one: '',
            my_files: []
          }
        });
      }
    }
    /**个人照2 */
    Mychange2 = (files: any) => {
      Toast.loading('')
      if (files[0]) {
        let img = files[0].url;
        upload(img).then(res => {
          this.props.dispatch({
            type: 'createStore/setStore',
            payload: {
              my_files2: files
            }
          })
          Toast.hide()
          let store_img_two = res.data.path || '';
          Cookies.set("Mychange2", JSON.stringify(store_img_two), { expires: 1 });
          this.props.dispatch({
            type: 'createStore/setStore',
            payload: {
              store_img_two
            }
          })
        })
      } else {
        Toast.hide()
        Cookies.set("Mychange2", JSON.stringify(""), { expires: 1 });
        this.props.dispatch({
          type: 'createStore/setStore',
          payload: {
            store_img_two: '',
            my_files2: []
          }
        });
      }
    }

    closeStoreimgk = () => {
      Cookies.set("Storechange", JSON.stringify(""), { expires: 1 });
      this.props.dispatch({
        type: 'createStore/setStore',
        payload: {
          imgshow1: false,
          store_door_header_img: ''
        }
      })
    }
    closePerimg1 = () => {
      Cookies.set("Mychange", JSON.stringify(""), { expires: 1 });
      this.props.dispatch({
        type: 'createStore/setStore',
        payload: {
          imgshow2: false,
          store_img_one: ''
        }
      })
    }
    closePerimg2 = () => {
      Cookies.set("Mychange2", JSON.stringify(""), { expires: 1 });
      this.props.dispatch({
        type: 'createStore/setStore',
        payload: {
          imgshow3: false,
          store_img_two: ''
        }
      })
    }







    /**打开地图 */
    openMap = () => {
      router.push('/createStore/map')
    }

    handleChange = (e:any) => {
      // let address = e.target.value;
      // Cookies.set("handleAddress", JSON.stringify(address), { expires: 1 });
      // this.props.dispatch({
      //   type: 'createStore/setStore',
      //   payload: {
      //     address
      //   }
      // })
      let address = e.target.value;
      Cookies.set("handleDetailAddress", JSON.stringify(address), { expires: 1 });
      this.setState({
        detailAddress: e.target.value
      })
    }


    createStore = () => {
      // console.log(Cookies.get("handleDetailAddress"))
      let detailAddress = Cookies.get("handleDetailAddress");
      let { name, address, house_num, phone, manage_type, email, _code, store_door_header_img, store_img_one, store_img_two, location } = this.props;
      // console.log(address,detailAddress)
      // if (name && address && house_num && phone && manage_type && email && store_door_header_img && store_img_one && store_img_two) {
        if(!name){
          Toast.fail('店铺名不能为空')
          return
        }
        if(!address){
          Toast.fail('门店定位不能为空')
          return
        }
        if(!detailAddress) {
          Toast.fail('详细地址不能为空')
          return
        }

        if(!house_num){
          Toast.fail('门牌号不能为空')
          return
        }
        if(!phone){
          Toast.fail('门店电话不能为空')
          return
        }
        if(!email){
          Toast.fail('邮箱不能为空')
          return
        }
        if(!store_door_header_img){
          Toast.fail('门头照不能为空')
          return
        }
        if(!store_img_one){
          Toast.fail('环境照1不能为空')
          return
        }
        if(!store_img_two){
          Toast.fail('环境照2不能为空')
          return
        }
        if(!location){
          Toast.fail('地图定位失败')
          return
        }


        request({
          url: 'v3/stores',
          method: 'post',
          data: {
            store_name: name,
            // 详细地址
            address:JSON.parse(detailAddress),
            // 定位地址
            gaode_address:address,
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
      // } else {
      //   console.log(name + "," + address + "," + house_num + "," + phone + "," + manage_type + "," + email + "," + store_door_header_img + "," + store_img_one + "," + store_img_two)
      //   Toast.fail('请将信息填写完整')
      // }
    }
    service = () => {
      window.location.href = 'https://xiaokefu.com.cn/s/9196ogf3'
    }
    render() {
      const { files, my_files, my_files2 } = this.props;
      // const map = this.state.is_map == true ? (
      //   <MapPage onChange={this.mapChange}/>
      // ) : (
      //
      // );
      return (
        <div style={{ height: 'auto', width: '100%', background: ' #fff', paddingBottom: 60 }}>
          <WingBlank className={styles.wrap}>
            <Flex className={styles.inputWrap}>
              <span>门店名称</span>
              <input
                type="text"
                placeholder='请输入门店名称'
                value={this.props.name}
                onChange={this.handleName}
              />
            </Flex>
            <Flex className={styles.inputWrap} onClick={this.openMap}>
              <span>门店定位</span>
              <input
                type="text"
                placeholder='请输入门店定位'
                readOnly={true}
                value={this.props.address}
              />
              <Icon type='right' />
            </Flex>
            <Flex className={styles.inputWrap}>
              <span>详细地址</span>
              <input
                type="text"
                placeholder='请输入详细地址'
                value={this.state.detailAddress}
                onChange={this.handleChange.bind(this)}
              />
            </Flex>
            <Flex className={styles.inputWrap}>
              <span>门牌号</span>
              <input
                type="text"
                placeholder='请输入详细门牌号，如：5栋2楼401'
                value={this.props.house_num}
                onChange={this.handleHouseNum}
              />
            </Flex>
            <Flex className={styles.inputWrap}>
              <span>门店电话</span>
              <input
                type="text"
                placeholder='请输入手机号、座机（需加区号）'
                value={this.props.phone}
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
                value={this.props.value}
              >
                <List.Item arrow="horizontal">经营品类</List.Item>
              </Picker>
            </Flex>
            <Flex className={styles.inputWrap}>
              <span>邮箱</span>
              <input
                type="text"
                placeholder='请输入邮箱'
                value={this.props.email}
                onChange={this.handleEmail}
              />
            </Flex>
            <Flex className={styles.inputWrap}>
              <span>二维码序号</span>
              <input
                type="text"
                placeholder='请输入二维码序号（非必填）'
                value={this.props._code}
                onChange={this.handleCode}
              />
            </Flex>
            <Flex className={styles.imgWrap}>
              <div className={styles.imgTitle}>上传门头照</div>
              <div className={styles.example} onClick={this.toExample}>查看示例</div>
            </Flex>
            <Flex className={styles.pushStore}>
              {
                this.props.imgshow1 == true ? (
                  <div className={styles.doorimg}><img src={"http://oss.tdianyi.com/" + this.props.store_door_header_img} /><div className={styles.close} onClick={this.closeStoreimgk}>{''}</div></div>
                ) : (
                    <ImagePicker
                      style={{ width: '100%' }}
                      files={files}
                      multiple={false}
                      length={1}
                      selectable={files.length < 1}
                      onChange={this.Storechange}
                    />

                  )
              }
            </Flex>
            <Flex className={styles.imgWrap}>
              <div className={styles.imgTitle}>上传环境照</div>
            </Flex>
            <Flex className={styles.imgSmall}>
              {
                this.props.imgshow2 == true ? (
                  <div className={styles.warpimg1} ><img src={"http://oss.tdianyi.com/" + this.props.store_img_one} /><div className={styles.close} onClick={this.closePerimg1}>{''}</div></div>
                ) : (
                    <ImagePicker
                      files={my_files}
                      multiple={false}
                      length={1}
                      selectable={my_files.length < 1}
                      onChange={this.Mychange}
                    />
                  )
              }
              {
                this.props.imgshow3 == true ? (
                  <div className={styles.warpimg1} onClick={() => { }}><img src={"http://oss.tdianyi.com/" + this.props.store_img_two} /><div className={styles.close} onClick={this.closePerimg2}>{''}</div></div>
                ) : (
                    <ImagePicker
                      files={my_files2}
                      multiple={false}
                      length={1}
                      selectable={my_files2.length < 1}
                      onChange={this.Mychange2}
                    />
                  )
              }

            </Flex>
            <Button type="primary" style={{ marginTop: 60, paddingBottom: 60 }} onClick={this.createStore}>
              确认创建
                </Button>

          </WingBlank>
          {/* {map} */}
          <div className={styles.service} onClick={this.service}>
            <img src={require('@/assets/service.png')}/>
          </div>
        </div>
      )
    }
  }
)


