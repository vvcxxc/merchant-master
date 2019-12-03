import React, { Component,useState } from 'react'
import styles from './index.less'

interface Props {
  height?:boolean
}
export default class CloudSpeakers extends Component<Props> {

  render() {
    return (
      <div className={styles.stereo_box_list}>
        <div className={styles.stereo_box}>
          <div className={this.props.height ? styles.flat_pattern : styles.short_flat_pattern}>
            <img src="https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=672c24dc057b020808c938e352d9f25f/d8f9d72a6059252ddd00117d3b9b033b5bb5b9b7.jpg" alt="" />
          </div>
          <ul>
            <li>小雅Nano智能音箱</li>
            <li>产品功能介绍产品功能介绍产品功能 介绍产品功能介绍产品功能介绍品功 能介绍</li>
            <li>
              <span>￥100.00</span>
              <span>购买音箱</span>
            </li>
          </ul>
        </div>

      </div>
    )
  }
}