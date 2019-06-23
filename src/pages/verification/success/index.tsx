import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, Icon } from 'antd-mobile';

export default class Success extends Component {
    state = {
        is_show: false
    };

    isShow = () => {
        this.setState({is_show: !this.state.is_show})
    }

    render (){
        const info = this.state.is_show == true ? (
            <div className={styles.box2} style={{marginTop: 40}}>
                <p>
                    <span>使用有效期：</span>
                    2019.01.01-2019.02.02
                </p>
                <p><span>使用规则：</span></p>
                <p>· 123</p>
                <Flex justify='around' style={{marginTop: 40}} onClick={this.isShow}>
                    <Flex className={styles.button2} justify='around'>
                        收起 <Icon type='up'/>
                    </Flex>
                </Flex>
            </div>
        ) : (
            <Flex justify='around' style={{marginTop: 40}} onClick={this.isShow}>
                <Flex className={styles.button1} justify='around'>
                    展示完整优惠券信息 <Icon type='down'/>
                </Flex>
            </Flex>
        )
        return (
            <div className={styles.successPage}>
                <div className={styles.infoBox}>
                    <Flex justify='around'>
                        <div className={styles.success}>
                            <img src=""/>
                            核销成功
                        </div>
                    </Flex>
                    <Flex justify='around'>
                        {/* <div> */}
                            <img src="" className={styles.user_img}/>
                            <span className={styles.name}>名字</span>
                            <span className={styles.number}>券码：</span>
                        {/* </div> */}
                    </Flex>
                </div>
                <WingBlank>
                    <Flex justify='around'>
                        <Flex className={styles.coupon}>
                            <Flex className={styles.coupon_left}>
                                <img src={''}/>
                            </Flex>
                            <Flex className={styles.coupon_right}>
                                <div>
                                    <p className={styles.store_name}>洛西路店</p>
                                    <p className={styles.gift_name}>双服套装</p>
                                    <p className={styles.youxiao_time}>2019.01.01-2019.02.02</p>
                                    <p className={styles.use_time}>使用时间：2019.02.01</p>
                                </div>
                            </Flex>
                        </Flex>
                    </Flex>
                    {info}

                        {/* 订单信息 */}
                        <Flex className={styles.titles} style={{marginTop: 90}}>
                            <div className={styles.gang}>{null}</div>
                            订单信息
                        </Flex>
                        <Flex className={styles.infos} style={{marginTop: 44, marginBottom: 52}}>
                            <div className={styles.title_name}>订单号：</div>
                            412457836915644161613   
                        </Flex>
                        <Flex className={styles.infos} style={{marginBottom:26}}>
                            <div className={styles.title_name}>购买时间：</div>
                            2018-10-14 18:00   
                        </Flex>
                        <Flex className={styles.infos}>
                            <div className={styles.title_name}>价格：</div>
                            ￥40.8   
                        </Flex>
                    
                </WingBlank>
            </div>
        )
        
    }
}
