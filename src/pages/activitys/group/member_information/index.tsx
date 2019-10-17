import styles from './index.less'
import React, { Component } from 'react';
import router from 'umi/router';
import request from '@/services/request';
interface Props {
  location: LocationType
}

interface LocationType {
  query: QueryType
}

interface QueryType {
  group_id: number | string,
  status: number | string
}

export default class MemberInformation extends Component<Props> {

  state = {
    myData: [],
    show: false,
    page: 1,
    clickAllow:true//允许用户点击更多
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    const { group_id, status } = this.props.location.query
    const { page,myData } = this.state
    request({
      url: 'api/merchant/activity/user_group_info_list',
      method: 'GET',
      params: {
        group_id: group_id,
        status: status,
        page:this.state.page
      }
    }).then(res => {
      const { code, data } = res
      if (code !== 200) return
      this.testGetData()
      if (page > 1) {
        let meta = myData
        meta.push(...data)
        this.setState({ myData: meta })
        return
      }
        this.setState({ myData: data })
    })
  }

  testGetData = () => {
    const { group_id, status } = this.props.location.query
    request({
      url: 'api/merchant/activity/user_group_info_list',
      method: 'GET',
      params: {
        group_id: group_id,
        status: status,
        page: this.state.page+1
      }
    }).then(res => {
      const { code, data } = res
      if (code == 200) {
        data.length > 0 ? this.setState({ show: true }): this.setState({ show: false })
      }
    })
  }

  //得到更多的数据
  getMoreData = () => {
    if (!this.state.clickAllow) return
    setTimeout(() => {
      this.setState({ clickAllow: true })
    }, 1000);
    this.setState({ clickAllow: false })
    this.setState({ page: this.state.page + 1 }, () => {
      this.getData()
    })
  }



  render() {
    const { myData,show } = this.state
    const { group_id, status } = this.props.location.query
    const specific: any = {
      [1]: '未成团',
      [2]: '已成团',
      [3]: '已过期'
    }
    const definite: any = {
      [1]: '未使用',
      [2]: '已使用',
      [3]: '已退款',
      [4]: '已过期'
    }
    return (
      <div className={styles.memberInformation}>
        {
          myData.map((item: any, index: number) => {
            return <div className={styles.memberInformationContent} key={' '}>
              <div className={styles.content_left}>
                <img src={item.user_portrait} alt="" />
              </div>
              <div className={styles.content_right}>
                <div className={styles.content_t}>
                  <div>{item.user_name}</div>
                  {
                    status == 2 ? <div className={styles.pay_money} style={{
                      color: item.youhui_status == 2 ? '#FF6654' : '#333333'
                    }}>{definite[item.youhui_status]}</div>
                      : <div className={styles.pay_money}>{specific[item.status]}</div>
                  }
                </div>
                <div className={styles.content_b}>{item.created_at}</div>
              </div>
            </div>
          })
        }
        <div className={styles.moreData} onClick={this.getMoreData} style={{ display: show ? '' : 'none' }}>
          点击加载更多</div>
      </div>
    )
  }
}