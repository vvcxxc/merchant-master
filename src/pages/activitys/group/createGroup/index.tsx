/**title: 添加拼团活动 */
import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, DatePicker, List, InputItem, Icon, Toast, ImagePicker } from 'antd-mobile';
import upload from '@/services/oss';
import Notice from '../../components/notice/';
import PayMent from '../../components/payment'
import moment from 'moment'
import request from '@/services/request'
import router from 'umi/router';
import { connect } from 'dva';


const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

export default connect(({ activity }: any) => activity)(
  class createGroup extends Component<any> {
    state = {
      is_gift: false
    };
    componentDidMount() {
      if (this.props.Group.gift_id) {
        this.setState({ is_gift: true })
      }
      if (!this.props.Group.start_date) {
        this.props.dispatch({
          type: 'activity/setGroup',
          payload: {
            start_date: now
          }
        })
      }
      if (!this.props.Group.end_date) {
        this.props.dispatch({
          type: 'activity/setGroup',
          payload: {
            end_date: now
          }
        })
      }
    }
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
      this.props.dispatch({
        type: 'activity/setGroup',
        payload: {
          activity_name: e
        }
      });
    }
    handleOldPrice = (e: any) => {
      this.props.dispatch({
        type: 'activity/setGroup',
        payload: {
          old_price: e
        }
      });
    }
    handleNewPrice = (e: any) => {
      this.props.dispatch({
        type: 'activity/setGroup',
        payload: {
          participation_money: e,
          gift_id: '',
          gift_pic: ''
        }
      });
    }
    handleNum = (e: any) => {
      this.props.dispatch({
        type: 'activity/setGroup',
        payload: {
          group_number: e
        }
      });
    }
    handleSum = (e: any) => {
      this.props.dispatch({
        type: 'activity/setGroup',
        payload: {
          group_sum: e
        }
      });
    }
    handleValidity = (e: any) => {
      if (e.length > 3) {
        this.props.dispatch({
          type: 'activity/setGroup',
          payload: {
            validity: this.props.Group.validity
          }
        });
      } else {
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
      this.props.dispatch({
        type: 'activity/setGroup',
        payload: {
          cover_img: files
        }
      });
      if (files[0]) {
        let img = files[0].url;
        upload(img).then(res => {
          let { data } = res;
          this.props.dispatch({
            type: 'activity/setGroup',
            payload: {
              image: data.path
            }
          });
        });
      } else {
        this.props.dispatch({
          type: 'activity/setGroup',
          payload: {
            image: ''
          }
        });
      }
    }
    changeDescribe1 = (files: any) => {
      this.props.dispatch({
        type: 'activity/setGroup',
        payload: {
          describe_img1: files
        }
      });
      if (files[0]) {
        let img = files[0].url;
        upload(img).then(res => {
          let { data } = res;
          this.props.dispatch({
            type: 'activity/setGroup',
            payload: {
              image_url1: data.path
            }
          });
        });
      } else {
        this.props.dispatch({
          type: 'activity/setGroup',
          payload: {
            image_url1: ''
          }
        });
      }
    }
    changeDescribe2 = (files: any) => {
      this.props.dispatch({
        type: 'activity/setGroup',
        payload: {
          describe_img2: files
        }
      });
      if (files[0]) {
        let img = files[0].url;
        upload(img).then(res => {
          let { data } = res;
          this.props.dispatch({
            type: 'activity/setGroup',
            payload: {
              image_url2: data.path
            }
          });
        });
      } else {
        this.props.dispatch({
          type: 'activity/setGroup',
          payload: {
            image_url2: ''
          }
        });
      }
    }
    toGift = () => {
      router.push({ pathname: '/activitys/choosegift', query: { type: 1 } })
    }
    toNotice = () => {
      router.push({ pathname: '/activitys/notice', query: { type: 1 } })
    }

    /**确认发布 */
    confirm = async () => {
      let { activity_name, description, start_date, end_date, old_price, participation_money, group_number, group_sum, validity, image, image_url1, image_url2, gift_id, gift_pic, mail_mode, gift_name } = this.props.Group;
      let activity_begin_time = moment(start_date).format('X');
      let activity_end_tine = moment(end_date).format('X');
      let image_url = [];
      image_url.push(image_url1);
      image_url.push(image_url2);
      if (activity_name && activity_begin_time && activity_end_tine && validity && participation_money && image_url && image && group_number && group_sum && old_price && mail_mode) {
        Toast.loading('');
        let res = await request({
          url: 'api/merchant/youhui/addYouhuiGroup',
          method: 'post',
          data: {
            name: activity_name,
            activity_begin_time,
            activity_end_tine,
            validity,
            participation_money,
            image_url,
            image,
            group_number,
            group_sum,
            pay_money: old_price,
            description,
            mail_mode,
            gift_id,
            gift_pic,
            gift_name
          }
        });
        let { data, message, code } = res;
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
    render() {
      const { start_date, end_date, activity_name, cover_img, describe_img1, describe_img2, old_price, participation_money, group_number, group_sum, validity } = this.props.Group;
      const chooseMail = this.props.Group.mail_mode == '1' ? (
        <Flex className={styles.choose}>
          <div style={{ marginRight: 17 }} onClick={this.chooseMailMode.bind(this, '1')}><img src={require('./image/choose.png')} />联盟店支付</div>
          <div onClick={this.chooseMailMode.bind(this, '2')}><img src={require('./image/no_choose.png')} />用户支付</div>
        </Flex>
      ) : (
          <Flex className={styles.choose}>
            <div style={{ marginRight: 17 }} onClick={this.chooseMailMode.bind(this, '1')}><img src={require('./image/no_choose.png')} />联盟店支付</div>
            <div onClick={this.chooseMailMode.bind(this, '2')}><img src={require('./image/choose.png')} />用户支付</div>
          </Flex>
        )

      const Gift = this.state.is_gift == true ? (
        <div>
          <Flex className={styles.giftBox}>
            <div>配送方式</div>
            <Flex className={styles.choose}>
              {/* <div style={{marginRight: 17}}><img src={require('./image/choose.png')}/>到店自取</div> */}
              <div><img src={require('./image/choose.png')} />邮寄</div>
            </Flex>
          </Flex>
          {/* <Flex className={styles.giftBox}><div>自选地址</div><Flex className={styles.choose}><div style={{marginRight: 17}}><img src={require('./image/choose.png')}/>使用店铺地址</div><div className={styles.address}>自定义</div></Flex></Flex> */}
          <Flex className={styles.giftBox}>
            <div>选择邮费</div>
            {chooseMail}
          </Flex>
        </div>
      ) : (
          ''
        );

      return (
        <div style={{ width: '100%', height: 'auto', minHeight: '100%', background: '#fff', overflow: 'hidden', }}>
          {/* <div style={{ display }}> */}
          <WingBlank>
            <Flex className={styles.title}><div>活动设置</div></Flex>
            <List className={styles.input_Box}>
              <Flex className={styles.pickerDate}>
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
              </Flex>
              <InputItem className={styles.activity_name} placeholder="请输入活动名称" value={activity_name} onChange={this.handleName}>
                活动名称
              </InputItem>

              <div className={styles.cover_box}>
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
              </div>

              <InputItem type={'money'} className={styles.textShort} value={old_price} onChange={this.handleOldPrice} extra='元'>
                原价
              </InputItem>
              <InputItem type={'money'} className={styles.textShort} value={participation_money} onChange={this.handleNewPrice} extra='元'>
                拼团价
              </InputItem>
              <InputItem type={'money'} className={styles.textShort} value={group_number} onChange={this.handleNum} extra='人'>
                拼团人数
              </InputItem>
              <InputItem className={styles.activity_name} placeholder="请输入团数" value={group_sum} onChange={this.handleSum} type={'money'}>
                团数
              </InputItem>
              <InputItem type={'money'} className={styles.textLong} value={validity} onChange={this.handleValidity} extra='天内可用'>
                有效期<span className={styles.left_text}>领券日起</span>
              </InputItem>
            </List>
            <Flex className={styles.notice} onClick={this.toNotice}><div>使用须知</div><div><Icon type="right" color='#999' className={styles.icon_right} /></div>
            </Flex>
            <Flex className={styles.img_title}>
              <div>图片详情</div>
            </Flex>

            <Flex className={styles.img_box}>
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
                <div className={styles.describe}>图片描述</div>
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
                <div className={styles.describe}>图片描述</div>
              </div>
            </Flex>

            <div className={styles.gift}>
              <Flex className={styles.title}><div>礼品设置</div></Flex>
              <div className={styles.gift_Box}>
                <Flex className={styles.giftBox} onClick={this.toGift}><div>选择礼品</div><div><Icon type="right" color='#999' className={styles.icon_right} /></div>
                </Flex>
                {Gift}
              </div>
            </div>
            <Flex className={styles.read}>
              {/* <img src={require('./image/tip.png')}/>创建必读 */}
            </Flex>
          </WingBlank>
          <Flex>
            <div className={styles.button1} onClick={() => { router.push('/activitys/group/createGroup/activitygroup') }}>预览</div>
            <div className={styles.button2} onClick={this.confirm}>确认发布</div>
          </Flex>
        </div>

        // {chooseGift}

        // {payment}
        // </div>
      )
    }
  })
