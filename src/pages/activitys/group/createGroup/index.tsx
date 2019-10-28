/**title: 添加社区拼团 */
import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, DatePicker, List, InputItem, Icon, Toast, ImagePicker } from 'antd-mobile';
import upload from '@/services/oss';
import moment from 'moment'
import request from '@/services/request'
import SelectTime from '@/components/select-time';
import router from 'umi/router';
import { connect } from 'dva';
import ad_intro2 from '@/assets/ad/ad_intro2.png'

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

export default connect(({ activity }: any) => activity)(
  class createGroup extends Component<any> {
    state = {
      is_gift: false,
      showSelectTime: false,
      startTime: undefined,
      endTime: undefined,
      prompt: false
    };
    componentDidMount() {

      if (this.props.Group.gift_id) {
        this.setState({ is_gift: true })
      }

    }
    /**选择券范围 */
    onScope = (value: any) => {
      this.setState({
        scope: value,
      }, () => {
        this.props.dispatch({
          type: 'activity/setGroup',
          payload: {
            scope_mode: value
          }
        });
      });
    };
    startChange = (value: any) => {
      this.props.dispatch({
        type: 'activity/setGroup',
        payload: {
          start_date: value
        }
      })
    }
    endChange = (value: any) => {
      this.props.dispatch({
        type: 'activity/setGroup',
        payload: {
          end_date: value
        }
      })
    }
    /**选择支付方式 */
    chooseMailMode = (type: string) => {
      this.props.dispatch({
        type: 'activity/setGroup',
        payload: {
          mail_mode: type
        }
      });
    }
    /**改变值 */
    handleName = (e: any) => {
      if (e.length <= 30) {
        this.props.dispatch({
          type: 'activity/setGroup',
          payload: {
            activity_name: e
          }
        });
      }
    }
    handleOldPrice = (e: any) => {
      if (e.indexOf('.') != 0) {
        if (e.split(".")[1] == undefined || (e.split(".")[1].length <= 2 && e.split(".")[2] == undefined)) {
          this.props.dispatch({
            type: 'activity/setGroup',
            payload: {
              old_price: e
            }
          });
        }
      }
    }
    handleNewPrice = (e: any) => {
      if (e.indexOf('.') != 0) {
        if (e.split(".")[1] == undefined || (e.split(".")[1].length <= 2 && e.split(".")[2] == undefined)) {
          this.props.dispatch({
            type: 'activity/setGroup',
            payload: {
              participation_money: e,
              gift_id: '',
              gift_pic: ''
            }
          });
        }
      }
    }
    handleNum = (e: any) => {
      if (e.indexOf(".") == -1 && e.length <= 2) {
        this.props.dispatch({
          type: 'activity/setGroup',
          payload: {
            group_number: e
          }
        });
      }
    }
    handleSum = (e: any) => {
      if (e.indexOf(".") == -1) {
        this.props.dispatch({
          type: 'activity/setGroup',
          payload: {
            group_sum: e
          }
        });
      }
    }
    handleValidity = (e: any) => {
      if (e.indexOf(".") == -1 && e.length <= 3) {
        this.props.dispatch({
          type: 'activity/setGroup',
          payload: {
            validity: e
          }
        });
      }
    }
    /**选择图片 */
    changeCover = (files: any) => {
      // this.props.dispatch({
      //   type: 'activity/setGroup',
      //   payload: {
      //     cover_img: files
      //   }
      // });
      Toast.loading('')
      if (files[0]) {
        let img = files[0].url;
        upload(img).then(res => {
          Toast.hide()
          let { data } = res;
          this.props.dispatch({
            type: 'activity/setGroup',
            payload: {
              cover_img: files,
              image: data.path
            }
          });
        });
      } else {
        Toast.hide()
        this.props.dispatch({
          type: 'activity/setGroup',
          payload: {
            image: '',
            cover_img: [],
          }
        });
      }
    }
    changeDescribe1 = (files: any) => {
      // this.props.dispatch({
      //   type: 'activity/setGroup',
      //   payload: {
      //     describe_img1: files
      //   }
      // });
      Toast.loading('')
      if (files[0]) {
        let img = files[0].url;
        upload(img).then(res => {
          Toast.hide()
          let { data } = res;
          this.props.dispatch({
            type: 'activity/setGroup',
            payload: {
              image_url1: data.path,
              describe_img1: files
            }
          });
        });
      } else {
        Toast.hide()
        this.props.dispatch({
          type: 'activity/setGroup',
          payload: {
            image_url1: '',
            describe_img1: []
          }
        });
      }
    }
    changeDescribe2 = (files: any) => {
      // this.props.dispatch({
      //   type: 'activity/setGroup',
      //   payload: {
      //     describe_img2: files
      //   }
      // });
      Toast.loading('')
      if (files[0]) {
        let img = files[0].url;
        upload(img).then(res => {
          Toast.hide()
          let { data } = res;
          this.props.dispatch({
            type: 'activity/setGroup',
            payload: {
              image_url2: data.path,
              describe_img2: files
            }
          });
        });
      } else {
        Toast.hide()
        this.props.dispatch({
          type: 'activity/setGroup',
          payload: {
            image_url2: '',
            describe_img2: []
          }
        });
      }
    }
    toGift = () => {
      router.push({ pathname: '/activitys/choosegift', query: { type: 1 } })
    }
    toSetting = () => {
      router.push({ pathname: '/activitys/setting/groupSetting' })
    }
    toNotice = () => {
      router.push({ pathname: '/activitys/notice', query: { type: 1 } })
    }

    /**确认发布 */
    confirm = async () => {
      let { activity_name, description, start_date, end_date, old_price, participation_money, group_number, group_sum, validity, image, image_url1, image_url2, gift_id, gift_pic, mail_mode, gift_name } = this.props.Group;

      if (group_sum == 0) {
        Toast.fail('开团数量不能为0', 2);
        return;
      }
      // if (validity == 0) {
      //   Toast.fail('有效期不能为0', 2);
      //   return;
      // }
      if (group_number == 0) {
        Toast.fail('成团人数不能为0', 2);
        return;
      }

      // 价格验证
      if (Number(participation_money) >= Number(old_price)) {
        Toast.fail('拼团价格必须低于商品原价，请重新设置', 2);
        return;
      }

      // 有效期验证
      if (validity < 1) {
        Toast.fail('有效期至少为一天', 2);
        return;
      }

      
      if (description.length < 1) {
        Toast.fail('使用须知不能为空', 2);
        return;
      }
      
      // 日期验证
      let startDate = new Date(start_date).getTime();
      let endDate = new Date(end_date).getTime();
      if (startDate > endDate) {
        Toast.fail('起始日期应大于结束日期', 2);
        return;
      }

      let a = moment(start_date).startOf('day')
      let activity_begin_time = moment(a._d).format('X')
      let b = moment(end_date).endOf('day')
      let activity_end_tine = moment(b).format('X');
      let image_url = [];
      image_url.push(image)
      image_url.push(image_url1);
      image_url.push(image_url2);
      if (activity_name && activity_begin_time && activity_end_tine && validity && participation_money && image_url1 && image_url2 && image && group_number && group_sum && old_price && mail_mode) {
        Toast.loading('');
        let res = await request({
          url: 'api/merchant/youhui/addYouhuiGroup',
          method: 'post',
          data: {
            name: activity_name,
            activity_begin_time: Number(activity_begin_time),
            activity_end_tine: Number(activity_end_tine),
            validity: validity * 1,
            participation_money: participation_money * 1,
            image_url,
            image,
            group_number: group_number * 1,
            group_sum: group_sum * 1,
            pay_money: old_price * 1,
            description,
            mail_mode,
            gift_id,
            gift_pic,
            gift_name
          }
        });
        // console.log('abc')
        let { data, message, code } = res;
        // console.log(res)
        if (code == 200) {
          if (data.order_sn) {
            this.props.dispatch({
              type: 'activity/setGroup',
              payload: {
                list: data
              }
            });
            router.push({ pathname: '/activitys/pay', query: { type: 1 } })
            Toast.hide();
          } else {
            this.props.dispatch({
              type: 'activity/Clean',
            })
            Toast.success(message, 2, () => {
              router.push('/activitys/group');
              Toast.hide();
            })
          }
        }
      } else {
        Toast.fail('请将信息填写完整', 2);
      }

    }
    handleShowSelectTime = () => { this.setState({ showSelectTime: true }) };
    //关闭时间选择
    closeModal = () => this.setState({ showSelectCoupon: false, showSelectTime: false, showSelectActivity: false });
    handleSelectTime = (time: any) => {
      this.props.dispatch({
        type: 'activity/setGroup',
        payload: {
          start_date: new Date(time.startTime).toString(),
          end_date: new Date(time.endTime).toString()
        }
      });
      this.setState({ ...time }, this.closeModal)
    };

    render() {
      const { start_date, end_date, activity_name, cover_img, describe_img1, describe_img2, old_price, participation_money, group_number, group_sum, validity } = this.props.Group;
      const chooseMail = this.props.Group.mail_mode == '1' ? (
        <Flex className={styles.choose}>
          <div style={{ marginRight: 17 }} onClick={this.chooseMailMode.bind(this, '1')}><img src={require('./image/choose.png')} />店家支付</div>
          <div onClick={this.chooseMailMode.bind(this, '2')}><img src={require('./image/no_choose.png')} />用户支付</div>
        </Flex>
      ) : (
          <Flex className={styles.choose}>
            <div style={{ marginRight: 17 }} onClick={this.chooseMailMode.bind(this, '1')}><img src={require('./image/no_choose.png')} />店家支付</div>
            <div onClick={this.chooseMailMode.bind(this, '2')}><img src={require('./image/choose.png')} />用户支付</div>
          </Flex>
        )

      const Gift = this.state.is_gift == true ? (
        <div>
          <Flex className={styles.giftBox}>
            <div style={{ color: "#666666" }}>配送方式</div>
            <Flex className={styles.choose}>
              {/* <div style={{marginRight: 17}}><img src={require('./image/choose.png')}/>到店自取</div> */}
              <div>邮寄</div>
            </Flex>
          </Flex>
          {/* <Flex className={styles.giftBox}><div>自选地址</div><Flex className={styles.choose}><div style={{marginRight: 17}}><img src={require('./image/choose.png')}/>使用店铺地址</div><div className={styles.address}>自定义</div></Flex></Flex> */}
          <Flex className={styles.giftBox}>
            <div style={{ color: "#666666" }}> 选择邮费({this.props.Group.postage ? this.props.Group.postage : ""}元/件)</div>
            {chooseMail}
          </Flex>
        </div>
      ) : (
          ''
        );
      const time = start_date ? new Date(start_date).getFullYear() + '-' + (new Date(start_date).getMonth() + 1) + '-' + new Date(start_date).getDate() + '至' + new Date(end_date).getFullYear() + '-' + (new Date(end_date).getMonth() + 1) + '-' + new Date(end_date).getDate() : '';

      return (
        <div style={{ width: '100%', height: 'auto', minHeight: '100%', background: '#fff', overflow: 'hidden', }}>
          {/* <div style={{ display }}> */}
          <WingBlank>
            <Flex className={styles.title}><div>活动设置</div></Flex>
            <List className={styles.input_Box}>
              {/* <Flex className={styles.pickerDate}>
                <DatePicker
                  mode="date"
                  title="起始日期"
                  extra="Optional"
                  value={start_date}
                  onChange={this.startChange}
                >
                  <List.Item arrow="horizontal">起始日期</List.Item>
                </DatePicker>
              </Flex>
              <Flex className={styles.pickerDate}>
                <DatePicker
                  mode="date"
                  title="结束日期"
                  extra="Optional"
                  value={end_date}
                  onChange={this.endChange}
                >
                  <List.Item arrow="horizontal">结束日期</List.Item>
                </DatePicker>
              </Flex> */}
              <InputItem className={styles.activity_name} placeholder="请输入活动名称" value={activity_name} onChange={this.handleName} clear>
                活动名称
              </InputItem>

              <Flex className={styles.notice} onClick={this.handleShowSelectTime}>
                <div style={{ color: "#666666" }}>活动时间</div>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  {time}
                  <Icon type="right" color='#999' className={styles.icon_right} />
                </div>
              </Flex>

              {/* <Flex className={styles.notice} onClick={this.toSetting}><div style={{ color: "#666666" }}>商品设置</div><div><Icon type="right" color='#999' className={styles.icon_right} /></div></Flex> */}

              {/* <div className={styles.cover_box}>
                <div>活动封面图</div>
                <div className={styles.cover_img}>
                  <ImagePicker
                    className={styles.upload_img}
                    files={cover_img}
                    multiple={false}
                    length={1}
                    selectable={cover_img.length < 1}
                    onChange={this.changeCover}
                  />
                </div>
              </div> */}

              <InputItem type={'money'} className={styles.textShort} value={old_price} onChange={this.handleOldPrice} extra='元'>
                商品原价
              </InputItem>
              <InputItem type={'money'} className={styles.textShort} value={participation_money} onChange={this.handleNewPrice} extra='元'>
                拼团价格
              </InputItem>
              <InputItem type={'money'} className={styles.textShort} value={group_number} onChange={this.handleNum} extra='人'>
                成团人数
              </InputItem>
              <InputItem className={styles.activity_name} placeholder="请输入团数" value={group_sum} onChange={this.handleSum} type={'money'}>
                开团数量
                <img src={ad_intro2} onClick={() => { this.setState({ prompt: !this.state.prompt }) }} />
              </InputItem>
              <div className={styles.activity_gropNum_msg} style={{ height: this.state.prompt ? 'auto' : '0px' }}>
                <p>
                  拼团数量*拼团人数=活动商品数量
                </p>
              </div>

              <InputItem type={'money'} className={styles.textLong} value={validity} onChange={this.handleValidity} extra='天可用'>
                有效期<span className={styles.left_text}>拼团成功后</span>
              </InputItem>
            </List>
            <Flex className={styles.notice} onClick={this.toNotice}>
              <div style={{ color: "#666666" }}>使用规则</div>
              <div className={styles.icon_right_box}>
                {
                  this.props.Group.description && this.props.Group.description.length != 0 ? '已设置' + this.props.Group.description.length + '条规则' : '请设置使用须知'
                }
                <Icon type="right" color='#999' className={styles.icon_right} />
              </div>
            </Flex>

            {/* <Flex className={styles.radio1}>
              <div className={styles.radioFlex}>
                <div className={styles.radioScope}>
                  <div className={styles.radioTitle}>
                    拼团时限
                        <img src={ad_intro2} onClick={() => { null }} />
                  </div>
                </div>
                <div className={styles.radioBox}>
                  {
                    this.props.Group.scope_mode == 0 ? (
                      <Flex className={styles.choose}>
                        <div className={styles.chooseBox} style={{ marginRight: 30 }} onClick={this.onScope.bind(this, 0)}><img src={require('./image/choose.png')} />24小时</div>
                        <div className={styles.chooseBox} style={{ marginRight: 30 }} onClick={this.onScope.bind(this, 1)}><img src={require('./image/no_choose.png')} />12小时</div>
                        <div className={styles.chooseBox} onClick={this.onScope.bind(this, 2)}><img src={require('./image/no_choose.png')} />3小时</div>
                      </Flex>
                    ) : (
                        this.props.Group.scope_mode == 1 ? (
                          <Flex className={styles.choose}>
                            <div className={styles.chooseBox} style={{ marginRight: 30 }} onClick={this.onScope.bind(this, 0)}><img src={require('./image/no_choose.png')} />24小时</div>
                            <div className={styles.chooseBox} style={{ marginRight: 30 }} onClick={this.onScope.bind(this, 1)}><img src={require('./image/choose.png')} />12小时</div>
                            <div className={styles.chooseBox} onClick={this.onScope.bind(this, 2)}><img src={require('./image/no_choose.png')} />3小时</div>
                          </Flex>
                        ) : (
                            <Flex className={styles.choose}>
                              <div className={styles.chooseBox} style={{ marginRight: 30 }} onClick={this.onScope.bind(this, 0)}><img src={require('./image/no_choose.png')} />24小时</div>
                              <div className={styles.chooseBox} style={{ marginRight: 30 }} onClick={this.onScope.bind(this, 1)}><img src={require('./image/no_choose.png')} />12小时</div>
                              <div className={styles.chooseBox} onClick={this.onScope.bind(this, 2)}><img src={require('./image/choose.png')} />3小时</div>
                            </Flex>
                          )
                      )
                  }
                </div>
              </div>
            </Flex> */}

            <Flex className={styles.img_title}>
              <div>图片详情</div>
            </Flex>
            <div className={styles.img_msg}>温馨提示：请上传横向的图片，建议图片比例为16:9。</div>
            <Flex className={styles.img_box}>
              <div className={styles.image}>
                <div className={styles.cover_img}>
                  <ImagePicker
                    className={styles.upload_img}
                    files={cover_img}
                    multiple={false}
                    length={1}
                    selectable={cover_img.length < 1}
                    onChange={this.changeCover}
                  />
                </div>
                <div className={styles.describe}>封面</div>
              </div>
              <div className={styles.image}>
                <div>
                  <ImagePicker
                    className={styles.upload_img}
                    files={describe_img1}
                    multiple={false}
                    length={1}
                    selectable={describe_img1.length < 1}
                    onChange={this.changeDescribe1}
                  />
                </div>
                <div className={styles.describe}></div>
              </div>


              <div className={styles.image}>
                <div>
                  <ImagePicker
                    className={styles.upload_img}
                    files={describe_img2}
                    multiple={false}
                    length={1}
                    selectable={describe_img2.length < 1}
                    onChange={this.changeDescribe2}
                  />
                </div>
                <div className={styles.describe}></div>
              </div>
            </Flex>

            <div className={styles.gift}>
              <Flex className={styles.title}><div>礼品设置</div></Flex>
              <div className={styles.gift_Box}>
                <Flex className={styles.giftBox} onClick={this.toGift}>
                  <div style={{ color: "#666666" }}>选择礼品</div>
                  <div className={styles.giftName} >
                    <div className={styles.giftName_title} >
                      {this.state.is_gift == true ? this.props.Group.gift_name : ""}</div>
                    <Icon type="right" color='#999' className={styles.icon_right} />
                  </div>
                </Flex>
                {Gift}
              </div>
            </div>
            <Flex className={styles.read}>
              {/* <img src={require('./image/tip.png')}/>创建必读 */}
            </Flex>
          </WingBlank>
          <Flex>
            {/* <div className={styles.button1} onClick={() => { router.push('/activitys/group/createGroup/activitygroup') }}>预览</div> */}
            <div className={styles.button2} onClick={this.confirm} style={{ width: "100%", left: "0" }}>确认发布</div>
          </Flex>
          <SelectTime
            show={this.state.showSelectTime}
            onClose={this.closeModal}
            onConfirm={this.handleSelectTime}
          />
        </div>

        // {chooseGift}

        // {payment}
        // </div>
      )
    }
  })
