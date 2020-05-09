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
      list: [],
      total: 0,

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
        getGiftList(sum,1).then(res => {
          // this.setState({ list: res.data })
          this.props.dispatch({
            type: 'gift/setData',
            payload: {
              gift_list: res.data,
              total_pages: res.meta.pagination.total_pages
            }
          })
          this.setState({ gift_list: res.data })
        })
      }else {
        this.giftList(gift_list,list[id].list)

      }


      this.setState({ item_id: id, sum, type })

    }

    //  将gift_list和list比对
    giftList = (gift_list: any, list: any) => {
      let giftList = [...gift_list]
      for (let i in giftList){
        giftList[i].occupation_number = 0
        for (let a in list){
          if(giftList[i].id == list[a].gift_id){
            giftList[i].is_choose = true
            giftList[i].occupation_number = list[a].repertory_num
          }
        }
      }
      this.setState({gift_list: giftList})
    }




    chooseItem = (action: string, item: object) => {
      console.log(this.props.list,'LIST')
      const { type, sum, item_id } = this.state
      let { gift_list, list} = this.state
      if (action === 'add') {
        let occupation_number = 0 // 已选择数量
        let total_surplus_num = 0
        if(sum > item.total_surplus_num){
          occupation_number = item.total_surplus_num
          total_surplus_num = 0
        }else {
          occupation_number = sum // 已选择数量
          total_surplus_num = item.total_surplus_num - occupation_number // 剩余数量
        }
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
        this.setState({gift_list,list},()=>{this.computeSum()})
      } else if (action === 'delete') {
        let total_surplus_num = Number(item.total_surplus_num) + Number(item.occupation_number)
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
        this.setState({gift_list,list}, ()=>{this.computeSum()})
      }
    }


    // 计算派送数量
    computeSum = () => {

      const { list, item_id } = this.state
      let arr = list[item_id].list
      let sum = 0
      for(let i in arr){
        sum = sum + Number(arr[i].repertory_num)
      }
      this.setState({total: sum})
    }

    submit = () => {
      console.log('submit')
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

    loadMore = () => {
      let { sum } = this.props.location.query
      const { page,  } = this.props
      const {gift_list} = this.state
      getGiftList(sum, page + 1).then(res => {
        this.props.dispatch({
          type: 'gift/setData',
          payload: {
            gift_list: [...gift_list, ...res.data],
            page: page + 1
          }
        })
        this.setState({ gift_list: [...gift_list,...res.data] })
      })
    }
    cancel = () => {
      // router.goBack()
      console.log(this.props.list)
    }

    render() {
      const { gift_list, total } = this.state
      const { total_pages,page } = this.props
      return (
        <div className={styles.gift_list}>
          <Flex className={styles.list_header} justify='end'>已选{total}份礼品</Flex>
          <div style={{marginBottom: 200}}>
            {
              gift_list.map(item => {
                return <Item key={item.id} gift={item} onChange={this.chooseItem} />
              })
            }
            {
              page >= total_pages ? <div className={styles.more}>暂无更多数据</div> : <div className={styles.more} onClick={this.loadMore}>点击加载更多</div>
            }

          </div>
          <Flex className={styles.button_box} align='center' justify='between'>
            <Flex className={styles.cancel} align='center' justify='center' onClick={this.cancel }>取消</Flex>
            <Flex className={styles.submit} align='center' justify='center' onClick={this.submit}>提交活动</Flex>
          </Flex>
        </div>
      )
    }
  }
)

