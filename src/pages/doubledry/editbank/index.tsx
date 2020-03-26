import React, { Component } from 'react';
import { ImagePicker, Icon, NavBar, InputItem, List, Button, Toast } from 'antd-mobile';
import styles from './index.less';
import upload from '@/services/oss';
import Axios from 'axios';
import Cookies from 'js-cookie';
import Request from '@/services/request';
import router from 'umi/router';
import bankFront from '@/assets/upload_icon/bank_front.png';
import bankBack from '@/assets/upload_icon/bank_back.png';


class BankCard extends Component {

    state = {
        // 银行卡正面
        frontFiles: [],
        img_url_front: "",
        isHaveImgFront: false,

        // 银行卡反面
        behindFiles: [],
        img_url_behind: "",
        isHaveImgBehind: false,


        // 基本数据
        User: "",
        bankCard: "",
        bankName: "",
        // bankID: "",
        allBank: [],
        subBranchBank: "",

        isShowBank: false,
        BankArr: [],
        searchBank: "",

        isShowSubBranch: false,
        subBranchBankArr: [],

        id : 0
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

        await Request({
            url: 'v3/bank_name',
            method: 'POST'
        }).then(res => {
            if (res.status_code == 200 && res.data.length != 0) {
                this.setState({
                    allBank: res.data
                })
            }
        })

        await this.getData();

    }

