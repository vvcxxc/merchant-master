import React, {Component} from 'react';
import styles from './index.less';
import { Flex, WingBlank, Steps, Toast, Button } from 'antd-mobile';
import request from '@/services/request';
import router from 'umi/router';
import Cookie from 'js-cookie'
const Step = Steps.Step;
export default class Review extends Component {
  state = {
    info: {
      payment_status: {
        payment_open_status: 0,
        submit_status: 1,
        refuse_reason: null
      },
      apply_store_status: {
        store_open_status: 1,
        refuse_reason: null
      }
    },
    store_status: 'finish',
    qua_status: 'finish',
    qua_reason: '',
    store_reason: '',
    status: '',
    reason: '',
    is_show: false
  }
  componentDidMount (){
    request({
      url: 'v3/payment_profiles/payment_status',
      method: 'get'
    }).then(res => {
      let {code, data} = res;
      if(code == 200){
        let store_status = '';
        let qua_status = '';
        let store_reason = '';
        let qua_reason = '';
        let reason = '';
        let status = '';


        let {store_open_status} = data.apply_store_status;
        let {payment_open_status} = data.payment_status;

        // 审核状态的判断
        if (store_open_status == 2){
          reason = data.apply_store_status.refuse_reason
          status = '审核失败'
        }else{
          if (payment_open_status == 2){
            reason = data.payment_status.refuse_reason
            status = '审核失败'
          }else{
            if (payment_open_status == 0){
              reason = '您的资质未提交，请点击“继续入驻”去提交资质。'
              status = '资质未提交'
            }else{
              reason = ''
              status = '审核中'
            }
          }
        }



        // 店铺信息的判断
        if (store_open_status == 1) {
          store_status = 'wait';
          store_reason = '审核中'
        }else if(store_open_status == 2) {
          store_status = 'error'
          store_reason = '审核失败'
        }else if (store_open_status == 3){
          store_status = 'finish',
          store_reason = '已完成'
        }

        // 资质的判断
        if (payment_open_status == 1) {
          qua_status = 'wait';
          qua_reason = '审核中'
        }else if(payment_open_status == 2) {
          qua_status = 'error'
          qua_status = '审核失败'
        }else if (payment_open_status == 3){
          qua_status = 'finish'
          qua_reason = '已完成'
        }else if (payment_open_status == 0){
          qua_status = 'wait';
          qua_reason = '资质未提交'
        }


        // 按钮判断
        if(payment_open_status == 2 || payment_open_status == 0 || store_open_status == 2){
          this.setState({is_show: true})
        }




        this.setState({
          info: data,
          store_status,
          qua_status,
          store_reason,
          qua_reason,
          status,
          reason
        });


      }else{
        Toast.fail('获取信息失败')
      }
    })
  }


  submit = () => {
    let { info } = this.state;
    if (info.apply_store_status.store_open_status == 2){
      router.push('/createStore')
    }else{
      router.push('/submitQua')
    }
  }

  // 退出登录
  out = () => {
    router.push('login');
    Cookie.remove;
    localStorage.clear()
  }


  render (){
    const {qua_status, store_status, status, reason, store_reason, qua_reason } = this.state;
    const button = this.state.is_show == true ? (
      <Button type='primary' style={{marginTop: 152}} onClick={this.submit}>继续入驻</Button>
    ) : null;

    return (
      <div className={styles.reviewPage}>
        <WingBlank className={styles.box}>
          <Flex className={styles.title}>
            <div className={styles.notice}>
              <img src={require('./notice.png')}/>
            </div>
            <div className={styles.res}>
              <p className={styles.res_title}>{status}</p>
              <p>{reason}</p>
            </div>
          </Flex>
          <Flex className={styles.steps}>
            <Steps current={3}>
              <Step title="注册账号" description="已完成" />
              <Step title="创建门店" description={store_reason} status={store_status} />
              <Step title="提交资质" description={qua_reason} status={qua_status} />
            </Steps>
          </Flex>
          {button}
          <p className={styles.out} onClick={this.out}>
            退出登录，切换店铺>
          </p>
        </WingBlank>
      </div>
    )
  }
}
