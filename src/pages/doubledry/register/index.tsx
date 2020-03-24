import React, { Component } from 'react';
import { Icon, InputItem, List, ImagePicker, Toast } from 'antd-mobile';
import Axios from 'axios';
import router from 'umi/router';
import styles from './index.less';
import Cookies from 'js-cookie';
import upload from '@/services/oss';
import idFront from '@/assets/upload_icon/id_front.png';
import idBack from '@/assets/upload_icon/id_back.png';
import handId from '@/assets/upload_icon/hand_id.png';
import bankFront from '@/assets/upload_icon/bank_front.png';
import bankBack from '@/assets/upload_icon/bank_back.png';
import request from '@/services/request';

class Register extends Component {

    state = {
        // 基本数据
        DoubleDryUserName: "",
        DoubleDryIDCardNumber: "",
        DoubleDryIDCardValidity: "",


        // 身份证正面
        DoubleDryFrontFiles: [],
        double_dry_img_url_front_id: "",
        DoubleDryIsHaveImgFrontID: false,

        // 身份证反面
        DoubleDryBehindFiles: [],
        double_dry_img_url_behind_id: "",
        DoubleDryIsHaveImgBehindID: false,

        // 身份证正反面
        DoubleDryFrontBehindFiles: [],
        double_dry_img_url_front_behind_id: "",
        DoubleDryIsHaveImgFrontBehindID: false,
        isShowModal: false,

        // 基本数据
        DoubleDryUser: "",
        DoubleDryBankCard: "",
        DoubleDryBankName: "",
        DoubleDryBankID: "",
        DoubleDrySubBranchBank: "",


        isShowBank: false,
        BankArr: [],
        searchBank: "",

        isShowSubBranch: false,
        subBranchBankArr: [],


        // 银行卡正面
        DoubleDryFrontFilesBank: [],
        double_dry_img_url_front_bank: "",
        DoubleDryisHaveImgFrontBank: false,

        // 银行卡反面
        DoubleDryBehindFilesBank: [],
        double_dry_img_url_behind_bank: "",
        DoubleDryisHaveImgBehindBank: false,


        // 账户ID
        id: 0,
        allBank: [],

        payplatform_check_status: 0,
    }

