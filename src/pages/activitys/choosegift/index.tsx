import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, Radio, Toast  } from 'antd-mobile';
import request from '@/services/request'
import { connect } from 'dva';
import router from 'umi/router';
// 跳转过来时type=1为拼团，=2为增值
export default connect(({ activity }: any) => activity)(
  class ChooseGift extends Component<any> {
  state = {
    list: [],
    value: null,
    id: '',
    is_show: false,
    gift_pic: '',
    gift_name: '',
    display: 'block',
    is_details: false,
    gift_id: '',
    type: '0'
  };
  componentDidMount(){
    let money = 0;
    let type = this.props.location.query.type;
    this.setState({type})
    if (type == 1){
      // 拼团
      money = this.props.Group.participation_money
    }else if (type == 2){
      // 增值
      money = this.props.Appreciation.pay_money
    }
    if(money){
      request({
        url: 'api/integral_goods',
        method: 'get',
        params: {
          price: money
        }
      }).then(res => {
        let { data } = res;
        this.setState({list: data});
      })
      if(this.props.Group.gift_id){
        if(type == 1){
          this.setState({id: this.props.Group.gift_id, value: this.props.Group.gift_id})
        }else{
          this.setState({id: this.props.Appreciation.gift_id, value: this.props.Appreciation.gift_id})
        }
      }
    }
  }
  chooseOne = (id: string, gift_pic: string, gift_name: string,postage:string) => {
    this.setState({
      value: id,
    });
      if (this.state.type == '1'){
        this.props.dispatch({
          type: 'activity/setGroup',
          payload: {
            gift_id: id,
            gift_pic,
            gift_name,
            postage
          }
        })
      }else if(this.state.type == '2'){
        this.props.dispatch({
          type: 'activity/setAppreciation',
          payload: {
            gift_id: id,
            gift_pic,
            gift_name,
            postage
          }
        })
      }
  }

  /**确认 */
  submit = () => {
      if (this.state.type == '1'){
        const {gift_id, gift_pic, gift_name} = this.props.Group
        this.props.dispatch({
          type: 'activity/setGroup',
          payload: {
            gift_id,
            gift_pic,
            gift_name
          }
        })
        router.push('/activitys/group/createGroup')
      }else if(this.state.type == '2'){
        const {gift_id, gift_pic, gift_name} = this.props.Appreciation
        this.props.dispatch({
          type: 'activity/setAppreciation',
          payload: {
            gift_id,
            gift_pic,
            gift_name
          }
        })
        router.push('/activitys/appreciation/createAppreciation')
      }


  }
  /**取消 */
  cancel = () => {
    let id = '';
    let gift_pic = '';
    let gift_name = '';
    if (this.state.type == '1'){
      this.props.dispatch({
        type: 'activity/setGroup',
        payload: {
          gift_id:id,
          gift_pic,
          gift_name
        }
      })
      router.push('/activitys/group/createGroup')
    }else if(this.state.type == '2'){
      this.props.dispatch({
        type: 'activity/setAppreciation',
        payload: {
          gift_id:id,
          gift_pic,
          gift_name
        }
      })
      router.push('/activitys/appreciation/createAppreciation')
    }

  }

  /**详情 */
  openDetails = (id: string, pic: string, name: string) => {
    // this.setState({is_details: true, gift_id: id, display: 'none'})
    router.push({
      pathname:'/activitys/giftdetails',
      query: {
        id,
        type:this.props.location.query.type,
        pic,
        name
      }
    })
  }

  render (){
    const { value } = this.state;
    const list = this.state.list.map((item: any, idx: number) => {
      if (!this.state.list[0] || this.state.list[0]=== '金额不能为空') return
      return (
        <Flex className={styles.giftBox} key={idx}>
          <div className={styles.image}><img src={item.cover_image}/></div>
          <div className={styles.text}>
            <div className={styles.name} onClick={this.openDetails.bind(this,item.id,item.cover_image,item.title)}><div>{item.title}</div></div>
            <div className={styles.prices}>
              <span style={{color: '#666', marginRight: 32}}>快递{item.postage}元</span>
              <span style={{color: '#F55641'}}>单价：{item.price}元</span>
              <Radio className={styles.icon} onChange={this.chooseOne.bind(this,item.id,item.cover_image,item.title,item.postage)} checked={value === item.id} defaultChecked={false}/>
            </div>
          </div>
        </Flex>
      )
    })

    const noGift = (
      <div className={styles.no_giftBox} >
        <div className={styles.gift_img}>
          <img src={require('../../../assets/gift_icon.png')} />
        </div>
        <div className={styles.centerBox}>
          <div className={styles.center}>很遗憾</div>
          <div className={styles.center}>没有与您活动金额匹配的礼品哦</div>
        </div>
      </div>
    )
    return (
      <div className={styles.page}>
        <div>
          <div className={styles.lists}>
            {
              !this.state.list[0] || this.state.list[0] === '金额不能为空' ? noGift:null
          }
            <WingBlank>
              {list}
              <div style={{width: '100%',height: '90px', background: '#fff', marginTop: -2}}>{''}</div>
            </WingBlank>
          </div>
          <Flex className={styles.buttons}>
            <div className={styles.cancel} onClick={this.cancel}>取消选择</div>
            <div className={styles.submit} onClick={this.submit}>确认</div>
          </Flex>
        </div>
      </div>
    )
  }
})
