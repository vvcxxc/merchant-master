import React, {useState} from 'react'
import styles from './index.less'
import { Flex } from 'antd-mobile'

interface dataType {
  recruit_activity_id: Number | string,//招募活动id
  id: Number | string,//卡券优惠id
  name: Number | string,//卡券优惠名
  youhui_type: Number ,//兑换卷0/现金卷1
  publish_wait: Number | string,//0:待审核 1:已审核 2:拒绝
  already_distributed: Number | string,//已派发
  already_used: Number | string,//已使用
}

 declare interface props {
  info: dataType
}

const youhuiType = {
  [0]: '兑换券',
  [1]: '现金券'
}

const publishType = {
  [0]: '待审核',
  [1]: '已审核',
  [2]:'拒绝'
}

export default function Item(props: props) {
  const { info } = props

  return (
    <Flex className={styles.item}>
      <Flex className={styles.item_left} justify='around' align='center'>
        { youhuiType[info.youhui_type] }
      </Flex>
      <div className={styles.item_right}>
        <div>
          <Flex justify='between'>
            <div className={styles.item_info}>
              <div className={styles.name}>{info.name}{youhuiType[info.youhui_type]}</div>
              <div className={styles.status}>{publishType[info.publish_wait]}</div>
              <div>
                <span>已派发：{info.already_distributed}</span>
                <span>已使用：{info.already_used}</span>
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