    async componentDidMount() {

        // 暂时
        Axios.get('http://release.api.supplier.tdianyi.com/api/v2/up').then(res => {
            let { data } = res.data;
            let oss_data = {
                policy: data.policy,
                OSSAccessKeyId: data.accessid,
                success_action_status: 200, //让服务端返回200,不然，默认会返回204
                signature: data.signature,
                callback: data.callback,
                host: data.host,
                key: data.dir
            };
            window.localStorage.setItem('oss_data', JSON.stringify(oss_data));
        })

        await request({
            url: 'v1/common/getBankNames'
        }).then(res => {
            if (res.code == 200 && res.data.length != 0) {
                this.setState({
                    allBank: res.data
                })
            }
        })

        await request({
            url: 'sqAccount'
        }).then(res => {
            // console.log(res)
            if (res.code == 200 && res.data != null) {
                this.setState({
                    payplatform_check_status: res.data.payplatform_check_status,
                    DoubleDryUserName: res.data.identity_name,
                    DoubleDryIDCardNumber: res.data.identity_no,
                    DoubleDryIDCardValidity: res.data.identity_valid_time == "" ? "长期" : res.data.identity_valid_time,

                    DoubleDryIsHaveImgFrontID: res.data.identity_face_img ? true : false,
                    double_dry_img_url_front_id: res.data.identity_face_img,

                    DoubleDryIsHaveImgBehindID: res.data.identity_back_img ? true : false,
                    double_dry_img_url_behind_id: res.data.identity_back_img,

                    DoubleDryIsHaveImgFrontBehindID: res.data.identity_in_hand_img ? true : false,
                    double_dry_img_url_front_behind_id: res.data.identity_in_hand_img,

                    DoubleDryUser: res.data.owner_name,
                    DoubleDryBankCard: res.data.bankcard_no,
                    DoubleDryBankID: res.data.bank_id,
                    // DoubleDryBankName: res.data.bank_name,
                    DoubleDrySubBranchBank: res.data.branch_address,

                    DoubleDryisHaveImgFrontBank: res.data.bankcard_face_img ? true : false,
                    double_dry_img_url_front_bank: res.data.bankcard_face_img,

                    DoubleDryisHaveImgBehindBank: res.data.bankcard_back_img ? true : false,
                    double_dry_img_url_behind_bank: res.data.bankcard_back_img,

                    id: res.data.id
                }, () => {
                    this.state.allBank.forEach(item => {
                        if (item.bank_id == this.state.DoubleDryBankID) {
                            this.setState({
                                DoubleDryBankName: item.bank_name
                            })
                        } 
                    })
                    if (this.state.payplatform_check_status == 0 || this.state.payplatform_check_status == 1 ) {
                        router.push('/doubledry/audit');
                    }
                })
            }
        })


        /**
         * 姓名
         */
        Cookies.get("DoubleDryUserName") || Cookies.get("DoubleDryUserName") == "" ? (
            this.setState({
                DoubleDryUserName: Cookies.get("DoubleDryUserName")
            })
        ) : "";

        /**
         * 身份证
         */
        Cookies.get("DoubleDryIDCardNumber") || Cookies.get("DoubleDryIDCardNumber") == "" ? (
            this.setState({
                DoubleDryIDCardNumber: Cookies.get("DoubleDryIDCardNumber")
            })
        ) : "";

        /**
         * 身份证有效期
         */
        Cookies.get("DoubleDryIDCardValidity") || Cookies.get("DoubleDryIDCardValidity") == "" ? (
            this.setState({
                DoubleDryIDCardValidity: JSON.parse(Cookies.get("DoubleDryIDCardValidity"))
            })
        ) : "";

        /**
         * 正面身份证
         */
        Cookies.get("DoubleDryEditImgUrlFrontID") && JSON.parse(Cookies.get("DoubleDryEditImgUrlFrontID")) == "" ? (
            this.setState({
                double_dry_img_url_front_id: "",
                DoubleDryIsHaveImgFrontID: false
            })
        ) : Cookies.get("DoubleDryEditImgUrlFrontID") ? (
            this.setState({
                double_dry_img_url_front_id: JSON.parse(Cookies.get("DoubleDryEditImgUrlFrontID")),
                DoubleDryIsHaveImgFrontID: true
            })
        ) : "";

        /**
         * 反面身份证
         */
        Cookies.get("DoubleDryEditImgUrlBehindID") && JSON.parse(Cookies.get("DoubleDryEditImgUrlBehindID")) == "" ? (
            this.setState({
                double_dry_img_url_behind_id: "",
                DoubleDryIsHaveImgBehindID: false
            })
        ) : Cookies.get("DoubleDryEditImgUrlBehindID") ? (
            this.setState({
                double_dry_img_url_behind_id: JSON.parse(Cookies.get("DoubleDryEditImgUrlBehindID")),
                DoubleDryIsHaveImgBehindID: true
            })
        ) : "";

        /**
         * 正反面身份证
         */
        Cookies.get("DoubleDryEditImgUrlFrontBehindID") && JSON.parse(Cookies.get("DoubleDryEditImgUrlFrontBehindID")) == "" ? (
            this.setState({
                double_dry_img_url_front_behind_id: "",
                DoubleDryIsHaveImgFrontBehindID: false
            })
        ) : Cookies.get("DoubleDryEditImgUrlFrontBehindID") ? (
            this.setState({
                double_dry_img_url_front_behind_id: JSON.parse(Cookies.get("DoubleDryEditImgUrlFrontBehindID")),
                DoubleDryIsHaveImgFrontBehindID: true
            })
        ) : "";

        /**
         * 开户人
         */
        Cookies.get("DoubleDryUser") || Cookies.get("DoubleDryUser") == "" ? (
            this.setState({
                DoubleDryUser: Cookies.get("DoubleDryUser")
            })
        ) : "";

        /**
         * 银行卡号
         */
        Cookies.get("DoubleDryBankCard") || Cookies.get("DoubleDryBankCard") == "" ? (
            this.setState({
                DoubleDryBankCard: Cookies.get("DoubleDryBankCard")
            })
        ) : "";


        /**
         * 开户银行
         */
        Cookies.get("DoubleDryBankName") || Cookies.get("DoubleDryBankName") == "" ? (
            this.setState({
                DoubleDryBankName: Cookies.get("DoubleDryBankName")
            })
        ) : "";


        /**
        * 银行ID
        */
        Cookies.get("DoubleDryBankID") || Cookies.get("DoubleDryBankID") == "" ? (
            this.setState({
                DoubleDryBankID: Cookies.get("DoubleDryBankID")
            })
        ) : "";


        /**
         * 支行地址
         */
        Cookies.get("DoubleDrySubBranchBank") || Cookies.get("DoubleDrySubBranchBank") == "" ? (
            this.setState({
                DoubleDrySubBranchBank: Cookies.get("DoubleDrySubBranchBank")
            })
        ) : "";


        /**
         * 正面银行卡
         */
        Cookies.get("DoubleDryEditImgUrlFrontBank") && JSON.parse(Cookies.get("DoubleDryEditImgUrlFrontBank")) == "" ? (
            this.setState({
                double_dry_img_url_front_bank: "",
                DoubleDryisHaveImgFrontBank: false
            })
        ) : Cookies.get("DoubleDryEditImgUrlFrontBank") ? (
            this.setState({
                double_dry_img_url_front_bank: JSON.parse(Cookies.get("DoubleDryEditImgUrlFrontBank")),
                DoubleDryisHaveImgFrontBank: true
            })
        ) : "";

        /**
         * 反面银行卡
         */
        Cookies.get("DoubleDryEditImgUrlBehindBank") && JSON.parse(Cookies.get("DoubleDryEditImgUrlBehindBank")) == "" ? (
            this.setState({
                double_dry_img_url_behind_bank: "",
                DoubleDryisHaveImgBehindBank: false
            })
        ) : Cookies.get("DoubleDryEditImgUrlBehindBank") ? (
            this.setState({
                double_dry_img_url_behind_bank: JSON.parse(Cookies.get("DoubleDryEditImgUrlBehindBank")),
                DoubleDryisHaveImgBehindBank: true
            })
        ) : "";
    }

