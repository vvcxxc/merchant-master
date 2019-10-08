import React, { Component } from 'react';
import styles from './index.less';
import { Flex, WingBlank, Radio, Toast  } from 'antd-mobile';
import request from '@/services/request'
import GiftDetails from '../giftdetails';


interface Props {
  onChange: (id: string, is_show: boolean, gift_pic: string, gift_name: string) => any;
  id: string ;
  money: string;
}

export default class ChooseGift extends Component<Props> {
  state = {
    list: [],
    value: null,
    id: '',
    is_show: false,
    gift_pic: '',
    gift_name: '',
    display: 'block',
    is_details: false,
    gift_id: ''
  };
  componentDidMount(){
    if(this.props.money){
      request({
        url: 'api/integral_goods',
        method: 'get',
        params: {
          price: this.props.money
        }
      }).then(res => {
        let { data } = res;
        this.setState({list: data});
      })
      if(this.props.id){
        this.setState({id: this.props.id, value: this.props.id})
      }
    }
  }
  chooseOne = (id: string, gift_pic: string, gift_name: string) => {
    this.setState({
      value: id,
      id,
      gift_pic,
      gift_name
    });
  }

  /**确认 */
  submit = () => {
    if(this.state.id){
      const {id, is_show, gift_pic, gift_name} = this.state
      this.props.onChange(id, is_show, gift_pic, gift_name)
    }else {
      Toast.fail('还没有选择礼品')
    }
  }
  /**取消 */
  cancel = () => {
    let id = '';
    let gift_pic = '';
    let gift_name = '';
    const {is_show} = this.state
    this.props.onChange(id, is_show, gift_pic,gift_name)
  }

  /**详情 */
  openDetails = (id: string) => {
    this.setState({is_details: true, gift_id: id, display: 'none'})
  }
  openChange = (id: string) => {
    this.setState({id, value: id, is_details: false, display: 'block'})
  }


  render (){
    const { value, display } = this.state;
    const list = this.state.list.map((item: any, idx: number) => {
      if (!this.state.list || this.state.list[0] === '金额不能为空') return
      return (
        <Flex className={styles.giftBox} key={idx}>
          <div className={styles.image}><img src={item.cover_image}/></div>
          <div className={styles.text}>
            <div className={styles.name} onClick={this.openDetails.bind(this,item.id)}><div>{item.title}</div></div>
            <div className={styles.prices}>
              <span style={{color: '#666', marginRight: 32}}>快递{item.postage}元</span>
              <span style={{color: '#F55641'}}>单价：{item.price}元</span>
              <Radio className={styles.icon} onChange={this.chooseOne.bind(this,item.id,item.cover_image,item.title)} checked={value === item.id} defaultChecked={false}/>
            </div>
          </div>
        </Flex>
      )
    })
    const giftDetails = this.state.is_details == true ? (
      <GiftDetails onChange={this.openChange} id={this.state.gift_id}/>
    ) : null;
    return (
      <div className={styles.page}>
        <div style={{display}}>
          <div className={styles.lists}>
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
        {giftDetails}
      </div>
    )
  }
}
