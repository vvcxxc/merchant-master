import React, { Component } from 'react'
import { Flex } from 'antd-mobile'
import Item from './item'
import { getGiftList } from '../service'
import styles from './index.less'
import { connect } from 'dva';
export default connect(({ gift }: any) => gift)(
  class GiftList extends Component<any> {
    state = {
      gift_list: [],
      id: []
    }

    componentDidMount() {
      console.log(this.props)
      getGiftList(100).then(res => {
        // this.setState({ list: res.data })
        this.props.dispatch({
          type: 'gift/setData',
          payload: {
            gift_list: res.data
          }
        })
      })
    }

    chooseItem = (type: string, item: object) => {
      console.log(type, item)
      if (type === 'add') {

      } else if (type === 'delete') {

      }
    }

    render() {
      const { gift_list } = this.props
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
            <Flex className={styles.cancel} align='center' justify='center'>取消</Flex>
            <Flex className={styles.submit} align='center' justify='center'>提交活动</Flex>
          </Flex>
        </div>
      )
    }
  }
)