    /**
     * 姓名
     */
    handleDoubleDryUserNameChange = (e: any) => {
        this.setState({
            DoubleDryUserName: e
        })
        Cookies.set("DoubleDryUserName", e, { expires: 1 });
    }

    /**
     * 身份证
     */
    handleDoubleDryIDCardNumberChange = (e: any) => {
        this.setState({
            DoubleDryIDCardNumber: e
        })
        Cookies.set("DoubleDryIDCardNumber", e, { expires: 1 });
    }

    /**
     * 有效期
     */
    chooseDate = () => {
        router.push('/doubledry/chooseDate?type=1')
    }

    /**
     * 上传身份证正面
     */
    handleIdCardFrontChange = (file: any) => {
        if (file[0]) {
            let img = file[0].url;
            Toast.loading('正在上传中');
            upload(img).then(res => {
                Toast.hide();
                Cookies.set("DoubleDryEditImgUrlFrontID", JSON.stringify(res.data.path), { expires: 1 });
                this.setState({
                    double_dry_img_url_front_id: res.data.path,
                    DoubleDryIsHaveImgFrontID: true
                })
            })
        }
    }

    /**
     * 删除正面照按钮
     */
    handleCloseIdCardFront = () => {
        this.setState({
            double_dry_img_url_front_id: "",
            DoubleDryIsHaveImgFrontID: false
        })
        Cookies.set("DoubleDryEditImgUrlFrontID", JSON.stringify(""), { expires: 1 });
    }

