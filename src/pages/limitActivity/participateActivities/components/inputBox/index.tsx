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
      coupons_type: 0,//卡券类型
      start_date: '',
      end_date: '',
      cash: {
        return_money:'',
        total_fee: '',
        validity: '',
        total_num: ''
      },
      shop: {
        coupons_name:'',//卡卷名称
        return_money: '',//商品原价
        validity: '',//有效期
        total_num: '',//卡券数量
        description:[]//使用须知
      }
    }

    componentDidMount() {
      const { coupons_type, shop, cash, active, list } = this.props
      
      this.setState({
        coupons_type,
        shop,
        cash,
        ...active,
        ...list
      })
      
    }


    componentWillReceiveProps(value1: any, value2: any) {
      if (value1.sumbit) {
        this.props.submit(false)
        this.addActive()
      }
    }

    //解决输入框失去焦点的问题
    onclange = () => {
      document.documentElement.scrollTop = 0
    }
    //卡券类型  现金1 商品0
    inputCardVoucherType = (coupons_type: number) => {
      this.setState({ coupons_type })
      this.props.dispatch({
        type: 'participateActive/setActiveType',
        payload: coupons_type
      });
      this.props.onChangeType(coupons_type)
    }

    //现金券input输入
    inputCashList = (type: string) => (e: any) => {
      this.setState({
        cash:{...this.state.cash,[type]: e.target.value}
      })
      this.props.dispatch({
        type: 'participateActive/setCash',
        payload: {
          [type]: e.target.value
        }
      });
    }

    //商品券输入
    inputShopList = (type: string) => (e: any) => {
      this.setState({
        shop: { ...this.state.shop, [type]: e.target.value}
      })
      this.props.dispatch({
        type: 'participateActive/setShop',
        payload: {
          [type]: e.target.value
        }
      });
    }

    //提交活动
    addActive = () => {
      const { coupons_type, cash, shop } = this.state
      let value = !coupons_type ? { ...shop, image_url: this.props.cover_image, image: this.props.cover_image } : cash
      request({
        url: 'api/merchant/youhui/subAddCardVoucherActivity',
        method: 'post',
        data: {
          coupons_type,
          recruit_activity_id: this.props.recruit_activity_id,
          ...value
        }
      }).then((res) => {
        const { code, data, message } = res
        if (code === 200) {
          if (!coupons_type) {
            this.setState({ shop: {} })
            this.props.dispatch({
              type: 'participateActive/clearShop',
              payload: {}
            });
          } else {
            this.setState({ cash: {} })
            this.props.dispatch({
              type: 'participateActive/clearCash',
              payload: {}
            });
          }
         
          Toast.success(message, 1, () => {
            // router.push({ pathname:'/limitActivity/activityList'})
            router.push({
              pathname: '/limitActivity/activityList',
              query: { id: this.props.recruit_activity_id }
            })
          })
        } else {
          Toast.fail(message)
        }
      })

    }

   

    //获取使用须知
    handleShowNotice = () => router.push({ pathname: '/activitys/notice', query: { type: 4 } })

    render() {
      const { coupons_type, start_date, end_date, cash,shop } = this.state
      const { description } = this.props.shop
      const { list } = this.props
      const chooseCardType = <li >
        <div>选择卡券类型</div>
        <div className={styles.cash_coupon} onClick={this.inputCardVoucherType.bind(this, 1)}>
          <span className={coupons_type ? styles.selected : ''}></span>现金券
            </div>
        <div className={styles.coupons} onClick={this.inputCardVoucherType.bind(this, 0)}>
          <span className={!coupons_type ? styles.selected : ''}></span>商品券
            </div>
      </li>
      // const cardType = <li><div>选择卡券类型</div><div>{!list.youhui_type ? '商品券' : '现金券'}</div></li>
      return (
        <div className={styles.inputBox}>
          <ul>
            <li>
              <div>活动时间</div>
              <div>{start_date + '至' + end_date}</div>
            </li>
            { chooseCardType}
          </ul>
          {
            coupons_type ? <ul>
              <li>
                <div>卡券面额</div>
                <input
                  type="number" pattern="[0-9]*"
                  placeholder={'请输入面额'}
                  value={cash.return_money}
                  onChange={this.inputCashList('return_money')}
                  onBlur={this.onclange} />
              </li>
              <li>
                <div>使用门槛</div>
                <input
                  type="number" pattern="[0-9]*"
                  placeholder={'请输入使用门槛(元）'}
                  value={cash.total_fee}
                  onChange={this.inputCashList('total_fee')}
                  onBlur={this.onclange} />
              </li>

              <li>
                <div>卡券有效期</div>
                <input
                  type="number" pattern="[0-9]*"
                  placeholder={'请输入卡券有效期'}
                  value={cash.validity}
                  onChange={this.inputCashList('validity')}
                  onBlur={this.onclange} />
              </li>

              <li style={{ border: 'none' }}>
                <div>卡券数量</div>
                <input
                  type="number" pattern="[0-9]*"
                  placeholder={'请输入数量(张)'}
                  value={cash.total_num}
                  onChange={this.inputCashList('total_num')}
                  onBlur={this.onclange} />
              </li>
            </ul> : <ul>
                <li>
                  <div>卡券名称</div>
                  <input
                    placeholder={'请输入卡券名称'}
                    value={shop.coupons_name}
                    onChange={this.inputShopList('coupons_name')}
                    onBlur={this.onclange} />
                </li>
                <li>
                  <div>商品原价</div>
                  <input
                    type="number" pattern="[0-9]*"
                    placeholder={'请输入商品原价'}
                    value={shop.return_money}
                    onChange={this.inputShopList('return_money')}
                    onBlur={this.onclange} />
                </li>
                <li>
                  <div>卡券有效期</div>
                  <input
                    type="number" pattern="[0-9]*"
                    placeholder={'请输入卡券有效期'}
                    value={shop.validity}
                    onChange={this.inputShopList('validity')}
                    onBlur={this.onclange} />
                </li>
                <li >
                  <div>卡券数量</div>
                  <input
                    type="number" pattern="[0-9]*"
                    placeholder={'请输入数量(张)'}
                    value={shop.total_num}
                    onChange={this.inputShopList('total_num')}
                    onBlur={this.onclange} />
                </li>

                <li style={{ border: 'none' }} onClick={this.handleShowNotice}>
                  <div>使用须知</div>
                  <div className={styles.useInfo}>
                    {
                       description && description.map((item: string, index: number) => {
                        return <div key={item}>{index + 1}.{item}</div>
                      })
                    }
                  </div>
                </li>
              </ul>
          }
        </div>
      )
    }
  })