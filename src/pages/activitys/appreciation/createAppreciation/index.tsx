/**
 * 添加增值活动
 */
import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, DatePicker, List, InputItem, Icon, Toast } from 'antd-mobile';
import ChooseGift from '../../components/choosegift/';
import PayMent from '../../components/payment';
import moment from 'moment'
import request from '@/services/request'
import router from 'umi/router';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

export default class createAppreciation extends Component {
  state = {
    start_date: now,
    end_date: now,
    is_show: false,
    /**礼品id */
    gift_id: '',
    /**礼品图片 */
    gift_pic: '',
    /**起始值 */
    start_price: '',
    /**封顶值 */
    end_price: '',
    /**助力人数 */
    appreciation_number_sum: '',
    /**有效期 */
    validity: '',
    /**购买价格 */
    pay_money: '',
    /**发放数量 */
    total_num: '',
    /**使用门槛 */
    total_fee: '',
    /**邮费由谁付 */
    mail_mode: '1',
    /**存在礼品？ */
    is_gift: false,
    /**去支付？ */
    is_pay: false,
    /**提交后返回的信息 */
    pay_list: {}
  };
  /**改变值 */
  handleStartPri = (e: any) => {
    this.setState({start_price: e})
  }
  handleEndPri = (e: any) => {
    this.setState({end_price: e})
  }
  handlePeopleNum = (e: any) => {
    this.setState({appreciation_number_sum: e})
  }
  handleValidity = (e: any) => {
    if(e.length > 3){
      this.setState({validity: this.state.validity})
    }else {
      this.setState({validity: e})
    }

  }
  handlePayMoney = (e: any) => {
    this.setState({pay_money: e})
  }
  handleTotalNum = (e: any) => {
    this.setState({total_num: e})
  }
  handleTotalFee = (e: any) => {
    if(e.length > 4){
      this.setState({total_fee: this.state.total_fee})
    }else {
      this.setState({total_fee: e})
    }
  }
  startChange = (value: any) => {
    this.setState({start_date: value})
  }
  endChange = (value: any) => {
    this.setState({end_date: value})
  }
  changeGift = (id: string, is_show: boolean, gift_pic: string) =>{
    if(id){
      this.setState({is_gift: true})
    }else{
      this.setState({is_gift: false})
    }
    this.setState({
      gift_id: id,
      is_show,
      gift_pic
    })
  }
  toGift = () => {
    this.setState({
      is_show: true
    })
  }

  /**选择支付方式 */
  chooseMailMode = (type: string) =>{
    this.setState({mail_mode: type})
  }


  /**提交 */
  submit = () => {
    const { start_price, end_price, appreciation_number_sum, validity, pay_money, total_num, total_fee, start_date, end_date, gift_id, mail_mode, gift_pic } = this.state
    let activity_begin_time = moment(start_date).format('X');
    let activity_end_tine = moment(end_date).format('X');
    request({
      url: 'api/merchant/youhui/addYouhuiAppreciation',
      method: 'post',
      data: {
        total_num,
        pay_money,
        validity,
        init_money: start_price,
        return_money: end_price,
        activity_begin_time,
        activity_end_tine,
        total_fee,
        gift_id,
        mail_mode,
        gift_pic,
        appreciation_number_sum
      }
    }).then(res => {
      let {data, code, message} = res;
      if(code == 200){
        if (data.order_sn){
          this.setState ({
            pay_list: data,
            is_pay: true
          })
        }else{
          Toast.success(message,2,()=>{
            router.push('/activitys/appreciation');
          })
        }
      }else {
        Toast.fail(datmessagea)
      }


    })
  }

