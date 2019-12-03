import React, { Component } from 'react'
import styles from './index.less'
import request from '@/services/request';


export default class Details extends Component {
  state = {
    data: [],
    data1: [],
    store_amount: ''
  }


  componentDidMount() {
    request({
      url: 'v3/offline_order/info',
      method: 'get',
      params: {
        id: this.props.location.query.id
      }
    }).then((res) => {
      console.log(res)
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
          order: '优惠总金额', value: res.data.use_score,
          // children: [
          //   { order: '满30减10', value: '-10.00' },
          //   { order: '满30减10', value: '-10.00' }
          // ]
        },
        { order: '实付金额', value: res.data.store_amount },

      ]
      this.setState({ data: data, data1: data1, store_amount: res.data.store_amount })
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
                              <span>{item2.order}</span>
                              <span>{item2.value}</span>
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