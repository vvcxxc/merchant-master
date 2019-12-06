/**title: 资金动态 */
import React, { Component } from 'react';
import styles from './index.less';
import router from 'umi/router';
import Propmpt from './prompt_box'
import FiltrateLayout from '../../components/selectLayout';
import { Toast } from 'antd-mobile';
import request from '@/services/request';
import moment from 'moment';

interface paramsType {
  begin_date: number |string ,//开始
  end_date: number | string,//结束时间
  from: number,//区分类型
  page:number//页码
}
export default class MyIndex extends Component {
  state = {
    title: [
      {
        name: '平台余额',
        pice: '50.00',
        des: '结算到商家平台账户内, 需要手动进行提现',
        left: -14.5,
        go_right: 15.2,
        show: false,
        index:1
      },
      {
        name: '商家微信',
        pice: '50.00',
        des: '结算到商家开通微信商户账户里。',
        left: -23, go_right: 23.8,
        show: false,
        index: 3
      },
      {
        name: '商家支付宝',
        pice: '50.00',
        des: '结算到商家开通支付宝商户账户里。',
        left: -43,
        go_right: 44,
        show: false,
        index: 2
      },
    ],
    begin_date: '',
    end_date: '',
    from: 1,
    page: 1,
    total: '',
    total_money: '',
    showMore:true,
    list: [
    ],
    totalData: [
      
    ]
  }

  componentDidMount() {
    //当用户无操作，将当月开始结束时间传递过去
    let date = new Date()
    let begin_date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + 1
    date.setMonth(date.getMonth() + 1)
    date.setDate(0)
    let end_date = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
    this.setState({
      begin_date,
      end_date,
      page: 1,
      from:1
    })
    const { from, page } = this.state
    this.getDataList({ begin_date, end_date, from, page})//请求数据
  }

  // 点击查看不同的列数据
  userSelect = async (index: any) => {

   await Toast.loading('');
    const { page, begin_date, end_date } = this.state
    this.setState({
      from: index ,
      page:1
    }, () => {
        
        this.getDataList({ begin_date, end_date, from: this.state.from, page })
        Toast.hide();
    })
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
  }

  handleLayoutChange = (data:any) => {
    this.setState({
      begin_date: data.time,
      end_date: data.end_time,
      page:1
    }, () => {
        const { begin_date, end_date, from ,page} = this.state
        this.getDataList({ begin_date, end_date, from, page })//请求数据
    })
  }

  // 请求数据 赋值列表
  getDataList = (params: paramsType) => {
    request({
      url: 'v3/finance/getStatements',
      method: 'get',
      params: {
        begin_date: params.begin_date,
        end_date: params.end_date
      }
    }).then(res => {
      const { data, code } = res
      if (code == 200) {
        let titleData = this.state.title
        titleData[0].pice = data.platform_total
        titleData[1].pice = data.wx_total
        titleData[2].pice = data.ali_total
        this.setState({
          title: titleData,
          totalData: [
            { name: '交易笔数', num: data.count },
            { name: '交易金额', num: data.total_money }]
        })
      }
    })

    request({
      url: 'v3/finance/getOfflineOrder',
      method: 'get',
      params
    }).then(res => {
      const { code, data } = res
      if (code === 200) {
        this.setState({
          list: params.page > 1 ? [...this.state.list, ...data.offlineOrders.data]:data.offlineOrders.data,
          total_money: data.total_money,//交易金额
          total: data.offlineOrders.total,//交易笔数
          
        })
        
        if (data.offlineOrders.data.length<1) this.setState({showMore:false})
      }

    })
  }

  //获取更多数据
  getMoreData = () => {
    const { begin_date, end_date, from, page } = this.state
    this.setState({
      page:page+1
    }, () => {
        this.getDataList({ begin_date, end_date, from, page:this.state.page })
    })
    
  }

  render() {
    const { title, list, total, total_money, showMore, from, totalData} = this.state
    const orderType:any = {
      [1]: { value: '收款', id: styles.gathering },
      [2]: { value: '订单', id: styles.order },
      [15]: { value: '充值', id: styles.recharge },
      [14]: { value: '收益', id: styles.earnings },
      [3]: { value: '其他', id: styles.earnings },
      [4]: { value: '其他', id: styles.earnings },
      [5]: { value: '其他', id: styles.earnings },
      [6]: { value: '其他', id: styles.earnings },
      [7]: { value: '其他', id: styles.earnings },
      [8]: { value: '其他', id: styles.earnings },
      [9]: { value: '其他', id: styles.earnings },
      [10]: { value: '其他', id: styles.earnings },
      [11]: { value: '其他', id: styles.earnings },
      [12]: { value: '其他', id: styles.earnings },
    }
    return (
      <FiltrateLayout
        hasInsignificant={true}
        dateTitle='时间'
        insignificant={totalData}
        onChange={this.handleLayoutChange}
        greyBackground={false}
      >
        
        <div id={styles.my_dynamic} onClick={this.onclosePrompt}>
            <div className={styles.userSelect}>
              {
                title && title.map((item: any, index: number) => {
                  return <div key={item.index} >
                    <div className={styles.balance} >
                      <span onClick={this.userSelect.bind(this, item.index)}>{item.name}</span>
                      <Propmpt
                        left={item.left}
                        value={item.des}
                        go_right={item.go_right}
                        index={index}
                        show={item.show}
                        onClcik={this.allowShow.bind(this)}
                      />

                    </div>
                    <div className={styles.pice} onClick={this.userSelect.bind(this, item.index)}
                      style={{ borderBottom: from == item.index ? '3px solid rgba(71,129,254,1)' : '' }}>
                      ￥{item.pice}
                    </div>
                  </div>
                })
              }
          </div>

            {
              list.length>0 && list.map((item: any, index: number) => {
                return <div className={styles.list_data} key={index} onClick={this.routerDetails}>
                  {
                    from > 1 ? <div className={styles.list_data_left}></div> :
                      <div className={styles.list_data_left}
                        id={orderType[item.order_type].id}
                      >
                        </div>
                  }
                  <div className={styles.list_data_right}>
                    <div className={styles.order}><span>{item.order_sn}</span> <span>{item.amount}</span></div>
                    <div className={styles.order_time}>
                      <span>{item.create_time}</span>
                      <span>
                        {
                           item.type
                        }
                      </span></div>
                    <div className={styles.border_one}></div>
                  </div>
                </div>
              })
          }
          {
            showMore ? <div className={styles.moreData} onClick={this.getMoreData}> 点击加载更多</div> : <div className={styles.moreData}> 无更多数据</div>
          }

          </div>
        </FiltrateLayout>
    )
  }
}
