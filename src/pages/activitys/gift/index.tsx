/**title: 添加礼品 */
import React, { Component } from 'react'
import { Flex } from 'antd-mobile'
import GiftItem from './item'
import { connect } from 'dva'
import router from 'umi/router'
import styles from './index.less'

export default connect(({ gift }: any) => gift)(
  class Gift extends Component<any> {
    state = {
      number: 0
    }


    componentDidMount() {
      // console.log(this.props.location.query)
      // type: 1为拼团，2为增值，3为现金，4为兑换
      let { type, num, sum } = this.props.location.query
      const { list } = this.props
      if (list.length == 0) {
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
            type,
            num,
            list,
            sum: sum ? sum : 0
          }
        })
      }else {
        this.props.dispatch({
          type: 'gift/setData',
          payload: {
            type,
            num,
            sum: sum ? sum : 0
          }
        })
        this.computeSum()
      }

    }

    // 计算派送数量
    computeSum = () => {

      const { list } = this.props
      // console.log(list,'list')
      let sum = 0
      for (let i in list){
        let arr = list[i].list
        if(arr.length){
          for (let a in arr){
            sum = sum + Number(arr[a].repertory_num)
          }
        }
      }
      this.setState({number: sum})

    }


    deleteItem = async (item: object,index: number) => {
      let id = item.id
      let list = this.props.list
      let gift_list = this.props.gift_list

      for (let i in gift_list){
        if(gift_list[i].id == item.id){
          gift_list[i].total_surplus_num = item.occupation_number + item.total_surplus_num
          gift_list[i].is_choose = false
        }
      }


      list[index].list =  list[index].list.filter(res => {
        return res.gift_id != item.id
      })
      list[index].gift_list =  list[index].gift_list.filter(res => {
        return res.id != item.id
      })
      await this.props.dispatch({
        type: 'gift/setData',
        payload: {
          list: [...list],
          gift_list: [...gift_list]
        }
      })
      this.computeSum()
    }

    submit = () => {
      const list = this.props.list
      let gift = []
      for(let i in list){
        // console.log(list[i])
        gift.push({give_stage: Number(i)+1, data: list[i].list})
      }
      // console.log(JSON.stringify(gift))
      this.props.dispatch({
        type: 'gift/setData',
        payload: {
          gift
        }
      })
      router.goBack()
    }

    render() {
      const { list, num, type, sum } = this.props
      console.log(list,'gift  list')
      return (
        <div className={styles.gift_page}>
          <Flex className={styles.gift_header} align='center'>
            <img className={styles.header_img} src='http://tmwl.oss-cn-shenzhen.aliyuncs.com/front/YkrCDnRhAH2ip5kAbys5sCSHMBXrQJG6.png' alt='' />
            派送数量：{this.state.number}
          </Flex>
          <div style={{marginBottom: 200}}>
          {
            list.map((res: any, index: number) => <GiftItem onChange={this.deleteItem} key={index} list={res.gift_list} name={res.title} id={index} sum={sum} num={num} type={type} />)
          }

          </div>

           <Flex className={styles.button_box} align='center' justify='between'>
            <Flex className={styles.cancel} align='center' justify='center' onClick={() => router.goBack()}>取消</Flex>
            <Flex className={styles.submit} align='center' justify='center' onClick={this.submit}>确认</Flex>
          </Flex>
        </div>
      )
    }
  }
)

