import React, { Component } from 'react'
import { Flex } from 'antd-mobile'
import Item from './item'
import { getGiftList } from '../service'
import styles from './index.less'

export default class GiftList extends Component {
  state = {

  }

  componentDidMount (){
    getGiftList(100).then(res => {
      console.log(res)
    })
  }

  chooseItem = (type:string, item:object) => {
    console.log(type,item)
  }

  render() {
    return (
      <div className={styles.gift_list}>
        <Flex className={styles.list_header} justify='end'>已选x份礼品</Flex>
        <div>
          <Item item={{}} onChange={this.chooseItem}/>
        </div>
        <Flex className={styles.button_box} align='center' justify='between'>
          <Flex className={styles.cancel} align='center' justify='center'>取消</Flex>
          <Flex className={styles.submit} align='center' justify='center'>提交活动</Flex>
        </Flex>
      </div>
    )
  }
}
