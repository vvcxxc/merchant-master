import React, { Component } from 'react';
import { Carousel, Flex, WingBlank, Button, Toast, Modal } from 'antd-mobile';
import styles from './index.less';
import request from '@/services/request';
import router from 'umi/router';
import wx from "weixin-js-sdk";
import Success from '@/pages/verification/success';
import BottomShare from '@/pages/activitys/appreciation/componts/bottom_share'
import Posters from '@/pages/activitys/appreciation/componts/posters'
import EchartsSan from '../../../../components/echart_shan/index'
import { connect } from 'dva';


const alert = Modal.alert;

interface Props {
  location: any,
  dispatch: any,
  details: any
}

export default connect(({ activity }: any) => activity)(
  class GroupDetails extends Component<any> {

    state = {
      youhui_id:'',
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
          youhui_id: data.appreciation_gif_info.youhui_id
        })

        this.setState({
          posterData: {
            ...data.supplier,
            git_money: data.appreciation_gif_info.gif_integral,//礼品金额
            gif_pic: data.appreciation_gif_info.gif_pic,//礼品图片
            gift_id: data.appreciation_gif_info.gift_id,// 礼品id 如果为0 海报就不显示礼品图片以及信息
            // pay_money: data.appreciation_info.max_money,  // 后端改变上下参数
            // max_money: data.appreciation_info.pay_money,
            // pay_money: data.appreciation_info.pay_money,  // 后端改变上下参数
            // max_money: data.appreciation_info.poster_max_money,
            pay_money: data.appreciation_info.pay_money,
            max_money: data.appreciation_info.poster_max_money,
            poster_max_money: data.appreciation_info.poster_max_money,
            ...data.supplier,
            use_tim: data.appreciation_coupons_info.use_tim,
            gif_name: data.appreciation_gif_info.gif_name,
            schedule: data.appreciation_count.schedule,
            link: data.appreciation_info.link,
            title: '增值',
            total_fee: data.appreciation_info.total_fee,
          }
        })

        // this.createHeadImg(data.supplier.shop_door_header_img)
        // if (data.appreciation_gif_info.gift_id != 0) {
        //   this.createGiftImg(data.appreciation_gif_info.gif_pic)
        // }
        this.createHeadImg(data.supplier.shop_door_header_img + '?x-oss-process=image/format,jpg/resize,m_pad,h_180,w_180/quality,q_90'
        )
        if (data.appreciation_gif_info.gift_id != 0) {
          this.createGiftImg(data.appreciation_gif_info.gif_pic + '?x-oss-process=image/format,jpg/resize,m_pad,w_300,h_150/quality,q_90')
        }

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

    // 创建图片
    createHeadImg = (imgData: string) => {
      let tempImage2 = new Image();// 礼品图片
      tempImage2.crossOrigin = ""
      tempImage2.src = this.judgeNetwork(imgData);
      tempImage2.onload = () => {
        this.props.dispatch({
          type: 'activity/setDetails',
          payload: {
            headImg: this.getBase64Image2(tempImage2)
          }
        });
      }
    }
    createGiftImg = (imgData: string) => {
      let tempImage2 = new Image();// 礼品图片
      tempImage2.crossOrigin = ""
      tempImage2.src = this.judgeNetwork(imgData);
      tempImage2.onload = () => {
        this.props.dispatch({
          type: 'activity/setDetails',
          payload: {
            giftImg: this.getBase64Image2(tempImage2)
          }
        });
      }
    }

    // 转换图片
    getBase64Image2 = (img: any) => {
      var canvas: any = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
      var dataURL = canvas.toDataURL("image/" + ext, 0.1);
      return dataURL;
    }

    // 用来给域里面添加 ‘ \ ’
    judgeNetwork = (Network: string) => {
      // console.log(Network,'999')
      if (Network.split('com', 2)[1].slice(0, 1) == '/') {
        return Network.split('.com/', 2)[0] + '.com' + "\\/" + Network.split('.com/', 2)[1]
      } else {
        return Network
      }
    }


    lookDetail = () => {
      router.push({ pathname: '/activitys/group/event_details', query: { youhui_id: this.state.youhui_id } })
    }



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
          posterData={this.state.posterData}
        >{null}
        </BottomShare>)
      return (
        <div className={styles.detailsPage}>
          <WingBlank>
            {/* 活动名 */}
            <Flex justify='between' className={styles.headers}>
              <div className={styles.names}>
                {info.appreciation_info.activity_name}
                <span>{types}</span>
              </div>
              <img src={require('./share.png')} onClick={this.shareClick} />
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
  })