    /**
     * 上传身份证反面
     */
    handleIdCardBehindChange = (file: any) => {
        if (file[0]) {
            let img = file[0].url;
            Toast.loading('正在上传中');
            upload(img).then(res => {
                Toast.hide();
                Cookies.set("DoubleDryEditImgUrlBehindID", JSON.stringify(res.data.path), { expires: 1 });
                this.setState({
                    double_dry_img_url_behind_id: res.data.path,
                    DoubleDryIsHaveImgBehindID: true
                })
            })
        }
    }


    /**
     * 删除反面照按钮
     */
    handleCloseIdCardBehind = () => {
        this.setState({
            double_dry_img_url_behind_id: "",
            DoubleDryIsHaveImgBehindID: false
        })
        Cookies.set("DoubleDryEditImgUrlBehindID", JSON.stringify(""), { expires: 1 });
    }

    /**
     * 上传身份证正反面
     */
    handleIdCardFrontBehindChange = (file: any) => {
        if (file[0]) {
            let img = file[0].url;
            Toast.loading('正在上传中');
            upload(img).then(res => {
                Toast.hide();
                Cookies.set("DoubleDryEditImgUrlFrontBehindID", JSON.stringify(res.data.path), { expires: 1 });
                this.setState({
                    double_dry_img_url_front_behind_id: res.data.path,
                    DoubleDryIsHaveImgFrontBehindID: true,
                    isShowModal: false
                })
            })
        }
    }

    /**
     * 删除正反面照按钮
     */
    handleCloseIdCardFrontBehind = () => {
        this.setState({
            double_dry_img_url_front_behind_id: "",
            DoubleDryIsHaveImgFrontBehindID: false
        })
        Cookies.set("DoubleDryEditImgUrlFrontBehindID", JSON.stringify(""), { expires: 1 });
    }

    /**
     * 展示身份证示例
     */
    showModal = () => {
        this.setState({
            isShowModal: true
        })
    }

    /**
     * 隐藏身份证示例
     */
    handleHideModal = (e: any) => {
        if (e.target == e.currentTarget) {
            this.setState({
                isShowModal: false
            })
        }
    }


    /**
     * IOS失去焦点后回到顶部
     */
    hanldeBlurScrollTop = () => {
        window.scrollTo(0, 0)
    }

    /**
     * 支行
     */
    hanldeSubBranchBlur = () => {
        window.scrollTo(0, 0);
        // this.setState({
        //     isShowSubBranch: false
        // })
    }

    /**
     * 设置用户人
     */
    handleUserChange = (e: any) => {
        this.setState({
            DoubleDryUser: e
        })
        Cookies.set("DoubleDryUser", e, { expires: 1 });
    }

    /**
     * 设置卡号
     */
    handleBankCardChange = (e: any) => {
        this.setState({
            DoubleDryBankCard: e
        })
        Cookies.set("DoubleDryBankCard", e, { expires: 1 });
    }

    /**
     * 设置银行
     */
    // handleBankNameChange = (e: any) => {
    //     this.setState({
    //         DoubleDryBankName: e
    //     })
    //     Cookies.set("DoubleDryBankName", e, { expires: 1 });
    // }

    /**
    * 银行下拉
    */
    handleSelectBank = (bankName: any) => {
        request({
            url: 'v1/common/getBankNames',
            params: {
                bank_name: bankName,
            }
        }).then(res => {
            if (res.data.length != 0) {
                this.setState({
                    isShowBank: true,
                    BankArr: res.data,
                })
            }
        })
    }

    /**
    * 搜索银行
    */
    handleSearchBank = (e: any) => {
        // console.log(e);
        this.setState({
            searchBank: e
        }, () => {
            this.handleSelectBank(e);
        })
    }

    /**
    * 选择银行
    */
    handleSelectBankItem = (item: any) => {
        // console.log(item);
        Cookies.set("DoubleDryBankName", item.bank_name, { expires: 1 });
        Cookies.set("DoubleDryBankID", item.bank_id, { expires: 1 });
        this.setState({
            DoubleDryBankName: item.bank_name,
            bankID: item.bank_id,
            isShowBank: false,
            searchBank: "",
        })
    }

