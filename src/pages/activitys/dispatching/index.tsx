import React, { Component } from 'react';
import styles from './index.less'
import { Flex, InputItem, Toast } from 'antd-mobile'
import SelectBox from './components/slect-time'
import router from 'umi/router';
import request from '@/services/request'

export default class Dispatching extends Component {
  state = {
    delivery_status: 0,
    delivery_service_money: '',
    delivery_phone: undefined,
    delivery_radius_m: '',
    delivery_end_time: '',
    delivery_start_time: '',
    show_time: false,
    show_mater: false
  }
  componentDidMount() {
    request({
      url: 'v3/merchant/delivery',
      method: 'GET'
    }).then((res: any) => {
      let { delivery_status, delivery_service_money, delivery_phone, delivery_radius_m, delivery_end_time, delivery_start_time } = res.data
      console.log(res)
      this.setState({ delivery_status, delivery_service_money, delivery_phone, delivery_radius_m, delivery_end_time, delivery_start_time })
    }).catch(err => {

    })
  }
  checkoutStatus = () => {
    if (this.state.delivery_status) {
      this.setState({ delivery_status: 0 })
    } else {
      this.setState({ delivery_status: 1 })
    }
  }

  inputChange = (type: string) => (e) => {
    if (type == 'delivery_service_money') {
      if (e <= 99999) {
        this.setState({ [type]: e })
      }
    } else if (type == 'delivery_phone') {
      this.setState({ [type]: e })
    }
  }

  handleClick = (type: number) => {
    if (type == 1) {
      this.setState({ show_time: true })
    } else {
      this.setState({ show_mater: true })
    }
  }

  handleChange = (data: any) => {
    if (data && data.mater) {
      this.setState({ delivery_radius_m: data.mater, show_mater: false })
    } else if (data && data.start_time) {
      this.setState({ delivery_start_time: data.start_time, delivery_end_time: data.end_time, show_time: false })
    } else {
      this.setState({ show_mater: false, show_time: false })
    }
  }

  hanleSumbit = (type: number, e: any) => {
    console.log(this.state)
    request({
      url: 'v3/merchant/delivery',
      method: 'POST',
      data: {
        delivery_start_time: this.state.delivery_start_time.replace('：', ':'),
        delivery_end_time: this.state.delivery_end_time.replace('：', ':'),
        delivery_radius_m: this.state.delivery_radius_m.split('.0km')[0],
        delivery_phone: this.state.delivery_phone,
        delivery_service_money: this.state.delivery_service_money,
        delivery_status: this.state.delivery_status,
      }
    }).then((res: any) => {
      if (res.code == 200) {
        Toast.success('修改成功', 1500);
        setTimeout(() => { router.goBack(); }, 1500)
      } else {
        Toast.fail(res.message, 1500);
      }
    }).catch(err => {
      Toast.fail('修改失败', 1500);
    })
  }

  render() {
    return (
      <div className={styles.dispatching_page}>
        <Flex className={styles.line_layout} justify='between' align='center'>
          <div className={styles.line_label}>配送服务</div>
          <div className={!this.state.delivery_status ? styles.line_checkout : styles.line_checkout_right} onClick={this.checkoutStatus}>
            <div className={!this.state.delivery_status ? styles.checkout_icon : styles.checkout_icon_right}></div>
          </div>
        </Flex>
        <Flex className={styles.line_layout} justify='between' align='center'>
          <div className={styles.line_label}>配送时间段</div>
          <div className={styles.line_text} onClick={this.handleClick.bind(this, 1)}>{this.state.delivery_start_time ? this.state.delivery_start_time + '-' + this.state.delivery_end_time : '请选择'} <img className={styles.line_time} src={require('@/assets/time.png')} /></div>
        </Flex>
        <Flex className={styles.line_layout} justify='between' align='center'>
          <div className={styles.line_label}>选择配送范围</div>
          <div className={styles.line_text} onClick={this.handleClick.bind(this, 0)}>{this.state.delivery_radius_m ? this.state.delivery_radius_m : '请选择'} </div>
        </Flex>
        <Flex className={styles.line_layout} justify='between' align='center'>
          <div className={styles.line_label}>设置联系电话</div>
          <InputItem type='phone' placeholder='请输入手机号' onChange={this.inputChange('delivery_phone')} value={this.state.delivery_phone} />
        </Flex>
        <Flex className={styles.line_layout} justify='between' align='center'>
          <div className={styles.line_label}>配送金额设置</div>
          <InputItem type='number' extra='元' onChange={this.inputChange('delivery_service_money')} value={this.state.delivery_service_money} />
        </Flex>
        <div className={styles.tips_box}>
          <div className={styles.tips_title}>温馨提示</div>
          <p>1.添加配送服务，可在添加商品与活动时选择配送服务。</p>
          <p>2.此配送服务设置适用于店铺内所有商品。</p>
          <p>3.修改配送服务后，商品的配送服务也会跟着改变</p>
        </div>
        {
          this.state.show_mater ? <SelectBox type={0} onChange={this.handleChange} mater={this.state.delivery_radius_m} /> : null
        }
        {
          this.state.show_time ? <SelectBox type={1} onChange={this.handleChange} start_time={this.state.delivery_start_time} end_time={this.state.delivery_end_time} /> : null
        }
        {
          this.props.location.query.type == 1 ? <div className={styles.btn_box}>
            <div className={styles.btn_save} onClick={this.hanleSumbit.bind(this, 1)}>确认并使用</div>
          </div> : <div className={styles.btn_box_sumbit}>
              <div className={styles.btn_cancle} onClick={() => { router.goBack() }}>取消</div>
              <div className={styles.btn_sumbit} onClick={this.hanleSumbit.bind(this, 2)}>确认</div>
            </div>
        }
      </div>
    )
  }
}
