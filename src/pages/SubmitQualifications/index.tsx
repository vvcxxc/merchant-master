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
import { borderBottomLeftRadius } from 'html2canvas/dist/types/css/property-descriptors/border-radius';
export default class SubmitQualifications extends Component {
    state = {
        location: {
            longitude: 113.3348617553711,
            latitude: 23.18288803100586
        },
        //门头照例子 
        exampleImgurl: '',
        exampleImgShow: false,

        //照片files
        idCardFiles1: [],
        idCardFiles2: [],
        idCardFiles3: [],
        bankCardFiles1: [],
        bankCardFiles2: [],
        bankLicenseFiles: [],
        businessLicenseFiles: [],
        data: {
            idCardimg1: '',
            idCardimg2: '',
            idCardimg3: '',
            name: '',
            idCardNum: '',
            idCardValidity: '',

            bankCardimg1: '',
            bankCardimg2: '',
            accountHolder: '',
            bankCardNum: '',
            depositBank: '',
            subBranch: '',

            bankLicenseimg: '',

            businessLicenseimg: '',
            registrationNumber: '',
            licenseName: '',
            legalPerson: '',
            businessLicenseValidity: ''
        },
        error: {}
    }
    componentDidMount() {
        this.getStroage();
    }

    onChangeIdCardimg3 = (type: string) => (files: any) => {
        console.log(333)
        console.log(type);

        Toast.loading('');
        if (files[0]) {
            let img = files[0].url;
            upload(img).then(res => {
                Toast.hide()
                let idCardimg3 = res.data.path || '';
                let data = { ...this.state.data, idCardimg3: idCardimg3 };
                this.setStroage(data);
                this.setState({ idCardFiles3: files, data });
            })
        } else {
            Toast.hide();
            let data = { ...this.state.data, idCardimg2: '' };
            this.setStroage(data);
            this.setState({ idCardFiles3: files, data });
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


    onCancle = () => {
        this.setState({ exampleImgShow: false })
    }
    // 设置缓存
    setStroage = (data: object) => {
        console.log(data);
        localStorage.setItem('SubmitQualifications', JSON.stringify(data));
        localStorage.setItem('SubmitQualificationsTime', JSON.stringify(new Date().getTime()));
    }
    //获取缓存
    getStroage = () => {
        //小于一天86400000毫秒时执行
        if (localStorage.getItem('SubmitQualificationsTime') && (new Date().getTime() - JSON.parse(localStorage.getItem('SubmitQualificationsTime')) < 86400000)) {
            let stroage: any = JSON.parse(localStorage.getItem('SubmitQualifications'));
            let tempData = {
                idCardimg1: '',
                idCardimg2: '',
                idCardimg3: '',
                name: '',
                idCardNum: '',
                idCardValidity: '',

                bankCardimg1: '',
                bankCardimg2: '',
                accountHolder: '',
                bankCardNum: '',
                depositBank: '',
                subBranch: '',

                bankLicenseimg: '',

                businessLicenseimg: '',
                registrationNumber: '',
                licenseName: '',
                legalPerson: '',
                businessLicenseValidity: ''
            }
            let temp = { ...tempData, ...stroage };
            console.log(temp);
            this.setState({ data: temp });
        }
    }
    handlechange = (type: any, e: any) => {
        let data = this.state.data;
        data[type] = e.target.value;
        this.setStroage(data);
        this.setState({ data })
    }

    submitInfo = () => {
        // request({
        //     url: 'v3/stores',
        //     method: 'post',
        //     data: {

        //     }
        // }).then(res => {
        //     let { code, data, message } = res;
        //     if (code == 200) {
        //         let is_existence = data.is_existence ? data.is_existence : 0;
        //         Toast.success(data.msg, 2, () => {
        //             router.push({ pathname: '/choiceSubmitQua', query: { is_existence: is_existence } })
        //         })
        //     } else {
        //         Toast.fail(data.msg)
        //     }
        // })
    }

    render() {
        return (
            <div className={styles.creatStorePage}>


                <div className={styles.backgroundContent}>
                    <div className={styles.contentTitle}>上传身份证信息</div>
                    <div className={styles.idCardBox}>
                        <div className={styles.idCarduploadBox}>
                            {
                                this.state.data.idCardimg1 ?
                                    <div className={styles.idCardContent}>
                                        <img className={styles.backgImg} src={"http://oss.tdianyi.com/" + this.state.data.idCardimg1} />
                                        <img className={styles.closeImgBtn} src="http://oss.tdianyi.com/front/3CAEXRtyBexfyP352P3rENcQ7eYwmb8F.png" />
                                    </div>
                                    :
                                    <div className={styles.idCardContent}>
                                        <ImagePicker
                                            className={styles.PickerImgBtn}
                                            files={this.state.idCardFiles1}
                                            multiple={false}
                                            length={1}
                                            selectable={this.state.idCardFiles1.length < 1}
                                            onChange={this.onChangeIdCardimg3.bind(this, 'idCardFiles1')}
                                        />
                                        <img className={styles.backgImg} src="http://oss.tdianyi.com/front/8iTdHBjRZKZ53X6DGrxPkAbJsX2QRecT.png" />
                                    </div>
                            }
                            <div className={styles.idCardTitle}>身份证正面</div>
                        </div>
                        <div className={styles.idCarduploadBox}>
                            {
                                this.state.data.idCardimg2 ?
                                    <div className={styles.idCardContent}>
                                        <img className={styles.backgImg} src={"http://oss.tdianyi.com/" + this.state.data.idCardimg2} />
                                        <img className={styles.closeImgBtn} src="http://oss.tdianyi.com/front/3CAEXRtyBexfyP352P3rENcQ7eYwmb8F.png" />
                                    </div>
                                    :
                                    <div className={styles.idCardContent}>
                                        <img className={styles.backgImg} src="http://oss.tdianyi.com/front/mZhnet72wDaH3DTJhzn26HwsQHzJkSsA.png" />
                                    </div>
                            }
                            <div className={styles.idCardTitle}>身份证反面</div>
                        </div>
                        <div className={styles.idCarduploadBox}>
                            {
                                this.state.data.idCardimg3 ?
                                    <div className={styles.idCardContent}>
                                        <img className={styles.backgImg} src={"http://oss.tdianyi.com/" + this.state.data.idCardimg3} />
                                        <img className={styles.closeImgBtn} src="http://oss.tdianyi.com/front/3CAEXRtyBexfyP352P3rENcQ7eYwmb8F.png" />
                                    </div>
                                    :
                                    <div className={styles.idCardContent}>
                                        <img className={styles.backgImg} src="http://oss.tdianyi.com/front/Ebc4jhFDNn38EQiZfAypPPGbPt2X8NG7.png" />
                                    </div>
                            }
                            <div className={styles.idCardTitle}>手持身份证正面</div>
                        </div>
                    </div>

                    <div className={styles.inputItem}>
                        <div className={styles.inputTitle}>姓名 </div>
                        <input className={styles.inputBox} placeholder="请输入姓名 " onChange={this.handlechange.bind(this, 'storeName')} value={this.state.data.name} />
                    </div>
                    <div className={styles.inputItem}>
                        <div className={styles.inputTitle}>门店名称</div>
                        <input className={styles.inputBox} placeholder="身份证号" onChange={this.handlechange.bind(this, 'storeName')} value={this.state.data.idCardNum} />
                    </div>

                    <div className={styles.selectItem} style={{ borderBottom: 'unset' }} >
                        <div className={styles.selectTitle}>有效期</div>
                        {
                            this.state.data.idCardValidity ?
                                <div className={styles.unSelectBox} >{this.state.data.idCardValidity}</div>
                                :
                                <div className={styles.selectBox} >请选择身份证有效期</div>
                        }
                        <img className={styles.selectIcon} src="http://oss.tdianyi.com/front/eMbkt8GMNGYCpfFNe8Bycmb5QDRMTXkP.png" />
                    </div>
                </div>

                <div className={styles.backgroundContent}>
                    <div className={styles.contentTitle}>上传银行卡信息</div>
                    <div className={styles.bankCardBox}>
                        <div className={styles.bankCarduploadBox}>
                            {
                                this.state.data.bankCardimg1 ?
                                    <div className={styles.bankCardContent}>
                                        <img className={styles.backgImg} src={"http://oss.tdianyi.com/" + this.state.data.bankCardimg1} />
                                        <img className={styles.closeImgBtn} src="http://oss.tdianyi.com/front/3CAEXRtyBexfyP352P3rENcQ7eYwmb8F.png" />
                                    </div>
                                    :
                                    <div className={styles.bankCardContent}>
                                        <img className={styles.backgImg} src="http://oss.tdianyi.com/front/BpTDHHD75hzXXY6bRYwGmHQpdPhc5rFQ.png" />
                                    </div>
                            }
                            <div className={styles.bankCardTitle}>银行卡正面</div>
                        </div>
                        <div className={styles.bankCarduploadBox}>
                            {
                                this.state.data.bankCardimg2 ?
                                    <div className={styles.bankCardContent}>
                                        <img className={styles.backgImg} src={"http://oss.tdianyi.com/" + this.state.data.bankCardimg2} />
                                        <img className={styles.closeImgBtn} src="http://oss.tdianyi.com/front/3CAEXRtyBexfyP352P3rENcQ7eYwmb8F.png" />
                                    </div>
                                    :
                                    <div className={styles.bankCardContent}>
                                        <img className={styles.backgImg} src="http://oss.tdianyi.com/front/isjpTsST4HMnD6nZBQ2FtXByjNCpD7Pj.png" />
                                    </div>
                            }
                            <div className={styles.bankCardTitle}>银行卡反面</div>
                        </div>
                    </div>
                    <div className={styles.inputItem}>
                        <div className={styles.inputTitle}>开户人</div>
                        <input className={styles.inputBox} placeholder="请输入姓名" onChange={this.handlechange.bind(this, 'accountHolder')} value={this.state.data.accountHolder} />
                    </div>
                    <div className={styles.inputItem}>
                        <div className={styles.inputTitle}>银行卡号</div>
                        <input className={styles.inputBox} placeholder="请输入银行卡号" onChange={this.handlechange.bind(this, 'bankCardNum')} value={this.state.data.bankCardNum} />
                    </div>
                    <div className={styles.inputItem}>
                        <div className={styles.inputTitle}>开户行</div>
                        <input className={styles.inputBox} placeholder="请输入开户行" onChange={this.handlechange.bind(this, 'depositBank')} value={this.state.data.depositBank} />
                    </div>
                    <div className={styles.inputItem}>
                        <div className={styles.inputTitle}>支行</div>
                        <input className={styles.inputBox} placeholder="请输入支行" onChange={this.handlechange.bind(this, 'subBranch')} value={this.state.data.subBranch} />
                    </div>


                    <div className={styles.contentTitle}>银行开户许可证</div>
                    <div className={styles.bankLicenseuploadBox}>
                        {
                            this.state.data.bankLicenseimg ?
                                <div className={styles.bankLicenseContent}>
                                    <img className={styles.backgImg} src={"http://oss.tdianyi.com/" + this.state.data.bankLicenseimg} />
                                    <img className={styles.closeImgBtn} src="http://oss.tdianyi.com/front/3CAEXRtyBexfyP352P3rENcQ7eYwmb8F.png" />
                                </div>
                                :
                                <div className={styles.bankLicenseContent}>
                                    <img className={styles.backgImg} src="http://oss.tdianyi.com/front/jP4Y7zWyJfXZwtdSTZEdRX2KwRFxNjkm.png" />
                                </div>
                        }
                        <div className={styles.bankLicenseTitle}>银行开户许可证</div>
                    </div>
                </div>

                <div className={styles.backgroundContent}>
                    <div className={styles.contentTitle}>上传营业执照信息</div>
                    <div className={styles.businessLicenseuploadBox}>
                        {
                            this.state.data.businessLicenseimg ?
                                <div className={styles.businessLicenseContent}>
                                    <img className={styles.backgImg} src={"http://oss.tdianyi.com/" + this.state.data.businessLicenseimg} />
                                    <img className={styles.closeImgBtn} src="http://oss.tdianyi.com/front/3CAEXRtyBexfyP352P3rENcQ7eYwmb8F.png" />
                                </div>
                                :
                                <div className={styles.businessLicenseContent}>
                                    <img className={styles.backgImg} src="http://oss.tdianyi.com/front/4P5PHSSz4ciwMdi5aRXebaft6wbDRDAX.png" />
                                </div>
                        }
                        <div className={styles.businessLicenseTitle}>营业执照</div>
                    </div>
                    <div className={styles.inputItem}>
                        <div className={styles.inputTitle}>注册号</div>
                        <input className={styles.inputBox} placeholder="请输入注册号" onChange={this.handlechange.bind(this, 'registrationNumber')} value={this.state.data.registrationNumber} />
                    </div>
                    <div className={styles.inputItem}>
                        <div className={styles.inputTitle}>执照名称</div>
                        <input className={styles.inputBox} placeholder="请输入执照名称" onChange={this.handlechange.bind(this, 'licenseName')} value={this.state.data.licenseName} />
                    </div>
                    <div className={styles.inputItem}>
                        <div className={styles.inputTitle}>法人姓名</div>
                        <input className={styles.inputBox} placeholder="请输入法人姓名" onChange={this.handlechange.bind(this, 'legalPerson')} value={this.state.data.legalPerson} />
                    </div>
                    <div className={styles.inputItem} style={{ borderBottom: 'unset' }}>
                        <div className={styles.inputTitle}>有效期</div>
                        <input className={styles.inputBox} placeholder="请输入有效期" onChange={this.handlechange.bind(this, 'businessLicenseValidity')} value={this.state.data.businessLicenseValidity} />
                    </div>
                </div>

                <div className={styles.bottomBox}>
                    <div className={styles.saveBtn}>保存</div>
                    <div className={styles.submitBtn}>提交审核</div>
                </div>

                {
                    this.state.exampleImgShow ? <ExampleImg
                        exampleImg={this.state.exampleImgurl}
                        onUpload={this.onUpload}
                        onCancle={this.onCancle}
                    /> : null
                }
            </div>
        )
    }
}



