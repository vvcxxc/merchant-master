import React, { useState } from 'react'
import router from 'umi/router';
import styles from './index.less'
import { Flex, Toast } from 'antd-mobile'

interface dataType {
  recruit_activity_id: Number | string,//招募活动id
  id: Number | string,//卡券优惠id
  name: Number | string,//卡券优惠名
  youhui_type: Number ,//兑换卷0/现金卷1
  publish_wait: Number | string,//0:待审核 1:已审核 2:拒绝
  already_distributed: Number | string,//已派发
  already_used: Number | string,//已使用
  use_sum: Number,
 
}

 declare interface props {
   info: dataType,
   activity_id:any,
   delete: (id: Number | string) => void,
   delte_ok: Number
}

const youhuiType = {
  [0]: '兑换券',
  [1]: '现金券'
}

const publishType:any = {
  0: '待审核',
  1: '已审核',
  2:'拒绝'
}

export default function Item(props: props) {
  const { info, activity_id, delte_ok } = props
  return (
    <Flex className={styles.item}>
      <Flex className={styles.item_left} justify='around' align='center'>
        { youhuiType[info.youhui_type] }
      </Flex>
      <div className={styles.item_right}>
        <div>
          <Flex justify='between'>
            <div className={styles.item_info}>
              <div className={styles.name}>
                {info.name}
              </div>
              <div className={styles.status}>{publishType[info.publish_wait]}</div>
              <div>
                <span>已派发：{info.already_distributed}</span>
                <span>已使用：{info.use_sum}</span>
              </div>
            </div>
            <div className={styles.cancel}>
              <img onClick={() => {
                delte_ok == 1 ? props.delete(info.id):Toast.fail('活动已结束,卡券无法删除')
              }} src={require('../../../assets/quxiao.png')} /></div>
          </Flex>
        </div>
        <Flex justify='end'>
          {
            info.publish_wait === 2 ? <Flex className={styles.editor} justify='center' onClick={() => {
              router.push({ pathname: '/limitActivity/participateActivities', query: { recruit_activity_id: activity_id, youhui_id: info.id } })
            }}>编辑</Flex>:null
          }
          
          <Flex className={styles.browse} justify='center' onClick={() => {
            router.push({
              pathname: '/limitActivity/participateActivities', query: { recruit_activity_id: activity_id, youhui_id: info.id,look:1 }
            })
          }}>浏览</Flex>
        </Flex>
      </div>
    </Flex>
  )
}
