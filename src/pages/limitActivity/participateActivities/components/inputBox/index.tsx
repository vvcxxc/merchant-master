import React, { Component } from 'react'
import SelectTime from '@/components/select-time';
import { Toast } from 'antd-mobile';
import request from '@/services/request';
import router from 'umi/router';
import { connect } from 'dva';
import styles from './index.less'

export default connect(({ participateActive }: any) => participateActive)(
  class InputBox extends Component<any> {
    state = {
      // startTime: '',
      // endTime: '',
      start_date: '',
      end_date:'',
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

      description: [],//使用须知数据  已设置1条规则
      sumbit:false
    }

    componentDidMount() {
      const { shop, cash, cardVoucherType, end_date, start_date } = this.props
      this.setState({ ...shop, ...cash, cardVoucherType, end_date, start_date})
    }

    componentWillReceiveProps(value1: any, value2: any) {
      if (value1.sumbit) {
        console.log(1);
        
        this.setState({ sumbit: true})
          this.addActive()
      } else {
        
      }
      console.log(value1.sumbit, value2,'6555');
      
    }

    onclange = () => {
      //解决输入框失去焦点的问题
      document.documentElement.scrollTop = 0
    }

    //卡券类型  现金false 商品true
    inputCardVoucherType = (cardVoucherType: boolean) => {
      console.log(cardVoucherType,'hhhh');
      
      this.setState({ cardVoucherType })
      this.props.dispatch({
        type: 'participateActive/setActiveType',
        payload: cardVoucherType
      });
      this.props.onChangeType(cardVoucherType)
    }

    /*  现金券    面额输入*/
    inputCashDenomination = (e: any) => {
      this.setState({
        cash_denomination: e.target.value
      })
      this.props.dispatch({
        type: 'participateActive/setCash',
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
        type: 'participateActive/setCash',
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
        type: 'participateActive/setCash',
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
        type: 'participateActive/setCash',
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
        type: 'participateActive/setShop',
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
        type: 'participateActive/setShop',
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
        type: 'participateActive/setShop',
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
        type: 'participateActive/setShop',
        payload: {
          shop_number: e.target.value
        }
      });
    }

    //提交活动
    addActive = () => {
      const { cash_denomination, cash_threshold, cash_validTime, cash_number, cardVoucherType, shop_name, shop_originalCost, shop_validTime, shop_number} = this.state
      // !cash_denomination ? Toast.fail('请输入卡券面额') : null
      // !cash_threshold ? Toast.fail('请输入卡券使用门槛') : null
      // !cash_validTime ? Toast.fail('请输入卡券有效期') : null
      // !cash_number ? Toast.fail('请输入卡券数量') : null
      // if (!cash_denomination || cash_threshold || !cash_validTime || !cash_number) return 
      let meta = {
        coupons_type: 1 ,
        return_money: cash_denomination ,
        total_fee: cash_threshold ,
        validity: cash_validTime,
        total_num: cash_number
      }

      let meta2 = {
        coupons_type: 0,
        coupons_name: shop_name,//优惠卷名称
        return_money: shop_originalCost,//商品原价
        validity: shop_validTime,//有效期
        total_num:shop_number,//卡券数量
        description: this.props.shop.description,
        image: this.props.shop.imgUrl,
        image_url: this.props.shop.imgUrl
      }
      let data = !cardVoucherType ? meta : meta2 
      request({
        url: 'api/merchant/youhui/subAddCardVoucherActivity',
        method: 'post',
        data: {
          recruit_activity_id:7,
          ...data
        }
      }).then((res) => {
        const { code, data, message } = res
        if (code === 200) {
          this.setState({
            cash_denomination: '',
            cash_threshold: '',
            cash_validTime: '',
            cash_number:''
          })
          Toast.success(message)
        } else {
          Toast.fail(message)
        }

      })

    }


    handleShowNotice = () => router.push({ pathname: '/activitys/notice', query: { type: 4 } })

    render() {
      const { activeTime, cardVoucherType, start_date, end_date } = this.state
      const { description } = this.props.shop
      return (
        <div className={styles.inputBox}>
          <ul>
            <li>
              <div>活动时间</div>
              <div>{this.props.start_date+'至'+this.props.end_date}</div>
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
                
                <li style={{ border: 'none' }} onClick={this.handleShowNotice}>
                  <div>使用须知</div>
                  <div >
                    {
                      description && description.length ? '已设置' + description.length + '条规则' : '请设置使用规则'
                    }
                  </div>
                </li>
              </ul>
          }
        </div>
      )
    }
  })