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
import moment from 'moment';
import Cookies from 'js-cookie';
import ExampleImg from '../../components/example/index'
import axios from 'axios';
import { borderBottomLeftRadius } from 'html2canvas/dist/types/css/property-descriptors/border-radius';
export default class SubmitQualifications extends Component {
    state = {
        //门头照例子 
        exampleImgurl: '',
        exampleImgShow: false,
        exampleFilesType: '',
        exampleImgUrlType: '',
        //照片files
        idCardFiles1: [],
        idCardFiles2: [],
        idCardFiles3: [],
        bankCardFiles1: [],
        bankCardFiles2: [],
        bankLicenseFiles: [],
        businessLicenseFiles: [],
        //支行列表
        subBankList: [],
        subBankListShow: false,
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
        ToastTipsLegalIDImg: "",
        ToastTipsContactName: "",
        ToastTipsLegalIdNo: "",
        ToastTipsIDDate: "",
        ToastTipsBankCardImg: "",
        ToastTipsBankAccountName: "",
        ToastTipsBankAccountNo: "",
        ToastTipsSettleBank: "",
        ToastTipsBankName: "",
        ToastTipsBusinessImg: "",
        ToastTipsBusinessNo: "",
        ToastTipsCornBusName: "",
        ToastTipsLegalName: "",
        ToastTipsBusinessDate: "",
        ToastTipsBankLicense: ""
    }
    componentDidMount() {
        this.getOldData();
    }

    getOldData = () => {
        let that = this;
        request({
            url: 'v3/payment_profiles',
            method: 'get'
        }).then(res => {
            let { data } = res;
            let temp = {
                idCardimg1: data.legal_id_front_img.split('http://oss.tdianyi.com/')[1],
                idCardimg2: data.legal_id_back_img.split('http://oss.tdianyi.com/')[1],
                idCardimg3: data.hand_hold_id_img.split('http://oss.tdianyi.com/')[1],
                name: data.contact_name,
                idCardNum: data.legal_id_no,
                idCardValidity: data.legal_id_valid_date,
                bankCardimg1: data.bank_card_front_img.split('http://oss.tdianyi.com/')[1],
                bankCardimg2: data.bank_card_back_img.split('http://oss.tdianyi.com/')[1],
                accountHolder: data.settle_bank_account_name,
                bankCardNum: data.settle_bank_account_no,
                depositBank: data.settle_bank,
                subBranch: data.bank_name,
                businessLicenseimg: data.three_certs_in_one_img.split('http://oss.tdianyi.com/')[1],
                registrationNumber: data.three_certs_in_one_no,
                licenseName: data.corn_bus_name,
                legalPerson: data.legal_name,
                businessLicenseValidity: data.three_certs_in_one_valid_date,
            };
            that.setState({ data: temp }, () => {
                that.getStroage();
            })

        }).catch((err) => {
            this.getStroage();
        })
    }
    //选择有效期
    chooseDate = (type: string) => {
        router.push({ pathname: '/SubmitQualifications/chooseDate', query: { type } })
    }
    //上传图片
    onChangeIdImg = (filesType: string, imgUrlType: string, files: any) => {
        Toast.loading('');
        if (files[0]) {
            let img = files[0].url;
            upload(img).then(res => {
                Toast.fail('上传成功');
                Toast.hide()
                let returnUrl = res.data.path || '';
                let data = { ...this.state.data, [imgUrlType]: returnUrl };
                this.setStroage(data);
                this.setState({ [filesType]: files, data }, () => {
                    if (imgUrlType == 'idCardimg1' || imgUrlType == 'idCardimg2') { this.serachInfo('1') }
                    else if (imgUrlType == 'bankCardimg1' || imgUrlType == 'bankCardimg2') { this.serachInfo('2') }
                    else if (imgUrlType == 'businessLicenseimg') { this.serachInfo('3') }
                })
            }).catch(err => {
                Toast.fail('上传失败');
            })
        } else {
            Toast.fail('上传失败');
            Toast.hide();
            let data = { ...this.state.data, [imgUrlType]: '' };
            this.setStroage(data);
            this.setState({ [filesType]: files, data });
        }
    }
    //取消图片
    onCloseImg = (filesType: string, imgUrlType: string, ) => {
        let data = { ...this.state.data, [imgUrlType]: '' };
        this.setStroage(data);
        this.setState({ [filesType]: [], data })
    }
    //看例子,设置例子上传按钮对应的状态
    exampleShow = (filesType: string, imgUrlType: string, exampleImgurl: string) => {
        Toast.loading('', 1500, () => { }, true);
        this.setState({ exampleFilesType: filesType, exampleImgUrlType: imgUrlType, exampleImgurl: exampleImgurl, exampleImgShow: true }, () => {
            Toast.hide();
        })
    }
    //例子上传,组件内
    onUpload = (exampleFilesType: string, exampleImgUrlType: string) => (files: any) => {
        let data = this.state.data;
        data[exampleImgUrlType] = files.returnImgUrl;
        this.setStroage(data);
        this.setState({ [exampleFilesType]: files.files, data }, () => {
            if (exampleImgUrlType == 'idCardimg1' || exampleImgUrlType == 'idCardimg2') { this.serachInfo('1') }
            else if (exampleImgUrlType == 'bankCardimg1' || exampleImgUrlType == 'bankCardimg2') { this.serachInfo('2') }
            else if (exampleImgUrlType == 'businessLicenseimg') { this.serachInfo('3') }
        })
    }
    //例子取消
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
                //身份信息
                idCardimg1: '',
                idCardimg2: '',
                idCardimg3: '',
                name: '',
                idCardNum: '',
                idCardValidity: '',
                //银行信息
                bankCardimg1: '',
                bankCardimg2: '',
                accountHolder: '',
                bankCardNum: '',
                depositBank: '',
                subBranch: '',
                //银行许可
                bankLicenseimg: '',
                //营业执照信息
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
    //输入框
    handlechange = (type: any, e: any) => {
        let data = this.state.data;
        data[type] = e.target.value;
        this.setStroage(data);
        this.setState({ data })
    }
    //支行列表
    getSubBank = (e: any) => {
        let subBranchValue = e.target.value;
        let data = this.state.data;
        data['subBranch'] = e.target.value;
        this.setStroage(data);
        this.setState({ data }, () => {
            request({
                url: 'v3/bankAddress',
                method: 'get',
                params: {
                    k: subBranchValue
                }
            }).then(res => {
                this.setState({ subBankList: res.date, subBankListShow: true })
            })
        })
    }
    //选支行
    chooseOne = (e: any) => {
        let data = this.state.data;
        data['subBranch'] = e.target.innerText;
        this.setStroage(data);
        this.setState({ data, subBankListShow: false });
    }

