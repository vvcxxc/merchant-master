import React, { Component } from 'react'
import styles from './index.less'

export default class InputBox extends Component {
  state = {
    list: [
      
    ]
  }

  onclange=()=> {
    document.documentElement.scrollTop =0//已知问题，点击输入框之后，再让输入框失去焦点， 就会导致页面整体往上移动，不会还原
  }

  render() {
    return (
      <div className={styles.inputBox}>
        <ul>
          <li>
            <div>活动时间</div><div>2019-10-10至2019-11-11</div>
          </li>
          <li>
            <div>选择卡券类型</div><div>2019-10-10至2019-11-11</div>
          </li>
          <li>
            <div>卡券面额</div><div>2019-10-10至2019-11-11</div>
          </li>
          <li>
            <div>使用门槛</div><div>2019-10-10至2019-11-11</div>
          </li>
          <li>
            <div>卡券有效期</div><div>2019-10-10至2019-11-11</div>
          </li>
          <li>
            {/* 挡不住复制的内容 */}
            <div>卡券数量</div><input type="number" pattern="[0-9]*" onBlur={this.onclange}/>
          </li>
        </ul>

      </div>
    )
  }
}