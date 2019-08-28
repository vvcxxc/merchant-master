import React, { Component } from 'react';
import { Flex, WingBlank, Button, Toast, Modal } from 'antd-mobile';
import styles from './index.less';
import request from '@/services/request';
import router from 'umi/router';
import wx from "weixin-js-sdk";
import Success from '@/pages/verification/success';
import BottomShare from '@/pages/activitys/appreciation/componts/bottom_share'
import Posters from '@/pages/activitys/appreciation/componts/posters'
import EchartsSan from '../../../../components/echart_shan/index'
const alert = Modal.alert;
interface Props {
  location:any
}
export default class GroupDetails extends Component<Props> {

  state = {
    echart_Data: [],
    info: {
      share: {},
      activity_image: '',
      appreciation_count: {
        participate_number: '',
        participation_number: '',
        coupons_number: ''
      },
      appreciation_info: {
        activity_type: '',
        max_money: '',
        appreciation_number: '',
        participation_number: '',
        activity_time: ''
      },
      appreciation_coupons_info: {
        market_price: '',
        use_tim: '',
        coupons_is_number: '',
        description: []
      },
      appreciation_gif_info: {
        gif_name: '',
        gif_pic: '',
        gif_integral: '',
        delivery: ''
      }
    },
    id: '',
    is_gift: true,
    type: '',
    types: '',
    showShare: false,//是否显示分享的组件
  }
  componentDidMount() {
    let { id, type } = this.props.location.query;
    if (type == '1') {
      this.setState({ types: '进行中' })
    } else if (type == '2') {
      this.setState({ types: '待生效' })
    } else {
      this.setState({ types: '已结束' })
    }
    this.setState({ id, type })
    request({
      url: 'api/merchant/youhui/getAppreciationInfo',
      method: 'get',
      params: {
        coupons_activity_log_id: id
      }
    }).then(res => {
      let { data } = res;
      this.setState({
        echart_Data: [
          data.appreciation_count.participate_number,
          data.appreciation_count.participation_number,
          data.appreciation_count.coupons_number
        ]
      })
      if (data.appreciation_gif_info.gift_id == 0) {
        this.setState({ is_gift: false })
      }
      this.setState({ info: data })
    })
  }



  // 撤销
  stop = () => {
    request({
      url: 'api/merchant/youhui/appreciation/activity/stop/' + this.state.id,
      method: 'put',
      data: {
        type: 1
      }
    }).then(res => {
      let { code, message } = res;
      if (code == 200) {
        Toast.success(message, 2, () => router.goBack())
      }
    })
  }

  shareClick = () => {
    this.setState({ showShare: true })
  }

  // closeShare = (close: boolean) => {
  //   this.setState({ showShare: false })
  // }