    /**
     * 设置支行
     */
    handleSubBranchBankChange = (e: any) => {
        Cookies.set("DoubleDrySubBranchBank", e, { expires: 1 });
        this.setState({
            DoubleDrySubBranchBank: e,
        })
        // Axios.get("http://test.api.supplier.tdianyi.com/v3/bankAddress").then(res => {
        //     if (res.data.date.length != 0) {
        //         this.setState({
        //             isShowSubBranch: true,
        //             subBranchBankArr: res.data.date
        //         })
        //     }
        // })
    }

    /**
     * 上传银行卡正面
     */
    handleBankCardFrontChange = (file: any) => {
        if (file[0]) {
            let img = file[0].url;
            Toast.loading('正在上传中');
            upload(img).then(res => {
                Toast.hide();
                Cookies.set("DoubleDryEditImgUrlFrontBank", JSON.stringify(res.data.path), { expires: 1 });
                this.setState({
                    double_dry_img_url_front_bank: res.data.path,
                    DoubleDryisHaveImgFrontBank: true
                })
            })
        }
    }

    /**
     * 删除正面照按钮
     */
    handleCloseBankCardFront = () => {
        this.setState({
            double_dry_img_url_front_bank: "",
            DoubleDryisHaveImgFrontBank: false
        })
        Cookies.set("DoubleDryEditImgUrlFrontBank", JSON.stringify(""), { expires: 1 });
    }

    /**
     * 上传银行卡反面
     */
    handleBankCardBehindChange = (file: any) => {
        if (file[0]) {
            let img = file[0].url;
            Toast.loading('正在上传中');
            upload(img).then(res => {
                Toast.hide();
                Cookies.set("DoubleDryEditImgUrlBehindBank", JSON.stringify(res.data.path), { expires: 1 });
                this.setState({
                    double_dry_img_url_behind_bank: res.data.path,
                    DoubleDryisHaveImgBehindBank: true
                })
            })
        }
    }

    /**
     * 删除反面照按钮
     */
    handleCloseBankCardBehind = () => {
        this.setState({
            double_dry_img_url_behind_bank: "",
            DoubleDryisHaveImgBehindBank: false
        })
        Cookies.set("DoubleDryEditImgUrlBehindBank", JSON.stringify(""), { expires: 1 });
    }

    /**
     * 注册
     */
    handleRegister = () => {
        const {
            id,
            DoubleDryUserName,
            DoubleDryIDCardNumber,
            DoubleDryIDCardValidity,
            double_dry_img_url_front_id,
            double_dry_img_url_behind_id,
            double_dry_img_url_front_behind_id,
            DoubleDryUser,
            DoubleDryBankCard,
            DoubleDryBankName,
            DoubleDryBankID,
            DoubleDrySubBranchBank,
            double_dry_img_url_front_bank,
            double_dry_img_url_behind_bank
        } = this.state;
        request({
            url: 'sqAccount',
            method: "POST",
            data: {
                account_id: id,
                identity_name: DoubleDryUserName,
                identity_no: DoubleDryIDCardNumber,
                identity_valid_time: DoubleDryIDCardValidity == "长期" ? "" : DoubleDryIDCardValidity,
                identity_is_long_time: DoubleDryIDCardValidity == "长期" ? 1 : 0,
                identity_face_img: double_dry_img_url_front_id,
                identity_back_img: double_dry_img_url_behind_id,
                identity_in_hand_img: double_dry_img_url_front_behind_id,
                owner_name: DoubleDryUser,
                bankcard_no: DoubleDryBankCard,
                // bank_name: DoubleDryBankName,
                bank_id: DoubleDryBankID,
                branch_address: DoubleDrySubBranchBank,
                bankcard_face_img: double_dry_img_url_front_bank,
                bankcard_back_img: double_dry_img_url_behind_bank
            }
        }).then(res => {
            if (res.code == 200) {
                Toast.success(res.message, 1, () => {
                    // router.push(`/doubledry/bindcard?bankCode=${DoubleDryBankCard}`); 
                    // router.push('/doubledry/bindcard');
                    Cookies.remove('DoubleDryUserName');
                    Cookies.remove('DoubleDryIDCardNumber');
                    Cookies.remove('DoubleDryIDCardValidity'); 
                    Cookies.remove('double_dry_img_url_front_id');
                    Cookies.remove('double_dry_img_url_behind_id');
                    Cookies.remove('double_dry_img_url_front_behind_id');
                    Cookies.remove('DoubleDryUser');
                    Cookies.remove('DoubleDryBankCard');
                    Cookies.remove('DoubleDryBankName');
                    Cookies.remove('DoubleDryBankID');
                    Cookies.remove('DoubleDrySubBranchBank');
                    Cookies.remove('double_dry_img_url_front_bank');
                    Cookies.remove('double_dry_img_url_behind_bank');
                    router.push('/doubledry/audit');
                });
            } else {
                Toast.fail(res.message, 1);
            }
        })
    }

