import React, { Component } from 'react'
import { Flex } from 'antd-mobile'
import Item from './item'
import { getGiftList } from '../service'
import styles from './index.less'
import { connect } from 'dva';
import { RemoveDup, } from '@/utils/common'
import router from 'umi/router'

export default connect(({ gift }: any) => gift)(
  class GiftList extends Component<any> {
    state = {
      gift_list: [],
      id: [],
      item_id: '',
      sum: '',
      type: '',
      list: []
    }

    componentDidMount() {
      let { id, sum, type } = this.props.location.query
      const { gift_list, list } = this.props
      if (this.props.list.length == 0) {
        type = Number(type)
        let list = []
        switch (type) {
          case 1:
            list = [{ title: '发起拼团', list: [], gift_list: [] }, { title: '参团有礼', list: [], gift_list: [] }, { title: '成团有礼', list: [], gift_list: [] }, { title: '成交有礼', list: [], gift_list: [] }]
            break
          case 2:
            list = [{ title: '购买有礼', list: [], gift_list: [] }, { title: '助力有礼', list: [], gift_list: [] }, { title: '成交有礼', list: [], gift_list: [] }]
            break
          case 3:
            list = [{ title: '购买有礼', list: [], gift_list: [] }, { title: '成交有礼', list: [], gift_list: [] }]
            break
          case 4:
            list = [{ title: '购买有礼', list: [], gift_list: [] }, { title: '成交有礼', list: [], gift_list: [] }]
            break
        }
        this.props.dispatch({
          type: 'gift/setData',
          payload: {
            list,
          }
        })
        this.setState({ list })
      }else {
        this.setState({ list })
      }


      if(gift_list.length == 0){
        getGiftList(sum).then(res => {
          // this.setState({ list: res.data })
          this.props.dispatch({
            type: 'gift/setData',
            payload: {
              gift_list: res.data
            }
          })
          this.setState({ gift_list: res.data })
        })
      }else {
        this.setState({gift_list})
      }


      this.setState({ item_id: id, sum, type })

    }

    chooseItem = (action: string, item: object) => {
      const { type, sum, item_id } = this.state
      let { gift_list, list } = this.state
      if (action === 'add') {

        let occupation_number = sum
        let total_surplus_num = item.total_surplus_num - occupation_number
        for (let i in gift_list) {
          if (gift_list[i].id == item.id) {
            gift_list[i].total_surplus_num = total_surplus_num
            gift_list[i].occupation_number = occupation_number
            gift_list[i].is_choose = true
          }
        }

        // 把item添加到list的gift_list
        let giftList = list[item_id].gift_list
        giftList.push(item)
        giftList = RemoveDup(giftList)
        list[item_id].gift_list = giftList

        // 把id，数量添加到list的list
        let new_list = list[item_id].list
        new_list.push({gift_id: item.id, repertory_num: occupation_number})

        list[item_id].list = new_list
        this.setState({gift_list,list})
      } else if (action === 'delete') {

        let total_surplus_num = Number(item.total_surplus_num) + Number(sum)
        for(let i in gift_list){
          if(gift_list[i].id == item.id){
            gift_list[i].occupation_number = 0
            gift_list[i].total_surplus_num = total_surplus_num
            gift_list[i].is_choose = false
          }
        }

        // 把item从list的list删掉
        let new_list = list[item_id].list
        new_list = new_list.filter((res: Array<any>)=>{
          return res.gift_id != item.id
        })
        list[item_id].list = new_list

        // 把item从list的gift_list中删掉
        let giftList = list[item_id].gift_list
        giftList = giftList.filter((res: object)=> {
          return res.id != item.id
        })
        list[item_id].gift_list = giftList
        this.setState({gift_list,list})
      }
    }

    submit = () => {
      const {gift_list, list} = this.state
      for(let i in gift_list){
        gift_list[i].is_choose = false
      }
      this.props.dispatch({
        type: 'gift/setData',
        payload: {
          gift_list,
          list
        }
      })
      router.goBack()
    }

    render() {
      const { gift_list } = this.state
      return (
        <div className={styles.gift_list}>
          <Flex className={styles.list_header} justify='end'>已选x份礼品</Flex>
          <div>
            {
              gift_list.map(item => {
                return <Item key={item.id} item={item} onChange={this.chooseItem} />
              })
            }

          </div>
          <Flex className={styles.button_box} align='center' justify='between'>
            <Flex className={styles.cancel} align='center' justify='center' onClick={() => router.goBack()}>取消</Flex>
            <Flex className={styles.submit} align='center' justify='center' onClick={this.submit}>提交活动</Flex>
          </Flex>
        </div>
      )
    }
  }
)

