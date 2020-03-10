import React, { Component } from 'react';
import request from '@/services/request';
import router from 'umi/router';
import wx from "weixin-js-sdk";
import { connect } from 'dva';
import { Carousel, Flex, WingBlank, Button, Toast, Modal } from 'antd-mobile';
import Success from '@/pages/verification/success';
//品类券海报
import PosterCategory from '@/pages/activitys/appreciation/componts/posters/value_added/category'
//通用券海报
import PosterGeneral from '@/pages/activitys/appreciation/componts/posters/value_added/general'


import styles from './index.less';
// import EchartsSan from '../../../../components/echart_shan/index'
// import Poster from '@/pages/activitys/appreciation/componts/posters/spell_group'




const alert = Modal.alert;

interface Props {
  location: any,
  dispatch: any,
  details: any
}

export default connect(({ activity }: any) => activity)(
  class GroupDetails extends Component<any> {

    state = {
      show_notice: false,
      youhui_id: '',
      echart_Data: [],
      posterData: {},
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
          activity_name: '',
          appreciation_number: '',
          participation_number: '',
          activity_time: '',
          pay_money: '',
          init_money: '',
          images: []
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
        },
        supplier: {

        }
      },
      id: '',
      is_gift: true,
      type: '',
      types: '',
      showShare: false,//是否显示分享的组件

      //海报
      spell_group: false,
      poster_youhui_type: 0
      // spellGroupInfo: {}
    }

    componentWillMount() {
      this.props.dispatch({
        type: 'activity/setDetails',
        payload: {
          headImg: '1 ',
          giftImg: ' 1'
        }
      });
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

        this.setState({
          youhui_id: data.appreciation_gif_info.youhui_id,
          show_notice: data.appreciation_info.images.length > 0 ? true : false
        })

        console.log(data,)
        this.setState({
          poster_youhui_type: data.appreciation_info.youhui_type,//0品类券/1:全场通用
          youhui_id: data.appreciation_gif_info.youhui_id,
          show_notice: data.appreciation_info.images.length > 0 ? true : false,
          posterData: {
            ...data.supplier,                     //地址 店名 店铺照 电话
            // 礼品id为0? 不显示礼品以及信息
            gift_id: data.appreciation_gif_info.gift_id,
            //活动价格
            active_money: data.appreciation_info.poster_pay_money,
            //增值最大金额
            max_money: data.appreciation_info.poster_max_money,
            //购买券的价格
            pay_money: data.appreciation_info.pay_money,
            //礼品小图
            git_img: data.appreciation_gif_info.gif_pic,
              // data.appreciation_info.images[0],
            link: data.appreciation_info.link,
            activity_name: data.appreciation_info.activity_name,
            total_fee: data.appreciation_info.total_fee,//使用门槛
            use_tim: data.appreciation_coupons_info.use_tim,
            gif_name: data.appreciation_gif_info.gif_name,
            gif_money: data.appreciation_gif_info.gif_integral,
            big_pic: data.appreciation_info.poster_image
          }
        })

        // this.setState({
        //   posterData: {
        //     ...data.supplier,
        //     git_money: data.appreciation_gif_info.gif_integral,//礼品金额
        //     gif_pic: data.appreciation_gif_info.gif_pic,//礼品图片
        //     gift_id: data.appreciation_gif_info.gift_id,// 礼品id 为0 不显示礼品图片以及信息
        //     pay_money: data.appreciation_info.pay_money,
        //     max_money: data.appreciation_info.poster_max_money,
        //     poster_max_money: data.appreciation_info.poster_max_money,
        //     ...data.supplier,
        //     use_tim: data.appreciation_coupons_info.use_tim,
        //     gif_name: data.appreciation_gif_info.gif_name,
        //     schedule: data.appreciation_count.schedule,
        //     link: data.appreciation_info.link,
        //     title: '增值',
        //     total_fee: data.appreciation_info.total_fee,
        //   }
        // })

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

    closeShare = (close: boolean) => {
      this.setState({ showShare: false })
    }

    lookDetail = () => {
      router.push({ pathname: '/activitys/group/event_details', query: { youhui_id: this.state.youhui_id } })
    }



    render() {
      const { info, is_gift, types, show_notice } = this.state;
      // let infoData: any = info.appreciation_gif_info
      // let share: any = info.share
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
            <div className={styles.item_detail}>{info.appreciation_gif_info.gif_integral}积分</div>
          </Flex>
          <Flex className={styles.item_height} align='start'>
            <div className={styles.item_name}>配送方式：</div>
            <div className={styles.item_long}>
              <p>{info.appreciation_gif_info.delivery}</p>
              {/* <p>邮寄 邮费谁出</p> */}
            </div>
          </Flex>
        </div>
      ) : null;

      // const echart = this.state.echart_Data.length > 1 ?
      //   (
      //     <EchartsSan
      //       list={this.state.echart_Data}
      //       name={["参与人数", "增值人数", "券使用人数"]}
      //       colors={['#5476C4', '#7156C6', '#45BDBD']}
      //     />) : null

      // const bottom_share = (
      // <BottomShare
      //   closeShare={this.closeShare}
      //   showShare={this.state.showShare}
      //   type={{
      //     activity_id: infoData.activity_id,
      //     id: infoData.youhui_id,
      //     name: '增值',
      //     gift_id: infoData.gift_id,
      //     ...share
      //   }}
      //   posterData={this.state.posterData}
      // >{null}
      // </BottomShare>)
      return (
        <div className={styles.detailsPage}>
          <WingBlank>
            {/* 活动名 */}
            <Flex justify='between' className={styles.headers}>
              <div className={styles.names}>
                {info.appreciation_info.activity_name}
                <span>{types}</span>
              </div>
              <img src={require('./share.png')} onClick={
                // this.shareClick
                () => {
                  // console.log('触发')
                  this.setState({ spell_group: true })
                }
              } />
            </Flex>
            {
              this.state.info.appreciation_info.images.length ? < Flex className={styles.activity_img}>
                <Carousel
                  autoplay={true}
                  infinite
                >
                  {this.state.info.appreciation_info.images.map(val => (
                    <img key={val} className={styles.Carouselimg} src={val} />
                  ))}
                </Carousel>
              </Flex> : null
            }
            {/* 基本信息 */}
            {/* <Flex className={styles.title}>
              <div className={styles.gang}>{null}</div>
              活动统计数据
          </Flex>
            <div>
              {echart}
            </div> */}

            <Flex className={styles.title}>
              <div className={styles.gang}>{null}</div>
              活动基本信息
          </Flex>
            <Flex className={styles.item} align='start'>
              <div className={styles.item_name}>活动类型：</div>
              <div className={styles.item_detail}>{info.appreciation_info.activity_type}</div>
            </Flex>
            {/* <Flex className={styles.item} align='start'>
            <div className={styles.item_name}>封顶值：</div>
            <div className={styles.item_detail}>{info.appreciation_info.max_money}元</div>
          </Flex> */}
            <Flex className={styles.item} align='start'>
              <div className={styles.item_name}>增值区间：</div>
              <div className={styles.item_detail}>{info.appreciation_info.init_money}元至{info.appreciation_info.max_money}元</div>
            </Flex>
            <Flex className={styles.item} align='start'>
              <div className={styles.item_name}>购买价格：</div>
              <div className={styles.item_detail}>{info.appreciation_info.pay_money}元</div>
            </Flex>
            <Flex className={styles.item} align='start'>
              <div className={styles.item_name}>增值人数：</div>
              <div className={styles.item_detail}>{info.appreciation_info.appreciation_number}人</div>
              <div className={styles.jump_detail} onClick={this.lookDetail}>查看详细</div>
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
            {/* <Flex className={styles.item} align='start'>
              <div className={styles.item_name}>市场价：</div>
              <div className={styles.item_detail}>{info.appreciation_coupons_info.market_price}元</div>
            </Flex> */}
            <Flex className={styles.item} align='start'>
              <div className={styles.item_name}>使用时间：</div>
              <div className={styles.item_detail}>{info.appreciation_coupons_info.use_tim}</div>
            </Flex>
            <Flex className={styles.item} align='start'>
              <div className={styles.item_name}>数量：</div>
              <div className={styles.item_detail}>{info.appreciation_coupons_info.coupons_is_number}张</div>
            </Flex>
            {
              show_notice ? <Flex className={styles.item_height} align='start'>
                <div className={styles.item_name}>使用须知：</div>
                <div className={styles.item_long}>
                  {description}
                </div>
              </Flex> : null
            }
            {isGift}
            {button}
          </WingBlank>
          {
            !this.state.poster_youhui_type ? <PosterGeneral
              show={this.state.spell_group}
              list={this.state.posterData}
              close={() => this.setState({ spell_group: false })}
            /> : <PosterCategory
                show={this.state.spell_group}
                list={this.state.posterData}
                close={() => this.setState({ spell_group: false })} />
          }
        </div>
      )
    }
  })
