import React, { Component, useState } from 'react'
import router from 'umi/router';
import styles from './index.less'

interface listType {
  describe: string,
  id: number,
  image: string,
  name: string | number,
  price: string | number,
  stock: number,
  
}
interface Props {
  height?: boolean,
  list: any
}
export default class CloudSpeakers extends Component<Props> {
  //购买商品
  GoShop = () => {
    router.push('/loudspeaker/buy_loudspeaker');
  }
  render() {
    const { list } = this.props
    console.log(list,'list');
    
    return (
      <div className={styles.stereo_box_list}>
        <div className={styles.stereo_box}>
          <div className={this.props.height ? styles.flat_pattern : styles.short_flat_pattern}>
            <img src={list.image} alt="" />
          </div>
          <ul>
            <li>{list.name}</li>
            <li>{list.describe}</li>
            <li>
              <span>￥{list.price}</span>
              {
                list.is_buy === 1 ? <span id={styles.no_inventory}>已购买</span> : (
                  list.stock > 0 ?
                    < span onClick={this.GoShop}>购买音箱</span> : <span id={styles.no_inventory}>已售完</span>
                )
              }
            </li>
          </ul>
        </div>

      </div>
    )
  }
}