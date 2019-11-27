import React, { Component } from 'react'
import styles from  './index.less'
export default class qlPage extends Component {

  render() {
    return (
      <div className={styles.stereo_box}>
        <div className={styles.flat_pattern}>
          <img src="https://img14.360buyimg.com/mobilecms/s280x280_jfs/t8284/363/1326459580/71585/6d3e8013/59b857f2N6ca75622.jpg.webp" alt="" />
        </div>
        
        <ul>
          <li>小雅Nano智能音箱</li>
          <li>产品功能介绍产品功能介绍产品功能 介绍产品功能介绍产品功能介绍品功 能介绍</li>
          <li>
            <span>￥100.00</span>
            <span>购买音箱 拷贝 2</span>
          </li>
        </ul>
      </div>
    )
  }
}