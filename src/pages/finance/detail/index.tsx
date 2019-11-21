import React, { Component } from 'react'
import styles from './index.less'


export default class Details extends Component {
  state = {
    data: [
      { order: '交易单号', value: '6908913456056' },
      { order: '交易时间', value: '2019/11/07   14:25:16' },
      { order: '交易类型', value: '二维码收款' },
      { order: '支付类型', value: '微信' },
    ],
    data1: [
      { order: '支付用户', value: '13456056716' },
      { order: '订单金额', value: '30' },
      {
        order: '优惠总金额', value: '-10.00',
        children: [
          { order: '5555', value: '-6610.6666600' },
          { order: '6666666', value: '-16660.00' }
        ]
      },
      { order: '满30减10', value: '-10.00' },
      { order: '满30减10', value: '-10.00' },
      { order: '实付金额', value: '30' },
      { order: '交易单号', value: '6908913456056' },

    ]
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
          <div className={styles.amounts}> +100056</div>
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