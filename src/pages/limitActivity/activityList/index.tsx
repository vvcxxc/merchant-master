import React, { Component } from 'react';
import router from 'umi/router';
import { Flex } from 'antd-mobile'
import Item from './item'
import { Toast } from 'antd-mobile';
import moment from 'moment';
import request from '@/services/active_request';
import styles from './index.less';

export default class ActivityList extends Component {
  state = {
    list: [],
    num: 0, // 优惠券的数量
    max_num: 0, // 最大优惠券数
    is_model: false, // 显示弹框
    page: 0,
    hint: '',//提示
    recruit_activity_id: '',
    end_time:0
  }

  componentDidMount() {
    this.getListData()
    // this.setState({})
  }

  //请求列表数据
  getListData = () => {
    const { page, recruit_activity_id } = this.state
    request({
      url: 'api/merchant/youhui/cardVoucherActivityList',
      method: 'get',
      params: {
        recruit_activity_id: this.props.location.query.id,
        page: page + 1
      }
    }).then(res => {
      const { code, data } = res
      switch (code) {
        case 200:
          this.setState({
            end_time: moment(data.recruit_activity_end_date + ' 23:59:59').unix() 
          })
          page ? this.setState({ list: [...this.state.list, ...data.data.data] }) : this.setState({ list: data.data.data, max_num: data.card_num, num: data.data.total })
          page ? !data.data.data.length && this.setState({ hint: '无更多数据' }) : this.state.list.length && this.setState({ hint: '点击加载更多' })
          break;

        default:
          break;
      }
    })
  }


  // 发布活动
  issue = () => {
    const { num, max_num, recruit_activity_id } = this.state
    if (num >= max_num) {
      this.setState({ is_model: true })
    } else {
      //跳转发布卡券页面
      router.push({ pathname: '/limitActivity/participateActivities', query: { recruit_activity_id: this.props.location.query.id } })
    }
  }

  //加载更多数据
  getMoreData = () => {
    this.setState({ page: this.state.page + 1 }, this.getListData)
  }

  //删除数据
  deleteListData = (youhui_id: Number | string) => {
    request({
      url: 'api/merchant/youhui/delCardVoucherActivity',
      method: 'post',
      data: {
        youhui_id
      }
    }).then(res => {
      const { code, data, message } = res
      switch (code) {
        case 200:
          this.setState({ page: 0 }, this.getListData)
          Toast.success(message)
          break;
        default:
          Toast.success(message)
          break;
      }
    })

  }


  render() {
    const { is_model, list, max_num, hint, end_time } = this.state
    const Model = (
      <div className={styles.model}>
        <div className={styles.model_main}>
          <div className={styles.model_title}>温馨提示</div>
          <div className={styles.model_text}>本次活动，每个商家最多可发布{max_num}张卡券</div>
          <div className={styles.model_bottom} onClick={() => this.setState({ is_model: false })}>确定</div>
        </div>
      </div>
    )
    return (
      <div className={styles.listPage}>
        {
          list && list.length ? (
            <div>
              <Flex className={styles.hint}>
                *温馨提示：本次活动只能发布{max_num}张卡券，若需要发布其他卡券，请删除本来的卡券后再添加。
              </Flex>
              <div className={styles.list}>
                {
                  list && list.map((item:any) => {
                    return <Item info={item} key={item.id} activity_id={this.props.location.query.id} delete={this.deleteListData}/>
                  })
                }
              </div>
            </div>
          ) : (
              <div className={styles.no_data}>
                <div className={styles.no_data_main}>
                  <img src={require('@/assets/no-coupon.png')} />
                  <div>您还未发布卡券，赶紧添加吧!</div>
                </div>
              </div>
            )
        }
        {
          <div className={styles.more_data} onClick={this.getMoreData} >{hint}</div>
        }
        {is_model ? Model : null}
        {
          new Date().getTime()/1000 < end_time ?
            <div className={styles.issueBox} style={{ backgroundColor: list.length > 4 ? '#fff' : '' }}>
            <div className={styles.issue} onClick={this.issue}>
              <Flex justify='center' align='center' style={{ height: '100%' }}>
                <img src={require('@/assets/add.png')} />
                发布我的卡券
          </Flex>
            </div>
          </div> :null
      }
     
      </div>
    )
  }
}
