import React, {useState} from 'react'
import styles from './index.less'
import { Flex } from 'antd-mobile'

export default function Item (Props){

  return (
    <Flex className={styles.item}>
      <Flex className={styles.item_left} justify='around' align='center'>
        现金券
      </Flex>
      <div className={styles.item_right}>
        <div>
          <Flex justify='between'>
            <div className={styles.item_info}>
              <div className={styles.name}>20元代金券</div>
              <div className={styles.status}>审核通过</div>
              <div>
                <span>已派发：0</span>
                <span>已使用：0</span>
              </div>
            </div>
            <div className={styles.cancel}><img src={require('../../../assets/quxiao.png')}/></div>
          </Flex>
        </div>
        <Flex justify='end'>
          <Flex className={styles.editor} justify='center'>编辑</Flex>
          <Flex className={styles.browse} justify='center'>浏览</Flex>
        </Flex>
      </div>
    </Flex>
  )
}
