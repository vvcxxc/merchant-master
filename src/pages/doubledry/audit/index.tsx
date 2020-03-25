import React, { Component } from 'react';
import styles from './index.less';
import Request from '@/services/request';
import router from 'umi/router';

class Audit extends Component {

    state = {
        /**
         * is_sq    0 认证失败  1 已认证  2 未认证   3 审核中    4 未提交
         * 
         * sq_failure   审核失败原因
         */
        is_sq: null,


        sq_failure: ""
    }

    componentDidMount() {
        Request({
            url: 'api/merchant/supplier/info'
        }).then(res => {
            if (res.code == 200) {
                this.setState({
                    is_sq: res.data.is_sq,
                    sq_failure: res.data.sq_failure
                })
            }
        })
    }

    handleNext = () => {
        // if (this.state.sq_finished_step == 0) {
        //     router.push('/doubledry/register')
        // } else if (this.state.sq_finished_step == 1) {
        //     router.push('/doubledry/bindcard')
        // } else if (this.state.sq_finished_step == 2) {
        //     router.push('/doubledry/withdraw')
        // }
    }

    handleResetSubmit = () => {
        router.push('/doubledry/register')
        // if (this.state.sq_finished_step == 0) {
        //     router.push('/doubledry/register')
        // } else if (this.state.sq_finished_step == 1) {
        //     router.push('/doubledry/bindcard')
        // } else if (this.state.sq_finished_step == 2) {
        //     router.push('/doubledry/withdraw')
        // }
    }

    render() {
        return (

            <div className={styles.audit}>
                {
                    this.state.is_sq == 0 || this.state.is_sq == 2 || this.state.is_sq == 3 || this.state.is_sq == 4 ? (
                        <div className={styles.audit_logo}>
                            <img src={require('@/assets/warn.png')} alt="" className={styles.img} />
                        </div>
                    ) : (
                            <div className={styles.audit_logo}>
                                <img src={require('@/assets/success.png')} alt="" className={styles.img} />
                            </div>
                        )
                }
                <div className={styles.audit_info}>{
                    this.state.is_sq == 2 || this.state.is_sq == 3 || this.state.is_sq == 4 ? "资料提交审核,请等候" : this.state.is_sq == 0 ? "资料审核失败，请重新修改" : this.state.is_sq == 1 ? "资料审核通过" : ""
                }</div>
                {
                    this.state.is_sq == 2 || this.state.is_sq == 3 || this.state.is_sq == 4 ? (
                        <div className={styles.audit_btn} onClick={() => router.push('/my')}>知道了</div>
                    ) : this.state.is_sq == 1 ? (
                        <div className={styles.audit_btn} onClick={this.handleNext}>下一步</div>
                    ) : this.state.is_sq == 0 ? (
                        <div className={styles.audit_btn} onClick={this.handleResetSubmit}>重新提交</div>
                    ) : ""
                }

            </div>
        )
    }
}

export default Audit;