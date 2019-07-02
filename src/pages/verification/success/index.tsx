import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, Icon } from 'antd-mobile';

export default class Success extends Component {
    state = {
      is_show: false,
      res: {
        data: {
          youhui_sn: '',
          status: '',
          confirm_time: '',
          begin_time: '',
          end_time: '',
          description: [],
          channel_order_sn: '',
          pay_money: '',
          create_time: '',
          coupons_name: ''
        },
      }
    };
    componentDidMount (){
      // console.log(this.props.location.query.res);
      let res = JSON.parse(sessionStorage.getItem('verification') || '');
      // console.log(res);
      this.setState({
        res
      })
    }

    isShow = () => {
        this.setState({is_show: !this.state.is_show})
    }

    render (){
      const {res} = this.state;
      let data = res.data;
        const info = this.state.is_show == true ? (
            <div className={styles.box2} style={{marginTop: 40}}>
                <p>
                    <span>使用有效期：</span>
                    {data.begin_time}-{data.end_time}
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
                        <Flex className={styles.success}>
                            <img src={require('./success.png')}/>
                            核销成功
                        </Flex>
                    </Flex>
                    <Flex justify='around'>
                        {/* <div> */}
                            <img src="" className={styles.user_img}/>
                            <span className={styles.name}>{data.coupons_name}</span>
                            <span className={styles.number}>券码：{data.youhui_sn}</span>
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
                                    <p className={styles.store_name}>{null}</p>
                                    <p className={styles.gift_name}>{data.coupons_name}</p>
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
                            {data.channel_order_sn}
                        </Flex>
                        <Flex className={styles.infos} style={{marginBottom:26}}>
                            <div className={styles.title_name}>购买时间：</div>
                            {data.create_time}
                        </Flex>
                        <Flex className={styles.infos}>
                            <div className={styles.title_name}>价格：</div>
                            {data.pay_money}
                        </Flex>

                </WingBlank>
            </div>
        )

    }
}
