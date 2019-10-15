import styles from './index.less'
import React, { Component } from 'react';
import router from 'umi/router';
import request from '@/services/request';
import { Carousel, Flex, WingBlank, Button, Toast, Modal } from 'antd-mobile';
interface Props {
  location:any
}
export default class EventDetails extends Component<Props> {
  state = {
    myData: [],
    page: 1,
    clickAllow:true
  }

  memberInformation = (group_id: number, status:number) => {
    router.push({ pathname: '/activitys/group/member_information', query: { group_id: group_id, status: status} })
  }

  componentDidMount() {
    this.getDtata()
  }

  getDtata = () => {
    request({
      url: 'api/merchant/activity/user_group_list',
      method: 'GET',
      params: {
        activity_id: this.props.location.query.id,
        page: this.state.page
      }
    }).then(res => {
      this.testGetData()
      const { code, data } = res
      const {myData,page} =this.state
      if (code !== 200) return 
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
    request({
      url: 'api/merchant/activity/user_group_list',
      method: 'GET',
      params: {
        activity_id: this.props.location.query.id,
        page: this.state.page+1
      }
    }).then(res => {
      const { code, data } = res
      if (code == 200) {
        data.length > 0 ? this.setState({ show: true }) : this.setState({ show: false })
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
      this.getDtata()
    })
  }

  render() {
    const { myData, show} = this.state
    let specific:any = {
      [1]: '未成团',
      [2]: '已成团',
      [3]:'已过期'
    }
    return (
      <div className={styles.eventDetails}>
        {
          myData.map((item:any,index) => {
            return <div className={styles.page} key={index} onClick={this.memberInformation.bind(this, item.group_id, item.status)}>
              <div className={styles.title}>
                <div>{item.created_at}</div>
                <div>{specific[item.status]}</div>
              </div>
              <div className={styles.eventDetailsContent}>
                <div className={styles.content_left}>
                  <img src={item.avatar} alt="" />
                </div>
                <div className={styles.content_right}>
                  <div className={styles.content_t}>{item.activties_name}</div>
                  <div className={styles.content_b}>
                    <div className={styles.content_bgc}>
                      <div className={styles.content_round} style={{
                        width: item.participation_number / item.number * 340+'px'
                      }}></div>
                    </div>
                    <div className={styles.people}> {item.participation_number}人</div>
                  </div>
                </div>
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