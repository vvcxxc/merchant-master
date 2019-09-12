/**title: 添加好友增值 */
import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, DatePicker, List, InputItem, Icon, Toast, Radio, ImagePicker } from 'antd-mobile';
import moment from 'moment'
import request from '@/services/request'
import router from 'umi/router';
import { connect } from 'dva';
import upload from '@/services/oss';
import ReactDOM from 'react-dom';
import SelectTime from '@/components/select-time';
import ad_intro2 from '@/assets/ad/ad_intro2.png'

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp).toString();
const RadioItem = Radio.RadioItem;
export default connect(({ activity }: any) => activity)(
  class createAppreciation extends Component<any> {
    state = {
      Close1: false,
      Close2: false,
      /**显示选择时间 */
      showSelectTime: false,
      startTime: undefined,
      endTime: undefined,
      /**存在礼品？ */
      is_gift: false,
      /**去支付？ */
      is_pay: false,
      /**起名方式*/
      value: 0,
      /**券范围*/
      activity_coupons_type: 0,
      /**显示温馨提示 */
      prompt: false
    };
    componentDidMount() {
      console.log(this.props.Appreciation)
      if (this.props.Appreciation.gift_id) {
        this.setState({ is_gift: true })
      }
      this.setState({ value: this.props.Appreciation.name_mode }, () => {
      })
      // if (!this.props.Appreciation.start_date) {
      //   this.props.dispatch({
      //     type: 'activity/setAppreciation',
      //     payload: {
      //       start_date: now
      //     }
      //   })
      // }
      // if (!this.props.Appreciation.end_date) {
      //   this.props.dispatch({
      //     type: 'activity/setAppreciation',
      //     payload: {
      //       end_date: now
      //     }
      //   })
      // }
    }



    /**改变值 */
    activityNameChange = (e: any) => {
      this.props.dispatch({
        type: 'activity/setAppreciation',
        payload: {
          activityName: e
        }
      });
    }
    handleStartPri = (e: any) => {
      if (/^[0-9]+\.+[0-9]\d{0,1}$/.test(e.target.value) || /^[0-9]+\.?$/.test(e.target.value) || e.target.value == "") {
        this.props.dispatch({
          type: 'activity/setAppreciation',
          payload: {
            start_price: e.target.value
          }
        });
      }
    }
    handleEndPri = (e: any) => {
      if (/^[0-9]+\.+[0-9]\d{0,1}$/.test(e.target.value) || /^[0-9]+\.?$/.test(e.target.value) || e.target.value == "") {
        this.props.dispatch({
          type: 'activity/setAppreciation',
          payload: {
            end_price: e.target.value
          }
        });
      }
    }
    clearPri1 = () => {
      this.props.dispatch({
        type: 'activity/setAppreciation',
        payload: {
          start_price: ""
        }
      });
    }
    clearPri2 = () => {
      this.props.dispatch({
        type: 'activity/setAppreciation',
        payload: {
          end_price: ""
        }
      });
    }
    handlePeopleNum = (e: any) => {
      if (e.indexOf(".") == -1 && e.length <= 2) {
        this.props.dispatch({
          type: 'activity/setAppreciation',
          payload: {
            appreciation_number_sum: e
          }
        });
      }
    }
    handleValidity = (e: any) => {
      if (e.indexOf(".") == -1 && e.length <= 3) {
        this.props.dispatch({
          type: 'activity/setAppreciation',
          payload: {
            validity: e
          }
        });
      }
    }
    handlePayMoney = (e: any) => {
      if (e.split(".")[1] == undefined || (e.split(".")[1].length <= 2 && e.split(".")[2] == undefined)) {
        this.props.dispatch({
          type: 'activity/setAppreciation',
          payload: {
            pay_money: e,
            gift_id: '',
            gift_pic: ''
          }
        });
      }
    }
    handleTotalNum = (e: any) => {
      if (e.indexOf(".") == -1) {
        this.props.dispatch({
          type: 'activity/setAppreciation',
          payload: {
            total_num: e
          }
        });
      }
    }
    handleTotalFee = (e: any) => {
      if (e.split(".")[1] == undefined || (e.split(".")[1].length <= 2 && e.split(".")[2] == undefined)) {
        this.props.dispatch({
          type: 'activity/setAppreciation',
          payload: {
            total_fee: e
          }
        });
      }
    }
    startChange = (value: any) => {
      this.props.dispatch({
        type: 'activity/setAppreciation',
        payload: {
          start_date: value
        }
      });
    }
    endChange = (value: any) => {
      this.props.dispatch({
        type: 'activity/setAppreciation',
        payload: {
          end_date: value
        }
      });
    }

    toGift = () => {
      router.push({ pathname: '/activitys/choosegift', query: { type: 2 } })
    }

    /**选择支付方式 */
    chooseMailMode = (type: string) => {
      this.props.dispatch({
        type: 'activity/setAppreciation',
        payload: {
          mail_mode: type
        }
      });
    }
    /**选择起名方式 */
    onChange = (value: any) => {
      this.setState({
        value,
      }, () => {
        this.props.dispatch({
          type: 'activity/setAppreciation',
          payload: {
            name_mode: value
          }
        });
      });
    };
    /**选择券范围 */
    onScope = (value: any) => {
      this.setState({
        activity_coupons_type: value,
      }, () => {
        this.props.dispatch({
          type: 'activity/setAppreciation',
          payload: {
            activity_coupons_type: value
          }
        });
      });
    };

    //打开时间选择
    handleShowSelectTime = () => { this.setState({ showSelectTime: true }) };
    //关闭时间选择
    closeModal = () => this.setState({ showSelectCoupon: false, showSelectTime: false, showSelectActivity: false });
    handleSelectTime = (time: any) => {
      this.props.dispatch({
        type: 'activity/setAppreciation',
        payload: {
          start_date: new Date(time.startTime).toString(),
          end_date: new Date(time.endTime).toString()
        }
      });
      this.setState({ ...time }, this.closeModal)
    };


    /**提交 */
    submit = async () => {
      const { activityName, start_price, end_price, appreciation_number_sum, validity, pay_money, total_num, total_fee, start_date, end_date, gift_id, mail_mode, gift_pic, gift_name, description, activity_coupons_type, image, image_url1, image_url2, } = this.props.Appreciation

      // 自定义名称
      if (this.state.value == 1 && !activityName) {
        Toast.fail('请输入自定义名称', 2);
        return;
      }

      // 日期验证
      let startDate = new Date(start_date).getTime();
      let endDate = new Date(end_date).getTime();
      console.log(this.props.Appreciation)

      //起始结束日期效验
      if (startDate > endDate) {
        Toast.fail('结束日期应大于起始日期');
        return;
      }
      if (startDate === endDate) {
        Toast.fail('活动时间不能同一天');
        return;
      }

      //起始封顶值效验
      if (end_price * 1 <= start_price * 1) {
        Toast.fail('封顶值应大于起始值');
        return;
      }

      if (appreciation_number_sum < 2 || appreciation_number_sum > 18) {
        Toast.fail('助力人数应在2至18之间', 2);
        return;
      }

      let image_url;
      if (this.props.Appreciation.activity_coupons_type == 1) {
        image_url = undefined;
      } else {
        image_url = [];
        image_url.push(image_url1);
        image_url.push(image_url2);
      }

      // let image_url = [];
      // image_url.push(image_url1);
      // image_url.push(image_url2);

      let a = moment(start_date).startOf('day')
      let activity_begin_time = moment(a._d).format('X')
      let b = moment(end_date).endOf('day')
      let activity_end_tine = moment(b).format('X');
      if ((this.props.Appreciation.activity_coupons_type == 1 && start_price && end_price && appreciation_number_sum && validity && pay_money && total_num && total_fee && start_date && end_date && mail_mode) ||
        (this.props.Appreciation.activity_coupons_type != 1 && start_price && end_price && appreciation_number_sum && validity && pay_money && total_num && total_fee && start_date && end_date && mail_mode && image_url1 && image_url2 && image)) {
        Toast.loading('');
        let res = await request({
          url: 'api/merchant/youhui/addYouhuiAppreciation',
          method: 'post',
          data: {
            activity_coupons_type,
            total_num: total_num * 1,
            pay_money: pay_money * 1,
            validity: validity * 1,
            init_money: start_price * 1,
            return_money: end_price * 1,
            activity_begin_time: Number(activity_begin_time),
            activity_end_tine: Number(activity_end_tine),
            total_fee: total_fee * 1,
            gift_id,
            mail_mode,
            gift_pic,
            gift_name,
            appreciation_number_sum: appreciation_number_sum * 1,
            activity_name: this.state.value == 0 ? "" : activityName,
            description: this.props.Appreciation.activity_coupons_type != 1 ? description : undefined,
            image: this.props.Appreciation.activity_coupons_type != 1 ? image : undefined,
            image_url
          }
        });
        let { data, message } = res;
        if (data.order_sn) {
          // 支付去
          this.props.dispatch({
            type: 'activity/setAppreciation',
            payload: {
              list: data
            }
          });
          router.push({ pathname: '/activitys/pay', query: { type: 2 } })
          Toast.hide();
        } else {
          Toast.success(message, 2, () => {
            this.props.dispatch({
              type: 'activity/Clean',
            })
              router.push('/activitys/appreciation');
            Toast.hide();
          })
        }
      } else {
        Toast.fail('请填写完整', 2)
      }

    }

    handleCheckAppreciationNumber(v: any) {
      let DomArr = document.getElementsByClassName('fake-input');
      v = Number(v);
      if (v < 2 || v > 18) {
        for (var i = 0; i < DomArr.length; i++) {
          DomArr[i].classList.remove('focus')
        }
        Toast.fail('助力人数应在2至18之间', 2, () => {
          // this.refs.appreciationNumber.clearInput();
          this.refs.appreciationNumber.focus();
        });
      }
    }
    toSetting = () => {
      router.push({ pathname: '/activitys/setting/appreSetting' })
    }
    toNotice = () => {
      router.push({ pathname: '/activitys/notice', query: { type: 2 } })
    }

    changeCover = (files: any) => {
      // this.props.dispatch({
      //   type: 'activity/setAppreciation',
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
            type: 'activity/setAppreciation',
            payload: {
              cover_img: files,
              image: data.path
            }
          });
        });
      } else {
        Toast.hide()
        this.props.dispatch({
          type: 'activity/setAppreciation',
          payload: {
            image: '',
            cover_img: [],
          }
        });
      }
    }
    changeDescribe1 = (files: any) => {
      // this.props.dispatch({
      //   type: 'activity/setAppreciation',
      //   payload: {
      //     describe_img1: files
      //   }
      // });
      console.log(files);
      Toast.loading('')
      if (files[0]) {
        let img = files[0].url;
        upload(img).then(res => {
          Toast.hide()
          let { data } = res;
          this.props.dispatch({
            type: 'activity/setAppreciation',
            payload: {
              image_url1: data.path,
              describe_img1: files
            }
          });
        });
      } else {
        Toast.hide()
        this.props.dispatch({
          type: 'activity/setAppreciation',
          payload: {
            image_url1: '',
            describe_img1: []
          }
        });
      }
    }
    changeDescribe2 = (files: any) => {
      // this.props.dispatch({
      //   type: 'activity/setAppreciation',
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
            type: 'activity/setAppreciation',
            payload: {
              image_url2: data.path,
              describe_img2: files
            }
          });
        });
      } else {
        Toast.hide()
        this.props.dispatch({
          type: 'activity/setAppreciation',
          payload: {
            image_url2: '',
            describe_img2: []
          }
        });
      }
    }


    render() {
      const chooseMail = this.props.Appreciation.mail_mode == '1' ? (
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
              <div>
                {/* <img src={require('./image/choose.png')} /> */}
                邮寄</div>
            </Flex>
          </Flex>
          {/* <Flex className={styles.giftBox}><div>自选地址</div><Flex className={styles.choose}><div style={{marginRight: 17}}><img src={require('./image/choose.png')}/>使用店铺地址</div><div className={styles.address}>自定义</div></Flex></Flex> */}
          <Flex className={styles.giftBox}>
            <div style={{ color: "#666666" }}> 选择邮费({this.props.Appreciation.postage ? this.props.Appreciation.postage : ""}元/件)</div>
            {chooseMail}
          </Flex>
          <div style={{ width: '100%', height: '90px' }}>{''}</div>
        </div>
      ) : (
          ''
        );



      const { activityName, start_price, end_price, appreciation_number_sum, validity, pay_money, total_num, total_fee, display, start_date, end_date, cover_img, describe_img1, describe_img2 } = this.props.Appreciation

      const { value } = this.state;
      // const time = this.state.startTime
      //   ? this.state.startTime +
      //   '至' +
      //   this.state.endTime
      //   : '';
      const time = start_date ? new Date(start_date).getFullYear() + '-' + (new Date(start_date).getMonth() + 1) + '-' + new Date(start_date).getDate() + '至' + new Date(end_date).getFullYear() + '-' + (new Date(end_date).getMonth() + 1) + '-' + new Date(end_date).getDate() : '';
      return (
        <div style={{ width: '100%', height: 'auto', minHeight: '100%', background: '#fff' }}>
          <div>
            <WingBlank>
              <Flex className={styles.title}><div>活动设置</div></Flex>
              <List className={styles.input_Box}>

                <Flex className={styles.radio0}>
                  <div className={styles.radioFlex}>
                    <div className={styles.radioScope}>
                      <div className={styles.radioTitle}>
                        活动范围
                        <img src={ad_intro2} onClick={() => { this.setState({ prompt: !this.state.prompt }) }} />
                      </div>
                    </div>
                    <div className={styles.radioBox}>
                      {
                        this.props.Appreciation.activity_coupons_type == 1 ? (
                          <Flex className={styles.choose}>
                            <div className={styles.chooseBox} style={{ marginRight: 80 }} onClick={this.onScope.bind(this, 1)}><img src={require('./image/choose.png')} />全场通用券</div>
                            <div className={styles.chooseBox} onClick={this.onScope.bind(this, 2)}><img src={require('./image/no_choose.png')} />品类券</div>
                          </Flex>
                        ) : (
                            <Flex className={styles.choose}>
                              <div className={styles.chooseBox} style={{ marginRight: 80 }} onClick={this.onScope.bind(this, 1)}><img src={require('./image/no_choose.png')} />全场通用券</div>
                              <div className={styles.chooseBox} onClick={this.onScope.bind(this, 2)}><img src={require('./image/choose.png')} />品类券</div>
                            </Flex>
                          )
                      }
                    </div>
                  </div>
                </Flex>
                <div className={styles.radio0_space} style={{ height: this.state.prompt ? "auto" : 0 }}>
                  <div className={styles.radio0_msg}>
                    <p>
                      温馨提示：1.全场通用券可应用于店铺所有商品，在顾客扫码支付时选择该卡券进行使用；可设置使用门槛，但不受时间等因素限制。
                  </p>
                    <p>
                      2.品类券可指定店铺某类或某件商品使用，顾客使用时，需要店铺进行扫码核销；发券时可设置相应的使用规则。
                 </p>
                  </div>
                </div>
                <Flex className={styles.radio}>
                  <div className={styles.radioFlex}>
                    <div className={styles.radioScope}>活动名称</div>
                    <div className={styles.radioBox}>
                      {
                        this.props.Appreciation.name_mode == 0 ? (
                          <Flex className={styles.choose}>
                            <div className={styles.chooseBox} style={{ marginRight: 17 }} onClick={this.onChange.bind(this, 0)}><img src={require('./image/choose.png')} />默认活动名称（推荐）</div>
                            <div className={styles.chooseBox} onClick={this.onChange.bind(this, 1)}><img src={require('./image/no_choose.png')} />自定义名称</div>
                          </Flex>
                        ) : (
                            <Flex className={styles.choose}>
                              <div className={styles.chooseBox} style={{ marginRight: 17 }} onClick={this.onChange.bind(this, 0)}><img src={require('./image/no_choose.png')} />默认活动名称（推荐）</div>
                              <div className={styles.chooseBox} onClick={this.onChange.bind(this, 1)}><img src={require('./image/choose.png')} />自定义名称</div>
                            </Flex>
                          )
                      }
                    </div>
                  </div>
                </Flex>
                <Flex className={styles.activity_space}>
                  {
                    this.state.value == 0 ? (
                      <span>从{start_price ? start_price : 0}元增值至{end_price ? end_price : 0}元</span>
                    ) : (
                        <InputItem
                          placeholder="请输入活动名称"
                          value={activityName}
                          onChange={this.activityNameChange}
                          clear
                        />
                      )
                  }
                </Flex>
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
                <Flex className={styles.notice} onClick={this.handleShowSelectTime}>
                  <div>活动时间</div>
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    {time}
                    <Icon type="right" color='#999' className={styles.icon_right} />
                  </div>
                </Flex>

                <Flex className={styles.appreInterval}>
                  <div>增值区间</div>
                  <div className={styles.intervalbox} >
                    <div className={styles.inputBox} >
                      {/* <div className={styles.inputClose} style={{ display: this.state.Close1 ? "block" : "none" }} onClick={this.clearPri1}></div> */}
                      <input className={styles.textInterval} type="text" onChange={this.handleStartPri} value={start_price ? start_price : ""} onFocus={() => { this.setState({ Close1: true }) }} onBlur={() => { setTimeout(() => { this.setState({ Close1: false }) }, 4) }} placeholder='请输入' style={{ textAlign: this.state.Close1 ? "center" : "center" }} />
                    </div>
                    元 增值至
                    <div className={styles.inputBox} >
                      {/* <div className={styles.inputClose} style={{ display: this.state.Close2 ? "block" : "none" }} onClick={this.clearPri2}></div> */}
                      <input className={styles.textInterval} type="text" onChange={this.handleEndPri} value={end_price ? end_price : ""} onFocus={() => { this.setState({ Close2: true }) }} onBlur={() => { setTimeout(() => { this.setState({ Close2: false }) }, 4) }} placeholder='请输入' style={{ textAlign: this.state.Close2 ? "center" : "center" }} />
                    </div>
                    元
                  </div>
                </Flex>
                {/* <InputItem type={'money'} className={styles.textShort} onChange={this.handleStartPri} value={start_price} placeholder='请输入 ' extra='元' clear>
                  起始值
              </InputItem>
                <InputItem type={'money'} className={styles.textShort} onChange={this.handleEndPri} value={end_price} placeholder='请输入 ' extra='元' clear>
                  封顶值
              </InputItem> */}
                <InputItem type={'money'} className={styles.textShort} onChange={this.handlePeopleNum} value={appreciation_number_sum} placeholder='请输入 ' extra='人' ref="appreciationNumber" >
                  助力人数
              </InputItem>
                <InputItem type={'money'} className={styles.textShort} onChange={this.handlePayMoney} value={pay_money} placeholder='请输入 ' extra='元' >
                  购买价格
              </InputItem>
                <InputItem type={'money'} className={styles.textLong_door} onChange={this.handleTotalFee} value={total_fee} extra='元可用' >
                  使用门槛 {/* <span className={styles.left_text_door}>满</span> */}
                </InputItem>
                <InputItem type={'money'} className={styles.textLong} onChange={this.handleValidity} value={validity} extra='天内可用' >
                  有效期
                  <span className={styles.left_text}>发券日起</span>
                </InputItem>
                <InputItem type={'money'} className={styles.textShort} onChange={this.handleTotalNum} value={total_num} extra='张' >
                  发放数量
              </InputItem>
                {/* <Flex className={styles.notice} onClick={this.toSetting}><div>商品设置</div><div><Icon type="right" color='#999' className={styles.icon_right} /></div></Flex> */}

                {
                  this.props.Appreciation.activity_coupons_type != 1 ? <Flex className={styles.notice} onClick={this.toNotice}><div>使用规则</div><div><Icon type="right" color='#999' className={styles.icon_right} /></div></Flex>
                    : null
                }
              </List>

              {
                this.props.Appreciation.activity_coupons_type != 1 ? <div>
                  <Flex className={styles.img_title}>
                    <div>活动图片</div>
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
                </div> : null
              }


              <Flex className={styles.title}><div>礼品设置</div></Flex>
              <div className={styles.gift_Box}>
                <Flex className={styles.giftBox} onClick={this.toGift}>
                  <div style={{ color: "#666666" }}>选择礼品</div>
                  <div className={styles.giftName} >
                    <div className={styles.giftName_title} >
                      {this.state.is_gift == true ? this.props.Appreciation.gift_name : ""}</div>
                    <Icon type="right" color='#999' className={styles.icon_right} />
                  </div>
                </Flex>
                {Gift}
                <div style={{ width: '100%', height: '.88rem' }}>{''}</div>
              </div>
            </WingBlank>

            <Flex>
              {/* <div className={styles.button1} onClick={()=>{router.push('/activitys/appreciation/createAppreciation/appreciation')}}>预览</div> */}
              <div className={styles.button2} onClick={this.submit} style={{ width: "100%", left: "0" }}>确认发布</div>
            </Flex>
          </div>
          <SelectTime
            show={this.state.showSelectTime}
            onClose={this.closeModal}
            onConfirm={this.handleSelectTime}
          />
        </div>

      )
    }
  })