    render() {
        const { DoubleDryUserName,
            DoubleDryIDCardNumber,
            DoubleDryIDCardValidity,
            DoubleDryIsHaveImgFrontID,
            double_dry_img_url_front_id,
            DoubleDryFrontFiles,
            DoubleDryIsHaveImgBehindID,
            double_dry_img_url_behind_id,
            DoubleDryBehindFiles,
            DoubleDryIsHaveImgFrontBehindID,
            double_dry_img_url_front_behind_id,
            isShowModal,
            DoubleDryFrontBehindFiles,
            DoubleDryUser,
            DoubleDryBankCard,
            DoubleDryBankName,
            DoubleDrySubBranchBank,
            isShowSubBranch,
            subBranchBankArr,
            DoubleDryisHaveImgFrontBank,
            double_dry_img_url_front_bank,
            DoubleDryFrontFilesBank,
            DoubleDryisHaveImgBehindBank,
            double_dry_img_url_behind_bank,
            DoubleDryBehindFilesBank,
            isShowBank,
            BankArr,
            searchBank
        } = this.state;

        return (
            <div className={styles.register}>
                <div className={styles.register_step}>
                    <div className={styles.active_step}>1</div>
                    <div className={styles.active_text}>注册开户</div>
                    <Icon type="right" color="#999999" />
                    <div className={styles.unactive_step}>2</div>
                    <div className={styles.unactive_text}>绑定激活</div>
                    <Icon type="right" color="#999999" />
                    <div className={styles.unactive_step}>3</div>
                    <div className={styles.unactive_text}>提现确认</div>
                </div>

                <div className={styles.id_card}>
                    {/* 数据项 */}


                    <List>
                        <div className={styles.title}>
                            <div className={styles.logo}></div>
                            <div>请输入身份证信息</div>
                        </div>
                        <InputItem placeholder='请输入您的真实姓名' onChange={this.handleDoubleDryUserNameChange.bind(this)} value={DoubleDryUserName} clear>真实姓名</InputItem>
                        <InputItem placeholder='请输入您的身份证号' onChange={this.handleDoubleDryIDCardNumberChange.bind(this)} value={DoubleDryIDCardNumber} clear>身份证号</InputItem>
                        <InputItem placeholder='请输入身份证有效期' editable={false} clear onClick={this.chooseDate.bind(this)} value={DoubleDryIDCardValidity}>有效期</InputItem>
                        <div className={styles.title}>请拍照上传您的二代身份证</div>
                        <div className={styles.idcard_imagepicker}>
                            {/* 身份证正面照 */}
                            {
                                DoubleDryIsHaveImgFrontID ?
                                    <div className={styles.preview_wrap}>
                                        <img src={"http://oss.tdianyi.com/" + double_dry_img_url_front_id} alt="" className={styles.preview_img} />
                                        <Icon type="cross-circle" className={styles.delete_img} onClick={this.handleCloseIdCardFront} />
                                    </div>
                                    :
                                    <div className={styles.image_picker}>
                                        <ImagePicker
                                            files={DoubleDryFrontFiles}
                                            onChange={this.handleIdCardFrontChange}
                                            onImageClick={(index, fs) => console.log(index, fs)}
                                            selectable={DoubleDryFrontFiles.length < 1}
                                            length={1}
                                            className={styles.image_picker_comp}
                                        />
                                        <img src={idFront} alt="" className={styles.image_bg} />
                                        <div className={styles.image_desc}>请上传身份证正面</div>
                                    </div>
                            }
                            {/* 身份证反面照 */}
                            {
                                DoubleDryIsHaveImgBehindID ?
                                    <div className={styles.preview_wrap}>
                                        <img src={"http://oss.tdianyi.com/" + double_dry_img_url_behind_id} alt="" className={styles.preview_img} />
                                        <Icon type="cross-circle" className={styles.delete_img} onClick={this.handleCloseIdCardBehind} />
                                    </div>
                                    :
                                    <div className={styles.image_picker}>
                                        <ImagePicker
                                            files={DoubleDryBehindFiles}
                                            onChange={this.handleIdCardBehindChange}
                                            onImageClick={(index, fs) => console.log(index, fs)}
                                            selectable={DoubleDryBehindFiles.length < 1}
                                            length={1}
                                            className={styles.image_picker_comp}
                                        />
                                        <img src={idBack} alt="" className={styles.image_bg} />
                                        <div className={styles.image_desc}>请上传身份证反面</div>
                                    </div>
                            }
                        </div>
                        <div className={styles.handInIDCard}>
                            {/* 身份证正反面 */}
                            {
                                DoubleDryIsHaveImgFrontBehindID ?
                                    <div className={styles.preview_wrap}>
                                        <img src={"http://oss.tdianyi.com/" + double_dry_img_url_front_behind_id} alt="" className={styles.preview_img} />
                                        <Icon type="cross-circle" className={styles.delete_img} onClick={this.handleCloseIdCardFrontBehind} />
                                    </div>
                                    :
                                    (<div className={styles.image_picker} onClick={this.showModal}>
                                        <img src={handId} alt="" className={styles.image_bg} />
                                        <div className={styles.image_desc}>请上传手持身份证照片</div>
                                    </div>)
                            }
                        </div>
                    </List>


                    {/* IDModal */}
                    {
                        isShowModal ? (<div className={styles.modal_wrap} onClick={this.handleHideModal}>
                            <div className={styles.modal_container}>
                                <div className={styles.modal_exeample}>
                                    <div className={styles.modal_title}>证件上传示例</div>
                                    <div className={styles.modal_pic}><img src={require('@/assets/upload_icon/idcard.png')} /></div>
                                    <div className={styles.modal_desc}>四角完整，亮度均匀，照片清晰</div>
                                </div>
                                <div className={styles.modal_btn_tool}>
                                    <div className={styles.modal_btn}>知道了</div>
                                    <ImagePicker
                                        onChange={this.handleIdCardFrontBehindChange}
                                        onImageClick={(index, fs) => console.log(index, fs)}
                                        selectable={DoubleDryFrontBehindFiles.length < 1}
                                        length={1}
                                        className={styles.image_picker_front_behind}
                                    />
                                </div>
                            </div>
                        </div>) : null
                    }

                </div>


                <div className={styles.bank_card}>
                    {/* 数据项 */}
                    <List className={styles.inputBox}>
                        <div className={styles.title}>
                            <div className={styles.logo}></div>
                            <div>请输入银行卡信息</div>
                        </div>
                        <InputItem onBlur={this.hanldeBlurScrollTop.bind(this)} onChange={this.handleUserChange.bind(this)} value={DoubleDryUser} placeholder='请输入开户人' clear>开户人</InputItem>
                        <InputItem onBlur={this.hanldeBlurScrollTop.bind(this)} onChange={this.handleBankCardChange.bind(this)} value={DoubleDryBankCard} placeholder='请输入银行卡号' clear>银行卡号</InputItem>

                        <div className={styles.subbranch_bank}>
                            {/* <InputItem onBlur={this.hanldeBlurScrollTop.bind(this)} onChange={this.handleBankNameChange.bind(this)} value={DoubleDryBankName} placeholder='请输入开户银行' clear>开户银行</InputItem> */}
                            <InputItem editable={false} onBlur={this.hanldeBlurScrollTop.bind(this)} onClick={this.handleSelectBank.bind(this, "")} value={DoubleDryBankName} placeholder='请选择开户银行' clear>开户银行</InputItem>
                        </div>
                        {
                            isShowBank ? (
                                <div className={styles.search_wrap}>
                                    <List className={styles.search_result}>
                                        <InputItem value={searchBank} onChange={this.handleSearchBank} placeholder='请搜索银行' clear></InputItem>
                                        {
                                            BankArr.map(item => (
                                                <List.Item key={item.bank_id} onClick={this.handleSelectBankItem.bind(this, item)}>{item.bank_name}</List.Item>
                                            ))
                                        }
                                    </List>
                                </div>
                            ) : ""
                        }



                        <div className={styles.subbranch_bank}>
                            <InputItem onBlur={this.hanldeSubBranchBlur.bind(this)} onChange={this.handleSubBranchBankChange.bind(this)} value={DoubleDrySubBranchBank} placeholder='请输入支行地址' clear>支行地址</InputItem>
                            {
                                isShowSubBranch ? (
                                    <div className={styles.search_wrap}>
                                        <List className={styles.search_result}>
                                            {
                                                subBranchBankArr.map(item => (
                                                    <List.Item key={item.ids}>{item.name}</List.Item>
                                                ))
                                            }
                                        </List>
                                    </div>
                                ) : ""
                            }
                        </div>
                        <div className={styles.title}>请绑定持卡人本人的银行卡</div>
                        <div className={styles.bankcard_imagepicker}>
                            {/* 银行卡正面 */}
                            {
                                DoubleDryisHaveImgFrontBank ?
                                    <div className={styles.preview_wrap}>
                                        <img src={"http://oss.tdianyi.com/" + double_dry_img_url_front_bank} alt="" className={styles.preview_img} />
                                        <Icon type="cross-circle" className={styles.delete_img} onClick={this.handleCloseBankCardFront} />
                                    </div>
                                    :
                                    <div className={styles.image_picker}>
                                        <ImagePicker
                                            onChange={this.handleBankCardFrontChange}
                                            selectable={DoubleDryFrontFilesBank.length < 1}
                                            length={1}
                                            className={styles.image_picker_comp}
                                        />
                                        <img src={bankFront} alt="" className={styles.image_bg} />
                                        <div className={styles.image_desc}>拍摄银行卡正面</div>
                                    </div>
                            }
                            {
                                DoubleDryisHaveImgBehindBank ?
                                    <div className={styles.preview_wrap}>
                                        <img src={"http://oss.tdianyi.com/" + double_dry_img_url_behind_bank} alt="" className={styles.preview_img} />
                                        <Icon type="cross-circle" className={styles.delete_img} onClick={this.handleCloseBankCardBehind} />
                                    </div>
                                    :
                                    <div className={styles.image_picker}>
                                        <ImagePicker
                                            onChange={this.handleBankCardBehindChange}
                                            selectable={DoubleDryBehindFilesBank.length < 1}
                                            length={1}
                                            className={styles.image_picker_comp}
                                        />
                                        <img src={bankBack} alt="" className={styles.image_bg} />
                                        <div className={styles.image_desc}>拍摄银行卡反面</div>
                                    </div>
                            }

                        </div>
                    </List>
                </div>


                <div className={styles.register_btn} onClick={this.handleRegister}>注册</div>
            </div>
        )
    }
}

export default Register;