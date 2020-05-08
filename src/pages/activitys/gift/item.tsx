import React, { useEffect, useState } from 'react'
import { Flex } from 'antd-mobile'
import styles from './index.less'
import router from 'umi/router'
interface Props {
  list: Array<object>;
  name: string;
  id: number;
  num: number;
  type: number;
  sum: number;
  onChange: (item: object) => any
}
export default function GiftItem(props: Props) {

  const toAdd = () => {
    const {type, id, num, sum} = props
    if(type == 1){
      if(id == 1 || id == 2 || id == 3){
        let number = sum * num
        router.push({pathname: '/activitys/gift/gift-list', query: {id, sum: number, type}})
      }else {
        router.push({pathname: '/activitys/gift/gift-list', query: {id, sum, type}})
      }
    }else if (type == 2){
      if (id == 1){
        let number = sum * num
        router.push({pathname: '/activitys/gift/gift-list', query: {id, sum: number, type}})
      }else {
        router.push({pathname: '/activitys/gift/gift-list', query: {id, sum, type}})
      }
    }else {
      router.push({pathname: '/activitys/gift/gift-list', query: {id, sum, type}})
    }
  }

  const deleteItem = (item) => {
    props.onChange(item,props.id)
  }



  return (
    <div className={styles.item_box}>
      <Flex className={styles.item} align='center' justify='between' >
        <Flex className={styles.title_box} align='center' >
          <i className={styles.title_icon} />
          <div className={styles.title}>{props.name}</div>
        </Flex>
        <Flex className={styles.add_gift} align='center' justify='center' onClick={toAdd}>
          添加礼品
        </Flex>
      </Flex>
      {
        props.list.length ? <div style={{ marginTop: -17 }}>
          {
            props.list.map(item => {
              return (
                <Flex className={styles.gift_item} align='center' justify='between'>
                  <Flex direction='column' align='start'>
                    <div>礼品名称：{item.gift_name}</div>
                    <div>提供店铺：{item.supplier_location.name}</div>
                    <div>派送方式：{item.each_num}个/份</div>
                  </Flex>
                  <Flex className={styles.delete_button} align='center' justify='center' onClick={deleteItem.bind(this,item)}>
                    删除
                </Flex>
                </Flex>
              )
            })
          }
        </div> : null
      }
    </div>
  )
}
