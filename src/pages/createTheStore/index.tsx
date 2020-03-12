/**
 * 创建门店测试版
 */
import React, { Component } from 'react';
import { Flex, WingBlank, Button, Toast, Picker, List, Icon, ImagePicker } from 'antd-mobile';
import styles from './index.less';
import request from '@/services/request';
import router from 'umi/router';
import upload from '@/services/oss';
import { connect } from 'dva';
import Cookies from 'js-cookie';
import ExampleImg from '../../components/example/index'
import axios from 'axios';
export default class CreateStore extends Component {
    state = {
        location: {
            longitude: 113.3348617553711,
            latitude: 23.18288803100586
        },
        //门头照例子
        exampleImgShow: false,
        //经营品类
        manage_list: [],
        value: [],
        //环境照
        files1: [],
        files2: [],
        data: {
            storeName: '',
            storeAddress: '',
            storeHouseNumber: '',
            phone: '',
            manage_type: '',
            selector: '',
            storesMails: '',
            storePhoto: '',
            environmentPhoto1: '',
            environmentPhoto2: '',
            _code: ''
        },
        error: {
            storeName: '',
            storeAddress: '',
            storeHouseNumber: '',
            phone: '',
            manage_type: '',
            storesMails: '',
            _code: '',
            storePhoto: '',
            environmentPhoto: ''
        }
    }
    componentDidMount() {
        this.getManageType();
        this.getStroage();
        this.getLocation();
    }
    getLocation() {
        let userAgent = navigator.userAgent;
        let isIos = userAgent.indexOf('iPhone') > -1;
        let url: any;
        if (isIos) {
            url = sessionStorage.getItem('url');
        } else {
            url = location.href;
        }
        request({
            url: 'wechat/getShareSign',
            method: 'get',
            params: {
                url
            }
        }).then(res => {
            let _this: any = this;
            wx.config({
                debug: false,
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
                        _this.setState({ location });
                    }
                });

            })
        });
    }
    /**打开地图 */
    openMap = () => {
        router.push('/createTheStore/map')
    }
    /**获取经营品类 */
    getManageType = () => {
        request({
            url: 'v3/manage_type',
            method: 'get',
        }).then(res => {
            let { data } = res;
            this.setState({ manage_list: data });
        });
    }
    /**经营类型的选择 */
    Checkout = (v: any) => {
        let selectorIndex: number = 0, temp: any = this.state.manage_list;
        for (let i in temp) {
            if (temp[i].id == v[0]) {
                selectorIndex = Number(i);
            }
        }
        let data = { ...this.state.data, manage_type: v[0], selector: temp[selectorIndex].name };
        this.setStroage(data);
        this.setState({ data, value: v })
    }
    onChange1 = (files1: any, type: any, index: any) => {
        Toast.loading('');
        if (files1[0]) {
            let img = files1[0].url;
            upload(img).then(res => {
                Toast.hide()
                let environmentPhoto1 = res.data.path || '';
                let data = { ...this.state.data, environmentPhoto1: environmentPhoto1 };
                this.setStroage(data);
                this.setState({ files1, data });
            })
        } else {
            Toast.hide();
            let data = { ...this.state.data, environmentPhoto1: '' };
            this.setStroage(data);
            this.setState({ files1, data });
        }
    }
    onChange2 = (files2: any, type: any, index: any) => {
        Toast.loading('');
        if (files2[0]) {
            let img = files2[0].url;
            upload(img).then(res => {
                Toast.hide()
                let environmentPhoto2 = res.data.path || '';
                let data = { ...this.state.data, environmentPhoto2: environmentPhoto2 };
                this.setStroage(data);
                this.setState({ files2, data });
            })
        } else {
            Toast.hide()
            let data = { ...this.state.data, environmentPhoto2: '' };
            this.setStroage(data);
            this.setState({ files2, data });
        }
    }
    exampleShow = () => {
        this.setState({ exampleImgShow: true })
    }
    onUpload = (query: any) => {
        let data = { ...this.state.data, storePhoto: query.returnImgUrl };
        this.setStroage(data);
        this.setState({ data });
    }
    closeDoorPhoto = (e: any) => {
        let data = { ...this.state.data, storePhoto: '' };
        this.setStroage(data);
        this.setState({ data });
        e.stopPropagation();
    }
    closeEnvPhoto1 = (e: any) => {
        let data = { ...this.state.data, environmentPhoto1: '' };
        this.setStroage(data);
        this.setState({ files1: [], data });
        e.stopPropagation();
    }
    closeEnvPhoto2 = (e: any) => {
        let data = { ...this.state.data, environmentPhoto2: '' };
        this.setStroage(data);
        this.setState({ files2: [], data });
        e.stopPropagation();
    }
    onCancle = () => {
        this.setState({ exampleImgShow: false })
    }
    // 设置缓存
    setStroage = (data: object) => {
        console.log(data);
        localStorage.setItem('creatStoreData', JSON.stringify(data));
        localStorage.setItem('creatStoreDataTime', JSON.stringify(new Date().getTime()));
    }
    //获取缓存
    getStroage = () => {
        //小于一天86400000毫秒时执行
        if (localStorage.getItem('creatStoreDataTime') && (new Date().getTime() - JSON.parse(localStorage.getItem('creatStoreDataTime')) < 86400000)) {
            let stroage: any = JSON.parse(localStorage.getItem('creatStoreData'));
            let tempData = {
                storeName: '',
                storeAddress: '',
                storeHouseNumber: '',
                phone: '',
                manage_type: '',
                selector: '',
                storesMails: '',
                storePhoto: '',
                environmentPhoto1: '',
                environmentPhoto2: '',
                _code: ''
            }
            let temp = { ...tempData, ...stroage };
            console.log(temp);
            this.setState({ data: temp });
        }
    }
    handlechange = (type: any, e: any) => {
        let data = this.state.data;
        data[type] = e.target.value.trim();
        this.setStroage(data);
        this.setState({ data })
    }

    submitInfo = () => {
        const {
            storeName,
            storeAddress,
            storeHouseNumber,
            phone,
            manage_type,
            storesMails,
            storePhoto,
            environmentPhoto1,
            environmentPhoto2,
            _code
        } = this.state.data;

        let total: any = {}
        total.storeName = !this.getBytes(storeName) ? '请输入门店名称' : ''
        total.storeAddress = !storeAddress ? '请点击获取门店位置信息' : ''
        total.storeHouseNumber = !storeHouseNumber ? '请输入商家门店地址信息' : ''
        total.phone =
            !/^1[3456789]\d{9}$/.test(phone) || !/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(phone) ?
                '请输入正确11位手机号码或7-8位座机号码' : ''
        // return
        total.manage_type = !manage_type ? '请选择商家品类信息' : ''
        total.storesMails = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$").test(storesMails) ? '' : '请输入正确邮箱信息'
        //二维码
        total._code = _code && _code.length > 6 ? '请输入正确二维码序号' : ''
        total.storePhoto = storePhoto.length < 1 ? '请上传商家门店照片' : ''
        total.environmentPhoto = environmentPhoto1.length < 1 || environmentPhoto2.length < 1 ? '请上传商家环境照片' : ''
        for (const key in total) {
            if (total[key]) {
                this.setState({ error: total })
                return
            }
        }
        this.setState({ error: {} });
        request({
            url: 'v3/stores',
            method: 'post',
            data: {
                store_name: storeName,
                // 详细地址
                address: storeAddress + storeHouseNumber,
                // 定位地址
                gaode_address: storeAddress,
                house_num: storeHouseNumber,
                phone,
                email: storesMails,
                manage_type,
                store_door_header_img: storePhoto,
                store_img_one: environmentPhoto1,
                store_img_two: environmentPhoto2,
                //经纬度
                xpoint: this.state.location.longitude,
                ypoint: this.state.location.latitude,
                // //二维码序列号
                code_id: _code
            }
        }).then(res => {
            let { code, data, message } = res;
            if (code == 200) {
                let is_existence = data.is_existence ? data.is_existence : 0;
                Toast.success(data.msg, 2, () => {
                    router.push({ pathname: '/choiceSubmitQua', query: { is_existence: is_existence } })
                })
            } else {
                Toast.fail(data.msg)
            }
        })
    }
    //
    getBytes = (str: string) => {
        let num = 0
        for (let i = 0; i < str.length; i++) {
            /*字符串的charCodeAt()方法获取对应的ASCII码值
            汉字的ASCII大于255,其它的ASCII编码值在0-255之间*/
            str.charCodeAt(i) > 255 ? num += 2 : num += 1;
        }
        return num;
    }
    render() {
        const { error } = this.state;
        return (
            <div className={styles.creatStorePage}>
                <div className={styles.inputItem}>
                    <div className={styles.inputTitle}>门店名称</div>
                    <input className={styles.inputBox} placeholder="请输入门店名称" onChange={this.handlechange.bind(this, 'storeName')} value={this.state.data.storeName} />
                </div>
                {
                    error.storeName ?
                        <div className={styles.groub_hint}>{error.storeName}</div> : null
                }
                <div className={styles.selectItem} onClick={this.openMap}>
                    <div className={styles.selectTitle}>门店地址</div>
                    {
                        this.state.data.storeAddress ?
                            <div className={styles.unSelectBox} >{this.state.data.storeAddress}</div>
                            :
                            <div className={styles.selectBox} >请选择地址</div>
                    }
                    <img className={styles.selectIcon} src="http://oss.tdianyi.com/front/eMbkt8GMNGYCpfFNe8Bycmb5QDRMTXkP.png" />
                </div>
                {
                    error.storeAddress ?
                        <div className={styles.groub_hint}>{error.storeAddress}</div> : null
                }
                <div className={styles.inputItem}>
                    <div className={styles.inputTitle}>门牌号</div>
                    <input className={styles.inputBox} placeholder="请输入详细地址" onChange={this.handlechange.bind(this, 'storeHouseNumber')} value={this.state.data.storeHouseNumber} />
                </div>
                {
                    error.storeHouseNumber ?
                        <div className={styles.groub_hint}>{error.storeHouseNumber}</div> : null
                }
                <div className={styles.inputItem}>
                    <div className={styles.inputTitle}>门店电话</div>
                    <input className={styles.inputBox} placeholder="请输入电话号码" onChange={this.handlechange.bind(this, 'phone')} value={this.state.data.phone} />
                </div>
                {
                    error.phone ?
                        <div className={styles.groub_hint}>{error.phone}</div> : null
                }
                <Picker
                    className={styles.picker}
                    style={{ width: '100%', fontSize: '28px' }}
                    data={this.state.manage_list}
                    cols={1}
                    onOk={this.Checkout}
                    value={this.state.value}
                >
                    <div className={styles.selectItem}>
                        <div className={styles.selectTitle}>经营品类</div>
                        {
                            this.state.data.selector ?
                                <div className={styles.unSelectBox} >{this.state.data.selector}</div>
                                :
                                <div className={styles.selectBox} >请选择品类</div>
                        }
                        <img className={styles.selectIcon} src="http://oss.tdianyi.com/front/eMbkt8GMNGYCpfFNe8Bycmb5QDRMTXkP.png" />
                    </div>
                </Picker>
                {
                    error.manage_type ?
                        <div className={styles.groub_hint}>{error.manage_type}</div> : null
                }
                <div className={styles.inputItem}>
                    <div className={styles.inputTitle}>邮箱</div>
                    <input className={styles.inputBox} placeholder="请输入邮箱地址" onChange={this.handlechange.bind(this, 'storesMails')} value={this.state.data.storesMails} />
                </div>
                {
                    error.storesMails ?
                        <div className={styles.groub_hint}>{error.storesMails}</div> : null
                }
                <div className={styles.inputItem}>
                    <div className={styles.inputTitle}>邀请码</div>
                    <input className={styles.inputBox} placeholder="请输入邀请码（非必填）" onChange={this.handlechange.bind(this, '_code')} value={this.state.data._code} />
                </div>
                {
                    error._code ?
                        <div className={styles.groub_hint}>{error._code}</div> : null
                }
                <div className={styles.doorPhotoContent}>
                    <div className={styles.doorPhotoTitle}>上传门头照</div>
                    <div className={styles.doorPhotoPickerBox} >
                        {
                            this.state.data.storePhoto ?
                                <div className={styles.closeBox} >
                                    <img className={styles.close} src="http://oss.tdianyi.com/front/3CAEXRtyBexfyP352P3rENcQ7eYwmb8F.png" onClick={this.closeDoorPhoto.bind(this)} />
                                    <img className={styles.doorPhotoPickerImg} src={"http://oss.tdianyi.com/" + this.state.data.storePhoto} />
                                </div>
                                :
                                <div className={styles.closeBox} onClick={this.exampleShow.bind(this)}>
                                    <img className={styles.doorPhotoPickerImg} src="http://oss.tdianyi.com/front/dDmWyeYPbjaQzMHnFNwJEPPEhrkfiAbs.png" />
                                </div>
                        }
                    </div>
                </div>
                {
                    error.storePhoto ?
                        <div className={styles.groub_hint}>{error.storePhoto}</div> : null
                }
                <div className={styles.environmentContent}>
                    <div className={styles.doorPhotoTitle}>上传环境照</div>
                    <div className={styles.doorPhotoList}>
                        {
                            this.state.data.environmentPhoto1 ?
                                <div className={styles.doorPhotoItem}>
                                    <img className={styles.close} src="http://oss.tdianyi.com/front/3CAEXRtyBexfyP352P3rENcQ7eYwmb8F.png" onClick={this.closeEnvPhoto1.bind(this)} />
                                    <img className={styles.doorPhotoPickerImg} src={"http://oss.tdianyi.com/" + this.state.data.environmentPhoto1} />
                                </div>
                                :
                                <div className={styles.doorPhotoItem}>
                                    <ImagePicker
                                        className={styles.PickerBtn}
                                        files={this.state.files1}
                                        multiple={false}
                                        length={1}
                                        selectable={this.state.files1.length < 1}
                                        onChange={this.onChange1}
                                    />
                                </div>
                        }
                        {
                            this.state.data.environmentPhoto2 ?
                                <div className={styles.doorPhotoItem}>
                                    <img className={styles.close} src="http://oss.tdianyi.com/front/3CAEXRtyBexfyP352P3rENcQ7eYwmb8F.png" onClick={this.closeEnvPhoto2.bind(this)} />
                                    <img className={styles.doorPhotoPickerImg} src={"http://oss.tdianyi.com/" + this.state.data.environmentPhoto2} />
                                </div>
                                :
                                <div className={styles.doorPhotoItem}>
                                    <ImagePicker
                                        className={styles.PickerBtn}
                                        files={this.state.files2}
                                        multiple={false}
                                        length={1}
                                        selectable={this.state.files2.length < 1}
                                        onChange={this.onChange2}
                                    />
                                </div>
                        }
                    </div>
                </div>
                {
                    error.environmentPhoto ?
                        <div className={styles.groub_hint}>{error.environmentPhoto}</div> : null
                }
                <div className={styles.sumbitCreatStore} onClick={this.submitInfo.bind(this)}>提交</div>
                {
                    this.state.exampleImgShow ? <ExampleImg
                        exampleImg={'http://oss.tdianyi.com/front/KcrsrfW8mzAtC2b8fDw5JAWxHWZKhnAz.png'}
                        onUpload={this.onUpload}
                        onCancle={this.onCancle}
                    /> : null
                }
            </div>
        )
    }
}