    getData = () => {
        Request({
            url: 'v3/bank',
            method: 'get'
        }).then(res => {
            const { status_code, message } = res;
            if (status_code == 200 && Object.keys(res.data).length != 0) {
                this.setState({
                    img_url_front: res.data.bank_positive,
                    isHaveImgFront: true,

                    img_url_behind: res.data.bank_opposite,
                    isHaveImgBehind: true,

                    User: res.data.bank_account_name,

                    bankCard: res.data.bank_card_number,

                    bankName: res.data.bank_name,

                    subBranchBank: res.data.bank_branch,

                    id: res.data.id

                }, () => {
                })
            } else if (status_code == 403) {
                this.setState({})
            }
        });
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
                // Cookies.set("ImgUrlFront", JSON.stringify(res.data.path), { expires: 1 });
                this.setState({
                    img_url_front: res.data.path,
                    isHaveImgFront: true
                })
            })
        }
    }

    /**
     * 删除正面照按钮
     */
    handleCloseBankCardFront = () => {
        this.setState({
            img_url_front: "",
            isHaveImgFront: false
        })
        // Cookies.set("ImgUrlFront", JSON.stringify(""), { expires: 1 });
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
                // Cookies.set("ImgUrlBehind", JSON.stringify(res.data.path), { expires: 1 });
                this.setState({
                    img_url_behind: res.data.path,
                    isHaveImgBehind: true
                })
            })
        }
    }

    /**
     * 删除反面照按钮
     */
    handleCloseBankCardBehind = () => {
        this.setState({
            img_url_behind: "",
            isHaveImgBehind: false
        })
        // Cookies.set("ImgUrlBehind", JSON.stringify(""), { expires: 1 });
    }


    /**
     * IOS失去焦点后回到顶部
     */
    hanldeBlurScrollTop = () => {
        window.scrollTo(0, 0)
    }


    /**
     * 设置用户人
     */
    handleUserChange = (e: any) => {
        this.setState({
            User: e
        })
        // Cookies.set("User", e, { expires: 1 });
    }

    /**
     * 设置卡号
     */
    handleBankCardChange = (e: any) => {
        this.setState({
            bankCard: e
        })
        // Cookies.set("bankCard", e, { expires: 1 });
    }

    /**
     * 设置银行
     */
    // handleBankNameChange = (e: any) => {
    //     this.setState({
    //         bankName: e
    //     })
    //     // Cookies.set("bankName", e, { expires: 1 });
    // }


    /**
  * 银行下拉
  */
    handleSelectBank = (bankName: any) => {
        Request({
            url: 'v3/bank_name',
            method: 'POST',
            params: {
                name: bankName,
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
        // Cookies.set("bankName", item.bank_name, { expires: 1 });
        // Cookies.set("EditBankID", item.bank_id, { expires: 1 });
        this.setState({
            bankName: item.bank_name,
            // bankID: item.bank_id,
            isShowBank: false,
            searchBank: "",
        })
    }

    /**
     * 设置支行
     */
    handleSubBranchBankChange = (e: any) => {
        // Cookies.set("subBranchBank", e, { expires: 1 });
        this.setState({
            subBranchBank: e,
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
     * 支行
     */
    hanldeSubBranchBlur = () => {
        window.scrollTo(0, 0);
        // this.setState({
        //     isShowSubBranch: false
        // })
    }

    /**
     * 下一步
     */

    handleNextStep = () => {
        const { bankCard, User, subBranchBank, img_url_behind, img_url_front, bankName,
            // bankID
            id
        } = this.state;
        if (!img_url_front || !img_url_behind) {
            Toast.fail('请上传银行卡正反面信息', 1);
            return;
        }

        if (!(/^([\u4e00-\u9fa5]){2,}$/.test(User))) {
            Toast.fail('请输入开户人姓名', 1);
            return;
        }

        if (!(/^\d{16}|\d{19}$/.test(bankCard))) {
            Toast.fail('请输入16-19位的银行卡号', 1);
            return;
        }

        if (!(/^([0-9a-zA-Z\u4e00-\u9fa5]){1,}$/.test(bankName))) {
            Toast.fail('请输入正确开户银行名称', 1);
            return;
        }

        if (!(/^([0-9a-zA-Z\u4e00-\u9fa5]){1,}$/.test(subBranchBank))) {
            Toast.fail('请输入正确开户支行名称', 1);
            return;
        }

        Toast.loading("");

        Request({
            method: 'PUT',
            url: `v3/bank/${id}`,
            params: {
                bank_name: bankName,
                bank_card_number: bankCard,
                bank_branch: subBranchBank,
                bank_account_name: User,
                bank_positive: img_url_front,
                bank_opposite: img_url_behind,
            }
        }).then(res => {
            if (res.status_code == 200) {
                Toast.success(res.message, 2, () => {
                    router.push('/doubledry/bankaudit');
                });
            } else {
                Toast.fail(res.message, 1);
            }
        })

    }

    render() {
        const {
            frontFiles,
            isHaveImgFront,
            img_url_front,
            isHaveImgBehind,
            img_url_behind,
            behindFiles,
            User,
            bankCard,
            bankName,
            subBranchBank,
            isShowSubBranch,
            subBranchBankArr,
            // checkout_status, 
            // checkout_comment, 
            isShowBank,
            BankArr,
            searchBank
        } = this.state;
        return (
            <div className={styles.bank_page}>
                {/* <NavBar
                    icon={<Icon type="left" size='lg' />}
                    onLeftClick={() => router.goBack()}
                >完善资料</NavBar> */}
                <div className={styles.bankcard_wrap}>
                    {/* <div className={styles.bankcard_title}>
              <span>请绑定持卡人本人的银行卡</span>
            </div> */}



                    {/* 数据项 */}
                    <List className={styles.inputBox}>
                        <InputItem onBlur={this.hanldeBlurScrollTop.bind(this)} onChange={this.handleUserChange.bind(this)} value={User} placeholder='请输入开户人' clear>开户人</InputItem>
                        <InputItem onBlur={this.hanldeBlurScrollTop.bind(this)} onChange={this.handleBankCardChange.bind(this)} value={bankCard} placeholder='请输入银行卡号' clear>银行卡号</InputItem>
                        {/* <InputItem onBlur={this.hanldeBlurScrollTop.bind(this)} onChange={this.handleBankNameChange.bind(this)} value={bankName} placeholder='请输入开户银行' clear>开户银行</InputItem> */}
                        <div className={styles.subbranch_bank}>
                            <InputItem editable={false} onBlur={this.hanldeBlurScrollTop.bind(this)} onClick={this.handleSelectBank.bind(this, "")} value={bankName} placeholder='请选择开户银行' clear>开户银行</InputItem>
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
                            <InputItem onBlur={this.hanldeSubBranchBlur.bind(this)} onChange={this.handleSubBranchBankChange.bind(this)} value={subBranchBank} placeholder='请输入支行地址' clear>支行地址</InputItem>
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
                    </List>

                    <div className={styles.pickerBox}>
                        <div className={styles.bankcard_title}>
                            <span>请绑定持卡人本人的银行卡</span>
                        </div>
                        <div className={styles.bankcard_imagepicker}>
                            {/* 银行卡正面 */}
                            {
                                isHaveImgFront ?
                                    <div className={styles.preview_wrap}>
                                        <img src={"http://oss.tdianyi.com/" + img_url_front} alt="" className={styles.preview_img} />
                                        <Icon type="cross-circle" className={styles.delete_img} onClick={this.handleCloseBankCardFront} />
                                    </div>
                                    :
                                    <div className={styles.image_picker}>
                                        <ImagePicker
                                            onChange={this.handleBankCardFrontChange}
                                            selectable={frontFiles.length < 1}
                                            length={1}
                                            className={styles.image_picker_comp}
                                        />
                                        <img src={bankFront} alt="" className={styles.image_bg} />
                                        <div className={styles.image_desc}>拍摄银行卡正面</div>
                                    </div>
                            }
                            {
                                isHaveImgBehind ?
                                    <div className={styles.preview_wrap}>
                                        <img src={"http://oss.tdianyi.com/" + img_url_behind} alt="" className={styles.preview_img} />
                                        <Icon type="cross-circle" className={styles.delete_img} onClick={this.handleCloseBankCardBehind} />
                                    </div>
                                    :
                                    <div className={styles.image_picker}>
                                        <ImagePicker
                                            onChange={this.handleBankCardBehindChange}
                                            selectable={behindFiles.length < 1}
                                            length={1}
                                            className={styles.image_picker_comp}
                                        />
                                        <img src={bankBack} alt="" className={styles.image_bg} />
                                        <div className={styles.image_desc}>拍摄银行卡反面</div>
                                    </div>
                            }

                        </div>
                    </div>



                    <div className={styles.next_step_wrap}>
                        <div className={styles.next_step}>
                            <Button className={styles.next_step_btn} onClick={this.handleNextStep.bind(this)}>提交</Button>
                        </div>
                    </div>

                    {/* <div className={styles.later_fill}>稍后填写</div> */}
                </div>
            </div>
        )
    }
}

export default BankCard;