    serachInfo = (type: string | number) => {
        if (type == '1' && this.state.data.idCardimg1 && this.state.data.idCardimg2) {
            Toast.loading('识别中');
            request({
                url: 'v3/idcard',
                method: 'get',
                params: {
                    idcard_front_img: this.state.data.idCardimg1,
                    idcard_back_img: this.state.data.idCardimg2
                }
            }).then(res => {
                Toast.hide();
                let { data, code } = res;
                if (code == 200) {
                    let idCardNum = data.front.words_result['公民身份号码'].words
                    let name = data.front.words_result['姓名'].words;
                    let idCardValidity = data.back.words_result['失效日期'].words;
                    if (idCardValidity != '长期') {
                        idCardValidity = moment(idCardValidity).format("YYYY-MM-DD")
                    }
                    if (idCardNum && name) {
                        let data = this.state.data;
                        data['name'] = name;
                        data['idCardNum'] = idCardNum;
                        data['idCardValidity'] = idCardValidity;
                        this.setStroage(data);
                        this.setState({ data });
                        Toast.success('识别成功', 2);
                    } else {
                        Toast.fail('识别失败，请手动填写信息', 2);
                    }
                } else {
                    Toast.fail('识别失败，请手动填写信息', 2);
                }
            }).catch(err => {
                Toast.hide();
                Toast.fail('识别失败', 2)
            })
        } else if (type == '2' && this.state.data.bankCardimg1 && this.state.data.bankCardimg2) {
            Toast.loading('识别中');
            request({
                url: 'v3/bankcard',
                method: 'get',
                params: {
                    bank_card_front_img: this.state.data.bankCardimg1
                }
            }).then(res => {
                Toast.hide();
                let { data, code } = res;
                if (code == 200) {
                    let str = data.bank_card_number;
                    let bankCardNum = str.replace(/\s*/g, "");
                    let depositBank = data.bank_name;
                    if (bankCardNum && bankCardNum) {
                        let data = this.state.data;
                        data['depositBank'] = depositBank;
                        data['bankCardNum'] = bankCardNum;
                        this.setStroage(data);
                        this.setState({ data });
                        Toast.success('识别成功', 2);
                    } else {
                        Toast.fail('识别失败，请手动填写信息', 2);
                    }

                } else {
                    Toast.fail('识别失败，请手动填写信息', 2);
                }
            }).catch(err => {
                Toast.hide();
                Toast.fail('识别失败', 2)
            })
        } else if (type == '3' && this.state.data.businessLicenseimg) {
            Toast.loading('识别中');
            request({
                url: 'v3/business_license',
                method: 'get',
                params: {
                    business_license_img: this.state.data.businessLicenseimg
                }
            }).then(res => {
                Toast.hide();
                let { data, code } = res;
                if (code == 200) {
                    let licenseName = data['单位名称'].words;
                    let registrationNumber = data['社会信用代码'].words;
                    let legalPerson = data['法人'].words;
                    let businessLicenseValidity = data['有效期'].words;
                    Toast.hide();
                    if (licenseName && registrationNumber && legalPerson && businessLicenseValidity) {
                        let data = this.state.data;
                        data['licenseName'] = licenseName;
                        data['registrationNumber'] = registrationNumber;
                        data['legalPerson'] = legalPerson;
                        data['businessLicenseValidity'] = businessLicenseValidity;
                        this.setStroage(data);
                        this.setState({ data });
                        Toast.success('识别成功', 2);
                    } else {
                        Toast.fail('识别失败，请手动填写信息', 2);
                    }
                } else {
                    Toast.fail('识别失败，请手动填写信息', 2);
                }
            }).catch(err => {
                Toast.hide();
                Toast.fail('识别失败', 2)
            })
        }
    }
    //提交
    submitInfo = (type: number) => async () => {

        let dredgeType = this.props.location.query.dredgeType;
        let is_existence = this.props.location.query.is_existence;
        await this.setState({
            ToastTipsLegalIDImg: "",
            ToastTipsContactName: "",
            ToastTipsLegalIdNo: "",
            ToastTipsIDDate: "",
            ToastTipsBankCardImg: "",
            ToastTipsBankAccountName: "",
            ToastTipsBankAccountNo: "",
            ToastTipsSettleBank: "",
            ToastTipsBankName: "",
            ToastTipsBusinessImg: "",
            ToastTipsBusinessNo: "",
            ToastTipsCornBusName: "",
            ToastTipsLegalName: "",
            ToastTipsBusinessDate: "",
            ToastTipsBankLicense: ""
        })
        const {
            //身份信息
            idCardimg1,
            idCardimg2,
            idCardimg3,
            name,
            idCardNum,
            idCardValidity,
            //银行信息
            bankCardimg1,
            bankCardimg2,
            accountHolder,
            bankCardNum,
            depositBank,
            subBranch,
            //银行许可
            bankLicenseimg,
            //营业执照信息
            businessLicenseimg,
            registrationNumber,
            licenseName,
            legalPerson,
            businessLicenseValidity
        } = this.state.data;
        // 身份证照片
        if (!idCardimg1 || !idCardimg2 || !idCardimg3) {
            this.setState({
                ToastTipsLegalIDImg: "请上传身份证正反面图片"
            })
        }
        // 身份证姓名
        if (!(/^[\u4E00-\u9FA5]{1,}$/.test(name))) {
            this.setState({
                ToastTipsContactName: "请输入用户身份证姓名"
            })
        }
        // 身份证号
        if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(idCardNum)) {
            this.setState({
                ToastTipsLegalIdNo: "请输入正确身份证号码"
            })
        }
        const nowTimeStamp = Date.now();
        const now = new Date(nowTimeStamp);
        const nowTime = moment(now).unix();
        const dateTime = moment(idCardValidity).unix();

