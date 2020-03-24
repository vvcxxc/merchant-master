import React, { Component } from 'react';
import { Toast } from 'antd-mobile';
import telImg from '@/assets/telphone.png';
import styles from './index.less';
import Request from '@/services/request';
import qs from 'qs';

let timer = null;

class CountMsg extends Component {

    state = {
        // 验证码
        code: "",
        isOk: true,
        wait: ""
    }

    // 销毁定时器
    componentWillUnmount() {
        clearInterval(timer)
    }

    handleGetCode = () => {
        let wait = 60;
        let _this = this;
        function resend() {
            if (wait == 0) {
                _this.setState({ isOk: true });
                clearInterval(timer)
            } else {
                wait--;
                _this.setState({ isOk: false, wait });
                clearInterval();
            }
        }
        resend();
        timer = setInterval(() => {
            resend()
        }, 1000);
        Request({
            url: 'verifyCode',
            method: 'post',
            data: qs.stringify({
                // phone
            })
        }).then(res => {
            if (res.code == 200) {
                Toast.success('验证码已发送');
            } else {
                _this.setState({ is_ok: true });
                clearInterval(timer);
                Toast.fail(res.message);
            }
        })
    }



    render() {
        return (
            <div className={styles.count_msg}>
                <div className={styles.telImg_wrap}>
                    <img src={telImg} alt="" className={styles.telImg_logo} />
                </div>
                <div className={styles.title}>获取验证码，同步账户信息</div>
                <div className={styles.info}>
                    <div className={styles.text_info}>系统检测到当前绑定的手机号:</div>
                    <div>
                        <span className={styles.telphone_number}>13585265222</span>
                        <span className={styles.text_info}>已在小熊敬礼</span>
                    </div>
                    <div className={styles.text_info}>注册开通账户并已绑定对应的银行卡</div>
                </div>

                <div className={styles.code}>
                    <div className={styles.code_wrap}>
                        <div className={styles.import_code}>
                            <input type="text" className={styles.code_inp} placeholder="请输入验证码" value={this.state.code} />
                        </div>
                        {
                            this.state.isOk ? (
                                <div className={styles.send_code} onClick={this.handleGetCode} >获取验证码</div>
                            ) : (
                                    <div className={styles.send_code_disabled}>{this.state.wait}s后重新获取</div>
                                )
                        }
                    </div>
                </div>

                <div className={styles.submit_btn}>提交</div>
            </div>
        )
    }
}

export default CountMsg;