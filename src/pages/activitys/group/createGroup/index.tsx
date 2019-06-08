import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, DatePicker, List, InputItem, Icon, Toast, ImagePicker } from 'antd-mobile';
import upload from '@/services/oss';
import ChooseGift from '../../components/choosegift/';
import Notice from '../../components/notice/';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

export default class createGroup extends Component {
  state = {
    start_date: now,
    end_date: now,
    is_gift: false,
    is_show: false,
    /**支付方式 */
    mail_mode: '1',
    /**活动名字 */
    activity_name: '',
    /**原价 */
    old_price: '',
    /**拼团价 */
    participation_money: '',
    /**拼团人数 */
    group_number: '',
    /**团数 */
    group_sum: '',
    /**有效期 */
    validity: '',
    /**图片base64 */
    cover_img: [],
    describe_img1: [],
    describe_img2: [],
    /**图片路径 */
    image: '',
    image_url1: '',
    image_url2: '',
    /**礼品id */
    gift_id: '',
    /**礼品图片 */
    gift_pic: ''
  };
  startChange = (value: any) => {
    this.setState({start_date: value})
  }
  endChange = (value: any) => {
    this.setState({end_date: value})
  }
  /**选择支付方式 */
  chooseMailMode = (type: string) =>{
  this.setState({mail_mode: type})
  }
  /**改变值 */
  handleName = (e: any) => {
    this.setState({activity_name: e})
  }
  handleOldPrice = (e: any) => {
    this.setState({old_price: e})
  }
  handleNewPrice = (e: any) => {
    this.setState({participation_money: e})
  }
  handleNum = (e: any) => {
    this.setState({group_number: e})
  }
  handleSum = (e: any) => {
    this.setState({group_sum: e})
  }
  handleValidity = (e: any) => {
    this.setState({validity: e})
  }
  /**选择图片 */
  changeCover = ( files: any ) => {
    this.setState({
      cover_img: files
    });
    if(files[0]){
      let img = files[0].url;
      upload(img).then(res => {
        let { data } = res;
        this.setState({image: data.path})
      });
    }
  }
  changeDescribe1 = ( files: any ) => {
    this.setState({
      describe_img1: files
    });
    if(files[0]){
      let img = files[0].url;
      upload(img).then(res => {
        let { data } = res;
        this.setState({image_url1: data.path});
      });
    }
  }
  changeDescribe2 = ( files: any ) => {
    this.setState({
      describe_img2: files
    });
    if(files[0]){
      let img = files[0].url;
      upload(img).then(res => {
        let { data } = res;
        this.setState({image_url2: data.path});
      });
    }
  }

  /**选择礼品的回调 */
  changeGift = (id: string, is_show: boolean, gift_pic: string) =>{
    if(id){
      this.setState({is_gift: true})
    }else{
      this.setState({is_gift: false})
    }
    this.setState({
      gift_id: id,
      is_show,
      gift_pic
    })
  }
  toGift = () => {
    this.setState({
      is_show: true
    })
  }

  render (){
    const { cover_img, describe_img1, describe_img2 } = this.state;
    const chooseGift = this.state.is_show == true ? (
      <ChooseGift onChange={this.changeGift} id={this.state.gift_id}/>
    ) : (
      ''
    )
    const chooseMail = this.state.mail_mode == '1' ? (
      <Flex className={styles.choose}>
        <div style={{marginRight: 17}} onClick={this.chooseMailMode.bind(this,'1')}><img src={require('./image/choose.png')}/>联盟店支付</div>
        <div onClick={this.chooseMailMode.bind(this,'2')}><img src={require('./image/no_choose.png')}/>用户支付</div>
      </Flex>
    ) : (
      <Flex className={styles.choose}>
        <div style={{marginRight: 17}} onClick={this.chooseMailMode.bind(this,'1')}><img src={require('./image/no_choose.png')}/>联盟店支付</div>
        <div onClick={this.chooseMailMode.bind(this,'2')}><img src={require('./image/choose.png')}/>用户支付</div>
      </Flex>
    )

    const Gift = this.state.is_gift == true ? (
      <div>
        <Flex className={styles.giftBox}>
          <div>配送方式</div>
          <Flex className={styles.choose}>
            <div style={{marginRight: 17}}><img src={require('./image/choose.png')}/>到店自取</div>
            <div><img src={require('./image/choose.png')}/>邮寄</div>
          </Flex>
        </Flex>
        <Flex className={styles.giftBox}>
          <div>自选地址</div>
          <Flex className={styles.choose}>
            <div style={{marginRight: 17}}><img src={require('./image/choose.png')}/>使用店铺地址</div>
            <div className={styles.address}>自定义</div>
          </Flex>
        </Flex>
        <Flex className={styles.giftBox}>
          <div>选择邮费</div>
          {chooseMail}
        </Flex>
      </div>
    ) : (
      ''
    );

    return (
      <div style={{width: '100%', height: 'auto', minHeight: '100%', background: '#fff'}}>
        <WingBlank>
          <Flex className={styles.title}><div>活动设置</div></Flex>
          <List className={styles.input_Box}>
            <Flex className={styles.pickerDate}>
              <DatePicker
                mode="date"
                title="起始日期"
                extra="Optional"
                value={this.state.start_date}
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
                value={this.state.end_date}
                onChange={this.endChange}
              >
                <List.Item arrow="horizontal">结束日期</List.Item>
              </DatePicker>
            </Flex>
            <InputItem className={styles.activity_name} placeholder="请输入活动名称" value={this.state.activity_name} onChange={this.handleName}>
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

            <InputItem type={'digit'} className={styles.textShort} value={this.state.old_price} onChange={this.handleOldPrice}>
              原价<span className={styles.right_text}>元</span>
            </InputItem>
            <InputItem type={'digit'} className={styles.textShort} value={this.state.participation_money} onChange={this.handleNewPrice}>
              拼团价<span className={styles.right_text}>元</span>
            </InputItem>
            <InputItem type={'digit'} className={styles.textShort} value={this.state.group_number} onChange={this.handleNum}>
              拼团人数<span className={styles.right_text}>人</span>
            </InputItem>
            <InputItem className={styles.activity_name} placeholder="请输入团数" value={this.state.group_sum} onChange={this.handleSum} type={'digit'}>
              团数
            </InputItem>
            <InputItem type={'digit'} className={styles.textLong} placeholder="发起券日起  " value={this.state.validity} onChange={this.handleValidity}>
              有效期<span className={styles.right_text}>天可用</span>
            </InputItem>
          </List>
          <Flex className={styles.notice}><div>使用须知</div><div><Icon type="right"  color='#999' className={styles.icon_right}/></div>
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
              <Flex className={styles.giftBox}  onClick={this.toGift}><div>选择礼品</div><div><Icon type="right"  color='#999' className={styles.icon_right}/></div>
              </Flex>
              {Gift}
            </div>
          </div>
        </WingBlank>
        <Flex>
          <div className={styles.button}>确认发布</div>
        </Flex>
        {chooseGift}
        <Notice/>
      </div>
    )
  }
}
