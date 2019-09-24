/**title: 我的卡券 */
import React, { Component } from 'react';

import styles from './index.less';

import QRModal from '../components/QRModal';

export default class serviceLogin extends Component {

    state = {
        flag: false
    }

    handleClick = () => {
        this.setState({
            flag: true
        })
    }

    render() {
        return (
            <div>
                {/* 券 */}
                <div className={styles.card_ticket}>
                    <div className={styles.card_ticket_info}>
                        <div className={styles.store_name}>多美蛋糕店(珞喻路分店)</div>
                        <div className={styles.ticket_price}>￥100.00</div>
                        <div className={styles.ticket_date}>09-05 11:15:30</div>
                    </div>
                    <div className={styles.card_ticket_use_btn}>
                        <div className={styles.use_btn_wrap}>
                            <div className={styles.btn_status} onClick={this.handleClick.bind(this)}>
                                <div className={styles.btn_text}>立即使用</div>
                                <div className={styles.btn_arrow}>></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* modal */}
                <QRModal isShow={this.state.flag} order={123456789123} onClose={() => {}} name="Cake" url="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568696416768&di=9e5ff1e0f68590e6e1f0530b29f0e42a&imgtype=0&src=http%3A%2F%2Fimgs.focus.cn%2Fupload%2Fcs%2F11091%2Fb_110904724.jpg"/>
            </div>
        )
    }
}   