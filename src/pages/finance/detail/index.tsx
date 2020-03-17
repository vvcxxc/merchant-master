/**title: 交易明细 */
import React, { Component } from 'react'
import styles from './index.less'
import request from '@/services/request';


export default class Details extends Component {
  state = {
    data: [],
    data1: [],
    store_amount: '',
    youhui: {}
  }


  componentDidMount() {
    request({
      url: 'v3/offline_order/info',
      method: 'get',
      params: {
        id: this.props.location.query.id
      }
    }).then((res) => {
      let sum = 0;
      if (res.data.youhui_info.length > 0) {
        for (let i in res.data.youhui_info) { sum = sum + Number(res.data.youhui_info[i].youhui_money) }
      }
      let data = [
        { order: '交易单号', value: res.data.order_sn },
        { order: '交易时间', value: res.data.create_time },
        { order: '交易类型', value: res.data.order_type_name },
        { order: '支付类型', value: res.data.pay_type_name },
      ]
      let data1 = [
        { order: '支付用户', value: res.data.user_name },
        { order: '订单金额', value: res.data.amount },
        {
          order: '优惠总金额', value: '-' + String(sum.toFixed(2)),
          children: res.data.youhui_info.length > 0 ? res.data.youhui_info : undefined
        },
        { order: '交易手续费', value: '-' + res.data.service_amount },
        { order: '实收金额', value: '+' + res.data.store_amount },
      ]
      let youhui = res.data.youhui_name && res.data.youhui_money ? [
        { order: res.data.youhui_name, value: res.data.youhui_money }
      ] : undefined;
      this.setState({ data: data, data1: data1, store_amount: res.data.store_amount, youhui: youhui })
    })

  }
  onclickList = (index: number) => {
    let data: any = this.state.data1
    data[index].show = data[index].show ? false : true
    this.setState({ data1: data })

  }


  render() {
    const { data, data1 } = this.state
    return (
      <div className={styles.trading_particulars}>
        <div className={styles.box}>
          <div className={styles.amounts}> +{this.state.store_amount}</div>
          <div className={styles.amounts_result}>交易成功</div>
          <ul> {
            data.map((item: any, index: number) => {
              return <li className={index == 3 ? styles.border_bottom : ''} key={index}>
                <span>{item.order}</span>
                <span>{item.value}</span>
              </li>
            })
          }
          </ul>
          <div className={styles.my_flex}>
            <div className={styles.my_flex_title}>交易详情</div>
            <ul>{
              data1.map((item: any, index: number) => {
                return !item.children ? <li key={index}>
                  <span>{item.order}</span>
                  <span>{item.value}</span>
                </li> : <li key={index} style={{ display: 'block' }} id={styles.telescopic_box}>
                    <div onClick={this.onclickList.bind(this, index)}>
                      <span>{item.order}</span>
                      <span>{item.value}
                        <img src={require('../../../assets/right_back.png')} alt="" />
                      </span>
                    </div>
                    {
                      item.show ? <ul>
                        {
                          item.children.map((item2: any, index: number) => {
                            return <li key={index}>
                              <span>{item2.youhui_name}</span>
                              <span>{'-' + String(Number(item2.youhui_money).toFixed(2))}</span>
                            </li>
                          })
                        }
                      </ul> : null
                    }

                  </li>
              })
            }
            </ul>
          </div>
        </div>

      </div>
    )
  }
}