        const nowYear = moment(now).year();
        const nowMonth = moment(now).month() + 1;
        const nowDay = moment(now).date();

        const dateYear = moment(idCardValidity).year();
        const dateMonth = moment(idCardValidity).month() + 1;
        const dateDay = moment(idCardValidity).date();
        if (!idCardValidity) {
            this.setState({
                ToastTipsIDDate: "请输入正确有效期"
            })
        } else if (dateTime < nowTime) {
            if (nowYear == dateYear && nowMonth == dateMonth && nowDay == dateDay) {
            } else {
                this.setState({
                    ToastTipsIDDate: "请输入正确有效期"
                })
            }
        }

        // 银行卡照片
        if (!bankCardimg1 || !bankCardimg2) {
            this.setState({
                ToastTipsBankCardImg: "请上传银行卡正反面图片"
            })
        }

        // 开户人
        if (!(/^[\u4E00-\u9FA5]{1,}$/.test(accountHolder))) {
            this.setState({
                ToastTipsBankAccountName: "请输入开户人姓名"
            })
        }

        // 银行号
        if (!(/^\d{16,19}$/).test(bankCardNum)) {
            this.setState({
                ToastTipsBankAccountNo: "请输入正确16-19位数字银行卡账号"
            })
        }

        // 开户行
        if (!(/^[\u4e00-\u9fa5a-zA-Z0-9]{1,}$/.test(depositBank))) {
            this.setState({
                ToastTipsSettleBank: "请输入正确开户银行卡名称"
            })
        }

