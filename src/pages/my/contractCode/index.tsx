import React, { Component } from 'react';
import styles from './index.less';
import request from '@/services/request';
import router from 'umi/router';

class ContractCode extends Component {

    state = {
        info: {
            wx_sign_status: 0,
            wx_sign_url: "0",
            apply_store_status: { store_open_status: 0 },
            payment_status: { payment_open_status: 0 },
        }
    }

    async componentDidMount() {
        const res = await request({
            url: 'api/merchant/supplier/info'
        });
        if (res.code === 200) {
            this.setState({ info: res.data }, () => {
                // console.log(this.state)
            });
        }
    }

    // handleGoConfirm = () => {
    //     router.push('/my/contractConfirm')
    // }

    render() {
        const { wx_sign_url, wx_sign_status, apply_store_status, payment_status } = this.state.info;
        return (
            <div className={styles.my_contract_code}>
                <div className={styles.title}>我的签约码</div>
                <div className={styles.progress}>
                    <div className={styles.step_first}>
                        <div className={styles.first_logo}>1</div>
                        <div className={styles.first_info}>信息核对</div>
                        <div className={styles.first_divider}></div>
                    </div>
                    <div className={styles.step_second}>
                        <div className={styles.second_divider}></div>
                        <div className={wx_sign_status == 4 ? styles.second_logo_active : styles.second_logo_unactive}>2</div>
                        <div className={styles.second_info}>签约确认</div>
                    </div>
                </div>
                <div className={styles.my_contract_content}>
                    <div className={styles.code_wrap}>
                        <div className={styles.code}>
                            <div className={styles.contract_code_info}>
                                <div className={styles.left_gradients}></div>
                                <div className={styles.title}>我的签约码</div>
                                <div className={styles.right_gradients}></div>
                            </div>
                            <div className={styles.qrcode}>
                                <img src={wx_sign_url} alt="" className={styles.qrcode_img} />
                            </div>
                            <div className={styles.code_tips}>
                                <span>长按识别二维码跳转签约页面</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.result}>
                        <div className={styles.title}>我的信息核对结果</div>
                        <div className={styles.result_info}>{wx_sign_status == 3 ? "待签约" : apply_store_status.store_open_status == 3 && payment_status.payment_open_status == 3 && wx_sign_status == 4 ? "审核通过" : ""}</div>
                        {/* <div className={styles.result_go_confirm}>
                            <span onClick={this.handleGoConfirm}>去确认</span>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default ContractCode;