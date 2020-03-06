import React, { Component } from 'react';
import styles from './index.less';
import request from '@/services/request';

class ContractConfirm extends Component {

    state = {
        info: {
            wx_sign_status: 0,
            wx_sign_url: "0"
        }
    }

    async componentDidMount() {
        const res = await request({
            url: 'api/merchant/supplier/info'
        });
        if (res.code === 200) {
            this.setState({ info: res.data });
        }
    }

    render() {
        const { wx_sign_url } = this.state.info;
        return (
            <div className={styles.my_contract_confirm}>
                <div className={styles.title}>我的签约码</div>
                <div className={styles.progress}>
                    <div className={styles.step_first}>
                        <div className={styles.first_logo}>1</div>
                        <div className={styles.first_info}>信息核对</div>
                        <div className={styles.first_divider}></div>
                    </div>
                    <div className={styles.step_second}>
                        <div className={styles.second_divider}></div>
                        <div className={styles.second_logo}>2</div>
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
                            {/* <div className={styles.qrcode}>
                                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583320263361&di=257181de6b1eb168abea57614aea8789&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F010f995811711ca84a0d304f05f9ad.jpg%40900w_1l_2o_100sh.jpg" alt="" className={styles.qrcode_img} />
                            </div> */}
                            <div className={styles.code_tips}>
                                <span>长按识别二维码跳转签约页面</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.result}>
                        <div className={styles.title}>我的信息核对结果</div>
                        <div className={styles.result_info}>审核通过</div>
                        <div className={styles.result_desc}>
                            <span>已完成微信资料签约，可正常微信收款啦</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContractConfirm;