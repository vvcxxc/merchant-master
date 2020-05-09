import React, { useState } from 'react'
import styles from './index.less'
import { Flex } from 'antd-mobile'
interface Props {
  gift: any;
  onChange: (type: string, item: object) => any;
}
export default function Item({ gift, onChange }: Props) {
  const [is_choose, setChoose] = useState(false)
  const choose = () => {
    console.log(gift)
    if (gift.is_choose) {
      // setChoose(false)
      onChange('delete', gift)
    } else {
      console.log(gift,'add')
      // setChoose(true)
      onChange('add', gift)
    }
  }
  return (
    <Flex className={styles.item} justify='between' align='start' onClick={choose}>
      <Flex className={styles.item_left}>
        <div className={styles.item_img_box}>
          <div className={styles.item_label}>{gift.gift_type == 3 ? '实物券' : null}</div>
          <img src={gift.gift_image} alt="" />
        </div>
        <Flex className={styles.item_info} direction='column' align='start' justify='between'>
          <div className={styles.item_name}>{gift.gift_name}</div>
          <div>已选{gift.occupation_number ? gift.occupation_number : 0}份，剩余{gift.total_surplus_num}份</div>
          <Flex className={styles.item.name} align='baseline'>
            单价：
            <div className={styles.item_money}>2000</div>
          </Flex>
        </Flex>
      </Flex>
      {
        gift.is_choose ? <img src={require('@/assets/checked.png')} alt='' className={styles.checkout_icon} />
          : <div className={styles.no_checkout_icon}></div>
      }

    </Flex>
  )
}
