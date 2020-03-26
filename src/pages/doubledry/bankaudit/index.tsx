import React, { Component } from 'react';
import styles from './index.less';
import Request from '@/services/request';
import router from 'umi/router';

class BankAudit extends Component {

    state = {
        is_sq: null   // '0” - 认证失败，“1”- 已认证，“2”- 未认证，“3” - 审核中 '' 4 未提交
    }

    componentDidMount() {
        Request({
            url: 'api/merchant/supplier/info'
        }).then(res => {
            if (res.code == 200) {
                this.setState({
                    is_sq: res.data.is_sq
                })
            }
        })
    }

    handleNext = () => {

    }

    handleResetSubmit = () => {

    }

    render() {
        return (

            <div className={styles.audit}>
                <div className={styles.audit_logo}>
                    <img src={require('@/assets/warn.png')} alt="" className={styles.img} />
                </div>
                {
                    this.state.is_sq == 0 ? (
                        <div className={styles.audit_info}>当前提交身份资料数据审核失败，请重新提交</div>
                    ) : this.state.is_sq == 2 || this.state.is_sq == 4 ? (
                        <div className={styles.audit_info}>当前个人信息未提交，暂不能绑定银行卡，请提交注册个人的信息资料</div>
                    ) : this.state.is_sq == 3 ? (
                        <div className={styles.audit_info}>当前提交数据审核中，请稍等</div>
                    ) : ""
                }
                {
                    this.state.is_sq == 0 ? (
                        <div className={styles.audit_btn} onClick={() => router.push('/doubledry/register')}>去修改</div>
                    ) : this.state.is_sq == 2 || this.state.is_sq == 4 ? (
                        <div className={styles.audit_btn} onClick={() => router.push('/doubledry/register')}>去完善</div>
                    ) : this.state.is_sq == 3 ? (
                        <div className={styles.audit_btn} onClick={() => router.push('/my')}>确定</div>
                    ) : ""
                }

            </div>
        )
    }
}

export default BankAudit;