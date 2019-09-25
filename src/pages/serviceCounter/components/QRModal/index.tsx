import React, { Component } from 'react';

import styles from './index.less';

interface Props {
    isShow: Boolean,
    onClose: () => void,
    name: String,
    url: String,
    order: Number
}

export default class QRModal extends Component<Props> {

    componentDidMount() {
        let ele = document.getElementById('modal');
        if(this.props.isShow) {
            ele.style.display = "flex";
        }else {
            ele.style.display = "none";
        }
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.isShow) {
            let ele = document.getElementById('modal');
            ele.style.display = 'flex';
        }
    }

    handleClose = () => {
        let ele = document.getElementById('modal');
        ele.style.display = "none";
        this.props.onClose && this.props.onClose()
    }

    render() {
        return (
            <div id="modal" className={styles.modal}>
                <div className={styles.modal_content}>
                    <div className={styles.qr_code_content} style={{ flex: 8 }}>
                        <div className={styles.store_name}>{this.props.name}</div>
                        <img className={styles.qr_code} src={this.props.url} alt="" />
                        <div className={styles.order_num}>订单号：{this.props.order}</div>
                        <div className={styles.gift_step}>请向工作人员展示二维码领取礼品</div>
                    </div>
                    <div style={{ flex: 1 }}></div>
                    <div style={{ flex: 1 }}>
                        <div className={styles.close_modal} onClick={this.handleClose.bind(this)}> x </div>
                    </div>
                </div>
            </div>
        )
    }
}