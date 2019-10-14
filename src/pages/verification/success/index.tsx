/**title: 核销成功 */
import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, Icon } from 'antd-mobile';
import request from '@/services/request';
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
          money: '',
          create_time: '',
          coupons_name: '',
          user_images: '',
          coupons_images: '',
          user_name: ''
        },
      }
    };
    componentDidMount (){
      request({
        url: 'api/merchant/youhui/cancel_succeed',
        method: 'get',
        params: {
          youhu_log_id: this.props.location.query.youhu_log_id
        }
      }).then(res => {
        this.setState({
          res
        })
      })
    }

    isShow = () => {
        this.setState({is_show: !this.state.is_show})
    }

    render (){
      const {res} = this.state;
      let data = res.data;
      const description = data.description ? data.description.map((item,idx)=> {
        return (
          <p key={idx}>· {item}</p>
        )
      }) : null;
      const info = this.state.is_show == true ? (
          <div className={styles.box2} style={{marginTop: 40}}>
              <p>
                  <span>使用有效期：</span>
                  {data.begin_time}-{data.end_time}
              </p>

              {
                data.description ? (
                  <div>
                    <p><span>使用规则：</span></p>
                    {/* <p>· 123</p> */}
                    {description}
                  </div>
                ) : null
              }

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
                  <Flex justify='around' className={styles.infos}>
                      <div className={styles.user_info}>
                          <img src={data.user_images} className={styles.user_img}/>
                          <span className={styles.name}>{data.user_name}</span>
                          <span className={styles.number}>券码：{data.youhui_sn}</span>
                      </div>
                  </Flex>
              </div>
              <WingBlank>
                  <Flex style={{padding: 10}}>
                      <Flex className={styles.coupon}>
                          <Flex className={styles.coupon_left}>
                              <img src={data.coupons_images}/>
                          </Flex>
                          <Flex className={styles.coupon_right}>
                              <div>
                                  <p className={styles.store_name}>{null}</p>
                                  <p className={styles.gift_name}>{data.coupons_name}</p>
                                  <p className={styles.youxiao_time}>{data.begin_time}-{data.end_time}</p>
                                  <p className={styles.use_time}>使用时间：{data.confirm_time}</p>
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
                      <Flex className={styles.infos} style={{marginTop: 44, marginBottom: 26}}>
                          <div className={styles.title_name}>订单号：</div>
                          {data.channel_order_sn}
                      </Flex>
                      <Flex className={styles.infos} style={{marginBottom:26}}>
                          <div className={styles.title_name}>购买时间：</div>
                          {data.create_time}
                      </Flex>
                      <Flex className={styles.infos}>
                          <div className={styles.title_name}>价格：</div>
                          ￥{data.money}
                      </Flex>

              </WingBlank>
          </div>
      )

    }
}