        // 支行
        if (!(/^[\u4e00-\u9fa5a-zA-Z0-9]{1,}$/.test(subBranch))) {
            this.setState({
                ToastTipsBankName: "请输入正确开户支行名称"
            })
        }

        // 营业执照
        if (!businessLicenseimg) {
            this.setState({
                ToastTipsBusinessImg: "请上传商家营业执照图片"
            })
        }

        // 营业执照注册号
        if (!(/^[a-zA-Z0-9]{1,18}$/.test(registrationNumber))) {
            this.setState({
                ToastTipsBusinessNo: "请输入正确18位营业执照号码"
            })
        }

        // 执照名称
        if (!(/^[\u4e00-\u9fa5a-zA-Z0-9]{1,}$/.test(licenseName))) {
            this.setState({
                ToastTipsCornBusName: "请输入正确营业执照名称"
            })
        }


        // 执照法人
        if (!(/^[\u4e00-\u9fa5a-zA-Z0-9]{1,}$/.test(legalPerson))) {
            this.setState({
                ToastTipsLegalName: "请输入用户法人姓名"
            })
        }
        // if (!Bank_license_imgUrl) {
        //   this.setState({
        //     ToastTipsBankLicense: "请上传银行开户许可证图片"
        //   })
        // }

        // 营业执照有效期
        const businessNowTimeStamp = Date.now();
        const businessNow = new Date(businessNowTimeStamp);
        const businessNowTime = moment(businessNow).unix();
        const businessDateTime = moment(businessLicenseValidity).unix();

        const businessNowYear = moment(businessNow).year();
        const businessNowMonth = moment(businessNow).month() + 1;
        const businessNowDay = moment(businessNow).date();
        const businessDateYear = moment(businessLicenseValidity).year();
        const businessDateMonth = moment(businessLicenseValidity).month() + 1;
        const businessDateDay = moment(businessLicenseValidity).date();
        if (!businessLicenseValidity) {
            this.setState({
                ToastTipsBusinessDate: "请输入正确有效期"
            })
        } else if (businessDateTime < businessNowTime) {
            if (businessNowYear == businessDateYear && businessNowMonth == businessDateMonth && businessNowDay == businessDateDay) {
            } else {
                this.setState({
                    ToastTipsBusinessDate: "请输入正确有效期"
                })
            }
        }

        const {
            ToastTipsLegalIDImg,
            ToastTipsContactName,
            ToastTipsLegalIdNo,
            ToastTipsIDDate,
            ToastTipsBankCardImg,
            ToastTipsBankAccountName,
            ToastTipsBankAccountNo,
            ToastTipsSettleBank,
            ToastTipsBankName,
            ToastTipsBusinessImg,
            ToastTipsBusinessNo,
            ToastTipsCornBusName,
            ToastTipsLegalName,
            ToastTipsBusinessDate,
            // ToastTipsBankLicense
        } = this.state;

        if (dredgeType == 2 && !is_existence
            && (
                ToastTipsLegalIDImg ||
                ToastTipsContactName ||
                ToastTipsLegalIdNo ||
                ToastTipsIDDate ||
                ToastTipsBankCardImg ||
                ToastTipsBankAccountName ||
                ToastTipsBankAccountNo ||
                ToastTipsSettleBank ||
                ToastTipsBankName ||
                ToastTipsBusinessImg ||
                ToastTipsBusinessNo ||
                ToastTipsCornBusName ||
                ToastTipsLegalName ||
                ToastTipsBusinessDate
                //  ||ToastTipsBankLicense
            )) { return; }
        else if (dredgeType != 2 && (
            ToastTipsLegalIDImg ||
            ToastTipsContactName ||
            ToastTipsLegalIdNo ||
            ToastTipsIDDate ||
            ToastTipsBankCardImg ||
            ToastTipsBankAccountName ||
            ToastTipsBankAccountNo ||
            ToastTipsSettleBank ||
            ToastTipsBankName
        )
        ) {
            return;
        } else if (dredgeType == 2 && is_existence
            && (
                ToastTipsBusinessImg ||
                ToastTipsBusinessNo ||
                ToastTipsCornBusName ||
                ToastTipsLegalName ||
                ToastTipsBusinessDate
                //  || ToastTipsBankLicense
            )) {
            return;
        }

        let data = {

            legal_id_front_img: idCardimg1,
            legal_id_back_img: idCardimg2,
            hand_hold_id_img: idCardimg3,
            contact_name: name,
            legal_id_no: idCardNum,
            legal_id_valid_date: idCardValidity,
            bank_card_front_img: bankCardimg1,
            bank_card_back_img: bankCardimg2,
            settle_bank_account_name: accountHolder,
            settle_bank_account_no: bankCardNum,
            settle_bank: depositBank,
            bank_name: subBranch,
            bank_opening_permit: bankLicenseimg,
            three_certs_in_one_img: businessLicenseimg,
            three_certs_in_one_no: registrationNumber,
            corn_bus_name: licenseName,
            legal_name: legalPerson,
            three_certs_in_one_valid_date: businessLicenseValidity,
            confirm_step: type,
            merchant_property: dredgeType,
            is_existence: is_existence
        }

