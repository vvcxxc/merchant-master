/**
 * 门店地址
 */
import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, Button, Icon, InputItem, PickerView} from 'antd-mobile';
import { Map, Marker, MouseTool} from 'react-amap';
import request from '@/services/request';
import axios from 'axios';
import wx from "weixin-js-sdk";





export default class MapPage extends Component {
  state = {
    city_list: [],
    // 城市选择页
    is_show: false,
    // picker的value
    value: [],
    // picker选好的值
    city: [],
    // 城市名称
    city_name: '北京',
    // 省市区
    province: '北京',
    // 经纬度
    location: {
      longitude: 113.3348617553711,
      latitude: 23.18288803100586
    },
    address: ''
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
    let userAgent = navigator.userAgent;
    let isIos = userAgent.indexOf('iPhone') > -1;
    let url: any;
    if(isIos){
      url = sessionStorage.getItem('url');
    }else{
      url = location.href;
    }
    request({
      url: 'wechat/getShareSign',
      method: 'get',
      params: {
        url
      }
    }).then(res => {
      let _this = this;
      wx.config({
        debug: true,
        appId: res.appId,
        timestamp: res.timestamp,
        nonceStr: res.nonceStr,
        signature: res.signature,
        jsApiList: [
          "getLocation",
          "openLocation"
        ]
      });
      wx.ready(() => {

        wx.getLocation({
          type: 'wgs84',
          success: function (res: any) {
            let latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            let longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            let location = {
              latitude,
              longitude
            };
            _this.setState({location})
          }
        });

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
  };


  search = () => {
    let keywords = this.state.address;
    this.msearch = new AMap.PlaceSearch({
      pageSize:5,
      pageIndex:1,
      city: '广州'
      // city:this.state.city_name //城市
      //panel: "_ListContainer"
    });
    this.msearch.search(keywords, function(status: any, result: object){
      // console.log(result)
    })
  }


  handleAddress = (e: any) => {
    this.setState({address: e})
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
    const { location} = this.state;

    let that = this;
    const plugins = [
      'Scale',
      {
        name:'ToolBar',
        options:{
            visible: true,  // 不设置该属性默认就是 true
            onCreated(ins: any) {},
        },
      }
    ];

    let onComplete=(data: any)=>{
      that.setState({
          // position:[data.position.getLng(),data.position.getLat()]
          location: {
            latitude: data.position.getLat(),
            longitude: data.position.getLng()
          }
      })
    };
    let onError = ()=>{
        alert('定位失败');
    };
    const _this = this;
    const events = {
      created: (instance: any) => {
          instance.plugin('AMap.Geolocation', function () {
              let geolocation = new AMap.Geolocation({
                  enableHighAccuracy: true,//是否使用高精度定位，默认:true
                  timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                  maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                  convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                  showButton: true,        //显示定位按钮，默认：true
                  buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
                  buttonOffset: new AMap.Pixel(14, 130),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                  showMarker: false,        //定位成功后在定位到的位置显示点标记，默认：true
                  showCircle: false,        //定位成功后用圆圈表示定位精度范围，默认：true
                  panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                  zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
              });
              instance.addControl(geolocation);
              geolocation.getCurrentPosition();
              AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
              AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
          });
          AMap.plugin('AMap.Geocoder',() => {
            _this.geocoder = new AMap.Geocoder({
                city: "010"//城市，默认：“全国”
            });
          })
          AMap.plugin('AMap.PlaceSearch',() => {
            this.msearch = new AMap.PlaceSearch({
              pageSize:10,
              pageIndex:1,
              city: '广州'
              // city:this.state.city_name //城市
              //panel: "_ListContainer"
            });
          })
      },
      click: (e: any) => {
        this.setState({
          location:{
            longitude: e.lnglat.lng,
            latitude: e.lnglat.lat
          }
        });
        const lnglat = e.lnglat;
        _this.geocoder && _this.geocoder.getAddress(lnglat, (status, result) => {
          // console.log(result);
        	if (status === 'complete'){
          	if (result.regeocode){
              _this.setState({
                address: result.regeocode.formattedAddress || '未知地点',
                city_name: result.regeocode.addressComponent.city
              });
            } else {
              _this.setState({
                address: '未知地点'
              });
            }
          } else {
            _this.setState({
              address: '未知地点'
            });
          }
        })
      },
    };



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
                  value={this.state.address}
                  onChange={this.handleAddress}
                >{province}
                </InputItem>
              </Flex>
              <Icon type='search' size={'sm'} onClick={this.search}/>
            </Flex>
          </Flex>

        </WingBlank>
        <div className={styles.mapBox}>
          <Map events={events} amapkey={'47d12b3485d7ded218b0d369e2ddd1ea'} plugins={plugins} zoom={18} center={location}>
            <Marker position={location}/>
            {/* <MouseTool events={toolEvents}/> */}
          </Map>
        </div>
        {picker}

      </div>
    )
  }
}