  render (){
    const chooseGift = this.state.is_show == true ? (
      <ChooseGift onChange={this.changeGift} id={this.state.gift_id} money={this.state.pay_money}/>
    ) : (
      ''
    )

    const chooseMail = this.state.mail_mode == '1' ? (
      <Flex className={styles.choose}>
        <div style={{marginRight: 17}} onClick={this.chooseMailMode.bind(this,'1')}><img src={require('./image/choose.png')}/>联盟店支付</div>
        <div onClick={this.chooseMailMode.bind(this,'2')}><img src={require('./image/no_choose.png')}/>用户支付</div>
      </Flex>
    ) : (
      <Flex className={styles.choose}>
        <div style={{marginRight: 17}} onClick={this.chooseMailMode.bind(this,'1')}><img src={require('./image/no_choose.png')}/>联盟店支付</div>
        <div onClick={this.chooseMailMode.bind(this,'2')}><img src={require('./image/choose.png')}/>用户支付</div>
      </Flex>
    )

    const Gift = this.state.is_gift == true ? (
      <div>
        <Flex className={styles.giftBox}>
          <div>配送方式</div>
          <Flex className={styles.choose}>
            {/* <div style={{marginRight: 17}}><img src={require('./image/choose.png')}/>到店自取</div> */}
            <div><img src={require('./image/choose.png')}/>邮寄</div>
          </Flex>
        </Flex>
        {/* <Flex className={styles.giftBox}><div>自选地址</div><Flex className={styles.choose}><div style={{marginRight: 17}}><img src={require('./image/choose.png')}/>使用店铺地址</div><div className={styles.address}>自定义</div></Flex></Flex> */}
        <Flex className={styles.giftBox}>
          <div>选择邮费</div>
          {chooseMail}
        </Flex>
        <div style={{width: '100%', height: '90px'}}>{''}</div>
      </div>
    ) : (
      ''
    );
    const Pay = this.state.is_pay == true ? (
      <PayMent list={this.state.pay_list} type={'appreciation'}/>
    ) : (
      ''
    )



    const { start_price, end_price, appreciation_number_sum, validity, pay_money, total_num, total_fee } = this.state
    return (
      <div style={{width: '100%', height: 'auto', minHeight: '100%', background: '#fff'}}>
        <WingBlank>
          <Flex className={styles.title}><div>活动设置</div></Flex>
          <List className={styles.input_Box}>
            <Flex className={styles.pickerDate}>
              <DatePicker
                mode="date"
                title="起始日期"
                extra="Optional"
                value={this.state.start_date}
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
                value={this.state.end_date}
                onChange={this.endChange}
              >
                <List.Item arrow="horizontal">结束日期</List.Item>
              </DatePicker>
            </Flex>
            <InputItem type={'digit'} className={styles.textShort} onChange={this.handleStartPri} value={start_price} placeholder='请输入 '>
              起始值<span className={styles.right_text}>元</span>
            </InputItem>
            <InputItem type={'digit'} className={styles.textShort} onChange={this.handleEndPri} value={end_price} placeholder='请输入 '>
              封顶值<span className={styles.right_text}>元</span>
            </InputItem>
            <InputItem type={'digit'} className={styles.textShort} onChange={this.handlePeopleNum} value={appreciation_number_sum} placeholder='请输入 '>
              助力人数<span className={styles.right_text}>人</span>
            </InputItem>
            <InputItem type={'digit'} className={styles.textShort} onChange={this.handlePayMoney} value={pay_money} placeholder='请输入 '>
              购买价格<span className={styles.right_text}>元</span>
            </InputItem>
            <InputItem type={'number'} className={styles.textLong_door} onChange={this.handleTotalFee} value={total_fee}>
              使用门槛<span className={styles.left_text_door}>满</span><span className={styles.right_text}>元可用</span>
            </InputItem>
            <InputItem type={'number'} className={styles.textLong} onChange={this.handleValidity} value={validity}>
              有效期
                <span className={styles.left_text}>领券日起</span>
                <span className={styles.right_text}>天内可用</span>
            </InputItem>
            <InputItem type={'digit'} className={styles.textShort} onChange={this.handleTotalNum} value={total_num}>
              发放数量<span className={styles.right_text}>张</span>
            </InputItem>
          </List>
          <Flex className={styles.title}><div>礼品设置</div></Flex>
          <div className={styles.gift_Box}>
            <Flex className={styles.giftBox} onClick={this.toGift}><div>选择礼品</div><div><Icon type="right"  color='#999' className={styles.icon_right}/></div>
            </Flex>
            {Gift}
            <div style={{width: '100%', height: '.88rem'}}>{''}</div>
          </div>
        </WingBlank>
        <Flex>
          <div className={styles.button} onClick={this.submit}>确认发布</div>
        </Flex>
        {chooseGift}
        {Pay}
      </div>

    )
  }
}