        Toast.loading('');
        request({
            url: 'v3/payment_profiles',
            method: 'post',
            data
        }).then(res => {
            Toast.hide();
            let { code, data } = res;
            if (code == 200) {
                if (type == 1) {
                    Toast.success('保存成功', 2, () => {
                        router.push('/review')
                    })
                } else if (type == 2) {
                    Toast.success('提交成功', 2, () => {
                        router.push('/review')
                    })
                }
            } else {
                Toast.fail(data)
            }
        }).catch(err => {
            Toast.hide();
        })
    }

    render() {
        const dredgeType = Number(this.props.location.query.dredgeType);
        const is_existence = Number(this.props.location.query.is_existence);
        const {
            ToastTipsLegalIDImg,
            ToastTipsContactName,
            ToastTipsLegalIdNo,
            ToastTipsIDDate,
            ToastTipsBankCardImg,
            ToastTipsBankAccountName,
            ToastTipsBankAccountNo,
            ToastTipsSettleBank,
            ToastTipsBankName,
            ToastTipsBusinessImg,
            ToastTipsBusinessNo,
            ToastTipsCornBusName,
            ToastTipsLegalName,
            ToastTipsBusinessDate,
            ToastTipsBankLicense
        } = this.state

        return (
            <div className={styles.creatStorePage} onClick={() => { this.setState({ subBankListShow: false }) }}>

                {
                    dredgeType != 2 || (!is_existence && dredgeType == 2) ?


                        <div className={styles.backgroundContent}>
                            <div className={styles.contentTitle}>上传身份证信息</div>
                            <div className={styles.idCardBox}>
                                <div className={styles.idCarduploadBox}>
                                    {
                                        this.state.data.idCardimg1 ?
                                            <div className={styles.idCardContent} >
                                                <img className={styles.backgImg} src={"http://oss.tdianyi.com/" + this.state.data.idCardimg1} />
                                                <img className={styles.closeImgBtn} src="http://oss.tdianyi.com/front/3CAEXRtyBexfyP352P3rENcQ7eYwmb8F.png" onClick={this.onCloseImg.bind(this, 'idCardFiles1', 'idCardimg1')} />
                                            </div>
                                            :
                                            <div className={styles.idCardContent} onClick={this.exampleShow.bind(this, 'idCardFiles1', 'idCardimg1', 'http://oss.tdianyi.com/front/Pyt65rC8EZiNmbP85eTYYwXpp6dPRY2X.png')}>
                                                {/* <ImagePicker
                                            className={styles.PickerImgBtn}
                                            files={this.state.idCardFiles1}
                                            multiple={false}
                                            length={1}
                                            selectable={this.state.idCardFiles1.length < 1}
                                            onChange={this.onChangeIdImg.bind(this, 'idCardFiles1', 'idCardimg1')}
                                        /> */}
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
                                                <img className={styles.closeImgBtn} src="http://oss.tdianyi.com/front/3CAEXRtyBexfyP352P3rENcQ7eYwmb8F.png" onClick={this.onCloseImg.bind(this, 'idCardFiles2', 'idCardimg2')} />
                                            </div>
                                            :
                                            <div className={styles.idCardContent} onClick={this.exampleShow.bind(this, 'idCardFiles2', 'idCardimg2', 'http://oss.tdianyi.com/front/nGCSmAXw2Ej5WEMPrdtXMp3JYdGfRAz3.png')}>
                                                {/* <ImagePicker
                                            className={styles.PickerImgBtn}
                                            files={this.state.idCardFiles2}
                                            multiple={false}
                                            length={1}
                                            selectable={this.state.idCardFiles2.length < 1}
                                            onChange={this.onChangeIdImg.bind(this, 'idCardFiles2', 'idCardimg2')}
                                        /> */}
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
                                                <img className={styles.closeImgBtn} src="http://oss.tdianyi.com/front/3CAEXRtyBexfyP352P3rENcQ7eYwmb8F.png" onClick={this.onCloseImg.bind(this, 'idCardFiles3', 'idCardimg3')} />
                                            </div>
                                            :
                                            <div className={styles.idCardContent} onClick={this.exampleShow.bind(this, 'idCardFiles3', 'idCardimg3', 'http://oss.tdianyi.com/front/PefSyZzCcw4kbitmDG2HESmretBnwM4d.png')}>
                                                {/* <ImagePicker
                                            className={styles.PickerImgBtn}
                                            files={this.state.idCardFiles3}
                                            multiple={false}
                                            length={1}
                                            selectable={this.state.idCardFiles3.length < 1}
                                            onChange={this.onChangeIdImg.bind(this, 'idCardFiles3', 'idCardimg3')}
                                        /> */}
                                                <img className={styles.backgImg} src="http://oss.tdianyi.com/front/Ebc4jhFDNn38EQiZfAypPPGbPt2X8NG7.png" />
                                            </div>
                                    }
                                    <div className={styles.idCardTitle}>手持身份证正面</div>
                                </div>
                            </div>
                            {
                                ToastTipsLegalIDImg ? (
                                    <Flex justify="end" className={styles.toast_tips_img}>
                                        <span>{ToastTipsLegalIDImg}</span>
                                    </Flex>
                                ) : ""
                            }
                            <div className={styles.inputItem}>
                                <div className={styles.inputTitle}>姓名 </div>
                                <input className={styles.inputBox} placeholder="请输入姓名 " onChange={this.handlechange.bind(this, 'name')} value={this.state.data.name} />
                            </div>
                            {
                                ToastTipsContactName ? (
                                    <Flex justify="end" className={styles.toast_tips}>
                                        <span>{ToastTipsContactName}</span>
                                    </Flex>
                                ) : ""
                            }
                            <div className={styles.inputItem}>
                                <div className={styles.inputTitle}>身份证号</div>
                                <input className={styles.inputBox} placeholder="请输入身份证号" onChange={this.handlechange.bind(this, 'idCardNum')} value={this.state.data.idCardNum} />
                            </div>
                            {
                                ToastTipsLegalIdNo ? (
                                    <Flex justify="end" className={styles.toast_tips}>
                                        <span>{ToastTipsLegalIdNo}</span>
                                    </Flex>
                                ) : ""
                            }
                            <div className={styles.selectItem} onClick={this.chooseDate.bind(this, '1')} >
                                <div className={styles.selectTitle}>有效期</div>
                                {
                                    this.state.data.idCardValidity ?
                                        <div className={styles.unSelectBox} >{this.state.data.idCardValidity}</div>
                                        :
                                        <div className={styles.selectBox} >请选择身份证有效期</div>
                                }
                                <img className={styles.selectIcon} src="http://oss.tdianyi.com/front/eMbkt8GMNGYCpfFNe8Bycmb5QDRMTXkP.png" />
                            </div>
                            {
                                ToastTipsIDDate ? (
                                    <Flex justify="end" className={styles.toast_tips}>
                                        <span>{ToastTipsIDDate}</span>
                                    </Flex>
                                ) : ""
                            }
                        </div>
                        : null
                }
                {
                    dredgeType != 2 || (!is_existence && dredgeType == 2) ?

                        <div className={styles.backgroundContent}>
                            <div className={styles.contentTitle}>上传银行卡信息</div>
                            <div className={styles.bankCardBox}>
                                <div className={styles.bankCarduploadBox}>
                                    {
                                        this.state.data.bankCardimg1 ?
                                            <div className={styles.bankCardContent}>
                                                <img className={styles.backgImg} src={"http://oss.tdianyi.com/" + this.state.data.bankCardimg1} />
                                                <img className={styles.closeImgBtn} src="http://oss.tdianyi.com/front/3CAEXRtyBexfyP352P3rENcQ7eYwmb8F.png" onClick={this.onCloseImg.bind(this, 'bankCardFiles1', 'bankCardimg1')} />
                                            </div>
                                            :
                                            <div className={styles.bankCardContent} onClick={this.exampleShow.bind(this, 'bankCardFiles1', 'bankCardimg1', 'http://oss.tdianyi.com/front/eKfymtezJZwRkemeTZ64xAp5QjHJYwis.png')}>
                                                {/* <ImagePicker
                                            className={styles.PickerImgBtn}
                                            files={this.state.bankCardFiles1}
                                            multiple={false}
                                            length={1}
                                            selectable={this.state.bankCardFiles1.length < 1}
                                            onChange={this.onChangeIdImg.bind(this, 'bankCardFiles1', 'bankCardimg1')}
                                        /> */}
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
                                                <img className={styles.closeImgBtn} src="http://oss.tdianyi.com/front/3CAEXRtyBexfyP352P3rENcQ7eYwmb8F.png" onClick={this.onCloseImg.bind(this, 'bankCardFiles2', 'bankCardimg2')} />
                                            </div>
                                            :
                                            <div className={styles.bankCardContent}>
                                                <ImagePicker
                                                    className={styles.PickerImgBtn}
                                                    files={this.state.bankCardFiles2}
                                                    multiple={false}
                                                    length={1}
                                                    selectable={this.state.bankCardFiles2.length < 1}
                                                    onChange={this.onChangeIdImg.bind(this, 'bankCardFiles2', 'bankCardimg2')}
                                                />
                                                <img className={styles.backgImg} src="http://oss.tdianyi.com/front/isjpTsST4HMnD6nZBQ2FtXByjNCpD7Pj.png" />
                                            </div>
                                    }
                                    <div className={styles.bankCardTitle}>银行卡反面</div>
                                </div>
                            </div>
                            {
                                ToastTipsBankCardImg ? (
                                    <Flex justify="end" className={styles.toast_tips_img}>
                                        <span>{ToastTipsBankCardImg}</span>
                                    </Flex>
                                ) : ""
                            }
                            <div className={styles.inputItem}>
                                <div className={styles.inputTitle}>开户人</div>
                                <input className={styles.inputBox} placeholder="请输入姓名" onChange={this.handlechange.bind(this, 'accountHolder')} value={this.state.data.accountHolder} />
                            </div>
                            {
                                ToastTipsBankAccountName ? (
                                    <Flex justify="end" className={styles.toast_tips}>
                                        <span>{ToastTipsBankAccountName}</span>
                                    </Flex>
                                ) : ""
                            }
                            <div className={styles.inputItem}>
                                <div className={styles.inputTitle}>银行卡号</div>
                                <input className={styles.inputBox} placeholder="请输入银行卡号" onChange={this.handlechange.bind(this, 'bankCardNum')} value={this.state.data.bankCardNum} />
                            </div>
                            {
                                ToastTipsBankAccountNo ? (
                                    <Flex justify="end" className={styles.toast_tips}>
                                        <span>{ToastTipsBankAccountNo}</span>
                                    </Flex>
                                ) : ""
                            }
                            <div className={styles.inputItem}>
                                <div className={styles.inputTitle}>开户行</div>
                                <input className={styles.inputBox} placeholder="请输入开户行" onChange={this.handlechange.bind(this, 'depositBank')} value={this.state.data.depositBank} />
                            </div>
                            {
                                ToastTipsSettleBank ? (
                                    <Flex justify="end" className={styles.toast_tips}>
                                        <span>{ToastTipsSettleBank}</span>
                                    </Flex>
                                ) : ""
                            }
                            <div className={styles.inputItem}>
                                <div className={styles.inputTitle}>支行</div>
                                <input className={styles.inputBox} placeholder="请输入支行" onChange={this.getSubBank.bind(this)} value={this.state.data.subBranch} />
                                {
                                    this.state.subBankListShow && this.state.subBankList.length > 0 ?
                                        <div className={styles.chooseSubBranch}>
                                            {
                                                this.state.subBankList.map((item: any, index) => {
                                                    return (
                                                        <div key={index} className={styles.chooseSubBranchItem} onClick={this.chooseOne}>{item.name}</div>

                                                    )
                                                })
                                            }

                                        </div> : null
                                }
                            </div>
                            {
                                ToastTipsBankName ? (
                                    <Flex justify="end" className={styles.toast_tips}>
                                        <span>{ToastTipsBankName}</span>
                                    </Flex>
                                ) : ""
                            }
                            {/* <div className={styles.contentTitle}>银行开户许可证</div>
                            <div className={styles.bankLicenseuploadBox}>
                                {
                                    this.state.data.bankLicenseimg ?
                                        <div className={styles.bankLicenseContent}>
                                            <img className={styles.backgImg} src={"http://oss.tdianyi.com/" + this.state.data.bankLicenseimg} />
                                            <img className={styles.closeImgBtn} src="http://oss.tdianyi.com/front/3CAEXRtyBexfyP352P3rENcQ7eYwmb8F.png" onClick={this.onCloseImg.bind(this, 'bankLicenseFiles', 'bankLicenseimg')} />
                                        </div>
                                        :
                                        <div className={styles.bankLicenseContent} >
                                            <ImagePicker
                                                className={styles.PickerImgBtn}
                                                files={this.state.bankLicenseFiles}
                                                multiple={false}
                                                length={1}
                                                selectable={this.state.bankLicenseFiles.length < 1}
                                                onChange={this.onChangeIdImg.bind(this, 'bankLicenseFiles', 'bankLicenseimg')}
                                            />
                                            <img className={styles.backgImg} src="http://oss.tdianyi.com/front/jP4Y7zWyJfXZwtdSTZEdRX2KwRFxNjkm.png" />
                                        </div>
                                }
                                <div className={styles.bankLicenseTitle}>银行开户许可证</div>
                            </div> */}
                        </div>
                        : null
                }
                {
                    dredgeType == 2 ?
                        <div className={styles.backgroundContent}>
                            <div className={styles.contentTitle}>上传营业执照信息</div>
                            <div className={styles.businessLicenseuploadBox}>
                                {
                                    this.state.data.businessLicenseimg ?
                                        <div className={styles.businessLicenseContent}>
                                            <img className={styles.backgImg} src={"http://oss.tdianyi.com/" + this.state.data.businessLicenseimg} />
                                            <img className={styles.closeImgBtn} src="http://oss.tdianyi.com/front/3CAEXRtyBexfyP352P3rENcQ7eYwmb8F.png" onClick={this.onCloseImg.bind(this, 'businessLicenseFiles', 'businessLicenseimg')} />
                                        </div>
                                        :
                                        <div className={styles.businessLicenseContent} onClick={this.exampleShow.bind(this, 'businessLicenseFiles', 'businessLicenseimg', 'http://oss.tdianyi.com/front/iTZbCjcCTiM72KrJscH57JZtnHGKfJYS.png')}>
                                            {/* <ImagePicker
                                        className={styles.PickerImgBtn}
                                        files={this.state.businessLicenseFiles}
                                        multiple={false}
                                        length={1}
                                        selectable={this.state.businessLicenseFiles.length < 1}
                                        onChange={this.onChangeIdImg.bind(this, 'businessLicenseFiles', 'businessLicenseimg')}
                                    /> */}
                                            <img className={styles.backgImg} src="http://oss.tdianyi.com/front/4P5PHSSz4ciwMdi5aRXebaft6wbDRDAX.png" />
                                        </div>
                                }
                                <div className={styles.businessLicenseTitle}>营业执照</div>
                            </div>
                            {
                                ToastTipsBusinessImg ? (
                                    <Flex justify="end" className={styles.toast_tips_img}>
                                        <span>{ToastTipsBusinessImg}</span>
                                    </Flex>
                                ) : ""
                            }
                            <div className={styles.inputItem}>
                                <div className={styles.inputTitle}>注册号</div>
                                <input className={styles.inputBox} placeholder="请输入注册号" onChange={this.handlechange.bind(this, 'registrationNumber')} value={this.state.data.registrationNumber} />
                            </div>
                            {
                                ToastTipsBusinessNo ? (
                                    <Flex justify="end" className={styles.toast_tips}>
                                        <span>{ToastTipsBusinessNo}</span>
                                    </Flex>
                                ) : ""
                            }
                            <div className={styles.inputItem}>
                                <div className={styles.inputTitle}>执照名称</div>
                                <input className={styles.inputBox} placeholder="请输入执照名称" onChange={this.handlechange.bind(this, 'licenseName')} value={this.state.data.licenseName} />
                            </div>
                            {
                                ToastTipsCornBusName ? (
                                    <Flex justify="end" className={styles.toast_tips}>
                                        <span>{ToastTipsCornBusName}</span>
                                    </Flex>
                                ) : ""
                            }
                            <div className={styles.inputItem}>
                                <div className={styles.inputTitle}>法人姓名</div>
                                <input className={styles.inputBox} placeholder="请输入法人姓名" onChange={this.handlechange.bind(this, 'legalPerson')} value={this.state.data.legalPerson} />
                            </div>
                            {
                                ToastTipsLegalName ? (
                                    <Flex justify="end" className={styles.toast_tips}>
                                        <span>{ToastTipsLegalName}</span>
                                    </Flex>
                                ) : ""
                            }
                            <div className={styles.selectItem} onClick={this.chooseDate.bind(this, '2')} >
                                <div className={styles.selectTitle}>有效期</div>
                                {
                                    this.state.data.businessLicenseValidity ?
                                        <div className={styles.unSelectBox} >{this.state.data.businessLicenseValidity}</div>
                                        :
                                        <div className={styles.selectBox} >请选择有效期</div>
                                }
                                <img className={styles.selectIcon} src="http://oss.tdianyi.com/front/eMbkt8GMNGYCpfFNe8Bycmb5QDRMTXkP.png" />
                            </div>
                            {
                                ToastTipsBusinessDate ? (
                                    <Flex justify="end" className={styles.toast_tips}>
                                        <span>{ToastTipsBusinessDate}</span>
                                    </Flex>
                                ) : ""
                            }
                        </div>
                        : null
                }
                <div className={styles.bottomBox}>
                    <div className={styles.saveBtn} onClick={this.submitInfo(1)}>保存</div>
                    <div className={styles.submitBtn} onClick={this.submitInfo(2)}>提交审核</div>
                </div>

                {
                    this.state.exampleImgShow ? <ExampleImg
                        exampleImg={this.state.exampleImgurl}
                        onUpload={this.onUpload(this.state.exampleFilesType, this.state.exampleImgUrlType)}
                        onCancle={this.onCancle}
                    /> : null
                }
            </div >
        )
    }
}



