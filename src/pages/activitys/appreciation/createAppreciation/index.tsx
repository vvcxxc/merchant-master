/**title: 添加增值活动 */
import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, DatePicker, List, InputItem, Icon, Toast } from 'antd-mobile';
import ChooseGift from '../../components/choosegift/';
import PayMent from '../../components/payment';
import moment from 'moment'
import request from '@/services/request'
import router from 'umi/router';
import { connect } from 'dva';
import ReactDOM from 'react-dom';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

export default connect(({ activity }: any) => activity)(
  class createAppreciation extends Component<any> {
    state = {
      /**存在礼品？ */
      is_gift: false,
      /**去支付？ */
      is_pay: false,
    };
    componentDidMount() {
      if (this.props.Appreciation.gift_id) {
        this.setState({ is_gift: true })
      }
      if (!this.props.Appreciation.start_date) {
        this.props.dispatch({
          type: 'activity/setAppreciation',
          payload: {
            start_date: now
          }
        })
      }
      if (!this.props.Appreciation.end_date) {
        this.props.dispatch({
          type: 'activity/setAppreciation',
          payload: {
            end_date: now
          }
        })
      }
    }

    /**改变值 */
    handleStartPri = (e: any) => {
      if (e.split(".")[1] == undefined || (e.split(".")[1].length <= 2 && e.split(".")[2] == undefined)) {
        this.props.dispatch({
          type: 'activity/setAppreciation',
          payload: {
            start_price: e
          }
        });
      }
    }
    handleEndPri = (e: any) => {
      if (e.split(".")[1] == undefined || (e.split(".")[1].length <= 2 && e.split(".")[2] == undefined)) {
        this.props.dispatch({
          type: 'activity/setAppreciation',
          payload: {
            end_price: e
          }
        });
      }
    }
    handlePeopleNum = (e: any) => {
      if (e.indexOf(".") == -1 && e.length <= 2) {
        this.props.dispatch({
          type: 'activity/setAppreciation',
          payload: {
            appreciation_number_sum: e
          }
        });
      }
    }
    handleValidity = (e: any) => {
      console.log(e)
      if (e.indexOf(".") == -1 && e.length <= 3) {
        this.props.dispatch({
          type: 'activity/setAppreciation',
          payload: {
            validity: e
          }
        });
      }
    }
    handlePayMoney = (e: any) => {
      if (e.split(".")[1] == undefined || (e.split(".")[1].length <= 2 && e.split(".")[2] == undefined)) {
        this.props.dispatch({
          type: 'activity/setAppreciation',
          payload: {
            pay_money: e,
            gift_id: '',
            gift_pic: ''
          }
        });
      }
    }
    handleTotalNum = (e: any) => {
      console.log(e)
      if (e.indexOf(".") == -1) {
        this.props.dispatch({
          type: 'activity/setAppreciation',
          payload: {
            total_num: e
          }
        });
      }
    }
    handleTotalFee = (e: any) => {
      if (e.split(".")[1] == undefined || (e.split(".")[1].length <= 2 && e.split(".")[2] == undefined)) {
        this.props.dispatch({
          type: 'activity/setAppreciation',
          payload: {
            total_fee: e
          }
        });
      }
    }
    startChange = (value: any) => {
      this.props.dispatch({
        type: 'activity/setAppreciation',
        payload: {
          start_date: value
        }
      });
    }
    endChange = (value: any) => {
      this.props.dispatch({
        type: 'activity/setAppreciation',
        payload: {
          end_date: value
        }
      });
    }

    toGift = () => {
      router.push({ pathname: '/activitys/choosegift', query: { type: 2 } })
    }

    /**选择支付方式 */
    chooseMailMode = (type: string) => {
      this.props.dispatch({
        type: 'activity/setAppreciation',
        payload: {
          mail_mode: type
        }
      });
    }


    /**提交 */
    submit = async () => {
      const { start_price, end_price, appreciation_number_sum, validity, pay_money, total_num, total_fee, start_date, end_date, gift_id, mail_mode, gift_pic, gift_name } = this.props.Appreciation

      // 日期验证
      let startDate = new Date(start_date).getTime();
      let endDate = new Date(end_date).getTime();

      //起始结束日期效验
      if (startDate > endDate) {
        Toast.fail('结束日期应大于起始日期');
        return;
      }
      if (startDate === endDate) {
        Toast.fail('活动时间不能同一天');
        return;
      }

      //起始封顶值效验
      if (end_price <= start_price) {
        Toast.fail('封顶值应大于起始值');
        return;
      }

      // 对数量的效验
      if (total_num) {
        if (total_num.substr(0, 1) < 1) {
          Toast.fail('数量首位不能为0');
          return 
        }
      }

      let activity_begin_time = moment(start_date).format('X');
      let activity_end_tine = moment(end_date).format('X');
      if (start_price && end_price && appreciation_number_sum && validity && pay_money && total_num && total_fee && start_date && end_date && mail_mode) {
        Toast.loading('');

        let res = await request({
          url: 'api/merchant/youhui/addYouhuiAppreciation',
          method: 'post',
          data: {
            total_num:total_num*1,
            pay_money:pay_money*1,
            validity:validity*1,
            init_money: start_price*1,
            return_money: end_price*1,
            activity_begin_time:Number(activity_begin_time),
            activity_end_tine:Number(activity_end_tine),
            total_fee:total_fee*1,
            gift_id,
            mail_mode,
            gift_pic,
            gift_name,
            appreciation_number_sum:appreciation_number_sum*1
          }
        });
        let { data, message } = res;
        if (data.order_sn) {
          // 支付去
          this.props.dispatch({
            type: 'activity/setAppreciation',
            payload: {
              list: data
            }
          });
          router.push({ pathname: '/activitys/pay', query: { type: 2 } })
          Toast.hide();
        } else {
          Toast.success(message, 2, () => {
            this.props.dispatch({
              type: 'activity/Clean',
            })
            router.push('/activitys/appreciation');
            Toast.hide();
          })
        }
      } else {
        Toast.fail('请填写完整', 2)
      }

    }

    handleCheckAppreciationNumber(v: any) {
      // console.log(v,'v')
      //console.log(this.refs.appreciationNumber)
      //console.log(ReactDOM.findDOMNode(this.refs.appreciationNumber))
      // console.log(document.getElementsByClassName('fake-input'))
      let DomArr = document.getElementsByClassName('fake-input');
      v = Number(v);
      if (v < 2 || v > 18) {
        for (var i = 0; i < DomArr.length; i++) {
          DomArr[i].classList.remove('focus')
        }
        Toast.fail('助力人数应在2至18之间', 2, () => {
          // this.refs.appreciationNumber.clearInput();
          this.refs.appreciationNumber.focus();
        });
      }
    }

    render() {
      const chooseMail = this.props.Appreciation.mail_mode == '1' ? (
        <Flex className={styles.choose}>
          <div style={{ marginRight: 17 }} onClick={this.chooseMailMode.bind(this, '1')}><img src={require('./image/choose.png')} />联盟店支付</div>
          <div onClick={this.chooseMailMode.bind(this, '2')}><img src={require('./image/no_choose.png')} />用户支付</div>
        </Flex>
      ) : (
          <Flex className={styles.choose}>
            <div style={{ marginRight: 17 }} onClick={this.chooseMailMode.bind(this, '1')}><img src={require('./image/no_choose.png')} />联盟店支付</div>
            <div onClick={this.chooseMailMode.bind(this, '2')}><img src={require('./image/choose.png')} />用户支付</div>
          </Flex>
        )

      const Gift = this.state.is_gift == true ? (
        <div>
          <Flex className={styles.giftBox}>
            <div>配送方式</div>
            <Flex className={styles.choose}>
              {/* <div style={{marginRight: 17}}><img src={require('./image/choose.png')}/>到店自取</div> */}
              <div><img src={require('./image/choose.png')} />邮寄</div>
            </Flex>
          </Flex>
          {/* <Flex className={styles.giftBox}><div>自选地址</div><Flex className={styles.choose}><div style={{marginRight: 17}}><img src={require('./image/choose.png')}/>使用店铺地址</div><div className={styles.address}>自定义</div></Flex></Flex> */}
          <Flex className={styles.giftBox}>
            <div>选择邮费</div>
            {chooseMail}
          </Flex>
          <div style={{ width: '100%', height: '90px' }}>{''}</div>
        </div>
      ) : (
          ''
        );

      const { start_price, end_price, appreciation_number_sum, validity, pay_money, total_num, total_fee, display, start_date, end_date } = this.props.Appreciation
      
      return (
        <div style={{ width: '100%', height: 'auto', minHeight: '100%', background: '#fff' }}>
          <div style={{ display }}>
            <WingBlank>
              <Flex className={styles.title}><div>活动设置</div></Flex>
              <List className={styles.input_Box}>
                <Flex className={styles.pickerDate}>
                  <DatePicker
                    mode="date"
                    title="起始日期"
                    extra="Optional"
                    value={start_date}
                    onChange={this.startChange}
                  >
                    <List.Item arrow="horizontal">起始日期</List.Item>
                  </DatePicker>
                </Flex>
                <Flex className={styles.pickerDate}>
                  <DatePicker
                    mode="date"
                    title="结束日期"
                    extra="Optional"
                    value={end_date}
                    onChange={this.endChange}
                  >
                    <List.Item arrow="horizontal">结束日期</List.Item>
                  </DatePicker>
                </Flex>
                <InputItem type={'money'} className={styles.textShort} onChange={this.handleStartPri} value={start_price} placeholder='请输入 ' extra='元' clear>
                  起始值
              </InputItem>
                <InputItem type={'money'} className={styles.textShort} onChange={this.handleEndPri} value={end_price} placeholder='请输入 ' extra='元' clear>
                  封顶值
              </InputItem>
                <InputItem type={'money'} className={styles.textShort} onChange={this.handlePeopleNum} value={appreciation_number_sum} placeholder='请输入 ' extra='人' ref="appreciationNumber" onVirtualKeyboardConfirm={this.handleCheckAppreciationNumber.bind(this)} onBlur={this.handleCheckAppreciationNumber.bind(this)} clear>
                  助力人数
              </InputItem>
                <InputItem type={'money'} className={styles.textShort} onChange={this.handlePayMoney} value={pay_money} placeholder='请输入 ' extra='元' clear>
                  购买价格
              </InputItem>
                <InputItem type={'money'} className={styles.textLong_door} onChange={this.handleTotalFee} value={total_fee} extra='元可用' clear>
                  使用门槛<span className={styles.left_text_door}>满</span>
                </InputItem>
                <InputItem type={'money'} className={styles.textLong} onChange={this.handleValidity} value={validity} extra='天内可用' clear>
                  有效期
                  <span className={styles.left_text}>领券日起</span>
                </InputItem>
                <InputItem type={'money'} className={styles.textShort} onChange={this.handleTotalNum} value={total_num} extra='张' clear>
                  发放数量
              </InputItem>
              </List>
              <Flex className={styles.title}><div>礼品设置</div></Flex>
              <div className={styles.gift_Box}>
                <Flex className={styles.giftBox} onClick={this.toGift}><div>选择礼品</div><div><Icon type="right" color='#999' className={styles.icon_right} /></div>
                </Flex>
                {Gift}
                <div style={{ width: '100%', height: '.88rem' }}>{''}</div>
              </div>
            </WingBlank>

            <Flex>
              {/* <div className={styles.button1} onClick={()=>{router.push('/activitys/appreciation/createAppreciation/appreciation')}}>预览</div> */}
              <div className={styles.button2} onClick={this.submit} style={{ width: "100%", left: "0" }}>确认发布</div>
            </Flex>
          </div>
        </div>

      )
    }
  })
