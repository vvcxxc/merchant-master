/**title: 添加礼品 */
import React, { Component } from 'react'
import { Flex } from 'antd-mobile'
import GiftItem from './item'
import { connect } from 'dva'
import styles from './index.less'

export default connect(({ gift }: any) => gift)(
  class Gift extends Component<any> {
    state = {

    }


    componentDidMount(){
      // console.log(this.props.location.query)
      // type: 1为拼团，2为增值，3为现金，4为兑换
      const { type, num } = this.props.location.query

      let list = []
      switch (type){
        case '1':
          list = [{title: '发起拼团', list: []}, {title: '参团有礼', list: []}, {title: '成团有礼', list: []}, {title: '成交有礼', list: []}]
          break
        case '2':
          list = [{title: '购买有礼', list: []}, {title: '助力有礼', list: []}, {title: '成交有礼', list: []}]
          break
        case '3':
          list = [{title: '购买有礼', list: []}, {title: '成交有礼', list: []}]
          break
        case '4':
          list = [{title: '购买有礼', list: []}, {title: '成交有礼', list: []}]
          break
      }
      console.log(list,'list')
      this.props.dispatch({
        type: 'gift/setData',
        payload: {
          type,
          num,
          list
        }
      })
    }

    render() {
      const { list,num, type } = this.props
      return (
        <div className={styles.gift_page}>
          <Flex className={styles.gift_header} align='center'>
            <img className={styles.header_img} src='http://tmwl.oss-cn-shenzhen.aliyuncs.com/front/YkrCDnRhAH2ip5kAbys5sCSHMBXrQJG6.png' alt='' />
            派送数量：100
          </Flex>
          {
            list.map((res: any, index: number) => <GiftItem key={index} list={res.list} name={res.title} id={index} num={num} type={type}/>)
          }
        </div>
      )
    }
  }
)

