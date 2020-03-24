import React, { Component } from 'react';
import styles from './index.less';
import Request from '@/services/request';
import router from 'umi/router';

class BankAudit extends Component {

    state = {

    }

    componentDidMount() {

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
                <div className={styles.audit_info}>当前个人信息未提交，暂不能绑定银行卡，请提交注册个人的信息资料</div>
                <div className={styles.audit_btn} onClick={() => router.push('/my')}>去完善</div>

            </div>
        )
    }
}

export default BankAudit;