  render() {
    const { info, is_gift, types } = this.state;
    let infoData: any = info.appreciation_gif_info
    let share: any = info.share
    const description = info.appreciation_coupons_info.description.map((item, idx) => <p key={idx}>· {item}</p>);
    const button = this.state.type == '3' ? null : (
      <Button
        className={styles.buttons}
        type='primary'
        onClick={this.stop}
      >
        撤销活动
      </Button>
    );
    const isGift = is_gift == true ? (
      <div>
        <Flex className={styles.title}>
          <div className={styles.gang}>{null}</div>
          礼品信息
          </Flex>
        <Flex className={styles.item} align='start'>
          <div className={styles.item_name}>礼品名称：</div>
          <div className={styles.item_detail}>{info.appreciation_gif_info.gif_name}</div>
        </Flex>
        <Flex className={styles.item_height} align='start'>
          <div className={styles.item_name}>礼品图片：</div>
          <div className={styles.item_img}>
            <img src={info.appreciation_gif_info.gif_pic} />
          </div>
        </Flex>
        <Flex className={styles.item} align='start'>
          <div className={styles.item_name}>所需积分：</div>
          <div className={styles.item_detail}>{info.appreciation_gif_info.delivery}积分</div>
        </Flex>
        <Flex className={styles.item_height} align='start'>
          <div className={styles.item_name}>配送方式：</div>
          <div className={styles.item_long}>
            <p>{info.appreciation_gif_info.gif_integral}</p>
            {/* <p>邮寄 邮费谁出</p> */}
          </div>
        </Flex>
      </div>
    ) : null;

    const echart = this.state.echart_Data.length > 1 ?
      (
        <EchartsSan
          list={this.state.echart_Data}
          name={["参与人数", "增值人数", "券使用人数"]}
          colors={['#5476C4', '#7156C6', '#45BDBD']}
        />) : null
    const bottom_share = (
      <BottomShare
        closeShare={this.closeShare}
        showShare={this.state.showShare}
        type={{
          activity_id: infoData.activity_id,
          id: this.props.location.query.id,
          name: '增值',
          gift_id: infoData.gift_id,
          ...share
        }}
      >{null}
      </BottomShare>)
    return (
      <div className={styles.detailsPage}>
        <WingBlank>
          {/* 活动名 */}
          <Flex justify='between' className={styles.headers}>
            <div className={styles.names}>
              活动名称
              <span>{types}</span>
            </div>
            <img src={require('./share.png')} onClick={this.shareClick} />
          </Flex>

          {/* 基本信息 */}
          <Flex className={styles.title}>
            <div className={styles.gang}>{null}</div>
            活动统计数据
          </Flex>
          <div>
            {echart}
          </div>

          <Flex className={styles.title}>
            <div className={styles.gang}>{null}</div>
            活动基本信息
          </Flex>
          <Flex className={styles.item} align='start'>
            <div className={styles.item_name}>活动类型：</div>
            <div className={styles.item_detail}>{info.appreciation_info.activity_type}</div>
          </Flex>
          <Flex className={styles.item} align='start'>
            <div className={styles.item_name}>封顶值：</div>
            <div className={styles.item_detail}>{info.appreciation_info.max_money}元</div>
          </Flex>
          <Flex className={styles.item} align='start'>
            <div className={styles.item_name}>增值人数：</div>
            <div className={styles.item_detail}>{info.appreciation_info.appreciation_number}人</div>
          </Flex>
          <Flex className={styles.item} align='start'>
            <div className={styles.item_name}>总参与人数：</div>
            <div className={styles.item_detail}>{info.appreciation_info.participation_number}人</div>
          </Flex>
          <Flex className={styles.item} align='start'>
            <div className={styles.item_name}>活动时间：</div>
            <div className={styles.item_detail}>{info.appreciation_info.activity_time}</div>
          </Flex>

          {/* 优惠券信息 */}
          <Flex className={styles.title}>
            <div className={styles.gang}>{null}</div>
            优惠券信息
          </Flex>
          <Flex className={styles.item} align='start'>
            <div className={styles.item_name}>市场价：</div>
            <div className={styles.item_detail}>{info.appreciation_coupons_info.market_price}元</div>
          </Flex>
          <Flex className={styles.item} align='start'>
            <div className={styles.item_name}>使用时间：</div>
            <div className={styles.item_detail}>{info.appreciation_coupons_info.use_tim}</div>
          </Flex>
          <Flex className={styles.item} align='start'>
            <div className={styles.item_name}>数量：</div>
            <div className={styles.item_detail}>{info.appreciation_coupons_info.coupons_is_number}张</div>
          </Flex>
          <Flex className={styles.item_height} align='start'>
            <div className={styles.item_name}>使用须知：</div>
            <div className={styles.item_long}>
              {description}
            </div>
          </Flex>

          {/* 礼品信息 */}
          {isGift}

          {/* 撤销按钮 */}
          {/* <Button type='primary' style={{marginTop: 50, marginBottom: 30}} onClick={this.stop}>撤销活动</Button> */}
          {button}
        </WingBlank>
        {bottom_share}
      </div>
    )
  }
}
