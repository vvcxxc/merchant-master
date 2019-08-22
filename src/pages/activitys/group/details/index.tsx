import React, { Component } from 'react';
import { Flex, WingBlank, Button, Toast, Modal } from 'antd-mobile';
import styles from './index.less';
import request from '@/services/request';
import router from 'umi/router';
import EchartsSan from '../../../../components/echart_shan'
import BottomShare from '@/pages/activitys/appreciation/componts/bottom_share'
import Posters from '@/pages/activitys/appreciation/componts/posters'
const alert = Modal.alert;
export default class GroupDetails extends Component {
  state = {
    dataEchart:[],
    info: {
      share:{},
      activity_image: '',
      group_count: {
        group_defeated: '',
        group_underway: '',
        group_success: '',
        coupons_number: ''
      },
      group_info: {
        activity_type: '',
        pay_money: '',
        group_money: '',
        group_number: '',
        activity_time: ''
      },
      group_coupons_info: {
        market_price: '',
        use_tim: '',
        coupons_number: '',
        description: []
      },
      group_gif_info: {
        gif_name: '',
        gif_pic: '',
        gif_integral: '',
        delivery: ''
      }
    },
    id: '',
    type: '',
    is_gift: true,
    types: '',
    showShare: false,
    showPoster: false
  }
  componentWillMount() {
    
  }
  componentDidMount (){
    let {type,id} = this.props.location.query;
    if(type == '1'){
      this.setState({types: '进行中'})
    }else if(type == '2'){
      this.setState({types: '待生效'})
    }else{
      this.setState({types: '已结束'})
    }
    this.setState({id, type})
    request({
      url: 'api/merchant/youhui/group_info',
      method: 'get',
      params: {
        coupons_activity_log_id: this.props.location.query.id
      }
    }).then(res => {
      let { data } = res;
      this.setState({
        dataEchart: [
          res.data.group_count.coupons_number,
          res.data.group_count.group_defeated,
          res.data.group_count.group_success,
          res.data.group_count.group_underway
        ]
      })
      if(data.group_gif_info.gift_id == 0){
        this.setState({is_gift: false})
      }
      this.setState({info: data})
    })
  }

  // 撤销
  stop = () => {
    let { type } = this.state;
    if(type == '1'){
      alert('撤销提醒', '撤销活动后，已经开团的活动可以继续参团，未开团将不能继续开团，是否撤销活动？', [{ text: '取消', onPress: () => {} },{ text: '确认', onPress: () => {
        request({
              url: 'api/merchant/youhui/appreciation/activity/stop/'+this.state.id,
              method: 'put',
              data: {
                type: 5
              }
            }).then (res => {
              let {code, message} = res;
              if(code == 200){
                Toast.success(message,2,()=>router.goBack())
              }
            })
      } },])
    }else{
      request({
        url: 'api/merchant/youhui/appreciation/activity/stop/'+this.state.id,
        method: 'put',
        data: {
          type: 5
        }
      }).then (res => {
        let {code, message} = res;
        if(code == 200){
          Toast.success(message,2,()=>router.goBack())
        }
      })
    }

  }

  shareClick = () => {
    this.setState({ showShare: true })
  }

  closeShare = (close: boolean) => {
    this.setState({ showShare: false })
  }

  showPoster = (show: any) => {
    this.setState({ showPoster: true })
    this.setState({ showShare: false })
  }
  closePoster = (close: any) => {
    this.setState({ showPoster: false })
  }

  render() {
    const { info, is_gift, types, dataEchart } = this.state;

    let infoData: any = info.group_gif_info;
    let share: any = info.share
    let echartData:any = this.state.dataEchart
    const description = info.group_coupons_info.description.map((item,idx) => <p key={idx}>· {item}</p>)
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
            <div className={styles.item_detail}>{info.group_gif_info.gif_name}</div>
          </Flex>
          <Flex className={styles.item_height} align='start'>
            <div className={styles.item_name}>礼品图片：</div>
            <div className={styles.item_img}>
              <img src={info.group_gif_info.gif_pic}/>
            </div>
          </Flex>
          <Flex className={styles.item} align='start'>
            <div className={styles.item_name}>所需积分：</div>
            <div className={styles.item_detail}>{info.group_gif_info.delivery}积分</div>
          </Flex>
          <Flex className={styles.item_height} align='start'>
            <div className={styles.item_name}>配送方式：</div>
            <div className={styles.item_long}>
              <p>{info.group_gif_info.gif_integral}</p>
              {/* <p>邮寄 邮费谁出</p> */}
            </div>
          </Flex>
      </div>
    ) : null;
    const echart = this.state.dataEchart.length > 1 ?  (
      <div>
        <EchartsSan
          list={this.state.dataEchart}
          name={["拼团失败", "拼团中", "拼团成功", "券使用人数"]}
          colors={['#07BC87', '#3A99FB', '#F55641', '#F7B55F']}
        >{null}
        </EchartsSan> 
      </div>
    ) : null

