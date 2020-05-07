import React, { useState } from 'react'
import styles from './index.less'
import { Flex } from 'antd-mobile'
interface Props {
  item: object;
  onChange: (type: string, id: number) => any;
}
export default function Item({ item, onChange }: Props) {
  const [is_choose, setChoose] = useState(false)

  const choose = (item: any) => {
    if (is_choose) {
      setChoose(false)
      onChange('delete', item)
    } else {
      setChoose(true)
      onChange('add', item)
    }
  }

  return (
    <Flex className={styles.item} justify='between' align='start' onClick={choose.bind(this, { name: 22 })}>
      <Flex className={styles.item_left}>
        <div className={styles.item_img_box}>
          <div className={styles.item_label}>{item.gift_type == 3 ? '实物券' : null}</div>
          <img src={item.gift_image} alt="" />
        </div>
        <Flex className={styles.item_info} direction='column' align='start' justify='between'>
          <div className={styles.item_name}>{item.gift_name}</div>
          <div>已选0份，剩余{item.total_surplus_num}份</div>
          <Flex className={styles.item.name} align='baseline'>
            单价：
            <div className={styles.item_money}>2000</div>
          </Flex>
        </Flex>
      </Flex>
      {
        is_choose ? <img src={require('@/assets/checked.png')} alt='' className={styles.checkout_icon} />
          : <div className={styles.no_checkout_icon}></div>
      }

    </Flex>
  )
}
