import React, { Component } from 'react'
import SelectTime from '@/components/select-time';
import router from 'umi/router';
import { connect } from 'dva';
import styles from './index.less'

interface Props {
  onChangeType: (data: boolean) => void
}
interface stateType {
  list: Array<any>,

}
// createCoupon
export default connect(({ participateActive }: any) => participateActive)(
  class InputBox extends Component<any> {
    state = {
      list: [

      ],
      /**显示选择时间 */
      showSelectTime: false,
      startTime: '',
      endTime: '',
      activeTime: '',//活动时间
      cardVoucherType: false,//卡券类型
      //现金券
      cash_denomination: '',//卡券面额
      cash_threshold: '',//使用门槛
      cash_validTime: '',
      cash_number: '',
      //商品券
      shop_name: '',
      shop_originalCost: '',//原价
      shop_validTime: '',//有效期
      shop_number: '',

      description: []//使用须知数据  已设置1条规则
    }

    componentDidMount() {
      console.log(this.props, 'props');
      this.setState({ ...this.props })
    }

    onclange = () => {
      document.documentElement.scrollTop = 0//已知问题，点击输入框之后，再让输入框失去焦点， 就会导致页面整体往上移动，不会还原
    }

    //打开时间选择
    handleShowSelectTime = () => {

      this.setState({ showSelectTime: true })
    };

    //关闭时间选择
    closeModal = () => this.setState({
      showSelectTime: false
    });

    handleSelectTime = (time: any) => {

      this.props.dispatch({
        type: 'participateActive/setParticipateActive',
        payload: {
          startTime: time.startTime,
          endTime: time.endTime,
          activeTime: time.startTime + '至' + time.endTime
        }
      });

      this.setState({ ...time, activeTime: time.startTime + '至' + time.endTime }, this.closeModal)

    };

    //卡券类型  
    inputCardVoucherType = (cardVoucherType: boolean) => {
      this.setState({ cardVoucherType })
      this.props.dispatch({
        type: 'participateActive/setParticipateActive',
        payload: {
          cardVoucherType
        }
      });
      this.props.onChangeType(cardVoucherType)

    }
    /* 
    现金券数据
    */
    //面额输入
    inputCashDenomination = (e: any) => {
      this.setState({
        cash_denomination: e.target.value
      })
      this.props.dispatch({
        type: 'participateActive/setParticipateActive',
        payload: {
          cash_denomination: e.target.value
        }
      });
    }

    //使用门槛输入
    inputCashThreshold = (e: any) => {
      this.setState({
        cash_threshold: e.target.value
      })
      this.props.dispatch({
        type: 'participateActive/setParticipateActive',
        payload: {
          cash_threshold: e.target.value
        }
      });
    }

    //卡券有效期输入
    inputCashValidTime = (e: any) => {
      this.setState({
        cash_validTime: e.target.value
      })
      this.props.dispatch({
        type: 'participateActive/setParticipateActive',
        payload: {
          cash_validTime: e.target.value
        }
      });
    }

    //卡券数量输入
    inputCashNumber = (e: any) => {
      this.setState({
        cash_number: e.target.value
      })
      this.props.dispatch({
        type: 'participateActive/setParticipateActive',
        payload: {
          cash_number: e.target.value
        }
      });
    }

    /* 商品券 */
    inputShopName = (e: any) => {
      this.setState({
        shop_name: e.target.value
      })
      this.props.dispatch({
        type: 'participateActive/setParticipateActive',
        payload: {
          shop_name: e.target.value
        }
      });
    }
    inputShopOriginalCost = (e: any) => {
      this.setState({
        shop_originalCost: e.target.value
      })
      this.props.dispatch({
        type: 'participateActive/setParticipateActive',
        payload: {
          shop_originalCost: e.target.value
        }
      });
    }

    inputShopValidTime = (e: any) => {
      this.setState({
        shop_validTime: e.target.value
      })
      this.props.dispatch({
        type: 'participateActive/setParticipateActive',
        payload: {
          shop_validTime: e.target.value
        }
      });
    }

    inputShopNumber = (e: any) => {
      this.setState({
        shop_number: e.target.value
      })
      this.props.dispatch({
        type: 'participateActive/setParticipateActive',
        payload: {
          shop_number: e.target.value
        }
      });
    }


    handleShowNotice = () => router.push({ pathname: '/activitys/notice', query: { type: 4 } })

    //     < List.Item
    //   extra = {< span > {
    //     this.props.description && this.props.description.length != 0 ? '已设置' + this.props.description.length + '条规则' : '请设置使用须知'
    //   }
    // 					</span>}
    // arrow = "horizontal"
    // 					onClick = { this.handleShowNotice }

    render() {
      const { activeTime, cardVoucherType } = this.state
      const { description } = this.props
      return (
        <div className={styles.inputBox}>
          <ul>
            <li onClick={this.handleShowSelectTime}>
              <div>活动时间</div>
              <div>{activeTime}</div>
            </li>
            <li >
              <div>选择卡券类型</div>
              <div className={styles.cash_coupon} onClick={this.inputCardVoucherType.bind(this, false)}>
                <span className={!cardVoucherType ? styles.selected : ''}></span>现金券
            </div>
              <div className={styles.coupons} onClick={this.inputCardVoucherType.bind(this, true)}>
                <span className={cardVoucherType ? styles.selected : ''}></span>商品券
            </div>
            </li>
          </ul>
          {
            !cardVoucherType ? <ul>
              <li>
                <div>卡券面额</div>
                <input
                  type="number" pattern="[0-9]*"
                  placeholder={'请输入面额'}
                  value={this.state.cash_denomination}
                  onChange={this.inputCashDenomination}
                  onBlur={this.onclange} />
              </li>
              <li>
                <div>使用门槛</div>
                <input
                  type="number" pattern="[0-9]*"
                  placeholder={'请输入使用门槛(元）'}
                  value={this.state.cash_threshold}
                  onChange={this.inputCashThreshold}
                  onBlur={this.onclange} />
              </li>

              <li>
                <div>卡券有效期</div>
                <input
                  type="number" pattern="[0-9]*"
                  placeholder={'请输入卡券有效期'}
                  value={this.state.cash_validTime}
                  onChange={this.inputCashValidTime}
                  onBlur={this.onclange} />
              </li>

              <li style={{ border: 'none' }}>
                <div>卡券数量</div>
                <input
                  type="number" pattern="[0-9]*"
                  placeholder={'请输入数量(张)'}
                  value={this.state.cash_number}
                  onChange={this.inputCashNumber}
                  onBlur={this.onclange} />
              </li>
            </ul> : <ul>
                <li>
                  <div>卡券名称</div>
                  <input
                    placeholder={'请输入卡券名称'}
                    value={this.state.shop_name}
                    onChange={this.inputShopName}
                    onBlur={this.onclange} />
                </li>
                <li>
                  <div>商品原价</div>
                  <input
                    type="number" pattern="[0-9]*"
                    placeholder={'请输入商品原价'}
                    value={this.state.shop_originalCost}
                    onChange={this.inputShopOriginalCost}
                    onBlur={this.onclange} />
                </li>

                <li>
                  <div>卡券有效期</div>
                  <input
                    type="number" pattern="[0-9]*"
                    placeholder={'请输入卡券有效期'}
                    value={this.state.shop_validTime}
                    onChange={this.inputShopValidTime}
                    onBlur={this.onclange} />
                </li>

                <li >
                  <div>卡券数量</div>
                  <input
                    type="number" pattern="[0-9]*"
                    placeholder={'请输入数量(张)'}
                    value={this.state.shop_number}
                    onChange={this.inputShopNumber}
                    onBlur={this.onclange} />
                </li>
                <li style={{ border: 'none' }}>
                  <div>使用规则</div>
                  <div onClick={this.handleShowNotice}>

                    {
                      description.length ? '已设置' + description.length + '条规则' : '请设置使用规则'
                    }
                  </div>

                </li>
              </ul>
          }



          <SelectTime
            show={this.state.showSelectTime}
            onClose={this.closeModal}
            onConfirm={this.handleSelectTime}
          />
          <div onClick={() => router.push({ pathname: '/finance', query: { type: 2 } })}>
            gggggg
        </div>

        </div>
      )
    }
  })