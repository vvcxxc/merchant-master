import React, { useEffect, useState } from 'react'
import { Flex } from 'antd-mobile'
import styles from './index.less'
interface Props {
  list: Array<object>;
  name: string;
}
export default function GiftItem(props: Props) {
  return (
    <div className={styles.item_box}>
      <Flex className={styles.item} align='center' justify='between' >
        <Flex className={styles.title_box} align='center' >
          <i className={styles.title_icon} />
          <div className={styles.title}>{props.name}</div>
        </Flex>
        <Flex className={styles.add_gift} align='center' justify='center'>
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
                    <div>礼品名称：麦香杯</div>
                    <div>提供店铺：九戒</div>
                    <div>派送方式：10个/份</div>
                  </Flex>
                  <Flex className={styles.delete_button} align='center' justify='center'>
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
