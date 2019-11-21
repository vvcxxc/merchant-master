/**title: 个人中心 */
import React, { Component } from 'react';
// import { Flex, WingBlank, Toast } from 'antd-mobile';
import styles from './index.less';
// import { connect } from 'dva';
// import { routerRedux } from 'dva/router';
// import request from '@/services/request';
import router from 'umi/router';
// import ShareThree from './components/share_three/index'
import Propmpt from './prompt_box'

export default class MyIndex extends Component {
  state = {
    title: [
      {
        name: '平台余额',
        pice: '50.00',
        des: '结算到商家平台账户内, 需要手动进行提现',
        left: -14.5,
        go_right: 15.2,
        show:false
      },
      {
        name: '商家微信',
        pice: '50.00',
        des: '结算到商家开通微信商户账户里。',
        left: -23, go_right: 23.8,
        show:false
      },
      {
        name: '商家支付宝',
        pice: '50.00',
        des: '结算到商家开通支付宝商户账户里。',
        left: -43,
        go_right: 44,
        show: false
      },
    ],
    select: 0,
    list: [
      { order: '6908913456056', pic: '0.56', time: '2019/11/07', type: '购买优惠券' },
      { order: '6908913456056', pic: '0.56', time: '2019/11/07', type: '购买优惠券' },
      { order: '6908913456056', pic: '0.56', time: '2019/11/07', type: '购买优惠券' }
    ]
  }

  userSelect = (index: any) => {
    this.setState({ select: index })
  }

  getNewTitle = (_:any) => {
    return this.state.title.map((item: any, index: number) => {
      if ( _ !== index) item.show = false
      return item
    })
  }
  allowShow = (_: number) => {
    let title = this.getNewTitle(_)
    title[_].show = !title[_].show
    this.setState({
      title
    })

  }

  onclosePrompt = (time?:any) => {
    let title = this.state.title.map((item: any,index:number) => {
      item.show = false
      return item
    })
    this.setState({
      title
    })
    
  }

  // 跳转详情
  routerDetails = () => {
    // router.push({ pathname: './finance/prompt_box'})
  }
  render() {
    const { title, select, list } = this.state
    return (
      <div className={styles.my_dynamic} onClick={this.onclosePrompt}>
        <div className={styles.dynamic}>
          <div className={styles.time}>时间</div>
          <div className={styles.deal}>
            <div><span>交易笔数</span><span>100056</span></div>
          </div>
        </div>

        <div className={styles.userSelect}>
          {
            title && title.map((item: any, index: number) => {
              return <div key={index} >
                <div className={styles.balance} >
                  <span onClick={this.userSelect.bind(this, index)}>{item.name}</span>
                  <Propmpt
                    left={item.left}
                    value={item.des}
                    go_right={item.go_right}
                    index={index}
                    show={item.show}       
                    onClcik={this.allowShow.bind(this)}
                 />
              
                </div>
                <div className={styles.pice} onClick={this.userSelect.bind(this, index)}
                  style={{ borderBottom: select == index ? '3px solid rgba(71,129,254,1)' : '' }}>
                ￥{item.pice}
                </div>
              </div>
            })
          }
        </div>

        {
          list && list.map((item: any, index: number) => {
            return <div className={styles.list_data} key={index} onClick={this.routerDetails}>
              <div className={styles.list_data_left}>
                <img src={require('../../assets/red_query.png')} alt="" />
              </div>
              <div className={styles.list_data_right}>
                <div className={styles.order}><span>{item.order}</span> <span>{item.pic}</span></div>
                <div className={styles.order_time}><span>{item.time}</span> <span>{item.type}</span></div>
                <div className={styles.border_one}></div>
              </div>
            </div>
          })
        }
        
      </div>
    )
  }
}