    const bottom_share = (
      <BottomShare
        closeShare={this.closeShare}
        showShare={this.state.showShare}
        showPoster={this.showPoster}
        type={{
          activity_id: infoData.activity_id,
          id: this.props.location.query.id,
          name: '拼团',
          gift_id: infoData.gift_id,
          ...share
        }}
      >{null}
      </BottomShare>)
    const poster = <Posters closePoster={this.closePoster} showPoster={this.state.showPoster} >{null}</Posters>
    return (
      <div className={styles.detailsPage}>
        <WingBlank>
          {/* 活动名 */}
          <Flex justify='between' className={styles.headers}>
            <div className={styles.names}>
              活动名称
              <span>{types}</span>
            </div>
            <img src={require('./share.png')} onClick={this.shareClick}/>
          </Flex>
          {/* 图片 */}
          <Flex className={styles.activity_img}>
            <img src={info.activity_image}/>
          </Flex>
          <Flex className={styles.title}>
            <div className={styles.gang}>{null}</div>
            活动统计数据
          </Flex>
          {echart}
          {/* 基本信息 */}
          <Flex className={styles.title}>
            <div className={styles.gang}>{null}</div>
            活动基本信息
          </Flex>
          <Flex className={styles.item} align='start'>
            <div className={styles.item_name}>活动类型：</div>
            <div className={styles.item_detail}>{info.group_info.activity_type}</div>
          </Flex>
          <Flex className={styles.item} align='start'>
            <div className={styles.item_name}>原价：</div>
            <div className={styles.item_detail}>{info.group_info.pay_money}元</div>
          </Flex>
          <Flex className={styles.item} align='start'>
            <div className={styles.item_name}>拼团价：</div>
            <div className={styles.item_detail}>{info.group_info.group_money}元</div>
          </Flex>
          <Flex className={styles.item} align='start'>
            <div className={styles.item_name}>拼团人数：</div>
            <div className={styles.item_detail}>{info.group_info.group_number}人</div>
          </Flex>
          <Flex className={styles.item} align='start'>
            <div className={styles.item_name}>活动时间：</div>
            <div className={styles.item_detail}>{info.group_info.activity_time} </div>
          </Flex>

          {/* 优惠券信息 */}
          <Flex className={styles.title}>
            <div className={styles.gang}>{null}</div>
            优惠券信息
          </Flex>
          <Flex className={styles.item} align='start'>
            <div className={styles.item_name}>市场价：</div>
            <div className={styles.item_detail}>{info.group_coupons_info.market_price}元</div>
          </Flex>
          <Flex className={styles.item} align='start'>
            <div className={styles.item_name}>使用时间：</div>
            <div className={styles.item_detail}>{info.group_coupons_info.use_tim}</div>
          </Flex>
          <Flex className={styles.item} align='start'>
            <div className={styles.item_name}>数量：</div>
            <div className={styles.item_detail}>{info.group_coupons_info.coupons_number}张</div>
          </Flex>
          <Flex className={styles.item_height} align='start'>
            <div className={styles.item_name}>使用须知：</div>
            <div className={styles.item_long}>
              {/* <p>· 消费高峰期时可能需要等</p> */}
              {description}
            </div>
          </Flex>

          {/* 礼品信息 */}
          {isGift}

          {/* 撤销按钮 */}
          {/* <Button  style={{marginTop: 50, marginBottom: 30}} onClick={this.stop}>撤销活动</Button> */}
          {button}
        </WingBlank>
         {poster}

        {bottom_share} 
      </div>
    )
  }
}
